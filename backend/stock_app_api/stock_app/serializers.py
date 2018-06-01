from rest_framework import serializers
# from stock_app.models import Profile, Stock
from . import models
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username') #NOTE: may need to change to not be read_only at some point
    email = serializers.ReadOnlyField(source='user.email')

    # def create(self, validated_data):
    #     user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
    #     return user;

    class Meta:
        fields = (
            'id',
            'user',
            'email',
            'bio',
            'location',
            'age',
            'university',
        )
        model = models.Profile

class StockSerializer(serializers.ModelSerializer):
    # NOTE When dealing with setting a ReadOnlyField (this would just say 1 beforehand)
    # Use the Django shell to try, say, Stock.objects.get(id=1).owner - that gives Profile: <carter>
    # Then you can do Stock.objects.get(id=1).owner.user and get User: <carter>
    # So on and so forth until the shell gives the value you went that enter the .x.y.z into the ReadOnlyField params below
    owner = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        fields = (
            'id',
            'owner',
            'owner_id',
            'name',
            'count',
            'first_bought_date',
        )
        model = models.Stock

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], None, validated_data['password'])
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')

class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError('Unable to log in with provided credentials')
