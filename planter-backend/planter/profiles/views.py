from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import Response 
from django.http import Http404
from .serializers import ProfileSerializer
from .models import Profile
from accounts.models import Account
# Create your views here.
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def load_profile(request):
#     pass

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def update_profile(request): 
#     pass 

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_profile(request):
    serializer = ProfileSerializer(request.user.profile)
    # serializer = ProfileSerializer()
    # timer = Profile.objects.select_related('profile').get(id=profile.id)

    # TODO: have profile point to specific users profile
    # users = Account.objects.all()

    # profile = users[]
    return Response(serializer.data)
    # return Response(profile)