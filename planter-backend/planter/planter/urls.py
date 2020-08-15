"""planter URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from profiles.views import get_profile 
from accounts.views import create_account
from timers.views import get_timers, increment_focus_time, decrement_focus_time, increment_break_time, decrement_break_time
# from profiles.views import update_profile

urlpatterns = [
    # Django Admin endpoint 
    path('admin/', admin.site.urls),
   
    # auth rest paths 
    path('api/register/', create_account, name="create_account"),
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/refresh-login/', TokenRefreshView.as_view(), name='token_refresh'),

    # profile endpoints
    path('api/getProfile/', get_profile, name='get_profile'),

    # timers endpoints
    path('api/getTimers/', get_timers, name='get_timers'),
    path('api/incrementFocusTime/', increment_focus_time, name='increment_focus_time'),
    path('api/decrementFocusTime/', decrement_focus_time, name='decrement_focus_time'),
    path('api/incrementBreakTime/', increment_break_time, name='increment_break_time'),
    path('api/decrementBreakTime/', decrement_break_time, name='decrement_break_time'),
]