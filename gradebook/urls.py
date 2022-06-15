
from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin_next/', admin.site.urls),
    path('api/', include('main.urls')),
    path('', include('frontend.urls')),
]
