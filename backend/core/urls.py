from django.contrib import admin
from django.urls import path, include 
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/houses/', include('houses.urls')),
    path('api/chat/', include("chat.urls")),
    path('api/houseOrderTasks/', include('houseOrdersTasks.urls')),
    path('api/social/', include('social.urls'))
]
