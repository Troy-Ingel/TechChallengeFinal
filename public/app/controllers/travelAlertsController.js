angular
.module('mainApp')
.controller('travelAlertsController', travelAlertsController);

travelAlertsController.$inject = ['$scope', 'TravelAlertsFactory', 'GeoLocationFactory', 'GoogleMapsFactory'];

function travelAlertsController($scope, TravelAlertsFactory, GeoLocationFactory, GoogleMapsFactory){
	var infowindow = undefined;
	var map = undefined;
	var events = [];
	$scope.initMap = initMap;
	$scope.addSpacesToCamelCase = addSpacesToCamelCase;
	$scope.PANELS = {
		TABLE : {id: 0}, 
		MAP: {id: 1}, 
	};
	$scope.activePanel = $scope.PANELS.TABLE;

	activate();

	///////////

	function activate(){
		$scope.loading = true;
		
		TravelAlertsFactory.getEvents().then(function(res){
			$scope.events = res;
			events = res;
			$scope.loading = false;
		});

		TravelAlertsFactory.getAlerts().then(function(res){
			$scope.alerts = res;
		});
	}
	function addSpacesToCamelCase(string){
		return string
		.replace(/([A-Z])/g, ' $1')
		.replace(/^./, function(str){ return str.toUpperCase(); });
	}
}