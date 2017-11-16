angular
	.module('mainApp')
	.controller('entryController', entryController);

entryController.$inject = ['$scope', '$window', 'ActivityFactory','GoogleMapsFactory'];

function entryController($scope, $window, ActivityFactory, GoogleMapsFactory){
	
	var vm = this;

	vm.data = {};
	
	vm.addActivity = addActivity;

	activate();

	///////////

	// set up initial values
	function activate(){
		resetData();
	}
	// clear the entry form
	function resetData(){
		vm.data = {
			username: '',
			activityName: '',
			address: '',
			date: '',
			startTime: '',
			endTime: '',
			description: '',
			agency: ''
		};
	}
	// add activity to the view and database
	function addActivity(){
		if(vm.data.address){
			GoogleMapsFactory.geocodeAddress(vm.data.address, function(position){
				vm.data.lat = position.lat;
				vm.data.lon = position.lng;

				ActivityFactory.add(vm.data).then(function(response){
					$scope.$parent.updateMarkers();
					$location.path('/activities');
				});
			});
		}
	}
}