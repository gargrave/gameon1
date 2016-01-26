var App;
(function (App) {
    var Platforms;
    (function (Platforms) {
        describe('PlatformsCtrl', function () {
            var samplePlatformData = [
                { name: 'Xbox One' },
                { name: 'PS3' }
            ];
            var ctrl;
            var scope;
            var $httpBackend;
            beforeEach(module('gameon'));
            beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
                ctrl = $controller('PlatformsCtrl');
                scope = $rootScope.$new();
                $httpBackend = _$httpBackend_;
            }));
            it('should load the list of platforms', function () {
                $httpBackend.expectGET('/api/platforms').respond({ platforms: samplePlatformData });
                ctrl.find();
                expect(ctrl.working).toBeTruthy();
                $httpBackend.flush();
                expect(ctrl.platforms.length).toBeGreaterThan(0);
                expect(ctrl.platforms).toEqual(samplePlatformData);
                expect(ctrl.working).toBeFalsy();
            });
        });
    })(Platforms = App.Platforms || (App.Platforms = {}));
})(App || (App = {}));
