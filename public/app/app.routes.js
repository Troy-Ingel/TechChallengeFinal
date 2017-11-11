angular
	.module('mainApp')
	.config(routeConfigSettings);

routeConfigSettings.$inject = ['$routeProvider'];

function routeConfigSettings($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'app/views/home.html',
		controller: 'homeController',
		controllerAs: 'vm'
	}).when('/map', {
		templateUrl: 'app/views/map.html',
		controller: 'mapController',
		controllerAs: 'vm'
	}).otherwise({
		templateUrl: 'app/views/home.html',
		controller: 'homeController',
		controllerAs: 'vm'
	});
}
