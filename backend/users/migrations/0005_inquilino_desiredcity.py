# Generated by Django 5.1.5 on 2025-02-05 17:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_remove_inquilino_facebook_profile_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='inquilino',
            name='desiredCity',
            field=models.CharField(default='oviedo', max_length=40),
            preserve_default=False,
        ),
    ]
