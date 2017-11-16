angular
	.module('mainApp')
	.controller('activityController', activityController);

activityController.$inject = ['$scope', '$location', 'ActivityFactory'];

function activityController($scope, $location, ActivityFactory){

	$scope.showDirections = showDirections;

	activate();

	///////////

	// set up initial values
	function activate(){
		ActivityFactory.get().then(function(response){
			$scope.activities = response;
		});
	}
	// show the directions page
	function showDirections(activity){
		$scope.$parent.destination = activity.agency + ', ' + activity.address;
		$location.path('/directions');
	}
}