from django import forms

from .models import Platform


class PlatformForm(forms.ModelForm):

    class Meta:
        model = Platform
        fields = ('name',)
