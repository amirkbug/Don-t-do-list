from django.urls import path
from .views import home , aboutus , delete_tasks , import_questin

app_name = "root"
urlpatterns = [
    path("",home,name="home"),
    path("about-us/", aboutus , name="aboutus"),
    path("delete-tasks/" , delete_tasks , name="delete-tasks"),
    path("import_question/" , import_questin , name="import_question"),
]
