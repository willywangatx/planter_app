# from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import Response 
from rest_framework import status
# from django.http import Http404

from .serializers import TimerSerializer
from .models import Timer
# from accounts.models import Account


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_focus_time(request):
    
    serializer = TimeSerializer(data=request.data)

    if not serializer.is_valid():
        serializer.errors
        return Response(serializer.errors, status.HTTP_500_INTERNAL_SERVER_ERROR)

    timers = serializers.save()

    data = {'timers': serializer.data, 'response': 'setFocusTime successfully updated'}

    return Response(data, status=status.HTTP_200_OK)