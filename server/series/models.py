from django.db import models
from datetime import date

class Person(models.Model):
    name = models.CharField(max_length=100, default="")
    surname = models.CharField(max_length=100, default="")
    birthDate = models.DateField(default=date.today)

class Director(Person):
    id_director = models.AutoField(primary_key=True)

class Creator(Person):
    id_creator = models.AutoField(primary_key=True)

class Actor(Person):
    id_actor = models.AutoField(primary_key=True)

class Company(models.Model):
    id_company = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, default="")
    country = models.CharField(max_length=100, default="")

class Award(models.Model):
    id_award = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, default="")

class Series(models.Model):
    title = models.CharField(primary_key=True, db_index=True, max_length=100)
    releaseDate = models.DateField(default=date.today)
    website = models.URLField(max_length=500, default="")
    language = models.CharField(max_length=100, default="")
    category = models.CharField(max_length=100, default="")
    actors = models.ManyToManyField(Actor, blank=True)
    creators = models.ManyToManyField(Creator, blank=True)
    directors = models.ManyToManyField(Director, blank=True)
    company = models.ManyToManyField(Company, blank=True)
    awards = models.ManyToManyField(Award, through="Grant", blank=True)

class Grant(models.Model):
    id_grant = models.AutoField(primary_key=True)
    date = models.DateField(default=date.today)
    award = models.ForeignKey(Award)
    series = models.ForeignKey(Series)

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
    releaseDate = models.DateField(default=date.today)
    runtime = models.IntegerField(default=0)
    def delete(self, *args, **kwargs):
        self.season.episodes -= 1
        self.season.save()
        return super(Episode, self).delete(*args, **kwargs)
    def save(self, *args, **kwargs):
        if not self.pk:
            self.season.episodes += 1
            self.season.save()
        return super(Episode, self).save(*args, **kwargs)

class Stat(models.Model):
    series = models.ForeignKey(Series)
    id = models.AutoField(primary_key=True)
    ratingF = models.DecimalField(max_digits=2, decimal_places=1, default=0.0) #FloatField
    ratingI = models.DecimalField(max_digits=2, decimal_places=1, default=0.0)
    votesF = models.IntegerField(default=0)
    votesI = models.IntegerField(default=0)

class StatSeries(Stat):
    views = models.IntegerField(default=0)

class StatEpisode(Stat):
    views = models.IntegerField(default=0)
