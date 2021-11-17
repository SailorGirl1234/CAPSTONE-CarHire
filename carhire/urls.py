from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("logout", views.logout_view, name="logout"),
    
    # API Routes
    path("book_car", views.book_car, name="book_car"),
    path("booking/<int:id>", views.booking, name="booking"),
    path('cancel_booking/<int:id>', views.cancel_booking, name="cancel_booking"),
    path("cars", views.cars, name="cars"),
    path('login_AJAX', views.login_AJAX, name="login_AJAX"),
    path("location/<str:code>", views.location, name="location"),
    path('profile', views.profile, name="profile"),
    path("register", views.register, name="register"),
    path("search", views.search, name="search"),
    path("select_car", views.select_car, name="select_car"),
    path("update_user", views.update_user, name="update_user"),

]