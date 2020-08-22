from rest_framework import serializers
from .models import Wallet

class WalletSerializer(serializers.ModelSerializer):
    # username = serializers.CharField(source='account.username', read_only=True)
    class Meta:
        model = Wallet
        fields = ['profile', 'energy', 'coins']