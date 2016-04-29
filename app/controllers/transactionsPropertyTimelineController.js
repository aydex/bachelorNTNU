kommunalApp.controller('transactionPropertyTimelineController', function($scope, $rootScope, $routeParams, $http, $window, $filter, transaction, $cookies) {

    if($cookies.get("name")) {
        $rootScope.loggedIn = true;
        $rootScope.username = $cookies.get("name").replace("+", " ");
    }

    var address = "UKJENT ADRESSE";

    if($routeParams.targetAddress != undefined) {
        address = decodeURIComponent($routeParams.targetAddress);
    }

    $scope.selectedDokumentnr = null;

    $scope.message        = $routeParams.targetId;
    $scope.address        = address;
    $scope.page           = 1;
    $scope.pageSize       = 10;
    $scope.orderBy        = null;
    $scope.order          = "ASC";
    $scope.reverse        = false;
    $scope.pageTitle      = "Transaksjoner for " + $scope.address;
    $scope.showNavigation = true;
    $scope.labels         = [];
    $scope.data           = [[],[]];
    $scope.isSelected     = [];
    $scope.sortReady      = false;
    $scope.selectedIndex  = 0;
    lastDokumentnr        = "";
    var dokumentnr        = [];
    var chart;

    $scope.unalteredTransactions;

    $scope.queryTransaction = function(){

        var queryPromis = $rootScope.doQuery("transactionFromProperty", $routeParams.targetId,
            $scope.page, $scope.pageSize, $scope.order, $scope.orderBy);
        queryPromis.then(function(result){

            if(result){

                angular.forEach(result.count[0], function(value) {
                    $scope.count = value;
                });

                $scope.showTable      = true;
                results               = $scope.getParticipantsCorrectly(result.records);

                $scope.transactions   = result.records.sort(sortFunctionTable);
                $scope.showNavigation = true;
                $scope.hideNavigation = false;
                $scope.labels         = [];
                $scope.data           = [[], []];
                $scope.totalPages     = Math.ceil($scope.count / $scope.pageSize);
                $scope.pageDisplay    = "Side: " + $scope.page;
                $scope.sortReady      = true;

                $scope.unalteredTransactions = result.records;

                var storedString   = result.combined[0].Prispunkt;
                var priceDatePairs = storedString.split(",");
                dokumentnr         = [];

            }
        });
    }

    $scope.pageSizeChange = function(){
        $scope.page = 1;
        $scope.queryTransaction();
    }



    $scope.navigate = function(way) {
        if((way == -1 && $scope.page > 1 && $scope.showNavigation) || (way == 1 && $scope.more_results && $scope.showNavigation)){
            $scope.page          += way;
            $scope.showNavigation = false;
            $scope.queryTransaction();
        }
    };

    $scope.getParticipantsCorrectly = function(results) {
        var current_deltagere;
        var current_deltager;

        for(var x in results) {

            current_deltagere = results[x].Deltagere.split(",");
            var buyer        = [];
            var seller       = [];

            for(var y in current_deltagere) {
                current_deltager = current_deltagere[y].split(":");
                var deltager = {
                    navn:current_deltager[1],
                    kommunenr:current_deltager[2],
                    deltagerid:current_deltager[3],
                    deltagertype:current_deltager[4],
                    andelTeller:current_deltager[5],
                    andelNevner:current_deltager[6]}
                if(current_deltager[0].toLowerCase() == "k") {
                    buyer.push(deltager);
                }else if(current_deltager[0].toLowerCase() == "s"){
                    seller.push(deltager);
                }

            }

            results[x].seller = seller;
            results[x].buyer  = buyer;
            delete results[x].Deltagere;
        }
        return results;
    };

 
    $scope.queryTransaction();

});
