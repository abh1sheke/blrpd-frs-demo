from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create your views here.
@api_view(['POST'])
def post_image(request, *args, **kwargs):
    print(request.data)
    return Response({'data': 'hello world!'})
