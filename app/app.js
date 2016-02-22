/**
 * Created by adrianh on 09.02.16.
 */

var kommunalApp = angular.module('kommunalApp', ['ngRoute']);

kommunalApp.config(function($routeProvider, $locationProvider) {
    $routeProvider

        //route for homepage
        .when('/', {
            templateUrl : '/views/frontpage.html',
            controller  : 'mainController'
        })

        .when('/search', {
            templateUrl : '/views/search.html',
            controller  : 'searchController'
        })

        .when('/search/transactions/:targetId', {
            templateUrl : '/views/transactions.html',
            controller  : 'transactionController'
        })

        .otherwise({
            redirectTo: '/'
        });

        
    // use the HTML5 History API
    $locationProvider.html5Mode(true);
});

kommunalApp.controller('mainController', function($scope) {

    $scope.message = "I am from the mainController";

});

kommunalApp.controller('testController', function($scope) {

    $scope.message = "I am from the testController";

});

kommunalApp.controller('searchController', function($scope, $http, $timeout, $location) {

    var _timeout;

    $scope.reverse  = false;

    $scope.searchDelay = function(){
        if(_timeout){ //if there is already a timeout in process cancel it
            $timeout.cancel(_timeout);
        }

        if($scope.search.nameSearch != ""){
            _timeout = $timeout(function(){

                $scope.search.loading = true;
                $scope.search.page    = 1;

                console.log("Searching for " + $scope.search.nameSearch + " with page size " +
                    $scope.search.pageSize + " at page " + $scope.search.page);

                $http.get("./api/test.php?name=" + $scope.search.nameSearch + "&page=" +
                    $scope.search.page + "&pageSize=" + $scope.search.pageSize)
                    .then(function (response) {

                        $scope.names          = response.data.records;
                        $scope.showTable      = 'true';
                        $scope.search.loading = false;

                    });

                _timeout = null;
            },500);
        }


    };

    $scope.showTransactions = function(id){
        $location.path("/search/transactions/" + id);
        //$routeParams ==> {chapterId:1, sectionId:2, search:'moby'}
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
});

kommunalApp.controller('transactionController', function($scope, $routeParams){
    $scope.message = $routeParams.targetId;
    $scope.showTable = true;

    //Query for transaction with person


});
