# Generated by Django 2.0.5 on 2018-06-22 01:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('stock_app', '0003_auto_20180603_1310'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stock',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='stocks', to='stock_app.Profile'),
        ),
    ]
