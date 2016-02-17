/// <reference path="../../../../../typings/tsd.d.ts" />
var App;
(function (App) {
    var Common;
    (function (Common) {
        var GenericController = (function () {
            function GenericController($scope, $window, $stateParams, $state, dataSvc, moduleName) {
                this.$scope = $scope;
                this.$window = $window;
                this.$stateParams = $stateParams;
                this.$state = $state;
                this.dataSvc = dataSvc;
                this.moduleName = moduleName;
                this.working = false;
                this.error = '';
                this.filterText = '';
                this.sortText = 'startDate';
                var self = this;
                self.entries = [];
                self.newEntry = self.defaultEntry();
            }
            GenericController.prototype.create = function () {
                var self = this;
                self.error = '';
                self.buildSubmissionData();
                if (self.preValidate()) {
                    self.working = true;
                    self.dataSvc.save(self.submissionData)
                        .then(function (res) {
                        self.entries.push(res);
                        self.initCreateView();
                        self.gotoDetailView(res.id);
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
                console.log(self.$stateParams);
                self.dataSvc.query()
                    .then(function (res) {
                    self.entries = res;
                    self.onApiFindSuccess();
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
                    self.newEntry = angular.copy(self.activeEntry);
                    self.onApiFindOneSuccess();
                }, function (err) {
                    self.error = "The entry with id# " + id + " could not be found.";
                    self.gotoListView();
                })
                    .finally(function () {
                    self.working = false;
                });
            };
            GenericController.prototype.update = function () {
                var self = this;
                var id = self.activeEntry.id;
                self.error = '';
                self.buildSubmissionData();
                if (self.preValidate() && self.canSaveEdits()) {
                    self.working = true;
                    self.dataSvc.update(self.submissionData)
                        .then(function (res) {
                        self.activeEntry = res;
                        self.gotoDetailView(id);
                    }, function (err) {
                        self.error = err.statusText;
                    })
                        .finally(function () {
                        self.working = false;
                    });
                }
            };
            GenericController.prototype.remove = function () {
                var self = this;
                if (self.$window.confirm('Are you sure you want to delete this entry?')) {
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
                }
            };
            GenericController.prototype.onApiFindSuccess = function () {
            };
            GenericController.prototype.onApiFindOneSuccess = function () {
            };
            GenericController.prototype.buildSubmissionData = function () {
                this.submissionData = angular.copy(this.newEntry);
            };
            GenericController.prototype.initCreateView = function () {
                var self = this;
                if (self.entries.length === 0) {
                    self.find();
                }
                self.newEntry = self.defaultEntry();
            };
            GenericController.prototype.initListView = function () {
                this.find();
            };
            GenericController.prototype.initEditView = function () {
                this.findOne();
            };
            GenericController.prototype.clearFilterText = function () {
                this.filterText = '';
            };
            GenericController.prototype.setSortText = function (text) {
                if (this.sortText === text) {
                    this.sortText = "-" + text;
                }
                else {
                    this.sortText = text;
                }
            };
            GenericController.prototype.preValidate = function () {
                return true;
            };
            GenericController.prototype.canSaveEdits = function () {
                this.error = 'Error: ctrl.canSaveEdits() not implemented.';
                return false;
            };
            GenericController.prototype.gotoListView = function () {
                var self = this;
                self.$state.go(this.moduleName + "s-list");
            };
            GenericController.prototype.gotoDetailView = function (id) {
                var self = this;
                self.$state.go(self.moduleName + "s-detail", { id: id });
            };
            return GenericController;
        })();
        Common.GenericController = GenericController;
    })(Common = App.Common || (App.Common = {}));
})(App || (App = {}));
