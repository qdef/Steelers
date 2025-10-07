from django.http import JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User

from .forms import CreateUserForm
from .decorators import unauthenticated_user, allowed_users


def user_is_logged(request):
    if request.user.is_authenticated:
        return JsonResponse({
            "is_authenticated": True,
            "username": request.user.username
        })
    return JsonResponse({"is_authenticated": False})

def user_login(request):
    if request.user.is_authenticated:
        return redirect("http://localhost:3000")

    if request.method == "POST":
        user = authenticate(
            request,
            username=request.POST.get("username"),
            password=request.POST.get("password"),
        )

        if user is not None:
            login(request, user)
            return redirect("http://localhost:3000")
        else:
            messages.info(request, "Username or password is incorrect.")
    
    return render(request, 'authentication/login.html')

def user_register(request):
    form = CreateUserForm()

    if request.method == "POST":
        form = CreateUserForm(request.POST)
        if form.is_valid():
            # Register new user into the dabase
            form.save()
            username = form.cleaned_data.get("username")
            # Go back to main website
            return redirect("http://localhost:3000")
    
    context = {"form": form}
    return render(request, 'authentication/register.html', context)


@login_required(login_url="authentication:login")
@allowed_users(allowed_roles=["Admins"])
def user_delete(request):
    if request.method == "POST":
        username=request.POST.get("username")
        user_to_delete = get_object_or_404(User, username=username)
        if user_to_delete:
            user_to_delete.delete()
            messages.success(
                request,
                f"Username {username} was successfully deleted!"
            )
            return redirect("authentication:delete")
    
    return render(request, 'authentication/delete.html')

def user_logout(request):
    logout(request)
    return redirect("http://localhost:3000")
