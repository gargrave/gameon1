import json

from django.core.urlresolvers import reverse
from django.http import JsonResponse
from django.test import TestCase, RequestFactory

from games.views import games_list, platforms_list

from games.models import Platform

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

    def test_platform_create_view(self):
        url = reverse('api:platform_create')
        # GET requests should be rejected
        res = self.client.get(url)
        self.assertEqual(res.status_code, 405)
        # should reject malformed data
        bad_post = {'bad post': ''}
        res = self.client.post(url, bad_post)
        self.assertEqual(res.status_code, 400)
        # should accept good submission,
        # and return that submission in JSON
        good_post = {'name': 'Good POST data'}
        res = self.client.post(url, good_post)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(type(res), JsonResponse)
        # fetch thte new platform to make sure no error is thrown
        Platform.objects.get(name=good_post['name'])
