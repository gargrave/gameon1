var App;
(function (App) {
    var Games;
    (function (Games) {
        angular.module('gameon').controller('PlatformsCtrl', [
            '$state', 'platformsSvc',
            function ($state, platformsSvc) {
                var vm = this;
                vm.working = false;
                vm.platforms = [];
                vm.newPlatform = {};
                vm.error = '';
                vm.find = function () {
                    vm.error = '';
                    vm.working = true;
                    platformsSvc.query()
                        .then(function (res) {
                        vm.platforms = res;
                    }, function (err) {
                        vm.error = err.statusText;
                    })
                        .finally(function () {
                        vm.working = false;
                    });
                };
                vm.create = function () {
                    vm.error = '';
                    if (preValidate()) {
                        vm.working = true;
                        platformsSvc.save(vm.newPlatform)
                            .then(function (res) {
                            vm.platforms.push(res);
                            vm.initCreateView();
                            $state.go('platforms-list');
                        }, function (err) {
                            vm.error = err.statusText;
                        })
                            .finally(function () {
                            vm.working = false;
                        });
                    }
                };
                vm.initCreateView = function () {
                    if (vm.platforms.length === 0) {
                        vm.find();
                    }
                    vm.newPlatform = {
                        name: ''
                    };
                };
                function preValidate() {
                    var existing = _.find(vm.platforms, function (p) {
                        var plat = p;
                        return plat.name === vm.newPlatform.name;
                    });
                    if (existing) {
                        vm.error = 'A platform with an identical name already exists.';
                    }
                    return existing === undefined;
                }
            }
        ]);
    })(Games = App.Games || (App.Games = {}));
})(App || (App = {}));
