/// <reference path="../typings/tsd.d.ts" />
module App.Tests {

  import IGame = App.Games.IGame;
  import IGameSubmission = App.Games.IGameSubmission;
  import IPlatform = App.Platforms.IPlatform;

  describe('GamesCtrl', function() {

    const MODULE = 'games';

    const invalidPlatform: IPlatform = {id: -1, name: ''};

    const validPlatforms: IPlatform[] = [
      {id: 1, name: 'Xbox One'},
      {id: 2, name: 'PS3'}
    ];

    const emptyNewEntry: IGame = {
      name: '',
      platform: invalidPlatform,
      startDate: '',
      endDate: '',
      finished: false
    };

    const testNewEntry: IGame = {
      name: 'Name',
      platform: validPlatforms[0],
      startDate: '2015-01-01',
      endDate: '2016-01-01',
      finished: false
    };

    const testSubmissionData: IGameSubmission = {
      name: 'Name',
      platform: testNewEntry.platform.id,
      startDate: '2015-01-01',
      endDate: '2016-01-01',
      finished: false
    };

    const testResponse: IGame[] = [
      {
        id: 1,
        name: 'Lords of the Fallen',
        platform: validPlatforms[0],
        startDate: '2014-10-31',
        endDate: '2014-11-15',
        finished: true,
        created: '2016-01-27T15:55:16.285Z',
        modified: '2016-01-27T15:55:16.285Z'
      },
      {
        id: 2,
        name: 'Kingdom Hearts 1.5 HD',
        platform: validPlatforms[1],
        startDate: '2014-7-22',
        endDate: '2014-7-31',
        finished: true,
        created: '2016-01-27T15:55:16.285Z',
        modified: '2016-01-27T15:55:16.285Z'
      }
    ];

    const testError = 'Test error message';

    /*=============================================
     = set up methods
     =============================================*/
    let $httpBackend;
    let $location;
    let $stateParams;
    let windowMock;
    let ctrl;
    let scope;

    beforeEach(angular.mock.module('gameon'));
    beforeEach(inject(function($rootScope, $controller, _$httpBackend_,
                               _$location_, _$stateParams_) {
      $httpBackend = _$httpBackend_;
      $location = _$location_;
      $stateParams = _$stateParams_;
      scope = $rootScope.$new();

      // set up a mock window service to automatically confirm dialogs
      windowMock = {
        confirm: function(msg) {
          return true;
        }
      };
      ctrl = $controller('GamesCtrl', {
        $window: windowMock,
        $scope: scope
      });

      $httpBackend.when('GET', '/static/views/home.html').respond(200);
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    /*=============================================
     = 'create' view tests
     =============================================*/
    it('initCreateView() should initialize the new object ' +
      'and pre-populate the existing entries list', function() {
      $httpBackend.expectGET(`/api/${MODULE}`)
        .respond({entries: testResponse});
      ctrl.newEntry = testNewEntry;
      ctrl.initCreateView();
      // ctrl should be working
      expect(ctrl.working).toBeTruthy();
      $httpBackend.flush();

      // ctrl.newEntry should be empty now
      expect(ctrl.newEntry).toEqual(emptyNewEntry);
      // ctrl.working should be false
      expect(ctrl.working).toBeFalsy();
    });

    it('create() should successfully save a new platform object, ' +
      'and redirect to the new detail view', function() {
      let origLength: number = ctrl.entries.length;
      let id = 654;
      let testPostResponse = {
        entries: [{
          id: id,
          name: testNewEntry.name,
          platform: testNewEntry.platform,
          startDate: testNewEntry.startDate,
          endDate: testNewEntry.endDate,
          finished: testNewEntry.finished,
          created: '2016-01-28T15:55:16.285Z',
          modified: '2016-01-28T15:55:16.285Z'
        }]
      };

      $httpBackend.expectPOST(`/api/${MODULE}/create`, testSubmissionData)
        .respond(201, testPostResponse);
      $httpBackend.when('GET', `/static/views/${MODULE}/detail.html`).respond(200);

      ctrl.newEntry = testNewEntry;
      ctrl.create();
      // ctrl should be working
      expect(ctrl.working).toBeTruthy();
      $httpBackend.flush();

      // we should be back on the detail page for the new entry
      expect($location.url()).toBe(`/${MODULE}/${id}`);
      // ctrl.working should be false
      expect(ctrl.working).toBeFalsy();
      // ctrl.entries.length should be one
      expect(ctrl.entries.length).toBe(origLength + 1);
    });

    /*=============================================
     = 'create' view error tests
     =============================================*/
    it('create() should log an error if a similar object exists, ' +
      'and should not attempt to save the entry', function() {
      ctrl.entries.push(testNewEntry);
      ctrl.newEntry = testNewEntry;
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
      ctrl.newEntry = angular.copy(testNewEntry);
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

      $httpBackend.expectPOST(`/api/${MODULE}/create`, testSubmissionData)
        .respond(function() {
          return [400, '', {}, testError];
        });
      ctrl.newEntry = testNewEntry;
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

    /*=============================================
     = 'query all' view tests
     =============================================*/
    it('findOne() should query and load the specified entry', function() {
      let res = {entries: [testResponse[0]]};
      let id = 123;

      $httpBackend.expectGET(`/api/${MODULE}/${id}`).respond(res);

      $stateParams.id = id;
      ctrl.findOne();
      expect(ctrl.working).toBeTruthy();
      $httpBackend.flush();

      expect(ctrl.error.length).toBe(0);
      expect(ctrl.activeEntry).toEqual(res.entries[0]);
      expect(ctrl.working).toBeFalsy();
    });

    it('findOne() should display an error if the desired entry could not be found, ' +
      'and redirect back to the list page', function() {

      $httpBackend.expectGET(/\/api\/games\/\d+/)
        .respond(function() {
          return [404, '', {}, testError];
        });
      $httpBackend.expectGET(`/static/views/${MODULE}/list.html`).respond(200);

      $stateParams.id = 123;
      ctrl.findOne();
      expect(ctrl.working).toBeTruthy();
      $httpBackend.flush();

      expect($location.url()).toBe(`/${MODULE}`);
      expect(ctrl.working).toBeFalsy();
    });

    /*=============================================
     = 'edit' view tests
     =============================================*/
    it('update() should partially update the existing entry ' +
      'and redirect back to the details page', function() {
      let entry = testResponse[1];
      let id = entry.id;
      let updatedName = entry.name + '_updated';
      // in this test, we will only update name
      let testPostResponse = {
        entries: [{
          id: entry.id,
          name: updatedName,
          platform: entry.platform,
          startDate: entry.startDate,
          endDate: entry.endDate,
          finished: entry.finished
        }]
      };

      $httpBackend.expectPOST(`/api/${MODULE}/update`).respond(testPostResponse);
      $httpBackend.when('GET', `/static/views/${MODULE}/detail.html`).respond(200);

      ctrl.activeEntry = angular.copy(entry);
      ctrl.newEntry = angular.copy(ctrl.activeEntry);
      ctrl.update();
      expect(ctrl.activeEntry.name).not.toEqual(updatedName);
      expect(ctrl.working).toBeTruthy();
      $httpBackend.flush();

      // we should be back on the detail page for the updated entry
      expect($location.url()).toBe(`/${MODULE}/${id}`);
      expect(ctrl.working).toBeFalsy();
      expect(ctrl.activeEntry.name).toEqual(updatedName);
      expect(ctrl.activeEntry.platform).toEqual(entry.platform);
      expect(ctrl.activeEntry.startDate).toEqual(entry.startDate);
      expect(ctrl.activeEntry.endDate).toEqual(entry.endDate);
    });

    it('update() should completely update the existing entry ' +
      'and redirect back to the details page', function() {
      let entry = testResponse[1];
      let id = entry.id;
      // in this test, we will update everything
      let testPostResponse = {
        entries: [{
          id: entry.id,
          name: entry.name + '_updated',
          platform: entry.platform + '_updated',
          startDate: entry.startDate + '_updated',
          endDate: entry.endDate + '_updated',
          finished: entry.finished + '_updated'
        }]
      };
      let res = testPostResponse.entries[0];

      $httpBackend.expectPOST(`/api/${MODULE}/update`).respond(testPostResponse);
      $httpBackend.when('GET', `/static/views/${MODULE}/detail.html`).respond(200);

      ctrl.activeEntry = angular.copy(entry);
      ctrl.newEntry = angular.copy(ctrl.activeEntry);
      ctrl.update();
      expect(ctrl.activeEntry.name).not.toEqual(res.name);
      expect(ctrl.working).toBeTruthy();
      $httpBackend.flush();

      // we should be back on the detail page for the updated entry
      expect($location.url()).toBe(`/${MODULE}/${id}`);
      expect(ctrl.working).toBeFalsy();
      expect(ctrl.activeEntry.name).toEqual(res.name);
      expect(ctrl.activeEntry.platform).toEqual(res.platform);
      expect(ctrl.activeEntry.startDate).toEqual(res.startDate);
      expect(ctrl.activeEntry.endDate).toEqual(res.endDate);
      expect(ctrl.activeEntry.finished).toEqual(res.finished);
    });

    /*=============================================
     = 'remove' view tests
     =============================================*/
    it('remove() should successfully delete the currently active entry, ' +
      'and redirect back to the list view', function() {
      // set up controller's current list, so we can make sure the proper one gets removed
      ctrl.entries = testResponse;
      let id = ctrl.entries[0].id;
      let origLength = ctrl.entries.length;

      $httpBackend.expectPOST(`/api/${MODULE}/delete`).respond(204);
      $httpBackend.when('GET', `/static/views/${MODULE}/list.html`).respond(200);

      $stateParams.id = id;
      ctrl.remove();
      expect(ctrl.working).toBeTruthy();
      $httpBackend.flush();

      expect($location.url()).toBe(`/${MODULE}`);
      expect(ctrl.entries.length).toBe(origLength - 1);
      expect(ctrl.error.length).toBe(0);
      expect(ctrl.working).toBeFalsy();
    });

    it('onDateChanged() should set endDate equal to startDate if endDate is before startDate', function() {

      ctrl.newEntry.startDate = '2015-04-11';
      ctrl.newEntry.endDate = '2015-04-01';
      ctrl.onDateChanged();
      $httpBackend.flush();

      expect(ctrl.newEntry.endDate).toEqual(ctrl.newEntry.startDate);
    });

    it('onDateChanged() should set endDate equal to startDate if endDate is blank', function() {
      let date1 = '2016-01-15';

      ctrl.newEntry.startDate = date1;
      ctrl.onDateChanged();
      $httpBackend.flush();

      expect(ctrl.newEntry.endDate).toEqual(date1);
    });

    it('onDateChanged() should set startDate equal to endDate if startDate is blank', function() {
      let date1 = '2016-02-15';

      ctrl.newEntry.endDate = date1;
      ctrl.onDateChanged();
      $httpBackend.flush();

      expect(ctrl.newEntry.startDate).toEqual(date1);
    });
  });
}
