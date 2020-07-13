from django.db import models
from django.apps import apps 
import datetime

# Create your models here.
class Garden(models.Model):
    profile = models.ForeignKey('Profile', on_delete=models.CASCADE)
    wallet = models.ForeignKey('Wallet', on_delete=models.CASCADE)
    timer = models.OneToOneField('Timer', on_delete=models.CASCADE)
    rows = models.IntegerField(default=1)
    columns = models.IntegerField(default=3)
    last_watered = models.DateTimeField(auto_now_add=True)