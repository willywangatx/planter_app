from django.db import models
from gardens.models import Garden 
from tools.models import Tool
from plants.models import Plant

# Create your models here.

# many to many through relationship between item db and plot_detail
class Tool_Attachment (models.Model):
    plot = models.ForeignKey('Plot', on_delete=models.CASCADE)
    tool = models.ForeignKey(Tool, on_delete=models.CASCADE)

    def __str__(self):
        return ("(%s's row %s col %s) tool attachment: %s" % (self.plot.garden.profile.account.username, self.plot.row, self.plot.column, self.tool.tool_name))

class Plant_Attachment (models.Model):
    plot = models.ForeignKey('Plot', on_delete=models.CASCADE)
    plant = models.ForeignKey(Plant, on_delete=models.CASCADE)
    # incrementing indicates growth, decrementing indicates decay 
    plant_water_counter = models.IntegerField(default=0)
    last_watered = models.DateTimeField(auto_now=True)

class Plot(models.Model):
    garden = models.ForeignKey(Garden, related_name='plots', on_delete=models.CASCADE)
    
    row = models.IntegerField(default=None)
    column = models.IntegerField(default=None)

    tool = models.ManyToManyField(Tool, through='Tool_Attachment')
    plant = models.ManyToManyField(Plant, through='Plant_Attachment')

    # re-write as constants or class property of model 
    max_tool_attachments = models.IntegerField(default=3)
    max_plant_attachments = models.IntegerField(default=1, editable=False)

    def __str__(self):
        return ("%s's plot: row %s col %s" % (self.garden.profile.account.username, self.row, self.column))









