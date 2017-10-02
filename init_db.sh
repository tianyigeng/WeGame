#!/bin/sh
#
# A shell script to help initializing MySQL database.

if [[ `pwd` = "*/WeGame" ]] > /dev/null; then
  echo "cd to WeGame first!"
  exit 1
fi

if ! type "mysql" > /dev/null; then
  echo "Install mysql first!"
  exit 1
fi

# Close any existing MySQL servers if exist.
pkill mysqld

# Open new MySQL server.
mysqld --init-file="`pwd`/database-init.txt" &
