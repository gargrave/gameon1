var App;
(function (App) {
    var Games;
    (function (Games) {
        angular.module('gameon').service('gamesSvc', [
            '$http', '$q',
            function ($http, $q) {
                var vm = this;
                vm.query = function () {
                    var fakeres = {
                        data: [
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
                        ]
                    };
                    var deferred = $q.defer();
                    deferred.resolve(fakeres);
                    return deferred.promise;
                };
            }
        ]);
    })(Games = App.Games || (App.Games = {}));
})(App || (App = {}));
