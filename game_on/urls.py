from django.conf.urls import patterns, include, url
from django.contrib import admin

from . import views

admin.autodiscover()

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^api/', include('games.urls', namespace='api')),
    url(r'^admin/', include(admin.site.urls)),
]
