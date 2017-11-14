angular
	.module('mainApp')
	.controller('entryController', entryController);

entryController.$inject = ['$scope', 'ActivityFactory', '$cookies','GoogleMapsFactory'];

function entryController($scope, ActivityFactory, $cookies, GoogleMapsFactory){
	
	$scope.addActivity = addActivity;
	$scope.updating = false;

	activate();

	///////////

	function activate(){
		resetData();
	}
	function resetData(){
		$scope.data = {
			username: '',
			activityName: '',
			address: '',
			date: '',
			startTime: '',
			endTime: '',
			description: '',
			agency: ''
		};
	}
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