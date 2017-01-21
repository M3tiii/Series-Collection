"""main URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from rest_framework_nested import routers
from series import views

router = routers.DefaultRouter()

router.register(r'series', views.SeriesViewSet, base_name='series')
series_router = routers.NestedSimpleRouter(router, r'series', lookup='series')
series_router.register(r'seasons', views.SeasonViewSet, base_name='seasons')

seasons_router = routers.NestedSimpleRouter(series_router, r'seasons', lookup='season')##
seasons_router.register(r'episodes', views.EpisodeViewSet, base_name='episodes')##

router.register(prefix = 'award', viewset = views.AwardViewSet)
router.register(prefix = 'company', viewset = views.CompanyViewSet)
router.register(prefix = 'stat', viewset = views.StatViewSet)
router.register(prefix = 'statSeries', viewset = views.StatSeriesViewSet)
router.register(prefix = 'statEpisode', viewset = views.StatEpisodeViewSet)
router.register(prefix = 'director', viewset = views.DirectorViewSet)
router.register(prefix = 'creator', viewset = views.CreatorViewSet)
router.register(prefix = 'actor', viewset = views.ActorViewSet)

urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^', include(router.urls)),
    url(r'^', include(series_router.urls)),
    url(r'^', include(seasons_router.urls)),
]
