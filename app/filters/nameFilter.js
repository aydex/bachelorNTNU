kommunalApp.filter('nameFilter', function(transaction){
    return function(input, type, keepMiddleNames){

        var out = transaction.capitalFirstLetters(input);
    
        return out;
    }
});


