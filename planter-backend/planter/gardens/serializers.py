from rest_framework import serializers 
from .models import Garden 
# from plots.serializers import PlotSerializer
# from plots.models import Plot


class GardenSerializer(serializers.ModelSerializer):
    # plots = PlotSerializer(many=True, read_only=True)
    class Meta:
        model = Garden 
        fields = ['rows', 'columns']

    # def create(self, validated_data):
    #     plots_data = validated_data.pop('plots')
    #     garden = Garden.objects.create(**validated_data)
    #     for plot_data in plots_data:
    #         Plot.objects.create(garden=garden, **plot_data)
    #     return garden
