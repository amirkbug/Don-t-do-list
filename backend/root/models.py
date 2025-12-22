from django.db import models

class Tasks(models.Model):
    TASK_TYPES = (
    ("DO", "Do"),
    ("DONT", "Don't"),
)

    description = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    task_type = models.CharField(max_length=10,default="no-type" , choices=TASK_TYPES)


    def __str__(self):
        return self.description
    class Meta:
        ordering = ("start_date",)



