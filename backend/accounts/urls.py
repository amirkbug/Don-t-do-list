from django.urls import path 
from .views import( 
signup , login_view , logout_view , password_chaange ,
password_reset , password_reset_done , password_reset_confirm ,
password_reset_complete
)


app_name = "accounts"
urlpatterns = [
    path("sign-up/", signup , name="signup"),
    path("login/",  login_view, name="login"),
    path("logout/",logout_view , name="logout"),
    path("password_chaange/" , password_chaange , name="password_chaange"),
    path("password_reset/" , password_reset , name="password_reset"),
    path("password_reset_done/" , password_reset_done , name="password_reset_done"),
    path("password_reset_confirm/" , password_reset_confirm , name="password_reset_confirm"),
    path("password_reset_complete/" , password_reset_complete , name="password_reset_complete"),
]
