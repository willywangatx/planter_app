from django.db import models
import uuid 
# Create your models here.

# class ProfileManager(models.Manager):
#     def get_profile_data(self):
#         return self.filter(account__username=username)

class Profile(models.Model):
    account = models.OneToOneField('accounts.Account', on_delete=models.CASCADE)
    # external_id = models.UUIDField(unique=True, editable=False, default=uuid.uuid4)
    is_private = models.BooleanField(default=False)
    # objects = ProfileManager()

    def __str__(self):
        return self.account.username