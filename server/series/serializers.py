from series.models import Series, Season, Episode, Grant, Award, Company, Stat, Person, Director, Creator, Actor
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
        series_pk = self.context['view'].kwargs['series_pk']
        kwargs['series'] = Series.objects.get(pk=series_pk)
        return super(SeasonSerializer, self).save(*args, **kwargs)

class EpisodeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Episode
        fields = ('id', 'title', 'releaseDate', 'runtime', 'views')
    def save(self, *args, **kwargs):
        series_pk = self.context['view'].kwargs['series_pk']
        season_pk = self.context['view'].kwargs['season_pk']
        kwargs['series'] = Series.objects.get(pk=series_pk)
        kwargs['season'] = Season.objects.get(series=series_pk, pk=season_pk)
        return super(EpisodeSerializer, self).save(*args, **kwargs)

class StatSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Stat
        fields = ('id', 'views', 'ratingF', 'ratingI', 'votesF', 'votesI')
    def save(self, *args, **kwargs):
        series_pk = self.context['view'].kwargs['series_pk']
        kwargs['series'] = Series.objects.get(pk=series_pk)
        return super(StatSerializer, self).save(*args, **kwargs)

# class StatSeriesSerializer(StatSerializer):
#     class Meta:
#         model = StatSeries
#         fields = ('__all__')
#
# class StatEpisodeSerializer(StatSerializer):
#     class Meta:
#         model = StatEpisode
#         fields = ('__all__')
