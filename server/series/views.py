from rest_framework import viewsets
from series.serializers import SeriesSerializer, SeasonSerializer
from series.models import Series, Season


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
