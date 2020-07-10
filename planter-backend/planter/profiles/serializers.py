from rest_framework import serializers 
from .models import Profile 

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='account.username', read_only=True)
    external_id = serializers.UUIDField(source='account.external_id', read_only=True)

    class Meta: 
        model = Profile
        # Pass in all the fields that we want to return to the user 
        fields = ['account.username', 'account.external_id', 'focus_time', 'break_time', 'current_focus_time', 'focus_counter']

