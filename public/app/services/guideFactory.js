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

	function get(){
		return $http.get('/tech-guides')
			.then((res)=>res.data)
			.catch((err)=>console.error(err));
	}
	function add(data){
		return $http.post('/tech-guides', data)
			.then((res)=>res.data)
			.catch((err)=>console.error(err));
	}
}