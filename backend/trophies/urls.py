from django.urls import path , include
from .views import trophies , trophy_details
app_name = "trophies"

urlpatterns = [
    path("",trophies,name="trophies-page"),
    path('trohpy-details/<int:trophy_id>',trophy_details , name='trophy_details'),
]
