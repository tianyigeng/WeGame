# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
# https://simpleisbetterthancomplex.com/tutorial/2017/09/26/how-to-create-django-data-migrations.html

# https://docs.djangoproject.com/en/1.11/topics/db/models/

class User(models.Model):
    username = models.CharField(max_length = 255)
    create_time = models.DateTimeField(auto_now_add = True)
    password = models.CharField(max_length = 255)
    age = models.PositiveIntegerField()
    school = models.CharField(max_length = 255)

    def __str__(self):
        return self.username
