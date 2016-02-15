<?php
/**
 * Created by PhpStorm.
 * User: adrianh
 * Date: 09.02.16
 * Time: 10.32
 */

// set up the connection variables
$config = parse_ini_file("../bachelor.ini");

$db_name = $config[db_name];
$hostname = $config[hostname];
$username = $config[username];
$password = $config[password];

// connect to the database
$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
