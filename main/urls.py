from django.urls import path
from .views import *
urlpatterns = [
    path('auth/',Auth.as_view()),
    path('semester/',SemesterView.as_view()),
    path('course/',CourseView.as_view()),
    path('class/',ClassView.as_view()),
    path('student/',StudentView.as_view()),
    path('enroll/',EnrollView.as_view()),
    path('lecturer/',LecturerView.as_view()),
    path('classbaseinfo/',ClassBasicInfo.as_view()),
    path('gradebook/',GradeBook.as_view()),
    path('lecturerbook/',LecturerBook.as_view()),

]
