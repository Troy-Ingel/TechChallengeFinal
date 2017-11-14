angular
	.module('mainApp')
	.controller('technologyGuidesController', technologyGuidesController);

technologyGuidesController.$inject = ['$scope', 'GuideFactory'];

function technologyGuidesController($scope, GuideFactory){

	$scope.showPostEntry = false;

	$scope.addPost = addPost;

	activate();

	///////////
	function activate(){
		getPosts();
	}
	function getPosts(){
		GuideFactory.get().then(function(res){
			$scope.posts = res;
		});
	}
	function addPost(){
		GuideFactory.add($scope.data).then(function(response){
			console.log(response);
		});
	}
}