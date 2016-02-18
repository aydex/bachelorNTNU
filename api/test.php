<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once("config.php");
require_once("query.php");

use bachelor\Config;
use bachelor\Query;

$config = new Config();
$query  = new Query($config->db);

$name = htmlspecialchars($_GET['name']);

echo $query->selectPerson($name);

?>