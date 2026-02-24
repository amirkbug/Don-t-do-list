from django.urls import path
from .views import home , aboutus , delete_tasks

app_name = "root"
urlpatterns = [
    path("",home,name="home"),
    path("about-us/", aboutus , name="aboutus"),
    path("delete-tasks/" , delete_tasks , name="delete-tasks")
]
