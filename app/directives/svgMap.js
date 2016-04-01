
kommunalApp.directive('svgMap', ['$compile', function ($compile) {
    return {
        restrict: 'EA',
        scope: {

        },
        link: function (scope, element, attrs) {

            var regions = element[0].querySelectorAll('.land');
            angular.forEach(regions, function (path, key) {
                var regionElement = angular.element(path);
                regionElement.attr("region", "");
                $compile(regionElement)(scope);

            })

          },
          templateUrl: function(elem,attrs) {
           return "images/kommunekart/"+ attrs.kart +".svg"
         }
      }
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

               attrs.kart = scope.elementId;
               console.log(attrs.kart);
            };

            element.attr("ng-mousemove", "regionHover()");
            element.attr("ng-click", "regionClick()");

            element.removeAttr("region");
            $compile(element)(scope);
        }
        /*templateUrl: 'images/kommunekart/' + kart + '.svg'*/
    }
}]);
