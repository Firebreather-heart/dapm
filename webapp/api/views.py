from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema
import requests

# Create your views here.

URL = "https://moviesdatabase.p.rapidapi.com/titles/x/upcoming"

HEADERS = {
	"X-RapidAPI-Key": "fec099dd21mshcec4df7f75d81a3p1417ecjsn6aeee24e65bb",
	"X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com"
}
qs = {'startyear':2000}

@swagger_auto_schema(method='GET',
operation_description='GET /all\n Returns all movies')
@api_view(['GET'])
def get_all_movies(request, page=1):
    res = requests.get(url=URL+f'?page={page}', headers=HEADERS, params=qs)
    res_json = res.json()
    return JsonResponse(res_json)
    