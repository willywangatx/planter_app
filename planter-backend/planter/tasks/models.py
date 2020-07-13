from django.db import models
from django.apps import apps 
import datetime

# Create your models here.
class Task(models.Model):
    profile = models.ForeignKey('Profile', on_delete=models.CASCADE)
    task_date = models.DateField(default=datetime.date.today)
    task = models.CharField(max_length=500)
    completed = models.BooleanField(default=False)

    def __string__(self):
        return self.task



