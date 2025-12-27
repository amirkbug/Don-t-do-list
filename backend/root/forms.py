from django import forms
from .models import Tasks

class TasksForm(forms.ModelForm):
    class Meta:
        model = Tasks
        fields = ["description" , "start_date" , "end_date" , "task_type"]