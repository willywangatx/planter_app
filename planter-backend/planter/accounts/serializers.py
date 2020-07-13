from rest_framework import serializers
from .models import Account

class AccountSerializer(serializers.ModelSerializer):

    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    class Meta:
        model = Account
        fields = ['username', 'email', 'password', 'password2']
        extra_kwargs = {'password': {'write_only': True}}

    # def save(self):
    #     account = Account(
    #         email=self.validated_data['email'],
    #         username=self.validated_data['username'],
    #     )
    #     password = self.validated_data['email'],
    #     password2 = self.validated_data['password2']

    #     if password != password2: 
    #         raise serializer.ValidationError({'password': 'Passwords must match.'})

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

    
    
       