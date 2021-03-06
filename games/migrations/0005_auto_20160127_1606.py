# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-01-27 16:06
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0004_auto_20160126_0504'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='created',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='game',
            name='modified',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='platform',
            name='created',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='platform',
            name='modified',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
