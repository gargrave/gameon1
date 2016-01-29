var App;
(function (App) {
    var Tests;
    (function (Tests) {
        describe('GamesCtrl', function () {
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
            var ctrl;
            var $httpBackend;
            var $location;
            beforeEach(angular.mock.module('gameon'));
            beforeEach(inject(function ($controller, _$httpBackend_, _$location_) {
                ctrl = $controller('GamesCtrl');
                $httpBackend = _$httpBackend_;
                $location = _$location_;
                $httpBackend.when('GET', '/static/views/home.html').respond(200);
            }));
            afterEach(function () {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });
            it('initCreateView() should initialize the new object ' +
                'and pre-populate the existing entries list', function () {
                $httpBackend.expectGET('/api/games')
                    .respond({ entries: testResponse });
                ctrl.newEntry = testPost;
                ctrl.initCreateView();
                expect(ctrl.working).toBeTruthy();
                $httpBackend.flush();
                expect(ctrl.newEntry).toEqual(emptyEntry);
                expect(ctrl.working).toBeFalsy();
            });
            it('create() should successfully save a new game object and redirect', function () {
                var origLength = ctrl.entries.length;
                var testPostResponse = {
                    entries: [{
                            id: 10,
                            name: testPost.name,
                            platform: testPost.platform,
                            startDate: testPost.startDate,
                            endDate: testPost.endDate,
                            finished: testPost.finished
                        }]
                };
                $httpBackend.expectPOST('/api/games/create', testPost)
                    .respond(201, testPostResponse);
                $httpBackend.expectGET('/static/views/games/list.html').respond(200);
                ctrl.newEntry = testPost;
                ctrl.create();
                expect(ctrl.working).toBeTruthy();
                $httpBackend.flush();
                expect($location.url()).toBe('/games');
                expect(ctrl.newEntry).toEqual(emptyEntry);
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
                var testError = 'Test error message';
                $httpBackend.expectPOST('/api/games/create', testPost)
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
                $httpBackend.expectGET('/api/games')
                    .respond({ entries: testResponse });
                ctrl.find();
                expect(ctrl.working).toBeTruthy();
                $httpBackend.flush();
                expect(ctrl.error.length).toBe(0);
                expect(ctrl.entries.length).toBeGreaterThan(0);
                expect(ctrl.entries).toEqual(testResponse);
                expect(ctrl.working).toBeFalsy();
            });
        });
    })(Tests = App.Tests || (App.Tests = {}));
})(App || (App = {}));
