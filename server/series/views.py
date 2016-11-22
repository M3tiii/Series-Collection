from rest_framework import viewsets
from series.serializers import SeriesSerializer, SeasonSerializer, EpisodeSerializer, AwardSerializer, CompanySerializer, StatSerializer, PersonSerializer, DirectorSerializer, CreatorSerializer, ActorSerializer, StatSeriesSerializer, StatEpisodeSerializer
from series.models import Series, Season, Episode, Award, Company, Stat, StatSeries, StatEpisode, Person, Director, Creator, Actor


class SeriesViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Series.objects.all()
    serializer_class = SeriesSerializer

class SeasonViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Season.objects.all()
    serializer_class = SeasonSerializer

class EpisodeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Episode.objects.all()
    serializer_class = EpisodeSerializer

class AwardViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Award.objects.all()
    serializer_class = AwardSerializer

class CompanyViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class StatViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Stat.objects.all()
    serializer_class = StatSerializer

class StatSeriesViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = StatSeries.objects.all()
    serializer_class = StatSeriesSerializer

class StatEpisodeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = StatEpisode.objects.all()
    serializer_class = StatEpisodeSerializer

# class PersonViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows users to be viewed or edited.
#     """
#     queryset = Person.objects.all()
#     serializer_class = PersonSerializer

class DirectorViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Director.objects.all()
    serializer_class = DirectorSerializer

class CreatorViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Creator.objects.all()
    serializer_class = CreatorSerializer

class ActorViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Actor.objects.all()
    serializer_class = ActorSerializer
