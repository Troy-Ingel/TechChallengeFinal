angular
	.module('mainApp')
	.controller('dashboardController', dashboardController);

dashboardController.$inject = ['$scope', 'ReminderFactory'];

function dashboardController($scope, ReminderFactory){

	$scope.data = {};
	$scope.addReminder = addReminder;
	$scope.deleteReminder = deleteReminder;

	activate();

	///////////

	function activate(){
		updateReminders();
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