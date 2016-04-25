kommunalApp.controller('mapController', function ($scope) {
    $scope.countySelected = false;
    
    $scope.move = function(event){
        target     = angular.element(event.currentTarget)[0];
        setTimeout(function() {
        	self       = document.getElementsByClassName("tooltip");
            self       = self[self.length - 1];
        	var rect   = target.getBoundingClientRect();
            var vars   = {x: 0, y: 0};

        	if(self) {
                if(rect.x == undefined){
                    vars.x = rect.left;
                    vars.y = rect.top;
                }else vars = rect;
    	    	self.style.left    = vars.x + rect.width + 5 + "px";
    	    	self.style.top     = vars.y - 299 + window.scrollY + rect.height + "px";
    	    	self.style.display = "block";
        	}
        }, 10);
    }
});
