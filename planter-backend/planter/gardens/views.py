from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import Response
from rest_framework import status
from django.http import Http404

from .serializers import GardenSerializer
from .models import Garden

# Create your views here.
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_garden(request):
    garden = Garden.objects.get(profile=request.user.profile)
    serializer = GardenSerializer(garden)
    data = {'garden': serializer.data, 'response': 'Garden data successfully fetched'}
    return Response(data, status=status.HTTP_200_OK)
