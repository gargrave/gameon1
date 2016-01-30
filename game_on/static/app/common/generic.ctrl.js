var App;
(function (App) {
    var Common;
    (function (Common) {
        var GenericController = (function () {
            function GenericController($stateParams, $state, dataSvc, moduleName) {
                this.$stateParams = $stateParams;
                this.$state = $state;
                this.dataSvc = dataSvc;
                this.moduleName = moduleName;
                this.working = false;
                this.error = '';
                var self = this;
                self.entries = [];
                self.newEntry = self.defaultEntry();
            }
            GenericController.prototype.create = function () {
                var self = this;
                self.error = '';
                if (self.preValidate()) {
                    self.working = true;
                    self.dataSvc.save(self.newEntry)
                        .then(function (res) {
                        self.entries.push(res);
                        self.initCreateView();
                        var id = res.id;
                        self.$state.go(self.moduleName + "s-detail", { id: id });
                    }, function (err) {
                        self.error = err.statusText;
                    })
                        .finally(function () {
                        self.working = false;
                    });
                }
            };
            ;
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
            GenericController.prototype.findOne = function () {
                var self = this;
                self.error = '';
                self.working = true;
                var id = self.$stateParams['id'];
                self.dataSvc.get(id)
                    .then(function (res) {
                    self.activeEntry = res;
                }, function (err) {
                    self.error = "The entry with id# " + id + " could not be found.";
                    self.gotoListView();
                })
                    .finally(function () {
                    self.working = false;
                });
            };
            GenericController.prototype.remove = function () {
                if (!confirm('Delete this fucko?')) {
                    return;
                }
                var self = this;
                self.error = '';
                self.working = true;
                var id = self.$stateParams['id'];
                self.dataSvc.remove(id)
                    .then(function (res) {
                    _.remove(self.entries, function (e) {
                        return e.id === id;
                    });
                    self.gotoListView();
                }, function (err) {
                    self.error = err.statusText;
                })
                    .finally(function () {
                    self.working = false;
                });
            };
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
            GenericController.prototype.gotoListView = function () {
                this.$state.go(this.moduleName + "s-list");
            };
            return GenericController;
        })();
        Common.GenericController = GenericController;
    })(Common = App.Common || (App.Common = {}));
})(App || (App = {}));
