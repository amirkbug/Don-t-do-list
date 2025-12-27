from django.shortcuts import render ,redirect
from .models import Tasks
from .forms import TasksForm
from django.contrib import messages

def home(request):
    if request.method == "GET":
        tasks = Tasks.objects.all() 
        context = {
        "tasks": tasks,
        }
        return render(request , "root/home.html",context=context)
    elif request.method == "POST":
        form = TasksForm(request.POST)
        print(request.POST)
        if form.is_valid():
            form.save()
            return redirect("root:home")
        else:
            return redirect("root:home")
            
    


def aboutus(request):
    return render(request , "root/about-us.html")


