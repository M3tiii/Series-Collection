from django.db import models
from django.db.models.signals import post_save
from datetime import date
from django.core.validators import MinValueValidator
from django.dispatch import receiver

class Person(models.Model):
    name = models.CharField(max_length=100, default="")
    surname = models.CharField(max_length=100, default="", blank=True)
    birthDate = models.DateField(default=date.today, blank=True)

class Director(Person):
    id_director = models.AutoField(primary_key=True)

class Creator(Person):
    id_creator = models.AutoField(primary_key=True)

class Actor(Person):
    id_actor = models.AutoField(primary_key=True)

class Company(models.Model):
    id_company = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, default="")
    country = models.CharField(max_length=100, default="", blank=True)

class Award(models.Model):
    id_award = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, default="")

class Series(models.Model):
    title = models.CharField(primary_key=True, db_index=True, max_length=100)
    releaseDate = models.DateField(default=date.today, blank=True)
    website = models.URLField(max_length=500, default="", blank=True)
    language = models.CharField(max_length=100, default="", blank=True)
    category = models.CharField(max_length=100, default="", blank=True)
    actors = models.ManyToManyField(Actor, blank=True)
    creators = models.ManyToManyField(Creator, blank=True)
    directors = models.ManyToManyField(Director, blank=True)
    company = models.ManyToManyField(Company, blank=True)
    awards = models.ManyToManyField(Award, through="Grant", blank=True)
    # def save(self, *args, **kwargs):
    #     if not self.pk:
    #         stat = Stat.create(self)
    #         b = Stat(series_pk = title)
    #         book = Stat.objects.create_stat(self)
    #         book.save()
    #         Stat.create()
    #         stat.save()
    #         b.save()
    #         stat.series_pk = title
    #     return super(Series, self).save(*args, **kwargs)

class Grant(models.Model):
    id_grant = models.AutoField(primary_key=True)
    date = models.DateField(default=date.today)
    category = models.CharField(default="", max_length=100, blank=True)
    award = models.ForeignKey(Award)
    series = models.ForeignKey(Series)

class Season(models.Model):
    series = models.ForeignKey(Series)
    id = models.AutoField(primary_key=True)
    number = models.IntegerField(default=1, validators = [MinValueValidator(1)])
    episodes = models.IntegerField(default=0, validators = [MinValueValidator(0)])

    class Meta:
        unique_together = ("series", "number")

class Episode(models.Model):
    series = models.ForeignKey(Series)
    season = models.ForeignKey(Season)
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100, default="", blank=True)
    releaseDate = models.DateField(default=date.today, blank=True)
    runtime = models.IntegerField(default=0, validators = [MinValueValidator(0)])
    views = models.IntegerField(default=0, validators = [MinValueValidator(0)])
    prevViews = models.IntegerField(default=0)
    def __init__(self, *args, **kwargs):
        super(Episode, self).__init__(*args, **kwargs)
        self.prevViews = self.views
    def delete(self, *args, **kwargs):
        self.season.episodes -= 1
        self.season.save()
        stats = Stat.objects.filter(series=self.series.title).first()
        stats.views -= self.views
        stats.updateAverage()
        stats.save()
        return super(Episode, self).delete(*args, **kwargs)
    def save(self, *args, **kwargs):
        stats = Stat.objects.filter(series=self.series.title).first()
        if not self.pk:
            self.season.episodes += 1
            self.season.save()
        else:
            stats.views -= self.prevViews
        stats.views += self.views
        stats.updateAverage()
        stats.save()
        return super(Episode, self).save(*args, **kwargs)

class StatManager(models.Manager):
    def create_stat(self, series):
        stat = self.create(series=series)
        return stat

class Stat(models.Model):
    series = models.ForeignKey(Series)
    id = models.AutoField(primary_key=True)
    views = models.IntegerField(default=0, validators = [MinValueValidator(0)])
    avViews = models.IntegerField(default=0, validators = [MinValueValidator(0)])
    ratingF = models.IntegerField(default=0, validators = [MinValueValidator(0)])
    ratingI = models.IntegerField(default=0, validators = [MinValueValidator(0)])
    votesF = models.IntegerField(default=0, validators = [MinValueValidator(0)])
    votesI = models.IntegerField(default=0, validators = [MinValueValidator(0)])
    objects = StatManager()

    def updateAverage(self):
        allEpisodes = 0
        for s in Season.objects.filter(series=self.series):
            allEpisodes += s.episodes
        self.avViews = self.views / allEpisodes
