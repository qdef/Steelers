from django.http import HttpResponse
from django.shortcuts import redirect


def unauthenticated_user(view_func):
    def wrapper_func(request, *args, **kwargs):
        if request.user.is_authenticated:
            # Go back to main website
            return redirect("http://localhost:3000")
        else:
            return view_func(request, *args, **kwargs)
    
    return wrapper_func


def allowed_users(allowed_roles=[]):
    def decorator(view_func):
        def wrapper_func(request, *args, **kwargs):
            groups = request.user.groups.all()
            if any([group.name in allowed_roles for group in groups]):
                return view_func(request, *args, **kwargs)
            else:
                return HttpResponse("You are not authorized to delete users.")
        return wrapper_func
    return decorator

