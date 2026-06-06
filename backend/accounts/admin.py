from django.contrib import admin
from .models import PersonalTokens , CustomUserModel , DailyStats
# Register your models here.
admin.site.register(PersonalTokens)
admin.site.register(CustomUserModel)
admin.site.register(DailyStats)