# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desidered behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from __future__ import unicode_literals

from django.db import models


class Friendship(models.Model):
    id = models.AutoField(primary_key = True)
    uid1 = models.TextField(blank=True, null=True)
    uid2 = models.TextField(blank=True, null=True)
    #time_created = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'FRIENDSHIP'


class Game(models.Model):
    gid = models.IntegerField(primary_key = True)
    name = models.TextField(blank=True, null=True)
    genre = models.TextField(blank=True, null=True)
    year = models.IntegerField(blank=True, null=True)
    publisher = models.TextField(blank=True, null=True)
    global_sales = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'GAME'


class PlayGame(models.Model):
    sid = models.IntegerField(primary_key = True)
    uid = models.IntegerField(blank=True, null=True)
    gid = models.IntegerField(blank=True, null=True)
    duration_played = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'PLAY_GAME'


class User(models.Model):
    uid = models.AutoField(primary_key=True)
    name = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'USER'
