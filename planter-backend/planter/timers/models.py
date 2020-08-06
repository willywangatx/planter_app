from django.db import models
from profiles.models import Profile

# Create your models here.
class Timer(models.Model):

    # Use foreign key to give flexibility 
    profile = models.ForeignKey(Profile, related_name='timers', on_delete=models.CASCADE)
    focus_time = models.IntegerField(default=25)
    break_time = models.IntegerField(default=5) 
    # needed to keep timer state between page loads
    curent_focus_time = models.IntegerField(default=25)
    # intervals divisable by 4 get extra energy points 
    completed_focus_counter = models.IntegerField(default=0)
    logged_focus_minutes = models.IntegerField(default=0)

    def __str__(self):
        return self.profile.account.username