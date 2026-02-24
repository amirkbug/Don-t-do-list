from django.shortcuts import render , get_object_or_404 , redirect
from django.contrib.auth.decorators import login_required
from .models import Trophies
from root.models import Tasks
from django.contrib import messages
from django.core.paginator import Paginator , PageNotAnInteger , EmptyPage

def trophies(request,**kwargs):

    
    # query variables
    trophy_category = kwargs.get("trophy_cat") 
    trophy_search = request.GET.get("search") 

    # search and category query 
    if trophy_search and trophy_category:
        trophies = Trophies.objects.filter(name__icontains=trophy_search,trophy_type=trophy_category)
        if not trophies.exists():
            trophies = Trophies.objects.all()
            messages.add_message(request , messages.ERROR , 'There were no search results.')
    # category query 
    elif trophy_category:
        trophies = Trophies.objects.filter(trophy_type=trophy_category)
        if not trophies.exists():
            trophies = Trophies.objects.all()
            messages.add_message(request , messages.ERROR , f'The category "{trophy_category}" is invalid.')
    # search query 
    elif trophy_search:
        trophies = Trophies.objects.filter(name__icontains=trophy_search)
        if not trophies.exists():
            trophies = Trophies.objects.all()
            messages.add_message(request , messages.ERROR , 'There were no search results.')
    else:
        trophies = Trophies.objects.all()
   

    # paginator stuff
    trophies = Paginator(trophies , 6)
    
    # tasks 
    tasks = Tasks.objects.all()
    try:
        page_num = request.GET.get("page")
        trophies = trophies.get_page(page_num)
    except PageNotAnInteger:
        trophies = trophies.get_page(1)
    except:
        trophies = trophies.get_page(1)
    context = {
        'page_num':page_num,
        'trophies' : trophies,
        # we send these in for having them in the url all the time
        'trophy_category' : trophy_category,
        'trophy_search': trophy_search
    }
    return render(request ,"trophies/trophy.html",context=context)


def trophy_details(request,**kwarg):
    if kwarg.get("trophy_id"):
        trophy = get_object_or_404(Trophies , id = kwarg.get("trophy_id"))
        context = {
        "trophy" : trophy,
        }
        return render(request,"trophies/trophy-details.html" , context=context)

