// create the module
var jmartin = angular.module('jmartin', ['ngRoute', 'ngAnimate']);

// configure our routes
jmartin.config(function($routeProvider) {
  'use strict';
  $routeProvider

  // route for the home page
  .when('/', {
    templateUrl: '/public/views/home.html',
    controller: 'mainController'
  })

  // route for the about page
  .when('/about', {
    templateUrl: '/public/views/about.html',
    controller: 'mainController'
  })

  // route for the coding page
  .when('/code', {
    templateUrl: '/public/views/code.html',
    controller: 'mainController'
  })

  // route for the photo page
  .when('/photo', {
    templateUrl: '/public/views/photo.html',
    controller: 'photoController'
  })

  // route for the render page
  .when('/render', {
    templateUrl: '/public/views/render.html',
    controller: 'renderController'
  });
});

// create the controller and inject Angular's $scope
jmartin.controller('mainController', function($scope) {
  $scope.message = 'Welcome!';
  $scope.raise = false;
});

jmartin.controller('renderController', function($scope, $http) {
  $http.get('/public/json/render.json').success(function(data) {
    $scope.message = 'Images: Loaded!';
    $scope.imgs = angular.fromJson(data);
  }).error(function() {
    $scope.imgs = [];
    $scope.raise = true;
  });
});

jmartin.controller('photoController', function($scope, $http) {

  $http.get('/public/json/photo.json').success(function(data) {
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
        echo.init({
          offset: 100,
          throttle: 250
        });
      }, 0);
    }
  };
});

// Enabling tooltips
$('a').tooltip();
