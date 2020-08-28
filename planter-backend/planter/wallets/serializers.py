from rest_framework import serializers
from .models import Wallet

class WalletSerializer(serializers.ModelSerializer):
    # profile_id = serializers.IntegerField(source='profile.id', read_only=True)
    class Meta:
        model = Wallet
        # fields = ['id', 'energy', 'coins']
        fields = "__all__"