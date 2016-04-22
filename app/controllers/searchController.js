
kommunalApp.controller('searchController', function($scope, $rootScope, $timeout, $location, $routeParams, $filter, $cookies) {
        $scope.fylker = [{label:"Østfold",value:1,kommuner:[{"kommunenr":101,"label":"halden"},{"kommunenr":104,"label":"moss"},{"kommunenr":105,"label":"sarpsborg"},{"kommunenr":106,"label":"fredrikstad"},{"kommunenr":111,"label":"hvaler"},{"kommunenr":118,"label":"aremark"},{"kommunenr":119,"label":"marker"},{"kommunenr":121,"label":"rømskog"},{"kommunenr":122,"label":"trøgstad"},{"kommunenr":123,"label":"spydeberg"},{"kommunenr":124,"label":"askim"},{"kommunenr":125,"label":"eidsberg"},{"kommunenr":127,"label":"skiptvet"},{"kommunenr":128,"label":"rakkestad"},{"kommunenr":135,"label":"råde"},{"kommunenr":136,"label":"rygge"},{"kommunenr":137,"label":"våler"},{"kommunenr":138,"label":"hobøl"}]},{label:"Akershus",value:2,kommuner:[{"kommunenr":211,"label":"vestby"},{"kommunenr":213,"label":"ski"},{"kommunenr":214,"label":"ås"},{"kommunenr":215,"label":"frogn"},{"kommunenr":216,"label":"nesodden"},{"kommunenr":217,"label":"oppegård"},{"kommunenr":219,"label":"bærum"},{"kommunenr":220,"label":"asker"},{"kommunenr":221,"label":"aurskog-høland"},{"kommunenr":226,"label":"sørum"},{"kommunenr":227,"label":"fet"},{"kommunenr":228,"label":"rælingen"},{"kommunenr":229,"label":"enebakk"},{"kommunenr":230,"label":"lørenskog"},{"kommunenr":231,"label":"skedsmo"},{"kommunenr":233,"label":"nittedal"},{"kommunenr":234,"label":"gjerdrum"},{"kommunenr":235,"label":"ullensaker"},{"kommunenr":236,"label":"nes (akershus)"},{"kommunenr":237,"label":"eidsvoll"},{"kommunenr":238,"label":"nannestad"},{"kommunenr":239,"label":"hurdal"}]},{label:"Oslo",value:301,kommuner:[]},{label:"Hedmark",value:4,kommuner:[{"kommunenr":402,"label":"kongsvinger"},{"kommunenr":403,"label":"hamar"},{"kommunenr":412,"label":"ringsaker"},{"kommunenr":415,"label":"løten"},{"kommunenr":417,"label":"stange"},{"kommunenr":418,"label":"nord-odal"},{"kommunenr":419,"label":"sør-odal"},{"kommunenr":420,"label":"eidskog"},{"kommunenr":423,"label":"grue"},{"kommunenr":425,"label":"åsnes"},{"kommunenr":426,"label":"våler"},{"kommunenr":427,"label":"elverum"},{"kommunenr":428,"label":"trysil"},{"kommunenr":429,"label":"åmot"},{"kommunenr":430,"label":"stor-elvdal"},{"kommunenr":432,"label":"rendalen"},{"kommunenr":434,"label":"engerdal"},{"kommunenr":436,"label":"tolga"},{"kommunenr":437,"label":"tynset"},{"kommunenr":438,"label":"alvdal"},{"kommunenr":439,"label":"folldal"},{"kommunenr":441,"label":"os (hedmark)"}]},{label:"Oppland",value:5,kommuner:[{"kommunenr":501,"label":"lillehammer"},{"kommunenr":502,"label":"gjøvik"},{"kommunenr":511,"label":"dovre"},{"kommunenr":512,"label":"lesja"},{"kommunenr":513,"label":"skjåk"},{"kommunenr":514,"label":"lom"},{"kommunenr":515,"label":"vågå"},{"kommunenr":516,"label":"nord-fron"},{"kommunenr":517,"label":"sel"},{"kommunenr":519,"label":"sør-fron"},{"kommunenr":520,"label":"ringebu"},{"kommunenr":521,"label":"øyer"},{"kommunenr":522,"label":"gausdal"},{"kommunenr":528,"label":"østre toten"},{"kommunenr":529,"label":"vestre toten"},{"kommunenr":532,"label":"jevnaker"},{"kommunenr":533,"label":"lunner"},{"kommunenr":534,"label":"gran"},{"kommunenr":536,"label":"søndre land"},{"kommunenr":538,"label":"nordre land"},{"kommunenr":540,"label":"sør-aurdal"},{"kommunenr":541,"label":"etnedal"},{"kommunenr":542,"label":"nord-aurdal"},{"kommunenr":543,"label":"vestre slidre"},{"kommunenr":544,"label":"øystre slidre"},{"kommunenr":545,"label":"vang"}]},{label:"Buskerud",value:6,kommuner:[{"kommunenr":602,"label":"drammen"},{"kommunenr":604,"label":"kongsberg"},{"kommunenr":605,"label":"ringerike"},{"kommunenr":612,"label":"hole"},{"kommunenr":615,"label":"flå"},{"kommunenr":616,"label":"nes (buskerud)"},{"kommunenr":617,"label":"gol"},{"kommunenr":618,"label":"hemsedal"},{"kommunenr":619,"label":"ål"},{"kommunenr":620,"label":"hol"},{"kommunenr":621,"label":"sigdal"},{"kommunenr":622,"label":"krødsherad"},{"kommunenr":623,"label":"modum"},{"kommunenr":624,"label":"øvre eiker"},{"kommunenr":625,"label":"nedre eiker"},{"kommunenr":626,"label":"lier"},{"kommunenr":627,"label":"røyken"},{"kommunenr":628,"label":"hurum"},{"kommunenr":631,"label":"flesberg"},{"kommunenr":632,"label":"rollag"},{"kommunenr":633,"label":"nore og uvdal"}]},{label:"Vestfold",value:7,kommuner:[{"kommunenr":701,"label":"horten"},{"kommunenr":702,"label":"holmestrand"},{"kommunenr":704,"label":"tønsberg"},{"kommunenr":706,"label":"sandefjord"},{"kommunenr":709,"label":"larvik"},{"kommunenr":711,"label":"svelvik"},{"kommunenr":713,"label":"sande (v.)"},{"kommunenr":714,"label":"hof"},{"kommunenr":716,"label":"re"},{"kommunenr":719,"label":"andebu"},{"kommunenr":720,"label":"stokke"},{"kommunenr":722,"label":"nøtterøy"},{"kommunenr":723,"label":"tjøme"},{"kommunenr":728,"label":"lardal"}]},{label:"Telemark",value:8,kommuner:[{"kommunenr":805,"label":"porsgrunn"},{"kommunenr":806,"label":"skien"},{"kommunenr":807,"label":"notodden"},{"kommunenr":811,"label":"siljan"},{"kommunenr":814,"label":"bamble"},{"kommunenr":815,"label":"kragerø"},{"kommunenr":817,"label":"drangedal"},{"kommunenr":819,"label":"nome"},{"kommunenr":821,"label":"bø (tel.)"},{"kommunenr":822,"label":"sauherad"},{"kommunenr":826,"label":"tinn"},{"kommunenr":827,"label":"hjartdal"},{"kommunenr":828,"label":"seljord"},{"kommunenr":829,"label":"kviteseid"},{"kommunenr":830,"label":"nissedal"},{"kommunenr":831,"label":"fyresdal"},{"kommunenr":833,"label":"tokke"},{"kommunenr":834,"label":"vinje"}]},{label:"Aust-Agder",value:9,kommuner:[{"kommunenr":901,"label":"risør"},{"kommunenr":904,"label":"grimstad"},{"kommunenr":906,"label":"arendal"},{"kommunenr":911,"label":"gjerstad"},{"kommunenr":912,"label":"vegårshei"},{"kommunenr":914,"label":"tvedestrand"},{"kommunenr":919,"label":"froland"},{"kommunenr":926,"label":"lillesand"},{"kommunenr":928,"label":"birkenes"},{"kommunenr":929,"label":"åmli"},{"kommunenr":935,"label":"iveland"},{"kommunenr":937,"label":"evje og hornnes"},{"kommunenr":938,"label":"bygland"},{"kommunenr":940,"label":"valle"},{"kommunenr":941,"label":"bykle"}]},{label:"Vest-Agder",value:10,kommuner:[{"kommunenr":1001,"label":"kristiansand"},{"kommunenr":1002,"label":"mandal"},{"kommunenr":1003,"label":"farsund"},{"kommunenr":1004,"label":"flekkefjord"},{"kommunenr":1014,"label":"vennesla"},{"kommunenr":1017,"label":"songdalen"},{"kommunenr":1018,"label":"søgne"},{"kommunenr":1021,"label":"marnardal"},{"kommunenr":1026,"label":"åseral"},{"kommunenr":1027,"label":"audnedal"},{"kommunenr":1029,"label":"lindesnes"},{"kommunenr":1032,"label":"lyngdal"},{"kommunenr":1034,"label":"hægebostad"},{"kommunenr":1037,"label":"kvinesdal"},{"kommunenr":1046,"label":"sirdal"}]},{label:"Rogaland",value:11,kommuner:[{"kommunenr":1101,"label":"eigersund"},{"kommunenr":1102,"label":"sandnes"},{"kommunenr":1103,"label":"stavanger"},{"kommunenr":1106,"label":"haugesund"},{"kommunenr":1111,"label":"sokndal"},{"kommunenr":1112,"label":"lund"},{"kommunenr":1114,"label":"bjerkreim"},{"kommunenr":1119,"label":"hå"},{"kommunenr":1120,"label":"klepp"},{"kommunenr":1121,"label":"time"},{"kommunenr":1122,"label":"gjesdal"},{"kommunenr":1124,"label":"sola"},{"kommunenr":1127,"label":"randaberg"},{"kommunenr":1129,"label":"forsand"},{"kommunenr":1130,"label":"strand"},{"kommunenr":1133,"label":"hjelmeland"},{"kommunenr":1134,"label":"suldal"},{"kommunenr":1135,"label":"sauda"},{"kommunenr":1141,"label":"finnøy"},{"kommunenr":1142,"label":"rennesøy"},{"kommunenr":1144,"label":"kvitsøy"},{"kommunenr":1145,"label":"bokn"},{"kommunenr":1146,"label":"tysvær"},{"kommunenr":1149,"label":"karmøy"},{"kommunenr":1151,"label":"utsira"},{"kommunenr":1160,"label":"vindafjord"}]},{label:"Hordaland",value:12,kommuner:[{"kommunenr":1201,"label":"bergen"},{"kommunenr":1211,"label":"etne"},{"kommunenr":1216,"label":"sveio"},{"kommunenr":1219,"label":"bømlo"},{"kommunenr":1221,"label":"stord"},{"kommunenr":1222,"label":"fitjar"},{"kommunenr":1223,"label":"tysnes"},{"kommunenr":1224,"label":"kvinnherad"},{"kommunenr":1227,"label":"jondal"},{"kommunenr":1228,"label":"odda"},{"kommunenr":1231,"label":"ullensvang"},{"kommunenr":1232,"label":"eidfjord"},{"kommunenr":1233,"label":"ulvik"},{"kommunenr":1234,"label":"granvin"},{"kommunenr":1235,"label":"voss"},{"kommunenr":1238,"label":"kvam"},{"kommunenr":1241,"label":"fusa"},{"kommunenr":1242,"label":"samnanger"},{"kommunenr":1243,"label":"os (hordaland)"},{"kommunenr":1244,"label":"austevoll"},{"kommunenr":1245,"label":"sund"},{"kommunenr":1246,"label":"fjell"},{"kommunenr":1247,"label":"askøy"},{"kommunenr":1251,"label":"vaksdal"},{"kommunenr":1252,"label":"modalen"},{"kommunenr":1253,"label":"osterøy"},{"kommunenr":1256,"label":"meland"},{"kommunenr":1259,"label":"øygarden"},{"kommunenr":1260,"label":"radøy"},{"kommunenr":1263,"label":"lindås"},{"kommunenr":1264,"label":"austrheim"},{"kommunenr":1265,"label":"fedje"},{"kommunenr":1266,"label":"masfjorden"}]},{label:"Sogn og Fjordane",value:14,kommuner:[{"kommunenr":1401,"label":"flora"},{"kommunenr":1411,"label":"gulen"},{"kommunenr":1412,"label":"solund"},{"kommunenr":1413,"label":"hyllestad"},{"kommunenr":1416,"label":"høyanger"},{"kommunenr":1417,"label":"vik"},{"kommunenr":1418,"label":"balestrand"},{"kommunenr":1419,"label":"leikanger"},{"kommunenr":1420,"label":"sogndal"},{"kommunenr":1421,"label":"aurland"},{"kommunenr":1422,"label":"lærdal"},{"kommunenr":1424,"label":"årdal"},{"kommunenr":1426,"label":"luster"},{"kommunenr":1428,"label":"askvoll"},{"kommunenr":1429,"label":"fjaler"},{"kommunenr":1430,"label":"gaular"},{"kommunenr":1431,"label":"jølster"},{"kommunenr":1432,"label":"førde"},{"kommunenr":1433,"label":"naustdal"},{"kommunenr":1438,"label":"bremanger"},{"kommunenr":1439,"label":"vågsøy"},{"kommunenr":1441,"label":"selje"},{"kommunenr":1443,"label":"eid"},{"kommunenr":1444,"label":"hornindal"},{"kommunenr":1445,"label":"gloppen"},{"kommunenr":1449,"label":"stryn"}]},{label:"Møre og Romsdal",value:15,kommuner:[{"kommunenr":1502,"label":"molde"},{"kommunenr":1504,"label":"ålesund"},{"kommunenr":1505,"label":"kristiansund"},{"kommunenr":1511,"label":"vanylven"},{"kommunenr":1514,"label":"sande (m.r.)"},{"kommunenr":1515,"label":"herøy (m.r.)"},{"kommunenr":1516,"label":"ulstein"},{"kommunenr":1517,"label":"hareid"},{"kommunenr":1519,"label":"volda"},{"kommunenr":1520,"label":"ørsta"},{"kommunenr":1523,"label":"ørskog"},{"kommunenr":1524,"label":"norddal"},{"kommunenr":1525,"label":"stranda"},{"kommunenr":1526,"label":"stordal"},{"kommunenr":1528,"label":"sykkylven"},{"kommunenr":1529,"label":"skodje"},{"kommunenr":1531,"label":"sula"},{"kommunenr":1532,"label":"giske"},{"kommunenr":1534,"label":"haram"},{"kommunenr":1535,"label":"vestnes"},{"kommunenr":1539,"label":"rauma"},{"kommunenr":1543,"label":"nesset"},{"kommunenr":1545,"label":"midsund"},{"kommunenr":1546,"label":"sandøy"},{"kommunenr":1547,"label":"aukra"},{"kommunenr":1548,"label":"fræna"},{"kommunenr":1551,"label":"eide"},{"kommunenr":1554,"label":"averøy"},{"kommunenr":1557,"label":"gjemnes"},{"kommunenr":1560,"label":"tingvoll"},{"kommunenr":1563,"label":"sunndal"},{"kommunenr":1566,"label":"surnadal"},{"kommunenr":1567,"label":"rindal"},{"kommunenr":1571,"label":"halsa"},{"kommunenr":1573,"label":"smøla"},{"kommunenr":1576,"label":"aure"}]},{label:"Sør-Trøndelag",value:16,kommuner:[{"kommunenr":1601,"label":"trondheim"},{"kommunenr":1612,"label":"hemne"},{"kommunenr":1613,"label":"snillfjord"},{"kommunenr":1617,"label":"hitra"},{"kommunenr":1620,"label":"frøya"},{"kommunenr":1621,"label":"ørland"},{"kommunenr":1622,"label":"agdenes"},{"kommunenr":1624,"label":"rissa"},{"kommunenr":1627,"label":"bjugn"},{"kommunenr":1630,"label":"åfjord"},{"kommunenr":1632,"label":"roan"},{"kommunenr":1633,"label":"osen"},{"kommunenr":1634,"label":"oppdal"},{"kommunenr":1635,"label":"rennebu"},{"kommunenr":1636,"label":"meldal"},{"kommunenr":1638,"label":"orkdal"},{"kommunenr":1640,"label":"røros"},{"kommunenr":1644,"label":"holtålen"},{"kommunenr":1648,"label":"midtre gauldal"},{"kommunenr":1653,"label":"melhus"},{"kommunenr":1657,"label":"skaun"},{"kommunenr":1662,"label":"klæbu"},{"kommunenr":1663,"label":"malvik"},{"kommunenr":1664,"label":"selbu"},{"kommunenr":1665,"label":"tydal"}]},{label:"Nord-Trøndelag",value:17,kommuner:[{"kommunenr":1702,"label":"steinkjer"},{"kommunenr":1703,"label":"namsos"},{"kommunenr":1711,"label":"meråker"},{"kommunenr":1714,"label":"stjørdal"},{"kommunenr":1717,"label":"frosta"},{"kommunenr":1718,"label":"leksvik"},{"kommunenr":1719,"label":"levanger"},{"kommunenr":1721,"label":"verdal"},{"kommunenr":1724,"label":"verran"},{"kommunenr":1725,"label":"namdalseid"},{"kommunenr":1736,"label":"snåsa"},{"kommunenr":1738,"label":"lierne"},{"kommunenr":1739,"label":"røyrvik"},{"kommunenr":1740,"label":"namsskogan"},{"kommunenr":1742,"label":"grong"},{"kommunenr":1743,"label":"høylandet"},{"kommunenr":1744,"label":"overhalla"},{"kommunenr":1748,"label":"fosnes"},{"kommunenr":1749,"label":"flatanger"},{"kommunenr":1750,"label":"vikna"},{"kommunenr":1751,"label":"nærøy"},{"kommunenr":1755,"label":"leka"},{"kommunenr":1756,"label":"inderøy"}]},{label:"Nordland",value:18,kommuner:[{"kommunenr":1804,"label":"bodø"},{"kommunenr":1805,"label":"narvik"},{"kommunenr":1811,"label":"bindal"},{"kommunenr":1812,"label":"sømna"},{"kommunenr":1813,"label":"brønnøy"},{"kommunenr":1815,"label":"vega"},{"kommunenr":1816,"label":"vevelstad"},{"kommunenr":1818,"label":"herøy (n.)"},{"kommunenr":1820,"label":"alstahaug"},{"kommunenr":1822,"label":"leirfjord"},{"kommunenr":1824,"label":"vefsn"},{"kommunenr":1825,"label":"grane"},{"kommunenr":1826,"label":"hattfjelldal"},{"kommunenr":1827,"label":"dønna"},{"kommunenr":1828,"label":"nesna"},{"kommunenr":1832,"label":"hemnes"},{"kommunenr":1833,"label":"rana"},{"kommunenr":1834,"label":"lurøy"},{"kommunenr":1835,"label":"træna"},{"kommunenr":1836,"label":"rødøy"},{"kommunenr":1837,"label":"meløy"},{"kommunenr":1838,"label":"gildeskål"},{"kommunenr":1839,"label":"beiarn"},{"kommunenr":1840,"label":"saltdal"},{"kommunenr":1841,"label":"fauske"},{"kommunenr":1845,"label":"sørfold"},{"kommunenr":1848,"label":"steigen"},{"kommunenr":1849,"label":"hamarøy"},{"kommunenr":1850,"label":"tysfjord"},{"kommunenr":1851,"label":"lødingen"},{"kommunenr":1852,"label":"tjeldsund"},{"kommunenr":1853,"label":"evenes"},{"kommunenr":1854,"label":"ballangen"},{"kommunenr":1856,"label":"røst"},{"kommunenr":1857,"label":"værøy"},{"kommunenr":1859,"label":"flakstad"},{"kommunenr":1860,"label":"vestvågøy"},{"kommunenr":1865,"label":"vågan"},{"kommunenr":1866,"label":"hadsel"},{"kommunenr":1867,"label":"bø (n.)"},{"kommunenr":1868,"label":"øksnes"},{"kommunenr":1870,"label":"sortland"},{"kommunenr":1871,"label":"andøy"},{"kommunenr":1874,"label":"moskenes"}]},{label:"Troms",value:19,kommuner:[{"kommunenr":1902,"label":"tromsø"},{"kommunenr":1903,"label":"harstad"},{"kommunenr":1911,"label":"kvæfjord"},{"kommunenr":1913,"label":"skånland"},{"kommunenr":1917,"label":"ibestad"},{"kommunenr":1919,"label":"gratangen"},{"kommunenr":1920,"label":"lavangen"},{"kommunenr":1922,"label":"bardu"},{"kommunenr":1923,"label":"salangen"},{"kommunenr":1924,"label":"målselv"},{"kommunenr":1925,"label":"sørreisa"},{"kommunenr":1926,"label":"dyrøy"},{"kommunenr":1927,"label":"tranøy"},{"kommunenr":1928,"label":"torsken"},{"kommunenr":1929,"label":"berg"},{"kommunenr":1931,"label":"lenvik"},{"kommunenr":1933,"label":"balsfjord"},{"kommunenr":1936,"label":"karlsøy"},{"kommunenr":1938,"label":"lyngen"},{"kommunenr":1939,"label":"storfjord"},{"kommunenr":1940,"label":"kåfjord"},{"kommunenr":1941,"label":"skjervøy"},{"kommunenr":1942,"label":"nordreisa"},{"kommunenr":1943,"label":"kvænangen"}]},{label:"Finnmark",value:20,kommuner:[{"kommunenr":2002,"label":"vardø"},{"kommunenr":2003,"label":"vadsø"},{"kommunenr":2004,"label":"hammerfest"},{"kommunenr":2011,"label":"kautokeino"},{"kommunenr":2012,"label":"alta"},{"kommunenr":2014,"label":"loppa"},{"kommunenr":2015,"label":"hasvik"},{"kommunenr":2017,"label":"kvalsund"},{"kommunenr":2018,"label":"måsøy"},{"kommunenr":2019,"label":"nordkapp"},{"kommunenr":2020,"label":"porsanger"},{"kommunenr":2021,"label":"karasjok"},{"kommunenr":2022,"label":"lebesby"},{"kommunenr":2023,"label":"gamvik"},{"kommunenr":2024,"label":"berlevåg"},{"kommunenr":2025,"label":"tana"},{"kommunenr":2027,"label":"nesseby"},{"kommunenr":2028,"label":"båtsfjord"},{"kommunenr":2030,"label":"sør-varanger"}]}     ];
        $scope.searchTypes    = [
                {value:'name', label:'Søk etter navn', placeholder: "Navn, kommune, bedrift..."},
                {value:'address', label:'Søk etter adresse', placeholder: "Gatenavn..."}];
        $scope.participantSearchTypes    = [
            {type:"Velg type", value: 0},
            {type:"Person", value: 1}, 
            {type:"Kommune", value: 2}, 
            {type:"Løpe", value: 3}, 
            {type:"Selskap", value:4}];

    if($cookies.get("name")) {
        $rootScope.loggedIn = true;
        $rootScope.username = $cookies.get("name").replace("+", " ");
    }

    var _timeout;
    var queryPromis;
	$scope.pageSwitch	  = false;
    $scope.page           = 1;
    $scope.orderBy        = null;
    $scope.order          = "ASC";
    $scope.reverse        = false;
    $scope.showNavigation = true;
    $scope.searched       = false;
    $scope.showTable      = false;
    $scope.sortReady      = false;
    $scope.advancedShow   = false;
    $scope.lastSearched   = "";
    $scope.error          = false;
    
    $scope.selectedSearchType = $scope.searchTypes[0];
    $scope.search         = {
        nameSearch: "",
        pageSize  : 25
    };

    
    $scope.currentType = $scope.participantSearchTypes[0];
    $scope.currentFylke = undefined;
    $scope.currentKommune = undefined;
    $scope.kommune;
    $scope.selectedKommunenr = 0;
    $scope.selectedFylkenr = 0;
    $scope.searchingForText = "Eiendomsdatabasen";
    


    $scope.advanceChange = function(){
        if($scope.search.query != "")
            $scope.doSearch();
      };

    $scope.queryPerson  = function() {
        queryPromis = $rootScope.doQuery("name", $scope.search.query,
            $scope.page, $scope.search.pageSize, $scope.order, $scope.orderBy, $scope.currentType.value, $scope.selectedFylkenr, $scope.selectedKommunenr)
        queryPromis.then(function(result){
            if(result) {
                angular.forEach(result.count[0], function(value) {
                    $scope.count = value;
                    //$scope.count = Math.ceil($scope.page * $scope.search.pageSize);
                });


                $scope.lastSearched   = $scope.search.query;

                document.getElementById("search").focus();


                $scope.names          = result.records;
                $scope.showTable      = $scope.names.length > 0;
                $scope.noResultShow   = !!($scope.names.length == 0 && $scope.search.query.length > 0);
                $scope.showNavigation = true;
                $scope.more_results   = $scope.count > ($scope.page * $scope.search.pageSize);
                $scope.searched       = true;
                $scope.hideNavigation = !(!$scope.more_results && $scope.page == 1);
                $scope.totalPages     = Math.ceil($scope.count / $scope.search.pageSize);
                $scope.pageDisplay    = "Side: " + $scope.page + " av " + $scope.totalPages;
                $scope.sortReady      = true;
            }
        });
    };

    $scope.queryAddress  = function() {
        queryPromis = $rootScope.doQuery("address", $scope.search.query,
            $scope.page, $scope.search.pageSize, $scope.order, $scope.orderBy,$scope.currentType.value, $scope.selectedFylkenr, $scope.selectedKommunenr)
        queryPromis.then(function(result){
            if(result) {
                angular.forEach(result.count[0], function(value) {
                    $scope.count = value;
                });
                $scope.transactions   = result.records;
                $scope.lastSearched   = $scope.search.query;
                $scope.showTable      = $scope.transactions.length > 0;
                $scope.noResultShow   = !!($scope.transactions.length == 0 && $scope.search.query.length > 0);
                $scope.showNavigation = true;
                $scope.more_results   = $scope.count > ($scope.page * $scope.search.pageSize);
                $scope.searched       = true;
                $scope.hideNavigation = !(!$scope.more_results && $scope.page == 1);
                $scope.totalPages     = Math.ceil($scope.count / $scope.search.pageSize);
                $scope.pageDisplay    = "Side: " + $scope.page + " av " + $scope.totalPages;
                $scope.sortReady      = true;
            }
        });
    };


    $scope.doSearch = function(){
        if ($scope.selectedSearchType.value == 'name'){
            $scope.doNameSearch();
        } else {
            $scope.doAddressSearch();
        }
    }

    $scope.doNameSearch = function(){
        if ($scope.search.query.length != 0){

                if(($scope.lastSearch != $scope.search.query) && ($scope.pageSwitch == false)){
                $scope.page = 1;
            }
    
            console.log("Searching for " + $scope.search.query + " with page size " +
                $scope.search.pageSize + " at page " + $scope.page + " ordered by " + $scope.orderBy +
                " " + $scope.order + "Fylke" + $scope.selectedFylkenr+ " kommune " + $scope.selectedKommunenr);
 
            var query_encoded = encodeURIComponent($scope.search.query);
            var type;
    
            if($scope.currentType == undefined){
                type = 0;
            }else type = $scope.currentType.value;
    
            $location.path("/search/n/" + query_encoded + "/" + type + "/" + $scope.page + "/" + $scope.search.pageSize + "/" + $scope.selectedFylkenr + "/" + $scope.selectedKommunenr);
        }
    };

    $scope.doAddressSearch = function(){
        if ($scope.search.query.length != 0){
                if(($scope.lastSearch != $scope.search.query)&&($scope.pageSwitch == false)){
                    $scope.page = 1;
                }
    
            console.log("Searching for " + $scope.search.query + " with page size " +
                $scope.search.pageSize + " at page " + $scope.page + " ordered by " + $scope.orderBy +
                " " + $scope.order + "Fylke" + $scope.selectedFylkenr+ " kommune " + $scope.selectedKommunenr);
 
            var query_encoded = encodeURIComponent($scope.search.query);
            var type;
    
            if($scope.currentType == undefined){
                type = 0;
            }else type = $scope.currentType.value;
    
            $location.path("/search/a/" + query_encoded + "/" + type + "/" + $scope.page + "/" + $scope.search.pageSize+ "/" + $scope.selectedFylkenr + "/" + $scope.selectedKommunenr);
        }
    };

    $scope.searchDelay = function(){
        if(_timeout){ //if there is already a timeout in process cancel it
            $timeout.cancel(_timeout);
        }

        if($scope.search.query != ""){
            _timeout = $timeout(function(){
                $scope.doSearch();
                _timeout = null;

            },500);
        }
        if ($scope.search.query.length == 0 && ($scope.showTable || $scope.noResultShow || $scope.hideNavigation)){
            $scope.showTable = false;
            $scope.noResultShow = false;
            $scope.searched = false;
            $scope.hideNavigation = false;
            $location.path("/search");
        }
    };

    $scope.pageSizeChange = function(){
        $scope.page = 1;
        $scope.queryPerson();
    };

    $scope.getFylkeByNr = function(fylkenr){
        var selectedIndex = undefined;
        angular.forEach($scope.fylker, function(fylke){
            if (fylke.value == fylkenr){
                selectedIndex = $scope.fylker.indexOf(fylke);                
            }
        });
        return selectedIndex;
    }

    $scope.getKommuneByNr = function(kommnr){
        var selectedIndex = undefined;
            angular.forEach($scope.currentFylke.kommuner, function(kommune){
                if (kommune.kommunenr == kommnr){
                    selectedIndex = $scope.currentFylke.kommuner.indexOf(kommune);                
                }
            });
        return selectedIndex;
    }

    $scope.setSearchText = function(){
        var kommune = "";
        var type = "";
        var intro = "Søker etter "
        var searchTerm = $scope.searchName;

        if ($scope.currentFylke != undefined){
            kommune = $scope.currentFylke.label + " Fylkeskommune";
        }
        if ($scope.currentKommune != undefined){
            kommune = $filter('capitalFirstLettersFilter')($scope.currentKommune.label) + " Kommune";
        }

        if ($scope.currentType.value != 1){
           type = $scope.currentType.type + "r";
        } else {
            type = $scope.currentType.type + "er";
        }
            
        if (kommune != "" && $scope.currentType.value != 0){
            $scope.searchingForText = "Viser " + type + " som har handlet med " +kommune;
        } else {
            $scope.searchingForText = ""
        }
    }

    if($routeParams.searchName) {
        $scope.searched          = true;

        document.getElementById("search").focus();
        $scope.search.query      = decodeURIComponent($routeParams.searchName);
        $scope.page              = parseInt($routeParams.page);
        $scope.search.pageSize   = parseInt($routeParams.pageSize);
        $scope.currentType       = $scope.participantSearchTypes[$routeParams.type];
        $scope.selectedFylkenr   = parseInt($routeParams.fylkenr);
        $scope.selectedKommunenr = parseInt($routeParams.kommnr);
        $scope.currentFylke      = $scope.fylker[$scope.getFylkeByNr($scope.selectedFylkenr)];
        if ($scope.currentFylke != undefined){
            $scope.currentKommune = $scope.currentFylke.kommuner[$scope.getKommuneByNr($scope.selectedKommunenr)]; 
        }
        if ($routeParams.searchType == 'n'){
            $scope.selectedSearchType = $scope.searchTypes[0];
            $scope.queryPerson();
        } else {
             $scope.queryAddress();
             $scope.selectedSearchType = $scope.searchTypes[1];
        }
        
        $scope.setSearchText();
    }

    if($routeParams.error) {
        $scope.error = true;
    }

    $scope.navigate = function(way) {
        if((way == -1 && $scope.page > 1 && $scope.showNavigation) || (way == 1 && $scope.more_results && $scope.showNavigation)){
        	$scope.pageSwitch = true;
            $scope.page += way;
            $scope.showNavigation = false;
            $scope.doSearch();
        }
    };

    $scope.showTransactionsPerson = function(id, name, type){
        name = encodeURIComponent(name);
        $location.path("/transactions/deltager/" + name + "/" + id + "/" +type);
        //$routeParams ==> {chapterId:1, sectionId:2, search:'moby'}
    };

    $scope.orderByMe = function(x) {
        if($scope.sortReady) {
            if($scope.orderBy == x){
                if ($scope.order == "ASC") {
                    $scope.order = "DESC"
                } else {
                    $scope.order = "ASC";
                }
            } else {
                $scope.order = "ASC";
                $scope.reverse = false;
            }
            $scope.orderBy = x;
            $scope.reverseOrder();
            $scope.sortReady = false;
            $scope.queryPerson();
        }
    };

    $scope.reverseOrder = function(){
        if($scope.sortReady) {
            $scope.reverse = !$scope.reverse;
        }
    };

    $scope.participantTypeChanged = function(type){
        if (type != null){
            $scope.currentType = $scope.participantSearchTypes[type.value];
            $scope.doNameSearch();
        } else {
            $scope.currentType = $scope.participantSearchTypes[0];

        }
    }

    $scope.selectedMunicipalityChanged = function(kommune){
        if (kommune != $scope.currentKommune){

            $scope.selectedKommunenr = $scope.currentKommune.kommunenr;
        } else {
            $scope.selectedKommunenr = 0;
        }
        $scope.advanceChange();
    }


    $scope.selectedFylkeChanged = function(fylke){

        if (fylke != $scope.currentFylke){
            $scope.selectedFylkenr = $scope.currentFylke.value;
            $scope.selectedKommunenr = 0;
        } else {
            $scope.selectedFylkenr = 0;
        }

        $scope.advanceChange();
    }

  	$scope.showTransactionsProperty = function(id){
        $location.path("/transactions/property/" + id);
    };
});
