import json

from django.core.urlresolvers import reverse
from django.http import JsonResponse
from django.test import TestCase, RequestFactory

from games.views import games_list, platforms_list

from games.models import Game, Platform


class GamesViewsTest(TestCase):
    @classmethod
    def setUpTestData(self):
        self.reqfactory = RequestFactory()

        # dummy platform for testing POST
        self.test_plat = Platform(name='Test Platform')
        self.test_plat.save()

        # dummy game for testing POST
        self.test_game = Game(
            name='Test Game',
            platform=self.test_plat,
            start_date='2015-03-21',
            end_date='2015-04-02')
        self.test_game.save()

    #############################################################
    # Games API Tests
    #############################################################

    def test_games_list_view(self):
        """
        The 'games_list' view should return a JsonResponse with
        an array of game data names 'games'.
        """
        res = self.client.get(reverse('api:games_list'))
        self.assertEqual(res.status_code, 200)
        self.assertEqual(type(res), JsonResponse)
        json_data = json.loads(str(res.content, encoding='utf8'))
        self.assertIn('entries', json_data)

    def test_game_detail_view(self):
        """
        The platform_detail should return a JsonResponse with an 'entries'
        object that contains only a single element, which is the specified object.
        """
        res = self.client.get(reverse('api:game_detail',
                                      kwargs={'id': self.test_game.pk}))
        self.assertEqual(res.status_code, 200)
        self.assertEqual(type(res), JsonResponse)
        json_data = json.loads(str(res.content, encoding='utf8'))
        self.assertIn('entries', json_data)

    def test_game_detail_view_with_bad_data(self):
        # should get a 404 if submitting a missing ID
        res = self.client.get(reverse('api:game_detail',
                                      kwargs={'id': 987654321}))
        self.assertEqual(res.status_code, 404)

    def test_game_create_view(self):
        """
        Test that the games-create view creates a new game object and
        then returns the newly-created instance.
        """
        url = reverse('api:game_create')
        # should accept good submission,
        # and return that submission in JSON
        good_post = {
            'name': 'Good POST data',
            'platform': self.test_plat.pk,
            'startDate': '2015-01-01',
            'endDate': '2015-02-01',
            'finished': False
        }
        res = self.client.post(url, json.dumps(good_post),
                               content_type='application/json')
        self.assertEqual(res.status_code, 200)
        self.assertEqual(type(res), JsonResponse)
        # ensure that the response has all of the expected data
        res_data = json.loads(str(res.content, encoding='utf8'))['entries'][0]
        for v in good_post:
            self.assertIn(v, res_data)
        # fetch thte new game to make sure no error is thrown
        Game.objects.get(name=good_post['name'])

    def test_game_create_view_with_bad_data(self):
        """
        Send bad data to the game-create view, and make sure it is rejected
        :return:
        """
        url = reverse('api:game_create')
        # GET requests should be rejected
        res = self.client.get(url)
        self.assertEqual(res.status_code, 405)
        # should reject malformed data
        bad_post = {
            'name': '',
            'platform': self.test_plat.pk,
            'startDate': '',
            'endDate': '',
            'finished': False
        }
        res = self.client.post(url, bad_post)
        self.assertEqual(res.status_code, 400)
        self.assertEqual(str(res.content, encoding='utf8'),
                         'The data submitted could not be validated.')

    #############################################################
    # Platforms API Tests
    #############################################################

    def test_platforms_list_view(self):
        """
        The 'platforms_list' view should return a JsonResponse with
        an array of platform data names 'entries'.
        """
        res = self.client.get(reverse('api:platforms_list'))
        self.assertEqual(res.status_code, 200)
        self.assertEqual(type(res), JsonResponse)
        json_data = json.loads(str(res.content, encoding='utf8'))
        self.assertIn('entries', json_data)

    def test_platform_detail_view(self):
        """
        The platform_detail should return a JsonResponse with an 'entries'
        object that contains only a single element, which is the specified object.
        """
        res = self.client.get(reverse('api:platform_detail',
                                      kwargs={'id': self.test_plat.pk}))
        self.assertEqual(res.status_code, 200)
        self.assertEqual(type(res), JsonResponse)
        json_data = json.loads(str(res.content, encoding='utf8'))
        self.assertIn('entries', json_data)

    def test_platform_detail_view_with_bad_data(self):
        # should get a 404 if submitting a missing ID
        res = self.client.get(reverse('api:platform_detail',
                                      kwargs={'id': 987654321}))
        self.assertEqual(res.status_code, 404)

    def test_platform_create_view(self):
        url = reverse('api:platform_create')
        # should accept good submission,
        # and return that submission in JSON
        good_post = {
            'name': 'Good POST data'
        }
        res = self.client.post(url, json.dumps(good_post),
                               content_type='application/json')
        self.assertEqual(res.status_code, 200)
        self.assertEqual(type(res), JsonResponse)
        # ensure that the response has all of the expected data
        res_data = json.loads(str(res.content, encoding='utf8'))['entries'][0]
        for v in good_post:
            self.assertIn(v, res_data)
        # fetch thte new platform to make sure no error is thrown
        Platform.objects.get(name=good_post['name'])

    def test_platform_create_view_with_bad_data(self):
        url = reverse('api:platform_create')
        res = self.client.get(url)
        self.assertEqual(res.status_code, 405)
        # should reject malformed data
        bad_post = {'bad post': ''}
        res = self.client.post(url, bad_post)
        self.assertEqual(res.status_code, 400)
        self.assertEqual(str(res.content, encoding='utf8'),
                         'The data submitted could not be validated.')
