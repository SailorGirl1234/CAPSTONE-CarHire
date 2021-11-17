# Generated by Django 3.2.5 on 2021-10-18 21:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('carhire', '0003_auto_20211018_2045'),
    ]

    operations = [
        migrations.RenameField(
            model_name='car',
            old_name='size',
            new_name='seats',
        ),
        migrations.AddField(
            model_name='car',
            name='storage',
            field=models.PositiveSmallIntegerField(default=1),
            preserve_default=False,
        ),
    ]