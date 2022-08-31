from django.urls import path
from .views import *

urlpatterns = [
    path('', post_image),
    path('post_image/', SourceImageView.as_view(), name='post_image')
]