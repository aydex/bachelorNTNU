kommunalApp.directive('transactionTable', function($filter){
    return{
        restrict: 'EA',
        replace: false,
        scope: {
            transaction: '='
        },
        templateUrl: 'views/transactionsTableRow.html',
        link: function(scope, element, attr) {
            scope.transaction.showInvolvementsShield = false;
            
            if (scope.transaction.Gatenavn != 0 && scope.transaction.Gatenavn != null){
                scope.transaction.adresse = $filter('capitalFirstLettersFilter')(scope.transaction.Gatenavn) + " " + scope.transaction.Husnr + scope.transaction.Bokstav + ", " + $filter('nameFilter')(scope.transaction.Poststed);
            }

            var involverteKommuner = scope.transaction.InvolverteKommuner.split(", ");
            var out = [];
            var kommnr_sort_asc = function (komm1, komm2) {
                if (komm1.kommnr > komm2.kommnr) return 1;
                if (komm1.kommnr < komm2.kommnr) return -1;
                return 0;
            };

            angular.forEach(involverteKommuner, function(entry){
                var kommunenr = entry.split(":")[0];
                var kommunenavn = entry.split(":")[1];
                out.push({kommnr: kommunenr, kommunenavn: kommunenavn});
            })
            out.sort(kommnr_sort_asc);
            scope.transaction.InvolverteKommuner = out;
            var involveringerKommnr = [];
            var involveringer = [];
            var omsetninger = {};
            var keys = [];

            function Omsetning(salgssum, dokumentdato, dokumentnr, parttype, deltagertype, kommunenr) {
                this.salgssum = salgssum;
                this.dokumentdato = dokumentdato;
                this.dokumentnr = dokumentnr;
                this.parttype = parttype;
                this.deltagertype = deltagertype;
                this.kommunenr = kommunenr;
                this.year = function(){
                    return dokumentdato.getFullYear();
                }
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
                var omsetning = new Omsetning(split[0], date, split[2], split[3], split[4], split[5]);

                var currentDate = omsetninger[omsetning.dokumentdato];
                if (currentDate == undefined){
                    omsetninger[omsetning.dokumentdato] = {salgssum: 0, dokumentdato: null, kjopere:[], selgere:[]};
                    keys.push(omsetning.dokumentdato);
                }

                if (omsetning.isKommune()){
                    var inv;
                    var index = involveringerKommnr.indexOf(omsetning.kommunenr);
                    if (index != -1){
                        inv = involveringer[index];
                    } else {
                        involveringerKommnr.push(omsetning.kommunenr);
                        inv = {kommnr: omsetning.kommunenr, kommuner: [], antK:0, antS:0};                    
                        involveringer.push(inv);
                    }
                    if (omsetning.isKjoper()){
                        inv.antK = inv.antK + 1;
                    } else {
                        inv.antS = inv.antS + 1;
                    };
                    inv.kommuner.push(omsetning);
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

             var date_sort_asc_internal = function (dato1, dato2) {
                if (dato1.dokumentdato > dato2.dokumentdato) return 1;
                if (dato1.dokumentdato < dato2.dokumentdato) return -1;
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
                var perYear;
                if (first < second){
                    perYear = Math.pow((second/first), 1/days);
                } else {
                    perYear = Math.pow((first/second), 1/days);
                }
                perYear =((perYear-1)*365*100);
                perYear = Math.round(perYear * 100) / 100;
                return perYear;
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

                    var diffDays = daydiff(lastSale.dokumentdato, nextSale.dokumentdato);
                    var changePercent = changePerYear(lastSalePrice,nextSalePrice,diffDays)
    
                    var flagClass ="";
                    if (etterSalg > 0){
                        if (changePercent > 60){
                            flagClass = "posChange"
                        }
                    } else {
                        if (changePercent > 60){
                            flagClass = "negChange"
                        }
                    }
                    etterSalg = prefix + niceNumber(etterSalg) + " etter " + niceTime(diffDays) ;
                    scope.transaction.flagClass = flagClass;
                }
            } 
            involveringer.sort(kommnr_sort_asc);
            angular.forEach(involveringer, function(entry){
                entry.kommuner = entry.kommuner.sort(date_sort_asc_internal);
                if (entry.kommuner.length > 3){
                    var min = entry.kommuner[0].year();
                    var max = entry.kommuner[entry.kommuner.length-1].year();
                    if (entry.antS == entry.antK){
                        entry.kommuner = "Kjøpt og solgt " + entry.antK +  " ganger mellom " + min + " og " + max;
                    } else {
                        entry.kommuner = "Kjøpt " + entry.antK + ", og solgt " + entry.antS + " ganger mellom " + min + " og " + max;
                    }
                    
                } else {
                    entry.kommuner = entry.kommuner.join(", ");
                }

                
            });
            scope.transaction.etterSalg = etterSalg;
            scope.transaction.involvements = involveringer;
        }
    }
});