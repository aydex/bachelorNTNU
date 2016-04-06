
kommunalApp.directive('svgMap', ['$compile', '$http', '$templateCache', '$parse', function ($compile, $http, $templateCache, $parse) {
    return {
        restrict: 'EA',
        scope: 'false',
        controller: function($scope) {
            this.updateMap = function (url) {
                $http.get("images/kommunekart/" + url + ".svg", {cache: $templateCache})
                    .success(function(templateContent) {
                        $scope.mapElement.replaceWith($compile(templateContent)($scope));
                        var cities = angular.element(document.querySelectorAll('.land'));
                        angular.forEach(cities, function(path, key) {
                            var cityElement = angular.element(path);
                            cityElement.attr("city", "");
                            $compile(cityElement)($scope)
                        });
                    });
            };
        },
        link: function ($scope, element, attrs) {
            var regions = element[0].querySelectorAll('.land');
            angular.forEach(regions, function (path, key) {
                var regionElement = angular.element(path);
                regionElement.attr("region", "");
                $compile(regionElement)($scope);
            });
            $scope.mapElement = element;

        },
        templateUrl: function($scope, elem, attrs) {
           return "images/kommunekart/"+ $scope.kart +".svg"
        }
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
        link: function(scope, element, attrs) {
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