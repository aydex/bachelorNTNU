<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once("config.php");
require_once("query.php");
session_start();

use bachelor\Config;
use bachelor\Query;

if (isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'] == 1 && isset($_SESSION['subscription_id']) && $_SESSION['subscription_id'] != -1) {

    $config   = new Config();
    $query    = new Query($config->db);
    $name     = "";
    $page     = 0;
    $pageSize = 0;
    $order    = "";
    $orderBy  = "";
    $filterBy = "";

    if (isset($_REQUEST['page']) && isset($_REQUEST['pageSize'])) {
        $page     = (int)$_REQUEST['page'];
        $pageSize = (int)$_REQUEST['pageSize'];
    }

    if (isset($_REQUEST['order']) && isset($_REQUEST['orderBy'])) {

        $order   = htmlspecialchars($_REQUEST['order']);
        $orderBy = htmlspecialchars($_REQUEST['orderBy']);

    }

    if(isset($_REQUEST['filterBy'])) {
        $filterBy = htmlspecialchars($_REQUEST['filterBy']);
    }

    if (isset($_REQUEST['fylkenr'])) {
        $fylkenr     = (int)$_REQUEST['fylkenr'];
    }

    if (isset($_REQUEST['kommnr'])) {
        $kommnr     = (int)$_REQUEST['kommnr'];
    }

    if (isset($_REQUEST['name']) && isset($_REQUEST['orderBy'])) {
        $name = htmlspecialchars($_REQUEST['name']);
    
        echo $query->selectPersonPaged($name, $page, $pageSize, $order, $orderBy, $filterBy, $fylkenr, $kommnr);

    }else if(isset($_REQUEST['transactionFromPerson'])){

        $pId = htmlspecialchars($_REQUEST['transactionFromPerson']);

        echo $query->selectTransaction($pId, $page, $pageSize, $order, $orderBy);

    }else if(isset($_REQUEST['transactionFromProperty'])){

        $eId = htmlspecialchars($_REQUEST['transactionFromProperty']);

        echo $query->selectTransactionProperty($eId, $page, $pageSize, $order, $orderBy);

    }else if(isset($_REQUEST['municipalityId'])) {
        $mId = htmlspecialchars($_REQUEST['municipalityId']);
        echo $query->selectMunicipalityFromId($mId);
    } else if(isset($_REQUEST['getMunicipalities'])) {
        echo $query->getMunicipalities();
    } else if(isset($_REQUEST['countyId'])) {
        $cId = htmlspecialchars($_REQUEST['countyId']);
        echo $query->selectCountyFromId($cId);
    } else if(isset($_REQUEST['getCounties'])) {
        echo $query->getCounties();
    }
} else {
    /*if(isset($_SESSION["subscription_id"]) && $_SESSION["subscription_id"] != 6) {
        echo json_encode(array("records" => "wrong_subscription"));
    } else {*/
        echo json_encode(array("records" => "login_required"));
    //}
}


?>
