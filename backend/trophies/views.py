from django.shortcuts import render , get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Trophies
from django.core.paginator import Paginator , PageNotAnInteger , EmptyPage

def trophies(request):

    trophies = Trophies.objects.all()
    trophies = Paginator(trophies , 6)
    try:
        page_num = request.GET.get("page")
        trophies = trophies.get_page(page_num)
    except PageNotAnInteger:
        trophies = trophies.get_page(1)
    except:
        trophies = trophies.get_page(1)
    context = {
        'page_num':page_num,
        'trophies' : trophies
    }
    return render(request ,"trophies/trophy.html",context=context)


def trophy_details(request,trophy_id):
    trophy = get_object_or_404(Trophies , id = trophy_id)
    context = {
        "trophy" : trophy
    }
    return render(request,"trophies/trophy-details.html" , context=context)

