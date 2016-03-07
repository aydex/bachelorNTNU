google.load('visualization', '1', {packages:['corechart']});

var kommunalApp = angular.module('kommunalApp', ['ngRoute']);

kommunalApp.config(function($routeProvider, $locationProvider) {
    $routeProvider

        //route for homepage
        /*.when('/', {
            templateUrl : '/views/frontpage.html',
            controllers  : 'mainController'
        })*/


        .when('/search', {
            templateUrl : '/views/search.html',
            controller  : 'searchController',
            //reloadOnSearch: false
        })

        .when('/search/:searchName/:page/:pageSize', {
            templateUrl : '/views/search.html',
            controller  : 'searchController'
        })


        .when('/transactions/deltager/:name/:targetId/:type', {
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

kommunalApp.run(function($rootScope, $http, $window, $location) {

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
