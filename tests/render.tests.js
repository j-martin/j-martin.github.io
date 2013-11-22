'use strict';
 /*global angular:false */
 /*global describe:false */
 /*global beforeEach:false */
 /*global expect:false */
 /*global it:false */
 /*global $httpBackend:false */

describe('renderController', function(){
    var scope;
 
    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('jmartin'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function($rootScope, $controller, _$httpBackend_){
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', '/json/render.json').respond([{id: 1, name: 'Bob'}, {id:2, name: 'Jane'}]);
 
        //create an empty scope
        scope = $rootScope.$new();
        //declare the controller and inject our empty scope
        $controller('renderController', {$scope: scope});
    });
    // tests start here
    it('should have variable text = "Hello World!"', function(){
        expect(scope.text).toBe('Hello World!');
    });
    it('should fetch list of users', function(){
        $httpBackend.flush();
        expect(scope.users.length).toBe(2);
        expect(scope.users[0].name).toBe('Bob');
    });
});