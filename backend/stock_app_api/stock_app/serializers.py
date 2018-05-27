from rest_framework import serializers
# from stock_app.models import Profile, Stock
from . import models

class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username') #NOTE: may need to change to not be read_only at some point
    email = serializers.ReadOnlyField(source='user.email')
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
    # owner = serializers.ReadOnlyField(source='profile.user')
    class Meta:
        fields = (
            'id',
            'owner',
            'name',
            'count',
            'first_bought_date',
        )
        model = models.Stock
