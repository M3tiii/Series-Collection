from series.models import Series, Season, Episode, Grant, Award, Company, Stat, Person, Director, Creator, Actor
from rest_framework import serializers
from django.db import IntegrityError
from django.http import HttpResponse, Http404, HttpResponseNotFound
from django.core.exceptions import SuspiciousOperation

class PersonSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Person
        fields = ('name', 'surname', 'birthDate')

class DirectorSerializer(PersonSerializer):
    class Meta:
        model = Director
        fields = ('id_director', 'url', 'name', 'surname', 'birthDate')

class CreatorSerializer(PersonSerializer):
    class Meta:
        model = Creator
        fields = ('id_creator', 'url', 'name', 'surname', 'birthDate')

class ActorSerializer(PersonSerializer):
    class Meta:
        model = Actor
        fields = ('id_actor', 'url', 'name', 'surname', 'birthDate')

class CompanySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Company
        fields = ('id_company', 'url', 'name', 'country')

class GrantSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Grant
        fields = ('id_grant', 'date', 'award', 'series', 'category')#'id_award', 'url', 'img',

class AwardSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Award
        fields = ('id_award', 'url', 'name')#'id_award', 'url', 'img',

class SeriesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Series
        fields = ('url', 'actors', 'directors', 'creators', 'company', 'awards', 'title', 'releaseDate', 'website', 'language', 'category')

class SeasonSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Season
        fields = ('id', 'number', 'episodes')
    def save(self, *args, **kwargs):
        try:
            series_pk = self.context['view'].kwargs['series_pk']
            kwargs['series'] = Series.objects.get(pk=series_pk)
            return super(SeasonSerializer, self).save(*args, **kwargs)
        except IntegrityError as e:
            # return HttpResponse("ERROR: Season already exists!")
            res = Http404("Season already exists")
            # res.detail = "Sesaon"
            # raise res
            # raise HttpResponse("ERROR: Season already exists!")
            # return HttpResponseNotFound('<h1>Page not found</h1>')
            # raise SuspiciousOperation("Invalid request; see documentation for correct paramaters")

class EpisodeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Episode
        fields = ('id', 'number', 'title', 'releaseDate', 'runtime', 'views')
    def save(self, *args, **kwargs):
        series_pk = self.context['view'].kwargs['series_pk']
        season_pk = self.context['view'].kwargs['season_pk']
        kwargs['series'] = Series.objects.get(pk=series_pk)
        kwargs['season'] = Season.objects.get(series=series_pk, pk=season_pk)
        return super(EpisodeSerializer, self).save(*args, **kwargs)

class StatSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Stat
        fields = ('id', 'views', 'avViews', 'ratingF', 'ratingI', 'votesF', 'votesI')
    def save(self, *args, **kwargs):
        series_pk = self.context['view'].kwargs['series_pk']
        kwargs['series'] = Series.objects.get(pk=series_pk)
        return super(StatSerializer, self).save(*args, **kwargs)
