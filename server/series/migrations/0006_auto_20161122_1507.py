# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-11-22 15:07
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('series', '0005_auto_20161122_1457'),
    ]

    operations = [
        migrations.CreateModel(
            name='Director',
            fields=[
                ('person_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='series.Person')),
                ('id_director', models.IntegerField(default=0)),
            ],
            bases=('series.person',),
        ),
        migrations.CreateModel(
            name='Stat',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ratingF', models.DecimalField(decimal_places=1, default=0.0, max_digits=2)),
                ('ratingI', models.DecimalField(decimal_places=1, default=0.0, max_digits=2)),
                ('votesF', models.IntegerField(default=0)),
                ('votesI', models.IntegerField(default=0)),
            ],
        ),
        migrations.RemoveField(
            model_name='person',
            name='ratingF',
        ),
        migrations.RemoveField(
            model_name='person',
            name='ratingI',
        ),
        migrations.RemoveField(
            model_name='person',
            name='votesF',
        ),
        migrations.RemoveField(
            model_name='person',
            name='votesI',
        ),
        migrations.AddField(
            model_name='person',
            name='birthDate',
            field=models.DateField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='person',
            name='name',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AddField(
            model_name='person',
            name='surname',
            field=models.CharField(default='', max_length=100),
        ),
    ]