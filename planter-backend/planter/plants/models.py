from django.db import models
import datetime 

# Create your models here.
class Plant(models.Model):
    plant_id = models.AutoField(primary_key=True)
    plant_name = models.CharField(max_length=50)
    plant_description = models.CharField(max_length=500)
    plant_type = models.CharField(max_length=20, default='')

    # integer indicating how many times it needs to be watered before fully grown/harvest 
    # ex: 5 indicates it needs to be watered 5 times (if there is no decay before this is reached)
    # once this number is reached, the plant stops decaying. 
    num_waters_to_harvest = models.IntegerField()

    # time interval before decay starts if not watered. 
    #  based off the last_watered info on the through relatoinship w. plot_details
    # use a chron timer to track - would each plot_Detail need to have it's own 
    # timer or is there a way to round the last_watered time up to the next 30 min 
    # for decay action? then it can be compared to 1 universal timer for updates every 30min 
    # better way to express - when the plant is watered, take that current value from last_watered
    # and add the time_before_decay time to that to figure when the plant will begin to decay
    time_before_decay = models.DurationField(default=0)

    # wither_rate number than represents how fast/how much is taken from the 
    # num_waters_needed_to_harvest. ex -1 watering cycles/ 2 hours = -.5 water/hr  
    wither_rate = models.IntegerField(default=0)

    # how many (seeds/fruit/flower) are produced when harvested
    harvest_yield = models.IntegerField(default=0)

    # how many coins user can earn selling harvest. will be same as resale value of actual plant
    harvest_price = models.IntegerField(default=0)
    # purchase price of plant - price to buy from the market 
    plant_price = models.IntegerField(default=0)

    # ENERGY REQUIREMENTS 
    #energy needed to attach seed to plot_details: ex 1 energy
    plant_seed_energy = models.IntegerField(default=0)
    #energy needed to water plot_detail 
    water_energy = models.IntegerField(default=0)
    # energy needed to harvest plant 
    harvest_energy = models.IntegerField(default=0)

    def __str__(self):
        return self.plant_name
    

