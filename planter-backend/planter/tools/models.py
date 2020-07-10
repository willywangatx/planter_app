from django.db import models


# Create your models here.
class Tool(models.Model):
    tool_id = models.AutoField(primary_key=True)
    tool_name = models.CharField(max_length=50)
    tool_description = models.CharField(max_length=500)
    # type is what kind of tool/where you can put it
    # ex: a water bucket can be added to an irrigation 
    # slot, but not a soil slot 
    tool_type = models.CharField(max_length=100)
    water_attribute = models.IntegerField()
    # hardiness_attribute = models.IntegerField()
    growth_attribute = models.IntegerField()
    time_before_decay_attribute = models.DurationField()
    wither_attribute = models.IntegerField()
    yield_attribute = models.IntegerField()
    yield_price_attribute = models.IntegerField()
    tool_price = models.IntegerField()
    # tools_ressale_value = models.IntegerField()

