var App;
(function (App) {
    var Common;
    (function (Common) {
        var GenericController = (function () {
            function GenericController($state, dataSvc, moduleName) {
                this.$state = $state;
                this.dataSvc = dataSvc;
                this.moduleName = moduleName;
                this.working = false;
                this.error = '';
                var self = this;
                self.entries = [];
                self.newEntry = self.defaultEntry();
            }
            GenericController.prototype.find = function () {
                var self = this;
                self.error = '';
                self.working = true;
                self.dataSvc.query()
                    .then(function (res) {
                    self.entries = res;
                }, function (err) {
                    self.error = err.statusText;
                })
                    .finally(function () {
                    self.working = false;
                });
            };
            ;
            GenericController.prototype.create = function () {
                var self = this;
                self.error = '';
                if (self.preValidate()) {
                    self.working = true;
                    self.dataSvc.save(self.newEntry)
                        .then(function (res) {
                        self.entries.push(res);
                        self.initCreateView();
                        self.$state.go(self.moduleName + "s-list");
                    }, function (err) {
                        self.error = err.statusText;
                    })
                        .finally(function () {
                        self.working = false;
                    });
                }
            };
            ;
            GenericController.prototype.initCreateView = function () {
                var self = this;
                if (self.entries.length === 0) {
                    self.find();
                }
                self.newEntry = self.defaultEntry();
            };
            ;
            GenericController.prototype.preValidate = function () {
                return true;
            };
            return GenericController;
        })();
        Common.GenericController = GenericController;
    })(Common = App.Common || (App.Common = {}));
})(App || (App = {}));
