angular
	.module('mainApp')
	.controller('entryController', entryController);

entryController.$inject = ['$scope', 'ActivityFactory', '$cookies','GoogleMapsFactory'];

function entryController($scope, ActivityFactory, $cookies, GoogleMapsFactory){
	
	$scope.data = {};
	$scope.addActivity = addActivity;
	$scope.updating = false;

	activate();

	///////////

	function activate(){
		// $scope.statusSet = $cookies.get('statusSet');

		// if($scope.statusSet){
		// 	ActivityFactory.getPerson($scope.statusSet).then(function(response){
		// 		$scope.data.first_name = response.first_name;
		// 		$scope.data.last_name = response.last_name;
		// 		$scope.data.status = response.status;
		// 	});
		// }
	}
	function addActivity(){

		// if($scope.statusSet){
		// 	ActivityFactory.updateStatus($scope.statusSet, $scope.data.status).then(function(response){
		// 		$scope.$parent.updateMarkers();
		// 	});
		// } else{
			
		GoogleMapsFactory.geocodeAddress($scope.data.address, function(position){
			$scope.data.lat = position.lat;
			$scope.data.lon = position.lng;

			ActivityFactory.add($scope.data).then(function(response){
				$scope.statusSet = true;
				$scope.$parent.updateMarkers();
			});
		});
	}
}