from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
import uuid 
from django.utils.translation import gettext_lazy as _
# from django.core.mail import send_mail

class AccountManager(BaseUserManager):
    # create method to normalize username - to lowercase 
    def normalize_username(self, username):
        return username.lower()

    def create_user(self, email, username, password):
        if not email: 
            raise ValueError("Users must have a valid email address")
        if not username: 
            raise ValueError("Users must have a valid username")

        user = self.model(
            email=self.normalize_email(email),
            username=self.normalize_username(username),
            )
        user.set_password(password)
        user.save(using=self._db)
        return user 

    def create_superuser(self, email, username, password):
        user = self.create_user(
            email,
            username,
            password
            )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        # Will need to create an associated profiles for the newly created user 
        # import profile model from profile app - Profile.objects.create(account=user)
        return user 

# class AccountManager(BaseUserManager):
#     use_in_migrations = True

#     def _create_user(self, username, email, password, **extra_fields):
#         """
#         Create and save an account with the given handle, email, and password.
#         """
#         if not username:
#             raise ValueError('The given username must be set')
#         email = self.normalize_email(email)
#         username = self.model.normalize_username(username)
#         user = self.model(username=username, email=email, **extra_fields)
#         user.set_password(password)
#         user.save(using=self._db)

#         # When a user is created, an associated one-to-one profile
#         # must be created as well.


#         return user

#     def create_user(self, username, email=None, password=None, **extra_fields):
#         extra_fields.setdefault('is_staff', False)
#         extra_fields.setdefault('is_superuser', False)
#         return self._create_user(username, email, password, **extra_fields)

#     def create_superuser(self, username, email=None, password=None, **extra_fields):
#         extra_fields.setdefault('is_staff', True)
#         extra_fields.setdefault('is_superuser', True)

#         if extra_fields.get('is_staff') is not True:
#             raise ValueError('Superuser must have is_staff=True.')
#         if extra_fields.get('is_superuser') is not True:
#             raise ValueError('Superuser must have is_superuser=True.')

#         return self._create_user(username, email, password, **extra_fields)


class Account(AbstractBaseUser):
    # optional fields
    #look into adding a uuid field for use when passing id info to the FE server 
    email = models.EmailField(_('email address'), max_length=128, unique=True)
    username = models.CharField(_('username'), max_length=30, unique=True)
    external_id = models.UUIDField(unique=True, editable=False, default=uuid.uuid4)
    # required fields for custom user model 
    date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)
    last_login = models.DateTimeField(_('last logged in'), auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(_('active'), default=True, help_text=_('Set to False instead of deleting account.'))
    # email_verificatoin = models.BooleanField(_('is email verified'), default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    # Setting what you want users to login with, in this case email
    USERNAME_FIELD = 'email'
    # Fields that are required when registering 
    REQUIRED_FIELDS = ['username']

    # Telling account object where manager is
    objects = AccountManager()
    
    # when call {Account}, will list both the email and username
    def __str__(self):
        return self.email + ", " + self.username

    # required functions for custom user

    # permissions for user 
    def has_perm(self, perm, obj=None):
        # if admin, has permissions (default set to False above)
        return self.is_admin
    # module permissions 
    def has_module_perms(self, app_label):
        return True


    def clean(self):
        # clean() by default normalizes the username for the BaseUserModel
        super().clean()
        #normalize the email
        self.email = self.__class__.objects.normalize_email(self.email)

