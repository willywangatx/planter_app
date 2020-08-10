from rest_framework import serializers 
from .models import *
# from tools.models import Tool
from tools.serializers import ToolSerializer
from plants.serializers import PlantSerializer

class ToolAttachmentSerializer(serializers.ModelSerializer):
    tool = ToolSerializer(read_only=True, many=True)
    # plot = PlotSerializer(read_only=True, many=True)
    class Meta:
        model = Tool_Attachment
        fields = ['tool']

class PlantAttachmentSerializer(serializers.ModelSerializer):
    plant = PlantSerializer(read_only=True, many=True)
    class Meta:
        model = Plant_Attachment
        fields = ['plant']
        

class PlotSerializer(serializers.ModelSerializer):
    tool = ToolAttachmentSerializer(read_only=True, many=True)
    plant = PlantAttachmentSerializer(read_only=True, many=True)
    class Meta:
        model = Plot
        fields = ['tool', 'plant']
