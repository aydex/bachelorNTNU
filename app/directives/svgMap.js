
kommunalApp.directive('svgMap', ['$compile', function ($compile) {
    return {
        restrict: 'EA',
        scope: {
          id: '='
        },
        templateUrl:"images/kommunekart/akershus.svg",
        link: function (scope, element, attrs) {
            var regions = element[0].querySelectorAll('.land');
            angular.forEach(regions, function (path, key) {
                var regionElement = angular.element(path);
                regionElement.attr("region", "");
                regionElement.attr("dummy-data", "dummyData");
                $compile(regionElement)(scope);
            })
        }
    };
}]);

kommunalApp.directive('region', ['$compile', function ($compile) {
    return {
        restrict: 'EA',
        scope: true,
		link: function (scope, element, attrs) {
            scope.elementId = element.attr("id");
            scope.regionHover = function () {
            };
            scope.regionClick = function() {
              alert(scope.elementId);

            };
            element.attr("ng-mousemove", "regionHover()");
            element.attr("ng-click", "regionClick()");

            element.removeAttr("region");
            $compile(element)(scope);
        }
    };
}]);
