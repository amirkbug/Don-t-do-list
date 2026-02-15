from django.shortcuts import render , get_object_or_404 , redirect
from django.contrib.auth.decorators import login_required

from .models import Trophies
from django.contrib import messages
from django.core.paginator import Paginator , PageNotAnInteger , EmptyPage

def trophies(request):

    # get all trophies from the model
    trophies = Trophies.objects.all()

    # category filter
    trophy_type = request.GET.get("type")
    if trophy_type:
        trophies = trophies.filter(trophy_type=trophy_type)
        if trophy_type != "DO" and trophy_type != "DONT":
            trophies = Trophies.objects.all()
            messages.add_message(request, messages.ERROR , f'The category "{trophy_type}" is invalid.')


    # search filter
    search_query = request.GET.get("search")
    if search_query:
        trophies = trophies.filter(name__contains=search_query)
        if not trophies.exists():
            trophies = Trophies.objects.all()
            messages.add_message(request, messages.ERROR , "There were no search results.")
    
    
        
    # then give it to paginator 
    trophies = Paginator(trophies , 6)
        
    # paginator stuff
    try:
        page_num = request.GET.get("page")
        trophies = trophies.get_page(page_num)
    except PageNotAnInteger:
        trophies = trophies.get_page(1)
    except:
        trophies = trophies.get_page(1)
    
    # put it in the page
    context = {
        'page_num':page_num,
        'trophies' : trophies
    }
    return render(request ,"trophies/trophy.html",context=context)


def trophy_details(request,**kwarg):
    if kwarg.get("trophy_id"):
        trophy = get_object_or_404(Trophies , id = kwarg.get("trophy_id"))
        context = {
        "trophy" : trophy,
        }
        return render(request,"trophies/trophy-details.html" , context=context)

