'use strict';

describe('Controller: photoController', function () {

  // load the controller's module
  beforeEach(module('jmartin'));

  var photoController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    photoController = $controller('photoController', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
