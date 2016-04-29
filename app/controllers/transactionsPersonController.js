kommunalApp.controller('transactionPersonController', function($scope, $rootScope, $routeParams, $location, $filter, $cookies) {

    if($cookies.get("name")) {
        $rootScope.loggedIn = true;
        $rootScope.username = $cookies.get("name").replace("+", " ");
    }

    $scope.message        = $routeParams.targetId;
    $scope.name           = decodeURIComponent($routeParams.name);
    $scope.page           = 1;
    $scope.pageSize       = 25;
    $scope.orderBy        = null;
    $scope.order          = "ASC";
    $scope.sortReady      = false;
    $scope.reverse        = false;
    $scope.type           = "Transaksjoner for " + $filter('nameFilter')($scope.name, $routeParams.type, true);
    $scope.showNavigation = true;

    $scope.queryTransaction = function() {
        var queryPromis = $rootScope.doQuery("transactionFromPerson", $routeParams.targetId,
            $scope.page, $scope.pageSize, $scope.order, $scope.orderBy);
        queryPromis.then(function(result){

            if(result){
                angular.forEach(result.count[0], function(value) {
                    $scope.count = value;
                });

                $scope.showTable      = true;
                $scope.more_results   = $scope.count > ($scope.page * $scope.pageSize);
                $scope.transactions   = result.records;
                $scope.showNavigation = true;
                $scope.hideNavigation = !(!$scope.more_results && $scope.page == 1);
                $scope.totalPages     = Math.ceil($scope.count / $scope.pageSize);
                $scope.pageDisplay    = "Side: " + $scope.page + " av " + $scope.totalPages;
                $scope.sortReady      = true;
            }
        });
    };

    $scope.pageSizeChange = function(){
        $scope.page = 1;
        $scope.queryTransaction();
    };

    $scope.navigate = function(way) {
        if((way == -1 && $scope.page > 1 && $scope.showNavigation) || (way == 1 && $scope.more_results && $scope.showNavigation)){
            $scope.page          += way;
            $scope.showNavigation = false;
            $scope.queryTransaction();
        }
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
    };

    $scope.showTransactionsProperty = function(id,address){
        if(address != undefined) $location.path("/transactions/property/" + id + "/" + address);
        else $location.path("/transactions/property/" + id);
    };

    $scope.tooltip_show = function(index, event) {
        var target  = angular.element(event.currentTarget)[0];
        var rect    = target.getBoundingClientRect();
        var vars    = { y: 0 };

        if(rect.y == undefined){
            vars.y = rect.top;
        }else vars = rect;
        setTimeout(function(){
            self = document.getElementsByClassName("tooltip");
            self = self[self.length-1];
            //self.style.top = ((index - 1) * 35) + "px";
            self.style.top   = vars.y - 313 + window.scrollY + "px";
            self.style.display  = "block";
        }, 10);
    }


    $scope.queryTransaction();

});
