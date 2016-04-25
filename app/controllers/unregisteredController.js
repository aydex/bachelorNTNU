kommunalApp.controller('unregisteredController', function($scope, $cookies, $location, $routeParams) {
    $scope.login = true;

    if($routeParams.code || $cookies.get("name")){
    	$scope.login = false;
    }
});