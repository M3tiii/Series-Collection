from django.db import models
from django.utils import timezone

class Series(models.Model):
    title = models.CharField(max_length=100, default="")
    releaseDate = models.DateTimeField(default=timezone.now)
    website = models.URLField(max_length=500, default="")
    language = models.CharField(max_length=100, default="")
    category = models.CharField(max_length=100, default="")

class Season(models.Model):
    series = models.ForeignKey(Series)
    number = models.IntegerField(default=0)
    episodes = models.IntegerField(default=0)

class Episode(models.Model):
    series = models.ForeignKey(Series)  #TODO
    season = models.ForeignKey(Season)
    title = models.CharField(max_length=100, default="")
    releaseDate = models.DateTimeField(default=timezone.now)
    runtime = models.IntegerField(default=0)

class Award(models.Model): #TODO
    series = models.ForeignKey(Series)
    name = models.CharField(max_length=100, default="")
    releaseDate = models.DateTimeField(default=timezone.now) #TODO

class Company(models.Model):
    #id - primary key
    series = models.ForeignKey(Series)
    name = models.CharField(max_length=100, default="")
    country = models.CharField(max_length=100, default="")
