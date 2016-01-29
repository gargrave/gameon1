from django.conf.urls import patterns, include, url

from . import views

urlpatterns = [
    # games API Urls
    url(r'^games/?$', views.games_list, name='games_list'),
    url(r'^games/create/?$', views.game_create, name='game_create'),

    # platforms API URLs
    url(r'^platforms/?$', views.platforms_list, name='platforms_list'),
    url(r'^platforms/(?P<id>\d+)/?$', views.platform_detail, name='platform_detail'),
    url(r'^platforms/create/?$', views.platform_create, name='platform_create'),
]
