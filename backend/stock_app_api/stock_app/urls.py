from django.urls import path

from . import views

urlpatterns=[
    path('', views.ListProfile.as_view()),
    #TODO Add other API functionality
]
