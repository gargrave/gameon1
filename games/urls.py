from django.conf.urls import patterns, include, url

from . import views

urlpatterns = [
    url(r'^games$', views.games_list, name='games_list'),
    url(r'^platforms', views.platforms_list, name='platforms_list'),
]
