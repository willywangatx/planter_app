from rest_framework import serializers 
from .models import Task 

class TaskSerializer(serializers.ModelSerializer):
    class Meta: 
        fields = (
            'id',
            'profile',
            'task_date',
            'task',
            'completed',
        )
        model = Task