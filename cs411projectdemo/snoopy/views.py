# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.forms import model_to_dict
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
from django.core import serializers
from django.forms.models import model_to_dict

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
            return JsonResponse({'delete':id},safe=False)
        except Exception as e:
            return HttpResponse(e.message)

@csrf_exempt 
def addUser(request):

    if request.method == 'POST':
        jsonBody = json.loads(request.body)
        id = jsonBody['idname']
        password = jsonBody['password']
        create = User.objects.create(uid = id, name = password)
        resp = JsonResponse({'id':id, 'password':password}, safe=False)
        resp['Access-Control-Allow-Origin'] = '*'
        return resp
        # return HttpResponseRedirect('/user/'+str(id))

@csrf_exempt
def GetUsers(request):
    users = User.objects.all().values()
    resp = JsonResponse(list(users), safe=False)
    resp['Access-Control-Allow-Origin'] = '*'
    return resp

@csrf_exempt
def GetFriends(request):
    friend = Friendship.objects.all().values()
    resp = JsonResponse(list(friend), safe=False)
    resp['Access-Control-Allow-Origin'] = '*'
    return resp

@csrf_exempt
def userInfoFriends(request,id):
    user = User.objects.filter(uid = id).values()
    thisUser = user[0]['uid']
    friends = Friendship.objects.filter(uid1 = thisUser).values()
    result = []
    for f in list(friends):
        result.append(f['uid2'])

    resp = JsonResponse(list(result), safe=False)
    resp['Access-Control-Allow-Origin'] = '*'
    return resp



@csrf_exempt
def userInfo(request,id):
    user = User.objects.filter(uid=id).values()
    resp = JsonResponse(list(user)[0], safe = False)
    resp['Access-Control-Allow-Origin'] = '*'
    return resp

@csrf_exempt
def listGame(request):
    games = Game.objects.all().values()
    resp = JsonResponse({'result':list(games)}, safe=False)
    resp['Access-Control-Allow-Origin'] = '*'
    return resp

@csrf_exempt 
def userInfoGames(request, id):
    try:
        user = User.objects.get(uid = id)
    except:
        return JsonResponse([], safe = False)
    gss = PlayGame.objects.filter(uid = id)
    resp = JsonResponse([model_to_dict(gs.gid) for gs in gss], safe=False)
    resp['Access-Control-Allow-Origin'] = '*'
    return resp

@csrf_exempt
def addFriend(request):
    if request.method == 'POST':
        jsonBody = json.loads(request.body)
        user1 = jsonBody['uid1']
        user2 = jsonBody['uid2']
        create = Friendship.objects.create(uid1=user1, uid2=user2)
        return JsonResponse({'1':jsonBody['uid1'],'2':jsonBody['uid2']}, safe=False)


@csrf_exempt
def deleteFriend(request):
    if request.method == 'POST':
        jsonBody = json.loads(request.body)
        user1 = jsonBody['uid1']
        user2 = jsonBody['uid2']
        user = Friendship.objects.filter(uid1=user1, uid2=user2)
        if len(user) == 0 or user == None:
            return HttpResponse("user pair doesn't exist")
        else:
            try:
                user[0].delete()
                return JsonResponse({'1':user1, '2': user2}, safe=False)
            except Exception as e:
                return HttpResponse(e.message)

"""

    user1 = request.POST["uid1"]
    user2 = request.POST["uid2"]
    user = Friendship.objects.filter(uid1 = user1, uid2 = user2)
    if user == None:
        return HttpResponse("user pair doesn't exist")
    else:
        try:
            user.delete()
            return HttpResponseRedirect("/")
        except Exception as e:
            return HttpResponse(e.message)

    return JsonResponse([], safe = False)
    """
