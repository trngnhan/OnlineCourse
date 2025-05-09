# Generated by Django 5.1.6 on 2025-02-28 07:19

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_date', models.DateTimeField(auto_created=True)),
                ('active', models.BooleanField(default=True)),
                ('updated_date', models.DateTimeField(auto_now=True)),
                ('subject', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('image', models.ImageField(upload_to='courses/%Y/%m/')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='courses.category')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Lesson',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_date', models.DateTimeField(auto_created=True)),
                ('active', models.BooleanField(default=True)),
                ('updated_date', models.DateTimeField(auto_now=True)),
                ('subject', models.CharField(max_length=255)),
                ('content', models.TextField()),
                ('image', models.ImageField(upload_to='courses/%Y/%m/')),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courses.course')),
            ],
            options={
                'unique_together': {('subject', 'course')},
            },
        ),
    ]
