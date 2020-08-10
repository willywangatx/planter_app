from rest_framework import serializers 
from .models import *
from tools.serializers import ToolSerializer
from plants.serializers import PlantSerializer

class ShedSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Shed
        fields = "__all__"
