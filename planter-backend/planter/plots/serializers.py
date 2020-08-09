from rest_framework import serializers 
from .models import *
from tools.models import Tool

class PlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plot
        fields = "__all__" 

class ToolAttachmentSerializer(serializers.ModelSerializer):
    tool_name = serializers.ReadOnlyField(source=Tool)
    class Meta:
        model = Tool_Attachment
        fields = ('tool_name')
