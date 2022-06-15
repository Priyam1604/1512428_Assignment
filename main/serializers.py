from rest_framework import serializers

from .models import *

class SemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Semester
        fields = ['id','semester','year']


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class LecturerSerializer(serializers.ModelSerializer):
    classLists = serializers.ListField(required=False)
    class Meta:
        model = Lecturer
        fields = '__all__'
        extra_kwargs = {"classLists": {"required": False, "allow_null": True}}


class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = '__all__'


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class EnrollListsSerializer(serializers.ModelSerializer):
    student = serializers.CharField(source='student_id.email')
    class_no = serializers.CharField(source='class_id.number')
    class Meta:
        model = StudentEnrollment
        fields = ['student','class_no','enrolTime','id']

class EnrollSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentEnrollment
        fields = '__all__'


class GradeBookListsSerializer(serializers.ModelSerializer):
    class_no = serializers.CharField(source='class_id.number')
    class Meta:
        model = StudentEnrollment
        fields = ['class_no','enrolTime','grade','id']


class ClassSerializerLists(serializers.ModelSerializer):
    course = serializers.CharField(source='course.name')
    class Meta:
        model = Class
        fields = '__all__'


class CourseSerializerLists(serializers.ModelSerializer):
    semesters = serializers.SerializerMethodField('getsemesternames')
    class Meta:
        model = Course
        fields = ['id','code','name','semesters']

    def getsemesternames(self,obj):
        names = []
        for item in obj.semesters.all():
            names.append(item.semester)
        
        return ", ".join(names)

class LecturerSerializerLists(serializers.ModelSerializer):
    classLists = serializers.SerializerMethodField('getClassLists')
    class Meta:
        model = Lecturer
        fields = ['first_name','last_name','email','DOB','staffID','classLists','password']

    
    def getClassLists(self,obj):
        names = []
        
        for item in obj.classLists.all():
            names.append(f'class-{item.number}')
        
        return ", ".join(names)