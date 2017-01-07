from django.db import models
from datetime import date

class Series(models.Model):
    title = models.CharField(primary_key=True, db_index=True, max_length=100)
    releaseDate = models.DateField(default=date.today) #DateTimeField
    website = models.URLField(max_length=500, default="")
    language = models.CharField(max_length=100, default="")
    category = models.CharField(max_length=100, default="")

class Season(models.Model):
    series = models.ForeignKey(Series)
    id = models.AutoField(primary_key=True)
    number = models.IntegerField(default=0)
    episodes = models.IntegerField(default=0)

class Episode(models.Model):
    series = models.ForeignKey(Series)  #TODO
    season = models.ForeignKey(Season)
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100, default="")
    releaseDate = models.DateField(default=date.today) #DateTimeField
    runtime = models.IntegerField(default=0)

class Award(models.Model): #TODO
    series = models.ForeignKey(Series)
    name = models.CharField(max_length=100, default="")
    year = models.DateField(default=date.today) #releaseDate #DateTimeField

class Company(models.Model):
    #id_company = models.PrimaryKey
    series = models.ForeignKey(Series)
    name = models.CharField(max_length=100, default="")
    country = models.CharField(max_length=100, default="")

class Stat(models.Model):
    ratingF = models.DecimalField(max_digits=2, decimal_places=1, default=0.0) #FloatField
    ratingI = models.DecimalField(max_digits=2, decimal_places=1, default=0.0)
    votesF = models.IntegerField(default=0)
    votesI = models.IntegerField(default=0)

class StatSeries(Stat):
    views = models.IntegerField(default=0)

class StatEpisode(Stat):
    views = models.IntegerField(default=0)

class Person(models.Model):
    name = models.CharField(max_length=100, default="")
    surname = models.CharField(max_length=100, default="")
    birthDate = models.DateField(default=date.today)

class Director(Person):
    id_director = models.IntegerField(default=0)

class Creator(Person):
    id_creator = models.IntegerField(default=0)

class Actor(Person):
    id_actor = models.IntegerField(default=0)
