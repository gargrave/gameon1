from django.contrib import admin

from .models import Platform, Game


@admin.register(Platform)
class PlatformAdmin(admin.ModelAdmin):
    list_display = ['name', 'created', 'modified', 'pk']


@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    list_display = ['name', 'platform', 'start_date',
                    'end_date', 'created', 'modified', 'pk']
