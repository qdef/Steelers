from rest_framework import serializers

from .models import User, Game, Order


class OrderSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    game = serializers.PrimaryKeyRelatedField(queryset=Game.objects.all())
    game_title = serializers.ReadOnlyField(source='game.game_title')
    game_date = serializers.ReadOnlyField(source='game.game_date')
    opponent_logo = serializers.ImageField(source='game.opponent_logo', read_only=True)

    class Meta:
        model = Order
        fields = [
            'id',
            'user',
            'game',
            'game_title',
            'game_date',
            'quantity',
            'total_price',
            'creation_date',
            'opponent_logo',
        ]


class GameSerializer(serializers.ModelSerializer):
    orders = OrderSerializer(many=True, read_only=True)

    opponent_logo = serializers.ImageField()

    class Meta:
        model = Game

        fields = ['id', 'opponent', 'opponent_logo', 'game_title', 'game_date', 'sold_out', 'orders']


class UserSerializer(serializers.ModelSerializer):
    orders = OrderSerializer(many=True, read_only=True)

    class Meta:
        model = User

        fields = ['id', 'first_name', 'last_name', 'email', 'orders']
