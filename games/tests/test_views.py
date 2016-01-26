import json

from django.core.urlresolvers import reverse
from django.http import JsonResponse
from django.test import TestCase, RequestFactory

from games.views import games_list, platforms_list


class GamesViewsTest(TestCase):
    @classmethod
    def setUpTestData(self):
        self.reqfactory = RequestFactory()

    def test_games_list_view(self):
        """
        The 'games_list' view should return a JsonResponse with
        an array of game data names 'games'.
        """
        res = self.client.get(reverse('api:games_list'))
        self.assertEqual(res.status_code, 200)
        self.assertEqual(type(res), JsonResponse)
        json_data = json.loads(str(res.content, encoding='utf8'))
        self.assertIn('games', json_data)

    def test_platforms_list_view(self):
        """
        The 'platforms_list' view should return a JsonResponse with
        an array of platform data names 'platforms'.
        """
        res = self.client.get(reverse('api:platforms_list'))
        self.assertEqual(res.status_code, 200)
        self.assertEqual(type(res), JsonResponse)
        json_data = json.loads(str(res.content, encoding='utf8'))
        self.assertIn('platforms', json_data)
