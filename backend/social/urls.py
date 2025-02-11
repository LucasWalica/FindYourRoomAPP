from django.urls import path
from .views import (
    PostFriendRequest, FriendsRequestList, FriendRequestUpdate,
    FriendsLists, FriendDelete,
    MatchListView, MatchUpdate)


urlpatterns = [
    # friend requesting
    path('friendRequest/', PostFriendRequest.as_view()),
    path('requestList/', FriendsRequestList.as_view()),
    path('requestUpdate/<int:pk>/', FriendRequestUpdate.as_view()),
    # friends
    path('friendList/', FriendsLists.as_view()),
    path('friendDelete/<int:pk>/', FriendDelete.as_view()),
    # matches
    path('matchList/', MatchListView.as_view()),
    path('matchUpdate/<int:pk>/', MatchUpdate.as_view(), name="match-update"),
]