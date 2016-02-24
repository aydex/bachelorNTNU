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

    $scope.page           = 1;
    $scope.reverse        = false;
    $scope.showNavigation = true;
    $scope.searched       = false;

    $scope.queryPerson  = function() {
        queryPromis = $rootScope.doQuery("name", $scope.search.nameSearch, 
                                                    $scope.page, $scope.search.pageSize);
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
                    $scope.search.pageSize + " at page " + $scope.page);

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
                                    $scope.page, $scope.pageSize);
        queryPromis.then(function(result){
            angular.forEach(result.count[0], function(value) {
                $scope.count = value;
                //$scope.count = Math.ceil($scope.page * $scope.search.pageSize);
            });

            $scope.more_results   = $scope.count > ($scope.page * $scope.pageSize) ? true : false;
            $scope.transactions   = result.records;
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
                                    $scope.page, $scope.pageSize);
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
            return $sce.trustAsHtml("Ukjent");;
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



