
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

kommunalApp.directive('city', ['$compile', function ($compile) {
    return {
        restrict: 'EA',
        scope: true,
        link: function(scope, element) {
            scope.elementId = element.attr("id");
            scope.cityClick = function() {
                console.log(scope.elementId);
                alert(scope.elementId);
                return scope.elementId;
            };

            element.attr("ng-click", "cityClick()");

            element.removeAttr("city");
            $compile(element)(scope);
        }
    }
}]);