from rest_framework import serializers 
from .models import Profile 
# from accounts.models import Account 

class ProfileSerializer(serializers.ModelSerializer):
    # username = serializers.CharField(source='accounts.Account', read_only=True)
    # external_id = serializers.UUIDField(source='account.external_id', read_only=True)

    class Meta: 
        model = Profile
        # Pass in all the fields that we want to return to the user 
        fields = ['id']
        # fields = ['account.username']

