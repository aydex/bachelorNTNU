
kommunalApp.directive('svgMap', ['$compile', '$http', '$templateCache', '$filter', function ($compile, $http, $templateCache, $filter) {
    return {
        restrict: 'EA',
        controller: function($scope, $route, $location, $attrs) {
            this.updateMap = function (url) {

                if(url == "oslo" || url=="Oslo") {
                    var name_encoded = encodeURIComponent("Oslo");
                    $location.path("/transactions/deltager/" + name_encoded + " KOMMUNE/437842/K");

                } else {
                    $scope.countySelected = true;

                    $http.get("images/kommunekart/" + url + ".svg", {cache: $templateCache})
                        .success(function(templateContent) {
                            var newMap = $compile(templateContent)($scope);
                            $scope.mapElement.replaceWith(newMap);
                            $scope.mapElement = newMap;
                            var cities = angular.element(document.querySelectorAll('.land'));
                            $scope.countyId = cities[0].attributes["inkscape:label"].value.slice(2,4);
                            $scope.county = url;
                            var countyName = $scope.countyQuery($scope.countyId);
                            countyName.then(function(result) {
                                $scope.countyName = (result.records[0]["Fylkenavn"]);
                                angular.forEach(cities, function(path) {
                                    var cityElement = angular.element(path);
                                    cityElement.attr("city", "");
                                    $compile(cityElement)($scope)
                                });
                            });
                        });
                }
            };

            $scope.getMunicipalities = function () {
                return $http.get("./api/ask.php?getMunicipalities")
                    .then(function (response) {
                        return {records: response.data.records};
                    });
            };

            $scope.back = function() {
                $route.reload();
            };

            $scope.countyQuery = function(countyId) {
                return $http.get("./api/ask.php?countyId=" + countyId)
                    .then(function (response) {
                        return {records: response.data.records};
                    });
            };

            $scope.showAllCounty = function() {
                $scope.countyToParticipant = {
                    "data":
                        [
                            {
                                "Kommune": 1,
                                "Deltagerid": 425564
                            },
                            {
                                "Kommune": 2,
                                "Deltagerid": 437703
                            },
                            {
                                "Kommune": 4,
                                "Deltagerid": 433946
                            },
                            {
                                "Kommune": 5,
                                "Deltagerid": 438511
                            },
                            {
                                "Kommune": 6,
                                "Deltagerid": 439376
                            },
                            {
                                "Kommune": 7,
                                "Deltagerid": 434278
                            },
                            {
                                "Kommune": 8,
                                "Deltagerid": 433663
                            },
                            {
                                "Kommune": 9,
                                "Deltagerid": 434085
                            },
                            {
                                "Kommune": 10,
                                "Deltagerid": 438365
                            },
                            {
                                "Kommune": 11,
                                "Deltagerid": 440935
                            },
                            {
                                "Kommune": 11,
                                "Deltagerid": 442245
                            },
                            {
                                "Kommune": 12,
                                "Deltagerid": 433395
                            },
                            {
                                "Kommune": 14,
                                "Deltagerid": 433819
                            },
                            {
                                "Kommune": 15,
                                "Deltagerid": 434302
                            },
                            {
                                "Kommune": 16,
                                "Deltagerid": 433397
                            },
                            {
                                "Kommune": 17,
                                "Deltagerid": 433448
                            },
                            {
                                "Kommune": 17,
                                "Deltagerid": 442232
                            },
                            {
                                "Kommune": 18,
                                "Deltagerid": 439481
                            },
                            {
                                "Kommune": 19,
                                "Deltagerid": 426078
                            },
                            {
                                "Kommune": 19,
                                "Deltagerid": 442262
                            },
                            {
                                "Kommune": 20,
                                "Deltagerid": 439491
                            }
                        ]
                };
                $scope.countyDeltagerId = ($filter('filter')($scope.countyToParticipant.data, {'Kommune': parseInt($scope.countyId)}, true));
                $location.path("/transactions/deltager/" + $scope.countyName + " FYLKESKOMMUNE/" + $scope.countyDeltagerId[0]["Deltagerid"] + "/K");
            };
        },
        link: function ($scope, element) {
            $scope.municipalities = $scope.getMunicipalities();
            $scope.municipalities.then(function() {
                var regions = element[0].querySelectorAll('.land');
                angular.forEach(regions, function (path) {
                    var regionElement = angular.element(path);
                    regionElement.attr("region", "");
                    $compile(regionElement)($scope);
                });
                $scope.mapElement = angular.element(element[0]);
            });
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

kommunalApp.directive('city', ['$compile', '$location', '$http', '$filter', function ($compile, $location, $http, $filter) {
    return {
        restrict: 'EA',
        scope: true,
        link: function($scope, element, attrs) {

            if(element.attr("inkscape:label") != undefined) {
                $scope.cityId = String(parseInt(element.attr("inkscape:label").slice(2)));
                $scope.municipalityToParticipant = {
                    "101": {
                        "Deltagerid": 437899
                    },
                    "104": {
                        "Deltagerid": 434338
                    },
                    "105": {
                        "Deltagerid": 433444
                    },
                    "106": {
                        "Deltagerid": 433640
                    },
                    "111": {
                        "Deltagerid": 439355
                    },
                    "118": {
                        "Deltagerid": 433756
                    },
                    "119": {
                        "Deltagerid": 439353
                    },
                    "121": {
                        "Deltagerid": 439356
                    },
                    "122": {
                        "Deltagerid": 439357
                    },
                    "123": {
                        "Deltagerid": 426081
                    },
                    "124": {
                        "Deltagerid": 425539
                    },
                    "125": {
                        "Deltagerid": 434333
                    },
                    "127": {
                        "Deltagerid": 433917
                    },
                    "128": {
                        "Deltagerid": 434477
                    },
                    "135": {
                        "Deltagerid": 433747
                    },
                    "136": {
                        "Deltagerid": 437936
                    },
                    "137": {
                        "Deltagerid": 437937
                    },
                    "138": {
                        "Deltagerid": 439358
                    },
                    "211": {
                        "Deltagerid": 442150
                    },
                    "213": {
                        "Deltagerid": 438273
                    },
                    "214": {
                        "Deltagerid": 439363
                    },
                    "215": {
                        "Deltagerid": 439082
                    },
                    "216": {
                        "Deltagerid": 434339
                    },
                    "217": {
                        "Deltagerid": 434342
                    },
                    "219": {
                        "Deltagerid": 432744
                    },
                    "220": {
                        "Deltagerid": 434337
                    },
                    "221": {
                        "Deltagerid": 435179
                    },
                    "226": {
                        "Deltagerid": 434026
                    },
                    "227": {
                        "Deltagerid": 439366
                    },
                    "228": {
                        "Deltagerid": 436332
                    },
                    "229": {
                        "Deltagerid": 439368
                    },
                    "230": {
                        "Deltagerid": 425557
                    },
                    "231": {
                        "Deltagerid": 433319
                    },
                    "233": {
                        "Deltagerid": 441725
                    },
                    "234": {
                        "Deltagerid": 426083
                    },
                    "235": {
                        "Deltagerid": 432390
                    },
                    "236": {
                        "Deltagerid": 439378
                    },
                    "237": {
                        "Deltagerid": 439370
                    },
                    "238": {
                        "Deltagerid": 439371
                    },
                    "239": {
                        "Deltagerid": 433594
                    },
                    "301": {
                        "Deltagerid": 437842
                    },
                    "402": {
                        "Deltagerid": 434290
                    },
                    "403": {
                        "Deltagerid": 440616
                    },
                    "412": {
                        "Deltagerid": 426084
                    },
                    "415": {
                        "Deltagerid": 439372
                    },
                    "417": {
                        "Deltagerid": 440544
                    },
                    "418": {
                        "Deltagerid": 439373
                    },
                    "419": {
                        "Deltagerid": 439359
                    },
                    "420": {
                        "Deltagerid": 439360
                    },
                    "423": {
                        "Deltagerid": 439361
                    },
                    "425": {
                        "Deltagerid": 439362
                    },
                    "427": {
                        "Deltagerid": 436448
                    },
                    "428": {
                        "Deltagerid": 426082
                    },
                    "429": {
                        "Deltagerid": 433653
                    },
                    "430": {
                        "Deltagerid": 439364
                    },
                    "432": {
                        "Deltagerid": 433638
                    },
                    "434": {
                        "Deltagerid": 439365
                    },
                    "436": {
                        "Deltagerid": 433664
                    },
                    "437": {
                        "Deltagerid": 433751
                    },
                    "438": {
                        "Deltagerid": 433626
                    },
                    "439": {
                        "Deltagerid": 433609
                    },
                    "441": {
                        "Deltagerid": 425595
                    },
                    "501": {
                        "Deltagerid": 434517
                    },
                    "502": {
                        "Deltagerid": 433654
                    },
                    "511": {
                        "Deltagerid": 433600
                    },
                    "512": {
                        "Deltagerid": 439367
                    },
                    "513": {
                        "Deltagerid": 438499
                    },
                    "514": {
                        "Deltagerid": 437971
                    },
                    "515": {
                        "Deltagerid": 433570
                    },
                    "516": {
                        "Deltagerid": 425521
                    },
                    "517": {
                        "Deltagerid": 433571
                    },
                    "519": {
                        "Deltagerid": 433899
                    },
                    "520": {
                        "Deltagerid": 433604
                    },
                    "521": {
                        "Deltagerid": 438500
                    },
                    "522": {
                        "Deltagerid": 438501
                    },
                    "528": {
                        "Deltagerid": 439369
                    },
                    "529": {
                        "Deltagerid": 440875
                    },
                    "532": {
                        "Deltagerid": 438502
                    },
                    "533": {
                        "Deltagerid": 438503
                    },
                    "534": {
                        "Deltagerid": 438504
                    },
                    "536": {
                        "Deltagerid": 438505
                    },
                    "538": {
                        "Deltagerid": 426000
                    },
                    "540": {
                        "Deltagerid": 438506
                    },
                    "541": {
                        "Deltagerid": 432262
                    },
                    "542": {
                        "Deltagerid": 438507
                    },
                    "543": {
                        "Deltagerid": 438509
                    },
                    "544": {
                        "Deltagerid": 438508
                    },
                    "545": {
                        "Deltagerid": 438510
                    },
                    "602": {
                        "Deltagerid": 433495
                    },
                    "604": {
                        "Deltagerid": 433991
                    },
                    "605": {
                        "Deltagerid": 433646
                    },
                    "612": {
                        "Deltagerid": 438144
                    },
                    "615": {
                        "Deltagerid": 439377
                    },
                    "617": {
                        "Deltagerid": 439384
                    },
                    "618": {
                        "Deltagerid": 439385
                    },
                    "619": {
                        "Deltagerid": 426086
                    },
                    "620": {
                        "Deltagerid": 440893
                    },
                    "621": {
                        "Deltagerid": 439390
                    },
                    "622": {
                        "Deltagerid": 439391
                    },
                    "623": {
                        "Deltagerid": 440608
                    },
                    "624": {
                        "Deltagerid": 436933
                    },
                    "625": {
                        "Deltagerid": 425541
                    },
                    "626": {
                        "Deltagerid": 425904
                    },
                    "627": {
                        "Deltagerid": 433420
                    },
                    "628": {
                        "Deltagerid": 439392
                    },
                    "631": {
                        "Deltagerid": 433762
                    },
                    "632": {
                        "Deltagerid": 439393
                    },
                    "633": {
                        "Deltagerid": 439374
                    },
                    "701": {
                        "Deltagerid": 439375
                    },
                    "702": {
                        "Deltagerid": 425505
                    },
                    "704": {
                        "Deltagerid": 435740
                    },
                    "706": {
                        "Deltagerid": 438295
                    },
                    "709": {
                        "Deltagerid": 435478
                    },
                    "711": {
                        "Deltagerid": 442155
                    },
                    "713": {
                        "Deltagerid": 433449
                    },
                    "714": {
                        "Deltagerid": 426085
                    },
                    "716": {
                        "Deltagerid": 448272
                    },
                    "719": {
                        "Deltagerid": 439379
                    },
                    "720": {
                        "Deltagerid": 439380
                    },
                    "722": {
                        "Deltagerid": 439381
                    },
                    "723": {
                        "Deltagerid": 439382
                    },
                    "728": {
                        "Deltagerid": 439383
                    },
                    "805": {
                        "Deltagerid": 433628
                    },
                    "806": {
                        "Deltagerid": 433434
                    },
                    "807": {
                        "Deltagerid": 433388
                    },
                    "811": {
                        "Deltagerid": 426087
                    },
                    "814": {
                        "Deltagerid": 433670
                    },
                    "815": {
                        "Deltagerid": 440915
                    },
                    "817": {
                        "Deltagerid": 432312
                    },
                    "819": {
                        "Deltagerid": 439394
                    },
                    "821": {
                        "Deltagerid": 438758
                    },
                    "822": {
                        "Deltagerid": 439395
                    },
                    "826": {
                        "Deltagerid": 426088
                    },
                    "827": {
                        "Deltagerid": 439396
                    },
                    "828": {
                        "Deltagerid": 439397
                    },
                    "829": {
                        "Deltagerid": 442157
                    },
                    "830": {
                        "Deltagerid": 439402
                    },
                    "831": {
                        "Deltagerid": 433591
                    },
                    "833": {
                        "Deltagerid": 439403
                    },
                    "834": {
                        "Deltagerid": 439404
                    },
                    "901": {
                        "Deltagerid": 439443
                    },
                    "904": {
                        "Deltagerid": 426089
                    },
                    "906": {
                        "Deltagerid": 433708
                    },
                    "911": {
                        "Deltagerid": 439405
                    },
                    "912": {
                        "Deltagerid": 439406
                    },
                    "914": {
                        "Deltagerid": 439411
                    },
                    "919": {
                        "Deltagerid": 434700
                    },
                    "926": {
                        "Deltagerid": 439409
                    },
                    "928": {
                        "Deltagerid": 439412
                    },
                    "929": {
                        "Deltagerid": 426090
                    },
                    "935": {
                        "Deltagerid": 426091
                    },
                    "937": {
                        "Deltagerid": 439413
                    },
                    "938": {
                        "Deltagerid": 439414
                    },
                    "940": {
                        "Deltagerid": 439416
                    },
                    "941": {
                        "Deltagerid": 437817
                    },
                    "1001": {
                        "Deltagerid": 438903
                    },
                    "1002": {
                        "Deltagerid": 439433
                    },
                    "1003": {
                        "Deltagerid": 439103
                    },
                    "1004": {
                        "Deltagerid": 439423
                    },
                    "1014": {
                        "Deltagerid": 440889
                    },
                    "1017": {
                        "Deltagerid": 433287
                    },
                    "1018": {
                        "Deltagerid": 439421
                    },
                    "1021": {
                        "Deltagerid": 439420
                    },
                    "1026": {
                        "Deltagerid": 439419
                    },
                    "1027": {
                        "Deltagerid": 439418
                    },
                    "1029": {
                        "Deltagerid": 439417
                    },
                    "1032": {
                        "Deltagerid": 434714
                    },
                    "1034": {
                        "Deltagerid": 439399
                    },
                    "1037": {
                        "Deltagerid": 439400
                    },
                    "1046": {
                        "Deltagerid": 439401
                    },
                    "1101": {
                        "Deltagerid": 434374
                    },
                    "1102": {
                        "Deltagerid": 439407
                    },
                    "1103": {
                        "Deltagerid": 439408
                    },
                    "1106": {
                        "Deltagerid": 434286
                    },
                    "1111": {
                        "Deltagerid": 439410
                    },
                    "1112": {
                        "Deltagerid": 439415
                    },
                    "1114": {
                        "Deltagerid": 440607
                    },
                    "1119": {
                        "Deltagerid": 439438
                    },
                    "1120": {
                        "Deltagerid": 442120
                    },
                    "1121": {
                        "Deltagerid": 425946
                    },
                    "1122": {
                        "Deltagerid": 439444
                    },
                    "1124": {
                        "Deltagerid": 435208
                    },
                    "1127": {
                        "Deltagerid": 432641
                    },
                    "1129": {
                        "Deltagerid": 433522
                    },
                    "1130": {
                        "Deltagerid": 439446
                    },
                    "1133": {
                        "Deltagerid": 426096
                    },
                    "1134": {
                        "Deltagerid": 439448
                    },
                    "1135": {
                        "Deltagerid": 439450
                    },
                    "1141": {
                        "Deltagerid": 433396
                    },
                    "1142": {
                        "Deltagerid": 439452
                    },
                    "1144": {
                        "Deltagerid": 439453
                    },
                    "1145": {
                        "Deltagerid": 439454
                    },
                    "1146": {
                        "Deltagerid": 439455
                    },
                    "1149": {
                        "Deltagerid": 442240
                    },
                    "1151": {
                        "Deltagerid": 439456
                    },
                    "1160": {
                        "Deltagerid": 451667
                    },
                    "1201": {
                        "Deltagerid": 439173
                    },
                    "1211": {
                        "Deltagerid": 437992
                    },
                    "1216": {
                        "Deltagerid": 426092
                    },
                    "1219": {
                        "Deltagerid": 425413
                    },
                    "1221": {
                        "Deltagerid": 433606
                    },
                    "1222": {
                        "Deltagerid": 434285
                    },
                    "1223": {
                        "Deltagerid": 437983
                    },
                    "1224": {
                        "Deltagerid": 439426
                    },
                    "1227": {
                        "Deltagerid": 434362
                    },
                    "1228": {
                        "Deltagerid": 439428
                    },
                    "1232": {
                        "Deltagerid": 434312
                    },
                    "1233": {
                        "Deltagerid": 441108
                    },
                    "1234": {
                        "Deltagerid": 425586
                    },
                    "1235": {
                        "Deltagerid": 438274
                    },
                    "1238": {
                        "Deltagerid": 434313
                    },
                    "1241": {
                        "Deltagerid": 439434
                    },
                    "1242": {
                        "Deltagerid": 439435
                    },
                    "1243": {
                        "Deltagerid": 434156
                    },
                    "1244": {
                        "Deltagerid": 433784
                    },
                    "1245": {
                        "Deltagerid": 439174
                    },
                    "1246": {
                        "Deltagerid": 436163
                    },
                    "1247": {
                        "Deltagerid": 439172
                    },
                    "1251": {
                        "Deltagerid": 438636
                    },
                    "1252": {
                        "Deltagerid": 439437
                    },
                    "1253": {
                        "Deltagerid": 426063
                    },
                    "1256": {
                        "Deltagerid": 436031
                    },
                    "1259": {
                        "Deltagerid": 433437
                    },
                    "1260": {
                        "Deltagerid": 436969
                    },
                    "1263": {
                        "Deltagerid": 432664
                    },
                    "1264": {
                        "Deltagerid": 435239
                    },
                    "1265": {
                        "Deltagerid": 434282
                    },
                    "1266": {
                        "Deltagerid": 434528
                    },
                    "1401": {
                        "Deltagerid": 432742
                    },
                    "1411": {
                        "Deltagerid": 433369
                    },
                    "1412": {
                        "Deltagerid": 439424
                    },
                    "1413": {
                        "Deltagerid": 439425
                    },
                    "1416": {
                        "Deltagerid": 434361
                    },
                    "1417": {
                        "Deltagerid": 433112
                    },
                    "1418": {
                        "Deltagerid": 440547
                    },
                    "1419": {
                        "Deltagerid": 439427
                    },
                    "1420": {
                        "Deltagerid": 432910
                    },
                    "1421": {
                        "Deltagerid": 439430
                    },
                    "1422": {
                        "Deltagerid": 436952
                    },
                    "1424": {
                        "Deltagerid": 436951
                    },
                    "1426": {
                        "Deltagerid": 439431
                    },
                    "1428": {
                        "Deltagerid": 439432
                    },
                    "1429": {
                        "Deltagerid": 426093
                    },
                    "1430": {
                        "Deltagerid": 439060
                    },
                    "1431": {
                        "Deltagerid": 439058
                    },
                    "1432": {
                        "Deltagerid": 440902
                    },
                    "1433": {
                        "Deltagerid": 439059
                    },
                    "1438": {
                        "Deltagerid": 437956
                    },
                    "1439": {
                        "Deltagerid": 434064
                    },
                    "1441": {
                        "Deltagerid": 440621
                    },
                    "1443": {
                        "Deltagerid": 433377
                    },
                    "1444": {
                        "Deltagerid": 425430
                    },
                    "1445": {
                        "Deltagerid": 439436
                    },
                    "1449": {
                        "Deltagerid": 439081
                    },
                    "1502": {
                        "Deltagerid": 434275
                    },
                    "1504": {
                        "Deltagerid": 434065
                    },
                    "1505": {
                        "Deltagerid": 454290
                    },
                    "1511": {
                        "Deltagerid": 439445
                    },
                    "1514": {
                        "Deltagerid": 425242
                    },
                    "1515": {
                        "Deltagerid": 439447
                    },
                    "1516": {
                        "Deltagerid": 439451
                    },
                    "1517": {
                        "Deltagerid": 439449
                    },
                    "1519": {
                        "Deltagerid": 433588
                    },
                    "1520": {
                        "Deltagerid": 433539
                    },
                    "1523": {
                        "Deltagerid": 426095
                    },
                    "1524": {
                        "Deltagerid": 433532
                    },
                    "1525": {
                        "Deltagerid": 439457
                    },
                    "1526": {
                        "Deltagerid": 439459
                    },
                    "1528": {
                        "Deltagerid": 439460
                    },
                    "1529": {
                        "Deltagerid": 439461
                    },
                    "1531": {
                        "Deltagerid": 439462
                    },
                    "1532": {
                        "Deltagerid": 439464
                    },
                    "1534": {
                        "Deltagerid": 439465
                    },
                    "1535": {
                        "Deltagerid": 433613
                    },
                    "1539": {
                        "Deltagerid": 426097
                    },
                    "1543": {
                        "Deltagerid": 426098
                    },
                    "1545": {
                        "Deltagerid": 439466
                    },
                    "1546": {
                        "Deltagerid": 439467
                    },
                    "1547": {
                        "Deltagerid": 439468
                    },
                    "1548": {
                        "Deltagerid": 425609
                    },
                    "1551": {
                        "Deltagerid": 434544
                    },
                    "1554": {
                        "Deltagerid": 438796
                    },
                    "1557": {
                        "Deltagerid": 439469
                    },
                    "1560": {
                        "Deltagerid": 439470
                    },
                    "1563": {
                        "Deltagerid": 439471
                    },
                    "1566": {
                        "Deltagerid": 439472
                    },
                    "1567": {
                        "Deltagerid": 433651
                    },
                    "1571": {
                        "Deltagerid": 438784
                    },
                    "1573": {
                        "Deltagerid": 434445
                    },
                    "1576": {
                        "Deltagerid": 451699
                    },
                    "1601": {
                        "Deltagerid": 433942
                    },
                    "1612": {
                        "Deltagerid": 433657
                    },
                    "1613": {
                        "Deltagerid": 439476
                    },
                    "1617": {
                        "Deltagerid": 433439
                    },
                    "1620": {
                        "Deltagerid": 439477
                    },
                    "1621": {
                        "Deltagerid": 439478
                    },
                    "1622": {
                        "Deltagerid": 425531
                    },
                    "1624": {
                        "Deltagerid": 434322
                    },
                    "1627": {
                        "Deltagerid": 434353
                    },
                    "1630": {
                        "Deltagerid": 439480
                    },
                    "1632": {
                        "Deltagerid": 434325
                    },
                    "1633": {
                        "Deltagerid": 434335
                    },
                    "1634": {
                        "Deltagerid": 439482
                    },
                    "1635": {
                        "Deltagerid": 433645
                    },
                    "1636": {
                        "Deltagerid": 437800
                    },
                    "1638": {
                        "Deltagerid": 437799
                    },
                    "1640": {
                        "Deltagerid": 433611
                    },
                    "1644": {
                        "Deltagerid": 433157
                    },
                    "1648": {
                        "Deltagerid": 440551
                    },
                    "1653": {
                        "Deltagerid": 433423
                    },
                    "1657": {
                        "Deltagerid": 433605
                    },
                    "1662": {
                        "Deltagerid": 437798
                    },
                    "1663": {
                        "Deltagerid": 440920
                    },
                    "1664": {
                        "Deltagerid": 441151
                    },
                    "1665": {
                        "Deltagerid": 426100
                    },
                    "1702": {
                        "Deltagerid": 425527
                    },
                    "1703": {
                        "Deltagerid": 434057
                    },
                    "1711": {
                        "Deltagerid": 425434
                    },
                    "1714": {
                        "Deltagerid": 433620
                    },
                    "1717": {
                        "Deltagerid": 434371
                    },
                    "1718": {
                        "Deltagerid": 442241
                    },
                    "1719": {
                        "Deltagerid": 433390
                    },
                    "1721": {
                        "Deltagerid": 433391
                    },
                    "1724": {
                        "Deltagerid": 439473
                    },
                    "1725": {
                        "Deltagerid": 433633
                    },
                    "1736": {
                        "Deltagerid": 439474
                    },
                    "1738": {
                        "Deltagerid": 441782
                    },
                    "1739": {
                        "Deltagerid": 439475
                    },
                    "1740": {
                        "Deltagerid": 442243
                    },
                    "1742": {
                        "Deltagerid": 433631
                    },
                    "1743": {
                        "Deltagerid": 437919
                    },
                    "1744": {
                        "Deltagerid": 433610
                    },
                    "1748": {
                        "Deltagerid": 439479
                    },
                    "1749": {
                        "Deltagerid": 425608
                    },
                    "1750": {
                        "Deltagerid": 434439
                    },
                    "1751": {
                        "Deltagerid": 434334
                    },
                    "1755": {
                        "Deltagerid": 434372
                    },
                    "1756": {
                        "Deltagerid": 456901
                    },
                    "1804": {
                        "Deltagerid": 441786
                    },
                    "1805": {
                        "Deltagerid": 438005
                    },
                    "1811": {
                        "Deltagerid": 439484
                    },
                    "1812": {
                        "Deltagerid": 434417
                    },
                    "1813": {
                        "Deltagerid": 439483
                    },
                    "1815": {
                        "Deltagerid": 433766
                    },
                    "1816": {
                        "Deltagerid": 433725
                    },
                    "1818": {
                        "Deltagerid": 426321
                    },
                    "1820": {
                        "Deltagerid": 433422
                    },
                    "1822": {
                        "Deltagerid": 434451
                    },
                    "1824": {
                        "Deltagerid": 425601
                    },
                    "1825": {
                        "Deltagerid": 433724
                    },
                    "1826": {
                        "Deltagerid": 434406
                    },
                    "1827": {
                        "Deltagerid": 434460
                    },
                    "1828": {
                        "Deltagerid": 433566
                    },
                    "1832": {
                        "Deltagerid": 425631
                    },
                    "1833": {
                        "Deltagerid": 426322
                    },
                    "1834": {
                        "Deltagerid": 433729
                    },
                    "1835": {
                        "Deltagerid": 433665
                    },
                    "1836": {
                        "Deltagerid": 434557
                    },
                    "1837": {
                        "Deltagerid": 440553
                    },
                    "1838": {
                        "Deltagerid": 425623
                    },
                    "1839": {
                        "Deltagerid": 438447
                    },
                    "1840": {
                        "Deltagerid": 441772
                    },
                    "1841": {
                        "Deltagerid": 441787
                    },
                    "1845": {
                        "Deltagerid": 441773
                    },
                    "1848": {
                        "Deltagerid": 438766
                    },
                    "1849": {
                        "Deltagerid": 440623
                    },
                    "1850": {
                        "Deltagerid": 441774
                    },
                    "1851": {
                        "Deltagerid": 434494
                    },
                    "1852": {
                        "Deltagerid": 438006
                    },
                    "1853": {
                        "Deltagerid": 433723
                    },
                    "1854": {
                        "Deltagerid": 434462
                    },
                    "1856": {
                        "Deltagerid": 434452
                    },
                    "1857": {
                        "Deltagerid": 439492
                    },
                    "1859": {
                        "Deltagerid": 426039
                    },
                    "1860": {
                        "Deltagerid": 434011
                    },
                    "1865": {
                        "Deltagerid": 433403
                    },
                    "1866": {
                        "Deltagerid": 437731
                    },
                    "1867": {
                        "Deltagerid": 434490
                    },
                    "1868": {
                        "Deltagerid": 425607
                    },
                    "1870": {
                        "Deltagerid": 425665
                    },
                    "1871": {
                        "Deltagerid": 434527
                    },
                    "1874": {
                        "Deltagerid": 434609
                    },
                    "1902": {
                        "Deltagerid": 433647
                    },
                    "1903": {
                        "Deltagerid": 441783
                    },
                    "1911": {
                        "Deltagerid": 441784
                    },
                    "1913": {
                        "Deltagerid": 438007
                    },
                    "1917": {
                        "Deltagerid": 438009
                    },
                    "1919": {
                        "Deltagerid": 438008
                    },
                    "1920": {
                        "Deltagerid": 438010
                    },
                    "1922": {
                        "Deltagerid": 426102
                    },
                    "1923": {
                        "Deltagerid": 438518
                    },
                    "1924": {
                        "Deltagerid": 441785
                    },
                    "1925": {
                        "Deltagerid": 433738
                    },
                    "1926": {
                        "Deltagerid": 426103
                    },
                    "1927": {
                        "Deltagerid": 434419
                    },
                    "1928": {
                        "Deltagerid": 433612
                    },
                    "1929": {
                        "Deltagerid": 434226
                    },
                    "1931": {
                        "Deltagerid": 433597
                    },
                    "1933": {
                        "Deltagerid": 433667
                    },
                    "1936": {
                        "Deltagerid": 433684
                    },
                    "1938": {
                        "Deltagerid": 425526
                    },
                    "1939": {
                        "Deltagerid": 439490
                    },
                    "1940": {
                        "Deltagerid": 442263
                    },
                    "1941": {
                        "Deltagerid": 433895
                    },
                    "1942": {
                        "Deltagerid": 434136
                    },
                    "1943": {
                        "Deltagerid": 433685
                    },
                    "2002": {
                        "Deltagerid": 441788
                    },
                    "2003": {
                        "Deltagerid": 442257
                    },
                    "2004": {
                        "Deltagerid": 439318
                    },
                    "2012": {
                        "Deltagerid": 434385
                    },
                    "2014": {
                        "Deltagerid": 438856
                    },
                    "2015": {
                        "Deltagerid": 439320
                    },
                    "2017": {
                        "Deltagerid": 439319
                    },
                    "2018": {
                        "Deltagerid": 433779
                    },
                    "2019": {
                        "Deltagerid": 433361
                    },
                    "2020": {
                        "Deltagerid": 437982
                    },
                    "2021": {
                        "Deltagerid": 438915
                    },
                    "2022": {
                        "Deltagerid": 433696
                    },
                    "2023": {
                        "Deltagerid": 432531
                    },
                    "2024": {
                        "Deltagerid": 438799
                    },
                    "2025": {
                        "Deltagerid": 434172
                    },
                    "2027": {
                        "Deltagerid": 425522
                    },
                    "2028": {
                        "Deltagerid": 433443
                    },
                    "2030": {
                        "Deltagerid": 433941
                    }
                };
                $scope.municipalities.then(function(result) {
                    $scope.kommune = $filter('filter')(result.records, {'Kommunenr': $scope.cityId}, true);
                    $scope.kommunenavn = $scope.kommune[0]["Kommunenavn"];
                    $scope.kommunenr = $scope.cityId;
                    $scope.cityName = element.attr("id");
                    $scope.cityId = element.attr("inkscape:label").substring(2);
                    $scope.kommuneDeltagerId = $scope.municipalityToParticipant[parseInt($scope.cityId)]["Deltagerid"];

                    $scope.name_encoded = encodeURIComponent($scope.kommunenavn);
                    element.attr("ng-click", "cityClick()");
                    var tooltip = angular.element("<md-tooltip style='z-index: 900000000' md-direction='right'>{{kommunenavn}}</md-tooltip>");
                    element.append(tooltip);

                    element.removeAttr("city");
                    $compile(element)($scope);
                });

                $scope.cityClick = function() {
                    $location.path("/transactions/deltager/" + $scope.name_encoded + " KOMMUNE/" + $scope.kommuneDeltagerId + "/K");
                };
            }
        }
    }
}]);