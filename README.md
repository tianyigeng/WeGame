# WeGame

## Tech stack

### Database

MySQL: https://www.mysql.com/

In Mac OS, use:

    sudo pip install MySQL-python
    brew install mysql

to install.

### Set up

For briefty, we all use the same user for the MySQL database:

- username=root
- password=admin

Execute `init_db.sh` to start the SQL server locally (with credentials above).

**Note:** You must execute `init_db.sh` first in order to execute `data/rebuild_database.py`.