
var bartoPartials = angular.module('bartoPartials', []);
bartoPartials.controller('EmptyCtrl', ['$scope', function($scope){}]);
bartoPartials.controller('TablesCtrl', ['$scope', '$timeout', function($scope, $timeout){
  $scope.winners = [
    {'rank': 1, 'name': 'Jack Nicklaus', 'country': 'USA', 'master': 6, 'usopen': 4, 'theopen': 3, 'pga': 4, 'total': 18},
    {'rank': 2, 'name': 'Tiger Woods', 'country': 'USA', 'master': 4, 'usopen': 3, 'theopen': 3, 'pga': 4, 'total': 14},
    {'rank': 3, 'name': 'Walter Hagen', 'country': 'USA', 'master': 0, 'usopen': 2, 'theopen': 3, 'pga': 5, 'total': 11},
    {'rank': 4, 'name': 'Ben Hogan', 'country': 'USA', 'master': 2, 'usopen': 4, 'theopen': 3, 'pga': 2, 'total': 9},
    {'rank': 4, 'name': 'Gary Player', 'country': 'South Africa', 'master': 3, 'usopen': 1, 'theopen': 3, 'pga': 2, 'total': 9},
    {'rank': 6, 'name': 'Tom Watson', 'country': 'USA', 'master': 2, 'usopen': 4, 'theopen': 1, 'pga': 0, 'total': 8},
    {'rank': 7, 'name': 'Gene Sarazen', 'country': 'USA', 'master': 1, 'usopen': 4, 'theopen': 2, 'pga': 3, 'total': 7},
    {'rank': 7, 'name': 'Arnold Palmer', 'country': 'USA', 'master': 4, 'usopen': 4, 'theopen': 1, 'pga': 0, 'total': 7},
    {'rank': 7, 'name': 'Sam Snead', 'country': 'USA', 'master': 3, 'usopen': 4, 'theopen': 0, 'pga': 3, 'total': 7},
    {'rank': 7, 'name': 'Bobby Johns', 'country': 'USA', 'master': 0, 'usopen': 4, 'theopen': 4, 'pga': 0, 'total': 7},
  ];
  $timeout(function() {
    $('#datatable1').dataTable({
      bPaginate: false,
      bInfo: false,
      bFilter: false
    });
  });
}]);
bartoPartials.controller('DashboardCtrl', ['$scope', '$http', function($scope, $http){
   $http.get('app/pages.json')
       .then(function(result){
          $scope.pages = result.data.pages;
        });
}]);
bartoPartials.controller('SidebarCtrl', ['$scope', '$http', function($scope, $http){
   $http.get('app/pages.json')
       .then(function(result){
          $scope.pages = result.data.pages;
        });
}]);

var barto = angular.module('barto', ['ngRoute', 'bartoPartials', 'datatables'], function() {});
barto.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider.
    when('/dashboard', {
      templateUrl: 'app/views/dashboard.html',
      controller: 'DashboardCtrl'
    }).
		when('/typography', {
			templateUrl: 'app/views/typography.html',
			controller: 'EmptyCtrl'
		}).
    when('/tables', {
			templateUrl: 'app/views/tables.html',
			controller: 'TablesCtrl'
		}).
    when('/panels', {
			templateUrl: 'app/views/panels.html',
			controller: 'EmptyCtrl'
		}).
    when('/colors', {
			templateUrl: 'app/views/colors.html',
			controller: 'EmptyCtrl'
		}).
    when('/buttons', {
			templateUrl: 'app/views/buttons.html',
			controller: 'EmptyCtrl'
		}).
    when('/icons', {
			templateUrl: 'app/views/icons.html',
			controller: 'EmptyCtrl'
		}).
    when('/forms', {
			templateUrl: 'app/views/forms.html',
			controller: 'EmptyCtrl'
		}).
    when('/formsSingleColumn', {
			templateUrl: 'app/views/formsSingleColumn.html',
			controller: 'EmptyCtrl'
		}).
    when('/formsDoubleColumn', {
			templateUrl: 'app/views/formsDoubleColumn.html',
			controller: 'EmptyCtrl'
		}).
    when('/formsDoublePanel', {
			templateUrl: 'app/views/formsDoublePanel.html',
			controller: 'EmptyCtrl'
		}).
		otherwise({
			redirectTo: '/dashboard'
		});

	//$locationProvider.html5Mode(true);

}]);
