var App;
(function (App) {
    var Tests;
    (function (Tests) {
        describe('PlatformsCtrl', function () {
            var moduleName = 'platform';
            var emptyPlatformData = { name: '' };
            var samplePlatformData = [
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
                $httpBackend.expectGET("/api/" + moduleName + "s")
                    .respond({ entries: samplePlatformData });
                ctrl.find();
                expect(ctrl.working).toBeTruthy();
                $httpBackend.flush();
                expect(ctrl.entries.length).toBeGreaterThan(0);
                expect(ctrl.entries).toEqual(samplePlatformData);
                expect(ctrl.working).toBeFalsy();
            });
            it('initCreateView() should initialize the new object ' +
                'and pre-populate the existing entries list', function () {
                $httpBackend.when('GET', '/static/views/home.html').respond(200);
                $httpBackend.expectGET("/api/" + moduleName + "s")
                    .respond({ entries: samplePlatformData });
                ctrl.newEntry.name = 'Not an empty name';
                ctrl.initCreateView();
                expect(ctrl.working).toBeTruthy();
                $httpBackend.flush();
                expect(ctrl.newEntry).toEqual(emptyPlatformData);
                expect(ctrl.working).toBeFalsy();
            });
            it('create() should successfully save a new platform object', function () {
                var origLength = ctrl.entries.length;
                var testPostData = JSON.stringify({
                    name: 'Test Platform'
                });
                var testPostResponse = JSON.stringify({
                    entries: [{
                            id: 10,
                            name: 'Test Platform'
                        }]
                });
                $httpBackend.when('GET', '/static/views/home.html').respond(200);
                $httpBackend.expectPOST("/api/" + moduleName + "s/create", testPostData)
                    .respond(201, testPostResponse);
                $httpBackend.expectGET("/static/views/" + moduleName + "s/list.html").respond(200);
                ctrl.newEntry = testPostData;
                ctrl.create();
                expect(ctrl.working).toBeTruthy();
                $httpBackend.flush();
                expect($location.url()).toBe("/" + moduleName + "s");
                expect(ctrl.newEntry).toEqual(emptyPlatformData);
                expect(ctrl.working).toBeFalsy();
                expect(ctrl.entries.length).toBe(origLength + 1);
            });
            it('create() should log an error if a similar object exists', function () {
                var testPostData = JSON.stringify({
                    name: 'Test Platform'
                });
                $httpBackend.when('GET', '/static/views/home.html').respond(200);
                ctrl.entries.push(testPostData);
                ctrl.newEntry = testPostData;
                ctrl.create();
                $httpBackend.flush();
                expect(ctrl.working).toBeFalsy();
                expect(ctrl.entries.length).toBe(1);
                expect(ctrl.error.length).toBeGreaterThan(0);
            });
            it('create() should handle error responses properly', function () {
                var origLength = ctrl.entries.length;
                var testPostData = JSON.stringify({
                    name: 'Test Platform'
                });
                var testError = {
                    statusText: 'Test error message'
                };
                $httpBackend.when('GET', '/static/views/home.html').respond(200);
                $httpBackend.expectPOST("/api/" + moduleName + "s/create", testPostData)
                    .respond(function () {
                    return [400, '', {}, 'Test error message'];
                });
                ctrl.newEntry = testPostData;
                ctrl.create();
                expect(ctrl.working).toBeTruthy();
                expect(ctrl.error).toBe('');
                $httpBackend.flush();
                expect(ctrl.working).toBeFalsy();
                expect(ctrl.entries.length).toBe(origLength);
                expect(ctrl.error).toBe(testError.statusText);
            });
        });
    })(Tests = App.Tests || (App.Tests = {}));
})(App || (App = {}));
