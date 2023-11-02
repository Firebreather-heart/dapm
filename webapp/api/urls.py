from django.urls import path
from .views import get_all_movies
urlpatterns = [
    path('all', get_all_movies, name='all_movies'),
]