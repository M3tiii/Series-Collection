from series.models import Series, Season
from rest_framework import serializers


class SeriesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Series
        fields = ('title', 'url', 'releaseDate', 'website', 'language', 'category')

class SeasonSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Season
        fields = ('series', 'number', 'episodes')
