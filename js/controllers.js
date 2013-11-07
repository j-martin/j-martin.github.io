	// create the module
	var jmartin = angular.module('jmartin', []);

	// configure our routes
	jmartin.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'pages/home.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/about', {
				templateUrl : 'pages/about.html',
				controller  : 'mainController'
			})

			// route for the photo page
			.when('/photo', {
				templateUrl : 'pages/photo.html',
				controller  : 'photoController'
			})

			// route for the render page
			.when('/render', {
				templateUrl : 'pages/render.html',
				controller  : 'renderController'
			});
	});

	// create the controller and inject Angular's $scope
	jmartin.controller('mainController', function($scope) {
		$scope.message = 'General Controller!';
		// showall();
	});

	jmartin.controller('renderController', function($scope, $http) {
			$scope.message = 'Look! I am an photo page.';
			
			$http.get('json/render.php').success(function(data) {
    			$scope.imgs = angular.fromJson(data);
			});

		});

	jmartin.controller('photoController', function($scope, $http) {
			$scope.message = 'Look! I am an photo page.';
			
			$http.get('json/photo.php').success(function(data) {
    			$scope.imgs = angular.fromJson(data);
			})
		}).directive('lazy', function($timeout) {
              return {
                restrict: 'C',
                link: function (scope, elm, attrs) {
                    $timeout(function() { $('img.lazy').lazyload() }, 0); 
                }
              }
            });

	// Enabling tooltips
	$('a').tooltip();
	// $("img.lazy").lazyload({
	//     effect : "fadeIn"
	// });