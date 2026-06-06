from django.db import models
from colorfield.fields import ColorField
from django.contrib.auth import get_user_model

User = get_user_model()

class Trophies(models.Model):
    TASK_TYPES = (
    ("DO", "Do"),
    ("DONT", "Don't"),
    )
    TIME_CHOICES = (
        ("daily", "Daily"),
        ("weekly", "Weekly"),
        ("monthly", "Monthly"),
        ("alltime", "All Time"),
    )

    STAT_CHOICES = (
        ("tasks_created_Do", "Do Created"),
        ("tasks_completed_Do", "Do Completed"),
        ("tasks_deleted_Do", "Do Deleted"),

        ("tasks_created_Dont", "Dont Created"),
        ("tasks_completed_Dont", "Dont Completed"),
        ("tasks_deleted_Dont", "Dont Deleted"),
    )
    required_time = models.CharField(
        max_length=20,
        choices=TIME_CHOICES,
    )

    required_stat = models.CharField(
        max_length=50,
        choices=STAT_CHOICES,
    )

    required_value = models.IntegerField()
    
    name = models.CharField(max_length=50)
    picture = models.ImageField(upload_to="trophies" , default="trophy-default.png")
    information = models.TextField(default="No information yet")
    bio = models.TextField(default="No bio yet")
    color = ColorField(default="#FFFFFF")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    trophy_type = models.CharField(max_length=10, default="no-type" , choices=TASK_TYPES)


    def __str__(self):
        return self.name
    

    class Meta:
        ordering = ("-created_at",)
    

class UserTrophy(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    trophy = models.ForeignKey(
        Trophies,
        on_delete=models.CASCADE
    )

    unlocked_at = models.DateTimeField(
        auto_now_add=True
    )


    def __str__(self):
        return f"{self.user} - {self.trophy}"