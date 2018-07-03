# Generated by Django 2.0.5 on 2018-07-03 01:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('stock_app', '0005_auto_20180621_2248'),
    ]

    operations = [
        migrations.CreateModel(
            name='Bank',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('access_token', models.CharField(default='', max_length=100)),
                ('item_id', models.CharField(default='', max_length=100)),
                ('bank_name', models.CharField(default='', max_length=50)),
                ('owner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='bank_accounts', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('created',),
            },
        ),
        migrations.AddField(
            model_name='profile',
            name='birthday',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
