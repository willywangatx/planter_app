# from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import Response 
from rest_framework import status

from django.db.models import F

from .serializers import TimerSerializer
from .models import Timer

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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def increment_focus_time(request):
    try:
        timer_id = request.data['id']
    except KeyError: 
        return Response({'details': {'required fields': ['id']}}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
         timer = Timer.objects.get(pk=timer_id)
         timer.focus_time = (F('focus_time') + 1)
        #  timer.update(focus_time=F('focus_time') + 1)
         timer.save()
         timer.refresh_from_db()
    except Timer.DoesNotExist: 
        raise Http404()

    serializer = TimerSerializer(timer)

    data = {'timers': serializer.data, 'response': 'Focus Time successfully incremented'}
    return Response(data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def decrement_focus_time(request):
    try: 
        timer_id = request.data['id']
        min_focus_time = request.data['min_focus_time']
    except KeyError: 
        return Response({'details': {'required fields': ['id', 'min_focus_time']}}, status=status.HTTP_400_BAD_REQUEST)
    
    try: 
        timer = Timer.objects.get(pk=timer_id)
        if timer.focus_time > min_focus_time:
            timer.focus_time = (F('focus_time') - 1)
            timer.save()
            timer.refresh_from_db()
    except Timer.DoesNotExist:
        raise Http404()

    serializer = TimerSerializer(timer)

    data = {'timers': serializer.data, 'response': 'Focus Time successfully decremented'}
    return Response(data, status=status.HTTP_200_OK)
        
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def increment_break_time(request):
    try: 
        timer_id = request.data['id']
    except KeyError: 
        return Response({'details': {'required fields': ['id']}}, status=status.HTTP_400_BAD_REQUEST)
    

    try: 
        timer = Timer.objects.get(pk=timer_id)
        timer.break_time = (F('break_time') + 1)
        timer.save()
        timer.refresh_from_db()
    except Timer.DoesNotExist:
        return Http404()
    
    serializer = TimerSerializer(timer)
    
    data = {'timers': serializer.data, 'response': 'Break Time successfully incremented'}
    return Response(data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def decrement_break_time(request):
    try: 
        min_break_time = request.data['min_break_time']
        timer_id = request.data['id']
    except KeyError:
        return Response({'details': {'required fields': ['id', 'min_focus_time']}}, status=status.HTTP_400_BAD_REQUEST)

    try:
        timer = Timer.objects.get(pk=timer_id)
        if timer.break_time > min_break_time:
            timer.break_time = (F('break_time') - 1)
            timer.save()
            timer.refresh_from_db()
    except Timer.DoesNotExist:
        return Http404()
    
    serializer = TimerSerializer(timer)

    data = {'timers': serializer.data, 'response': 'Break Time successfuly decremented'}
    return Response(data, status=status.HTTP_200_OK)