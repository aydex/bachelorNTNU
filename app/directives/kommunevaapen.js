kommunalApp.directive('kommunevaapen', function(){
    return{
        restrict: 'EA',
        replace: true,
        scope: {
            id: '='
        },
        template: '<img class="kommunevaapen" src="images/kommunevaapen/{{id}}.svg.png">',
        link: function(scope, element, attr) {
        }
    }
});