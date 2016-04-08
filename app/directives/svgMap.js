
kommunalApp.directive('svgMap', ['$compile', '$http', '$templateCache', '$parse', function ($compile, $http, $templateCache) {
    return {
        restrict: 'EA',
        controller: function($scope) {
            this.updateMap = function (url) {
                $http.get("images/kommunekart/" + url + ".svg", {cache: $templateCache})
                    .success(function(templateContent) {
                        $scope.mapElement.replaceWith($compile(templateContent)($scope));
                        var cities = angular.element(document.querySelectorAll('.land'));
                        angular.forEach(cities, function(path) {
                            var cityElement = angular.element(path);
                            cityElement.attr("city", "");
                            $compile(cityElement)($scope)
                        });
                    });
            };
        },
        link: function ($scope, element) {
            var regions = element[0].querySelectorAll('.land');
            angular.forEach(regions, function (path) {
                var regionElement = angular.element(path);
                regionElement.attr("region", "");
                $compile(regionElement)($scope);
            });
            $scope.mapElement = element;

        },
        templateUrl: "images/kommunekart/norge.svg"
      }
}]);

kommunalApp.directive('region', ['$compile', function ($compile) {
    return {
        restrict: 'EA',
        scope: true,
        require: '^^svgMap',
		link: function (scope, element, attrs, svgMapCtrl) {
            scope.elementId = element.attr("id");
            scope.regionHover = function () {
            };
            scope.regionClick = function() {
                svgMapCtrl.updateMap(scope.elementId);
            };

            element.attr("ng-mousemove", "regionHover()");
            element.attr("ng-click", "regionClick()");

            element.removeAttr("region");
            $compile(element)(scope);
        }
    }
}]);

kommunalApp.directive('city', ['$compile', '$location', '$http', function ($compile, $location, $http) {
    return {
        restrict: 'EA',
        scope: {
            cityId: '@'
        },
        link: function($scope, element) {
            $scope.cityName = element.attr("id");
            $scope.cityId = element.attr("inkscape:label").substring(2);
            $scope.cityClick = function() {
                console.log($scope.cityId);
                alert($scope.cityId + "-" + $scope.cityName);
                $scope.cityQuery = $http.get("./api/ask.php?municipalityId=" + $scope.cityId)
                    .success(function (response) {
                        return {records: response.data.records};
                    }).error(function (response) {
                        console.log(response);
                    });
                console.log($scope.cityQuery);
                console.log(JSON.stringify($scope.cityQuery));
                angular.forEach($scope.cityQuery, function(value, key) {
                    console.log(value);
                });
                //$location.path("/search/" + $scope.cityId + "/1/10");
            };

            element.attr("ng-click", "cityClick()");

            element.removeAttr("city");
            $compile(element)($scope);
        }
    }
}]);