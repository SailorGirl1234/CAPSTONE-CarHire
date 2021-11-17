# Generated by Django 3.2.5 on 2021-11-05 15:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('carhire', '0022_alter_booking_booking_ref'),
    ]

    operations = [
        migrations.AddField(
            model_name='booking',
            name='price',
            field=models.FloatField(default=0),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='booking',
            name='booking_ref',
            field=models.CharField(max_length=9, unique=True),
        ),
    ]
