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

    public function selectPerson($name, $page=0, $pageSize=0)
    {
    	$toAdd = "";
		$params = array($name);
    	$query = "SELECT * FROM kommunalrapport.Personer";

        if ($page != 0 && $pageSize != 0) {
            $toAdd = " WHERE Navn LIKE ? LIMIT ?, ?";
            array_push($params, $page, $pageSize);
            var_dump($params);
            //$sql->bindParam("sii", $params[0], $params[1], $params[2]);
        } elseif ($name != "") {
    		$toAdd = " WHERE Navn LIKE ? LIMIT 1000";
        }

    	//$result = $this->runAndPrepare($query, $toAdd, $params);
        $result = $this->runAndPrepare($query, $toAdd, $params);

        return json_encode(array("records" => $this->returnRows($result)));
    }

    private function runAndPrepare($query, $toAdd, $params){
    	$sql = $this->db->prepare($query . $toAdd);
    	if($toAdd != ""){
    		$sql->execute($params);
            echo $sql->queryString;
    	}else{
    		$sql->execute();
    	}
    	return $sql;
    }

    private function returnRows($sql){
    	return $sql->fetchAll(PDO::FETCH_ASSOC);
    }
}	