
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from profiles.views import get_profile 
from accounts.views import create_account
from timers.views import *
from wallets.views import get_wallet, update_energy
from gardens.views import get_gardens
# from timers.views import get_timers, increment_focus_time, decrement_focus_time, increment_break_time, decrement_break_time, reset_timers

urlpatterns = [
    # Django Admin endpoint 
    path('admin/', admin.site.urls),
   
    # auth rest paths 
    path('api/register/', create_account, name="create_account"),
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/refreshAuth/', TokenRefreshView.as_view(), name='token_refresh'),

    # profile endpoints
    path('api/getProfile/', get_profile, name='get_profile'),

    # wallet endpoints
    path('api/getWallet/', get_wallet, name='get_wallet'),
    path('api/updateEnergy/', update_energy, name='update_energy'),

    # garden endpoints
    path('api/getGardens/', get_gardens, name='get_gardens'),

    # timers endpoints
    path('api/getTimers/', get_timers, name='get_timers'),
    path('api/resetTimers/', reset_timers, name='reset_timers'),
    path('api/incrementFocusTime/', increment_focus_time, name='increment_focus_time'),
    path('api/decrementFocusTime/', decrement_focus_time, name='decrement_focus_time'),
    path('api/incrementBreakTime/', increment_break_time, name='increment_break_time'),
    path('api/decrementBreakTime/', decrement_break_time, name='decrement_break_time'),
    path('api/setCycle/', set_cycle, name='set_cycle'),
    path ('api/startTimers/', start_timers, name='start_timers'),
    path('api/stopTimers/', stop_timers, name='stop_timers'),
    path('api/updateCurrentTimes/', update_current_times, name='update_current_times'),
    path('api/updateCompletedFocusMinutes/', update_completed_focus_minutes, name='update_completed_focus_minutes'),
]