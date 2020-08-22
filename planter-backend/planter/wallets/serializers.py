from rest_framework import serializers
from .models import Wallet

class WalletSerializer(serializers.ModelSerializer):
    profile = serializers.IntegerField(source='profile.id', read_only=True)
    class Meta:
        model = Wallet
        fields = ['profile', 'energy', 'coins']