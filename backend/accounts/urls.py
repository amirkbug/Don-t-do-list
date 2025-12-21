from django.urls import path
from .views import signup , login

app_name = "accounts"
urlpatterns = [
    path("sign-up/", signup , name="signup"),
    path("login/",  login, name="login"),
]
