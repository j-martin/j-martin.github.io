'use strict';
/*global $httpBackend:false */
/*global angular:false */
/*global beforeEach:false */
/*global console:false */
/*global describe:false */
/*global expect:false */
/*global it:false */

describe('renderController', function() {
    var scope = {};

    scope.mesage = 'Images: Loaded!';

    beforeEach(angular.mock.module('jmartin'));
    beforeEach(angular.mock.inject(function($rootScope, $controller, _$httpBackend_) {
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', '/json/render.json').respond(['test.jpg', 't2.jpg']);

        scope = $rootScope.$new();

        $controller('renderController', {
            $scope: scope
        });
    }));

    // console.log(scope);

    it('should have variable text = "Images Loaded!"', function() {
        expect(scope.message).toBe('Images: Loaded!');
    });
    // console.log(scope);
    it('should fetch list images', function() {
        // $httpBackend.flush();
        // console.log(scope);
        expect(scope.imgs.length).toBe(2);
        expect(scope.imgs[0]).toBe('t2.jpg');
    });
});
