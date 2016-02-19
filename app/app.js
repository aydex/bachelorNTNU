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

        .when('/testview', {
            templateUrl : '/views/testview.html',
            controller  : 'testController'
        })

        .when('/namesearch', {
            templateUrl : '/views/namesearch.html',
            controller  : 'nameSearchController'
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

kommunalApp.controller('nameSearchController', function($scope, $http, $timeout) {
    console.log("nameSearchController");
    var _timeout;

    $scope.reverse  = false;

    $scope.searchDelay = function(){
        if(_timeout){ //if there is already a timeout in process cancel it
            $timeout.cancel(_timeout);
        }
        _timeout = $timeout(function(){
            console.log("loading things");
            $http.get("./api/test.php?name=" + $scope.searchName)
                .then(function (response) {
                    $scope.names = response.data.records;
                });

            _timeout = null;
        },500);
    }

    $scope.orderByMe = function(x) {
        if($scope.myOrderBy != x){
            $scope.reverse = !$scope.reverse;
        }
        $scope.myOrderBy = x;
    }
    $scope.reverseOrder = function(){
        $scope.reverse = !$scope.reverse;
    }
});

/*
angular.module('myApp', []).controller('namesCtrl', function($scope, $http, $timeout) {
    console.log("myApp controller");
    var _timeout;

    $scope.reverse  = false;

    $scope.searchDelay = function(){
        if(_timeout){ //if there is already a timeout in process cancel it
            $timeout.cancel(_timeout);
        }
        _timeout = $timeout(function(){
            console.log("loading things");
            $http.get("./api/test.php?name=" + $scope.searchName)
                .then(function (response) {$scope.names = response.data.records;});

            _timeout = null;
        },500);
    }

    $scope.orderByMe = function(x) {
        if($scope.myOrderBy != x){
            $scope.reverse = !$scope.reverse;
        }
        $scope.myOrderBy = x;
    }
    $scope.reverseOrder = function(){
        $scope.reverse = !$scope.reverse;
    }
});
*/