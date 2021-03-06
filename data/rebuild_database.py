# Script to reconstruct the database from scratch.

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
    DROP TABLE IF EXISTS USER, GAME, PLAY_GAME, FRIENDSHIP
  ''')

  cursor.execute('''
    DROP PROCEDURE IF EXISTS countUserNumber
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
      platform text
    )
  ''')

  cursor.execute('''
    CREATE TABLE PLAY_GAME(
      uid text,
      gid text,
      duration_played int
    )
  ''')

  cursor.execute('''
    CREATE TABLE FRIENDSHIP(
      uid1 text,
      uid2 text,
      is_starred int,
      time_created int
    )
  ''')

  raw_data_importer.IngestToDatabase(cursor)

  cursor.execute('''
    create procedure countUserNumber(
      IN formal char(1)
    )
    BEGIN
    if formal = 'u' then
      select count(*)
      from USER;
    else
      select count(*)
      from GAME;
    end if;
    END;
  ''')

  connection.commit()
  connection.close()

  print 'Rebuild database successfully!'

if __name__ == '__main__':
  main()
