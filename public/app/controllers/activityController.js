angular
	.module('mainApp')
	.controller('activityController', activityController);

activityController.$inject = ['$scope', '$location', 'ActivityFactory'];

function activityController($scope, $location, ActivityFactory){

	$scope.showDirections = showDirections;

	activate();

	///////////

	function activate(){
		ActivityFactory.get().then(function(response){
			$scope.activities = response;
		});
	}
	function showDirections(activity){
		$scope.$parent.destination = activity.lat + ', ' + activity.lng;
		$location.path('/directions');
	}
}