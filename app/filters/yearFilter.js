kommunalApp.filter('yearFilter', function(){
    return function(input){
    	return input.split("-")[0];
    }
});
