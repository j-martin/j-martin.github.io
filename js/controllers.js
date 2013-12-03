'use strict';
/*global $:false */
/*global angular:false */

// create the module
var jmartin = angular.module('jmartin', ['ngRoute', 'ngAnimate']);

// configure our routes
jmartin.config(function($routeProvider) {
    $routeProvider

    // route for the home page
    .when('/', {
        templateUrl: 'views/home.html',
        controller: 'mainController'
    })

    // route for the about page
    .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'mainController'
    })

    // route for the photo page
    .when('/photo', {
        templateUrl: 'views/photo.html',
        controller: 'photoController'
    })

    // route for the render page
    .when('/render', {
        templateUrl: 'views/render.html',
        controller: 'renderController'
    });
});

// create the controller and inject Angular's $scope
jmartin.controller('mainController', function($scope) {
    $scope.message = 'Welcome!';
    $scope.raise = false;
});

jmartin.controller('renderController', function($scope, $http) {
    $http.get('json/render.json').success(function(data) {
        $scope.message = 'Images: Loaded!'
        $scope.imgs = angular.fromJson(data);
    }).error(function() {
        $scope.imgs = [];
        $scope.raise = true;
    });
});

jmartin.controller('photoController', function($scope, $http) {

    $http.get('json/photo.json').success(function(data) {
        $scope.imgs = angular.fromJson(data);

    }).error(function() {
        $scope.imgs = [];
        $scope.raise = true;
    });
}).directive('lazy', function($timeout) {
    return {
        restrict: 'C',
        link: function() {
            $timeout(function() {
                Echo.init({offset: 100, throttle: 250 });
            }, 0);
        }
    };
});

// Enabling tooltips
$('a').tooltip();
