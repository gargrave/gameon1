/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../game_on/static/app-src/ts/app.d.ts" />
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
            var $httpBackend;
            var $location;
            var $stateParams;
            var scope;
            var windowMock;
            var ctrl;
            beforeEach(angular.mock.module('gameon'));
            beforeEach(inject(function ($rootScope, $controller, _$httpBackend_, _$location_, _$stateParams_) {
                $httpBackend = _$httpBackend_;
                $location = _$location_;
                $stateParams = _$stateParams_;
                scope = $rootScope.$new();
                scope.entryForm = {
                    $submitted: true,
                    $valid: true
                };
                windowMock = {
                    confirm: function (msg) {
                        return true;
                    }
                };
                ctrl = $controller('PlatformsCtrl', {
                    $window: windowMock,
                    $scope: scope
                });
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
            it('create() should successfully save a new platform object, ' +
                'and redirect to the new detail view', function () {
                var origLength = ctrl.entries.length;
                var id = 654;
                var testPostResponse = {
                    entries: [{
                            id: id,
                            name: testPost.name,
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
            it('create() should reject the new entry and show an error message ' +
                'if the form is not valid', function () {
                var origLength = ctrl.entries.length;
                ctrl.newEntry = testPost;
                ctrl.$scope.entryForm.$valid = false;
                ctrl.create();
                $httpBackend.flush();
                expect(ctrl.working).toBeFalsy();
                expect(ctrl.entries.length).toBe(origLength);
                expect(ctrl.error.length).toBeGreaterThan(0);
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
                var res = { entries: [testResponse[0]] };
                var id = 123;
                $httpBackend.expectGET("/api/" + MODULE + "/" + id).respond(res);
                $stateParams.id = id;
                ctrl.findOne();
                expect(ctrl.working).toBeTruthy();
                $httpBackend.flush();
                expect(ctrl.error.length).toBe(0);
                expect(ctrl.activeEntry).toEqual(res.entries[0]);
                expect(ctrl.newEntry).toEqual(ctrl.activeEntry);
                expect(ctrl.working).toBeFalsy();
            });
            it('findOne() should display an error if the desired entry could not be found, ' +
                'and redirect back to the list page', function () {
                $httpBackend.expectGET(/\/api\/platforms\/\d+/)
                    .respond(function () {
                    return [404, '', {}, testError];
                });
                $httpBackend.when('GET', "/static/views/" + MODULE + "/list.html").respond(200);
                $stateParams.id = 123;
                ctrl.findOne();
                expect(ctrl.working).toBeTruthy();
                $httpBackend.flush();
                expect($location.url()).toBe("/" + MODULE);
                expect(ctrl.working).toBeFalsy();
            });
            it('update() should update the existing entry and redirect ' +
                'back to the details page', function () {
                var entry = testResponse[1];
                var id = entry.id;
                var updatedName = 'Updated Name';
                var testPostResponse = {
                    entries: [{
                            id: id,
                            name: updatedName,
                            created: entry.created,
                            modified: '2017-01-27T15:55:16.285Z'
                        }]
                };
                $httpBackend.expectPOST("/api/" + MODULE + "/update").respond(testPostResponse);
                $httpBackend.when('GET', "/static/views/" + MODULE + "/detail.html").respond(200);
                ctrl.activeEntry = angular.copy(entry);
                ctrl.newEntry = angular.copy(ctrl.activeEntry);
                ctrl.newEntry.name = 'Updated Platform Name';
                ctrl.update();
                expect(ctrl.activeEntry.name).not.toEqual(updatedName);
                expect(ctrl.working).toBeTruthy();
                $httpBackend.flush();
                expect($location.url()).toBe("/" + MODULE + "/" + id);
                expect(ctrl.working).toBeFalsy();
                expect(ctrl.activeEntry.name).toEqual(updatedName);
            });
            it('update() should fail if the new entry is identical to its pre-edited state', function () {
                ctrl.activeEntry = angular.copy(testResponse[1]);
                ctrl.newEntry = angular.copy(ctrl.activeEntry);
                ctrl.update();
                $httpBackend.flush();
                expect(ctrl.working).toBeFalsy();
                expect(ctrl.error.length).toBeGreaterThan(0);
            });
            it('remove() should successfully delete the currently active entry, ' +
                'and redirect back to the list view', function () {
                ctrl.entries = testResponse;
                var id = ctrl.entries[0].id;
                var origLength = ctrl.entries.length;
                $httpBackend.expectPOST("/api/" + MODULE + "/delete").respond(204);
                $httpBackend.when('GET', "/static/views/" + MODULE + "/list.html").respond(200);
                $stateParams.id = id;
                ctrl.remove();
                expect(ctrl.working).toBeTruthy();
                $httpBackend.flush();
                expect($location.url()).toBe("/" + MODULE);
                expect(ctrl.entries.length).toBe(origLength - 1);
                expect(ctrl.error.length).toBe(0);
                expect(ctrl.working).toBeFalsy();
            });
        });
    })(Tests = App.Tests || (App.Tests = {}));
})(App || (App = {}));
