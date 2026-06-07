from django.shortcuts import render , get_object_or_404 , redirect
from django.contrib.auth.decorators import login_required
from .models import Trophies , UserTrophy
from django.contrib import messages
from django.core.paginator import Paginator , PageNotAnInteger , EmptyPage
from django.db.models import Sum
from datetime import timedelta
from django.utils import timezone
from accounts.models import DailyStats


@login_required
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
            if trophy_category == "DONT":
                trophies = Trophies.objects.all()
                messages.add_message(request , messages.ERROR , "There is no Dont trophies yet!")
            elif trophy_category == "DO":
                trophies = Trophies.objects.all()
                messages.add_message(request , messages.ERROR , "There is no Do trophies yet!")
            else:
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

@login_required
def unlock_trophy(request, trophy_id):
    #get the trophy
    trophy = get_object_or_404(Trophies,id=trophy_id)
    #get user
    user = request.user
    #today date
    today = timezone.now().date()
    #current value default input
    current_value = 0
    # checking what the requirement time is
    if trophy.required_time == "daily":
        # we get or create stats we need base on date and user
        stats , created = DailyStats.objects.get_or_create(user=user,date=today)

        # we get the requirement stat out of stats
        current_value = getattr(
            stats,
            trophy.required_stat,
            0
        )
    elif trophy.required_time == "weekly":
        # a week ago should be today - 7
        week_ago = today - timedelta(days=7)
        # we fillter the objects base on date and user then make a dict with the sum of required stat
        weekly_stat = DailyStats.objects.filter(
            user=user,
            date__gte = week_ago,
        ).aggregate(
            value = Sum(
                trophy.required_stat
            )
        )

        # then we get that value from dict
        current_value = (weekly_stat["value"] or 0)


    elif trophy.required_time == "monthly":
        # we have today we replace it with the day one of the month
        start_of_month = today.replace(day=1)

        monthly_stats = DailyStats.objects.filter(
            user=user,
            date__gte=start_of_month
        ).aggregate(
            value=Sum(
                trophy.required_stat
            )
        )

        current_value = (monthly_stats["value"] or 0)

    elif trophy.required_time == "alltime":
        # in all time we dont have any date so we can use getattr
        current_value = getattr(
            user,
            trophy.required_stat,
            0
        )


    # check if the trophy requirement is met
    if current_value >= trophy.required_value:
        user_trophy, created = UserTrophy.objects.get_or_create(
        user=user,
        trophy=trophy
        )

        if created:
            messages.success(request, "Trophy unlocked! 🏆")
        else:
            messages.info(request, "You already own this trophy.")

    else:
        messages.error(request,"Requirements not met.")

    return redirect("trophies:trophies-page")