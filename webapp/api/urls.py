from django.urls import path
from .views import get_all_movies
urlpatterns = [
    path('all/<int:page>/', get_all_movies, name='all_movies'),
]