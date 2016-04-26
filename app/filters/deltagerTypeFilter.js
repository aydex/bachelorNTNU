kommunalApp.filter('deltagerTypeFilter', function(){
    return function(typeKode){
        switch(typeKode){
            case "F": return "Privatperson"; break;
            case "L": return "Udefinert"; break;
            case "S": return "Selskap"; break;
            case "K": return "Kommune"; break;
        }
    }
});