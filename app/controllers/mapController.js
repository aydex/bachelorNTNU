kommunalApp.controller('mapController', function ($scope) {
    $scope.countySelected = false;
    
    $scope.move = function(evt){
    	self = document.getElementsByClassName("tooltip")[0];
    	var rect = evt.path[0].getBoundingClientRect();

    	if(self && evt.path[0].tagName == "path") {
	    	self.style.left = rect.left + rect.width + 5 + "px";
	    	self.style.top = rect.top - 285 + window.scrollY + rect.height + "px";
	    	self.style.display = "block";
    	}
    }
});
