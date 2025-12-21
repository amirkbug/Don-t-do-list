from django.urls import path
from .views import home , aboutus

app_name = "root"
urlpatterns = [
    path("",home,name="home"),
    path("about-us", aboutus , name="aboutus"),
]
