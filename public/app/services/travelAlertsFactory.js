angular
	.module('mainApp')
	.factory('TravelAlertsFactory', TravelAlertsFactory);

TravelAlertsFactory.$inject = ['$http'];

// set up the services needed for this factory
function TravelAlertsFactory($http){
	var service = {
		getAlerts: getAlerts,
		getEvents: getEvents
	};

	return service;

	////////////////////

	function getAlerts(){
		return $http.get('/travel/alerts')
			.then((res)=>res.data)
			.catch((err)=>console.error(err));
	}
	function getEvents(){
		return $http.get('/travel/events')
			.then((res)=>res.data)
			.catch((err)=>console.error(err));
	}
}