## startup

```
make makemigration ## if we changed file `demo/models.py`
make migration ## this update database schema base on classes in file `demo/models.py`
make run
```

## Features

### Administrator Page

url: `/administrator`

1. [done] List all users
2. [done] Add a user
3. [done] Delete a user
4. Modify a user

### TODO
1. Access Control
Add user type, simple user / admin user
2. Login in page for admin and simple user

## sqlite3

1. start sqlite
```
sqlite
```

2. show helps
```
.help
```

3. load db.sqlite3
```
sqlite> .open db.sqlite3
```

4. show tables
```
.tables
```

5. show table schema
```
.schema auth_user
```
