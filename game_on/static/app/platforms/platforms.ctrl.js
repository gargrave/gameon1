var App;
(function (App) {
    var Games;
    (function (Games) {
        angular.module('gameon').controller('PlatformsCtrl', [
            'platformsSvc',
            function (platformsSvc) {
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
                        vm.platforms = res.platforms;
                    }, function (err) {
                        vm.error = err;
                    })
                        .finally(function () {
                        vm.working = false;
                    });
                };
                vm.create = function () {
                    vm.error = '';
                    vm.working = true;
                    platformsSvc.save(vm.newPlatform)
                        .then(function (res) {
                        vm.platforms.push(res);
                    }, function (err) {
                        vm.error = err;
                    })
                        .finally(function () {
                        vm.initCreateView();
                        vm.working = false;
                    });
                };
                vm.initCreateView = function () {
                    vm.newPlatform = {
                        name: ''
                    };
                };
            }
        ]);
    })(Games = App.Games || (App.Games = {}));
})(App || (App = {}));
