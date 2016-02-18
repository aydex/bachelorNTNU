var app = angular

	.module('app', [])

	.controller('appCtrl', function($scope, $http) {
		//bare testing
		$scope.prototype = [
		{
			navn: 'Tor Hødnebø',
			eiendom: 1234
		},{
			navn: 'Adrian Hundseth',
			eiendom: 3247
		},{
			navn: 'Kathrine Løfqvist',
			eiendom: 4883
		}];
		//For database connection og henting av data
		$http.get("/../api/test.php?name=bern")
		.then(function (response) {$scope.elements = response.data.records;});


	});
