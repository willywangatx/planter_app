from django.db import models
from accounts.models import Account 
import uuid 
# Create your models here.

class Profile(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    external_id = models.UUIDField(unique=True, editable=False, default=uuid.uuid4)
    # do i need to create an associatd one-to-one timer model when an account is created?
    # timer = models.OnetoOneField(TIMER_MODEL, on_delete=models.CASCADE, related_name='timer')
    is_private = models.BooleanField(default=False)

    def __str__(self):
        return self.account.username