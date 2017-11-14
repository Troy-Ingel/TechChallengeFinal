angular
	.module('mainApp')
	.controller('dashboardController', dashboardController);

dashboardController.$inject = ['$scope', '$window', 'ReminderFactory'];

function dashboardController($scope, $window, ReminderFactory){

	$scope.data = {};
	$scope.goToPage = goToPage;
	$scope.addReminder = addReminder;
	$scope.deleteReminder = deleteReminder;

	activate();

	///////////

	function activate(){
		updateReminders();
	}
	function goToPage(page){
		$window.location.href = page;
	}
	function updateReminders(){
		$scope.reminders = ReminderFactory.get();
	}
	function addReminder(){
		if($scope.data.name && $scope.data.date){
			ReminderFactory.add($scope.data);
			updateReminders();
		}
	}
	function deleteReminder(id){
		ReminderFactory.remove(id);
		updateReminders();
	}
}