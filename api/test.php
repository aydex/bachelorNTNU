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


if (isset($_REQUEST['page']) && isset($_REQUEST['pageSize'])) {
    $page = (int)$_REQUEST['page'];
    $pageSize = (int)$_REQUEST['pageSize'];
}

if (isset($_REQUEST['name'])) {
    $name = htmlspecialchars($_REQUEST['name']);
    echo $query->selectPersonPaged($name, $page, $pageSize);

}else if(isset($_REQUEST['transaction'])){
	$pId = htmlspecialchars($_REQUEST['transaction']);
	echo $query->selectTransaction($pId, $page, $pageSize);
}


?>
