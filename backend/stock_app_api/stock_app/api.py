from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from plaid import Client

from knox.models import AuthToken

from .serializers import *

class StockViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = StockSerializer

    def get_queryset(self):
        return models.Stock.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

#Function to call Plaid API to exchange public token for access token
def exchangeToken(publicToken):
    #Takes sandbox secret
    client = Client(client_id='5b343307c323c00011448c73', secret='1960ae345a207270c000ecf9698019', public_key=publicToken, environment='sandbox')
    exchangeResponse = client.Item.public_token.exchange(publicToken)
    print('ACCESS TOKEN: ' + exchangeResponse['access_token'])
    return exchangeResponse

class ExchangePublicToken(APIView):
    def post(self, request, *args, **kwargs):
        print('REQUEST: ' + str(request.data['publicToken']))
        result = exchangeToken(request.data['publicToken'])
        print("RESULT: " + str(result))
        return Response({
            "return_data": result
        })

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
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
