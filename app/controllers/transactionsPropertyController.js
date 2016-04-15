kommunalApp.controller('transactionPropertyController', function($scope, $rootScope, $routeParams, $http, $window, $filter, transaction, $cookies) {

    if($cookies.get("name")) {
        $rootScope.loggedIn = true;
        $rootScope.username = $cookies.get("name").replace("+", " ");
    }

    $scope.selectedDokumentnr = null;

    $scope.message        = $routeParams.targetId;
    $scope.page           = 1;
    $scope.pageSize       = 10;
    $scope.orderBy        = null;
    $scope.order          = "ASC";
    $scope.reverse        = false;
    $scope.type           = "Alle transaksjoner med eiendommen";
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
                    //$scope.count = Math.ceil($scope.page * $scope.search.pageSize);
                });

                $scope.showTable      = true;
                //$scope.more_results   = $scope.count > ($scope.page * $scope.pageSize);
                results               = $scope.getParticipantsCorrectly(result.records);

                $scope.transactions   = result.records;
                $scope.showNavigation = true;
                $scope.hideNavigation = false;
                $scope.labels         = [];
                $scope.data           = [[], []];
                $scope.totalPages     = Math.ceil($scope.count / $scope.pageSize);
                $scope.pageDisplay    = "Side: " + $scope.page;
                $scope.sortReady      = true;

                $scope.unalteredTransactions = result.records;

                var storedString   = result.combined[0].Sammendrag;
                var priceDatePairs = storedString.split(",");
                dokumentnr         = [];

                //priceDatePairs = priceDatePairs.slice(($scope.page - 1) * $scope.pageSize, $scope.pageSize * $scope.page);

                $scope.chartObj = []

                angular.forEach(priceDatePairs, function(pair, key){
                    var splitValues = pair.split(":");
                    //$scope.labels.push(splitValues[1]);
                    //$scope.data[0].push(splitValues[0]);
                    //dokumentnr.push(splitValues[2]);
                    $scope.chartObj[splitValues[2]] = {date: splitValues[1], value: splitValues[0], documentnr: splitValues[2]};
                });

                $scope.chartObj.sort(sortFunction);

                //$scope.populateChart($scope.labels, $scope.data[0], dokumentnr);
                $scope.populateChart($scope.chartObj);
            }
        });
    }

    $scope.pageSizeChange = function(){
        $scope.page = 1;
        $scope.queryTransaction();
    }

    $scope.populateChart = function(obj) {

        var data = new google.visualization.DataTable();
        var currTransaction = "";
        var isMunicipal;

        data.addColumn('date', 'År');
        data.addColumn('number', 'Sum');
        data.addColumn({type: 'string', name: 'Dokumentnr', role: 'tooltip'});
        data.addColumn({type: 'string', role: 'annotation'});
        data.addColumn({type: 'string', role: 'annotationText'});

        dokumentnrList = {};

        angular.forEach(obj, function(pair, key) {
            currTransaction     = $scope.unalteredTransactions[key];
            currTransaction     = transaction.getRole(currTransaction);
            //currSeller          = getRole(currTransaction, "seller");

            if(currTransaction.kommune) {
                annotation     = "K";
                annotationText = "Kommune " + currTransaction.role;
            } else {
                annotation     = null;
                annotationText = null;
            }

            dokumentnrList[key] = obj[key].documentnr;
            dokumentnrList[obj[key].documentnr] = key;
            var date = obj[key].date.split("-");

            var dateParsed = new Date(date[0], date[1], date[2]);
            var price = parseInt(obj[key].value);

            if (price == 0){
                price = null;
            }

            data.addRow(
                [dateParsed, 
                price, 
                'Dokumentdato: ' + obj[key].date + '\n Salgssum: ' + $filter('priceFilter')(obj[key].value) + ' \n Dokumentnr: ' + obj[key].documentnr,
                annotation, annotationText]); 
            
            
        });

        var options = {
            title: 'Eiendomshistorikk',
            tooltip: {trigger: 'both'},
            pointSize: 5,
            interpolateNulls: true,
        }

        if(chart == undefined){
            chart = new google.visualization.LineChart(document.getElementById('chartdiv'));
        }

        chart.draw(data, options);

        google.visualization.events.addListener(chart, 'select', function(e){
            cords = chart.getSelection()[0];
            if(cords != undefined) {
                y = cords.row + 1;
                $scope.markTableRow(y);
                $scope.markTableRow(dokumentnrList[cords.row]);
                $scope.$apply();
            }
        });

        google.visualization.events.addListener(chart, 'onmouseover', function(e){
            cords = e;
            y = cords.row + 1;
            $scope.markTableRow(y);
            $scope.markTableRow(dokumentnrList[cords.row]);
            $scope.$apply();
        });

        google.visualization.events.addListener(chart, 'onmouseout', function(e){
            cords = chart.getSelection()[0];
            if(!cords) {
                $scope.selectedDokumentnr = null;
                $scope.$apply();
            } else {
                $scope.markTableRow(dokumentnrList[cords.row]);
                $scope.$apply();
            }
        });

    };

    angular.element($window).bind('resize', function(){
        $scope.populateChart($scope.chartObj);
    });

    $scope.setSelected = function (selectedDokumentnr, Salgssum) {
        if (Salgssum != 0){
           chart.setSelection({row:null, column:null});
        row    = selectedDokumentnr ? dokumentnrList[selectedDokumentnr] : null;
        column = selectedDokumentnr ? 1 : null;
        chart.setSelection([{row:row,column:column}])

        $scope.selectedDokumentnr = selectedDokumentnr; 
        }
        
    };

    $scope.markTableRow = function(selectedDokumentnr) {
        $scope.selectedDokumentnr = selectedDokumentnr;
    };


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

    $scope.orderByMe = function(x) {
        if($scope.sortReady) {
            if($scope.orderBy == x){
                if ($scope.order == "ASC") {
                    $scope.order = "DESC"
                } else {
                    $scope.order = "ASC";
                }
            } else {
                $scope.order = "ASC";
                $scope.reverse = false;
            }
            $scope.orderBy = x;
            $scope.reverseOrder();
            $scope.sortReady = false;
            $scope.queryTransaction();
        }
    };

    $scope.reverseOrder = function(){
        if($scope.sortReady) {
            $scope.reverse = !$scope.reverse;
        }
    }

    $scope.queryTransaction();

});

function sortFunction(a, b) {
    if (a.date > b.date) {
        return 1;
    } else if (a.date == b.date) {
        return 0;
    } else {
        return -1;
    }
}
