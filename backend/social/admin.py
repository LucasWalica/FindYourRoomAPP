from django.contrib import admin
from .models import FriendRequest, Friends, Matches
# Register your models here.
admin.site.register(FriendRequest)
admin.site.register(Friends)
admin.site.register(Matches)
