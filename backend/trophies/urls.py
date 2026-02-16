from django.urls import path , include
from .views import trophies , trophy_details
app_name = "trophies"

urlpatterns = [
    path("",trophies,name="trophies-page"),
    path("trophy-category/<str:trophy_cat>", trophies ,name="trophy_category"),
    path("trophy-search/<str:trophy_search_variable>", trophies ,name="trophy_search"),
    path('trohpy-details/<int:trophy_id>',trophy_details , name='trophy_details'),
]
