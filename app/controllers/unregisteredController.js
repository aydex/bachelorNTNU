kommunalApp.controller('unregisteredController', function($scope, $cookies, $location) {
	if($cookies.get("name")) {
        $location.path("/");
    }
});