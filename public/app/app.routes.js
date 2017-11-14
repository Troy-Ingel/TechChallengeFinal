angular
.module('mainApp')
.config(routeConfigSettings);

routeConfigSettings.$inject = ['$routeProvider'];

function routeConfigSettings($routeProvider){
	$routeProvider.when('/', {
		templateUrl: 'app/views/entry.html',
		controller: 'entryController'
	}).when('/places', {
		templateUrl: 'app/views/places.html',
		controller: 'placesController'
	}).when('/activities', {
		templateUrl: 'app/views/activities.html',
		controller: 'activityController'
	}).when('/directions', {
		templateUrl: 'app/views/directions.html',
		controller: 'directionsController'
	})
}
