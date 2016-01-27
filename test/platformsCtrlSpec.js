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
            beforeEach(angular.mock.module('gameon'));
            beforeEach(inject(function ($controller, _$httpBackend_) {
                ctrl = $controller('PlatformsCtrl');
                $httpBackend = _$httpBackend_;
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
            it('initCreateView() should initialize the new object', function () {
                $httpBackend.when('GET', '/static/views/home.html').respond(200);
                ctrl.newPlatform.name = 'Not an empty name';
                ctrl.initCreateView();
                $httpBackend.flush();
                expect(ctrl.newPlatform.name).toBe('');
            });
            it('create() should successfully save a new platform object', function () {
                var origLength = ctrl.platforms.length;
                var testPostData = JSON.stringify({
                    name: 'Test Platform'
                });
                var testPostResponse = JSON.stringify({
                    id: 10,
                    name: 'Test Platform'
                });
                $httpBackend.when('GET', '/static/views/home.html').respond(200);
                $httpBackend.expectPOST('/api/platforms/add', testPostData)
                    .respond(201, testPostResponse);
                $httpBackend.expectGET('/static/views/platforms/list.html').respond(200);
                ctrl.newPlatform = testPostData;
                ctrl.create();
                expect(ctrl.working).toBeTruthy();
                $httpBackend.flush();
                expect(ctrl.newPlatform).toEqual(emptyPlatformData);
                expect(ctrl.working).toBeFalsy();
                expect(ctrl.platforms.length).toBe(origLength + 1);
            });
            it('create() should handle error responses properly', function () {
                var origLength = ctrl.platforms.length;
                var testPostData = JSON.stringify({
                    name: 'Test Platform'
                });
                var testError = 'Test error message';
                $httpBackend.when('GET', '/static/views/home.html').respond(200);
                $httpBackend.expectPOST('/api/platforms/add', testPostData)
                    .respond(400, testError);
                ctrl.newPlatform = testPostData;
                ctrl.create();
                expect(ctrl.working).toBeTruthy();
                expect(ctrl.error).toBe('');
                $httpBackend.flush();
                expect(ctrl.working).toBeFalsy();
                expect(ctrl.platforms.length).toBe(origLength);
                expect(ctrl.error).toBe(testError);
            });
        });
    })(Platforms = App.Platforms || (App.Platforms = {}));
})(App || (App = {}));
