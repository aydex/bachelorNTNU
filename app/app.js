/**
 * Created by adrianh on 09.02.16.
 */

angular.module('myApp', []).controller('namesCtrl', function($scope, $http, $timeout) {
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