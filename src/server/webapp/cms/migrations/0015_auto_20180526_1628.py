# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-05-26 16:28
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0014_auto_20180526_1443'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cta',
            old_name='category',
            new_name='header',
        ),
        migrations.AddField(
            model_name='cta',
            name='selector',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]