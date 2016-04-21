kommunalApp.controller('mapController', function ($scope) {
    $scope.countySelected = false;
    
    $scope.move = function(evt){
    	console.log(evt);
    	self = document.getElementsByClassName("tooltip")[0];
    	if(self) {
	    	self.style.left = evt.pageX - (self.offsetWidth / 2) + "px";
	    	self.style.top = evt.pageY - 285 + "px";
	    	self.style.display = "block";
    	}
    }
});
