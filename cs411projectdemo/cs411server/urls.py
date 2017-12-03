"""cs411server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.views.generic import TemplateView
from django.conf.urls import url
from snoopy import views
urlpatterns = [
    url(r'^GetUsers/$',views.GetUsers),
    url(r'^GetFriends/$',views.GetFriends),
    url(r'^GetPlayedGames/$',views.GetPlayedGames),
    url(r'^userInfo/(?P<id>.*)$',views.userInfo),
    url(r'^deleteuser/(?P<id>.*)$', views.deleteuser),
    url(r'^$', TemplateView.as_view(template_name='index.html')),
    url(r'^listGame/$',views.listGame),
    url(r'^addUser/$',views.addUser),
    url(r'^userInfoGames/(?P<id>.*)$',views.userInfoGames),
    url(r'^userInfoFriends/(?P<id>.*)$', views.userInfoFriends),
    url(r'^addFriend/$', views.addFriend),
    url(r'^deleteFriend/$',views.deleteFriend),
    url(r'^signIn/$',views.signin),
    url(r'^sameGenreGames/$',views.sameGenreGames),
    url(r'^fuzzyQuery/$',views.fuzzyQuery),
]
