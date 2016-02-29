<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once("config.php");
require_once("query.php");

use bachelor\Config;
use bachelor\Query;

$config = new Config();
$query  = new Query($config->db);

$name = "";
$page = 0;
$pageSize = 0;
$order="";
$orderBy="";

if (isset($_REQUEST['page']) && isset($_REQUEST['pageSize'])) {
    $page = (int)$_REQUEST['page'];
    $pageSize = (int)$_REQUEST['pageSize'];
}

if (isset($_REQUEST['name']) && isset($_REQUEST['orderBy'])) {

    $name = htmlspecialchars($_REQUEST['name']);
    $order = htmlspecialchars($_REQUEST['order']);
    $orderBy = htmlspecialchars($_REQUEST['orderBy']);
    echo $query->selectPersonPaged($name, $page, $pageSize, $order, $orderBy);

}else if(isset($_REQUEST['transactionFromPerson'])){

	$pId = htmlspecialchars($_REQUEST['transactionFromPerson']);
	echo $query->selectTransaction($pId, $page, $pageSize);

}else if(isset($_REQUEST['transactionFromProperty'])){

	$eId = htmlspecialchars($_REQUEST['transactionFromProperty']);
	echo $query->selectTransactionProperty($eId, $page, $pageSize);

}


?>
