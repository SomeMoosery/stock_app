from django.shortcuts import render
from rest_framework import generics
from . import models
from . import serializers

class ListProfile(generics.ListCreateAPIView):
    queryset = models.Profile.objects.all()
    serializer_class = serializers.ProfileSerializer
