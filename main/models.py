from pyexpat import model
from django.db import models

class Semester(models.Model):
    year = models.CharField(max_length=200,default='')
    semester = models.CharField(max_length=200,default='')

    def __str__(self):
        return self.semester

class Course(models.Model):
    code = models.CharField(max_length=200,default='')
    name = models.CharField(max_length=200,default='')
    semesters = models.ManyToManyField(Semester)

    def __str__(self):
        return self.name



class Class(models.Model):
    number = models.IntegerField(default=0)
    course = models.ForeignKey(Course,on_delete=models.CASCADE)
    lecturer_details = models.CharField(max_length=200,default='')

class Lecturer(models.Model):
    staffID = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=200,default='')
    last_name = models.CharField(max_length=200,default='')
    email = models.EmailField(max_length=200,default='')
    DOB = models.DateField(auto_created=True)
    classLists = models.ManyToManyField(Class,blank=True)
    password = models.CharField(max_length=200,default='')

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

class Student(models.Model):
    studentID = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=200,default='')
    last_name = models.CharField(max_length=200,default='')
    email = models.EmailField(max_length=200,default='')
    DOB = models.DateField(auto_created=True)
    password = models.CharField(max_length=200,default='')

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class StudentEnrollment(models.Model):
    student_id = models.ForeignKey(Student,on_delete=models.CASCADE)
    class_id = models.ForeignKey(Class,on_delete=models.CASCADE)
    grade = models.CharField(max_length=200,default='')
    enrolTime = models.DateTimeField(auto_created=True)
    gradeTime = models.DateTimeField(auto_now_add=True)

