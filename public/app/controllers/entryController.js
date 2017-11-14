angular
	.module('mainApp')
	.controller('entryController', entryController);

entryController.$inject = ['$scope', 'ActivityFactory', '$cookies','GoogleMapsFactory'];

function entryController($scope, ActivityFactory, $cookies, GoogleMapsFactory){
	
	$scope.data = {};
	$scope.addActivity = addActivity;
	$scope.updating = false;

	///////////

	function addActivity(){
		GoogleMapsFactory.geocodeAddress($scope.data.address, function(position){
			$scope.data.lat = position.lat;
			$scope.data.lon = position.lng;

			ActivityFactory.add($scope.data).then(function(response){
				$scope.$parent.updateMarkers();
			});
		});
	}
}