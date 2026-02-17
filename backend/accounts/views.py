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
            messages.add_message(request, messages.SUCCESS , "Welcome to Don’t Do List. Define what to do… and what not to")
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

@login_required()
def logout_view (request):
    logout(request)
    return redirect("root:home")


def dashboard_view(request):
    context = {
        "header_mode":"back",
    }
    return render(request , "accounts/dashboard.html",context)

@login_required()
def password_change(request):
    # in get request just render the page
    if request.method == "GET":
        context = {
        "header_mode":"back",
        }
        return render(request , "accounts/change-password.html" , context)
    # in post request we have to validate what comes out of the form
    elif request.method == "POST":
        # the user who is in the page
        user = request.user
        # get variables
        current_password = request.POST.get("current_password")
        password = request.POST.get("password")
        confirm_password = request.POST.get("confirm_password")
        # error handling
        # if the current password was not the same as user password 
        if not user.check_password(current_password):
            messages.add_message(request , messages.ERROR , "The current password is incorrect.")
            return redirect(request.path_info)
        # if password was not the same as confirm password field value
        if password != confirm_password:
            messages.add_message(request , messages.ERROR , "Passwords do not match.")
            return redirect(request.path_info)
        #if the new password isnt strong enough
        try:
            password_validation.validate_password(password)
            user.set_password(password)
            user.save()
            messages.add_message(request , messages.SUCCESS , "Your password has been updated successfully.")
            return redirect("/")
        #if not error
        except:
            messages.add_message(request , messages.ERROR , "Something went wrong. Please try again.")
            return redirect(request.path_info)
    # if the user was naughty and wanted to do some shit
    else:
        messages.add_message(request , messages.ERROR , "This action is not supported.")
        return redirect("/")


def password_reset(request):
    pass

def password_reset_done(request):
    pass

def password_reset_confirm(request):
    pass

def password_reset_complete(request):
    pass