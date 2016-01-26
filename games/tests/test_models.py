from django.test import TestCase
from django.utils import timezone

from games.models import Platform, Game


class PlatformModelTest(TestCase):
    @classmethod
    def setUpTestData(self):
        self.xbox = 'Xbox One'
        self.pc = 'PC (Windows)'

        Platform.objects.create(name=self.xbox)
        Platform.objects.create(name=self.pc)

        Game.objects.create(
            name='Xbox Game 1',
            platform=Platform.objects.get(name=self.xbox),
            start_date=timezone.now(),
            end_date=timezone.now()
        )
        Game.objects.create(
            name='Xbox Game 2',
            platform=Platform.objects.get(name=self.xbox),
            start_date=timezone.now(),
            end_date=timezone.now()
        )
        Game.objects.create(
            name='PX Game 1',
            platform=Platform.objects.get(name=self.pc),
            start_date=timezone.now(),
            end_date=timezone.now()
        )

    def test_platform_tostring(self):
        """
        Platform __str__ returns the correct value
        """
        xbox = Platform.objects.get(name=self.xbox)
        pc = Platform.objects.get(name=self.pc)

        self.assertEqual(str(xbox), self.xbox)
        self.assertEqual(str(pc), self.pc)

    def test_games_on_platform(self):
        """
        Related set is properly populated
        """
        xbox_games = Platform.objects.get(name=self.xbox).game_set.all()
        self.assertEquals(len(xbox_games), 2)

