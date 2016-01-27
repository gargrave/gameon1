/// <reference path="../typings/tsd.d.ts" />
module App.Tests {
  describe('GamesCtrl', function() {

    const moduleName = 'games';

    const emptyEntry = {
      name: '',
      platform: '',
      startDate: '',
      endDate: '',
      finished: false
    };

    const nonEmptyEntry = {
      name: 'Name',
      platform: 'Platform',
      startDate: '2016-01-01',
      endDate: '2016-01-31',
      finished: true
    };

    const testResponse = [
      {
        name: 'Lords of the Fallen',
        platform: 'Xbox One',
        startDate: '2014-10-31',
        endDate: '2014-11-15',
        finished: true
      },
      {
        name: 'Kingdom Hearts 1.5 HD',
        platform: 'PS3',
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
      $httpBackend.expectGET(`/api/${moduleName}`)
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
      $httpBackend.expectGET(`/api/${moduleName}`)
        .respond({entries: testResponse});
      ctrl.newEntry = nonEmptyEntry;
      ctrl.initCreateView();
      // ctrl should be working
      expect(ctrl.working).toBeTruthy();
      $httpBackend.flush();

      // ctrl.newEntry should be empty now
      expect(ctrl.newEntry).toEqual(emptyEntry);
      // ctrl.working should be false
      expect(ctrl.working).toBeFalsy();
    });

    it('create() should successfully save a new platform object', function() {
      let origLength = ctrl.entries.length;
      let testPostData = JSON.stringify({
        name: 'Test Platform'
      });
      let testPostResponse = JSON.stringify({
        entries: [{
          id: 10,
          name: 'Test Platform'
        }]
      });

      $httpBackend.when('GET', '/static/views/home.html').respond(200);
      $httpBackend.expectPOST(`/api/${moduleName}/create`, testPostData)
        .respond(201, testPostResponse);
      $httpBackend.expectGET(`/static/views/${moduleName}/list.html`).respond(200);
      ctrl.newEntry = testPostData;
      ctrl.create();
      // ctrl should be working
      expect(ctrl.working).toBeTruthy();
      $httpBackend.flush();

      // we should be back on the list page
      expect($location.url()).toBe(`/${moduleName}`);
      // ctrl.newEntry should be empty now
      expect(ctrl.newEntry).toEqual(emptyEntry);
      // ctrl.working should be false
      expect(ctrl.working).toBeFalsy();
      // ctrl.entries.length should be one
      expect(ctrl.entries.length).toBe(origLength + 1);
    });

     it('create() should log an error if a similar object exists', function() {
      let testPostData = JSON.stringify({
        name: 'Test Platform'
      });

      $httpBackend.when('GET', '/static/views/home.html').respond(200);
      ctrl.entries.push(testPostData);
      ctrl.newEntry = testPostData;
      ctrl.create();
      $httpBackend.flush();

      // ctrl.working should be false
      expect(ctrl.working).toBeFalsy();
      // ctrl.entries.length should be unchanged
      expect(ctrl.entries.length).toBe(1);
      // should now have an error message
      expect(ctrl.error.length).toBeGreaterThan(0);
    });

    /*=============================================
     = creation error test
     =============================================*/
    it('create() should handle error responses properly', function() {
      let origLength = ctrl.entries.length;
      let testPostData = JSON.stringify({
        name: 'Test Platform'
      });
      let testError = {
        statusText: 'Test error message'
      };

      $httpBackend.when('GET', '/static/views/home.html').respond(200);
      $httpBackend.expectPOST(`/api/${moduleName}/create`, testPostData)
        .respond(function() {
          return [400, '', {}, 'Test error message'];
        });
      ctrl.newEntry = testPostData;
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
      expect(ctrl.error).toBe(testError.statusText);
    });
  });
}
