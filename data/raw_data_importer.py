# Used to parse raw data and convert them to the database schema.

import data_util
import game_info

# Parse the steam-200k.csv, returns 2 lists:
# 1. USER list:
#   [uid, name]
# 2. PLAY_GAME list:
#   [uid, gid, duration_played]
def ParseSteam200k(game_dict):
  user_list = set()
  play_game_list = []

  steam_200k_filename = 'raw_data/steam-200k.csv'
  with open(steam_200k_filename) as f:
    for line in f:
      splitted = line.split(',')
      if len(splitted) != 5 or splitted[2] != 'play':
        continue
      game_name = splitted[1].lstrip('"').strip('"')
      if game_name not in game_dict:
        # TODO: handle this case.
        continue
      hours = int(float(splitted[3]))
      uid = splitted[0]
      user_list.add( (uid, data_util.GetRandomNameFromUserId(uid)) )
      play_game_list.append( (uid, game_dict[game_name][0], hours) )
  return list(user_list), play_game_list

def IngestToDatabase(cursor):
  game_dict = game_info.ReadGameMetadataFromVgsales()
  user_list, play_game_list = ParseSteam200k(game_dict)
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
  print len(play_game_list), 'rows in PLAY_GAME ingested'

if __name__ == '__main__':
  IngestToDatabase()
