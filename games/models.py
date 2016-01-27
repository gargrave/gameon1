from django.db import models


class Platform(models.Model):
    name = models.CharField(max_length=100, unique=True)

    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('name',)

    def __str__(self):
        return self.name


class Game(models.Model):
    name = models.CharField(max_length=100, unique=True)
    platform = models.ForeignKey(Platform)
    start_date = models.DateField()
    end_date = models.DateField()
    finished = models.BooleanField(default=False)

    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('platform', 'name',)

    def __str__(self):
        return self.name
