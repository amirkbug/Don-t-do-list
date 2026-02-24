from django.shortcuts import render , redirect , get_object_or_404
from django.contrib.auth import login , logout , authenticate , password_validation , get_user_model
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .forms import LoginForm , PasswordReset , RegistrationForm , EditProfileForm
from django.core.mail import send_mail
from uuid import uuid4
from .models import PersonalTokens

User = get_user_model()

def signup(request):
    if request.method == "GET":
        context = {
        "header_mode":"back",
        }
        return render(request , "accounts/signup.html",context)
    if request.method == "POST":
        form = RegistrationForm(request.POST)
        email = request.POST.get("email")
        username = request.POST.get("username")

        # check if the email is the same
        if User.objects.filter(email=email).exists():
            messages.add_message(request , messages.ERROR , "It seems this email is already registered. Please log in or use a different email.")
            return redirect(request.path_info)
        
        # check if the username is the same
        if User.objects.filter(username=username).exists():
            messages.add_message(request , messages.ERROR , "This username is already taken. Please choose another one.")
            return redirect(request.path_info)
        
        # check if the form is valid
        if form.is_valid():
            user = form.save()
            login(request , user)
            messages.add_message(request, messages.SUCCESS , "Welcome to Don’t Do List👋. Define what to do… and what not to")
            return redirect("root:home")
        else: 
            print(form.errors)
            messages.add_message(request,messages.ERROR, "Something went wrong. Please try again.") 
            return redirect(request.path_info)
    else: 
        messages.add_message(request , messages.ERROR , "This action is not supported.") 
        return redirect("/")


def login_view(request):
    if request.method == "GET":
        context = {
        "header_mode":"back",
        }
        return render(request , "accounts/login.html" , context)
    
    elif request.method =="POST":
        form = LoginForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data["email"]
            password = form.cleaned_data["password"]
            try:
                username = get_object_or_404(User , email=email).username
                user = authenticate(username=username , password = password)
            except:
                messages.add_message(request , messages.ERROR , "Incorrect email or password. Try again.")
                return redirect(request.path_info)
            if user is not None:
                login(request,user)
                messages.add_message(request , messages.SUCCESS , "Logged in successfully. Welcome back!")
                return redirect("root:home")
            else:
                messages.add_message(request , messages.ERROR , "Incorrect email or password. Try again.")
                return redirect(request.path_info)
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

@login_required
def dashboard_view(request):
    user = request.user
    if request.method == "GET":
        context = {
        "header_mode":"back",
        "user":user
        }
        return render(request , "accounts/dashboard.html",context)
    if request.method == "POST":
        form = EditProfileForm(request.POST,request.FILES,instance=user)
        if form.is_valid():
            form.save()
            messages.add_message(request,messages.SUCCESS,"Profile updated successfully ✨")
            return redirect(request.path_info)
        else:
            messages.add_message(request,messages.ERROR, "Something went wrong. Please try again.")
            return redirect(request.path_info)
    else:
        messages.add_message(request , messages.ERROR , "This action is not supported.")
        return redirect("/")

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
    # in get method just render the page
    if request.method == "GET":
        context = {
        "header_mode":"back",
        }
        return render(request , "accounts/password-reset.html" , context)
    if request.method == "POST":
        # get the form from post request
        form = PasswordReset(request.POST)
        if form.is_valid():
            # get the user from eamil
            user = get_object_or_404(User , email = form.cleaned_data["email"])
            try:
                # check if the user already have an token
                token = PersonalTokens.objects.get(user=user)
            except:
                # if not make one for them
                token = PersonalTokens.objects.create(user=user,token=str(uuid4()))
            send_mail(
                "Reset Your Password – Don’t Do List",
                f"http://127.0.0.1:8000/accounts/password_reset_confirm/{token.token}", # change this with mjml
                "admin",
                [user.email],
                fail_silently=True
            )
            return redirect("accounts:password_reset_done")
        else:
            messages.add_message(request,messages.ERROR,"your email is not valid")
            return redirect(request.path_info)
    else:
        messages.add_message(request , messages.ERROR , "This action is not supported.")
        return redirect("/")




def password_reset_done(request):
    context = {
        "header_mode":"nothing",
    }
    return render(request , "accounts/password-reset-done-success.html" , context)



def password_reset_confirm(request,token):
    # in get method just render the page
    if request.method == "GET":
        context={
        "header_mode":"just_header",
        }
        return render(request , "accounts/password-reset-confirm.html", context)
    if request.method == "POST":
        # in post method get the user from token
        user = PersonalTokens.objects.get(token=token).user
        # in post method get the passwords
        password1 = request.POST.get("password1")
        password2 = request.POST.get("password2")
        # validate passwords
        if password1 != password2:
            messages.add_message(request , messages.ERROR , "Passwords do not match.")
            return redirect(request.path_info)
        try:
            password_validation.validate_password(password1)
            user.set_password(password1)
            user.save()
            return redirect("accounts:password_reset_complete")
        # if the passwords wasnt valid
        except:
            messages.add_message(request , messages.ERROR , "Something went wrong. Please try again.")
            return redirect(request.path_info)
    else:
        messages.add_message(request , messages.ERROR , "This action is not supported.")
        return redirect("/")



def password_reset_complete(request):
    context={
        "header_mode":"nothing",
    }
    return render(request , "accounts/password-reset-complete.html" , context)