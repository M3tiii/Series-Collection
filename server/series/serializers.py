from series.models import Series, Season, Episode, Award, Company, Stat, StatSeries, StatEpisode, Person, Director, Creator, Actor
from rest_framework import serializers

class PersonSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Person
        fields = ('name', 'surname', 'birthDate')

class DirectorSerializer(PersonSerializer):
    class Meta:
        model = Director
        #fields = ('__all__') #+id_director
        # exclude = ('id_director',) #needs to be a list or tuple. thats why ','
        fields = ('id_director', 'url', 'name', 'surname', 'birthDate')

class CreatorSerializer(PersonSerializer):
    class Meta:
        model = Creator
        # exclude = ('id_creator', 'name')
        fields = ('id_creator', 'url', 'name', 'surname', 'birthDate')

class ActorSerializer(PersonSerializer):
    class Meta:
        model = Actor
        fields = ('id_actor', 'url', 'name', 'surname', 'birthDate')

class CompanySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Company
        fields = ('id_company', 'name', 'country')

class SeriesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Series
        fields = ('actors', 'directors', 'creators', 'title', 'releaseDate', 'website', 'language', 'category') #'company'

class SeasonSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Season
        fields = ('id', 'number', 'episodes')
    def save(self, *args, **kwargs):
        series_pk = self.context['view'].kwargs['series_pk']
        kwargs['series'] = Series.objects.get(pk=series_pk)
        return super(SeasonSerializer, self).save(*args, **kwargs)

class EpisodeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Episode
        fields = ('id', 'title', 'releaseDate', 'runtime')
    def save(self, *args, **kwargs):
        series_pk = self.context['view'].kwargs['series_pk']
        season_pk = self.context['view'].kwargs['season_pk']
        kwargs['series'] = Series.objects.get(pk=series_pk)
        kwargs['season'] = Season.objects.get(series=series_pk, pk=season_pk)
        return super(EpisodeSerializer, self).save(*args, **kwargs)

class AwardSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Award
        fields = ('series', 'name', 'year')

class StatSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Stat
        fields = ('ratingF', 'ratingI', 'votesF', 'votesI')

class StatSeriesSerializer(StatSerializer):
    class Meta:
        model = StatSeries
        fields = ('__all__')

class StatEpisodeSerializer(StatSerializer):
    class Meta:
        model = StatEpisode
        fields = ('__all__')
