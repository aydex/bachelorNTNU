kommunalApp.controller('searchController', function($scope, $rootScope, $timeout, $location, $routeParams) {

    var _timeout;
    var queryPromis;

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
    $scope.search         = {
        nameSearch: "",
        pageSize  : 25
    };
    $scope.selectedMunicipality = 0;
    $scope.selectedFylke = 0;
    $scope.selectedFylkeIndex = 0;

   $scope.kommuner = [{type:"Asker", value:220},{type:"Aurskog-Høland", value:221},{type:"Bærum", value:219},{type:"Eidsvoll", value:237},{type:"Fet", value:227},{type:"Frogn", value:215},{type:"Gjerdrum", value:239},{type:"Hurdal", value:230},
    {type:"Lørenskog", value:238},{type:"Nannestad", value:236},{type:"Nes", value:216},{type:"Nesodden", value:223},{type:"Nittedal", value:217},{type:"Oppegård", value:228},{type:"Rælingen", value:231},{type:"Skedsmo", value:213},{type:"Ski", value:226},
    {type:"Sørum", value:235},{type:"Ullensaker", value:211},{type:"Vestby", value:214},{type:"Ås", value:214},{type:"Arendal", value:906},{type:"Birkenes", value:928},{type:"Bygland", value:238},{type:"Bykle", value:941},{type:"Evje og Hornnes", value:937},
    {type:"Froland", value:919},{type:"Gjerstad", value:911},{type:"Grimstad", value:904},{type:"Lørenskog", value:238},{type:"Nannestad", value:236},{type:"Nes", value:216},{type:"Nesodden", value:223},{type:"Nittedal", value:217},{type:"Oppegård", value:228},
    {type:"Rælingen", value:231},{type:"Skedsmo", value:213},{type:"Ski", value:226}, {type:"Iveland", value:935},{type:"Lillesand", value:926},{type:"Risør", value:901},{type:"Tvedestrand", value:914},{type:"Valle", value:940},{type:"Vegårdshei", value:912},
    {type:"Åmli", value:929},{type:"Flesberg", value:631},{type:"Flå", value:615},{type:"Gol", value:617},{type:"Hemsedal", value:618},{type:"Hol", value:620}, {type: "Hole", value: 612},
    {type:"Hurum", value:628},{type:"Kongsberg", value:604},{type:"Krødsherad", value:622},{type:"Modum", value:623},{type:"Nore og Ulvdal", value:633}, {type:"Nes", value:616},{type:"Nedre Eiker", value:625},{type:"Ringerike", value:605},{type:"Rollag", value:632},
    {type:"Røyken", value:627},{type:"Sigdal", value:621}, {type: "Alta", value: 2012}, {type: "Berlevåg" , value: 2024}, {type: "Båtsfjord" , value: 2028}, {type: "Gamvik" , value: 2023}, {type: "Hammerfest" , value: 2004}, {type: "Hasvik" , value:2015}, {type: "Karasjokk" , value:2021}, {type: "Kautokeino" , value:2011}, {type: "Kvalsund" , value: 2017}, {type: "Lebesby" , value:2022}, {type: "Loppa" , value:2014}, {type: "Måsøy" , value:2018}, {type: "Nesseby" , value:2027}, {type: "Nordkapp" , value:2019}, {type: "Porsanger" , value:2020}, {type: "Sør-Varanger" , value:2030},
    {type:"Tana" , value:2025}, {type: "Vadsø" , value:2003}, {type: "Vardø" , value:2002}, {type:"Alvdal", value:438}, {type:"Eidskog", value:420}, {type:"Eleverum", value:427}, {type:"Engerdal", value:434}, {type:"Folldal", value:439}, {type:"Grue", value:423}, {type:"Hamar", value:403}, {type:"Kongsvinger", value:402}, {type:"Løten", value:415}, {type:"Nord-Odal", value:418}, {type:"Os", value:441}, {type:"Rendalen", value:432}, {type:"Ringsaker", value:412}, 
    {type:"Stange", value:417}, {type:"Stor-Elvdal", value:430}, {type:"Sør-Odal", value:419}, {type:"Tolga", value:436}, {type:"Trysil", value:428}, {type:"Tynset", value:437}, {type:"Våler", value:426}, {type:"Åmot", value:429},
    {type:"Åsnes", value:425},{type: "Askøy", value: 1247},{type:"Austervoll", value:1244},{type:"Austrheim", value:1264},{type:"Bergen", value:1201},{type:"Bømlo", value:1219},{type:"Eidsfjord", value:1232},{type:"Etne", value:1211},{type:"Fedje", value:1265},{type:"Fitjar", value: 1222},{type:"Fjell", value:1246},{type:"Fusa", value:1241},{type:"Granvin", value:1234},{type:"Jondal", value:1227},{type:"Kvam", value:1238},{type:"Kvinnherad", value:1224},{type:"Lindås", value:1261},
    {type:"Masfjorden", value:1266},{type:"Meland", value:1256},{type:"Modalen", value:1252},{type:"Odda", value:1228},{type:"Os", value:1243},{type:"Osterøy", value:1253},{type:"Radøy", value:1260},{type:"Samnanger", value:1242},{type:"Stord", value:1221},{type:"Stund", value:1245},{type:"Sveio", value:1216},{type:"Tysnes", value:1223},{type:"Ullensvang", value:1231},{type:"Ulvik", value:1233},{type:"Vaksdal", value:1251},{type:"Voss", value:1235},{type:"Øygarden", value:1259},
    {type:"Aukra", value:1547}, {type:"Aure", value:1576},{type:"Averøy", value:1554},{type:"Eide", value:1551},{type:"Fræna", value:1548},{type:"Giske", value:1532},{type:"Gjemnes", value:1557},{type:"Halsa", value:1571},{type:"Haram", value:1534},{type:"Hareid", value:1517},{type:"Herøy", value:1515},{type:"Kristiansund", value:1505},{type:"Midsund", value:1545},
    {type:"Molde", value:1502},{type:"Nesset", value:1543},{type:"Norddal", value:1524},{type:"Rauma", value:1539},{type:"Rindal", value:1567},{type:"Sande", value:1514},{type:"Sandøy", value:1546},{type:"Skodje", value:1529},{type:"Smøla", value:1573},{type:"Stordal", value:1526},{type:"Stranda", value:1525},{type:"Sula", value:1531},{type:"Sunndal", value:1563},{type:"Surnadal", value:1566},
    {type:"Sykkylyven", value:1528},{type:"Tingvoll", value:1560},{type:"Ulstein", value:1516},{type:"Vanylven", value:1511},{type:"Vestnes", value:1535},{type:"Volda", value:1519},{type:"Ålesund", value:1504},{type:"Ørskog", value:1523},{type:"Ørsta", value:1520},{type:"Alstahaug", value:1820},{type:"Andøy", value:1871},{type:"Ballangen", value:1854},{type:"Beiran", value:1839},{type:"Bindal", value:1811},{type:"Bodø", value:1804},{type:"Brønnøy", value:1813},{type:"Bø", value:1867},{type:"Dønne", value:1827},{type:"Evenes", value:1853},{type:"Fauske", value:1841},{type:"Flakstad", value:1859},{type:"Gildeskål", value:1838},{type:"Grane", value:1825},{type:"Hadsel", value:1866},
    {type:"Hamarøy", value:1849},{type:"Hattfjelldal", value:1826},{type:"Hemnes", value:1832},{type:"Herøy", value:1818},{type:"Leirfjord", value:1822},{type:"Lurøy", value:1834},{type:"Lødingen", value:1851},{type:"Meløy", value:1837},{type:"Moskenes", value:1847},{type:"Narvik", value:1805},{type:"Nesna", value:1828},{type:"Rana", value:1833},{type:"Rødøy", value:1836},{type:"Røst", value:1856},{type:"Saltdal", value:1840},{type:"Sortland", value:1870},{type:"Steigen", value:1848},{type:"Sømma", value:1812},{type:"Sørfold", value:1845},{type:"Tjeldsund", value:1852},{type:"Træna", value:1835},{type:"Tysfjord", value:1859},{type:"Vefsn", value:1824},{type:"Vega", value:1815},
    {type:"Vestvågøy", value:1860},{type:"Vevelstad", value:1816},{type:"Vågan", value:1865},{type:"Værøy", value:1857},{type:"Øksnes", value:1868},{type:"Flatanger", value:1749},{type:"Fosnes", value:1748},{type:"Frosta", value:1717},{type:"Grong", value:1742},{type:"Høylandet", value:1743},{type:"Inderøy", value:1756},{type:"Leka", value:1755},{type:"Leksvik", value:1718},{type:"Levanger", value:1719},{type:"Lierne", value:1738},{type:"Meråker", value:1711},{type:"Namdalseid", value:1725},
    {type:"Namsos", value:1703},{type:"Namsskogan", value:1740},{type:"Nærøy", value:1751},{type:"Overhalla", value:1744},{type:"Røyrvik", value:1739},{type:"Snåsa", value:1736},{type:"Steinkjær", value:1702},{type:"Stjørdal", value:1714},{type:"Verdal", value:1721},{type:"Verran", value:1724},{type:"Vikna", value:1750},{type:"Dovre", value:0511},{type:"Etnedal", value:0541},{type:"Gausdal", value:0522},{type:"Gjøvik", value:0502},{type:"Gran", value:0534},
    {type:"Jevnaker", value:0532},{type:"Lesja", value:0512},{type:"Lillehammer", value:0501},{type:"Lom", value:0514},{type:"Lunner", value:0533},{type:"Nord-Aurdal", value:0542},{type:"Nord-Fron", value:0516},{type:"Nord Land", value:0538},{type:"Ringebu", value:0520},{type:"Sel", value:0517},{type:"Søndre Land", value:0536},{type:"Sør-Aurdal", value:0540},{type:"Sør-Fron", value:0519},{type:"Vang", value:0545},
    {type:"Vestre Slidre", value:0543},{type:"Vestre Toten", value:0529},{type:"Vågå", value:0515},{type:"Østre Toten", value:0528},{type:"Øyer", value:0521},{type:"Øystre Slidre", value:0544},{type:"Bjerkreim", value:1114},{type:"Bokn", value:1145},{type:"Egersund", value:1101},{type:"Finnøy", value:1141},
    {type:"Forsand", value:1129},{type:"Gjesdal", value:1122},{type:"Haugesund", value:1106},{type:"Hjelmeland", value:1133},{type:"Hå", value:1119},{type:"Karmøy", value:1149},{type:"Klepp", value:1424},{type:"Kvitsøy", value:1144},{type:"Lund", value:1112},{type:"Randaberg", value:1127},{type:"Rennesøy", value:1142},{type:"Sandnes", value:1102},{type:"Sauda", value:1135},
    {type:"Sokndal", value:1111},{type:"Sola", value:1124},{type:"Stavanger", value:1103},{type:"Strand", value:1130},{type:"Suldal", value:1134},{type:"Time", value:1121},{type:"Tysvær", value:1146},{type:"Utsira", value:1151},{type:"Vindafjord", value:1160},{type:"Askvoll", value:1428},{type:"Aurland", value:1421},{type:"Balestrand", value:1418},{type:"Bremanger", value:1438},
    {type:"Eid", value:1443},{type:"Fjaler", value:1429},{type:"Flora", value:1401},{type:"Førde", value:1432},{type:"Gaular", value:1430},{type:"Gloppen", value:1445},{type:"Gulen", value:1411},{type:"Hornindal", value:1444},{type:"Hyllestad", value:1413},{type:"Høyanger", value:1416},{type:"Jølster", value:1431},{type:"Leikanger", value:1419},{type:"Luster", value:1426},{type:"Lærdal", value:1422},
    {type:"Naustdal", value:1433},{type:"Selje", value:1441},{type:"Sogndal", value:1420},{type:"Solund", value:1412},{type:"Stryn", value:1449},{type:"Vik", value:1417},{type:"Vågsøy", value:1439},{type:"Årdal", value:1424},{type:"Årdal", value:1424},{type:"Agdenes", value:1622},{type:"Bjugn", value:1627},{type:"Frøya", value:1620},{type:"Hemne", value:1612},{type:"Hitra", value:1617},{type:"Holtålen", value:1644},{type:"Klæbu", value:1662},{type:"Malvik", value:1663},
    {type:"Meldal", value:1636},{type:"Melhus", value:1653},{type:"Midtre Gauldal", value:1648},{type:"Oppdal", value:1634},{type:"Orkdal", value:1638},{type:"Osen", value:1633},{type:"Rennebu", value:1635},{type:"Rissa", value:1624},{type:"Roan", value:1632},{type:"Røros", value:1640},{type:"Selbu", value:1664},{type:"Skaun", value:1657},{type:"Snillfjord", value:1613},{type:"Trondheim", value:1601},{type:"Tydal", value:1665},{type:"Åfjord", value:1630},{type:"Ørland", value:1621},
    {type:"Bamble", value:0814},{type:"Bø", value:0821},{type:"Drangedal", value:0871},{type:"Fyresdal", value:0831},{type:"Hjartdal", value:0827},{type:"Kragerø", value:0815},{type:"Kviteseid", value:0829},{type:"Nissedal", value:0830},{type:"Nome", value:0819},{type:"Notodden", value:0807},{type:"Porsgrunn", value:0805},{type:"Sauherad", value:0822},{type:"Seljord", value:0828},{type:"Siljan", value:0811},{type:"Skien", value:0806},
    {type:"Tinn", value:0826},{type:"Tokke", value:0833},{type:"Vinje", value:0834},{type:"Balsfjord", value:1933},{type:"Bardu", value:1922},{type:"Berg", value:1929},{type:"Dyrøy", value:1926},{type:"Gratangen", value:1919},{type:"Harstad", value:1903},{type:"Ibestad", value:1917},{type:"Karsløy", value:1936},{type:"Kvænangen", value:1943},{type:"Kåfjord", value:1940},{type:"Lavangen", value:1920},{type:"Lenvik", value:1931},{type:"Lyngen", value:1938},{type:"Målselv", value:1924},{type:"Nordreisa", value:1942},
    {type:"Salangen", value:1923},{type:"Skjervøy", value:1941},{type:"Skånland", value:1913},{type:"Storfjord", value:1939},{type:"Sørreisa", value:1925},{type:"Torsken", value:1928},{type:"Tranøy", value:1927},{type:"Tromsø", value:1902},
    {type:"Audnedal", value:1027},{type:"Farsund", value:1003},{type:"Flekkefjord", value:1004},{type:"Hægebostad", value:1034},{type:"Kristiansand", value:1001},{type:"Kvinesdal", value:1037},{type:"Lindesnes", value:1029},{type:"Lyngdal", value:1032},{type:"Mandal", value:1002},{type:"Marnardal", value:1021},{type:"Sirdal", value:1046},{type:"Sogndalen", value:1017},{type:"Søgne", value:1018},{type:"Vennesla", value:1014},{type:"Åseral", value:1026},
    {type:"Andebu", value:0719},{type:"Hof", value:0714},{type:"Holmestrand", value:0702},{type:"Horten", value:0701},{type:"Lardal", value:0728},{type:"Larvik", value:0709},{type:"Nøtterøy", value:0722},{type:"Re", value:0716},{type:"Sande", value:0713},{type:"Sandefjord", value:0706},{type:"Stokke", value:0720},{type:"Svelvik", value:0711},{type:"Tjøme", value:0723},{type:"Tønsberg", value:0704},{type:"Aremark", value:0118},{type:"Askim", value:0124},{type:"Eidsberg", value:0125},
    {type:"Fredrikstad", value:0106},{type:"Halden", value:0101},{type:"Hobøl", value:0138},{type:"Hvaler", value:0111},{type:"Marker", value:0119},{type:"Moss", value:0104},{type:"Rakkestad", value:0128},{type:"Rygge", value:0136},{type:"Råde", value:0135},{type:"Rømskog", value:0121},{type:"Sarpsborg", value:0105},{type:"Skiptvet", value:0127},{type:"Spydeberg", value:0123},{type:"Trøgstad", value:0122},{type:"Våler", value:0137}
    ];
    
    $scope.fylker = {
        "1" : {
            label : "Akershus",        
            kommuner:{
                "1": {label: $scope.kommuner[0]}, "2" : {label:$scope.kommuner[1]}, "3" : {label:$scope.kommuner[2]},"4" : {label:$scope.kommuner[3]},"5" : {label:$scope.kommuner[4]},"6" : {label:$scope.kommuner[5]},
                "7" : {label:$scope.kommuner[6]},"8" : {label:$scope.kommuner[7]},"9" : {label:$scope.kommuner[8]},"10" : {label:$scope.kommuner[9]},"11" : {label:$scope.kommuner[10]},"12" : {label:$scope.kommuner[11]},
                "13" : {label:$scope.kommuner[12]},"14" : {label:$scope.kommuner[13]},"15" : {label:$scope.kommuner[14]},"16" : {label:$scope.kommuner[15]},"17" : {label:$scope.kommuner[16]},"18" : {label:$scope.kommuner[17]},
                "19" : {label:$scope.kommuner[18]},"20" : {label:$scope.kommuner[19]},"21" : {label:$scope.kommuner[20]}
            
            }
        },
        "2" : {
            label:"Aust-Agder",      
            kommuner:{
                "1":{label: $scope.kommuner[21]}, "2" : {label:$scope.kommuner[22]}, "3" : {label:$scope.kommuner[23]},"4" : {label:$scope.kommuner[24]},"5" : {label:$scope.kommuner[25]},"6" : {label:$scope.kommuner[26]},
                "7" : {label:$scope.kommuner[27]},"8" : {label:$scope.kommuner[28]},"9" : {llabel:$scope.kommuner[29]},"10" : {label:$scope.kommuner[30]},"11" : {label:$scope.kommuner[31]},"12" : {label:$scope.kommuner[32]},
                "13" : {label:$scope.kommuner[33]},"14" : {label:$scope.kommuner[34]},"15" : {label:$scope.kommuner[35]},"16" : {label:$scope.kommuner[36]},"17" : {label:$scope.kommuner[37]},"18" : {label:$scope.kommuner[38]},
                "19" : {label:$scope.kommuner[39]},"20" : {label:$scope.kommuner[40]},"21" : {label:$scope.kommuner[41]}, "22":{label: $scope.kommuner[42]},"23" : {label:$scope.kommuner[43]},"24" : {label:$scope.kommuner[44]}
            
            }
        },
        "3" : {
            label:"Buskerud",  
             kommuner:{
                "1" : {label:$scope.kommuner[45]},"2" : {label:$scope.kommuner[46]},"3" : {label:$scope.kommuner[47]},
                "4" : {label:$scope.kommuner[48]},"5" : {label:$scope.kommuner[49]},"6" : {label:$scope.kommuner[50]},"7" : {label:$scope.kommuner[51]},"8" : {label:$scope.kommuner[52]},"9" : {label:$scope.kommuner[53]},
                "10" : {label:$scope.kommuner[54]},"11" : {label:$scope.kommuner[55]},"12" : {label:$scope.kommuner[56]},"13" : {label:$scope.kommuner[57]},"14" : {label:$scope.kommuner[58]},"15" : {label:$scope.kommuner[59]},
                "16" : {label:$scope.kommuner[60]},"17" : {label:$scope.kommuner[61]}
            }
        },
        "4" : {
            label:"Finnmark",      
            kommuner:{
                "1" : {label:$scope.kommuner[62]},"2" : {label:$scope.kommuner[63]},"3" : {label:$scope.kommuner[64]},
                "4" : {label:$scope.kommuner[65]},"5" : {label:$scope.kommuner[66]},"6" : {label:$scope.kommuner[67]},"7" : {label:$scope.kommuner[68]},"8" : {label:$scope.kommuner[69]},"9" : {label:$scope.kommuner[70]},
                "10" : {label:$scope.kommuner[71]},"11" : {label:$scope.kommuner[72]},"12" : {label:$scope.kommuner[73]},"13" : {label:$scope.kommuner[74]},"14" : {label:$scope.kommuner[75]},"15" : {label:$scope.kommuner[76]},
                "16" : {label:$scope.kommuner[77]},"17" : {label:$scope.kommuner[78]},"17" : {label:$scope.kommuner[79]},"17" : {label:$scope.kommuner[80]}

            }
        },
        "5" : {
            label:"Hedmark",      
            kommuner:{
                 "1" : {label:$scope.kommuner[81]},"2" : {label:$scope.kommuner[82]},"3" : {label:$scope.kommuner[83]},
                "4" : {label:$scope.kommuner[84]},"5" : {label:$scope.kommuner[85]},"6" : {label:$scope.kommuner[86]},"7" : {label:$scope.kommuner[87]},"8" : {label:$scope.kommuner[88]},"9" : {label:$scope.kommuner[89]},
                "10" : {label:$scope.kommuner[90]},"11" : {label:$scope.kommuner[91]},"12" : {label:$scope.kommuner[92]},"13" : {label:$scope.kommuner[93]},"14" : {label:$scope.kommuner[94]},"15" : {label:$scope.kommuner[95]},
                "16" : {label:$scope.kommuner[96]},"17" : {label:$scope.kommuner[97]},"18" : {label:$scope.kommuner[98]},"19" : {label:$scope.kommuner[99]},"20" : {label:$scope.kommuner[100]},"21" : {label:$scope.kommuner[101]},"22" : {label:$scope.kommuner[102]}

            }
        },
        "6" : {
            label:"Hordaland",      
            kommuner:{
                "1" : {label:$scope.kommuner[103]},"2" : {label:$scope.kommuner[104]},"3" : {label:$scope.kommuner[105]},
                "4" : {label:$scope.kommuner[106]},"5" : {label:$scope.kommuner[107]},"6" : {label:$scope.kommuner[108]},"7" : {label:$scope.kommuner[109]},"8" : {label:$scope.kommuner[110]},"9" : {label:$scope.kommuner[111]},
                "10" : {label:$scope.kommuner[112]},"11" : {label:$scope.kommuner[113]},"12" : {label:$scope.kommuner[114]},"13" : {label:$scope.kommuner[115]},"14" : {label:$scope.kommuner[116]},"15" : {label:$scope.kommuner[117]},
                "16" : {label:$scope.kommuner[118]},"17" : {label:$scope.kommuner[119]},"18" : {label:$scope.kommuner[120]},"19" : {label:$scope.kommuner[121]},"20" : {label:$scope.kommuner[122]},"21" : {label:$scope.kommuner[123]},"22" : {label:$scope.kommuner[124]},
                "23" : {label:$scope.kommuner[125]},"24" : {label:$scope.kommuner[126]},"25" : {label:$scope.kommuner[127]},"26" : {label:$scope.kommuner[128]},"27" : {label:$scope.kommuner[129]},"28" : {label:$scope.kommuner[130]},"29" : {label:$scope.kommuner[131]},
                "30" : {label:$scope.kommuner[132]},"31" : {label:$scope.kommuner[133]},"32" : {label:$scope.kommuner[134]},"33" : {label:$scope.kommuner[135]}

              
            }
        },
        "7" : {
            label:"Møre og Romsdal",      
            kommuner:{
                "1" : {label:$scope.kommuner[136]},"2" : {label:$scope.kommuner[137]},"3" : {label:$scope.kommuner[138]},
                "4" : {label:$scope.kommuner[139]},"5" : {label:$scope.kommuner[140]},"6" : {label:$scope.kommuner[141]},"7" : {label:$scope.kommuner[142]},"8" : {label:$scope.kommuner[143]},"9" : {label:$scope.kommuner[144]},
                "10" : {label:$scope.kommuner[145]},"11" : {label:$scope.kommuner[146]},"12" : {label:$scope.kommuner[147]},"13" : {label:$scope.kommuner[148]},"14" : {label:$scope.kommuner[149]},"15" : {label:$scope.kommuner[150]},
                "16" : {label:$scope.kommuner[151]},"17" : {label:$scope.kommuner[152]},"18" : {label:$scope.kommuner[153]},"19" : {label:$scope.kommuner[154]},"20" : {label:$scope.kommuner[155]},"21" : {label:$scope.kommuner[156]},"22" : {label:$scope.kommuner[157]},
                "23" : {label:$scope.kommuner[158]},"24" : {label:$scope.kommuner[159]},"25" : {label:$scope.kommuner[160]},"26" : {label:$scope.kommuner[161]},"27" : {label:$scope.kommuner[162]},"28" : {label:$scope.kommuner[163]},"29" : {label:$scope.kommuner[164]},
                "30" : {label:$scope.kommuner[165]},"31" : {label:$scope.kommuner[166]},"32" : {label:$scope.kommuner[167]},"33" : {label:$scope.kommuner[168]},"34" : {label:$scope.kommuner[169]},"35" : {label:$scope.kommuner[170]},"36" : {label:$scope.kommuner[171]}  
            }
        },
        "8" : {
            label:"Nordland",      
            kommuner:{
                "1" : {label:$scope.kommuner[172]},"2" : {label:$scope.kommuner[173]},"3" : {label:$scope.kommuner[174]},
                "4" : {label:$scope.kommuner[175]},"5" : {label:$scope.kommuner[176]},"6" : {label:$scope.kommuner[177]},"7" : {label:$scope.kommuner[178]},"8" : {label:$scope.kommuner[179]},"9" : {label:$scope.kommuner[180]},
                "10" : {label:$scope.kommuner[181]},"11" : {label:$scope.kommuner[182]},"12" : {label:$scope.kommuner[183]},"13" : {label:$scope.kommuner[184]},"14" : {label:$scope.kommuner[185]},"15" : {label:$scope.kommuner[186]},
                "16" : {label:$scope.kommuner[187]},"17" : {label:$scope.kommuner[188]},"18" : {label:$scope.kommuner[189]},"19" : {label:$scope.kommuner[190]},"20" : {label:$scope.kommuner[191]},"21" : {label:$scope.kommuner[192]},"22" : {label:$scope.kommuner[193]},
                "23" : {label:$scope.kommuner[194]},"24" : {label:$scope.kommuner[195]},"25" : {label:$scope.kommuner[196]},"26" : {label:$scope.kommuner[197]},"27" : {label:$scope.kommuner[198]},"28" : {label:$scope.kommuner[199]},"29" : {label:$scope.kommuner[200]},
                "30" : {label:$scope.kommuner[201]},"31" : {label:$scope.kommuner[202]},"32" : {label:$scope.kommuner[203]},"33" : {label:$scope.kommuner[204]},"34" : {label:$scope.kommuner[205]},"35" : {label:$scope.kommuner[206]},"36" : {label:$scope.kommuner[207]},
                "37" : {label:$scope.kommuner[208]},"38" : {label:$scope.kommuner[209]} ,"39" : {label:$scope.kommuner[210]},"40" : {label:$scope.kommuner[211]},"41" : {label:$scope.kommuner[212]},"42" : {label:$scope.kommuner[213]},"43" : {label:$scope.kommuner[214]},
                "44" : {label:$scope.kommuner[215]}        
               
            }
        },
        "9" : {
            label:"Nord-Trøndelag",      
            kommuner:{
                "1" : {label:$scope.kommuner[216]},"2" : {label:$scope.kommuner[217]},"3" : {label:$scope.kommuner[218]},
                "4" : {label:$scope.kommuner[219]},"5" : {label:$scope.kommuner[220]},"6" : {label:$scope.kommuner[221]},"7" : {label:$scope.kommuner[222]},"8" : {label:$scope.kommuner[223]},"9" : {label:$scope.kommuner[224]},
                "10" : {label:$scope.kommuner[225]},"11" : {label:$scope.kommuner[226]},"12" : {label:$scope.kommuner[227]},"13" : {label:$scope.kommuner[228]},"14" : {label:$scope.kommuner[229]},"15" : {label:$scope.kommuner[230]},
                "16" : {label:$scope.kommuner[231]},"17" : {label:$scope.kommuner[232]},"18" : {label:$scope.kommuner[233]},"19" : {label:$scope.kommuner[234]},"20" : {label:$scope.kommuner[235]},"21" : {label:$scope.kommuner[236]},"22" : {label:$scope.kommuner[237]},
                "23" : {label:$scope.kommuner[238]}
                
            }
        },
        "10" : {
            label:"Oppland",      
            kommuner:{
                "1" : {label:$scope.kommuner[239]},"2" : {label:$scope.kommuner[240]},"3" : {label:$scope.kommuner[241]},
                "4" : {label:$scope.kommuner[242]},"5" : {label:$scope.kommuner[243]},"6" : {label:$scope.kommuner[244]},"7" : {label:$scope.kommuner[245]},"8" : {label:$scope.kommuner[246]},"9" : {label:$scope.kommuner[247]},
                "10" : {label:$scope.kommuner[248]},"11" : {label:$scope.kommuner[249]},"12" : {label:$scope.kommuner[250]},"13" : {label:$scope.kommuner[251]},"14" : {label:$scope.kommuner[252]},"15" : {label:$scope.kommuner[253]},
                "16" : {label:$scope.kommuner[254]},"17" : {label:$scope.kommuner[255]},"18" : {label:$scope.kommuner[256]},"19" : {label:$scope.kommuner[257]},"20" : {label:$scope.kommuner[258]},"21" : {label:$scope.kommuner[259]},"22" : {label:$scope.kommuner[260]},
                "23" : {label:$scope.kommuner[261]},"24" : {label:$scope.kommuner[262]},"25" : {label:$scope.kommuner[263]}
            
            }
        },
        "11" : {
            label:"Oslo",      
            kommuner:{
               
            }
        },
        "12" : {
            label:"Rogaland",      
            kommuner:{
                "1" : {label:$scope.kommuner[264]},"2" : {label:$scope.kommuner[265]},"3" : {label:$scope.kommuner[266]},
                "4" : {label:$scope.kommuner[267]},"5" : {label:$scope.kommuner[268]},"6" : {label:$scope.kommuner[269]},"7" : {label:$scope.kommuner[270]},"8" : {label:$scope.kommuner[271]},"9" : {label:$scope.kommuner[272]},
                "10" : {label:$scope.kommuner[273]},"11" : {label:$scope.kommuner[274]},"12" : {label:$scope.kommuner[275]},"13" : {label:$scope.kommuner[276]},"14" : {label:$scope.kommuner[277]},"15" : {label:$scope.kommuner[278]},
                "16" : {label:$scope.kommuner[279]},"17" : {label:$scope.kommuner[280]},"18" : {label:$scope.kommuner[281]},"19" : {label:$scope.kommuner[282]},"20" : {label:$scope.kommuner[283]},"21" : {label:$scope.kommuner[284]},"22" : {label:$scope.kommuner[285]},
                "23" : {label:$scope.kommuner[286]},"24" : {label:$scope.kommuner[287]},"25" : {label:$scope.kommuner[288]},"26" : {label:$scope.kommuner[289]}
                
            }
        },
        "13" : {
            label:"Sogn og Fjordane",      
            kommuner:{
                "1" : {label:$scope.kommuner[290]},"2" : {label:$scope.kommuner[291]},"3" : {label:$scope.kommuner[292]},
                "4" : {label:$scope.kommuner[293]},"5" : {label:$scope.kommuner[294]},"6" : {label:$scope.kommuner[295]},"7" : {label:$scope.kommuner[296]},"8" : {label:$scope.kommuner[297]},"9" : {label:$scope.kommuner[298]},
                "10" : {label:$scope.kommuner[299]},"11" : {label:$scope.kommuner[300]},"12" : {label:$scope.kommuner[301]},"13" : {label:$scope.kommuner[302]},"14" : {label:$scope.kommuner[303]},"15" : {label:$scope.kommuner[304]},
                "16" : {label:$scope.kommuner[305]},"17" : {label:$scope.kommuner[306]},"18" : {label:$scope.kommuner[307]},"19" : {label:$scope.kommuner[308]},"20" : {label:$scope.kommuner[309]},"21" : {label:$scope.kommuner[310]},"22" : {label:$scope.kommuner[311]},
                "23" : {label:$scope.kommuner[312]},"24" : {label:$scope.kommuner[313]},"25" : {label:$scope.kommuner[314]},"26" : {label:$scope.kommuner[315]}
               
                
            }
        },
        "14" : {
            label:"Sør-Trøndelag",      
            kommuner:{
                "2" : {label:$scope.kommuner[317]},"3" : {label:$scope.kommuner[318]},
                "4" : {label:$scope.kommuner[319]},"5" : {label:$scope.kommuner[320]},"6" : {label:$scope.kommuner[321]},"7" : {label:$scope.kommuner[322]},"8" : {label:$scope.kommuner[323]},"9" : {label:$scope.kommuner[324]},
                "10" : {label:$scope.kommuner[325]},"11" : {label:$scope.kommuner[326]},"12" : {label:$scope.kommuner[327]},"13" : {label:$scope.kommuner[328]},"14" : {label:$scope.kommuner[329]},"15" : {label:$scope.kommuner[330]},
                "16" : {label:$scope.kommuner[331]},"17" : {label:$scope.kommuner[332]},"18" : {label:$scope.kommuner[333]},"19" : {label:$scope.kommuner[334]},"20" : {label:$scope.kommuner[335]},"21" : {label:$scope.kommuner[336]},"22" : {label:$scope.kommuner[337]},
                "23" : {label:$scope.kommuner[338]},"24" : {label:$scope.kommuner[339]},"25" : {label:$scope.kommuner[340]},"26" : {label:$scope.kommuner[341]}
               
            }
        },
        "15" : {
            label:"Telemark",      
            kommuner:{
                "2" : {label:$scope.kommuner[342]},"3" : {label:$scope.kommuner[343]},
                "4" : {label:$scope.kommuner[344]},"5" : {label:$scope.kommuner[345]},"6" : {label:$scope.kommuner[346]},"7" : {label:$scope.kommuner[347]},"8" : {label:$scope.kommuner[348]},"9" : {label:$scope.kommuner[349]},
                "10" : {label:$scope.kommuner[350]},"11" : {label:$scope.kommuner[351]},"12" : {label:$scope.kommuner[352]},"13" : {label:$scope.kommuner[353]},"14" : {label:$scope.kommuner[354]},"15" : {label:$scope.kommuner[355]},
                "16" : {label:$scope.kommuner[356]},"17" : {label:$scope.kommuner[357]},"18" : {label:$scope.kommuner[358]},"19" : {label:$scope.kommuner[359]}
         
            }
        },
        "16" : {
            label:"Troms",      
            kommuner:{
                "2" : {label:$scope.kommuner[360]},"3" : {label:$scope.kommuner[361]},
                "4" : {label:$scope.kommuner[362]},"5" : {label:$scope.kommuner[363]},"6" : {label:$scope.kommuner[364]},"7" : {label:$scope.kommuner[365]},"8" : {label:$scope.kommuner[366]},"9" : {label:$scope.kommuner[367]},
                "10" : {label:$scope.kommuner[368]},"11" : {label:$scope.kommuner[369]},"12" : {label:$scope.kommuner[370]},"13" : {label:$scope.kommuner[371]},"14" : {label:$scope.kommuner[372]},"15" : {label:$scope.kommuner[373]},
                "16" : {label:$scope.kommuner[374]},"17" : {label:$scope.kommuner[375]},"18" : {label:$scope.kommuner[376]},"19" : {label:$scope.kommuner[377]},"20" : {label:$scope.kommuner[378]},
                "21" : {label:$scope.kommuner[379]},"22" : {label:$scope.kommuner[380]},"23" : {label:$scope.kommuner[381]},"24" : {label:$scope.kommuner[382]}
                
            }
        },
        "17" : {
            label:"Vest-Agder",      
            kommuner:{
                "2" : {label:$scope.kommuner[383]},"3" : {label:$scope.kommuner[384]},
                "4" : {label:$scope.kommuner[385]},"5" : {label:$scope.kommuner[386]},"6" : {label:$scope.kommuner[387]},"7" : {label:$scope.kommuner[388]},"8" : {label:$scope.kommuner[389]},"9" : {label:$scope.kommuner[390]},
                "10": {label:$scope.kommuner[391]},"11": {label:$scope.kommuner[392]},"12" : {label:$scope.kommuner[393]},"13" : {label:$scope.kommuner[394]},"14" : {label:$scope.kommuner[395]},"15" : {label:$scope.kommuner[396]},"16" : {label:$scope.kommuner[397]}
                
            }
        },
        "18" : {
            label:"Vestfold",      
            kommuner:{
                "2" : {label:$scope.kommuner[398]},"3" : {label:$scope.kommuner[399]},
                "4" : {label:$scope.kommuner[400]},"5" : {label:$scope.kommuner[401]},"6" : {label:$scope.kommuner[402]},"7" : {label:$scope.kommuner[403]},"8" : {label:$scope.kommuner[404]},"9" : {label:$scope.kommuner[405]},
                "10": {label:$scope.kommuner[406]},"11": {label:$scope.kommuner[407]},"12" : {label:$scope.kommuner[408]},"13" : {label:$scope.kommuner[409]},"14" : {label:$scope.kommuner[410]},"15" : {label:$scope.kommuner[411]}
                
            }
               
            
        },
        "19" : {
            label:"Østfold",      
            kommuner:{
                "2" : {label:$scope.kommuner[412]},"3" : {label:$scope.kommuner[413]},
                "4" : {label:$scope.kommuner[414]},"5" : {label:$scope.kommuner[415]},"6" : {label:$scope.kommuner[416]},"7" : {label:$scope.kommuner[417]},"8" : {label:$scope.kommuner[418]},"9" : {label:$scope.kommuner[419]},
                "10": {label:$scope.kommuner[420]},"11": {label:$scope.kommuner[421]},"12" : {label:$scope.kommuner[422]},"13" : {label:$scope.kommuner[423]},"14" : {label:$scope.kommuner[424]},"15" : {label:$scope.kommuner[425]},
                "16" : {label:$scope.kommuner[426]},"17" : {label:$scope.kommuner[427]},"18" : {label:$scope.kommuner[428]},"19" : {label:$scope.kommuner[429]}
                
            }
        }
    };


    $scope.searchTypes    = [{type:"Alle", value: 0},{type:"Person", value: 1}, {type:"Kommune", value: 2}, {type:"Løpe", value: 3}, {type:"Selskap", value:4}];
    $scope.currentType = $scope.searchTypes[0];

    $scope.advanceChange = function(){
        if($scope.search.nameSearch != "")
            $scope.doSearch();
      };

    $scope.queryPerson  = function() {

        queryPromis = $rootScope.doQuery("name", $scope.search.nameSearch,
            $scope.page, $scope.search.pageSize, $scope.order, $scope.orderBy, $scope.currentType.value, $scope.selectedFylkeIndex, $scope.selectedMunicipality)
        queryPromis.then(function(result){

            angular.forEach(result.count[0], function(value) {
                $scope.count = value;
                //$scope.count = Math.ceil($scope.page * $scope.search.pageSize);
            });

            $scope.lastSearched   = $scope.search.nameSearch;
            $scope.names          = result.records;
            $scope.showTable      = $scope.names.length > 0;
            $scope.noResultShow   = !!($scope.names.length == 0 && $scope.search.nameSearch.length > 0);
            $scope.showNavigation = true;
            $scope.more_results   = $scope.count > ($scope.page * $scope.search.pageSize);
            $scope.searched       = true;
            $scope.hideNavigation = !(!$scope.more_results && $scope.page == 1);
            $scope.totalPages     = Math.ceil($scope.count / $scope.search.pageSize);
            $scope.pageDisplay    = "Side: " + $scope.page + " av " + $scope.totalPages;
            $scope.sortReady      = true;

        });
    };

    $scope.doSearch    = function(){
        if($scope.lastSearch != $scope.search.nameSearch){
            $scope.page = 1;
        }

        console.log("Searching for " + $scope.search.nameSearch + " with page size " +
            $scope.search.pageSize + " at page " + $scope.page + " ordered by " + $scope.orderBy +
            " " + $scope.order);



        //$scope.queryPerson();
        //$location.search(name, 123);
        var name_encoded = encodeURIComponent($scope.search.nameSearch);
        var type;

        if($scope.currentType == undefined){
            type = 0;
        }else type = $scope.currentType.value;

        $location.path("/search/" + name_encoded + "/" + type + "/" + $scope.page + "/" + $scope.search.pageSize);
    };

    $scope.searchDelay = function(){

        if(_timeout){ //if there is already a timeout in process cancel it
            $timeout.cancel(_timeout);
        }

        if($scope.search.nameSearch != ""){
            _timeout = $timeout(function(){

                /*$scope.search.loading = true;*/

                $scope.doSearch();

                _timeout = null;

            },500);
        }
        if ($scope.search.nameSearch.length == 0 && ($scope.showTable || $scope.noResultShow || $scope.hideNavigation)){
            $scope.showTable = false;
            $scope.noResultShow = true;
            $scope.hideNavigation = false;
            $scope.currentType = undefined;
        }
    };

    $scope.pageSizeChange = function(){
        $scope.page = 1;
        $scope.queryPerson();
    };

    if($routeParams.searchName) {
        $scope.searched          = true;

        document.getElementById("search").focus();
        $scope.search.nameSearch = decodeURIComponent($routeParams.searchName);
        $scope.page              = parseInt($routeParams.page);
        $scope.search.pageSize   = parseInt($routeParams.pageSize);
        $scope.currentType       = $scope.searchTypes[$routeParams.type];
        $scope.queryPerson();
    }

    $scope.navigate = function(way) {
        if((way == -1 && $scope.page > 1 && $scope.showNavigation) || (way == 1 && $scope.more_results && $scope.showNavigation)){
            $scope.page          += way;
            $scope.showNavigation = false;
            $scope.queryPerson();
            //$location.path("/search/" + $scope.search.nameSearch + "/" + $scope.page + "/" + $scope.search.pageSize);
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
    }

    $scope.selectedMunicipalityChanged = function(selected){

        console.log($scope.selectedFylke.kommuner[selected].label)
        
    }

    $scope.selectedFylkeChanged = function(selected){
        console.log($scope.fylker[selected]);
        $scope.selectedFylkeIndex = selected;
        $scope.selectedFylke = $scope.fylker[selected];
    }
});
