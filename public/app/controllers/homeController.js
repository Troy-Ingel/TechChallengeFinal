angular
.module('mainApp')
.controller('homeController', homeController);

homeController.$inject = ['$window', '$location', '$scope', '$interval', 'GeoLocationFactory', 'GoogleMapsFactory', 'PlaceFactory', 'ActivityFactory'];

function homeController($window, $location, $scope, $interval, GeoLocationFactory, GoogleMapsFactory, PlaceFactory, ActivityFactory){
	
	var map = undefined;
	var markers = [];
	var polyline = undefined;
	var infowindow = undefined;

	$scope.getCurrentPage = getCurrentPage;
	$scope.initMap = initMap;
	$scope.showDirections = showDirections;
	$scope.updateMarkers = updateMarkers;

	activate();

	///////////

	function activate(){
		initMap();
	}
	function initMap() {
		$scope.loading = true;

		GeoLocationFactory.getLocation(function(pos){

			if(pos){
				$scope.$apply(function(){
					$scope.loading = false;
				});

				$scope.lat = pos.coords.latitude;
				$scope.lon = pos.coords.longitude;

				GoogleMapsFactory.reverseGeocode($scope.lat, $scope.lon).then(function(response){
					$scope.currentAddress = response.results[0].formatted_address;
				});

				var myLatlng = {
					lat: pos.coords.latitude,
					lng: pos.coords.longitude
				};

				map = GoogleMapsFactory.createMap('map', {
					zoom: 11,
					center: myLatlng
				});

				loadMarkers();

				GoogleMapsFactory.addMarker(myLatlng, map, 'Title', 'Me');
			} else{
				GeoLocationFactory.locate().then(function(response){
					var location = response.location;
					$scope.lat = location.lat;
					$scope.lon = location.lng;


					$scope.$apply(function(){
						$scope.loading = false;
					});

					GoogleMapsFactory.reverseGeocode($scope.lat, $scope.lon).then(function(response){
						$scope.currentAddress = response.results[0].formatted_address;
					});

					var myLatlng = {
						lat: pos.coords.latitude,
						lng: pos.coords.longitude
					};

					map = GoogleMapsFactory.createMap('map', {
						zoom: 11,
						center: myLatlng
					});

					loadMarkers();

					GoogleMapsFactory.addMarker(myLatlng, map, 'Title', 'Me');
				});
			}
		});
	}
	function getMarkerColor(status){
		if(status == 'G'){
			return 'img/green_marker.png';
		}
		else if(status == 'I'){
			return 'img/yellow_marker.png';
		}else{
			return 'img/red_marker.png';
		}
	}
	function getStatusText(status){
		if(status == 'G'){
			return 'Good';
		}
		else if(status == 'I'){
			return 'May need assistance';
		}else{
			return 'HELP ME';
		}
	}
	function getCurrentPage(){
		return $location.path();
	}
	function loadMarkers(){
		PlaceFactory.getCenters().then(function(response){
			for(var i = 0; i < response.length; i++){

				var currentPlace = response[i];

				if(currentPlace.location_1){
					var position = {
						lat: parseFloat(currentPlace.location_1.coordinates[1]),
						lng: parseFloat(currentPlace.location_1.coordinates[0])
					};

					currentPlace.distance = GeoLocationFactory.calculateDistance({
						lat: $scope.lat,
						lon: $scope.lon
					}, {
						lat: position.lat,
						lon: position.lng
					});

					var description = currentPlace.agency;
					var marker = GoogleMapsFactory.addMarker(position, map, description, '', 'img/blue_marker.png');

					marker.place = currentPlace;

					marker.addListener('click', function(){
						if(infowindow) infowindow.close();

						infowindow = new google.maps.InfoWindow({
							content: this.place.agency
						});

						infowindow.open(map, this);

						var place = this.place; 
						$scope.destination = place.town_city + ', ' + place.st + ' ' + place.tel;
						$location.path('/directions');
						$scope.$apply();
					});

					markers.push(marker);
				}
			}

			$scope.places = response;
		});

		ActivityFactory.get().then(function(response){
			for(var i = 0; i < response.length; i++){

				var currentActivity = response[i];

				if(currentActivity.lat && currentActivity.lon){

					var position = {
						lat: parseFloat(currentActivity.lat),
						lng: parseFloat(currentActivity.lon)
					};

					currentActivity.distance = GeoLocationFactory.calculateDistance({
						lat: $scope.lat,
						lon: $scope.lon
					}, {
						lat: position.lat,
						lon: position.lng
					});

					var description = currentActivity.activityName + ', ' + currentActivity.agency;
					var marker = GoogleMapsFactory.addMarker(position, map, description, '', 'img/green_marker.png');

					marker.activity = currentActivity;

					marker.addListener('click', function(){
						if(infowindow) infowindow.close();

						infowindow = new google.maps.InfoWindow({
							content: this.activity.activityName + ', ' + this.activity.agency
						});

						infowindow.open(map, this);

						var activity = this.activity; 
						$scope.destination = activity.agency + ', ' + activity.address;
						$location.path('/directions');
						$scope.$apply();
					});

					markers.push(marker);
				} else{
					console.error("Lat and lon not found in activity", currentActivity)
				}
			}

			$scope.places = response;
		})
	};
	function updateMarkers(){
		clearMarkers();
		loadMarkers();
	}
	function clearMarkers(){
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
		}

		markers = [];
	}
	
	function showDirections(legs){
		if(polyline) polyline.setMap(null);

		var coordinates = [{lat: $scope.lat, lng: $scope.lon}];

		var steps = legs[0].steps;

		for (j = 0; j < steps.length; j++) {
			var currentStep = steps[j];

			coordinates.push({
				lat: currentStep.end_location.lat,
				lng: currentStep.end_location.lng,
			});
		}

		polyline = new google.maps.Polyline({
			path: coordinates,
			geodesic: true,
			strokeColor: '#FF0000',
			strokeOpacity: 1.0,
			strokeWeight: 2
		});

		polyline.setMap(map);
	}
}