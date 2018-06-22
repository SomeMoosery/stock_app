from django.urls import path

from . import views
from .api import *
from rest_framework.authtoken import views as drf_views

urlpatterns=[
    path('profiles/', views.ListProfile.as_view()),
    path('profiles/<int:pk>/', views.DetailProfile.as_view()),
    path('profiles/<int:pk>/stocks/', views.ListProfileStock.as_view()),
    path('stocks/', views.ListStock.as_view()),
    path('stocks/<int:pk>/', views.DetailStock.as_view()),
    path('auth/register/', RegistrationAPI.as_view()),
    path('auth/login/', LoginAPI.as_view()),
    path('auth/user/', UserAPI.as_view()),
    # path('auth/', drf_views.obtain_auth_token, name='auth'),
    #TODO Add other API functionality
]
