kommunalApp.directive('transactionTable', function(){
    return{
        restrict: 'EA',
        replace: false,
        scope: {
            transaction: '='
        },
        templateUrl: 'views/transactionsTableRow.html',
        link: function(scope, element, attr) {
            var involvements = scope.transaction.Involvering.split(", ");
            var out = [];

            if (involvements.length > 5){
                var antKjopt = 0;
                var antSolgt = 0;
                angular.forEach(involvements, function(entry){
                    var type = entry.split(":")[1];
                    switch(type){
                        case "K":
                            antKjopt = antKjopt +1;
                            break;
                        case "S":
                            antSolgt = antSolgt +1;
                            break;
                    }
                })

                scope.transaction.involvements =  "Kjøper " + antKjopt +" ganger, selger " + antSolgt +" ganger";
            } else {
                angular.forEach(involvements, function(entry){
                    var year = entry.split(":")[0].split("-")[0];
                    var type = entry.split(":")[1];
                    if (year == "0001"){
                        year = "ukjent år";
                    }

                    if (type == "K"){
                        type = "Kjøpt";
                    } else if (type == "S"){
                        type = "Solgt";
                    }
                    out.push(type + " "+year);
                });
                scope.transaction.involvements = out.join(", ");
            }

            var involverteKommuner = scope.transaction.InvolverteKommuner.split(", ");
            var out = [];
            angular.forEach(involverteKommuner, function(entry){
                var kommunenr = entry.split(":")[0];
                var kommunenavn = entry.split(":")[1];
                out.push({kommunenr: kommunenr, kommunenavn: kommunenavn});
            })

            scope.transaction.InvolverteKommuner = out;
            console.log(scope.transaction.InvolverteKommuner)
        }
    }
});