kommunalApp.directive('transactionTable', function($filter){
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

            /*
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
                
            }
            */

            var involverteKommuner = scope.transaction.InvolverteKommuner.split(", ");
            var out = [];
            angular.forEach(involverteKommuner, function(entry){
                var kommunenr = entry.split(":")[0];
                var kommunenavn = entry.split(":")[1];
                out.push({kommunenr: kommunenr, kommunenavn: kommunenavn});
            })

            



            scope.transaction.InvolverteKommuner = out;
            var involveringer = [];
            var omsetninger = {};
            var keys = [];

            function Omsetning(salgssum, dokumentdato, dokumentnr, parttype, deltagertype) {
                this.salgssum = salgssum;
                this.dokumentdato = dokumentdato;
                this.dokumentnr = dokumentnr;
                this.parttype = parttype;
                this.deltagertype = deltagertype;
                this.isKommune = function(){return this.deltagertype == "K";}
                this.isKjoper = function(){return this.parttype == "K";}
                this.toString = function(){
                    if (this.isKjoper()){
                        return ("Kjøpt " + dokumentdato.getFullYear());
                    } else {
                        return ("Solgt " + dokumentdato.getFullYear());
                    }
                }
            }


            var prispunktSplit = scope.transaction.Historie.split(",");

            angular.forEach(prispunktSplit, function(entry){
                var split = entry.split(":");
                var currDateSplit = split[1].split("-");
                var date = new Date(currDateSplit[0], currDateSplit[1]-1, currDateSplit[2]);
                var omsetning = new Omsetning(split[0], date, split[2], split[3], split[4]);
                var currentDate = omsetninger[omsetning.dokumentdato];

                if (currentDate == undefined){
                    omsetninger[omsetning.dokumentdato] = {salgssum: 0, dokumentdato: null, kjopere:[], selgere:[]};
                    keys.push(omsetning.dokumentdato);
                }

                if (omsetning.isKommune()){
                    involveringer.push(omsetning);
                }

                omsetninger[omsetning.dokumentdato].salgssum = omsetning.salgssum;
                omsetninger[omsetning.dokumentdato].dokumentdato = date;
                if (omsetning.isKjoper()){
                    omsetninger[omsetning.dokumentdato].kjopere.push(omsetning);
                
                } else {
                    omsetninger[omsetning.dokumentdato].selgere.push(omsetning);
                }
            })

            var date_sort_asc = function (dato1, dato2) {
                if (dato1 > dato2) return 1;
                if (dato1 < dato2) return -1;
                return 0;
            };

            function niceTime(dager){
                if (dager > 365){
                    var aar = Math.round(dager/365);
                    return aar + " år";
                }

                if (dager > 30){
                    var mnd = Math.round(dager/30);
                    return mnd + " mnd";
                }
                return dager + " dager";
            }

            function daydiff(first, second) {
                var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
                return Math.round(Math.abs((first.getTime() - second.getTime())/(oneDay)));

                
            }

            function niceNumber(number){
                if (number >= 1000000000 || number <= -1000000000){
                    return (Math.round((number/1000000000) * 10) / 10) + " mrd."
                } else if (number >= 1000000 || number <= -1000000){
                    if (number >= 10000000 || number <= -10000000){
                        return Math.round(number/1000000)+ " mill.";
                    }
                    return (Math.round((number/1000000) * 10) / 10) + " mill."
                } else if (number >= 1000 || number <= -1000){
                    return Math.round(number/1000) + " k"
                }
                return $filter('priceFilter')(String(number));;
            }

            function changePerYear(first,second,days){
                var changePerDay = Math.pow((first/second), 1/days);
                return (changePerDay-1) *100 *365;
            }

            keys.sort(date_sort_asc);
            var lastSale;
            var lastBuy;
            var nextSale;

            for ( i = keys.length - 1; i >= 0; i--) {
                var currOmsetning = omsetninger[keys[i]];
                for (var j = currOmsetning.selgere.length - 1; j >= 0; j--) {
                    if (currOmsetning.selgere[j].isKommune()){
                        lastSale = (currOmsetning.selgere[j]);
                        if (i <= keys.length-2){
                            nextSale = (omsetninger[keys[i+1]].kjopere[0]);
                        }
                        break;
                    }
                }
                if ((lastSale != undefined)&&(lastBuy != undefined)){
                    break;
                }
            }
    
            var etterSalg ="";
            var changePerDay ="";

            if ((lastSale != undefined)&&(nextSale != undefined)){

                if ((lastSale.salgssum != 0)&&(nextSale.salgssum !=0)){
                    var lastSalePrice= parseInt(lastSale.salgssum);
                    var nextSalePrice= parseInt(nextSale.salgssum);
    
                    etterSalg = +nextSalePrice - +lastSalePrice;
                    var prefix = "";
                    if (etterSalg > 0){
                        prefix = "+"
                    }
    
                    etterSalg = niceNumber(etterSalg);
                    var diffDays = daydiff(lastSale.dokumentdato, nextSale.dokumentdato);
                    var changePercent = changePerYear(lastSalePrice,nextSalePrice,diffDays)

                    
                    etterSalg = prefix + etterSalg + " på " + niceTime(diffDays) + " (" + changePercent +")";


                }
            } 

       

            scope.transaction.etterSalg = etterSalg;
            scope.transaction.involvements = involveringer.join(", ");
        }
    }
});