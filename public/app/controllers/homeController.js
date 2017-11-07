angular
.module('mainApp')
.controller('homeController', homeController);

homeController.$inject = ['GeoLocationFactory', '$scope'];

function homeController(GeoLocationFactory, $scope){

	$scope.loading = false;

	var map = undefined;

	activate();

	///////////////

	function activate(){
		initMap();
	}
	function initMap() {
		$scope.loading = true;

		GeoLocationFactory.getLocation(function(pos){

			$scope.$apply(function(){
				$scope.loading = false;
			});

			var myLatlng = {
				lat: pos.coords.latitude,
				lng: pos.coords.longitude
			};

			map = new google.maps.Map(document.getElementById('map'), {
				zoom: 11,
				center: myLatlng
			});

			var marker = new google.maps.Marker({
				position: myLatlng,
				map: map,
				title: 'Click to zoom',
				label: 'Me'
			});

			map.addListener('center_changed', function() {
				window.setTimeout(function() {
					map.panTo(marker.getPosition());
				}, 3000);
			});

			marker.addListener('click', function() {
				map.setZoom(11);
				map.setCenter(marker.getPosition());
			});
		});
	}
}
