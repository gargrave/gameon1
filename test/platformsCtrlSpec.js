var App;
(function (App) {
    var Platforms;
    (function (Platforms) {
        describe('PlatformsCtrl', function () {
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
            it('find() should load the list of platforms', function () {
                $httpBackend.when('GET', '/static/views/home.html').respond(200);
                $httpBackend.expectGET('/api/platforms')
                    .respond({ platforms: samplePlatformData });
                ctrl.find();
                expect(ctrl.working).toBeTruthy();
                $httpBackend.flush();
                expect(ctrl.platforms.length).toBeGreaterThan(0);
                expect(ctrl.platforms).toEqual(samplePlatformData);
                expect(ctrl.working).toBeFalsy();
            });
            it('initCreateView() should initialize the new object ' +
                'and pre-populate the existing platforms list', function () {
                $httpBackend.when('GET', '/static/views/home.html').respond(200);
                $httpBackend.expectGET('/api/platforms')
                    .respond({ platforms: samplePlatformData });
                ctrl.newPlatform.name = 'Not an empty name';
                ctrl.initCreateView();
                expect(ctrl.working).toBeTruthy();
                $httpBackend.flush();
                expect(ctrl.newPlatform).toEqual(emptyPlatformData);
                expect(ctrl.working).toBeFalsy();
            });
            it('create() should successfully save a new platform object', function () {
                var origLength = ctrl.platforms.length;
                var testPostData = JSON.stringify({
                    name: 'Test Platform'
                });
                var testPostResponse = JSON.stringify({
                    platform: [{
                            id: 10,
                            name: 'Test Platform'
                        }]
                });
                $httpBackend.when('GET', '/static/views/home.html').respond(200);
                $httpBackend.expectPOST('/api/platforms/add', testPostData)
                    .respond(201, testPostResponse);
                $httpBackend.expectGET('/static/views/platforms/list.html').respond(200);
                ctrl.newPlatform = testPostData;
                ctrl.create();
                expect(ctrl.working).toBeTruthy();
                $httpBackend.flush();
                expect($location.url()).toBe('/platforms');
                expect(ctrl.newPlatform).toEqual(emptyPlatformData);
                expect(ctrl.working).toBeFalsy();
                expect(ctrl.platforms.length).toBe(origLength + 1);
            });
            it('create() should log an error if a similar object exists', function () {
                var origLength = ctrl.platforms.length;
                var testPostData = JSON.stringify({
                    name: 'Test Platform'
                });
                var testPostResponse = JSON.stringify({
                    platform: [{
                            id: 10,
                            name: 'Test Platform'
                        }]
                });
                $httpBackend.when('GET', '/static/views/home.html').respond(200);
                ctrl.platforms.push(testPostData);
                ctrl.newPlatform = testPostData;
                ctrl.create();
                $httpBackend.flush();
                expect(ctrl.working).toBeFalsy();
                expect(ctrl.platforms.length).toBe(1);
                expect(ctrl.error.length).toBeGreaterThan(0);
            });
            it('create() should handle error responses properly', function () {
                var origLength = ctrl.platforms.length;
                var testPostData = JSON.stringify({
                    name: 'Test Platform'
                });
                var testError = {
                    statusText: 'Test error message'
                };
                $httpBackend.when('GET', '/static/views/home.html').respond(200);
                $httpBackend.expectPOST('/api/platforms/add', testPostData)
                    .respond(function () {
                    return [400, '', {}, 'Test error message'];
                });
                ctrl.newPlatform = testPostData;
                ctrl.create();
                expect(ctrl.working).toBeTruthy();
                expect(ctrl.error).toBe('');
                $httpBackend.flush();
                expect(ctrl.working).toBeFalsy();
                expect(ctrl.platforms.length).toBe(origLength);
                expect(ctrl.error).toBe(testError.statusText);
            });
        });
    })(Platforms = App.Platforms || (App.Platforms = {}));
})(App || (App = {}));
