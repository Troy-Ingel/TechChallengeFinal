angular
.module('mainApp')
.controller('homeController', homeController);

homeController.$inject = ['$location'];

function homeController($location){

	var vm = this;

	vm.goToPage = goToPage;

	///////////////

	function goToPage(path){
		$location.path(path);
	}
}
