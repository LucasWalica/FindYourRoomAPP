from django.urls import path
from .views import (
    LoginView, LogoutView, UserCreateView,
    InquilinoCreateView, InquilinoDetailView, 
    InquilinoUpdateView)


urlpatterns = [
    path('login/', LoginView.as_view()),
    path('register/', UserCreateView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('inquilino/create/', InquilinoCreateView.as_view()),
    path('inquilino/update/<int:id>/', InquilinoUpdateView.as_view()),
    path('inquilino/detail/<int:id>/', InquilinoDetailView.as_view())
]