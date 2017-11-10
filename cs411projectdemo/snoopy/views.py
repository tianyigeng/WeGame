# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponse
from django.http import Http404
from django.shortcuts import render
from django.shortcuts import redirect
from snoopy.models import User

from django.views.decorators.csrf import csrf_exempt


import json
from django.http import JsonResponse

# Create your views here.
@csrf_exempt
def index(request):
    return render(request, 'index.html')

def deleteuser(request, id):
    user = User.objects.get(uid = id)
    if user == None:
        return HttpResponse("user %s doesn't exist" % id)
    else:
        try:
            user.delete()
            return redirect("/")
        except Exception as e:
            return HttpResponse(e.message)

@csrf_exempt
def GetUsers(request):
    users = User.objects.all().values()[:20]
    return JsonResponse(list(users), safe=False)
