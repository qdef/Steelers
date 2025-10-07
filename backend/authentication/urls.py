from django.urls import path, include

from . import views

app_name = "authentication"

urlpatterns = [
    path('register/', views.user_register, name="register"),
    path('login/', views.user_login, name="login"),
    path('logout/', views.user_logout, name="logout"),
    path('delete/', views.user_delete, name="delete"),
    path('status/', views.user_is_logged, name="status"),
]
