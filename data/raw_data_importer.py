# Used to parse raw data and convert them to the database schema.

import data_util
import game_info
import math

# Parse the steam-200k.csv, returns 2 lists:
# 1. USER list:
#   [uid, name]  ==  [name, password]
# 2. PLAY_GAME list:
#   [uid, gid, duration_played]
import os
def ParseSteam200k(game_dict):
  user_list = set()
  user_name = set()
  play_game_list = []
  unmatched = []
  current_path = os.getcwd()
  steam_200k_filename = current_path + '/raw_data/steam-200k.csv'
  with open(steam_200k_filename) as f:
    for line in f:
      splitted = line.split(',')
      if len(splitted) != 5 or splitted[2] != 'play':
        continue
      game_name = splitted[1].lstrip('"').strip('"')
      if game_name not in game_dict:
        unmatched.append(game_name)
        continue
      hours = int(float(splitted[3]))
      uid = splitted[0]

      # create user info into user table
      newname = data_util.GetRandomNameFromUserId(uid)
      if newname not in user_name:
        user_name.add(newname)
        user_list.add((newname, uid))
      else:
        i = 1
        while (newname+uid[-i]) in user_name:
          i+=1

        newname = newname+'_'+uid[-i]
        user_name.add(newname)
        user_list.add((newname,uid))

      # play game list
      play_game_list.append( (newname, game_dict[game_name][0], hours) )
  return list(user_list), play_game_list, unmatched

def IngestToDatabase(cursor):
  game_dict = game_info.ReadGameMetadataFromVgsales()
  user_list, play_game_list, _ = ParseSteam200k(game_dict)
  game_list = game_dict.values()

  for game in game_list:
    cursor.execute('''
      INSERT INTO GAME
      VALUES (%s, %s, %s, %s, %s, %s)
    ''', game)
  print len(game_list), 'rows in GAME ingested'

  for user in user_list:
    cursor.execute('''
      INSERT INTO USER
      VALUES (%s, %s)
    ''', user)
  print len(user_list), 'rows in USER ingested'

  for play_game in play_game_list:
    cursor.execute('''
      INSERT INTO PLAY_GAME
      VALUES (%s, %s, %s)
    ''', play_game)

    print "play_game: ",play_game
  print len(play_game_list), 'rows in PLAY_GAME ingested'


def BuildRecommendation(cursor):
  game_dict = game_info.ReadGameMetadataFromVgsales()
  _, play_game_list, _ = ParseSteam200k(game_dict)

  def _similarity(d1, d2):
    product = 0
    for k1, v1 in d1.iteritems():
      if k1 in d2:
        product += 1
    return (product + 0.0) / math.sqrt(\
      (sum(v**2 for _, v in d1.iteritems())) * \
      (sum(v**2 for _, v in d2.iteritems())))

  # user_dict[uid] -> profile
  # profile[gid] -> hours
  user_dict = {}
  for item in play_game_list:
    uid, gid, hours = item
    if uid not in user_dict:
      user_dict[uid] = {}
    user_dict[uid][gid] = hours + 1
  
  uids = [k for k in user_dict]
  result = []
  for i in range(len(uids)):
    for j in range(i + 1, len(uids)):
      uid1 = uids[i]
      uid2 = uids[j]
      sim_computed = _similarity(user_dict[uid1], user_dict[uid2])
      if sim_computed < 0.5:
        continue
      result.append( (uid1, uid2, sim_computed) )

  for item in result:
    cursor.execute('''
      INSERT INTO RECOMMENDATION
      VALUES (%s, %s, %s)
    ''', item)
  print len(result), 'recommendations ingested.'

if __name__ == '__main__':
  game_dict = game_info.ReadGameMetadataFromVgsales()
  _, _, unmatched_list = ParseSteam200k(game_dict)

  #for item in unmatched_list:
  #  print item
