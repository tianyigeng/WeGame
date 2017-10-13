# -*- coding: utf-8 -*-
from django.http import HttpResponse

def home(request):
  return HttpResponse("UserID: 10086x   Name: Donald Trump")
