kommunalApp.directive('searchTable', function(){
    return{
        restrict: 'EA',
        replace: false,
        scope: {
            participant: '='
        },
        templateUrl: 'views/searchTableRow.html',
        link: function(scope, element, attr) {
            var kommuneliste = scope.participant.Kommuner.split(",");
            var kommuner = [];
            var overflow = (kommuneliste.length > 5);
            angular.forEach(kommuneliste, function(entry){
                var navn = entry.split(":")[1]
                if (overflow){
                    navn = navn.substring(0,3) + ".";
                }
                kommuner.push({kommunenr: entry.split(":")[0],navn: navn})
            });
            scope.participant.HandletMedKommune = (scope.participant.Kommuner != "");
            scope.participant.Kommuner = kommuner;
            
        }
    }
})