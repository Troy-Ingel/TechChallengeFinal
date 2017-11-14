angular
.module('mainApp')
.controller('homeController', homeController);

homeController.$inject = ['$window', '$location', '$scope', '$interval', 'GeoLocationFactory', 'GoogleMapsFactory', 'CheckInFactory', 'PlaceFactory'];

function homeController($window, $location, $scope, $interval, GeoLocationFactory, GoogleMapsFactory, CheckInFactory, PlaceFactory){
	
	var map = undefined;
	var markers = [];
	var polyline = undefined;
	var infowindow = undefined;

	$scope.getCurrentPage = getCurrentPage;
	$scope.initMap = initMap;
	$scope.addMarker = addMarker;
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
		// CheckInFactory.getPeople().then(function(response){

		// 	people = response;

		// 	for(let i = 0; i < people.length; i++){
		// 		if(people[i]){

		// 			let curPerson = people[i];

		// 			let position = {
		// 				lat: parseFloat(curPerson.lat),
		// 				lng: parseFloat(curPerson.lon)
		// 			};

		// 			let status = curPerson.status;
		// 			let description = curPerson.first_name + ' ' + curPerson.last_name + '\n' + 'Status: ' + getStatusText(curPerson.status);
		// 			var marker = GoogleMapsFactory.addMarker(position, map, description, '', getMarkerColor(status));

		// 			marker.addListener('click', function(){
		// 				if(infowindow) infowindow.close();

		// 				infowindow = new google.maps.InfoWindow({
		// 					content: description
		// 				});

		// 				infowindow.open(map, this);
		// 			});

		// 			marker.personID = curPerson.id;
		// 			markers.push(marker);
		// 		}
		// 	}
		// });

		PlaceFactory.getCenters().then(function(response){
			console.log(response)
			for(var i = 0; i < response.length; i++){


				var currentPlace = response[i];

				if(currentPlace.location_1){
					var position = {
						lat: parseFloat(currentPlace.location_1.coordinates[1]),
						lng: parseFloat(currentPlace.location_1.coordinates[0])
					};

					// console.log(position)

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
		})
	}
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
	function addMarker(name, desc, lat, lon){
		let initial = name.substring(0, 1).toUpperCase();
		let position = {lat: parseFloat(lat), lng: parseFloat(lon)};

		var marker = GoogleMapsFactory.addMarker(position, map, name, initial, 'img/blue_marker.png');

		map.setZoom(8);
		map.setCenter(marker.getPosition());

		markers.push(marker);

		marker.addListener('click', function(){
			console.log(marker.getPosition());
		});
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