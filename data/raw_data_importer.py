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

def IngestToDatabase():
  game_dict = game_info.ReadGameMetadataFromVgsales()
  user_list, play_game_list = ParseSteam200k(game_dict)
  game_list = game_dict.values()

  print user_list, game_list, play_game_list

if __name__ == '__main__':
  IngestToDatabase()
