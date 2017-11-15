angular
	.module('mainApp')
	.controller('technologyGuidesController', technologyGuidesController);

technologyGuidesController.$inject = ['$scope', 'GuideFactory'];

function technologyGuidesController($scope, GuideFactory){

	$scope.selectedPost = {};
	$scope.showPostEntry = false;
	$scope.componentToShow = 'posts'; //posts, entry, post

	$scope.components = {'posts':1, 'entry':1, 'post':1};

	$scope.addPost = addPost;
	$scope.viewPost = viewPost;
	$scope.viewComponent = viewComponent;

	activate();

	///////////
	function activate(){
		getPosts();
	}
	function viewPost(post){
		console.log(post)
	}
	function viewComponent(component){
		if($scope.components[component]) $scope.componentToShow = component;
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