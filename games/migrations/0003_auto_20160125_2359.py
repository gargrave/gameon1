# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-01-25 23:59
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0002_auto_20160125_2351'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='platform',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='games.Platform'),
        ),
    ]
