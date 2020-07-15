from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import Response 
from django.http import Http404

# Create your views here.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def load_profile(request):
    pass

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_profile(request): 
    pass 

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_profile(request):
    # profile = {'id': 1, 'name': 'John', 'focusTime': 25, 'breakTime': 5}
    return Response(request.user.id)