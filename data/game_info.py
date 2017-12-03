# Returns game metadata indexed by game name.
# [id, name, genre, year, publisher, global_sales]
import os
def ReadGameMetadataFromVgsales():
  current_path = os.getcwd()
  dataset_path = current_path + '/raw_data/vgsales.csv'
  games = {}
  names = set([])
  current_id = 0
  f = open(dataset_path)
  next(f) # skip the header row.
  for line in f:
    splitted = line.split(',')
    if len(splitted) < 6:
      continue
    oldname = splitted[1]
    newname = oldname
    i = 0
    while newname in names:
      i += 1
      newname = oldname + " " + str(i)
    genre = splitted[4]
    try:
      year = int(splitted[3])
    except:
      year = 0 # N/A
    publisher = splitted[5]
    platform = splitted[2]
    names.add(newname)
    games[newname] = (str(current_id), oldname, genre, year, publisher, platform)
    current_id += 1

  dataset_path2 = current_path + '/raw_data/crawl_games.csv'
  f2 = open(dataset_path2)
  next(f2) # skip the header row.
  for line in f2:
    splitted = line.split(',')
    if len(splitted) != 5:
      continue

    oldname = splitted[0]
    newname = oldname
    i = 0
    while newname in names:
      i += 1
      newname = oldname + " " + str(i)

    genre = splitted[3]
    try:
      year = int(splitted[2])
    except:
      year = 0 # N/A

    platform = splitted[1]
    publisher = splitted[4]
    names.add(newname)
    games[newname] = (str(current_id), oldname, genre, year, publisher[:-2], platform)
    current_id += 1

  return games

if __name__ == '__main__':
  print ReadGameMetadataFromVgsales()

  # game_corpus = ReadGameMetadataFromVgsales()
  # steam_games = ReadGameNameFromSteam200k()

  # matched = 0
  # for game_name in steam_games:
  #   if game_name in game_corpus:
  #     # print game_name
  #     matched += steam_games[game_name]

  # ordered = sorted(steam_games.items(), key=lambda t : -t[1])
  # cummulated = 0
  # total = 200000
  # cnt = 0
  # bench_mark = 0.1
  # for item in ordered:
  #   cnt += 1
  #   cummulated += item[1]
  #   percentile = float(cummulated) / total
  #   if percentile >= bench_mark:
  #     bench_mark += 0.05
  #     print 'The %d-th item percentile: %.2f' % (cnt, percentile * 100)

  # # print game_corpus
  # # print steam_games
  # print len(game_corpus), len(steam_games), matched
