from rest_framework import serializers 
from .models import Profile 
from timers.serializers import TimerSerializer
# from timers.models import Timer
# from accounts.models import Account 

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='account.username', read_only=True)
    email = serializers.EmailField(source='account.email', read_only=True)
    timers = TimerSerializer(many=True, read_only=True)
    class Meta: 
        model = Profile
        fields = ['id', 'username', 'email', 'timers']

   
   