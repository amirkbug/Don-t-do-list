from django.db import models
from accounts.models import AbstractUser
from django.contrib.auth import get_user_model

User = get_user_model()

class Tasks(models.Model):
    TASK_TYPES = (
    ("DO", "Do"),
    ("DONT", "Don't"),
)
    

    user = models.ForeignKey(User , on_delete=models.CASCADE)
    description = models.CharField(max_length=100)
    start_date = models.CharField(max_length=10)
    end_date = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    task_type = models.CharField(max_length=10,default="no-type" , choices=TASK_TYPES)


    def __str__(self):
        return self.description
    class Meta:
        ordering = ("start_date",)



