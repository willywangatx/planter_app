from django.db import models
import datetime
from profiles.models import Profile

# Create your models here.
class Task(models.Model):
    profile = models.ForeignKey(Profile, related_name='tasks', on_delete=models.CASCADE)
    task_date = models.DateField(default=datetime.date.today)
    label = models.CharField(max_length=50, default='')
    task = models.CharField(max_length=500, default='')
    completed = models.BooleanField(default=False)

    def __string__(self):
        return ('%s: %s' %(task_date, label))



