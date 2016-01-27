var App;
(function (App) {
    var Tests;
    (function (Tests) {
        describe('GamesCtrl', function () {
            var sampleGameData = [
                {
                    name: 'Lords of the Fallen',
                    platform: 'Xbox One',
                    start_date: '2014-10-31',
                    end_date: '2014-11-15',
                    finished: true
                },
                {
                    name: 'Kingdom Hearts 1.5 HD',
                    platform: 'PS3',
                    start_date: '2014-7-22',
                    end_date: '2014-2-31',
                    finished: true
                }
            ];
            var ctrl;
            var scope;
            var $httpBackend;
            beforeEach(angular.mock.module('gameon'));
            beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
                ctrl = $controller('GamesCtrl');
                scope = $rootScope.$new();
                $httpBackend = _$httpBackend_;
            }));
            it('should load the list of games', function () {
                $httpBackend.expectGET('/api/games').respond({ games: sampleGameData });
                ctrl.find();
                expect(ctrl.working).toBeTruthy();
                $httpBackend.flush();
                expect(ctrl.games.length).toBeGreaterThan(0);
                expect(ctrl.games).toEqual(sampleGameData);
                expect(ctrl.working).toBeFalsy();
            });
        });
    })(Tests = App.Tests || (App.Tests = {}));
})(App || (App = {}));
