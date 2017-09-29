# Script to reconstruct the database from scratch.

import sqlite3
import os

def main():
  db_path = '/tmp/wegame.db'
  RemoveDbIfExists(db_path)

  connection = sqlite3.connect(db_path)
  cursor = connection.cursor()

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
  print 'Database setup finished! db_path=%s' % db_path

def RemoveDbIfExists(db_path):
  command = 'rm -f %s' % db_path
  print 'Executing: %s' % command
  os.system(command)

if __name__ == '__main__':
  main()