from django.db import models
from colorfield.fields import ColorField

class Trophies(models.Model):
    TASK_TYPES = (
    ("DO", "Do"),
    ("DONT", "Don't"),
)

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
    

