from django.shortcuts import render
from .models import DoTasks , DontTasks


def home(request):
    context = {
    "DontTasks" : DontTasks.objects.all(),
    "DoTasks" : DoTasks.objects.all(),
    }
    
    return render(request , "root/home.html",context=context)


def aboutus(request):
    return render(request , "root/about-us.html")