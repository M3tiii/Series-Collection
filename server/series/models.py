from django.db import models
from django.utils import timezone

class Series(models.Model):
    title = models.CharField(max_length=100, default="")
    releaseDate = models.DateTimeField(default=timezone.now)
    website = models.URLField(max_length=500, default="")
    language = models.CharField(max_length=100, default="")
    category = models.CharField(max_length=100, default="")
