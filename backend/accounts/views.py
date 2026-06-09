from django.shortcuts import render , redirect , get_object_or_404
from django.contrib.auth import login , logout , authenticate , password_validation , get_user_model
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .forms import LoginForm , PasswordReset , RegistrationForm , EditProfileForm
from django.core.mail import send_mail
from uuid import uuid4
from .models import PersonalTokens , DailyStats
from django.utils import timezone
from datetime import timedelta
from django.db.models import Sum
from calendar import monthrange
from trophies.models import Trophies , UserTrophy


User = get_user_model()


def signup(request):
    if request.method == "GET":
        context = {
        "header_mode":"back",
        }
        return render(request , "accounts/signup.html",context)
    if request.method == "POST":
        form = RegistrationForm(request.POST)
        # put the datas of POST into form
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
            # get the email and password from login
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
                # we have an remember me boxcheck in the template so if it was not true it will expire after quit of search engine
                if not request.POST.get("remember_me"):
                    request.session.set_expiry(0)
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
    #all trophies and user trphies
    all_trophies_count = Trophies.objects.count()
    user_trophies_count = UserTrophy.objects.filter(user=request.user).count()
    #today
    today = timezone.now().date()
    #we need the days we have in the month now
    days_in_month = monthrange(today.year, today.month)[1]
    #user
    user = request.user
    #the date of week
    week_ago = today - timedelta(days=7)
    #the date of month
    start_of_month = today.replace(day=1)
    #today tasks
    #all data that we need for charts
    chart_data = {
    "weekly": {
        "do": {
            "created": [None] * 7,
            "completed": [None] * 7,
            "deleted": [None] * 7,
        },
        "dont": {
            "created": [None] * 7,
            "completed": [None] * 7,
            "deleted": [None] * 7,
        }
    },
    "monthly": {
        "do": {
            "created": [None] * days_in_month,
            "completed": [None] * days_in_month,
            "deleted": [None] * days_in_month,
        },
        "dont": {
            "created": [None] * days_in_month,
            "completed": [None] * days_in_month,
            "deleted": [None] * days_in_month,
        }
    }
}
    
    daily_stats , created = DailyStats.objects.get_or_create(
        user=user,
        date = today
    )
    #weakly stats , sum : sum of the nums in database , aggregate output is a dict from the nums
    weakly_stats = DailyStats.objects.filter(
        user=user,
        date__gte=week_ago
    ).aggregate(

        tasks_created_Do=Sum("tasks_created_Do"),
        tasks_completed_Do=Sum("tasks_completed_Do"),
        tasks_deleted_Do=Sum("tasks_deleted_Do"),

        tasks_created_Dont=Sum("tasks_created_Dont"),
        tasks_completed_Dont=Sum("tasks_completed_Dont"),
        tasks_deleted_Dont=Sum("tasks_deleted_Dont"),

    )
    #weakly stats for chart , order by date output is from oldest to newest , output is a query set 
    weakly_chart = DailyStats.objects.filter(
        user=user,
        date__gte=week_ago
    ).order_by("date")
    #weakly chart
    for stat in weakly_chart:
        # we get what day it is for index 0 to 7 , put the datas in the right place
        index = stat.date.weekday()
        chart_data["weekly"]["do"]["created"][index]=stat.tasks_created_Do or None
        chart_data["weekly"]["do"]["completed"][index]=stat.tasks_completed_Do or None
        chart_data["weekly"]["do"]["deleted"][index]=stat.tasks_deleted_Do or None

        chart_data["weekly"]["dont"]["created"][index]=stat.tasks_created_Dont or None
        chart_data["weekly"]["dont"]["completed"][index]=stat.tasks_completed_Dont or None
        chart_data["weekly"]["dont"]["deleted"][index]=stat.tasks_deleted_Dont or None

    #monthly stats
    montyly_stats = DailyStats.objects.filter(
        user=user,
        date__gte = start_of_month
    ).aggregate(
        tasks_created_Do=Sum("tasks_created_Do"),
        tasks_completed_Do=Sum("tasks_completed_Do"),
        tasks_deleted_Do=Sum("tasks_deleted_Do"),

        tasks_created_Dont=Sum("tasks_created_Dont"),
        tasks_completed_Dont=Sum("tasks_completed_Dont"),
        tasks_deleted_Dont=Sum("tasks_deleted_Dont"),
    )
    #monthly chart
    montyly_chart = DailyStats.objects.filter(
        user=user,
        date__gte = start_of_month
    ).order_by("date")
    #montly arrays 
    for stat in montyly_chart:
        # index start from 0 but here start from 1 , 0 to 30
        index = stat.date.day - 1

        chart_data["monthly"]["do"]["created"][index]=stat.tasks_created_Do or None
        chart_data["monthly"]["do"]["completed"][index]=stat.tasks_completed_Do or None
        chart_data["monthly"]["do"]["deleted"][index]=stat.tasks_deleted_Do or None

        chart_data["monthly"]["dont"]["created"][index]=stat.tasks_created_Dont or None
        chart_data["monthly"]["dont"]["completed"][index]=stat.tasks_completed_Dont or None
        chart_data["monthly"]["dont"]["deleted"][index]=stat.tasks_deleted_Dont or None
    if request.method == "GET":
        context = {
        "header_mode":"back",
        "user":user,
        "daily_stats":daily_stats,
        "weakly_stats":weakly_stats,
        "monthly_stats":montyly_stats,
        "chart_data": chart_data,
        "all_trophies_count":all_trophies_count,
        "user_trophies_count":user_trophies_count
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
        form = PasswordReset()
        context = {
        "header_mode":"back",
        "form":form,
        }
        return render(request , "accounts/password-reset.html" , context)
    if request.method == "POST":
        # get the form from post request
        form = PasswordReset(request.POST)
        if form.is_valid():
            # get the user from eamil
            try:
                user = get_object_or_404(User , email = form.cleaned_data["email"])
            except:
                messages.add_message(request,messages.ERROR,"No account found with this email. Ready to join the challenge?")
                return redirect("accounts:signup")
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
            
            messages.add_message(request,messages.ERROR,"Please verify that you're human before continuing.")
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

@login_required
def delete_account(request):
    user = request.user

    logout(request)
    user.delete()

    messages.success(request,"Your account has been deleted.")
    return redirect("/")
    
