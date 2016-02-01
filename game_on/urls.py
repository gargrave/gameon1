from django.conf import settings
from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.contrib.auth import views as auth_views

from . import views

globalvars = {
    'globalvars': {
        'is_debug': settings.DEBUG,
        'version': settings.VERSION,
        'build': settings.BUILD}
}

admin.autodiscover()

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^api/', include('games.urls', namespace='api')),
    url(r'^admin/', include(admin.site.urls)),

    # login/logout
    url(r'^accounts/login', auth_views.login, {'extra_context': globalvars}, name='login'),
    url(r'^accounts/logout', auth_views.logout, {'next_page': '/'}, name='logout'),
]
