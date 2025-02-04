from django.urls import path
from .views import (
    PostFriendRequest, FriendsRequestList, FriendRequestUpdate,
    FriendsLists, FriendDelete)


urlpatterns = [
    path('friendRequest/', PostFriendRequest.as_view()),
    path('requestList/', FriendsRequestList.as_view()),
    path('requestUpdate/', FriendRequestUpdate.as_view()),
    path('friendList/', FriendsLists.as_view()),
    path('friendDelete/<int:pk>/', FriendDelete.as_view())
]
