angular
	.module('mainApp')
	.factory('GoogleMapsFactory', GoogleMapsFactory);

GoogleMapsFactory.$inject = [];

// set up the services needed for this factory
function GoogleMapsFactory(){

	var service = {
		createMap: createMap,
		addMarker: addMarker,
		addListener: addListener,
		geocodeAddress: geocodeAddress
	};

	return service;

	////////////////////

	function createMap(elementID, options){
		return new google.maps.Map(document.getElementById(elementID), options);
	}
	function addMarker(position, map, title, label){
		return new google.maps.Marker({
			position: position,
			map: map,
			title: title,
			label: label
		});
	}
	function addListener(map, event, callback){
		map.addListener(event, callback);
	}
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
}