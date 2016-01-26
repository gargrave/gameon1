describe('PlatformsCtrl', function() {

  var ctrl;
  var scope;
  var $httpBackend;

  beforeEach(module('gameon'));
  beforeEach(inject(function($controller, $rootScope, _$httpBackend_) {
    ctrl = $controller('PlatformsCtrl');
    scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
  }));

  it('should load the list of platforms', function() {
    var samplePost = [
      {name: 'Xbox One'},
      {name: 'PS3'}
    ];

    $httpBackend.expectGET('/api/platforms').respond(samplePost);
    ctrl.find();
    expect(ctrl.working).toBeTruthy();
    $httpBackend.flush();

    expect(ctrl.platforms.length).toBeGreaterThan(0);
    expect(ctrl.platforms).toEqual(samplePost);
    expect(ctrl.working).toBeFalsy();
  });
});
