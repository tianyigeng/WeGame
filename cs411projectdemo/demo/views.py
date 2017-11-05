# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponse
from django.http import Http404
from django.shortcuts import render
from django.shortcuts import redirect
from demo.models import User
from demo.forms import UserForm

# Create your views here.
def index(request):
	return HttpResponse("Anonymous Group")

def adduser(request):
    if request.method == 'POST':
        try:
            userForm = UserForm(request.POST)
            if userForm.is_valid():
                user = User();
                user.username = userForm.cleaned_data['username']
                user.password = userForm.cleaned_data['password']
                user.age = userForm.cleaned_data['age']
                user.school = userForm.cleaned_data['school']
                user.save()
                return redirect("/userdetails/%s" % user.pk)
            else:
                redirect("/adduser")
        except Exception as e:
            return HttpResponse(e.message)
    else:
        form = UserForm()
        return render(request, 'adduser.html', {'form': form})

def deleteuser(request, id):
    user = User.objects.get(pk = id)
    if user == None:
        return HttpResponse("user %s doesn't exist" % id)
    else:
        try:
            user.delete()
            return redirect("/administrator")
        except Exception as e:
            return HttpResponse(e.message)

def userdetails(request, id):
    user = User.objects.get(pk = id)
    return render(request, 'userdetails.html', {"user": user})

def administrator(request):
    users = User.objects.all()
    print len(users)
    return render(request, 'administrator.html', {'users': users})
