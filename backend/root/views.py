from django.shortcuts import render , redirect ,get_object_or_404
from .models import Tasks
from .forms import TasksForm
from django.contrib import messages
from django.utils import timezone
from accounts.models import DailyStats
from .models import Tasks
import json
from django.contrib.auth.decorators import login_required


@login_required
def import_questin(request):
    if request.method == "GET":
        context = {
        "header_mode":"back",
        }
        return render(request , "root/import_question.html" , context)
    
    if request.method == "POST":
        today = timezone.now().date()
        stats , created = DailyStats.objects.get_or_create(
            user = request.user,
            date = today
        )
        guest_tasks = request.POST.get("geustTasks")
        print(guest_tasks)

        if guest_tasks:
            tasks = json.loads(guest_tasks)
            for task in tasks:
                Tasks.objects.create(
                    user=request.user,
                    description=task["name"],
                    start_date=task["startDate"],
                    end_date=task["finishDate"],
                    task_type=task["type"],
                )
                if (task["type"].lower() == "do"):
                    stats.tasks_created_Do += 1
                else:
                    stats.tasks_created_Dont +=1
            stats.save()
            messages.add_message(request,messages.SUCCESS , "All your guest tasks are now saved to your account 🎉")
            return redirect("root:home")
            
        else:
            messages.add_message(request,messages.SUCCESS , "Guest tasks were skipped and removed.")
            return redirect("root:home")
    else:
        messages.add_message(request,messages.SUCCESS , "This action is not supported")
        return redirect("root:home")
            


def home(request):
    if request.method == "GET":
        
        if request.user.is_authenticated:
            tasks = Tasks.objects.filter(
                user=request.user
            )
        else:
            tasks=[]


        context = {
        "tasks": tasks,
        }
        return render(request , "root/home.html",context=context)
    elif request.method == "POST":
        form = TasksForm(request.POST)
        today = timezone.now().date()
        if request.user.is_authenticated:
            stats , created = DailyStats.objects.get_or_create(
            user = request.user,
            date = today
            )
        if form.is_valid():
            task = form.save(commit=False)
            if request.user.is_authenticated:
                task.user = request.user
            task.save()
            if request.user.is_authenticated:
                if (task.task_type == 'DO'):
                    stats.tasks_created_Do += 1
                else:
                    stats.tasks_created_Dont +=1
                stats.save()
            return redirect("root:home")
        else:
            messages.add_message(request,messages.ERROR , "Something went wrong while creating the task. Please try again.")
            return redirect(request.path_info)
    else:
        messages.add_message(request,messages.ERROR , "This action is not supported.")
        return redirect(request.path_info)
            


def delete_tasks(request):
    today = timezone.now().date()
    stats , created = DailyStats.objects.get_or_create(
        user = request.user,
        date = today
    )
    if request.method == "POST":
        selected_ids = request.POST.getlist("selected_tasks")
        selected_ids_count = len(selected_ids)
        
        if(request.POST.get("action") == "delete"):
            if(request.POST.get("type") == "dont"):
                stats.tasks_deleted_Dont += selected_ids_count
            elif(request.POST.get("type") == "do"):
                stats.tasks_deleted_Do += selected_ids_count
        elif(request.POST.get("action") == "complete"):
            if(request.POST.get("type") == "dont"):
                stats.tasks_completed_Dont += selected_ids_count
            elif(request.POST.get("type") == "do"):
                stats.tasks_completed_Do += selected_ids_count
        stats.save()

        if not selected_ids:
            messages.error(request, "No tasks selected.")
            return redirect("root:home")

        Tasks.objects.filter(user=request.user,id__in=selected_ids).delete()
        return redirect("root:home")

    messages.error(request, "Invalid request.")
    return redirect("root:home")

def aboutus(request):
    return render(request , "root/about-us.html")


