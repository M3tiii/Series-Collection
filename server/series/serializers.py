from series.models import Series
from rest_framework import serializers


class SeriesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Series
        fields = ('url', 'title', 'releaseDate', 'website', 'language', 'category')
