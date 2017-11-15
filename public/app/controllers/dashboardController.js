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

	// set up initial values
	function activate(){
		updateReminders();
	}
	// control the current page
	function goToPage(page){
		$window.location.href = page;
	}
	// update the displayed reminders
	function updateReminders(){
		$scope.reminders = ReminderFactory.get();
	}
	// attempt to add reminder
	function addReminder(){
		if($scope.data.name && $scope.data.date){
			ReminderFactory.add($scope.data);
			updateReminders();
		}
	}
	// delete reminder 
	function deleteReminder(id){
		ReminderFactory.remove(id);
		updateReminders();
	}
}