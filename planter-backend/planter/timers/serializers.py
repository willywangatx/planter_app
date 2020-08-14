from rest_framework import serializers
# from profiles.serializers import ProfileSerializer
from .models import Timer

class TimerSerializer(serializers.ModelSerializer):
    # profile = serializers.RelatedField(read_only=True)

    class Meta:
        model = Timer
        fields = "__all__"

    # def update(self, instance, validated_data):
    #     for (key, value) in validated_data.items():
    #         setattr(instance, key, value)
    #     instance.save()
    #     return instance 
    
    # def update(self, instance, validated_data):
    #     timers_data = validated_data.pop('timers')
    #     timer = instance.timers.get(pk=obj.pk)

    #     Timer.objects.filter(pk=obj.pk).update(focus_time=F('focus_time') + 1)

    #     for (key, value) in validated_data.items():
    #         setattr(instance, key, value)

    #     timers.save()
    #     return instance

    
        # fields = ['focus_time', 'break_time', 'current_focus_time', 'completed_focus_counter', 'logged_focus_minutes']


    
    
       