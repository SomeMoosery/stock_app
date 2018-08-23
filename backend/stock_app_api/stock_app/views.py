from django.shortcuts import render
from rest_framework import generics, permissions
from . import models
from . import serializers

class ListProfile(generics.ListCreateAPIView):
    queryset = models.Profile.objects.all()
    serializer_class = serializers.ProfileSerializer

class DetailProfile(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Profile.objects.all()
    serializer_class = serializers.ProfileSerializer

class ListStock(generics.ListCreateAPIView):
    queryset = models.Stock.objects.all()
    serializer_class = serializers.StockSerializer

class DetailStock(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Stock.objects.all()
    serializer_class = serializers.StockSerializer

class ListProfileStock(generics.ListCreateAPIView):
    serializer_class = serializers.StockSerializer
    permission_classes = [permissions.IsAuthenticated, ]

    def get_queryset(self):
        username = self.kwargs['pk']
        return models.Stock.objects.filter(owner=username)

    #NOTE this is new stuff
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class ListProfileBank(generics.ListCreateAPIView):
    serializer_class = serializers.BankSerializer
    permission_classes = [permissions.IsAuthenticated, ]

    def get_queryset(self):
        username = self.kwargs['pk']
        return models.Bank.objects.filter(owner=username)

class ListBankDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = serializers.BankSerializer

    def get_queryset(self):
        return models.Bank.objects.all()

class ListProfileAsk(generics.ListCreateAPIView):
    serializer_class = serializers.AskSerializer
    permission_classes = [permissions.IsAuthenticated, ]

    def get_queryset(self):
        username = self.kwargs['pk']
        return models.Ask.objects.filter(owner=username)

class ListAsk(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = serializers.AskSerializer

    def get_queryset(self):
        return models.Ask.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class ListAskDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = serializers.AskSerializer

    def get_queryset(self):
        return models.Ask.objects.all()

class ListProfileOffer(generics.ListCreateAPIView):
    serializer_class = serializers.OfferSerializer
    permission_classes = [permissions.IsAuthenticated, ]

    def get_queryset(self):
        username = self.kwargs['pk']
        return models.Offer.objects.filter(owner=username)

class ListOffer(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = serializers.OfferSerializer

    def get_queryset(self):
        return models.Offer.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class ListOfferDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = serializers.OfferSerializer

    def get_queryset(self):
        return models.Offer.objects.all()


class ListBanks(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = serializers.BankSerializer

    def get_queryset(self):
        return models.Bank.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class DetailProfile(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Dwolla.objects.all()
    serializer_class = serializers.ProfileSerializer