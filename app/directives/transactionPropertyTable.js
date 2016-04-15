kommunalApp.directive('transactionPropertyTable', function(transaction){
    return{
        restrict: 'EA',
        replace: false,
        scope: {
            transaction: '='
        },
        templateUrl: 'views/transactionsPropertyTableRow.html',
        link: function(scope, element, attr) {
            var handleEntry = function(list){
                angular.forEach(list, function(entry){
                    entry.navn = transaction.capitalFirstLetters(entry.navn);
                    entry.kommune = false;
                    entry.ukjent = false;
                    entry.searchurl = "transactions/deltager/" + encodeURI(entry.navn) +"/" + entry.deltagerid +"/" + entry.deltagertype
                    if (entry.deltagertype == "F") {
                        //entry.navn = transaction.setLastnameAfterFirstname(entry.navn);
                        entry.navn = transaction.abbreviateMiddleNames(entry.navn);
                    } else if (transaction.isMunicipality(entry.deltagertype, entry.navn)) {
                        entry.kommune = true;
                        entry.kommunenavn = entry.navn.replace(" Kommune", "");
                    }
                });

            };
            handleEntry(scope.transaction.buyer);
            handleEntry(scope.transaction.seller);
            var emptyObject = {ukjent: true, kommune: false};

            if (scope.transaction.buyer.length == 0){
                scope.transaction.buyer.push(emptyObject);
            } else if (scope.transaction.seller.length == 0){
                scope.transaction.seller.push(emptyObject);
            }
        }
    }
});