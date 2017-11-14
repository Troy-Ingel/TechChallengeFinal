angular
	.module('mainApp')
	.controller('tvGuideController', tvGuideController);

tvGuideController.$inject = ['$scope', 'TVGuideFactory'];

function tvGuideController($scope, TVGuideFactory){

	$scope.secondsToDate = secondsToDate;

	activate();

	///////////

	function activate(){
		TVGuideFactory.getCurrent().then(function(response){
			$scope.listings = response;
		});
	}
	function secondsToDate(seconds){
		var date = new Date(seconds * 1000);
		return ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
	}
}