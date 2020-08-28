from rest_framework import serializers 
from .models import Profile 
# from timers.serializers import TimerSerializer
from gardens.serializers import GardenSerializer
from plots.serializers import PlotSerializer, ToolAttachmentSerializer
from tasks.serializers import TaskSerializer
# from timers.models import Timer
# from timers.models import Timer
# from accounts.models import Account 

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='account.username', read_only=True)
    email = serializers.EmailField(source='account.email', read_only=True)
    # timers = TimerSerializer(many=True, read_only=True)
    gardens = GardenSerializer(many=True, read_only=True)
    tasks = TaskSerializer(many=True, read_only=True)
    # tool_attachment = ToolAttachmentSerializer(many=True, read_only=True)
    plots = PlotSerializer(many=True, read_only=True)
    class Meta: 
        model = Profile
        fields = [ 'username', 'email', 'gardens', 'tasks', 'plots']


        # attempt 1 

        # def update_timers(self, instance, validated_data):
        #     data = validated_data.pop('timers')
        #     timers = instance.timers.all()
        #     # timers = list(albums)
        #     instance.focus_time = validated_data.get('focus_time', instance.focus_time)
        #     instance.break_time = validated_data.get('break_time', instance.break_time)
        #     instance.save()
        #     return instance

        # attempt 2 

        # def update(self, instance, validated_data):
        #     data = validated_data.pop('timers', instance.timers)
        #     timers = Timer.objects.get_or_create(data)
        #     instance.timers = timers
        #     instance.save()
        #     return instance

        # attempt 3 

        # def update(self, instance, validated_data):
        #     timers_data = validated_data.pop('timers')
        #     timer = instance.timers.get(pk=obj.pk)

        #     Timer.objects.filter(pk=obj.pk).update(focus_time=F('focus_time') + 1)

        #     for (key, value) in validated_data.items():
        #         setattr(instance, key, value)

        #     timers.save()
        #     return instance
            






            # for timers_data in timers_data:
            #     timers = timers.pop(0)
            #     timers.focus_time = timers_data.get('focus_time', timers.focus_time)
            #     timers.break_Time = 

    # def update(self, instance, validated_data):
    #     timers_data = validated_data.pop('timers')
    #     timers = instance.timers

    #     profile.focus_time = timers_data.get('focus_time', timers.focus_time)
    #     timers.save()

    #     return instance 




    # def update(self, instance, validated_data):
    #     for (key, value) in validated_data.items():
    #         setattr(instance, key, value)
    #     instance.save()
    #     return instance

    # def create(self, validated_data):
    #     pass
   
   