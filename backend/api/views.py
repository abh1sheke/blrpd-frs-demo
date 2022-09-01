from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from django.conf import settings

from images.models import SourceImage
from images.serializers import SourceImageSerializer
from .rekognition import FaceRecognition


class SourceImageView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get_faces(self, filename, image_path, detect_bucket, search_bucket, tablename):
        print(settings.MEDIA_ROOT)
        face_rek = FaceRecognition(
            filename, image_path, detect_bucket, search_bucket, tablename, settings.MEDIA_ROOT)
        images = face_rek.detectFaces()
        matches = []
        key = 0
        for image in images:
            match = face_rek.findMatches(image, key)
            if match != None:
                matches.append(match)
                key += 1
        return matches

    def post(self, request, *args, **kwargs):
        image_serializer = SourceImageSerializer(data=request.data)
        if image_serializer.is_valid():
            image_serializer.save()
            filename = image_serializer.data['image'].split('/')[3]
            image_path = f'{settings.MEDIA_ROOT}/images/{filename}'
            matches = self.get_faces(
                filename=filename,
                image_path=image_path,
                detect_bucket='detect-face',
                search_bucket='blrpd-frs-demo',
                tablename='blrpd-frs-demo'
            )
            return Response({'data': image_serializer.data, 'matches': matches}, status=status.HTTP_201_CREATED)
        else:
            print('error', image_serializer.errors)
            return Response(image_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def post_image(request, *args, **kwargs):
    return Response({'message': 'You are viewing API Home'})
