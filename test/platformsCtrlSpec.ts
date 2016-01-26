/// <reference path="../typings/tsd.d.ts" />
module App.Platforms {
  describe('PlatformsCtrl', function() {

    let samplePlatformData = [
      {name: 'Xbox One'},
      {name: 'PS3'}
    ];

    let ctrl;
    let scope;
    let $httpBackend;

    beforeEach(module('gameon'));
    beforeEach(inject(function($controller, $rootScope, _$httpBackend_) {
      ctrl = $controller('PlatformsCtrl');
      scope = $rootScope.$new();
      $httpBackend = _$httpBackend_;
    }));

    it('should load the list of platforms', function() {
      $httpBackend.expectGET('/api/platforms').respond({platforms: samplePlatformData});
      ctrl.find();
      expect(ctrl.working).toBeTruthy();
      $httpBackend.flush();

      expect(ctrl.platforms.length).toBeGreaterThan(0);
      expect(ctrl.platforms).toEqual(samplePlatformData);
      expect(ctrl.working).toBeFalsy();
    });
  });
}
