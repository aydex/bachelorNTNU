/**
 * Created by adrianh on 09.02.16.
 */

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
            controller  : 'searchController'
        })

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

kommunalApp.run(function($rootScope, $http) {

<<<<<<< Updated upstream
    $rootScope.doQuery = function(type, id, page, pageSize) {
        return $http.get("./api/test.php?" + type + "=" + id + "&page=" +
            page + "&pageSize=" + pageSize)
            .then(function (response) {
                return {records: response.data.records, count: response.data.count};
            });
    }

    $rootScope.doQuery = function(type, id, page, pageSize, order, orderBy) {
        return $http.get("./api/ask.php?" + type + "=" + id + "&page=" +
            page + "&pageSize=" + pageSize + "&order=" + order + "&orderBy=" + orderBy)
        .then(function (response) {
                return {records: response.data.records, count: response.data.count,
                    combined: response.data.combined};
            });
    }

    $rootScope.open = true;

    $rootScope.clickMenu = function(){
        $rootScope.open = !$rootScope.open;
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
    var queryPromis

    $scope.page           = 1;
    $scope.reverse        = false;
    $scope.showNavigation = true;
    $scope.searched       = false;

    $scope.queryPerson  = function() {

        queryPromis = $rootScope.doQuery("name", $scope.search.nameSearch,
                                                    $scope.page, $scope.search.pageSize, $scope.order, $scope.orderBy);
        queryPromis.then(function(result){

            angular.forEach(result.count[0], function(value) {
                $scope.count = value;
                //$scope.count = Math.ceil($scope.page * $scope.search.pageSize);
            });

            $scope.names          = result.records;
            $scope.showTable      = 'true';
            $scope.showNavigation = true;
            $scope.more_results   = $scope.count > ($scope.page * $scope.search.pageSize) ? true : false;
            $scope.searched       = true;
            $scope.hideNavigation = !$scope.more_results && $scope.page == 1 ? false : true;

        });
    }

    $scope.searchDelay = function(){
        if(_timeout){ //if there is already a timeout in process cancel it
            $timeout.cancel(_timeout);
        }

        if($scope.search.nameSearch != ""){
            _timeout = $timeout(function(){

                $scope.page = 1;
                /*$scope.search.loading = true;*/

                console.log("Searching for " + $scope.search.nameSearch + " with page size " +

                    $scope.search.pageSize + " at page " + $scope.page + " ordered by " + $scope.orderBy +
                    " " + $scope.order);



                //$scope.queryPerson();
                //$location.search(name, 123);
                $location.path("/search/" + $scope.search.nameSearch + "/" + $scope.page + "/" + $scope.search.pageSize);


                $scope.queryPerson();

                _timeout = null;
            },500);
        }


    }

    $scope.navigate = function(way) {
        if((way == -1 && $scope.page > 1 && $scope.showNavigation) || (way == 1 && $scope.more_results && $scope.showNavigation)){
            $scope.page          += way;
            $scope.showNavigation = false;
            $scope.queryPerson();
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
                                    $scope.page, $scope.pageSize, $scope.order, $scope.orderBy);

        queryPromis.then(function(result){

            console.log(result);

            angular.forEach(result.count[0], function(value) {
                $scope.count = value;
                //$scope.count = Math.ceil($scope.page * $scope.search.pageSize);
            });

            $scope.more_results   = $scope.count > ($scope.page * $scope.pageSize) ? true : false;
            $scope.transactions   = $scope.filterResults(result.records);
            $scope.showNavigation = true;
            $scope.hideNavigation = !$scope.more_results && $scope.page == 1 ? false : true;
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
    }

    $scope.navigate = function(way) {
        if((way == -1 && $scope.page > 1 && $scope.showNavigation) || (way == 1 && $scope.more_results && $scope.showNavigation)){
            $scope.page          += way;
            $scope.showNavigation = false;
            $scope.queryTransaction();
        }
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

    $scope.showTransactionsProperty = function(id){
        $location.path("/transactions/property/" + id);
    }

    $scope.queryTransaction();

});

kommunalApp.controller('transactionPropertyController', function($scope, $rootScope, $routeParams, $http) {

    $scope.message        = $routeParams.targetId;
    $scope.showTable      = true;
    $scope.page           = 1;
    $scope.pageSize       = 10;
    $scope.reverse        = false;
    $scope.type           = "Alle transaksjoner med eiendommen";
    $scope.showNavigation = true;

    $scope.queryTransaction = function(){


        var queryPromis = $rootScope.doQuery("transactionFromProperty", $routeParams.targetId,
                                    $scope.page, $scope.pageSize, $scope.order, $scope.orderBy);

        queryPromis.then(function(result){

            angular.forEach(result.count[0], function(value) {
                $scope.count = value;
                //$scope.count = Math.ceil($scope.page * $scope.search.pageSize);
            });

            $scope.more_results   = $scope.count > ($scope.page * $scope.pageSize) ? true : false;
            results               = $scope.getParticipantsCorrectly(result.records);
            $scope.transactions   = result.records;
            $scope.showNavigation = true;
            $scope.hideNavigation = !$scope.more_results && $scope.page == 1 ? false : true;
        });
    }


    $scope.pageSizeChange = function(){
        $scope.page = 1;
        $scope.queryTransaction();
    }

    $scope.populateChart = function(labels, dataSet, dokumentnr) {
        var data = new google.visualization.DataTable();
        var currTransaction = "";
        var isMunicipal;

        data.addColumn('string', 'År');
        data.addColumn('number', 'Sum');
        data.addColumn({type: 'string', name: 'Dokumentnr', role: 'tooltip'});
        data.addColumn({type: 'string', role: 'annotation'});
        data.addColumn({type: 'string', role: 'annotationText'});

        dokumentnrList = {};

        angular.forEach(labels, function(pair, key) {
            currTransaction     = $scope.unalteredTransactions[key];
            currTransaction     = getRole(currTransaction);
            //currSeller          = getRole(currTransaction, "seller");

            if(currTransaction.kommune) {
                annotation     = "K";
                annotationText = "Kommune " + currTransaction.role;
            } else {
                annotation     = null;
                annotationText = null;
            }

            dokumentnrList[key] = dokumentnr[key];
            dokumentnrList[dokumentnr[key]] = key;
            data.addRow([labels[key], parseInt(dataSet[key]), 'Dokumentdato: ' + labels[key] + '\n Salgssum: ' + $filter('priceFilter')(dataSet[key]) + ' \n Dokumentnr: ' + dokumentnr[key],
                annotation, annotationText]);
        });

        var options = {
            title: 'Eiendomshistorikk',
            tooltip: {trigger: 'both'},
            pointSize: 5,
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

        for(x in results) {

            current_deltagere = results[x].Deltagere.split(",");

            var buyer        = [];
            var seller       = [];

            for(y in current_deltagere) {
                current_deltager = current_deltagere[y].split(":");

                if(current_deltager[0].toLowerCase() == "k") {
                    if(current_deltager[1] != "UKJENT")
                        buyer.push(current_deltager[1] + "(" + current_deltager[3] + "/" + current_deltager[4] + ")");
                }else if(current_deltager[0].toLowerCase() == "s"){

                    seller.push(deltager);
                }

            }
            results[x].seller = seller.length == 0 ? "Ukjent" : seller.join(" og ");
            results[x].buyer  = buyer.length == 0 ? "Ukjent" : buyer.join(" og ");
            delete results[x].Deltagere;

        }

        return results;
    }

    $scope.orderByMe = function(x) {
        if($scope.orderBy != x){
            $scope.reverse = !$scope.reverse;
        }
        $scope.orderBy = x;
    }

    $scope.reverseOrder = function(){
        $scope.reverse = !$scope.reverse;

    };

    $scope.queryTransaction();

});

kommunalApp.filter('priceFilter', function(){
        return function(input){
            var lengde = input.length;
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
        var deltagerType;
        var deltagerid;
        var andelTeller;
        var andelNevner;


        if (input.length == 0){
            return $sce.trustAsHtml("Ukjent");
        }

        angular.forEach(input, function(value){
            deltagerType = value.deltagertype;
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
        });

        return $sce.trustAsHtml(out.join(" <br> "));
    }
});


kommunalApp.filter('participationHistoryFilter', function(){
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
            };
            if (input.indexOf(",") == -1){
                return format(input);
            }

            var out = [];
            var involvement = input.split(",");
            angular.forEach(involvement, function(entry){
                out.push(format(entry));
            });

            return out.join(", ");
    }
});

kommunalApp.filter('deltagerTypeFilter', function(){
        return function(typeKode){
            switch(typeKode){
                case "F": return "Privatperson"; break;
                case "L": return "Løpe"; break;
                case "S": return "Selskap"; break;
            }
        }
});

kommunalApp.filter('nameFilter', function(){
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

kommunalApp.filter('capitalFirstLettersFilter', function($filter){
        return function(input){
            var out = capitalFirstLetters(input);
            return out;
        }
});

var setLastnameAfterFirstname = function(name){
    var forNavn = name.substring(name.indexOf(" "), name.length);
    var etterNavn = name.substring(0, name.indexOf(" "));
    return forNavn + " " + etterNavn
};
var capitalFirstLetters = function(word){
    return word.replace(/[\S]+/g, function(innerWord){
        return innerWord.substring(0,1).toUpperCase() + innerWord.substring(1, innerWord.length).toLowerCase();
    });
};

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

var isMunicipality = function(type, name){
    if(type == "S" && name.toLowerCase().indexOf("kommune") != -1) return true;
    return false;
};

var getRole = function(transaction, role) {

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
            part.kommune      = isMunicipality(part.deltagertype, part.navn);
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
                part.kommune      = isMunicipality(part.deltagertype, part.navn);
                if(part.kommune){
                    part.role = "har solgt";
                    return
                }
            });
        }
    }

    return part;

};

kommunalApp.directive('transactionPropertyTable', function(){
    return{
        restrict: 'EA',
        replace: false,
        scope: {
            transaction: '='
        },
        templateUrl: 'views/transactionsPropertyTableRow.html',
        link: function(scope, element, attr) {
            var handleEntry = function(list){
                angular.forEach(list, function(entry){
                    entry.navn = capitalFirstLetters(entry.navn);
                    entry.kommune = false;
                    entry.ukjent = false;
                    entry.searchurl = "transactions/deltager/" + encodeURI(entry.navn) +"/" + entry.deltagerid +"/" + entry.deltagertype
                    if (entry.deltagertype == "F") {
                        entry.navn = setLastnameAfterFirstname(entry.navn);
                        entry.navn = abbreviateMiddleNames(entry.navn);
                    } else if (isMunicipality(entry.deltagertype, entry.navn)) {
                        entry.kommune = true;
                        entry.kommunenavn = entry.navn.replace(" Kommune", "");
                    }
                });

            };
            handleEntry(scope.transaction.buyer);
            handleEntry(scope.transaction.seller);
            var emptyObject = {ukjent: true, kommune: false};

            if (scope.transaction.buyer.length == 0){
                scope.transaction.buyer.push(emptyObject);
            } else if (scope.transaction.seller.length == 0){
                scope.transaction.seller.push(emptyObject);
            }
        }
    }
});

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
    }
});


kommunalApp.directive('kommunevaapen', function(){
    return{
        restrict: 'EA',
        replace: true,
        scope: {
            name: '='
        },
        template: '<img class="kommunevaapen" src="images/kommunevapen/{{name}}.svg.png"></img>',
        link: function(scope, element, attr) {
            scope.name = capitalFirstLetters(scope.name);
        }
    }
});

kommunalApp.controller('mapController', function ($scope) {
        var fylker = ["ostfold","akershus","oslo","hedmark","oppland","buskerud",
        "vestfold","telemark","aust-agder","vest-agder","rogaland","hordaland",
        "sogn_og_fjordane","more_og_romsdal","sor-trondelag","nord-trondelag",
        "nordland","troms","finnmark"];
        $scope.createDummyData = function () {
            var dataTemp = {};
            angular.forEach(fylker, function (land, key) {
                dataTemp[land] = {value: Math.random()}
            });
            $scope.dummyData = dataTemp;
        };
        $scope.createDummyData();
    });

kommunalApp.directive('svgMap', function ($compile) {
    return {
        restrict: 'A',
        templateUrl: '/images/norway_counties_nostyle.svg',
        link: function (scope, element, attrs) {
            var regions = element[0].querySelectorAll('.land');
            angular.forEach(regions, function (path, key) {
                var regionElement = angular.element(path);
                regionElement.attr("region", "");
                regionElement.attr("dummy-data", "dummyData");
                $compile(regionElement)(scope);
            })
        }
    }
});
