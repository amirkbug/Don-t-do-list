from django.shortcuts import render
from django.http import HttpResponse

def trophies(request):
    return render(request ,"trophies/trophy.html")


def trophy_details(request):
    return render(request,"trophies/trophy-details.html")

