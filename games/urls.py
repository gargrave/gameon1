from django.conf.urls import patterns, include, url

from . import views

urlpatterns = [
    # games API Urls
    url(r'^games/?$', views.games_list, name='games_list'),
    url(r'^games/(?P<pk>\d+)/?$', views.game_detail, name='game_detail'),
    url(r'^games/create/?$', views.game_create, name='game_create'),
    # url(r'^games/delete/?$', views.game_delete, name='game_delete'),

    # platforms API URLs
    url(r'^platforms/?$', views.platforms_list, name='platforms_list'),
    url(r'^platforms/(?P<pk>\d+)/?$', views.platform_detail, name='platform_detail'),
    url(r'^platforms/create/?$', views.platform_create, name='platform_create'),
    url(r'^platforms/delete/?$', views.platform_delete, name='platform_delete'),
]
