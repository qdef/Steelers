from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views

app_name = "api"

urlpatterns = [
    path('games/', views.GamesView.as_view(), name="games"),
    path('games/<uuid:id>/', views.GameRetrieveUpdateDestroyView.as_view(), name="game"),

    path('orders/', views.OrdersView.as_view(), name="orders"),
    path('orders/<uuid:id>/', views.OrderRetrieveUpdateDestroyView.as_view(), name="order"),
]
