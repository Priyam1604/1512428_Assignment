# Generated by Django 3.2 on 2022-04-11 20:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_alter_lecturer_classlists'),
    ]

    operations = [
        migrations.AlterField(
            model_name='studentenrollment',
            name='gradeTime',
            field=models.DateTimeField(auto_created=True, default=''),
        ),
    ]