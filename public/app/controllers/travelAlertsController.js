angular
.module('mainApp')
.controller('travelAlertsController', travelAlertsController);

travelAlertsController.$inject = ['$scope', 'TravelAlertsFactory', 'GeoLocationFactory', 'GoogleMapsFactory'];

function travelAlertsController($scope, TravelAlertsFactory, GeoLocationFactory, GoogleMapsFactory){
	var infowindow = undefined;
	var map = undefined;
	var events = [];
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
			//initMap();
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
	function initMap(){
		GeoLocationFactory.getLocation(function(position){
			var myLatlng = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			map = GoogleMapsFactory.createMap('map', {
				zoom: 13,
				center: myLatlng
			});
			loadMarkers();
		})
	}

	// set up the map markers
	function loadMarkers(){
		for(var i = 0; i < $scope.events.length; i++){
			var currentPlace = events[i];
				// check if event has location information
				if(currentPlace.Latitude && currentPlace.Longitude){
					var position = {
						lat: parseFloat(currentPlace.Latitude),
						lng: parseFloat(currentPlace.Longitude)
					};

					var description = currentPlace.RoadwayName + ' | ' + currentPlace.Location;
					var marker = GoogleMapsFactory.addMarker(position, map, description, '', 'img/red_marker.png');

				// add a click listener to each marker so that a tooltip is displayed
				marker.addListener('click', function(){
					if(infowindow) infowindow.close();

					infowindow = new google.maps.InfoWindow({
						content: description
					});

					infowindow.open(map, this);
				});
			}
		}
	}

}