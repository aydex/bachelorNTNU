<?php
/**
 * Created by PhpStorm.
 * User: adrianh
 * Date: 09.02.16
 * Time: 10.32
 */

$config = parse_ini_file("../bachelor.ini");
echo $config;

$db_name = $config[0];
$hostname = $config[1];
$username = $config[2];
$password = $config[3];

