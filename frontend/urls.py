from django.urls import path
from .views import *

urlpatterns = [
    path('',client),
    path('admin/',client),
    path('admin/semester',client),
    path('admin/lecture',client),
    path('admin/class',client),
    path('admin/course',client),
    path('admin/student',client),
    path('admin/enrolls',client),
    path('student/home',client),
    path('lecture/home',client),
    
    
]
