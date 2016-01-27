from django import forms

from .models import Game, Platform


class PlatformForm(forms.ModelForm):

    class Meta:
        model = Platform
        fields = ('name',)


class GameForm(forms.ModelForm):

    class Meta:
        model = Game
        fields = ('name', 'platform', 'start_date',
                  'end_date', 'finished',)
