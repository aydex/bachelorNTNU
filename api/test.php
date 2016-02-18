<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once("config.php");
require_once("query.php");

use bachelor\Config;
use bachelor\QueryClass;

$config = new Config();
$output = "";
$name	= htmlspecialchars($_GET['name']);
$query  = 'SELECT * from kommunalrapport.Personer WHERE Navn LIKE ?';
$params = array("%$name%");
$sql 	= $config->db->prepare($query);

$sql->execute($params);

$rows = $sql->fetchAll(PDO::FETCH_ASSOC);

foreach($rows as $row) {
    if($output != ""){$output .= ",";}
    $output .= '{"Personid":"'   		  . $row["Personid"] 			. '",';
    $output .= '"AnonymisertPersonnr":"'  . $row["AnonymisertPersonnr"] . '",';
    $output .= '"Personidtypekode":"'  	  . $row["Personidtypekode"]    . '",';
    $output .= '"Navn":"'				  . $row["Navn"]     			. '"}'; 
}

$output ='{"records":['.$output.']}';
echo $output;


$json_output = json_encode($rows);
echo $json_output;
?>