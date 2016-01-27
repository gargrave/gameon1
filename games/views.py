from django.http import HttpResponse, JsonResponse

from .models import Game, Platform


def games_list(request):
    """
    Returns a list of all games
    :param request: HttpRequest
    :return: Json list of all games
    """
    all_games = Game.objects.all()
    games = []
    for game in all_games:
        games.append({
            'id': game.pk,
            'name': game.name,
            'platform': str(game.platform),
            'start_date': game.start_date,
            'end_date': game.end_date,
            'finished': game.finished
        })
    return JsonResponse({'games': games})


def platforms_list(request):
    """
    Returns a list of all platforms
    :param request: HttpRequest
    """
    all_platforms = Platform.objects.all()
    platforms = []
    for platform in all_platforms:
        platforms.append({
            'id': platform.pk,
            'name': platform.name
        })
    return JsonResponse({'platforms': platforms})
