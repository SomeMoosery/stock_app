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
    bio = models.CharField(max_length = 500, blank=True)
    location = models.CharField(max_length=100, blank=True)
    age = models.IntegerField(blank=True, null=True)
    university = models.CharField(max_length=100, blank=True)
    rating = models.DecimalField(max_digits=4, decimal_places=2, default=10.00)

    class Meta:
        ordering = ('created',)

    def __str__(self):
        return str(self.user)

class Dwolla(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    owner = models.OneToOneField(Profile, on_delete = models.CASCADE)
    name = models.CharField(max_length = 100, blank = True)
    plaid_token = models.CharField(max_length = 100, blank = True)
    account_url = models.CharField(max_length = 100, blank = True)

    class Meta:
        ordering = ('created',)

    def __str__(self):
        return str(self.name)

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

class Ask(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, related_name="ask_owner", on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=100, default="")
    description = models.CharField(max_length=500, default="")
    age = models.DateTimeField(default=timezone.now)
    amount = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    weeks = models.IntegerField(default=0)
    interest = models.DecimalField(max_digits=4, decimal_places=2, default=0)
    is_active = models.BooleanField(default=False)
    buyer = models.ForeignKey(User, related_name="buyer", on_delete=models.CASCADE, blank=True, null=True)
    
    def __str__(self):
        return str(self.owner.username) + "_" + self.title

class Offer(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, related_name="offer_owner", on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=100, default="")
    description = models.CharField(max_length=500, default="")
    age = models.DateTimeField(default=timezone.now)
    amount = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    weeks = models.IntegerField(default=0)
    interest = models.DecimalField(max_digits=4, decimal_places=2, default=0)
    is_active = models.BooleanField(default=False)
    loaner = models.ForeignKey(User, related_name="loaner", on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return str(self.owner.username) + "_" + self.title

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
