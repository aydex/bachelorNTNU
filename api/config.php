<?php
/**
 * Created by PhpStorm.
 * User: adrianh
 * Date: 09.02.16
 * Time: 10.32
 */

// set up the connection variables

namespace bachelor;

use PDO;

class Config
{

	static $db;

	public function __construct(){
		$config = parse_ini_file("../bachelor.ini");

		$db_name  = $config["db_name"];
		$hostname = $config["hostname"];
		$username = $config["username"];
		$password = $config["password"];

		// connect to the database
		try{
			$this->db = new PDO("mysql:host=$hostname;
				dbname=$db_name", 
				$username, 
				$password, 
    			array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8") 
    		);
		} catch (PDOException $e) {
		    print "Error!: " . $e->getMessage() . "<br/>";
		    die();
		}
		

	}
	
}
