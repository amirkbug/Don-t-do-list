from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model



class CustomUserModel(AbstractUser):
    email = models.EmailField(unique=True)
    profile_picture = models.ImageField(upload_to="accounts",default="profile-default.jpg")
    
# the model that we used for tracking user
class DailyStats(models.Model):
    user = models.ForeignKey(CustomUserModel,on_delete=models.CASCADE)
    # today date : 2026-06-09
    date = models.DateField()
    # Dont
    tasks_created_Dont = models.IntegerField(default=0)
    tasks_completed_Dont = models.IntegerField(default=0)
    tasks_deleted_Dont = models.IntegerField(default=0)

    # Do
    tasks_created_Do = models.IntegerField(default=0)
    tasks_completed_Do = models.IntegerField(default=0)
    tasks_deleted_Do = models.IntegerField(default=0)

    def __str__(self):
        return self.user.username

class PersonalTokens(models.Model):
    user = models.ForeignKey(CustomUserModel , on_delete=models.CASCADE)
    token = models.CharField(max_length=255)



    def __str__(self):
        return self.user.email