/// <reference path="../typings/tsd.d.ts" />
module App.Platforms {
  describe('PlatformsCtrl', function() {

    let emptyPlatformData = {name: ''};

    let samplePlatformData = [
      {name: 'Xbox One'},
      {name: 'PS3'}
    ];

    let ctrl;
    let $httpBackend;
    let $location;

    /*=============================================
     = set up methods
     =============================================*/

    beforeEach(angular.mock.module('gameon'));
    beforeEach(inject(function($controller, _$httpBackend_,
                               _$location_) {
      ctrl = $controller('PlatformsCtrl');
      $httpBackend = _$httpBackend_;
      $location = _$location_;
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    /*=============================================
     = query all test
     =============================================*/

    it('find() should load the list of platforms', function() {
      $httpBackend.when('GET', '/static/views/home.html').respond(200);
      $httpBackend.expectGET('/api/platforms')
        .respond({platforms: samplePlatformData});
      ctrl.find();
      expect(ctrl.working).toBeTruthy();
      $httpBackend.flush();

      expect(ctrl.platforms.length).toBeGreaterThan(0);
      expect(ctrl.platforms).toEqual(samplePlatformData);
      expect(ctrl.working).toBeFalsy();
    });

    /*=============================================
     = creation test
     =============================================*/

    it('initCreateView() should initialize the new object ' +
      'and pre-populate the existing platforms list', function() {
      $httpBackend.when('GET', '/static/views/home.html').respond(200);
      $httpBackend.expectGET('/api/platforms')
        .respond({platforms: samplePlatformData});
      ctrl.newPlatform.name = 'Not an empty name';
      ctrl.initCreateView();
      // ctrl should be working
      expect(ctrl.working).toBeTruthy();
      $httpBackend.flush();

      // ctrl.newPlatform should be empty now
      expect(ctrl.newPlatform).toEqual(emptyPlatformData);
      // ctrl.working should be false
      expect(ctrl.working).toBeFalsy();
    });

    it('create() should successfully save a new platform object', function() {
      let origLength = ctrl.platforms.length;
      let testPostData = JSON.stringify({
        name: 'Test Platform'
      });
      let testPostResponse = JSON.stringify({
        platform: [{
          id: 10,
          name: 'Test Platform'
        }]
      });

      $httpBackend.when('GET', '/static/views/home.html').respond(200);
      $httpBackend.expectPOST('/api/platforms/add', testPostData)
        .respond(201, testPostResponse);
      $httpBackend.expectGET('/static/views/platforms/list.html').respond(200);
      ctrl.newPlatform = testPostData;
      ctrl.create();
      // ctrl should be working
      expect(ctrl.working).toBeTruthy();
      $httpBackend.flush();

      // we should be back on the list page
      expect($location.url()).toBe('/platforms');
      // ctrl.newPlatform should be empty now
      expect(ctrl.newPlatform).toEqual(emptyPlatformData);
      // ctrl.working should be false
      expect(ctrl.working).toBeFalsy();
      // ctrl.platforms.length should be one
      expect(ctrl.platforms.length).toBe(origLength + 1);
    });

    /*=============================================
     = creation error test
     =============================================*/

    it('create() should handle error responses properly', function() {
      let origLength = ctrl.platforms.length;
      let testPostData = JSON.stringify({
        name: 'Test Platform'
      });
      let testError = {
        statusText: 'Test error message'
      };

      $httpBackend.when('GET', '/static/views/home.html').respond(200);
      $httpBackend.expectPOST('/api/platforms/add', testPostData)
        .respond(function() {
          return [400, '', {}, 'Test error message'];
        });
      ctrl.newPlatform = testPostData;
      ctrl.create();
      // should have no errors and not be working yet
      expect(ctrl.working).toBeTruthy();
      expect(ctrl.error).toBe('');
      $httpBackend.flush();

      // ctrl.working should be false
      expect(ctrl.working).toBeFalsy();
      // ctrl.platforms.length should be the same as before
      expect(ctrl.platforms.length).toBe(origLength);
      // the error message should not be empty
      expect(ctrl.error).toBe(testError.statusText);
    });
  });
}
