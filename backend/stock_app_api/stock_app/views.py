from django.shortcuts import render
from rest_framework import generics
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

    def get_queryset(self):
        username = self.kwargs['pk']
        return models.Stock.objects.filter(owner=username)
