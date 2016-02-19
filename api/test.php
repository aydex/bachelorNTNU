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

if (isset($_REQUEST['name'])) {
    $name = htmlspecialchars($_REQUEST['name']);

}

if (isset($_REQUEST['page']) && isset($_REQUEST['pageSize'])) {
    $page = $_REQUEST['page'];
    $pageSize = $_REQUEST['pageSize'];
}


echo $query->selectPerson($name, $page, $pageSize);

?>
