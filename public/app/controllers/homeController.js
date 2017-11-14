angular
.module('mainApp')
.controller('homeController', homeController);

homeController.$inject = ['$window', '$location', '$scope', '$interval', 'GeoLocationFactory', 'GoogleMapsFactory', 'PlaceFactory', 'ActivityFactory'];

function homeController($window, $location, $scope, $interval, GeoLocationFactory, GoogleMapsFactory, PlaceFactory, ActivityFactory){
	
	var map = undefined;
	var markers = [];
	var polyline = undefined;
	var infowindow = undefined;

	$scope.PANELS = {
		MAP : {id: 0}, 
		ENTRY: {id: 1}, 
		PLACES : {id: 2},
		ACTIVITIES : {id: 3}, 
		DIRECTIONS: {id: 4}
	};

	$scope.activePanel = $scope.PANELS.MAP;

	$scope.getCurrentPage = getCurrentPage;
	$scope.initMap = initMap;
	$scope.showDirections = showDirections;
	$scope.updateMarkers = updateMarkers;

	activate();

	///////////

	function activate(){
		initMap();
		checkIfMobileDevice();
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
					zoom: 13,
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
						zoom: 13,
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

	function checkIfMobileDevice(){
		var check = false;
		(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
		$scope.isMobile = check;
	}
}