kommunalApp.filter('nameFilter', function(transaction){
    return function(input, type, keepMiddleNames){

        var out = transaction.capitalFirstLetters(input);
        if (type == "F"){
            out = transaction.setLastnameAfterFirstname(out);
            if (!keepMiddleNames){
                out = transaction.abbreviateMiddleNames(out);
            }
        }
        return out;
    }
});