from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
from . import models
from . import serializers


from knox.models import AuthToken

from .serializers import CreateUserSerializer, UserSerializer, LoginUserSerializer, ProfileSerializer, StockSerializer

class RegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })

class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            'user': UserSerializer(user, context=self.get_serializer_context()).data,
            'token': AuthToken.objects.create(user)
        })

class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny, ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class StockViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny, ]
    serializer_class = StockSerializer

    def get_queryset(self):
        return models.Stock.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

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
