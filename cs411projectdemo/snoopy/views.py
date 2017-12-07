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
from snoopy.models import Recommendation
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
        status = User.objects.filter(uid = id).values() #find if the user has already existed
        if len(status) == 0:
            create = User.objects.create(uid = id, name = password)
            resp = JsonResponse({'id':id, 'password':password}, safe=False)

        else:
            resp = JsonResponse({'id': None, 'password': None}, safe=False)

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
def GetPlayedGames(request):
    played = PlayGame.objects.all().values()
    resp = JsonResponse(list(played), safe=False)
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
def userInfoFriends(request,id):
    user = User.objects.filter(uid = id).values()
    result = []
    if len(user) != 0:
        thisUser = user[0]['uid']
        friends = Friendship.objects.filter(uid1 = thisUser).values()
        for f in list(friends):
            result.append({
                "uid":f['uid2'],
                "is_starred":f['is_starred']
            })


    resp = JsonResponse(list(result), safe=False)
    resp['Access-Control-Allow-Origin'] = '*'
    return resp


@csrf_exempt 
def userInfoGames(request, id):
    user = User.objects.filter(uid = id).values()
    gamesID = []
    if len(user) != 0:
        thisUser = user[0]['uid']
        games = PlayGame.objects.filter(uid = thisUser).values()
        for g in list(games):
            gamesID.append(g['gid'])

    result = []
    for gi in gamesID:
        game = Game.objects.filter(gid = gi).values()
        result.append({
            "name":game[0]["name"],
            "genre":game[0]["genre"],
            "gid":game[0]["gid"],
            "platform": game[0]["platform"],
            "publisher": game[0]["publisher"]
        })

    resp = JsonResponse(list(result), safe=False)
    resp['Access-Control-Allow-Origin'] = '*'
    return resp


@csrf_exempt
def userAddGame(request):
    if request.method == 'POST':
        jsonBody = json.loads(request.body)
        userid = jsonBody['uid']
        gameid = jsonBody['gid']
        games = Game.objects.filter(gid = gameid).values()
        if len(games) == 0 or games == None:
            return JsonResponse({'1':None}, safe=False)
        else:
            played = PlayGame.objects.filter(uid= userid, gid=gameid).values()
            if len(played) == 0 or played == None:
                create = PlayGame.objects.create(uid = userid, gid = gameid)
            result = []
            result.append({
                    "name":games[0]["name"],
                    "genre":games[0]["genre"],
                    "gid":games[0]["gid"],
                    "platform": games[0]["platform"],
                    "publisher": games[0]["publisher"]
            })
            resp = JsonResponse(list(result), safe = False)
            resp['Access-Control-Allow-Origin'] = '*'
            return resp

@csrf_exempt
def userDeleteGame(request):
    if request.method == 'POST':
        jsonBody = json.loads(request.body)
        userid = jsonBody['uid']
        gameid = jsonBody['gid']
        games = PlayGame.objects.filter(uid = userid, gid = gameid)
        if len(games) == 0 or games == None:
            return JsonResponse({'1':None}, safe=False)
        else:
            games[0].delete()
            return JsonResponse({'1':"Success"}, safe=False)

@csrf_exempt
def fuzzyQuery(request):
    if request.method == 'POST':
        jsonBody = json.loads(request.body)
        fuzzy = jsonBody['name']
        games = Game.objects.filter(name__icontains = fuzzy).values()
        resp = JsonResponse(list(games), safe=False)
        resp['Access-Control-Allow-Origin'] = '*'
        return resp

@csrf_exempt
def sameGenreGames(request):
    if request.method == 'POST':
        jsonBody = json.loads(request.body)
        genre = jsonBody['genre']
        games = Game.objects.filter(genre = genre).values()
        resp = JsonResponse(list(games), safe=False)
        resp['Access-Control-Allow-Origin'] = '*'
        return resp


@csrf_exempt
def requestFriend(request):
    if request.method == 'POST':
        jsonBody = json.loads(request.body)
        user1 = jsonBody['uid1']
        user2 = jsonBody['uid2']
        user = User.objects.filter(uid=user2).values()
        if len(user) == 0 or user == None:
            resp = JsonResponse({'1':None,'2':None}, safe=False)
            resp['Access-Control-Allow-Origin'] = '*'
            return resp
        else:
            status = Friendship.objects.filter(uid1=user2, uid2=user1).values()
            if len(status) == 0:
                create = Friendship.objects.create(uid1=user2, uid2=user1, is_starred=1)
            resp = JsonResponse({'1':jsonBody['uid1'],'2':jsonBody['uid2']}, safe=False)
            resp['Access-Control-Allow-Origin'] = '*'
            return resp

@csrf_exempt
def confirmFriend(request):
    if request.method == 'POST':
        jsonBody = json.loads(request.body)
        user1 = jsonBody['uid1']
        user2 = jsonBody['uid2']
        status = Friendship.objects.filter(uid1=user1, uid2=user2, is_starred=1).update(is_starred=2)
        create = Friendship.objects.create(uid1 = user2, uid2 = user1, is_starred=2)
        resp = JsonResponse({'1':jsonBody['uid1'],'2':jsonBody['uid2']}, safe=False)
        resp['Access-Control-Allow-Origin'] = '*'
        return resp

@csrf_exempt
def signin(request):
    if request.method == 'POST':
        jsonBody = json.loads(request.body)
        username = jsonBody['uid']
        password = jsonBody['name']
        user = User.objects.filter(uid=username).values()

        if len(user) == 0 or user == None:

            resp = JsonResponse({'login':0}, safe=False)
            resp['Access-Control-Allow-Origin'] = '*'
            return resp

        elif user[0]['name'] != password:
            resp = JsonResponse({'login': 1}, safe=False)
            resp['Access-Control-Allow-Origin'] = '*'
            return resp

        else:
            resp = JsonResponse({'login': 2}, safe=False)
            resp['Access-Control-Allow-Origin'] = '*'
            return resp

@csrf_exempt
def deleteFriend(request):
    if request.method == 'POST':
        jsonBody = json.loads(request.body)
        user1 = jsonBody['uid1']
        user2 = jsonBody['uid2']
        user = Friendship.objects.filter(uid1=user1, uid2=user2, is_starred = 2)
        another_user = Friendship.objects.filter(uid1=user2, uid2=user1, is_starred = 2)
        if len(user) == 0 or user == None:
            return HttpResponse("user pair doesn't exist")
        else:
            try:
                user[0].delete()
                another_user[0].delete()
                return JsonResponse({'1':user1, '2': user2}, safe=False)
            except Exception as e:
                return HttpResponse(e.message)

@csrf_exempt
def recommendation(request):
    if request.method == 'POST':
        jsonBody = json.loads(request.body)
        user1 = jsonBody['uid']
        result = []
        user = Recommendation.objects.filter(uid1 = user1).values()
        for u in user:
            result.append({
            "uid1":u['uid1'],
            "uid2":u['uid2'],
            "score":u["score"]
            })
        resp = JsonResponse(list(result), safe=False)
        resp['Access-Control-Allow-Origin'] = '*'
        return resp

@csrf_exempt
def GetRcommendation(request):
    recom = Recommendation.objects.all().values()
    return JsonResponse(list(recom), safe=False)
