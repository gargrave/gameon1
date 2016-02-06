/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../game_on/static/app-src/ts/app.d.ts" />
var App;
(function (App) {
    var Tests;
    (function (Tests) {
        describe('GamesCtrl', function () {
            var MODULE = 'games';
            var invalidPlatform = { id: -1, name: '' };
            var validPlatforms = [
                { id: 1, name: 'Xbox One' },
                { id: 2, name: 'PS3' }
            ];
            var emptyNewEntry = {
                name: '',
                platform: invalidPlatform,
                startDate: '',
                endDate: '',
                finished: false
            };
            var testNewEntry = {
                name: 'Name',
                platform: validPlatforms[0],
                startDate: '2015-01-01',
                endDate: '2016-01-01',
                finished: false
            };
            var testSubmissionData = {
                name: 'Name',
                platform: testNewEntry.platform.id,
                startDate: '2015-01-01',
                endDate: '2016-01-01',
                finished: false
            };
            var testResponse = [
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
                ctrl = $controller('GamesCtrl', {
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
                $httpBackend.expectGET("/api/" + MODULE)
                    .respond({ entries: testResponse });
                ctrl.newEntry = testNewEntry;
                ctrl.initCreateView();
                expect(ctrl.working).toBeTruthy();
                $httpBackend.flush();
                expect(ctrl.newEntry).toEqual(emptyNewEntry);
                expect(ctrl.working).toBeFalsy();
            });
            it('create() should successfully save a new platform object, ' +
                'and redirect to the new detail view', function () {
                var origLength = ctrl.entries.length;
                var id = 654;
                var testPostResponse = {
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
                $httpBackend.expectPOST("/api/" + MODULE + "/create", testSubmissionData)
                    .respond(201, testPostResponse);
                $httpBackend.when('GET', "/static/views/" + MODULE + "/detail.html").respond(200);
                ctrl.newEntry = testNewEntry;
                ctrl.create();
                expect(ctrl.working).toBeTruthy();
                $httpBackend.flush();
                expect($location.url()).toBe("/" + MODULE + "/" + id);
                expect(ctrl.working).toBeFalsy();
                expect(ctrl.entries.length).toBe(origLength + 1);
            });
            it('create() should log an error if a similar object exists, ' +
                'and should not attempt to save the entry', function () {
                ctrl.entries.push(testNewEntry);
                ctrl.newEntry = testNewEntry;
                ctrl.create();
                $httpBackend.flush();
                expect(ctrl.working).toBeFalsy();
                expect(ctrl.entries.length).toBe(1);
                expect(ctrl.error.length).toBeGreaterThan(0);
            });
            it('create() should log an error in the platform id is invalid, ' +
                'and should not attempt to save the entry', function () {
                ctrl.newEntry = angular.copy(testNewEntry);
                ctrl.newEntry.platform = invalidPlatform.id;
                ctrl.create();
                $httpBackend.flush();
                expect(ctrl.working).toBeFalsy();
                expect(ctrl.entries.length).toBe(0);
                expect(ctrl.error.length).toBeGreaterThan(0);
            });
            it('create() should handle error responses properly', function () {
                var origLength = ctrl.entries.length;
                $httpBackend.expectPOST("/api/" + MODULE + "/create", testSubmissionData)
                    .respond(function () {
                    return [400, '', {}, testError];
                });
                ctrl.newEntry = testNewEntry;
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
                ctrl.newEntry = testNewEntry;
                ctrl.$scope.entryForm.$valid = false;
                ctrl.create();
                $httpBackend.flush();
                expect(ctrl.working).toBeFalsy();
                expect(ctrl.entries.length).toBe(origLength);
                expect(ctrl.error.length).toBeGreaterThan(0);
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
            it('update() should partially update the existing entry ' +
                'and redirect back to the details page', function () {
                var entry = testResponse[1];
                var id = entry.id;
                var updatedName = entry.name + '_updated';
                var testPostResponse = {
                    entries: [{
                            id: entry.id,
                            name: updatedName,
                            platform: entry.platform,
                            startDate: entry.startDate,
                            endDate: entry.endDate,
                            finished: entry.finished
                        }]
                };
                $httpBackend.expectPOST("/api/" + MODULE + "/update").respond(testPostResponse);
                $httpBackend.when('GET', "/static/views/" + MODULE + "/detail.html").respond(200);
                ctrl.activeEntry = angular.copy(entry);
                ctrl.newEntry = angular.copy(ctrl.activeEntry);
                ctrl.update();
                expect(ctrl.activeEntry.name).not.toEqual(updatedName);
                expect(ctrl.working).toBeTruthy();
                $httpBackend.flush();
                expect($location.url()).toBe("/" + MODULE + "/" + id);
                expect(ctrl.working).toBeFalsy();
                expect(ctrl.activeEntry.name).toEqual(updatedName);
                expect(ctrl.activeEntry.platform).toEqual(entry.platform);
                expect(ctrl.activeEntry.startDate).toEqual(entry.startDate);
                expect(ctrl.activeEntry.endDate).toEqual(entry.endDate);
            });
            it('update() should completely update the existing entry ' +
                'and redirect back to the details page', function () {
                var entry = testResponse[1];
                var id = entry.id;
                var testPostResponse = {
                    entries: [{
                            id: entry.id,
                            name: entry.name + '_updated',
                            platform: entry.platform + '_updated',
                            startDate: entry.startDate + '_updated',
                            endDate: entry.endDate + '_updated',
                            finished: entry.finished + '_updated'
                        }]
                };
                var res = testPostResponse.entries[0];
                $httpBackend.expectPOST("/api/" + MODULE + "/update").respond(testPostResponse);
                $httpBackend.when('GET', "/static/views/" + MODULE + "/detail.html").respond(200);
                ctrl.activeEntry = angular.copy(entry);
                ctrl.newEntry = angular.copy(ctrl.activeEntry);
                ctrl.update();
                expect(ctrl.activeEntry.name).not.toEqual(res.name);
                expect(ctrl.working).toBeTruthy();
                $httpBackend.flush();
                expect($location.url()).toBe("/" + MODULE + "/" + id);
                expect(ctrl.working).toBeFalsy();
                expect(ctrl.activeEntry.name).toEqual(res.name);
                expect(ctrl.activeEntry.platform).toEqual(res.platform);
                expect(ctrl.activeEntry.startDate).toEqual(res.startDate);
                expect(ctrl.activeEntry.endDate).toEqual(res.endDate);
                expect(ctrl.activeEntry.finished).toEqual(res.finished);
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
