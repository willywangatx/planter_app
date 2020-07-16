from rest_framework import serializers
from .models import Account

class AccountSerializer(serializers.ModelSerializer):

    # confirm_password = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    class Meta:
        model = Account
        # fields = ['username', 'email', 'password', 'confirm_password']
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    # def create(self):
    #     account = Account(
    #         email=self.validated_data['email'],
    #         username=self.validated_data['username'],
    #     )
    #     password = self.validated_data['password'],
    #     confirm_password = self.validated_data['confirm_password']

    #     if password != confirm_password: 
    #         raise serializer.ValidationError({'password': 'Passwords do not match.'})

    #     account.set_password(password)
    #     account.save()
    #     return account

    def create(self, validated_data):
        return Account.objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        
        for (key, value) in validated_data.items():
            setattr(instance, key, value)

        if password is not None:
            instance.set_password(password)
        instance.save()

        return instance 

    
    
       