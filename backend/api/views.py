from rest_framework import generics

from api.models import Game, Order

from .serializers import GameSerializer, OrderSerializer


class GamesView(generics.ListCreateAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer


class GameRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    lookup_field = "id"


class OrdersView(generics.ListCreateAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        # Filter only orders associated to currently logged-in User
        user = self.request.user
        if user.is_authenticated:
            return Order.objects.filter(user=user)
        return Order.objects.none()

    def perform_create(self, serializer):
        # Associate currently logged-in User to new Order
        serializer.save(user=self.request.user)


class OrderRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    lookup_field = "id"
