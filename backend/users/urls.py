from django.urls import path
from .views import LoginView, LogoutView, UserCreateView


urlpatterns = [
    path('login/', LoginView.as_view()),
    path('register/', UserCreateView.as_view()),
    path('logout/', LogoutView.as_view()),

]