from django.contrib.auth import get_user_model
from django import forms
from django.contrib.auth.forms import UserCreationForm

User = get_user_model()


class EditProfileForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ["profile_picture" , "username"]



class RegistrationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ["email" , "username" , "password1" , "password2"]



class LoginForm(forms.Form):
    email = forms.EmailField(max_length=100)
    password = forms.CharField(max_length=100)



class ChangePassword(forms.Form):
    current_password = forms.CharField(max_length=20)
    password = forms.CharField(max_length=20 , widget=forms.PasswordInput)
    confirm_password = forms.CharField(max_length=20 , widget=forms.PasswordInput)



class PasswordReset(forms.Form):
    email = forms.EmailField()



class PasswordResetConfirm(forms.Form):
    password1 = forms.CharField(max_length=20 , widget=forms.PasswordInput)
    password2 = forms.CharField(max_length=20 , widget=forms.PasswordInput)