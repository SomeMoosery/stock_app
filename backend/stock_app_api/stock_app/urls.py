from django.urls import path
from django.conf.urls import include, url

from . import views
from .api import *
from rest_framework.authtoken import views as drf_views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('stocks', StockViewSet, 'stocks')

urlpatterns=[
    url(r'^', include(router.urls)),
    url(r'^profiles/$', views.ListProfile.as_view()),
    url(r'^profiles/(?P<pk>[^/.]+)/$', views.DetailProfile.as_view()),
    url(r'^profiles/(?P<pk>[^/.]+)/stocks/$', views.ListProfileStock.as_view()),
    url(r'^profiles/(?P<pk>[^/.]+)/banks/$', views.ListProfileBank.as_view()),
    url(r'^stocks/$', views.ListStock.as_view()),
    url(r'^stocks(?P<pk>[^/.]+)/$', views.DetailStock.as_view()),
    # url(r'^stocks/<int:pk>/$', UserStockViewSet.as_view()),
    url(r'^auth/register/$', RegistrationAPI.as_view()),
    url(r'^auth/login/$', LoginAPI.as_view()),
    url(r'^auth/user/$', UserAPI.as_view()),
    # path('auth/', drf_views.obtain_auth_token, name='auth'),
    #TODO Add other API functionality
    url(r'^exchange-public-token/$', ExchangePublicToken.as_view()), #Call plaid service to exchange public token for access token to make Item
    url(r'^banks/$', views.ListBanks.as_view()),
]
