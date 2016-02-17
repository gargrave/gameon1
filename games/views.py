from django.core.exceptions import ValidationError
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
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
            'finished': game.finished,
            'created': game.created,
            'modified': game.modified
        })
    return JsonResponse({'entries': games})


def game_detail(request, pk):
    """
    Returns a single game matching the specified ID.
    :param request: HttpRequest
    :param pk: The id of the game to find
    """
    game = get_object_or_404(Game, pk=pk)
    games = [{
        'id': game.pk,
        'name': game.name,
        'platform': {
            'id': game.platform.pk,
            'name': game.platform.name,
            'created': game.platform.created,
            'modified': game.platform.modified,
        },
        'startDate': game.start_date,
        'endDate': game.end_date,
        'finished': game.finished,
        'created': game.created,
        'modified': game.modified
    }]
    return JsonResponse({'entries': games})


@require_POST
def game_create(request):
    """
    Creates a new Game and returns the new object
    :param request:  HttpRequest
    """
    try:
        req = load_json_request(request)
        if req:
            game = Game(
                name=req['name'],
                platform=Platform.objects.get(pk=req['platform']),
                start_date=req['startDate'],
                end_date=req['endDate'],
                finished=req['finished']
            )
            game.save()
            res_data = [{
                'id': game.pk,
                'name': game.name,
                'platform': {
                    'id': game.platform.pk,
                    'name': game.platform.name,
                    'created': game.platform.created,
                    'modified': game.platform.modified,
                },
                'startDate': game.start_date,
                'endDate': game.end_date,
                'finished': game.finished,
                'created': game.created,
                'modified': game.modified
            }]
            return JsonResponse({'entries': res_data})
        else:
            return HttpResponse('The data submitted could not be validated.', status=400)
    except ValidationError:
        return HttpResponse('The data submitted could not be validated.', status=400)


@require_POST
def game_update(request):
    req = load_json_request(request)
    game = get_object_or_404(Game, pk=req['id'])
    game.name = req['name']
    game.platform = Platform.objects.get(pk=req['platform'])
    game.start_date = req['startDate']
    game.end_date = req['endDate']
    game.finished = req['finished']
    game.save()
    res_data = [{
        'id': game.pk,
        'name': game.name,
        'platform': str(game.platform),
        'startDate': game.start_date,
        'endDate': game.end_date,
        'finished': game.finished,
        'created': game.created,
        'modified': game.modified
    }]
    return JsonResponse({'entries': res_data})


@require_POST
def game_delete(request):
    """
    Deletes the Game with the specified id, and returns a 204 response.
    Returns 404 if no matching platform is found.
    :param request: HttpRequest
    """
    req = load_json_request(request)
    if req:
        game = get_object_or_404(Game, pk=req['id'])
        game.delete()
        return HttpResponse(status=204)
    else:
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
            'name': platform.name,
            'color': platform.display_color,
            'created': platform.created,
            'modified': platform.modified,
            'gameCount': platform.game_set.count()
        })
    return JsonResponse({'entries': platforms})


def platform_detail(request, pk):
    """
    Returns a single platform matching the specified ID.
    :param request: HttpRequest
    :param pk: The id of the platform to find
    """
    platform = get_object_or_404(Platform, pk=pk)
    platforms = [{
        'id': platform.pk,
        'name': platform.name,
        'color': platform.display_color,
        'created': platform.created,
        'modified': platform.modified,
        'gameCount': platform.game_set.count()
    }]
    return JsonResponse({'entries': platforms})


@require_POST
def platform_create(request):
    """
    Creates a new Platform and returns the new object
    :param request: HttpRequest
    """
    req = load_json_request(request)
    if req:
        platform = Platform(
            name=req['name'],
            display_color=req['color']
        )
        platform.save()
        res_data = [{
            'id': platform.pk,
            'name': platform.name,
            'color': platform.display_color,
            'created': platform.created,
            'modified': platform.modified
        }]
        return JsonResponse({'entries': res_data})
    else:
        return HttpResponse('The data submitted could not be validated.', status=400)


@require_POST
def platform_delete(request):
    """
    Deletes the Platform with the specified id, and returns a 204 response.
    Returns 404 if no matching platform is found.
    :param request: HttpRequest
    """
    req = load_json_request(request)
    if req:
        platform = get_object_or_404(Platform, pk=req['id'])
        platform.delete()
        return HttpResponse(status=204)
    else:
        return HttpResponse('The data submitted could not be validated.', status=400)


@require_POST
def platform_update(request):
    req = load_json_request(request)
    platform = get_object_or_404(Platform, pk=req['id'])
    platform.name = req['name']
    platform.display_color = req['color']
    platform.save()
    res_data = [{
        'id': platform.pk,
        'name': platform.name,
        'color': platform.display_color,
        'created': platform.created,
        'modified': platform.modified
    }]
    return JsonResponse({'entries': res_data})
