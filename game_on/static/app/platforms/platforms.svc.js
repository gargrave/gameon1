(function () {
    'use strict';
    angular.module('gameon').service('platformsSvc', [
        '$http', '$q',
        function ($http, $q) {
            var vm = this;
            vm.query = function () {
                var res = {
                    data: [
                        { name: 'Xbox One' },
                        { name: 'PS3' }
                    ]
                };
                var deferred = $q.defer();
                deferred.resolve(res);
                return deferred.promise;
            };
        }]);
})();
