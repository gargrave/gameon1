from django.core.exceptions import ValidationError
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_POST

from .forms import GameForm, PlatformForm
from .models import Game, Platform

from game_on.utils import load_json_request


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
            'startDate': game.start_date,
            'endDate': game.end_date,
            'finished': game.finished
        })
    return JsonResponse({'entries': games})


@require_POST
def game_create(request):
    """
    Creates a new Game and returns the new object
    :param request:  HttpRequest
    """
    try:
        data = request.POST
        game = Game(
            name=data.get('name'),
            platform=Platform.objects.get(name=data.get('platform')),
            start_date=data.get('startDate'),
            end_date=data.get('endDate'),
            finished=data.get('finished')
        )
        game.save()
        res_data = [{
            'id': game.pk,
            'name': game.name,
            'platform': str(game.platform),
            'startDate': game.start_date,
            'endDate': game.end_date,
            'finished': game.finished
        }]
        return JsonResponse({'entries': res_data})
    except ValidationError:
        return HttpResponse('The data submitted could not be validated.', status=400)


def platforms_list(request):
    """
    Returns a list of all entries
    :param request: HttpRequest
    """
    all_platforms = Platform.objects.all()
    platforms = []
    for platform in all_platforms:
        platforms.append({
            'id': platform.pk,
            'name': platform.name
        })
    return JsonResponse({'entries': platforms})


@require_POST
def platform_create(request):
    """
    Creates a new Platform and returns the new object
    :param request:  HttpRequest
    """
    req = load_json_request(request)
    if req:
        platform = Platform(name=req['name'])
        platform.save()
        res_data = [{
            'id': platform.pk,
            'name': platform.name
        }]
        return JsonResponse({'entries': res_data})
    else:
        return HttpResponse('The data submitted could not be validated.', status=400)
