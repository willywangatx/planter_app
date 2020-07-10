from django.db import models
from gardens.models import Garden
# from sheds.models import Shed
from tools.models import Tool
from plants.models import Plant

# Create your models here.
class Plot_Detail(models.Model):
    garden = models.ForeignKey(Garden, on_delete=models.CASCADE)
    row = models.IntegerField()
    column = models.IntegerField()

    tool = models.ManyToManyField(Tool, through=Tool_Attachment, on_delete=models.CASCADE)
    plant = models.ManyToManyField(Plant, through=Plant_Attachment, on_delete=models.CASCADE)

    # re-write as constants or class property of model 
    max_tool_attachments = models.IntegerField(default=3)
    max_plant_attachments = models.IntegerField(default=1, editable=False)


class Tool_Attachement (models.Model):
    plot_detail = models.ForeignKey(Plot_Detail, on_delete=models.CASCADE)
    tool = models.ForeignKey(Tool, on_delete=models.CASCADE)

class Plant_Attachement (models.Model):
    plot_detail = models.ForeignKey(Plot_Detail, on_delete=models.CASCADE)
    plant = models.ForeignKey(Plant, on_delete=models.CASCADE)
    # incrementing indicates growth, decrementing indicates decay 
    plant_water_counter = models.IntegerField()
    last_watered = models.DateTimeField()




