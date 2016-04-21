google.load('visualization', '1', {packages:['corechart']});

var kommunalApp = angular.module('kommunalApp', ['ngRoute', 'ngCookies','720kb.tooltips']);

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

        .when('/transactions/property/:targetId', {
            templateUrl : '/views/transactionsDetailed.html',
            controller  : 'transactionsDetailedController',
        })

        .when('/search/:searchName/:type/:page/:pageSize/:fylkenr/:kommnr', {
            templateUrl : '/views/search.html',
            controller  : 'searchController',
            //reloadOnSearch: false
        })

        .when('/unregistered/', {
            templateUrl : '/views/error.html',
            controller  : 'unregisteredController',
            //reloadOnSearch: false
        })

        .when('/unregistered/:code', {
            templateUrl : '/views/error.html',
            controller  : 'unregisteredController',
            //reloadOnSearch: false
        })

        .when('/search/:searchName/:type/:page/:pageSize', {
            templateUrl : '/views/search.html',
            controller  : 'searchController'
        })


        .when('/transactions/deltager/:name/:targetId/:type', {
            templateUrl : '/views/transactions.html',
            controller  : 'transactionPersonController'
        })

        .when('/test/:targetId', {
            templateUrl : '/views/transactionsProperty.html',
            controller  : 'transactionPropertyController'
        })

        .when('/transactions/propertytimeline/:targetId', {
            templateUrl : '/views/transactionsPropertyTimeline.html',
            controller  : 'transactionPropertyTimelineController'
        })

        .otherwise({
            redirectTo: '/search'
        });


    // use the HTML5 History API
    $locationProvider.html5Mode(true);
});

kommunalApp.run(function($rootScope, $http, $window, $location) {

    angular.element(document).on("click", function(e) {
        $rootScope.$broadcast("documentClicked", angular.element(e.target));
    });

    $rootScope.doQuery = function(type, id, page, pageSize, order, orderBy, filterBy, fylkenr, kommnr) {
        var request = "./api/ask.php?" + type + "=" + id + "&page=" +
            page + "&pageSize=" + pageSize + "&order=" + order + "&orderBy=" + orderBy + "&filterBy=" + filterBy + "&fylkenr=" + fylkenr + "&kommnr=" + kommnr;
        console.log(request);
        return $http.get(request)
        .then(function (response) {
                if(response.data.records == "login_required") {
                    $location.path("/unregistered");
                    return false;
                } else if(response.data.records == "wrong_subscription") {
                    $location.path("/unregistered/wrong_subscription");
                    return false;
                } else {
                    return {records: response.data.records, count: response.data.count, combined: response.data.combined};
                }
        });
    };

    $rootScope.back = function(){
        $window.history.back();
    };
});