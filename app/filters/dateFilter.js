kommunalApp.filter('dateFilter', function(){
    return function(input){
    	var mnd = ["jan", "feb", "mar", "apr", "mai","jun", "jul","aug","sep","okt","nov","des"];
    	var date = new Date(input.split("-")[0],input.split("-")[1]-1,input.split("-")[2])
    	return date.getDay() +". "+ mnd[date.getMonth()] +" "+ date.getFullYear();
    	 
    }
});
