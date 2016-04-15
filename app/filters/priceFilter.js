kommunalApp.filter('priceFilter', function(){
    return function(input){

    	var firstChar = (String(input).substring(0,1));

    	if (firstChar == "+" || firstChar == "-"){
    		input = String(input).substring(1,input.length);
    	} else {
    		firstChar = ""
    	}
    	
        var lengde = input.length;
        var out = "";
        while (lengde >= 0){
            out = input.substring(lengde-3, lengde) + " " +out;
            lengde-=3;
        }


        return firstChar + out;
    }
});