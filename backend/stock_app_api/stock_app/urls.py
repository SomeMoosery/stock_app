from django.urls import path
from django.conf.urls import include, url

from . import views
from .api import *
from rest_framework.authtoken import views as drf_views
from rest_framework import routers

from .views import *

router = routers.DefaultRouter()
router.register('stocks', StockViewSet, 'stocks')

urlpatterns=[
    url(r'^', include(router.urls)),
    url(r'^profiles/$', views.ListProfile.as_view()),
    url(r'^profiles/<int:pk>/$', views.DetailProfile.as_view()),
    url(r'^profiles/<int:pk>/stocks/$', views.ListProfileStock.as_view()),
    url(r'^stocks/$', views.ListStock.as_view()),
    url(r'^stocks/<int:pk>/$', views.DetailStock.as_view()),
    url(r'^auth/register/$', RegistrationAPI.as_view()),
    url(r'^auth/login/$', LoginAPI.as_view()),
    url(r'^auth/user/$', UserAPI.as_view()),
    # url('auth/', drf_views.obtain_auth_token, name='auth'),
    #TODO Add other API functionality
]
