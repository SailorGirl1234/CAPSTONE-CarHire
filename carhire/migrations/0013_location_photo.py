# Generated by Django 3.2.5 on 2021-10-24 14:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('carhire', '0012_car'),
    ]

    operations = [
        migrations.AddField(
            model_name='location',
            name='photo',
            field=models.URLField(blank=True),
        ),
    ]
