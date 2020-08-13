from rest_framework import serializers 
from .models import Profile 
from timers.serializers import TimerSerializer
from gardens.serializers import GardenSerializer
from plots.serializers import PlotSerializer, ToolAttachmentSerializer
from tasks.serializers import TaskSerializer
# from timers.models import Timer
# from accounts.models import Account 

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='account.username', read_only=True)
    email = serializers.EmailField(source='account.email', read_only=True)
    timers = TimerSerializer(many=True, read_only=True)
    gardens = GardenSerializer(many=True, read_only=True)
    tasks = TaskSerializer(many=True, read_only=True)
    # tool_attachment = ToolAttachmentSerializer(many=True, read_only=True)
    plots = PlotSerializer(many=True, read_only=True)
    class Meta: 
        model = Profile
        fields = ['id', 'username', 'email', 'timers', 'gardens', 'tasks', 'plots']


    def update(self, instance, validated_data):
        for (key, value) in validated_data.items():
            setattr(instance, key, value)

        return instance

   
   