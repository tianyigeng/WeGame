# -*- coding: utf-8 -*-

from django import forms
from demo.models import User

# Create your views here.

class UserForm(forms.ModelForm):

    class Meta:
        password = forms.CharField(widget = forms.PasswordInput)
        model = User
        fields = ('username', 'password', 'age', 'school')

    # def __str__(self):
     #   return "Username: %s, Age: %d, School: %s." % self.username, self.age, self.school
