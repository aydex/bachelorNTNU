<?php

namespace bachelor;

use PDO;

class Query
{
    private $db;
    private $selectFromOrder = array('DESC', 'ASC');

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function selectPersonPaged($name, $page=1, $pageSize=10, $order="ASC", $orderBy) {

        $selectFromArray = array('id', 'Type', 'Navn', 'Kommuner', 'null');
        $keyOrderBy      = array_search($orderBy, $selectFromArray);
        $keyOrder        = array_search($order, $this->selectFromOrder);

        $query = "SELECT SQL_CALC_FOUND_ROWS Deltagerid AS id, Deltagertype AS Type, Navn AS Navn, GROUP_CONCAT(CONCAT_WS(':', Kommunenr, Kommunenavn) SEPARATOR ',') AS Kommuner 
                    FROM  kommunalrapport.Deltagere
                    NATURAL JOIN Deltagerhistorie 
                    NATURAL JOIN  Kommuner 
                    WHERE Navn LIKE :name
                    GROUP BY Deltagerid
                    ORDER BY " . $selectFromArray[$keyOrderBy] . " " . $this->selectFromOrder[$keyOrder] . "
                    LIMIT :offset, :pageSize";

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

    public function selectTransaction($id, $page=1, $pageSize=10, $order, $orderBy) {
        $selectFromArray = array('Kommunenavn', 'Eiendomsid', 'ForstRegistrert', 'SistRegistrert', 'AntallTransaksjoner', 'Involvering', 'null');
        $keyOrderBy      = array_search($orderBy, $selectFromArray);
        $keyOrder        = array_search($order, $this->selectFromOrder);

        $query = "SELECT SQL_CALC_FOUND_ROWS Kommunenavn, Kommunenr, Eiendomsid, ForstRegistrert,
                  SistRegistrert, AntallTransaksjoner,
                  GROUP_CONCAT(CONCAT_WS(':', Dokumentdato, PartType) SEPARATOR ', ') AS Involvering
                  FROM Omsetninger
                  NATURAL JOIN Dokumenter
                  NATURAL JOIN Eiendomshistorie
                  NATURAL JOIN Eiendommer
                  NATURAL JOIN Kommuner
                  WHERE Deltagerid= :query_target
                  GROUP BY Eiendomsid
                  ORDER BY " . $selectFromArray[$keyOrderBy] . " " . $this->selectFromOrder[$keyOrder] . "
                  LIMIT :offset, :pageSize";


        $offset = ($page - 1)*$pageSize;

        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':query_target', $id, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->bindValue(':pageSize', $pageSize, PDO::PARAM_INT);
        $stmt->execute();

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $count = $this->countRows();

        return json_encode(array("records" => $results, "count" => $count));
    }

    public function selectTransactionProperty($id, $page=1, $pageSize=10, $order, $orderBy) {

        $selectFromArray = array('Dokumentdato', 'OmsetningsTypenavn', 'Salgssum', 'Dokumentnr', 'Deltagere', 'null');
        $keyOrderBy      = array_search($orderBy, $selectFromArray);
        $keyOrder        = array_search($order, $this->selectFromOrder);


        $query_1 = "SELECT SQL_CALC_FOUND_ROWS Dokumentdato, OmsetningsTypenavn, Salgssum, Dokumentnr,
                        GROUP_CONCAT(CONCAT_WS(':', PartType, Navn,Kommune,  Deltagerid, Deltagertype, AndelTeller, AndelNevner)SEPARATOR ',') AS Deltagere
                        FROM Omsetninger
                        NATURAL JOIN Dokumenter
                        NATURAL JOIN Deltagere
                        NATURAL JOIN Omsetningstyper
                        WHERE Eiendomsid=:query_target
                        GROUP BY InterntDokumentnr
                        ORDER BY " . $selectFromArray[$keyOrderBy] . " " . $this->selectFromOrder[$keyOrder];

        $query_2 = "SELECT Sammendrag 
                    FROM Eiendomshistorie 
                    WHERE Eiendomsid= :query_target"; 


        $offset = ($page - 1)*$pageSize;

        $stmt = $this->db->prepare($query_1);
        $stmt->bindValue(':query_target', $id, PDO::PARAM_INT);
        //$stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        //$stmt->bindValue(':pageSize', $pageSize, PDO::PARAM_INT);
        $stmt->execute();

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $count = $this->countRows();

        $stmt = $this->db->prepare($query_2);
        $stmt->bindValue(':query_target', $id, PDO::PARAM_INT);
        $stmt->execute();

        $results_combined = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode(array("records" => $results, "count" => $count, "combined" => $results_combined));
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

    public function selectMunicipalityFromId($mId)
    {
        $query = "SELECT * 
                  FROM Kommuner 
                  WHERE Kommunenr=:mId";
        
        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':mId', $mId, PDO::PARAM_INT);
        $stmt->execute();
        
        $results = $stmt ->fetchAll(PDO::FETCH_ASSOC);
        
        return json_encode(array("records" => $results));
    }
}