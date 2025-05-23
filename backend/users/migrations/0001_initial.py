# Generated by Django 5.1.4 on 2024-12-24 16:38

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Inquilino',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('age', models.IntegerField(blank=True, null=True)),
                ('occupation', models.CharField(blank=True, max_length=100, null=True)),
                ('gender', models.CharField(blank=True, max_length=50, null=True)),
                ('activity_schedule', models.CharField(blank=True, max_length=50, null=True)),
                ('cleanliness_level', models.CharField(blank=True, max_length=50, null=True)),
                ('pets', models.BooleanField(default=False)),
                ('smoker', models.BooleanField(blank=True, default=False)),
                ('visit_frequency', models.CharField(blank=True, max_length=100, null=True)),
                ('common_space_usage', models.CharField(blank=True, max_length=50, null=True)),
                ('hobbies', models.CharField(blank=True, max_length=255, null=True)),
                ('socializing_frequency', models.CharField(blank=True, max_length=50, null=True)),
                ('living_environment', models.CharField(blank=True, max_length=50, null=True)),
                ('presentation', models.TextField(blank=True, max_length=1024, null=True)),
                ('fkUser', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
