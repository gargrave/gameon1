var App;
(function (App) {
    var Tests;
    (function (Tests) {
        describe('PlatformsCtrl', function () {
            var moduleName = 'platforms';
            var emptyEntry = {
                name: ''
            };
            var nonEmptyEntry = {
                name: 'Name'
            };
            var testPost = JSON.stringify({
                name: 'Test Platform'
            });
            var testPostJSON = JSON.stringify(testPost);
            var testResponse = [
                { name: 'Xbox One' },
                { name: 'PS3' }
            ];
            var ctrl;
            var $httpBackend;
            var $location;
            beforeEach(angular.mock.module('gameon'));
            beforeEach(inject(function ($controller, _$httpBackend_, _$location_) {
                ctrl = $controller('PlatformsCtrl');
                $httpBackend = _$httpBackend_;
                $location = _$location_;
            }));
            afterEach(function () {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });
            it('find() should load the list of entries', function () {
                $httpBackend.when('GET', '/static/views/home.html').respond(200);
                $httpBackend.expectGET("/api/" + moduleName)
                    .respond({ entries: testResponse });
                ctrl.find();
                expect(ctrl.working).toBeTruthy();
                $httpBackend.flush();
                expect(ctrl.entries.length).toBeGreaterThan(0);
                expect(ctrl.entries).toEqual(testResponse);
                expect(ctrl.working).toBeFalsy();
            });
            it('initCreateView() should initialize the new object ' +
                'and pre-populate the existing entries list', function () {
                $httpBackend.when('GET', '/static/views/home.html').respond(200);
                $httpBackend.expectGET("/api/" + moduleName)
                    .respond({ entries: testResponse });
                ctrl.newEntry = nonEmptyEntry;
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
                $httpBackend.when('GET', '/static/views/home.html').respond(200);
                $httpBackend.expectPOST("/api/" + moduleName + "/create", testPostJSON)
                    .respond(201, testPostResponse);
                $httpBackend.expectGET("/static/views/" + moduleName + "/list.html").respond(200);
                ctrl.newEntry = testPostJSON;
                ctrl.create();
                expect(ctrl.working).toBeTruthy();
                $httpBackend.flush();
                expect($location.url()).toBe("/" + moduleName);
                expect(ctrl.newEntry).toEqual(emptyEntry);
                expect(ctrl.working).toBeFalsy();
                expect(ctrl.entries.length).toBe(origLength + 1);
            });
            it('create() should log an error if a similar object exists', function () {
                $httpBackend.when('GET', '/static/views/home.html').respond(200);
                ctrl.entries.push(testPostJSON);
                ctrl.newEntry = testPostJSON;
                ctrl.create();
                $httpBackend.flush();
                expect(ctrl.working).toBeFalsy();
                expect(ctrl.entries.length).toBe(1);
                expect(ctrl.error.length).toBeGreaterThan(0);
            });
            it('create() should handle error responses properly', function () {
                var origLength = ctrl.entries.length;
                var testError = 'Test error message';
                $httpBackend.when('GET', '/static/views/home.html').respond(200);
                $httpBackend.expectPOST("/api/" + moduleName + "/create", testPostJSON)
                    .respond(function () {
                    return [400, '', {}, testError];
                });
                ctrl.newEntry = testPostJSON;
                ctrl.create();
                expect(ctrl.working).toBeTruthy();
                expect(ctrl.error).toBe('');
                $httpBackend.flush();
                expect(ctrl.working).toBeFalsy();
                expect(ctrl.entries.length).toBe(origLength);
                expect(ctrl.error).toBe(testError);
            });
        });
    })(Tests = App.Tests || (App.Tests = {}));
})(App || (App = {}));
