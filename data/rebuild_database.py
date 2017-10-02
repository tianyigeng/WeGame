# Script to reconstruct the database from scratch.

import MySQLdb
import os

def main():
  connection = MySQLdb.connect(host='localhost',    # your host, usually localhost
                               user='root',        # your username
                               passwd='admin',      # your password
                               db='WeGame')         # name of the database
  cursor = connection.cursor()

  cursor.execute('''
    DROP TABLE IF EXISTS USER, GAME, PLAY_GAME, FRIENDSHIP
  ''')

  cursor.execute('''
    CREATE TABLE USER(
      uid text,
      name text
    )
  ''')

  cursor.execute('''
    CREATE TABLE GAME(
      gid text,
      name text,
      genre text,
      year int,
      publisher text,
      global_sales int
    )
  ''')

  cursor.execute('''
    CREATE TABLE PLAY_GAME(
      uid text,
      gid text,
      duration_played int,
      time_started int
    )
  ''')

  cursor.execute('''
    CREATE TABLE FRIENDSHIP(
      uid1 text,
      uid2 text,
      time_created int
    )
  ''')

  connection.commit()
  connection.close()

  print 'Rebuild database successfully!'

if __name__ == '__main__':
  main()