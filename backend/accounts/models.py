from django.db import models
from django.contrib.auth.models import User , AbstractUser
from django.contrib.auth.models import AbstractUser

class CustomUserModel(AbstractUser):
    email = models.EmailField(unique=True)
    profile_picture = models.ImageField(upload_to="accounts",default="profile-default.jpg")

class PersonalTokens(models.Model):
    user = models.ForeignKey(CustomUserModel , on_delete=models.CASCADE)
    token = models.CharField(max_length=255)



    def __str__(self):
        return self.user.email