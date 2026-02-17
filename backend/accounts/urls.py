from django.urls import path 
from .views import( 
signup , login_view , logout_view , password_change ,
password_reset , password_reset_done , password_reset_confirm ,
password_reset_complete , dashboard_view
)


app_name = "accounts"

urlpatterns = [
    path("sign-up/", signup , name="signup"),
    path("login/",  login_view, name="login"),
    path("logout/",logout_view , name="logout"),
    path("dashboard/" , dashboard_view , name="dashboard"),
    path("password_chaange/" , password_change , name="password_change"),
    path("password_reset/" , password_reset , name="password_reset"),
    path("password_reset_done/" , password_reset_done , name="password_reset_done"),
    path("password_reset_confirm/" , password_reset_confirm , name="password_reset_confirm"),
    path("password_reset_complete/" , password_reset_complete , name="password_reset_complete"),
]
