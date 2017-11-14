angular
	.module('mainApp')
	.factory('PlaceFactory', PlaceFactory);

PlaceFactory.$inject = ['$http'];

// set up the services needed for this factory
function PlaceFactory($http){

	var service = {
		getCenters: getCenters
	};

	return service;

	////////////////////

	function getCenters(){
		return $http.get('/places/centers')
			.then((res)=>res.data)
			.catch((err)=>console.error(err));
	}
}