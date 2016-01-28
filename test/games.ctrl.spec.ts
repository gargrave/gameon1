/// <reference path="../typings/tsd.d.ts" />
module App.Tests {

  import IGame = App.Games.IGame;
  import IPlatform = App.Platforms.IPlatform;

  describe('GamesCtrl', function() {

    const invalidPlatform: IPlatform = {id: -1, name: 'Okay Name'};

    const validPlatforms: IPlatform[] = [
      {id: 1, name: 'Xbox One'},
      {id: 2, name: 'PS3'}
    ];

    const emptyEntry: IGame = {
      name: '',
      platform: invalidPlatform.id,
      startDate: '',
      endDate: '',
      finished: false
    };

    const testPost: IGame = {
      name: 'Name',
      platform: validPlatforms[0].id,
      startDate: '2015-01-01',
      endDate: '2016-01-01',
      finished: false
    };

    const testResponse: IGame[] = [
      {
        name: 'Lords of the Fallen',
        platform: validPlatforms[0].id,
        startDate: '2014-10-31',
        endDate: '2014-11-15',
        finished: true
      },
      {
        name: 'Kingdom Hearts 1.5 HD',
        platform: validPlatforms[1].id,
        startDate: '2014-7-22',
        endDate: '2014-7-31',
        finished: true
      }
    ];

    /*=============================================
     = set up methods
     =============================================*/
    let ctrl;
    let $httpBackend;
    let $location;

    beforeEach(angular.mock.module('gameon'));
    beforeEach(inject(function($controller, _$httpBackend_,
                               _$location_) {
      ctrl = $controller('GamesCtrl');
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
    it('find() should load the list of entries', function() {
      $httpBackend.when('GET', '/static/views/home.html').respond(200);
      $httpBackend.expectGET('/api/games')
        .respond({entries: testResponse});
      ctrl.find();
      expect(ctrl.working).toBeTruthy();
      $httpBackend.flush();

      expect(ctrl.entries.length).toBeGreaterThan(0);
      expect(ctrl.entries).toEqual(testResponse);
      expect(ctrl.working).toBeFalsy();
    });

    /*=============================================
     = creation test
     =============================================*/
    it('initCreateView() should initialize the new object ' +
      'and pre-populate the existing entries list', function() {
      $httpBackend.when('GET', '/static/views/home.html').respond(200);
      $httpBackend.expectGET('/api/games')
        .respond({entries: testResponse});
      ctrl.newEntry = testPost;
      ctrl.initCreateView();
      // ctrl should be working
      expect(ctrl.working).toBeTruthy();
      $httpBackend.flush();

      // ctrl.newEntry should be empty now
      expect(ctrl.newEntry).toEqual(emptyEntry);
      // ctrl.working should be false
      expect(ctrl.working).toBeFalsy();
    });

    it('create() should successfully save a new game object and redirect', function() {
      let origLength: number = ctrl.entries.length;
      let testPostResponse = {
        entries: [{
          id: 10,
          name: testPost.name,
          platform: testPost.platform,
          startDate: testPost.startDate,
          endDate: testPost.endDate,
          finished: testPost.finished
        }]
      };

      $httpBackend.when('GET', '/static/views/home.html').respond(200);
      $httpBackend.expectPOST('/api/games/create', testPost)
        .respond(201, testPostResponse);
      $httpBackend.expectGET('/static/views/games/list.html').respond(200);
      ctrl.newEntry = testPost;
      ctrl.create();
      // ctrl should be working
      expect(ctrl.working).toBeTruthy();
      $httpBackend.flush();

      // we should be back on the list page
      expect($location.url()).toBe('/games');
      // ctrl.newEntry should be empty now
      expect(ctrl.newEntry).toEqual(emptyEntry);
      // ctrl.working should be false
      expect(ctrl.working).toBeFalsy();
      // ctrl.entries.length should be one
      expect(ctrl.entries.length).toBe(origLength + 1);
    });

    /*=============================================
     = creation error test
     =============================================*/
    it('create() should log an error if a similar object exists, ' +
      'and should not attempt to save the entry', function() {
      $httpBackend.when('GET', '/static/views/home.html').respond(200);
      ctrl.entries.push(testPost);
      ctrl.newEntry = testPost;
      ctrl.create();
      $httpBackend.flush();

      // ctrl.working should be false
      expect(ctrl.working).toBeFalsy();
      // ctrl.entries.length should be unchanged
      expect(ctrl.entries.length).toBe(1);
      // should now have an error message
      expect(ctrl.error.length).toBeGreaterThan(0);
    });

    it('create() should log an error in the platform id is invalid, ' +
      'and should not attempt to save the entry', function() {
      $httpBackend.when('GET', '/static/views/home.html').respond(200);
      ctrl.newEntry = angular.copy(testPost);
      ctrl.newEntry.platform = invalidPlatform.id;
      ctrl.create();
      $httpBackend.flush();

      // ctrl.working should be false
      expect(ctrl.working).toBeFalsy();
      // ctrl.entries.length should be unchanged
      expect(ctrl.entries.length).toBe(0);
      // should now have an error message
      expect(ctrl.error.length).toBeGreaterThan(0);
    });

    it('create() should handle error responses properly', function() {
      let origLength = ctrl.entries.length;
      let testError = 'Test error message';

      $httpBackend.when('GET', '/static/views/home.html').respond(200);
      $httpBackend.expectPOST('/api/games/create', testPost)
        .respond(function() {
          return [400, '', {}, testError];
        });
      ctrl.newEntry = testPost;
      ctrl.create();
      // should have no errors and not be working yet
      expect(ctrl.working).toBeTruthy();
      expect(ctrl.error).toBe('');
      $httpBackend.flush();

      // ctrl.working should be false
      expect(ctrl.working).toBeFalsy();
      // ctrl.entries.length should be the same as before
      expect(ctrl.entries.length).toBe(origLength);
      // the error message should not be empty
      expect(ctrl.error).toBe(testError);
    });
  });
}
