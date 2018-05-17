from rest_framework import serializers
from stock_app.models import Profile, Stock

class ProfileSerializer(serializers.Serializer):
    class Meta:
        fields = (
            'id',
            'user',
            'bio',
            'location',
            'age',
            'university',
        )
        models = models.Profile

class StockSerializer(serializers.Serializer):
    class Meta:
        fields = (
            'id',
            'owner',
            'name',
            'count',
            'first_bought_date',
        )
        models = models.Stock
