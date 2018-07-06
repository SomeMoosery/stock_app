#NOTE: python3 manage.py flush deletes your database entirely!! BUT DOESN'T FIX PRIMARY KEYS
#NOTE: process for adding a custom user:
# user = User.objects.create_user('username', password='password')
# user.profile.bio = 'bio'......
# ....
# user.save()
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save

class Profile(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    user = models.OneToOneField(User, on_delete = models.CASCADE)
    birthday = models.DateTimeField(default = timezone.now)
    # bank_account = models.OneToManyField(BankAccount, on_delete = models.CASCADE);
    bio = models.CharField(max_length = 500, blank=True)
    location = models.CharField(max_length=100, blank=True)
    age = models.IntegerField(blank=True, null=True)
    university = models.CharField(max_length=100, blank=True)

    class Meta:
        ordering = ('created',)

    def __str__(self):
        return str(self.user)

class Bank(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, related_name="bank_accounts", on_delete=models.CASCADE, null=True)
    access_token = models.CharField(max_length=100)
    item_id = models.CharField(max_length=100)
    bank_name = models.CharField(max_length=50)

    class Meta:
        ordering = ('created', )

    def __str__(self):
        return str(self.owner.username) + "_" + self.bank_name

class Stock(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, related_name="stocks", on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=100)
    count = models.IntegerField(default=1)
    first_bought_date = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ('created',)

    def __str__(self):
        return str(self.owner.username) + "_" + self.name

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
