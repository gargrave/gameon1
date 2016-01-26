from django.http import HttpResponse


def games_list(request):
    return HttpResponse('games')


def platforms_list(request):
    return HttpResponse('platforms')
