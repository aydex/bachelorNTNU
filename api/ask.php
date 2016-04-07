<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once("config.php");
require_once("query.php");

use bachelor\Config;
use bachelor\Query;

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

if (isset($_REQUEST['name']) && isset($_REQUEST['orderBy'])) {

    $name = htmlspecialchars($_REQUEST['name']);

    echo $query->selectPersonPaged($name, $page, $pageSize, $order, $orderBy, $filterBy);

}else if(isset($_REQUEST['transactionFromPerson'])){

    $pId = htmlspecialchars($_REQUEST['transactionFromPerson']);

    echo $query->selectTransaction($pId, $page, $pageSize, $order, $orderBy);

}else if(isset($_REQUEST['transactionFromProperty'])){

    $eId = htmlspecialchars($_REQUEST['transactionFromProperty']);

    echo $query->selectTransactionProperty($eId, $page, $pageSize, $order, $orderBy);

}


?>