angular.module('SvgMapApp', [])
    .controller('MainCtrl', ['$scope', function ($scope) {
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
    }]);
/*
angular.module('tooltip', ['ngMaterial'])
.controller('AppCtrl', function($scope) {
  $scope.demo = {
    showTooltip : false,
    tipDirection : ''
  };
});
*/
