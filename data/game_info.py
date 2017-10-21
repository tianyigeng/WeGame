# Returns game metadata indexed by game name.
# [id, name, genre, year, publisher, global_sales]
def ReadGameMetadataFromVgsales():
  dataset_path = 'raw_data/vgsales.csv'
  games = {}
  current_id = 0
  with open(dataset_path) as f:
    next(f) # skip the header row.
    for line in f:
      splitted = line.split(',')
      if len(splitted) != 11:
        continue
      name = splitted[1]
      genre = splitted[4]
      try:
        year = int(splitted[3])
      except:
        year = 0 # N/A
      publisher = splitted[5]
      global_sales = int(float(splitted[10]))
      games[name] = (str(current_id), name, genre, year, publisher, global_sales)
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
