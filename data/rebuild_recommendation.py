# Script to reconstruct the recommendation pairs.

import MySQLdb
import os
import raw_data_importer

def main():
  connection = MySQLdb.connect(host='localhost',    # your host, usually localhost
                               user='root',        # your username
                               passwd='admin',      # your password
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

  raw_data_importer.IngestToDatabase(cursor)

  connection.commit()
  connection.close()

  print 'Rebuild database successfully!'

if __name__ == '__main__':
  main()