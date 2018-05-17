from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Profile, Stock

admin.site.unregister(User)

class ExtendedUserInline(admin.TabularInline):
    model = Profile
    # fk_name = 'user'
    # max_num = 1

class ExtendedUserAdmin(UserAdmin):
    inlines = [ExtendedUserInline, ]

admin.site.register(User, ExtendedUserAdmin)
admin.site.register(Profile)
admin.site.register(Stock)
