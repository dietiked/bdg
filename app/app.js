
var bartoPartials = angular.module('bartoPartials', []);
bartoPartials.controller('MainCtrl', ['$scope', function($scope){
  $scope.app = {layout: {isCollapsed: false}};
}]);

bartoPartials.controller('EmptyCtrl', ['$scope', function($scope){
}]);
bartoPartials.controller('TablesCtrl', ['$scope', '$timeout', '$sce', function($scope, $timeout, $sce){
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
  // For forms
  $scope.formSelection = {selected:''};
  $scope.trustAsHtml = function(value) {
    return $sce.trustAsHtml(value);
  };
}]);

bartoPartials.controller('MapsCtrl', ['$scope', function($scope){
  mapboxgl.accessToken = 'pk.eyJ1IjoiZGlldGlrZWQiLCJhIjoiMDkzMTUyZjg0NzY3ZjBjYzk1NTZhZGZkZjM0NWE5OTUifQ.ZQGLwWRc3trVsw7PzN2ovQ';
  var fullmap = new mapboxgl.Map({
      container: 'fullmap', // container id
      //style: 'mapbox://styles/mapbox/streets-v8', //stylesheet location
      style: 'mapbox://styles/mapbox/emerald-v8',
      center: [8.682913, 47.447806], // starting position
      zoom: 12 // starting zoom
  });
  var halfmap = new mapboxgl.Map({
      container: 'halfmap', // container id
      //style: 'mapbox://styles/mapbox/streets-v8', //stylesheet location
      style: 'mapbox://styles/mapbox/emerald-v8',
      center: [8.682913, 47.447806], // starting position
      zoom: 13 // starting zoom
  });
  halfmap.on('mousemove', function (e) {
    $('#lat').text(JSON.stringify(e.lngLat.lat));
    $('#lng').text(JSON.stringify(e.lngLat.lng));
  });

  $scope.flightTo = function(location) {
    var coordinates;
    if (location == 'identitas') {
      coordinates = [7.4629176, 46.9694442];
    } else if (location == 'agridea') {
      coordinates = [8.682913, 47.447806];
    }
    halfmap.flyTo({
        center: coordinates
    });
  }

}]);

bartoPartials.controller('DashboardCtrl', ['$scope', '$http', function($scope, $http){
   $http.get('app/pages.json')
       .then(function(result){
          $scope.pages = result.data.pages;
        });
}]);
bartoPartials.controller('DialogsCtrl', ['$scope', 'ngDialog', function($scope, ngDialog){
  $scope.deleteDialog = function () {
      ngDialog.open({ template: 'deleteDialog', className: 'ngdialog-theme-default' });
  };
  $scope.confirmDialog = function () {
      ngDialog.open({ template: 'confirmDialog', className: 'ngdialog-theme-default' });
  };
  $scope.infoDialog = function () {
      ngDialog.open({ template: 'infoDialog', className: 'ngdialog-theme-default' });
  };
}]);
bartoPartials.controller('NotificationsCtrl', ['$scope', 'toaster', function($scope, toaster){
  $scope.errorNotififcation = function() {
    toaster.pop('error', "Error", "There was an error while performing this operation. Please try again.");
  }
  $scope.successNotification = function() {
    toaster.pop('success', "Success", "This operation was successfully completed");
  }
}]);
bartoPartials.controller('SidebarCtrl', ['$scope', '$http', function($scope, $http){
   $http.get('app/pages.json')
       .then(function(result){
          $scope.pages = result.data.pages;
        });
}]);

bartoPartials
.directive('breadcrumb', [ function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			'titles': '=',
		},
		templateUrl: 'app/views/breadcrumb.html',
		link: function(scope, element, attrs) {
		}
	};
}])


var barto = angular.module('barto', ['ngRoute', 'bartoPartials', 'datatables', 'ngDialog', 'toaster', 'ui.select'], function() {});
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
			controller: 'TablesCtrl'
		}).
    when('/formsDoubleColumn', {
			templateUrl: 'app/views/formsDoubleColumn.html',
			controller: 'EmptyCtrl'
		}).
    when('/formsDoublePanel', {
			templateUrl: 'app/views/formsDoublePanel.html',
			controller: 'EmptyCtrl'
		}).
    when('/maps', {
			templateUrl: 'app/views/maps.html',
			controller: 'MapsCtrl'
		}).
    when('/dialogs', {
			templateUrl: 'app/views/dialogs.html',
			controller: 'DialogsCtrl'
		}).
    when('/notifications', {
			templateUrl: 'app/views/notifications.html',
			controller: 'NotificationsCtrl'
		}).
		otherwise({
			redirectTo: '/dashboard'
		});

	//$locationProvider.html5Mode(true);

}]);
