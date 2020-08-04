from rest_framework import serializers
from .models import Timer

class TimerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timer
        fields = ['focus_time', 'break_time', 'current_focus_time', 'completed_focus_counter', 'logged_focus_minutes']


    
    
       