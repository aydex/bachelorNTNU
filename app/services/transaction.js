kommunalApp.factory('transaction', function() {
    var transactionService = {};

    transactionService.setLastnameAfterFirstname = function(name){
        var forNavn = name.substring(name.indexOf(" "), name.length);
        var etterNavn = name.substring(0, name.indexOf(" "));
        return forNavn + " " + etterNavn
    };

    transactionService.capitalFirstLetters = function(word){
        return word.replace(/[\S]+/g, function(innerWord){
            return innerWord.substring(0,1).toUpperCase() + innerWord.substring(1, innerWord.length).toLowerCase();
        });
    };

    transactionService.abbreviateMiddleNames = function(name){
        var navn = name.split(/\s+(?=\S)/);
        if (navn[0] == ""){
            navn.splice(0,1);
        }

        if (navn.length > 2){
            for (var i = navn.length - 2; i >= 1; i--) {
                navn[i] = navn[i].substring(0,1) + ".";
            }
        }
        return navn.join(" ");
    };

    transactionService.isMunicipality = function(type, name){
        return (type == "K");
    };

    transactionService.getRole = function(transaction, role) {

        var part = {
            deltagertype: "",
            navn        : "",
            kommune     : false,
            role        : ""
        };
        var kommune = false;

        if(transaction.buyer.length > 0){
            angular.forEach(transaction.buyer, function(value, key) {
                part.navn         = value.navn;
                part.deltagertype = value.deltagertype;
                part.kommune      = transactionService.isMunicipality(part.deltagertype, part.navn);
                if(part.kommune){
                    part.role = "har kjøpt";
                    kommune   = true;
                    return
                }
            });
        }
        if(!kommune){
            if(transaction.seller.length > 0){
                angular.forEach(transaction.seller, function(value, key) {
                    part.navn         = value.navn;
                    part.deltagertype = value.deltagertype;
                    part.kommune      = transactionService.isMunicipality(part.deltagertype, part.navn);
                    if(part.kommune){
                        part.role = "har solgt";
                    }
                });
            }
        }

        return part;
    };

    return transactionService;
});