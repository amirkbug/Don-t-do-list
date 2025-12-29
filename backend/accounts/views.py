from django.shortcuts import render , redirect 
from django.contrib.auth import login , logout , authenticate , password_validation 
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .forms import LoginForm


def signup(request):
    if request.method == "GET":
        return render(request , "accounts/signup.html")


def login_view(request):
    if request.method == "GET":
        return render(request , "accounts/login.html")
    
    elif request.method =="POST":
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data["username"]
            password = form.cleaned_data["password"]
            user = authenticate(username=username , password = password)
            if user is not None:
                login(request,user)
                messages.add_message(request , messages.SUCCESS , "Logged in successfully. Welcome back!")
                return redirect("root:home")
            else:
                messages.add_message(request , messages.ERROR , "Incorrect email or password. Try again.")
                return redirect(request.path_info)
            
    else:
        messages.add_message(request , messages.ERROR , "This action is not supported.")
        return redirect("/")

@login_required
def logout_view (request):
    logout(request)
    return redirect("root:home")