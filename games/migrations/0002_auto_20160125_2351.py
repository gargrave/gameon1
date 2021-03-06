# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-01-25 23:51
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('start_date', models.DateTimeField()),
                ('end_date', models.DateTimeField()),
                ('finished', models.BooleanField(default=False)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ('platform', 'name'),
            },
        ),
        migrations.AlterModelOptions(
            name='platform',
            options={'ordering': ('name',)},
        ),
        migrations.AddField(
            model_name='platform',
            name='created',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2016, 1, 25, 23, 51, 3, 412347, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='platform',
            name='modified',
            field=models.DateTimeField(auto_now=True, default=datetime.datetime(2016, 1, 25, 23, 51, 12, 60286, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='game',
            name='platform',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='games_on_platform', to='games.Platform'),
        ),
    ]
