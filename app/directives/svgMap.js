
kommunalApp.directive('svgMap', ['$compile', '$http', '$templateCache', '$parse', function ($compile, $http, $templateCache, $parse) {
    return {
        restrict: 'EA',
        scope: 'false',
        controller: function($scope) {
            this.updateMap = function (url) {
                $http.get("images/kommunekart/" + url + ".svg", {cache: $templateCache})
                    .success(function(templateContent) {
                        $scope.mapElement.replaceWith($compile(templateContent)($scope))
                    });
            };
        },
        link: function ($scope, element, attrs) {
            console.log("link function runnning");
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
            console.log("another link function running");
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