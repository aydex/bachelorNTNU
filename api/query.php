<?php

namespace bachelor;

use PDO;

class Query
{
	private $db;

	public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function selectPerson($name)
    {
    	$toAdd = "";
		$params = array("%$name%");
    	if($name != ""){
    		$toAdd = " WHERE Navn LIKE ?";
    	}

    	$query = "SELECT * FROM kommunalrapport.Personer";

    	$result = $this->runAndPrepare($query, $toAdd, $params);

    	return json_encode(array("records" => $this->returnRows($result)));
    }

    private function runAndPrepare($query, $toAdd, $params){
    	$sql = $this->db->prepare($query . $toAdd);
    	if($toAdd != ""){
    		$sql->execute($params);
    	}else{
    		$sql->execute();
    	}
    	return $sql;
    }

    private function returnRows($sql){
    	return $sql->fetchAll(PDO::FETCH_ASSOC);
    }
}	