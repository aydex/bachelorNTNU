kommunalApp.controller('searchController', function($scope, $rootScope, $timeout, $location, $routeParams) {

    var _timeout;
    var queryPromis;

    $scope.page           = 1;
    $scope.orderBy        = null;
    $scope.order          = "ASC";
    $scope.reverse        = false;
    $scope.showNavigation = true;
    $scope.searched       = false;
    $scope.showTable      = false;
    $scope.sortReady      = false;
    $scope.lastSearched   = "";
    $scope.search         = {
        nameSearch: "",
        pageSize  : 25
    };

    $scope.queryPerson  = function() {

        queryPromis = $rootScope.doQuery("name", $scope.search.nameSearch,
            $scope.page, $scope.search.pageSize, $scope.order, $scope.orderBy);
        queryPromis.then(function(result){

            angular.forEach(result.count[0], function(value) {
                $scope.count = value;
                //$scope.count = Math.ceil($scope.page * $scope.search.pageSize);
            });

            $scope.lastSearched   = $scope.search.nameSearch;
            $scope.names          = result.records;
            $scope.showTable      = $scope.names.length > 0;
            $scope.noResultShow   = !!($scope.names.length == 0 && $scope.search.nameSearch.length > 0);
            $scope.showNavigation = true;
            $scope.more_results   = $scope.count > ($scope.page * $scope.search.pageSize);
            $scope.searched       = true;
            $scope.hideNavigation = !(!$scope.more_results && $scope.page == 1);
            $scope.totalPages     = Math.ceil($scope.count / $scope.search.pageSize);
            $scope.pageDisplay    = "Side: " + $scope.page + " av " + $scope.totalPages;
            $scope.sortReady      = true;

        });
    };

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
                    $scope.search.pageSize + " at page " + $scope.page + " ordered by " + $scope.orderBy +
                    " " + $scope.order);



                //$scope.queryPerson();
                //$location.search(name, 123);
                var name_encoded = encodeURIComponent($scope.search.nameSearch);

                $location.path("/search/" + name_encoded + "/" + $scope.page + "/" + $scope.search.pageSize);



                _timeout = null;

            },500);
        }
        if ($scope.search.nameSearch.length == 0 && ($scope.showTable || $scope.noResultShow || $scope.hideNavigation)){
            $scope.showTable = false;
            $scope.noResultShow = true;
            $scope.hideNavigation = false;

        }
    };

    $scope.pageSizeChange = function(){
        $scope.page = 1;
        $scope.queryPerson();
    };

    if($routeParams.searchName) {
        $scope.searched          = true;

        document.getElementById("search").focus();
        $scope.search.nameSearch = decodeURIComponent($routeParams.searchName);
        $scope.page              = parseInt($routeParams.page);
        $scope.search.pageSize   = parseInt($routeParams.pageSize);
        $scope.queryPerson();
    }

    $scope.navigate = function(way) {
        if((way == -1 && $scope.page > 1 && $scope.showNavigation) || (way == 1 && $scope.more_results && $scope.showNavigation)){
            $scope.page          += way;
            $scope.showNavigation = false;
            $scope.queryPerson();
            //$location.path("/search/" + $scope.search.nameSearch + "/" + $scope.page + "/" + $scope.search.pageSize);
        }
    };

    $scope.showTransactionsPerson = function(id, name, type){
        name = encodeURIComponent(name);
        $location.path("/transactions/deltager/" + name + "/" + id + "/" +type);
        //$routeParams ==> {chapterId:1, sectionId:2, search:'moby'}
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
            $scope.queryPerson();
        }
    };

    $scope.reverseOrder = function(){
        if($scope.sortReady) {
            $scope.reverse = !$scope.reverse;
        }
    }
});
