from django.db import models
from profiles.models import Profile
from tools.models import Tool
from plants.models import Plant
# Create your models here.


class Shed (models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    tool = models.ManyToManyField(Tool, through='Tool_Shed')
    plant = models.ManyToManyField(Plant,through='Plant_Shed')
    # in_use = models.BooleanField()
    # shed_capacity = models.IntegerField()


class Tool_Shed (models.Model):
    shed = models.ForeignKey(Shed, on_delete=models.CASCADE)
    tool = models.ForeignKey(Tool, on_delete=models.CASCADE)
    quantity_in_shed = models.IntegerField()

class Plant_Shed (models.Model):
    shed = models.ForeignKey(Shed, on_delete=models.CASCADE)
    plant = models.ForeignKey(Plant, on_delete=models.CASCADE)
    quantity_in_shed = models.IntegerField()
