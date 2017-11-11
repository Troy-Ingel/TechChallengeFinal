angular
.module('mainApp')
.controller('mapController', mapController);

mapController.$inject = ['GeoLocationFactory', 'GoogleMapsFactory', '$scope'];

function mapController(GeoLocationFactory, GoogleMapsFactory, $scope){

	$scope.loading = false;

	var map = undefined;

	activate();

	///////////////

	function activate(){
		initMap();
	}
	function initMap() {
		$scope.loading = true;

		GeoLocationFactory.getLocation(function(pos){

			$scope.$apply(function(){
				$scope.loading = false;
			});

			var myLatlng = {
				lat: pos.coords.latitude,
				lng: pos.coords.longitude
			};

			map = GoogleMapsFactory.createMap('map', {
				zoom: 11,
				center: myLatlng
			});

			GoogleMapsFactory.addMarker(myLatlng, map, 'Title', 'Me');
		});

	}
}
