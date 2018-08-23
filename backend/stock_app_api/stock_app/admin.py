from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *

admin.site.unregister(User)

class ExtendedUserInline(admin.TabularInline):
    model = Profile

class ExtendedUserAdmin(UserAdmin):
    inlines = [ExtendedUserInline, ]

admin.site.register(User, ExtendedUserAdmin)
admin.site.register(Profile)
admin.site.register(Stock)
admin.site.register(Bank)
admin.site.register(Ask)
admin.site.register(Offer)
admin.site.register(Dwolla)
