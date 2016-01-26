describe('GamesCtrl', function() {

  var ctrl;
  var scope;
  var $httpBackend;

  beforeEach(module('gameon'));

  beforeEach(inject(function($controller, $rootScope, _$httpBackend_) {
    ctrl = $controller('GamesCtrl');
    scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
  }));
});
