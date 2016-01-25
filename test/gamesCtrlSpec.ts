/// <reference path="../typings/tsd.d.ts" />
describe('GamesCtrl', function() {

  let ctrl;
  let scope;

  beforeEach(module('gameon'));

  beforeEach(inject(function($controller, $rootScope) {
    ctrl = $controller('GamesCtrl');
    scope = $rootScope.$new();
  }));

  it('should initialize the message', function() {
    expect(ctrl.message.length).toBeGreaterThan(0);
  });
});
