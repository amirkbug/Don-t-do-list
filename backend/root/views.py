from django.shortcuts import render
from .models import Tasks


def home(request):
    tasks = Tasks.objects.all() 
    context = {
    "tasks": tasks
    }
    
    return render(request , "root/home.html",context=context)


def aboutus(request):
    return render(request , "root/about-us.html")


