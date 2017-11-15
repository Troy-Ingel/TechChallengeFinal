angular
	.module('mainApp')
	.factory('TVGuideFactory', TVGuideFactory);

TVGuideFactory.$inject = ['$http'];

// set up the services needed for this factory
function TVGuideFactory($http){

	var service = {
		getCurrent: getCurrent
	};

	return service;

	////////////////////

	// get the current tv listings
	function getCurrent(){
		return $http.get('/tv-guide/current')
			.then((res)=>res.data)
			.catch((err)=>console.error(err));
	}
}