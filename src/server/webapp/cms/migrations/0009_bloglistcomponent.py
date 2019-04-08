# -*- coding: utf-8 -*-
# Generated by Django 1.11.15 on 2019-03-03 15:20
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0008_bloglist'),
    ]

    operations = [
        migrations.CreateModel(
            name='BlogListComponent',
            fields=[
                ('basemodule_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='cms.BaseModule')),
            ],
            options={
                'manager_inheritance_from_future': True,
            },
            bases=('cms.basemodule',),
        ),
    ]