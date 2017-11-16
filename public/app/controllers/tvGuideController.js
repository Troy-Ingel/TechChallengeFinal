angular
	.module('mainApp')
	.controller('tvGuideController', tvGuideController);

tvGuideController.$inject = ['$scope', 'TVGuideFactory'];

function tvGuideController($scope, TVGuideFactory){

	$scope.secondsToDate = secondsToDate;
	$scope.getTimes = getTimes;

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
	function getTimes(){
		var times = [];
		var currentHour = (new Date()).getHours();

		for(var i = 0; i < 5; i++){
			if(i % 2 == 0){
				times.push(currentHour + ':00');
			} else{
				times.push(currentHour + ':30');
				currentHour++;
			}
		}
		return times;
	}
}