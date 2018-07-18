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

    # Profiles:
    url(r'^profiles/$', views.ListProfile.as_view()),
    url(r'^profiles/(?P<pk>[^/.]+)/$', views.DetailProfile.as_view()),
    url(r'^profiles/(?P<pk>[^/.]+)/stocks/$', views.ListProfileStock.as_view()),
    url(r'^profiles/(?P<pk>[^/.]+)/banks/$', views.ListProfileBank.as_view()),

    #Stocks: 
    url(r'^stocks/$', views.ListStock.as_view()),
    url(r'^stocks(?P<pk>[^/.]+)/$', views.DetailStock.as_view()),

    #Auth:
    url(r'^auth/register/$', RegistrationAPI.as_view()),
    url(r'^auth/login/$', LoginAPI.as_view()),
    url(r'^auth/user/$', UserAPI.as_view()),

    #Banks:
    url(r'^exchange-public-token/$', ExchangePublicToken.as_view()), #Call plaid service to exchange public token for access token to make Item
    url(r'^banks/$', views.ListBanks.as_view()),
    url(r'^banks/(?P<pk>[^/.]+)/$', views.ListBankDetail.as_view()),

    #Offers:
    url(r'^offers/$', views.ListOffer.as_view()),
    url(r'^profiles/(?P<pk>[^/.]+)/offers/$', views.ListProfileOffer.as_view()),
    url(r'^offers/(?P<pk>[^/.]+)/$', views.ListOfferDetail.as_view()),

    #Asks:
    url(r'^asks/$', views.ListAsk.as_view()),
    url(r'^profiles/(?P<pk>[^/.]+)/asks/$', views.ListProfileAsk.as_view()),
    url(r'^asks/(?P<pk>[^/.]+)/$', views.ListAskDetail.as_view()),
]
