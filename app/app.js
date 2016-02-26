/**
 * Created by adrianh on 09.02.16.
 */

google.load('visualization', '1', {packages:['corechart']});

var kommunalApp = angular.module('kommunalApp', ['ngRoute']);

kommunalApp.config(function($routeProvider, $locationProvider) {
    $routeProvider

        //route for homepage
        /*.when('/', {
            templateUrl : '/views/frontpage.html',
            controller  : 'mainController'
        })*/

        .when('/search', {
            templateUrl : '/views/search.html',
            controller  : 'searchController',
            //reloadOnSearch: false
        })

        /*.when('/search/:searchName/:page/:pageSize', {
            templateUrl : '/views/search.html',
            controller  : 'searchController'
        })*/
        
        .when('/transactions/deltager/:name/:targetId', {
            templateUrl : '/views/transactions.html',
            controller  : 'transactionPersonController'
        })

        .when('/transactions/property/:targetId', {
            templateUrl : '/views/transactionsProperty.html',
            controller  : 'transactionPropertyController'
        })

        .otherwise({
            redirectTo: '/search'
        });

        
    // use the HTML5 History API
    $locationProvider.html5Mode(true);
});

kommunalApp.run(function($rootScope, $http, $window) {

    $rootScope.doQuery = function(type, id, page, pageSize) {
        return $http.get("./api/test.php?" + type + "=" + id + "&page=" +
            page + "&pageSize=" + pageSize)
            .then(function (response) {
                return {records: response.data.records, count: response.data.count, 
                    combined: response.data.combined};
            });
    }

    $rootScope.back = function(){
        $window.history.back();
        //$location.path("/search/" + $scope.name + "/" + $scope.page + "/" + $scope.pageSize);
    }

});

kommunalApp.controller('mainController', function($scope) {

    $scope.message = "I am from the mainController";

});

kommunalApp.controller('searchController', function($scope, $rootScope, $timeout, $location) {

    var _timeout;
    var queryPromis;

    $scope.page           = 1;
    $scope.reverse        = false;
    $scope.showNavigation = true;
    $scope.searched       = false;
    $scope.lastSearched   = "";
    $scope.search         = {
        nameSearch: "",
        pageSize  : 10
    }

    $scope.queryPerson  = function() {

        queryPromis = $rootScope.doQuery("name", $scope.search.nameSearch, 
                                                    $scope.page, $scope.search.pageSize);
        queryPromis.then(function(result){

            angular.forEach(result.count[0], function(value) {
                $scope.count = value;
                //$scope.count = Math.ceil($scope.page * $scope.search.pageSize);
            });

            $scope.lastSearched   = $scope.search.nameSearch;
            $scope.names          = result.records;
            $scope.showTable      = $scope.names.length > 0 ? true : false;
            $scope.noResultShow   = $scope.names.length == 0 && $scope.search.nameSearch.length > 0 ? true : false;
            $scope.showNavigation = true;
            $scope.more_results   = $scope.count > ($scope.page * $scope.search.pageSize);
            $scope.searched       = true;
            $scope.hideNavigation = !$scope.more_results && $scope.page == 1 ? false : true;
            $scope.totalPages     = Math.ceil($scope.count / $scope.search.pageSize);
            $scope.pageDisplay    = "Side: " + $scope.page + " av " + $scope.totalPages;

        });
    }

    $scope.searchDelay = function(){

        if(_timeout){ //if there is already a timeout in process cancel it
            $timeout.cancel(_timeout);
        }

        if($scope.search.nameSearch != ""){
            _timeout = $timeout(function(){

                /*$scope.search.loading = true;*/

                if($scope.lastSearch != $scope.search.nameSearch){
                    $scope.page = 1;
                }

                console.log("Searching for " + $scope.search.nameSearch + " with page size " +
                    $scope.search.pageSize + " at page " + $scope.page);

                

                $scope.queryPerson();
                //$location.search(name, 123);
                //$location.path("/search/" + $scope.search.nameSearch + "/" + $scope.page + "/" + $scope.search.pageSize);



                _timeout = null;

            },500);
        }
        if ($scope.search.nameSearch.length == 0 && ($scope.showTable || $scope.noResultShow || $scope.hideNavigation)){
            $scope.showTable = false;
            $scope.noResultShow = false;
            $scope.hideNavigation = false;

        }
    }

    /*if($routeParams.searchName) {
        $scope.search.nameSearch = $routeParams.searchName;
        $scope.page              = parseInt($routeParams.page);
        $scope.search.pageSize   = parseInt($routeParams.pageSize);
        $scope.queryPerson();
    }*/

    $scope.navigate = function(way) {
        if((way == -1 && $scope.page > 1 && $scope.showNavigation) || (way == 1 && $scope.more_results && $scope.showNavigation)){
            $scope.page          += way;
            $scope.showNavigation = false;
            $scope.queryPerson();
            //$location.path("/search/" + $scope.search.nameSearch + "/" + $scope.page + "/" + $scope.search.pageSize);
        }
    }

    $scope.showTransactionsPerson = function(id, name){
        $location.path("/transactions/deltager/" + name + "/" + id);
        //$routeParams ==> {chapterId:1, sectionId:2, search:'moby'}
    }

    $scope.orderByMe = function(x) {
        if($scope.orderBy != x){
            $scope.reverse = !$scope.reverse;
        }
        $scope.orderBy = x;
    }

    $scope.reverseOrder = function(){
        $scope.reverse = !$scope.reverse;
    }
});

kommunalApp.controller('transactionPersonController', function($scope, $rootScope, $routeParams, $location) {
    $scope.message        = $routeParams.targetId;
    $scope.name           = $routeParams.name;
    $scope.showTable      = true;
    $scope.page           = 1;
    $scope.pageSize       = 10;
    $scope.reverse        = false;
    $scope.type           = "Transaksjoner for " + $scope.name;
    $scope.showNavigation = true;

    $scope.queryTransaction = function() {
        var queryPromis = $rootScope.doQuery("transactionFromPerson", $routeParams.targetId, 
                                    $scope.page, $scope.pageSize);
        queryPromis.then(function(result){
            angular.forEach(result.count[0], function(value) {
                $scope.count = value;
                //$scope.count = Math.ceil($scope.page * $scope.search.pageSize);
            });

            $scope.more_results   = $scope.count > ($scope.page * $scope.pageSize);
            $scope.transactions   = result.records;
            $scope.showNavigation = true;
            $scope.hideNavigation = !(!$scope.more_results && $scope.page == 1);
            $scope.totalPages     = Math.ceil($scope.count / $scope.pageSize);
            $scope.pageDisplay    = "Side: " + $scope.page + " av " + $scope.totalPages;
        });
    }

    $scope.filterResults = function(results) {
        var involvement;
        var involvementType;
        var final_output;
        var add;
        var seller = "";
        var buyer  = "";

        for(x in results) {
            involvement = results[x].Involvering.split(",");
            for(y in involvement) {
                involvementType = involvement[y].split(":");
                if(involvementType[1].toLowerCase() == "k") {
                    buyer = "Kjøpt " + involvementType[0];
                } else if(involvementType[1].toLowerCase() == "s") {
                    seller = "Solgt " + involvementType[0];
                }
            }

            add = buyer != "" && seller != "" ? " og " : "";
            results[x].Involvering = buyer + add + seller;  
        }
        return results;
    };

    $scope.navigate = function(way) {
        if((way == -1 && $scope.page > 1 && $scope.showNavigation) || (way == 1 && $scope.more_results && $scope.showNavigation)){
            $scope.page          += way;
            $scope.showNavigation = false;
            $scope.queryTransaction();
        }
    };

    $scope.orderByMe = function(x) {
        if($scope.orderBy != x){
            $scope.reverse = !$scope.reverse;
        }
        $scope.orderBy = x;
    };

    $scope.reverseOrder = function(){
        $scope.reverse = !$scope.reverse;
    };

    $scope.showTransactionsProperty = function(id){
        $location.path("/transactions/property/" + id);
    };

    $scope.queryTransaction();

});

kommunalApp.controller('transactionPropertyController', function($scope, $rootScope, $routeParams, $http, $window) {

    $scope.selectedDokumentnr = null;

    $scope.message        = $routeParams.targetId;
    $scope.page           = 1;
    $scope.pageSize       = 10;
    $scope.reverse        = false;
    $scope.type           = "Alle transaksjoner med eiendommen";
    $scope.showNavigation = true;
    $scope.labels         = [];
    $scope.data           = [[],[]];
    $scope.isSelected     = [];
    $scope.selectedIndex  = 0;
    lastDokumentnr        = "";
    var dokumentnr        = [];

    $scope.queryTransaction = function(){
        var queryPromis = $rootScope.doQuery("transactionFromProperty", $routeParams.targetId, 
                                    $scope.page, $scope.pageSize);
        queryPromis.then(function(result){
            
            angular.forEach(result.count[0], function(value) {
                $scope.count = value;
                //$scope.count = Math.ceil($scope.page * $scope.search.pageSize);
            });

            $scope.showTable      = true;
            $scope.more_results   = $scope.count > ($scope.page * $scope.pageSize);
            results               = $scope.getParticipantsCorrectly(result.records);
            $scope.transactions   = result.records;
            $scope.showNavigation = true;
            $scope.hideNavigation = !(!$scope.more_results && $scope.page == 1);
            $scope.labels         = [];
            $scope.data           = [[], []];
            $scope.totalPages     = Math.ceil($scope.count / $scope.pageSize);
            $scope.pageDisplay    = "Side: " + $scope.page + " av " + $scope.totalPages;

            console.log(result.records);

            var storedString   = result.combined[0].Sammendrag;
            var priceDatePairs = storedString.split(",");
            dokumentnr         = [];

            angular.forEach(priceDatePairs, function(pair, key){
                var splitValues = pair.split(":");
                $scope.labels.push(splitValues[1]);
                $scope.data[0].push(splitValues[0]);
                dokumentnr.push(results[key].Dokumentnr);
            });


            $scope.populateChart($scope.labels, $scope.data[0], dokumentnr);

        });
    };

    $scope.populateChart = function(labels, dataSet, dokumentnr) {
        var data = new google.visualization.DataTable();

        data.addColumn('string', 'År');
        data.addColumn('number', 'Sum');
        data.addColumn({type: 'string', name: 'Dokumentnr', role: 'tooltip'});
        data.addColumn({type: 'string', role: 'annotation'});
        data.addColumn({type: 'string', role: 'annotationText'});

        dokumentnrList = {};


        angular.forEach(labels, function(pair, key) {
            dokumentnrList[key] = dokumentnr[key];
            dokumentnrList[dokumentnr[key]] = key;
            data.addRow([labels[key], parseInt(dataSet[key]), 'År: ' + labels[key] + '\n Sum: ' + parseInt(dataSet[key]) + ' kr\n Dokumentnr: ' + dokumentnr[key],
                'K', 'Test Annotation']);
        });

        console.log(labels);

        var options = {
            title: 'Eiendomshistorikk',
            tooltip: {trigger: 'both'},
            pointSize: 5,
        };
        chart = new google.visualization.LineChart(document.getElementById('chartdiv'));


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
                console.log(dokumentnrList[cords.row]);
                $scope.markTableRow(dokumentnrList[cords.row]);
                $scope.$apply();
            }
        });

    };

    angular.element($window).bind('resize', function(){
        $scope.populateChart($scope.labels, $scope.data[0], dokumentnr);
    });

    $scope.setSelected = function (selectedDokumentnr) {
        chart.setSelection({row:null, column:null});
        row    = selectedDokumentnr ? dokumentnrList[selectedDokumentnr] : null;
        column = selectedDokumentnr ? 1 : null;
        chart.setSelection([{row:row,column:column}])

        $scope.selectedDokumentnr = selectedDokumentnr;
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
    }

    $scope.getParticipantsCorrectly = function(results) {
        var current_deltagere;
        var current_deltager;

        for(var x in results) {

            current_deltagere = results[x].Deltagere.split(",");
            var buyer        = [];
            var seller       = [];

            for(var y in current_deltagere) {
                current_deltager = current_deltagere[y].split(":");
                var deltager = {navn:current_deltager[1], deltagerid:current_deltager[2], deltagertype:current_deltager[3], andelTeller:current_deltager[4], andelNevner:current_deltager[5]}
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
        if($scope.orderBy != x){
            $scope.reverse = !$scope.reverse;
        }
        $scope.orderBy = x;
    };

    $scope.reverseOrder = function(){
        $scope.reverse = !$scope.reverse;
    };

    $scope.queryTransaction();

});

kommunalApp.filter('priceFilter', function($filter){
        return function(input){
            var lengde = input.length
            var out = "";
            while (lengde >= 0){
                out = input.substring(lengde-3, lengde) + " " +out;
                lengde-=3;
            }
            return out;
    }
});

kommunalApp.filter('participantNameFilter', function($filter, $sce){
    return function(input){      
        var out = [];
        var navn;
        var forNavn;
        var etterNavn;
        var deltagerType;
        var deltagerid;
        var andelTeller;
        var andelNevner;

    
        if (input.length == 0){
            return $sce.trustAsHtml("Ukjent");
        }
        
        angular.forEach(input, function(value){
            deltagerType = value.deltagertype
            navn = value.navn;
            if (deltagerType == "F"){
                navn = setLastnameAfterFirstname(navn);
                navn = abbreviateMiddleNames(navn);
            } 
            navn = capitalFirstLetters(navn);

            andelTeller = value.andelTeller;
            andelNevner = value.andelNevner;
            deltagerid = value.deltagerid;

            out.push("<span class='deltagerType"+ deltagerType + " deltager" + deltagerid + "'>" + navn + " <sup>" + andelTeller +"</sup>&frasl;<sub>" + andelNevner + "</sub></span>");
        })

        return $sce.trustAsHtml(out.join(" <br> "));
    }
});


kommunalApp.filter('participationHistoryFilter', function($filter){
        return function(input){
            var format = function(string){
                var year = string.split(":")[0].split("-")[0];
                var type = string.split(":")[1];


                if (year == "0001"){
                    year = "ukjent år";
                }

                switch(type){
                    case "K": type = "Kjøpt"; break;
                    case "S": type = "Solgt"; break;
                }

                return type + " " + year;
            }
            if (input.indexOf(",") == -1){
                return format(input);
            }

            var out = [];
            var involvement = input.split(",");
            angular.forEach(involvement, function(entry){
                out.push(format(entry));
            })

            return out.join(", ");
    }
});

kommunalApp.filter('deltagerTypeFilter', function($filter){
        return function(typeKode){
            switch(typeKode){
                case "F": return "Privatperson"; break;
                case "L": return "Løpe"; break;
                case "S": return "Selskap"; break;
            }
        }
});

kommunalApp.filter('nameFilter', function($filter){
        return function(input, type, keepMiddleNames){

            var out = capitalFirstLetters(input);
            if (type == "F"){
                out = setLastnameAfterFirstname(out);
                if (!keepMiddleNames){
                    out = abbreviateMiddleNames(out);
                }
            }
            return out;
        }
});

var setLastnameAfterFirstname = function(name){
    var forNavn = name.substring(name.indexOf(" "), name.length);
    var etterNavn = name.substring(0, name.indexOf(" "));
    return forNavn + " " + etterNavn
}
var capitalFirstLetters = function(word){
    return word.replace(/[\S]+/g, function(innerWord){
        return innerWord.substring(0,1).toUpperCase() + innerWord.substring(1, innerWord.length).toLowerCase();
    });
}

var abbreviateMiddleNames = function(name){
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



