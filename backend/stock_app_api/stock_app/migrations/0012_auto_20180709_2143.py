# Generated by Django 2.0.7 on 2018-07-10 01:43

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('stock_app', '0011_auto_20180709_2131'),
    ]

    operations = [
        migrations.AlterField(
            model_name='offer',
            name='loaner',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='loaner', to=settings.AUTH_USER_MODEL),
        ),
    ]
