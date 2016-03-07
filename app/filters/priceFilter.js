kommunalApp.filter('priceFilter', function(){
    return function(input){
        var lengde = input.length;
        var out = "";
        while (lengde >= 0){
            out = input.substring(lengde-3, lengde) + " " +out;
            lengde-=3;
        }
        return out;
    }
});