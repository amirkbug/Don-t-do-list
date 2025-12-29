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
            messages.add_message(request,messages.ERROR , "Something went wrong while creating the task. Please try again.")
            return redirect(request.path_info)
    else:
        messages.add_message(request,messages.ERROR , "This action is not supported.")
        return redirect(request.path_info)
    


def aboutus(request):
    return render(request , "root/about-us.html")


