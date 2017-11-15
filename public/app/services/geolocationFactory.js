angular
.module('mainApp')
.factory('GeoLocationFactory', GeoLocationFactory);

GeoLocationFactory.$inject = ['$http'];

// set up the services needed for this factory
function GeoLocationFactory($http){

	var service = {
		getLocation: getLocation,
		calculateDistance: calculateDistance,
		locate: locate
	};

	return service;

	////////////////////

	// get current geolocation
	function getLocation(callback) {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(callback);
		} else {
			return undefined;
		}
	}
	function locate(){
		var url = '/directions/locate'

		return $http.get(url)
			.then((res)=>res.data)
			.catch((err)=>console.error(err));
	}
	// calculate the distance between two points, where the input
	// is given in lat and long
	function calculateDistance(latlng1, latlng2){
		var R = 6371e3; // metres
		var φ1 = toRadians(latlng1.lat);
		var φ2 = toRadians(latlng2.lat);
		var Δφ = toRadians(latlng2.lat-latlng1.lat);
		var Δλ = toRadians(latlng2.lon-latlng1.lon);

		var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
		Math.cos(φ1) * Math.cos(φ2) *
		Math.sin(Δλ/2) * Math.sin(Δλ/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

		var d = R * c;

		return d/1000;
	}
	// convert an angle to radians
	function toRadians (angle) {
		return angle * (Math.PI / 180);
	}
}