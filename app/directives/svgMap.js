kommunalApp.directive('svgMap', function ($compile) {
    return {
        restrict: 'A',
        templateUrl: '/images/norway_counties_nostyle.svg',
        link: function (scope, element, attrs) {
            var regions = element[0].querySelectorAll('.land');
            angular.forEach(regions, function (path, key) {
                var regionElement = angular.element(path);
                regionElement.attr("region", "");
                regionElement.attr("dummy-data", "dummyData");
                $compile(regionElement)(scope);
            })
        }
    }
});
