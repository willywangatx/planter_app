from django.urls import path
from . import views 
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # path('', views.index, name="index"),
    path('create/', views.create_account, name="create_account"),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refreshLogin/', TokenRefreshView.as_view(), name='token_refresh'),
]