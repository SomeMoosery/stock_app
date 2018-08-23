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
            'rating',
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

class BankSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        fields = (
            'id',
            'owner',
            'access_token',
            'item_id',
            'bank_name',
        )
        model = models.Bank

class AskSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        fields = (
            'id',
            'created',
            'owner',
            'title',
            'description',
            'age',
            'amount',
            'weeks',
            'interest',
            'is_active',
            'buyer',
        )
        model = models.Ask

class OfferSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        fields = (
            'id',
            'created',
            'owner',
            'title',
            'description',
            'age',
            'amount',
            'weeks',
            'interest',
            'is_active',
            'loaner',
        )
        model = models.Offer

class DwollaSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        fields = (
            'id',
            'owner',
            'name',
            'plaid_token',
            'account_url',
        )
        model = models.Dwolla

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], None, validated_data['password'])
        user.save()
        user.profile.bio = self.context['bio']
        user.profile.location = self.context['location']
        user.profile.age = self.context['age']
        user.profile.university = self.context['university']
        user.save()
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
