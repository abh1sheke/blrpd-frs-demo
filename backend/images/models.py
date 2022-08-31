from distutils.command.upload import upload
from django.db import models

# Create your models here.
class SourceImage(models.Model):
    filename = models.CharField
    image = models.ImageField(upload_to='images')