from django.db import models
import datetime
from profiles.models import Profile
from wallets.models import Wallet
from timers.models import Timer

# signals 
from django.dispatch import receiver
from django.db.models.signals import post_save


# Create your models here.
class Garden(models.Model):
    @receiver(post_save, sender=Profile)
    def create_garden_for_new_profile(sender, created, instance, **kwargs):
        if created:
            garden = Garden(profile=instance)
            garden.save()
    # profile = models.OneToOneField(Profile, on_delete=models.CASCADE)
    profile = models.ForeignKey(Profile, related_name='gardens', on_delete=models.CASCADE)

    rows = models.IntegerField(default=1)
    columns = models.IntegerField(default=3)

    #TODO: this field should probably go on the individual?
    # last_watered = models.DateTimeField(default=None)

    # custom save method for last watered - need to figure out how to do it only on water event
    # def save_watering(self, *args, **kwargs):
    #     self.last_watered = timezone.now()
    #     return super(Garden, self).save(*args, **kwargs)

    def __str__(self):
        return "%s's Garden" % self.profile.account.username