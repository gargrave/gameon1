var App;
(function (App) {
    var Tests;
    (function (Tests) {
        describe('PlatformsCtrl', function () {
            var MODULE = 'platforms';
            var emptyEntry = {
                name: ''
            };
            var testPost = {
                name: 'Win (PC)'
            };
            var testResponse = [
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
            var testError = 'Test error message';
            var ctrl;
            var $httpBackend;
            var $location;
            var $stateParams;
            beforeEach(angular.mock.module('gameon'));
            beforeEach(inject(function ($controller, _$httpBackend_, _$location_, _$stateParams_) {
                ctrl = $controller('PlatformsCtrl');
                $httpBackend = _$httpBackend_;
                $location = _$location_;
                $stateParams = _$stateParams_;
                $httpBackend.when('GET', '/static/views/home.html').respond(200);
            }));
            afterEach(function () {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });
            it('initCreateView() should initialize the new object ' +
                'and pre-populate the existing entries list', function () {
                $httpBackend.expectGET("/api/" + MODULE).respond({ entries: testResponse });
                ctrl.newEntry = testPost;
                ctrl.initCreateView();
                expect(ctrl.working).toBeTruthy();
                $httpBackend.flush();
                expect(ctrl.newEntry).toEqual(emptyEntry);
                expect(ctrl.working).toBeFalsy();
            });
            it('create() should successfully save a new platform object and redirect', function () {
                var origLength = ctrl.entries.length;
                var testPostResponse = JSON.stringify({
                    entries: [{
                            id: 10,
                            name: testPost.name
                        }]
                });
                $httpBackend.expectPOST("/api/" + MODULE + "/create", testPost)
                    .respond(201, testPostResponse);
                $httpBackend.expectGET("/static/views/" + MODULE + "/list.html").respond(200);
                ctrl.newEntry = testPost;
                ctrl.create();
                expect(ctrl.working).toBeTruthy();
                $httpBackend.flush();
                expect($location.url()).toBe("/" + MODULE);
                expect(ctrl.newEntry).toEqual(emptyEntry);
                expect(ctrl.working).toBeFalsy();
                expect(ctrl.entries.length).toBe(origLength + 1);
            });
            it('create() should log an error if a similar object exists', function () {
                ctrl.entries.push(testPost);
                ctrl.newEntry = testPost;
                ctrl.create();
                $httpBackend.flush();
                expect(ctrl.working).toBeFalsy();
                expect(ctrl.entries.length).toBe(1);
                expect(ctrl.error.length).toBeGreaterThan(0);
            });
            it('create() should handle error responses properly', function () {
                var origLength = ctrl.entries.length;
                $httpBackend.expectPOST("/api/" + MODULE + "/create", testPost)
                    .respond(function () {
                    return [400, '', {}, testError];
                });
                ctrl.newEntry = testPost;
                ctrl.create();
                expect(ctrl.working).toBeTruthy();
                expect(ctrl.error).toBe('');
                $httpBackend.flush();
                expect(ctrl.working).toBeFalsy();
                expect(ctrl.entries.length).toBe(origLength);
                expect(ctrl.error).toBe(testError);
            });
            it('find() should load the list of entries', function () {
                $httpBackend.expectGET("/api/" + MODULE).respond({ entries: testResponse });
                ctrl.find();
                expect(ctrl.working).toBeTruthy();
                $httpBackend.flush();
                expect(ctrl.error.length).toBe(0);
                expect(ctrl.entries.length).toBeGreaterThan(0);
                expect(ctrl.entries).toEqual(testResponse);
                expect(ctrl.working).toBeFalsy();
            });
            it('findOne() should query and load the specified entry', function () {
                var res = { entries: testResponse[0] };
                var id = 123;
                $httpBackend.expectGET("/api/" + MODULE + "/" + id).respond(res);
                $stateParams.id = id;
                ctrl.findOne();
                expect(ctrl.working).toBeTruthy();
                $httpBackend.flush();
                expect(ctrl.error.length).toBe(0);
                expect(ctrl.activeEntry).toEqual(res.entries[0]);
                expect(ctrl.working).toBeFalsy();
            });
            it('findOne() should display an error if the desired entry could not be found, ' +
                'and redirect back to the list page', function () {
                $httpBackend.expectGET(/\/api\/platforms\/\d+/)
                    .respond(function () {
                    return [404, '', {}, testError];
                });
                $httpBackend.expectGET("/static/views/" + MODULE + "/list.html").respond(200);
                $stateParams.id = 123;
                ctrl.findOne();
                expect(ctrl.working).toBeTruthy();
                $httpBackend.flush();
                expect($location.url()).toBe("/" + MODULE);
                expect(ctrl.working).toBeFalsy();
            });
            it('remove() should successfully delete the currently active entry, ' +
                'and redirect back to the list view', function () {
                $httpBackend.flush();
            });
        });
    })(Tests = App.Tests || (App.Tests = {}));
})(App || (App = {}));
