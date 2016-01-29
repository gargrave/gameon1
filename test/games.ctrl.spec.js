var App;
(function (App) {
    var Tests;
    (function (Tests) {
        describe('GamesCtrl', function () {
            var MODULE = 'games';
            var invalidPlatform = { id: -1, name: 'Okay Name' };
            var validPlatforms = [
                { id: 1, name: 'Xbox One' },
                { id: 2, name: 'PS3' }
            ];
            var emptyEntry = {
                name: '',
                platform: invalidPlatform.id,
                startDate: '',
                endDate: '',
                finished: false
            };
            var testPost = {
                name: 'Name',
                platform: validPlatforms[0].id,
                startDate: '2015-01-01',
                endDate: '2016-01-01',
                finished: false
            };
            var testResponse = [
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
            var testError = 'Test error message';
            var ctrl;
            var $httpBackend;
            var $location;
            var $stateParams;
            beforeEach(angular.mock.module('gameon'));
            beforeEach(inject(function ($controller, _$httpBackend_, _$stateParams_, _$location_) {
                ctrl = $controller('GamesCtrl');
                $httpBackend = _$httpBackend_;
                $stateParams = _$stateParams_;
                $location = _$location_;
                $httpBackend.when('GET', '/static/views/home.html').respond(200);
            }));
            afterEach(function () {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });
            it('initCreateView() should initialize the new object ' +
                'and pre-populate the existing entries list', function () {
                $httpBackend.expectGET("/api/" + MODULE)
                    .respond({ entries: testResponse });
                ctrl.newEntry = testPost;
                ctrl.initCreateView();
                expect(ctrl.working).toBeTruthy();
                $httpBackend.flush();
                expect(ctrl.newEntry).toEqual(emptyEntry);
                expect(ctrl.working).toBeFalsy();
            });
            it('create() should successfully save a new platform object, ' +
                'and redirect to the new detail view', function () {
                var origLength = ctrl.entries.length;
                var id = 654;
                var testPostResponse = {
                    entries: [{
                            id: id,
                            name: testPost.name,
                            platform: testPost.platform,
                            startDate: testPost.startDate,
                            endDate: testPost.endDate,
                            finished: testPost.finished,
                            created: '2016-01-28T15:55:16.285Z',
                            modified: '2016-01-28T15:55:16.285Z'
                        }]
                };
                $httpBackend.expectPOST("/api/" + MODULE + "/create", testPost)
                    .respond(201, testPostResponse);
                $httpBackend.when('GET', "/static/views/" + MODULE + "/detail.html").respond(200);
                ctrl.newEntry = testPost;
                ctrl.create();
                expect(ctrl.working).toBeTruthy();
                $httpBackend.flush();
                expect($location.url()).toBe("/" + MODULE + "/" + id);
                expect(ctrl.working).toBeFalsy();
                expect(ctrl.entries.length).toBe(origLength + 1);
            });
            it('create() should log an error if a similar object exists, ' +
                'and should not attempt to save the entry', function () {
                ctrl.entries.push(testPost);
                ctrl.newEntry = testPost;
                ctrl.create();
                $httpBackend.flush();
                expect(ctrl.working).toBeFalsy();
                expect(ctrl.entries.length).toBe(1);
                expect(ctrl.error.length).toBeGreaterThan(0);
            });
            it('create() should log an error in the platform id is invalid, ' +
                'and should not attempt to save the entry', function () {
                ctrl.newEntry = angular.copy(testPost);
                ctrl.newEntry.platform = invalidPlatform.id;
                ctrl.create();
                $httpBackend.flush();
                expect(ctrl.working).toBeFalsy();
                expect(ctrl.entries.length).toBe(0);
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
                $httpBackend.expectGET(/\/api\/games\/\d+/)
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
        });
    })(Tests = App.Tests || (App.Tests = {}));
})(App || (App = {}));
