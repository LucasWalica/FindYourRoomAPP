# Generated by Django 5.1.5 on 2025-02-04 16:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_rename_facebok_profile_inquilino_facebook_profile'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='inquilino',
            name='facebook_profile',
        ),
        migrations.RemoveField(
            model_name='inquilino',
            name='instagram_profile',
        ),
        migrations.RemoveField(
            model_name='inquilino',
            name='linkedin_profile',
        ),
    ]
