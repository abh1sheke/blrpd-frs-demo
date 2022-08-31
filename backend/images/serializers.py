from rest_framework import serializers
from .models import SourceImage

class SourceImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SourceImage
        fields = '__all__'