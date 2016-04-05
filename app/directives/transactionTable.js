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

            var prispunkt = scope.transaction.Sammendrag.split(",");
            var prispunktSanitized = [];
            var scores;
            var score = 0;
            var count = 0;
            var decrease = 1;
            var increase = 0;

            //Fjern punk der salgssum er null
            angular.forEach(prispunkt, function(entry){
                if (entry.split(":")[0] != 0){
                    prispunktSanitized.push(entry);
                }
            })

            prispunkt = prispunktSanitized

            for (var i = 0; i < prispunkt.length-1; i++) {
                score = 0;
                //Parse datostring
                var datestring = prispunkt[i].split(":")[1];
                var nextDateString = prispunkt[i+1].split(":")[1];
                var oneday = 24*60*60*1000;  // hours*minutes*seconds*milliseconds
                var currDateSplit = datestring.split("-");
                var date = new Date(currDateSplit[0],currDateSplit[1],currDateSplit[2]);
                var nextDateSplit = nextDateString.split("-");
                var nextDate = new Date(nextDateSplit[0],nextDateSplit[1],nextDateSplit[2]);

                var diffDays = Math.round(Math.abs((date.getTime() - nextDate.getTime())/(oneday)));

                var salgssum = prispunkt[i].split(":")[0];
                var nesteSalgssum = prispunkt[i+1].split(":")[0];
                var changePerDay = Math.pow((nesteSalgssum/salgssum), 1/diffDays);

                console.log("Score: " + score + " PD: " + changePerDay + " for " + diffDays + " days from " + datestring + " to " +nextDateString);

                if (changePerDay >= 1){
                    console.log("INC");
                    if (changePerDay - 1 > increase){
                        increase = changePerDay - 1;
                    }
                } else {
                    console.log("DEC");
                    if (1- changePerDay < decrease){
                        decrease = 1- changePerDay;
                    }
                }
                
                scores = scores + ", " + score;
            }

            var validIncrease = (increase != 0);
            var validDecrease = (decrease != 1);
            var decimalInc = increase * 365;
            var decimalDec = decrease * 365;
            increase = decimalInc * 100;
            decrease = decimalDec * 100;
            decrease = Math.round(decrease * 100) / 100;
            increase = Math.round(increase * 100) / 100;



            if (validIncrease){
                increase = "+"+ increase +"% ";
            }else{
                increase = ""
            }
            if (validDecrease){
                decrease = "-" + decrease + "%";
            }else {
                decrease = ""
            }
            
            var incColor = Math.round(255 * decimalInc);
            var decColor = Math.round(255 * decimalDec);

            if (incColor > 255){incColor = 255};
            if (decColor > 255){decColor = 255};

            scope.transaction.IncStyle = "rgba("+ incColor + ",0,0,1)";
            scope.transaction.DecStyle = "rgba("+ decColor + ",0,0,1)";
            scope.transaction.MaxIncrease = increase;
            scope.transaction.MaxDecrease = decrease;


        }
    }
});