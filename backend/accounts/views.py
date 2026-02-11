from django.shortcuts import render , redirect 
from django.contrib.auth import login , logout , authenticate , password_validation 
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .forms import LoginForm , SignupForm


def signup(request):
    if request.method == "GET":
        context = {
        "header_mode":"back",
        }
        return render(request , "accounts/signup.html",context)
    if request.method == "POST":
        form = SignupForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request,user)
            messages.add_message(request, messages.SUCCESS , "Welcome back 👋 Let’s get things done.")
            return redirect("root:home")
        else:
            messages.add_message(request,messages.ERROR,"Something went wrong. Please try again.")
            return redirect(request.path_info)



def login_view(request):
    if request.method == "GET":
        context = {
        "header_mode":"back",
        }
        return render(request , "accounts/login.html" , context)
    
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


def dashboard_view(request):
    context = {
        "header_mode":"back",
    }
    return render(request , "accounts/dashboard.html",context)


def password_chaange(request):
    pass

def password_reset(request):
    pass

def password_reset_done(request):
    pass

def password_reset_confirm(request):
    pass

def password_reset_complete(request):
    pass