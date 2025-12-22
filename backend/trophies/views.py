from django.shortcuts import render , get_object_or_404
from .models import Trophies

def trophies(request):
    trophies = Trophies.objects.all()
    context = {
        'trophies' : trophies
    }
    return render(request ,"trophies/trophy.html",context=context)


def trophy_details(request,trophy_id):
    trophy = get_object_or_404(Trophies , id = trophy_id)
    context = {
        "trophy" : trophy
    }
    return render(request,"trophies/trophy-details.html" , context=context)

