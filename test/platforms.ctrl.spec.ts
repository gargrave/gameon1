/// <reference path="../typings/tsd.d.ts" />
module App.Tests {

  import IPlatform = App.Platforms.IPlatform;

  describe('PlatformsCtrl', function() {

    const MODULE = 'platforms';

    const emptyEntry: IPlatform = {
      name: ''
    };

    const testPost: IPlatform = {
      name: 'Win (PC)'
    };

    const testResponse: IPlatform[] = [
      {
        id: 1,
        name: 'Xbox One',
        created: '2016-01-28T15:55:16.285Z',
        modified: '2016-01-28T15:55:16.285Z'
      },
      {
        id: 2,
        name: 'PS3',
        created: '2016-01-27T15:55:16.285Z',
        modified: '2016-01-27T15:55:16.285Z'
      }
    ];

    const testError = 'Test error message';

    /*=============================================
     = set up methods
     =============================================*/
    let ctrl;
    let $httpBackend;
    let $location;
    let $stateParams;

    beforeEach(angular.mock.module('gameon'));
    beforeEach(inject(function($controller, _$httpBackend_,
                               _$location_, _$stateParams_) {
      ctrl = $controller('PlatformsCtrl');
      $httpBackend = _$httpBackend_;
      $location = _$location_;
      $stateParams = _$stateParams_;

      $httpBackend.when('GET', '/static/views/home.html').respond(200);
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    /*=============================================
     = 'creation' test
     =============================================*/
    it('initCreateView() should initialize the new object ' +
      'and pre-populate the existing entries list', function() {
      $httpBackend.expectGET(`/api/${MODULE}`).respond({entries: testResponse});

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

    it('create() should successfully save a new platform object, ' +
      'and redirect to the new detail view', function() {
      let origLength = ctrl.entries.length;
      let id = 654;
      let testPostResponse = {
        entries: [{
          id: id,
          name: testPost.name,
          created: '2016-01-28T15:55:16.285Z',
          modified: '2016-01-28T15:55:16.285Z'
        }]
      };

      $httpBackend.expectPOST(`/api/${MODULE}/create`, testPost)
        .respond(201, testPostResponse);
      $httpBackend.when('GET', `/static/views/${MODULE}/detail.html`).respond(200);

      ctrl.newEntry = testPost;
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
     = 'creation error' test
     =============================================*/
    it('create() should log an error if a similar object exists', function() {
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

    it('create() should handle error responses properly', function() {
      let origLength = ctrl.entries.length;

      $httpBackend.expectPOST(`/api/${MODULE}/create`, testPost)
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

    /*=============================================
     = 'query all' test
     =============================================*/
    it('find() should load the list of entries', function() {
      $httpBackend.expectGET(`/api/${MODULE}`).respond({entries: testResponse});

      ctrl.find();
      expect(ctrl.working).toBeTruthy();
      $httpBackend.flush();

      expect(ctrl.error.length).toBe(0);
      expect(ctrl.entries.length).toBeGreaterThan(0);
      expect(ctrl.entries).toEqual(testResponse);
      expect(ctrl.working).toBeFalsy();
    });

    /*=============================================
     = 'query one' test
     =============================================*/
    it('findOne() should query and load the specified entry', function() {
      let res = {entries: testResponse[0]};
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

      $httpBackend.expectGET(/\/api\/platforms\/\d+/)
        .respond(function() {
          return [404, '', {}, testError];
        });
      $httpBackend.when('GET', `/static/views/${MODULE}/list.html`).respond(200);

      $stateParams.id = 123;
      ctrl.findOne();
      expect(ctrl.working).toBeTruthy();
      $httpBackend.flush();

      expect($location.url()).toBe(`/${MODULE}`);
      expect(ctrl.working).toBeFalsy();
    });

    /*=============================================
     = 'remove' tests
     =============================================*/
    // TODO *** start here ***
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
  });
}
