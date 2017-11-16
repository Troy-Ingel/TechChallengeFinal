angular
	.module('mainApp')
	.factory('ReminderFactory', ReminderFactory);

ReminderFactory.$inject = ['$cookies'];

// set up the services needed for this factory
function ReminderFactory($cookies){
	// use browser cookie to keep track of reminders
	const cookieName = 'reminders';

	var service = {
		get: get,
		add: add,
		remove: remove
	};

	return service;

	////////////////////

	// return the data associated with the cookie if it exists
	function get(){
		var data = $cookies.get(cookieName);
		return data ? JSON.parse(data) : [];
	}
	// map reminder data to the cookie
	function save(data){
		console.log(data);
		if(data){
			$cookies.put(cookieName, JSON.stringify(data));
		}
	}
	// add data to existing cookie
	function add(data){
		if(data){
			var cur = get();
			cur.push(data);
			console.log('cur', cur);
			save(cur);
		}
	}
	// remove a reminder from the data
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