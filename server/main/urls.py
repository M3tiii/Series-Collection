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
from rest_framework import routers
from series import views

router = routers.DefaultRouter()
router.register(prefix = 'series', viewset = views.SeriesViewSet)
router.register(prefix = 'season', viewset = views.SeasonViewSet)
router.register(prefix = 'episode', viewset = views.EpisodeViewSet)
router.register(prefix = 'award', viewset = views.AwardViewSet)
router.register(prefix = 'company', viewset = views.CompanyViewSet)
router.register(prefix = 'stat', viewset = views.StatViewSet)
router.register(prefix = 'person', viewset = views.PersonViewSet)
router.register(prefix = 'director', viewset = views.DirectorViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = router.urls#[
#     url(r'^', include(router.urls)),
#     url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
# ]
