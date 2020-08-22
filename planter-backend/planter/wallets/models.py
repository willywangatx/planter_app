from django.db import models
from profiles.models import Profile
#signals 
from django.dispatch import receiver
from django.db.models.signals import post_save


# Create your models here.
class Wallet(models.Model):
    @receiver(post_save, sender=Profile)
    def create_wallet_for_new_profile(sender, created, instance, **kwargs):
        if created:
            wallet = Wallet(profile=instance)
            wallet.save()

    profile = models.OneToOneField(Profile, on_delete=models.CASCADE)
    # should i give user some coins to start out? 
    energy = models.FloatField(default=10)
    coins = models.IntegerField(default=10)

    def __str__(self):
        return "%s's Wallet" % self.profile.account.username



