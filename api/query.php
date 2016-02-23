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

    public function selectPersonPaged($name, $page=1, $pageSize=10) {
        //$query = "SELECT * FROM kommunalrapport.Deltagere WHERE Navn LIKE :name LIMIT :offset, :pageSize";
        $query = "SELECT SQL_CALC_FOUND_ROWS Deltagerid AS id,
                    CASE
                        WHEN Deltagertype = 'F'
                            THEN 'Privatperson'
                        WHEN Deltagertype = 'S'
                            THEN 'Selskap'
                        END AS Type, Navn AS Navn FROM kommunalrapport.Deltagere
                    WHERE Navn LIKE :name
                    LIMIT :offset, :pageSize;";

        $offset = ($page - 1)*$pageSize;
        $name = "%$name%";

        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':name', $name, PDO::PARAM_STR);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->bindValue(':pageSize', $pageSize, PDO::PARAM_INT);
        $stmt->execute();

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $count = $this->countRows();

        return json_encode(array("records" => $result, "count" => $count));
    }

    public function selectTransaction($id, $page=1, $pageSize=10) {
        $query = "SELECT O.id, O.Eiendomsid, K.Kommunenavn AS Kommune,
                    CASE
                        WHEN PartType = 'K'
                            THEN 'Kjøper'
                        WHEN PartType = 'S'
                            THEN 'Selger'
                    END AS Rolle, D.Navn, OT.Omsetningstypenavn AS Type, Salgssum
                    FROM Omsetninger AS O, Deltagere AS D, Omsetningstyper AS OT, Eiendommer AS E, Kommuner AS K
                    WHERE O.Deltagerid = :personid
                    AND D.Deltagerid = O.Deltagerid
                    AND OT.Omsetningstypekode = O.Omsetningstypekode
                    AND E.Eiendomsid = O.Eiendomsid
                    AND K.Kommunenr = E.Kommunenr
                    LIMIT :offset, :pageSize";

        $offset = ($page - 1)*$pageSize;

        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':personid', $id, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->bindValue(':pageSize', $pageSize, PDO::PARAM_INT);
        $stmt->execute();

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode(array("records" => $results));
    }

    public function selectPerson($name)
    {
        $toAdd = "";
		$params = array("%$name%");
        if($name != "") {
            $toAdd = " WHERE Navn LIKE ?";
        }

    	$query = "SELECT * FROM kommunalrapport.Personer";

        $result = $this->runAndPrepare($query, $toAdd, $params);

        return json_encode(array("records" => $this->returnRows($result)));
    }

    private function runAndPrepare($query, $toAdd, $params){
    	$sql = $this->db->prepare($query . $toAdd . " LIMIT 5555");
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

    public function countRows() {
        $query = "SELECT FOUND_ROWS()";

        $stmt = $this->db->prepare($query);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}