/// <reference path="../typings/tsd.d.ts" />
module App.Tests {
  describe('GamesCtrl', function() {

    let sampleGameData = [
      {
        name: 'Lords of the Fallen',
        platform: 'Xbox One',
        start_date: '2014-10-31',
        end_date: '2014-11-15',
        finished: true
      },
      {
        name: 'Kingdom Hearts 1.5 HD',
        platform: 'PS3',
        start_date: '2014-7-22',
        end_date: '2014-2-31',
        finished: true
      }
    ];

    let ctrl;
    let scope;
    let $httpBackend;

    beforeEach(angular.mock.module('gameon'));
    beforeEach(inject(function($controller, $rootScope, _$httpBackend_) {
      ctrl = $controller('GamesCtrl');
      scope = $rootScope.$new();
      $httpBackend = _$httpBackend_;
    }));

    it('should load the list of games', function() {
      $httpBackend.expectGET('/api/games').respond({entries: sampleGameData});
      ctrl.find();
      expect(ctrl.working).toBeTruthy();
      $httpBackend.flush();

      expect(ctrl.games.length).toBeGreaterThan(0);
      expect(ctrl.games).toEqual(sampleGameData);
      expect(ctrl.working).toBeFalsy();
    });
  });
}
