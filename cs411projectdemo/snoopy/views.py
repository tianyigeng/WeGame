# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponse
from django.http import Http404
from django.shortcuts import render
from django.shortcuts import redirect
from django.shortcuts import HttpResponseRedirect
from snoopy.models import User
from snoopy.models import Game
from snoopy.models import Friendship
from snoopy.models import PlayGame
from django.views.decorators.csrf import csrf_exempt


import json
from django.http import JsonResponse

# Create your views here.
@csrf_exempt
def index(request):
    return render(request, 'index.html')

@csrf_exempt 
def deleteuser(request, id):
    user = User.objects.get(uid = id)
    if user == None:
        return HttpResponse("user %s doesn't exist" % id)
    else:
        try:
            user.delete()
            return HttpResponseRedirect("/")
        except Exception as e:
            return HttpResponse(e.message)

@csrf_exempt 
def addUser(request):
    username = request.POST["u'name'"]
    create = User.objects.create(name = username)
    return HttpResponseRedirect("/")

@csrf_exempt
def GetUsers(request):
    users = User.objects.all().values()[:20]
    return JsonResponse(list(users), safe=False)

@csrf_exempt
def listGame(request):
    games = Game.objects.all().values()
    return JsonResponse(list(games), safe=False)

@csrf_exempt 
def userInfo(request, id):
    try:
        user = User.objects.get(uid = id)
    except:
        return HttpResponse("User %s doesn't exist" % id)
    games = []
    friends = []
    try:
        games = PlayGame.objects.get(uid = id)
    except:
        games = []
    try:
        friends = Friendship.objects.get(uid1 = id)
    except:
        friends = []
    return JsonResponse(friends, safe=False)
