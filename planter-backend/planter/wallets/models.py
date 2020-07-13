from django.db import models
from django.apps import apps 

# Create your models here.
class Wallet(models.Model):
    profile = models.ForeignKey('Profile', on_delete=models.CASCADE)
    # should i give user some coins to start out? 
    energy = models.FloatField(default=10)
    coins = models.IntegerField(default=10)
    # reference to timer so walet knows when to increment coins 
    timer = models.ForeignKey('Timer', on_delete=models.CASCADE)