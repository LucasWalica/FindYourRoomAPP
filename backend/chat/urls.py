from django.urls import path 
from .views import MessagesList, InboxViewSerializer


urlpatterns = [
    path('messages/<int:user2_id>/', MessagesList.as_view()),
    path('messages/inbox/', InboxViewSerializer.as_view())
]
