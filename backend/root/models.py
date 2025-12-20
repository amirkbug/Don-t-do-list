from django.db import models

class DoTasks(models.Model):
    description = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.description
    class Meta:
        ordering = ("start_date",)

class DontTasks(models.Model):
    description = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.description
    class Meta:
        ordering = ("start_date",)