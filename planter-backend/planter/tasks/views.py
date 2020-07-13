from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import Response 
from django.http import Http404
from rest_framework import generics 
from .models import Task
from .serializers import TaskSerializer 


@api_view(['Post'])
@permission_class([IsAuthenticated])
class TaskList(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

