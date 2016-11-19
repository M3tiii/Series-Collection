from rest_framework import viewsets
from series.serializers import SeriesSerializer
from series.models import Series


class SeriesViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Series.objects.all()
    serializer_class = SeriesSerializer
