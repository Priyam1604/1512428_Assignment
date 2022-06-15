
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from passlib.hash import django_pbkdf2_sha256

from .utils import send_mail
from .serializers import *


class Auth(APIView):
    permission_classes = ()
    authentication_classes = ()
    def get(self,request,format=None):
        email = request.GET.get('email')
        password = request.GET.get('password')
        user = request.GET.get('user')
        
        if user == 'admin':
            try:
                
                admin = User.objects.get(email=email)
                check_pass = django_pbkdf2_sha256.verify(password,admin.password)
                if check_pass:
                    request.session['admin'] = email
                    return Response({'success':'admin autheticated'},status=status.HTTP_200_OK)
                return Response({'error':'admin password invalid'},status=status.HTTP_400_BAD_REQUEST)
                    
            except Exception as err:
                return Response({'error':'There is no valid admin account'},status=status.HTTP_401_UNAUTHORIZED)
        elif user == 'student':
            try:
                student = Student.objects.filter(email=email,password=password)
                if student:
                    request.session['student'] = email
                    return Response({'success':'student autheticated'},status=status.HTTP_200_OK)
                return Response({'error':'student account invalid'},status=status.HTTP_400_BAD_REQUEST)
            except Exception as err:
                return Response({'error':'There is no valid student account'},status=status.HTTP_401_UNAUTHORIZED)
        elif user == 'lecture':
            try:
                lecture = Lecturer.objects.filter(email=email,password=password)
                if lecture:
                    request.session['lecture'] = email
                    return Response({'success':'lecture autheticated'},status=status.HTTP_200_OK)
                return Response({'error':'lecture account invalid'},status=status.HTTP_400_BAD_REQUEST)
            except Exception as err:
                return Response({'error':'There is no valid lecture account'},status=status.HTTP_401_UNAUTHORIZED)
        
        else:
            return Response({'error':'There is no valid account'},status=status.HTTP_401_UNAUTHORIZED)

    
    def delete(self,request,format=None):
        user = request.GET.get('user')
        if user:
            del request.session[user];
            return Response({'success':'session has deleted'},status=status.HTTP_201_CREATED)
        return Response({'error':'No user'},status=status.HTTP_400_BAD_REQUEST)

class SemesterView(APIView):
    serializer_class = SemesterSerializer
    permission_classes = ()
    authentication_classes = ()
    def get(self,request,format=None):
        semesters = self.serializer_class(Semester.objects.all(),many=True).data
        return Response({'semesters':semesters},status=status.HTTP_200_OK)
        
    def post(self,request,format=None):
        serialize = self.serializer_class(data=request.data)
        if serialize.is_valid():
            serialize.save()
            return Response({'success':'Semester has created'},status=status.HTTP_201_CREATED)
        return Response(serialize.errors,status=status.HTTP_400_BAD_REQUEST)

    def put(self,request,format=None):
        sem_id = request.data.get('id')
        try:
            sem_obj = Semester.objects.get(id=sem_id)
            serialize = self.serializer_class(sem_obj,data=request.data)
            if serialize.is_valid():
                serialize.save()
                return Response({'success':'Semester has updated'},status=status.HTTP_201_CREATED)
            return Response(serialize.errors,status=status.HTTP_400_BAD_REQUEST)
        except Exception as err:
            return Response({'error':f'{err}'},status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request,format=None):
        sem_id = request.GET.get('id')
        if sem_id:
            Semester.objects.filter(id=sem_id).delete()
            return Response({'success':'Semester has deleted'},status=status.HTTP_201_CREATED)
        return Response({'error':'No semester id exist'},status=status.HTTP_400_BAD_REQUEST)


class CourseView(APIView):
    serializer_class = CourseSerializer
    permission_classes = ()
    authentication_classes = ()
    def get(self,request,format=None):
        courses = CourseSerializerLists(Course.objects.all(),many=True).data
        return Response({'courses':courses},status=status.HTTP_200_OK)
        
    def post(self,request,format=None):
        serialize = self.serializer_class(data=request.data)
        if serialize.is_valid():
            serialize.save()
            return Response({'success':'Course has created'},status=status.HTTP_201_CREATED)
        return Response(serialize.errors,status=status.HTTP_400_BAD_REQUEST)

    def put(self,request,format=None):
        course_id = request.data.get('id')
        try:
            obj = Course.objects.get(id=course_id)
            serialize = self.serializer_class(obj,data=request.data)
            if serialize.is_valid():
                serialize.save()
                return Response({'success':'Course has updated'},status=status.HTTP_201_CREATED)
            return Response(serialize.errors,status=status.HTTP_400_BAD_REQUEST)
        except Exception as err:
            return Response({'error':f'{err}'},status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request,format=None):
        course_id = request.GET.get('id')
        if course_id:
            Course.objects.filter(id=course_id).delete()
            return Response({'success':'Course has deleted'},status=status.HTTP_201_CREATED)
        return Response({'error':'No course id exist'},status=status.HTTP_400_BAD_REQUEST)


class ClassView(APIView):
    serializer_class = ClassSerializer
    permission_classes = ()
    authentication_classes = ()
    def get(self,request,format=None):
        classess = ClassSerializerLists(Class.objects.all(),many=True).data
        return Response({'classes':classess},status=status.HTTP_200_OK)
        
    def post(self,request,format=None):
        serialize = self.serializer_class(data=request.data)
        
        if serialize.is_valid():
            serialized_obj = serialize.save()
            teacher = Lecturer.objects.get(email=serialized_obj.lecturer_details)
            teacher.classLists.add(serialized_obj)
            return Response({'success':'Class has created'},status=status.HTTP_201_CREATED)
        return Response(serialize.errors,status=status.HTTP_400_BAD_REQUEST)

    def put(self,request,format=None):
        class_id = request.data.get('id')
        try:
            obj = Class.objects.get(id=class_id)
            old_teacher = obj.lecturer_details
            serialize = self.serializer_class(obj,data=request.data)
            if serialize.is_valid():
                serialized_obj = serialize.save()
                teacher = Lecturer.objects.get(email=request.data['lecturer_details'])
                if str(old_teacher) == str(teacher.email):
                    print(teacher)
                    pass
                else:
                    old_teacher = Lecturer.objects.get(email=old_teacher)
                    old_teacher.classLists.remove(serialized_obj)
                    teacher.classLists.add(serialized_obj)
                return Response({'success':'Class has updated'},status=status.HTTP_201_CREATED)
            return Response(serialize.errors,status=status.HTTP_400_BAD_REQUEST)
        except Exception as err:
            return Response({'error':f'{err}'},status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request,format=None):
        class_id = request.GET.get('id')
        if class_id:
            Class.objects.filter(id=class_id).delete()
            return Response({'success':'Class has deleted'},status=status.HTTP_201_CREATED)
        return Response({'error':'No Class id exist'},status=status.HTTP_400_BAD_REQUEST)


class ClassBasicInfo(APIView):
    permission_classes = ()
    authentication_classes = ()
    def get(self,request,format=None):
        courses = CourseSerializer(Course.objects.all(),many=True).data
        teachers = LecturerSerializerLists(Lecturer.objects.all(),many=True).data
        context = {
            'courses':courses,
            'teachers':teachers
        }
        return Response({'info':context},status=status.HTTP_200_OK)


class LecturerView(APIView):
    serializer_class = LecturerSerializer
    permission_classes = ()
    authentication_classes = ()
    def get(self,request,format=None):
        lecturers = LecturerSerializerLists(Lecturer.objects.all(),many=True).data
        return Response({'lecturers':lecturers},status=status.HTTP_200_OK)
        
    def post(self,request,format=None):
        serialize = self.serializer_class(data=request.data)
        if serialize.is_valid():
            serialize.save()
            return Response({'success':'Lecturer has created'},status=status.HTTP_201_CREATED)
        return Response(serialize.errors,status=status.HTTP_400_BAD_REQUEST)

    def put(self,request,format=None):
        lec_id = request.data.get('staffID')
        try:
            obj = Lecturer.objects.get(staffID=lec_id)
            serialize = self.serializer_class(obj,data=request.data)
            if serialize.is_valid():
                serialize.save()
                return Response({'success':'Lecturer has updated'},status=status.HTTP_201_CREATED)
            return Response(serialize.errors,status=status.HTTP_400_BAD_REQUEST)
        except Exception as err:
            return Response({'error':f'{err}'},status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request,format=None):
        lec_id = request.GET.get('staffID')
        if lec_id:
            Lecturer.objects.filter(staffID=lec_id).delete()
            return Response({'success':'Lecturer has deleted'},status=status.HTTP_201_CREATED)
        return Response({'error':'No Lecturer id exist'},status=status.HTTP_400_BAD_REQUEST)


class StudentView(APIView):
    serializer_class = StudentSerializer
    permission_classes = ()
    authentication_classes = ()
    def get(self,request,format=None):
        students = self.serializer_class(Student.objects.all(),many=True).data
        return Response({'students':students},status=status.HTTP_200_OK)
        
    def post(self,request,format=None):
        serialize = self.serializer_class(data=request.data)
        if serialize.is_valid():
            serialize.save()
            return Response({'success':'Student has created'},status=status.HTTP_201_CREATED)
        return Response(serialize.errors,status=status.HTTP_400_BAD_REQUEST)

    def put(self,request,format=None):
        st_id = request.data.get('studentID')
        try:
            obj = Student.objects.get(studentID=st_id)
            serialize = self.serializer_class(obj,data=request.data)
            if serialize.is_valid():
                serialize.save()
                return Response({'success':'Student has updated'},status=status.HTTP_201_CREATED)
            return Response(serialize.errors,status=status.HTTP_400_BAD_REQUEST)
        except Exception as err:
            return Response({'error':f'{err}'},status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request,format=None):
        st_id = request.GET.get('studentID')
        if st_id:
            Student.objects.filter(studentID=st_id).delete()
            return Response({'success':'Student has deleted'},status=status.HTTP_201_CREATED)
        return Response({'error':'No Student id exist'},status=status.HTTP_400_BAD_REQUEST)


class EnrollView(APIView):
    serializer_class = EnrollSerializer
    permission_classes = ()
    authentication_classes = ()
    def get(self,request,format=None):
        enrolls = EnrollListsSerializer(StudentEnrollment.objects.all(),many=True).data
        return Response({'enrolls':enrolls},status=status.HTTP_200_OK)
        
    def post(self,request,format=None):
        serialize = self.serializer_class(data=request.data)
        if serialize.is_valid():
            serialize.save()
            return Response({'success':'Enroll has created'},status=status.HTTP_201_CREATED)
        return Response(serialize.errors,status=status.HTTP_400_BAD_REQUEST)

    

    def delete(self,request,format=None):
        en_id = request.GET.get('id')
        if en_id:
            StudentEnrollment.objects.filter(id=en_id).delete()
            return Response({'success':'Enroll has deleted'},status=status.HTTP_201_CREATED)
        return Response({'error':'No Enroll id exist'},status=status.HTTP_400_BAD_REQUEST)


class GradeBook(APIView):
    serializer_class = EnrollSerializer
    permission_classes = ()
    authentication_classes = ()

    def get(self,request,format=None):
        if request.session.get('student'):
            email = request.session['student']
            marks = StudentEnrollment.objects.filter(student_id__email=email)
            return  Response({'marks':GradeBookListsSerializer(marks,many=True).data},status=status.HTTP_200_OK)
        return Response({'error':'No student id exist'},status=status.HTTP_400_BAD_REQUEST)


class LecturerBook(APIView):
    serializer_class = EnrollSerializer
    permission_classes = ()
    authentication_classes = ()

    def get(self,request,format=None):
        if request.session.get('lecture'):
            email = request.session['lecture']
            info = Lecturer.objects.filter(email=email)
            if info:
                class_list = info[0].classLists.all()
                enrolls = []

                for item in class_list:
                    active = StudentEnrollment.objects.filter(class_id__id=item.id)
                    if active:
                        obj = {
                            "id":active[0].id,
                            "student":active[0].student_id.email,
                            'class':active[0].class_id.number,
                            "grade":active[0].grade
                        }
                        enrolls.append(obj)
                print(enrolls)
                return  Response({'enrolls':enrolls},status=status.HTTP_200_OK)
        return Response({'error':'No lecture id exist'},status=status.HTTP_400_BAD_REQUEST)

    
    def put(self,request,format=None):
        st_id = request.data.get('st_id')
        if st_id:
            mark = request.data.get('mark')
            user = StudentEnrollment.objects.filter(id=st_id)
            if user:
                user.update(grade=mark)
                send_mail('Mark Updated',user[0].student_id.email)

                return  Response({'success':'Mark has updated'},status=status.HTTP_200_OK)
        return Response({'error':'No student id exist'},status=status.HTTP_400_BAD_REQUEST)