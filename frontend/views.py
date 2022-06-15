from django.shortcuts import render



def client(request,*args,**kwargs):
    return render(request,'frontend/index.html')
