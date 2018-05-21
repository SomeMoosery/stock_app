from django.urls import path

from . import views

urlpatterns=[
    path('profiles/', views.ListProfile.as_view()),
    path('profiles/<int:pk>/', views.DetailProfile.as_view()),
    path('stocks/', views.ListStock.as_view()),
    path('stocks/<int:pk>/', views.DetailStock.as_view()),
    #TODO Add other API functionality
]
