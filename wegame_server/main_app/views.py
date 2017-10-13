# -*- coding: utf-8 -*-
from django.http import HttpResponse
import MySQLdb

def home(request):
  connection = MySQLdb.connect(host='localhost',    # your host, usually localhost
                               user='root',        # your username
                               passwd='Admin!2017',      # your password
                               db='WeGame')         # name of the database
  cursor = connection.cursor()
  cursor.execute('''
    SELECT uid, name FROM USER LIMIT 1
  ''')
  data = cursor.fetchone()
  uid, name = data

  return HttpResponse('UserID: %s\nName: %s' % uid, name)
