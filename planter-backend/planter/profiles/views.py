from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import Response 
from rest_framework import status
# from django.http import Http404

from .serializers import ProfileSerializer
from .models import Profile
# from accounts.models import Account
# from timers.serializers import TimerSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_profile(request):
    
    serializer = ProfileSerializer(request.user.profile)

    # timer_serializer = TimerSerializer(request.user.profile.timer)


    # TODO: have profile point to specific users profile
    data = {'profile': serializer.data, 'response': 'Profile Data successfully fetched'}
    # data = {'profile': profile_serializer.data, 'timer': timer_serializer.data, 'response': 'Profile Data successfully fetched'}
    # profile = users[]
    return Response(data, status=status.HTTP_200_OK)


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def update_profile(request):
#     serializer = ProfileSerializer(request.user.profile, data=request.data, partial=True)

#     serializer.is_valid(raise_exception=True)

#     # if not serializer.is_valid():
#     #     # serializers.errors

#     #     # update error statement to bad request and raise_exception=True,
#     #     return Response(serializer.errors, status=HTTP_500_INTERNAL_SERVER_ERROR)
    
#     serializer.save()

#     data = {'profile': serializer.data, 'response': 'Profile Data successfully updated'}
#     return Response(data, status=status.HTTP_200_OK)