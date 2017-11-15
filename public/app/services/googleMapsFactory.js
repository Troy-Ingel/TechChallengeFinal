angular
	.module('mainApp')
	.factory('GoogleMapsFactory', GoogleMapsFactory);

GoogleMapsFactory.$inject = ['$http'];

// set up the services needed for this factory
function GoogleMapsFactory($http){

	var service = {
		createMap: createMap,
		addMarker: addMarker,
		addListener: addListener,
		addMarkerListener: addMarkerListener,
		geocodeAddress: geocodeAddress,
		getDirections: getDirections,
		reverseGeocode: reverseGeocode
	};

	return service;

	/////////// JavaScript Map /////////

	function createMap(elementID, options){
		return new google.maps.Map(document.getElementById(elementID), options);
	}
	function addMarker(position, map, title, label, icon){
		var marker = new google.maps.Marker({
			position: position,
			map: map,
			title: title,
			label: label,
			icon: icon,
		});

		return marker;
	}
	// this functions sets up a listener on the map, which is triggered by the specified event
	function addListener(map, event, callback){
		map.addListener(event, callback);
	}
	// this functions sets up a listener on a map marker, which is triggered by the specified event
	function addMarkerListener(marker, event, callback){
		marker.addListener(event, callback);
	}
	// this functions gets the geocode of an address
	function geocodeAddress(address, callback){
		geocoder = new google.maps.Geocoder();

        geocoder.geocode({'address': address}, function(results, status) {
        	var location = results[0].geometry.location;
        	callback({
        		lat: location.lat(),
        		lng: location.lng()
        	});
        });
	}

	//////// Transit ////////

	// get directions from the origin to destination. The mode specified 
	// will be driving, walking or transit.
	function getDirections(origin, destination, mode){
		var url = '/directions?mode=' + mode + '&origin=' + origin + '&destination=' + destination;

		return $http.get(url)
			.then((res)=>res.data.routes)
			.catch((err)=>console.error(err));
	}
	// find the location details from lat and long
	function reverseGeocode(lat, long){
		var url = '/directions/geocode?latlng=' + lat.toString() + ',' + long.toString();

		return $http.get(url)
			.then((res)=>res.data)
			.catch((err)=>console.error(err));
	}
}