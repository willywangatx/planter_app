from django.db import models
import uuid 
from planter.settings import AUTH_USER_MODEL
# from django.dispatch import reciever
# from django.db.models.signals import post_save
# Create your models here.

# class ProfileManager(models.Manager):
#     def get_profile_data(self):
#         return self.filter(account__username=username)

class ProfileManager(models.Manager):
    pass 

class Profile(models.Model):
    # @receiver(post_save, sender=accounts.Account)
    # def create_profile_for_new_user(sender, created, instance, **kwargs):
    #     if created:
    #         profile = Profile(user=instance)
    #         profile.save()

    account = models.OneToOneField(AUTH_USER_MODEL, related_name='profile', on_delete=models.CASCADE)
    # external_id = models.UUIDField(unique=True, editable=False, default=uuid.uuid4)
    is_private = models.BooleanField(default=False)
    objects = ProfileManager()

    def __str__(self):
        return self.account.username

        