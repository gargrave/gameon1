from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_POST

from .forms import PlatformForm
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
    return JsonResponse({'entries': platforms})


@require_POST
def platform_create(request):
    """
    Creates a new Platform and returns the new object
    :param request:  HttpRequest
    """
    form = PlatformForm(data=request.POST)
    if not form.is_valid():
        return HttpResponse(status=400)
    else:
        platform = Platform(name=request.POST.get('name'))
        platform.save()
        res_data = [{'name': platform.name}]
        return JsonResponse({'entries': res_data})
