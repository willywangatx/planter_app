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
    water_attribute = models.IntegerField(default=0)
    # hardiness_attribute = models.IntegerField()
    growth_attribute = models.IntegerField(default=0)
    time_before_decay_attribute = models.DurationField(default=0)
    wither_attribute = models.IntegerField(default=0)
    yield_attribute = models.IntegerField(default=0)
    yield_price_attribute = models.IntegerField(default=0)
    tool_price = models.IntegerField(default=0)
    # tools_ressale_value = models.IntegerField()

    def __str__(self):
        return self.tool_name

