angular
	.module('mainApp')
	.factory('GuideFactory', GuideFactory);

GuideFactory.$inject = ['$http'];

// set up the services needed for this factory
function GuideFactory($http){

	var service = {
		get: get,
		add: add
	};

	return service;

	////////////////////

	// get all the saved tech guides from the server
	function get(){
		return $http.get('/tech-guides')
			.then((res)=>res.data)
			.catch((err)=>console.error(err));
	}
	// post a new tech guide to the server
	function add(data){
		return $http.post('/tech-guides', data)
			.then((res)=>res.data)
			.catch((err)=>console.error(err));
	}
}