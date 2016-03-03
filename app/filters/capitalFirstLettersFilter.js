kommunalApp.filter('capitalFirstLettersFilter', function($filter, transaction){
    return function(input){
        var out = transaction.capitalFirstLetters(input);
        return out;
    }
});
