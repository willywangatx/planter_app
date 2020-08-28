# from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import Response 
from django.db.models import Case, Value, When
from rest_framework import status
from django.http import Http404
from django.db.models import F
from .serializers import TimerSerializer
from .models import Timer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_timers(request):
    # timer_id = request.data.get('id')
    # cycle = request.data.get('current_cycle')
    # if not cycle: 
    #     return Response({'details': {'required fields': ['current_cycle']}}, status=status.HTTP_400_BAD_REQUEST) 

    timers = Timer.objects.filter(profile=request.user.profile)
    timers.update(current_cycle='Focus')
    timers.update(is_started=False)
    
    serializer = TimerSerializer(timers, many=True)
    data = {'timers': serializer.data, 'response': 'Timers Data successfully fetched'}
    return Response(data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def reset_timers(request):
    try: 
        timer_id = request.data['id']

    except KeyError:
        return Response({'details': {'required fields': ['id', 'current_focus_time', 'current_break_time']}}, status=status.HTTP_400_BAD_REQUEST)

    try: 
        timer = Timer.objects.get(pk=timer_id)
        focus_time = timer.focus_time
        break_time = timer.break_time
        timer.current_focus_time = focus_time
        timer.current_break_time = break_time
        # timer.current_focus_time = (F('current_focus_time') == focus_time)
        # timer.current_break_time = (F('current_break_time') == break_time)
        timer.save()
        # timer.refresh_from_db()
    except Timer.DoesNotExist:
        raise Http404()

    serializer = TimerSerializer(timer)
    data = {'timers': serializer.data, 'response': 'Timers successfully reset'}
    return Response(data, status=status.HTTP_200_OK)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def increment_focus_time(request):
    # try:
    #     timer_id = request.data['id']
    #     cft = request.data['current_focus_time']
    # except KeyError: 
    #     return Response({'details': {'required fields': ['id']}}, status=status.HTTP_400_BAD_REQUEST)

    # use get instead of requet.data so django doesn't try to save null value 
    timer_id = request.data.get('id')
    cft = request.data.get('current_focus_time')
    if not timer_id or not cft: 
        return Response({'details': {'required fields': ['id']}}, status=status.HTTP_400_BAD_REQUEST) 
    try:
        timer = Timer.objects.get(pk=timer_id)
        timer.current_focus_time = cft
        timer.focus_time = (F('focus_time') + 60)
        # timer.current_focus_time = (F('current_focus_time') + 60)
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

    timer_id = request.data.get('id')
    cft = request.data.get('current_focus_time')
    min_focus_time = request.data.get('min_focus_time')
    if not timer_id or not cft or not min_focus_time:
        return Response({'details': {'required fields': ['id', 'min_focus_time']}}, status=status.HTTP_400_BAD_REQUEST)
    # try: 
    #     timer_id = request.data['id']
    #     min_focus_time = request.data['min_focus_time']
    # except KeyError: 
    #     return Response({'details': {'required fields': ['id', 'min_focus_time']}}, status=status.HTTP_400_BAD_REQUEST)
    
    try: 
        timer = Timer.objects.get(pk=timer_id)
        if timer.focus_time > min_focus_time:
            timer.focus_time = (F('focus_time') - 60)
            if cft >= min_focus_time:
                timer.current_focus_timer = cft - 60
                # timer.current_focus_time = (F('current_focus_time') == 60)
            # else:
            #     timer.current_focus_time = (F('current_focus_time') == 0)

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

    timer_id = request.data.get('id')
    cbt = request.data.get('current_break_time')
    if not timer_id or not cbt: 
        return Response({'details': {'required fields': ['id']}}, status=status.HTTP_400_BAD_REQUEST) 

    try: 
        timer = Timer.objects.get(pk=timer_id)
        timer.break_time = (F('break_time') + 60)
        timer.current_break_time = cbt
        # timer.current_break_time = (F('break_time') + 60)
        
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

    timer_id = request.data.get('id')
    cbt = request.data.get('current_break_time')
    min_break_time = request.data.get('min_break_time')
    if not timer_id or not cbt or not min_break_time:
        return Response({'details': {'required fields': ['id', 'min_focus_time']}}, status=status.HTTP_400_BAD_REQUEST)

    try:
        timer = Timer.objects.get(pk=timer_id)
        if timer.break_time > min_break_time:
            timer.break_time = (F('break_time') - 60)
            if cbt >= min_break_time:
                timer.current_break_time = cbt - 60
            # else: 
            #     timer.current_break_time = (F('current_break_time') == 0)
            timer.save()
            timer.refresh_from_db()
    except Timer.DoesNotExist:
        return Http404()
    
    serializer = TimerSerializer(timer)

    data = {'timers': serializer.data, 'response': 'Break Time successfuly decremented'}
    return Response(data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def set_cycle(request):
    try: 
        timer_id = request.data['id']
    except KeyError:
        return Response({'details': {'required fields': ['id']}}, status=status.HTTP_400_BAD_REQUEST)

    try: 
        timer = Timer.objects.get(pk=timer_id)
        if timer.current_cycle == 'Focus':
            timer.current_cycle = 'Break'
            # timer.current_cycle = (F('current_cycle') == 'Break')
        elif timer.current_cycle == 'Break':
            # timer.current_cycle = (F('current_cycle') == 'Focus')
            timer.current_cycle = 'Focus'
        # else: 
        #     # timer.current_cycle = (F('current_cycle') == 'Focus')
        #     timer.current_cycle = 'Focus'
        timer.save()
        timer.refresh_from_db()
        # timer.refresh_from_db()
    except Timer.DoesNotExist:
        return Http404()

    serializer = TimerSerializer(timer)
    data = {'timers': serializer.data, 'response': 'Cycle successfuly set'}
    return Response(data, status=status.HTTP_200_OK)


# TODO: Figure out a way to set boolean value of is_startted using F() Expressions 
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def start_timers(request):
    try: 
        timer_id = request.data['id']
    except KeyError:
        return Response({'details': {'required fields': ['id']}}, status=status.HTTP_400_BAD_REQUEST)

    try: 
        timer = Timer.objects.get(pk=timer_id)
        if timer.is_started == False:
            timer.is_started = True
        timer.save()
    except Timer.DoesNotExist: 
        return Http404()
    
    serializer = TimerSerializer(timer)
    data = {'timers': serializer.data, 'response': 'Timers successfully started'}
    return Response(data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def stop_timers(request):
    try: 
        timer_id = request.data['id']
    except KeyError:
        return Response({'details': {'required fields': ['id']}}, status=status.HTTP_400_BAD_REQUEST)
    
    try: 
        timer = Timer.objects.get(pk=timer_id)
        if timer.is_started == True:
            timer.is_started = False
        timer.save()
    except Timer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = TimerSerializer(timer)
    data = {'timers': serializer.data, 'response': 'Timers successfully stopped'}
    return Response(data, status=status.HTTP_200_OK)


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def start_stop_toggle(request):
#     try:
#         timer_id = request.data['id']
#     except KeyError:
#         return Response({'details': {'required fields': ['id']}}, status=status.HTTP_400_BAD_REQUEST)

#     try: 
#         timer = Timer.objects.get(pk=timer_id)
#         if timer.is_started == True:
#             timer.is_started = (F('is_started') == False)
#         elif timer.is_started == False:
#             timer.is_started = (F('is_started') == True)
#         timer.save()
#         timer.refresh_from_db()
#     except Timer.DoesNotExist:
#         return Http404()

#     serializer = TimerSerializer(timer)
#     data = {'timers': serializer.data, 'response': 'Start/stop toggle successfully stopped'}
#     return Response(data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_current_times(request): 

    timer_id = request.data.get('id')
    cft = request.data.get('current_focus_time')
    cbt = request.data.get('current_break_time')
    if not timer_id or not cft or not cbt: 
        return Response({'details': {'required fields': ['id']}}, status=status.HTTP_400_BAD_REQUEST)
        
    try: 
        timer = Timer.objects.get(pk=timer_id)
        timer.current_focus_time = cft
        timer.current_break_time = cbt
        timer.save()
        timer.refresh_from_db()
    except Timer.DoesNotExist:
        return Http404()

    serializer = TimerSerializer(timer)
    data = {'timers': serializer.data, 'response': 'Current times updated successfully'}
    return Response(data, status=status.HTTP_200_OK)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_completed_focus_minutes(request): 
    try:
        timer_id = request.data['id']
    except KeyError: 
            return Response({'details': {'required fields': ['id']}}, status=status.HTTP_400_BAD_REQUEST)

    try: 
        timer = Timer.objects.get(pk=timer_id)
        ft = timer.focus_time / 60
        cfm = timer.completed_focus_minutes
        timer.completed_focus_minutes = cfm + ft
        timer.save(update_fields=['completed_focus_minutes'])
        timer.refresh_from_db()
    except Timer.DoesNotExist:
        return Http404()
    
    serializer = TimerSerializer(timer)
    data = {'timers': serializer.data, 'response': 'Completed focus minutes updated successfully'}
    return Response(data, status=status.HTTP_200_OK)