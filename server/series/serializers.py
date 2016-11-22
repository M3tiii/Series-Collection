from series.models import Series, Season, Episode, Award, Company, Stat, Person, Director
from rest_framework import serializers


class SeriesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Series
        fields = ('title', 'url', 'releaseDate', 'website', 'language', 'category')

class SeasonSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Season
        fields = ('series', 'number', 'episodes')

class EpisodeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Episode
        fields = ('series', 'season', 'title', 'releaseDate', 'runtime')

class AwardSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Award
        fields = ('series', 'name', 'year')

class CompanySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Company
        fields = ('series', 'name', 'country')

class StatSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Stat
        fields = ('ratingF', 'ratingI', 'votesF', 'votesI')

class PersonSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Person
        fields = ('name', 'surname', 'birthDate')

class DirectorSerializer(PersonSerializer):
    class Meta:
        model = Director
        fields = ('__all__') #id_director dont show?
