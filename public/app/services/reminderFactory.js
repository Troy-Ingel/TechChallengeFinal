angular
	.module('mainApp')
	.factory('ReminderFactory', ReminderFactory);

ReminderFactory.$inject = ['$cookies'];

// set up the services needed for this factory
function ReminderFactory($cookies){

	const cookieName = 'reminders';

	var service = {
		get: get,
		add: add,
		remove: remove
	};

	return service;

	////////////////////

	function get(){
		var data = $cookies.get(cookieName);
		return data ? JSON.parse(data) : [];
	}
	function save(data){
		console.log(data);
		if(data){
			$cookies.put(cookieName, JSON.stringify(data));
		}
	}
	function add(data){
		if(data){
			var cur = get();
			cur.push(data);
			console.log('cur', cur);
			save(cur);
		}
	}
	function remove(id){
		console.log(id)
		if(id){
			var cur = get();

			if(cur && cur.length > 0){
				for(var i = 0; i < cur.length; i++){
					if(cur[i].name == id){
						cur.splice(i, 1);
						return save(cur);
					}
				}
			}
		}
	}
}