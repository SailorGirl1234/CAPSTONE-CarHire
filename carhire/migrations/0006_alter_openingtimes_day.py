# Generated by Django 3.2.5 on 2021-10-19 17:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('carhire', '0005_location_openingtimes'),
    ]

    operations = [
        migrations.AlterField(
            model_name='openingtimes',
            name='day',
            field=models.IntegerField(choices=[(1, 'Monday'), (2, 'Tuesday'), (3, 'Wednesday'), (4, 'Thursday'), (5, 'Friday'), (6, 'Saturday'), (7, 'Sunday'), (8, 'Holidays')]),
        ),
    ]
