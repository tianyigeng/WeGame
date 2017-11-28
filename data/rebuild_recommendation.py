# Script to reconstruct the recommendation pairs.

import MySQLdb
import os
import raw_data_importer

def main():
  connection = MySQLdb.connect(host='localhost',    # your host, usually localhost
                               user='root',        # your username
                               passwd='Admin!2017',      # your password
                               db='WeGame')         # name of the database
  cursor = connection.cursor()

  cursor.execute('''
    DROP TABLE IF EXISTS RECOMMENDATION
  ''')

  cursor.execute('''
    CREATE TABLE RECOMMENDATION(
      uid1 text,
      uid2 text,
      score int
    )
  ''')

  raw_data_importer.BuildRecommendation(cursor)

  connection.commit()
  connection.close()

  print 'Rebuild recommendation successfully!'

if __name__ == '__main__':
  main()