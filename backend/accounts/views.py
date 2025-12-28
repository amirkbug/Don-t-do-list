from django.shortcuts import render

def signup(request):
    if request.metho == "POST":
        return render(request , "accounts/signup.html")


def login(request):
    return render(request , "accounts/login.html")