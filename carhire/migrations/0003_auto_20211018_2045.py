# Generated by Django 3.2.5 on 2021-10-18 20:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('carhire', '0002_car'),
    ]

    operations = [
        migrations.RenameField(
            model_name='car',
            old_name='luggage',
            new_name='charge_time',
        ),
        migrations.RenameField(
            model_name='car',
            old_name='seats',
            new_name='size',
        ),
    ]
