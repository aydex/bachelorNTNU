kommunalApp.controller('mainController', function($scope, $cookies, $location, $routeParams) {
    $scope.activeTab = 1;

    $scope.changeTab = function(index) {
    	$scope.activeTab = index;
    }
});