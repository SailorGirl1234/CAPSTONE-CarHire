# Generated by Django 3.2.5 on 2021-10-26 22:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('carhire', '0019_auto_20211026_2210'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cartype',
            old_name='base_price',
            new_name='price',
        ),
    ]
