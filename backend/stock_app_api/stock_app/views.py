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
