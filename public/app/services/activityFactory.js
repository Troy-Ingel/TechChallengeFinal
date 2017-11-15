angular
	.module('mainApp')
	.factory('ActivityFactory', ActivityFactory);

ActivityFactory.$inject = ['$http'];

// set up the services needed for this factory
function ActivityFactory($http){

	var service = {
		get: get,
		add: add
	};

	return service;

	////////////////////

	// get all activities from the server
	function get(){
		return $http.get('/activities')
			.then((res)=>res.data)
			.catch((err)=>console.error(err));
	}
	// post new activity to the server
	function add(data){
		return $http.post('/activities', data)
			.then((res)=>res.data)
			.catch((err)=>console.error(err));
	}
}