from rest_framework import viewsets
from series.serializers import SeriesSerializer, SeasonSerializer, EpisodeSerializer, AwardSerializer, GrantSerializer, CompanySerializer, StatSerializer, PersonSerializer, DirectorSerializer, CreatorSerializer, ActorSerializer, StatSeriesSerializer, StatEpisodeSerializer
from series.models import Series, Season, Episode, Award, Grant, Company, Stat, StatSeries, StatEpisode, Person, Director, Creator, Actor
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

"""
API endpoint that allows users to be viewed or edited.
"""

class SeriesViewSet(viewsets.ModelViewSet):
    queryset = Series.objects.all()
    serializer_class = SeriesSerializer
    def list(self, request,):
        queryset = Series.objects.filter()
        serializer = SeriesSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)
    def retrieve(self, request, pk=None):
        queryset = Series.objects.filter()
        series = get_object_or_404(queryset, pk=pk)
        serializer = SeriesSerializer(series, context={'request': request})
        return Response(serializer.data)

class SeasonViewSet(viewsets.ModelViewSet):
    queryset = Season.objects.all()
    serializer_class = SeasonSerializer
    def list(self, request, series_pk=None):
        queryset = Season.objects.filter(series=series_pk)
        serializer = SeasonSerializer(queryset, many=True)
        return Response(serializer.data)
    def retrieve(self, request, pk=None, series_pk=None):
        queryset = Season.objects.filter(pk=pk, series=series_pk)
        season = get_object_or_404(queryset, pk=pk)
        serializer = SeasonSerializer(season)
        return Response(serializer.data)

class EpisodeViewSet(viewsets.ModelViewSet):
    queryset = Episode.objects.all()
    serializer_class = EpisodeSerializer
    def list(self, request, series_pk=None, season_pk=None):
        queryset = Episode.objects.filter(season__series=series_pk, season=season_pk)
        serializer = EpisodeSerializer(queryset, many=True)
        return Response(serializer.data)
    def retrieve(self, request, pk=None, series_pk=None, season_pk=None):
        queryset = Episode.objects.filter(pk=pk, season__series=series_pk, season=season_pk)
        episode = get_object_or_404(queryset, pk=pk)
        serializer = EpisodeSerializer(episode)
        return Response(serializer.data)

class GrantViewSet(viewsets.ModelViewSet):
    queryset = Grant.objects.all()
    serializer_class = GrantSerializer

class AwardViewSet(viewsets.ModelViewSet):
    queryset = Award.objects.all()
    serializer_class = AwardSerializer

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class StatViewSet(viewsets.ModelViewSet):
    queryset = Stat.objects.all()
    serializer_class = StatSerializer
    def list(self, request, series_pk=None):
        queryset = Stat.objects.filter(series=series_pk)
        serializer = StatSerializer(queryset, many=True)
        return Response(serializer.data)
    def retrieve(self, request, pk=None, series_pk=None):
        queryset = Stat.objects.filter(pk=pk, series=series_pk)
        stat = get_object_or_404(queryset, pk=pk)
        serializer = StatSerializer(stat)
        return Response(serializer.data)

class StatSeriesViewSet(viewsets.ModelViewSet):
    queryset = StatSeries.objects.all()
    serializer_class = StatSeriesSerializer

class StatEpisodeViewSet(viewsets.ModelViewSet):
    queryset = StatEpisode.objects.all()
    serializer_class = StatEpisodeSerializer

class DirectorViewSet(viewsets.ModelViewSet):
    queryset = Director.objects.all()
    serializer_class = DirectorSerializer

class CreatorViewSet(viewsets.ModelViewSet):
    queryset = Creator.objects.all()
    serializer_class = CreatorSerializer

class ActorViewSet(viewsets.ModelViewSet):
    queryset = Actor.objects.all()
    serializer_class = ActorSerializer
