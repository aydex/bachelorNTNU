kommunalApp.filter('dateOnlyFilter', function(){
    return function(input){
    	var mnd = ["Januar", "Februar", "Mars", "April", "Mai","Juni", "Juli","August","September","Oktober","November","Desember"];
    	var date = new Date(input.split("-")[0],input.split("-")[1]-1,input.split("-")[2])
    	return date.getDay() +". "+ mnd[date.getMonth()]
    	 
    }
});
