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

    $rootScope.doQuery = function(type, id, page, pageSize) {
        return $http.get("./api/test.php?" + type + "=" + id + "&page=" +
            page + "&pageSize=" + pageSize)
            .then(function (response) {
                return {records: response.data.records, count: response.data.count};
            });
    }

});

kommunalApp.controller('mainController', function($scope) {

    $scope.message = "I am from the mainController";

});

kommunalApp.controller('searchController', function($scope, $rootScope, $timeout, $location) {

    var _timeout;
    var queryPromis

    $scope.reverse        = false;
    $scope.showNavigation = true;
    $scope.searched       = false;
    $scope.page           = 1;

    $scope.queryPerson  = function() {

        queryPromis = $rootScope.doQuery("name", $scope.search.nameSearch, 
                                                    $scope.page, $scope.search.pageSize);
        queryPromis.then(function(result){
            $scope.names          = result.records;
            $scope.showTable      = 'true';
            $scope.showNavigation = true;
            $scope.more_results   = result.records.length >= $scope.search.pageSize ? true : false;
            $scope.searched       = true;

            console.log(result);

            angular.forEach(result.count[0], function(value) {
                    $scope.search.pageCount = Math.ceil(value/$scope.search.pageSize);
                }
            );
            console.log($scope.search.pageCount);

        });
    }

    $scope.searchDelay = function(){
        if(_timeout){ //if there is already a timeout in process cancel it
            $timeout.cancel(_timeout);
        }

        if($scope.search.nameSearch != ""){
            _timeout = $timeout(function(){

                /*$scope.search.loading = true;*/

                console.log("Searching for " + $scope.search.nameSearch + " with page size " +
                    $scope.search.pageSize + " at page " + $scope.page);
                
                $scope.queryPerson();

                _timeout = null;
            },500);
        }
    }

    /*
    $scope.navigate = function(way) {
        $scope.search.page          += way;
        $scope.showNavigation = false;
        $scope.queryPerson();
    }*/


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

    $scope.navigate = function(way) {

        if (($scope.page < $scope.search.pageCount && way == 1) || ($scope.page > 1 && way == -1)) {
            $scope.page =  $scope.page + way;
            console.log("pushed, way: " + way)
            console.log("Pagecount: " + $scope.search.pageCount)
            console.log("Page: " + $scope.page);
            $scope.queryPerson();
        }
    }
    /*
    $scope.prevPage = function() {
        if ($scope.search.page >= 1) {
            $scope.search.page -= 1;
            $scope.search.loading = true;
            $scope.showTable = 'false';
            $http.get("./api/test.php?name=" + $scope.search.nameSearch + "&page=" +
                    $scope.search.page + "&pageSize=" + $scope.search.pageSize)
                .then(function (response) {

                    $scope.names          = response.data.records;
                    $scope.showTable      = 'true';
                    $scope.search.loading = false;
                });
        }

    }*/
});

kommunalApp.controller('transactionPersonController', function($scope, $rootScope, $routeParams, $location) {
    $scope.message        = $routeParams.targetId;
    $scope.name           = $routeParams.name;
    $scope.showTable      = true;
    $scope.page           = 1;
    $scope.search.pageSize       = 10;
    $scope.reverse        = false;
    $scope.type           = "Transaksjoner for " + $scope.name;
    $scope.showNavigation = true;

    $scope.queryTransaction = function() {
        var queryPromis = $rootScope.doQuery("transactionFromPerson", $routeParams.targetId, 
                                    $scope.search.page, $scope.search.pageSize);
        queryPromis.then(function(result){
            $scope.transactions = $scope.filterResults(result.records);
            $scope.more_results   = result.records.length >= $scope.search.pageSize ? true : false;
            $scope.showNavigation = true;
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
        $scope.page          += way;
        $scope.showNavigation = false;
        $scope.queryTransaction();
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
    $scope.search.pageSize       = 10;
    $scope.reverse        = false;
    $scope.type           = "Alle transaksjoner med eiendommen";
    $scope.showNavigation = true;

    $scope.queryTransaction = function(){
        var queryPromis = $rootScope.doQuery("transactionFromProperty", $routeParams.targetId, 
                                    $scope.search.page, $scope.search.pageSize);
        queryPromis.then(function(result){
            
            results = $scope.getParticipantsCorrectly(result.records);

            $scope.transactions = results;
            $scope.more_results   = results.length >= $scope.search.pageSize ? true : false;
            $scope.showNavigation = true;
        });
    }

    $scope.navigate = function(way) {
        $scope.page          += way;
        $scope.showNavigation = false;
        $scope.queryTransaction();
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
                    if(current_deltager[1] != "UKJENT")
                        seller.push(current_deltager[1] + "(" + current_deltager[3] + "/" + current_deltager[4] + ")");
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
    }

    $scope.queryTransaction();
});
