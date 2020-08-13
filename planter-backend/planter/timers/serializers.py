from rest_framework import serializers
from .models import Timer

class TimerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timer
        fields = "__all__"

    def update(self, instance, validated_data):
        for (key, value) in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        
        return instance 
        # fields = ['focus_time', 'break_time', 'current_focus_time', 'completed_focus_counter', 'logged_focus_minutes']


    
    
       