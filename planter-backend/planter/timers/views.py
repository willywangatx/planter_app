# from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import Response 
from rest_framework import status

from .serializers import TimerSerializer
from .models import Timer

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def update_timer(request):
#     serializer = TimerSerializer(request.user.profile.timers, data=request.data, partial=True)
#     serializer.is_valid(raise_exception=True)
#     serializer.save()

#     data = {'timers': serializer.data, 'response': 'Timer Data successfully updated'}
#     return Response(data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_timers(request):

    timers = Timer.objects.filter(profile=request.user.profile)
    # request.user.profile.timers.all()
    serializer = TimerSerializer(timers, many=True)


    # timers = Timer.objects.get(pk=timers.id)

    # data=request.data meansa you're updating or creating something
    # parital=True is for updating/creating
    # serializer = TimerSerializer(request.user.profile.timers.id, data=request.data, partial=True)
    
    # serializer.is_valid(raise_exception=True)
    # serializer.save()

    data = {'timers': serializer.data, 'response': 'Timers Data successfully fetched'}
    return Response(data, status=status.HTTP_200_OK)