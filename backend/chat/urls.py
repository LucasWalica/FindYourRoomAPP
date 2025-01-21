from django.urls import path 
from .views import MessagesList


urlpatterns = [
    path('messages/<int:user2_id>/', MessagesList.as_view())
]
