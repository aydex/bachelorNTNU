<?php

namespace bachelor;

use PDO;

class Query
{
    private $db;
    private $selectFromOrder = array('DESC', 'ASC');
    private $filterByArray   = array('F', 'K', 'L', 'S');
    private $returnArray     = array('login_required', 'wrong_subscription');

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    private function authenticate()
    {
        if(isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'] == 1 && isset($_SESSION['subscription_id']) && $_SESSION['subscription_id'] != -1) return true;
        //else if(isset($_SESSION['subscription_id']) && $_SESSION["subscription_id"] != 6) return 1;
        else false;
    }

     public function selectPersonPaged($name, $page=1, $pageSize=10, $order="ASC", $orderBy, $filterBy, $fylkenr, $kommnr) {

        if(!$this->authenticate()) {
            return json_encode(array("records" => "login_required"));
            exit;
        }


        $filterBy = $filterBy - 1;
        if($filterBy > -1){
            $type = (string)$this->filterByArray[$filterBy];
            $filterByText = "AND Deltagertype = '$type'";
        }else{
            $filterByText = "";
        }

         if ($fylkenr > 0 && $kommnr == 0){
            $kommFilterText = "AND Kommunenr = '$fylkenr'";
        } else if ($kommnr > 0){
            $kommFilterText = "AND Kommunenr = '$kommnr'";
        }  else {
            $kommFilterText = "";
        }

        $selectFromArray = array('id', 'Type', 'Navn', 'Kommuner', 'null');
        $keyOrderBy      = array_search($orderBy, $selectFromArray);
        $keyOrder        = array_search($order, $this->selectFromOrder);



        $query = "SELECT SQL_CALC_FOUND_ROWS Deltagerid AS id, Deltagertype AS Type, Navn, GROUP_CONCAT(DISTINCT CONCAT_WS(':', I.Kommunenr, Kommunenavn)SEPARATOR ',') AS Kommuner 
                    FROM Deltagere 
                    LEFT JOIN DeltagerInvolvertKommune AS I USING (Deltagerid) 
                    LEFT JOIN Kommuner USING (Kommunenr)
                    WHERE Navn LIKE :name
                    $kommFilterText
                    $filterByText
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
        if(!$this->authenticate()) {
            return json_encode(array("records" => "login_required"));
            exit;
        }
        
        $selectFromArray = array('Kommunenavn', 'Eiendomsid', 'ForstRegistrert', 'SistRegistrert', 'AntallTransaksjoner', 'Involvering', 'Gatenavn', 'Husnr', 'Bokstav', 'InvolverteKommuner', 'Historie', 'null');

        $keyOrderBy      = array_search($orderBy, $selectFromArray);
        $keyOrder        = array_search($order, $this->selectFromOrder);

        $query = "SELECT SQL_CALC_FOUND_ROWS  Eiendomsid, 
                  GROUP_CONCAT(DISTINCT CONCAT_WS(':', Dokumentdato, PartType) SEPARATOR ', ') AS Involvering,
                  GROUP_CONCAT(DISTINCT CONCAT_WS(':', EI.Kommunenr, K.Kommunenavn) SEPARATOR ', ') AS InvolverteKommuner, Historie, Gatenavn, Husnr,Bokstav, Poststed
                  FROM Omsetninger
                  NATURAL JOIN Dokumenter
                  NATURAL JOIN Eiendomshistorie
                  NATURAL JOIN Eiendommer AS E
                  LEFT JOIN EiendomInvolvertKommune AS EI USING(Eiendomsid)
                  JOIN Kommuner AS K ON EI.Kommunenr = K.Kommunenr
                  WHERE Deltagerid= :query_target
                  GROUP BY Eiendomsid
                  ORDER BY  " . $selectFromArray[$keyOrderBy] . " " . $this->selectFromOrder[$keyOrder] . "
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
        if(!$this->authenticate()) {
            return json_encode(array("records" => "login_required"));
            exit;
        }

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


        $query_2 = "SELECT Prispunkt 
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

    public function countRows() {
        if(!$this->authenticate()) {
            return json_encode(array("records" => "login_required"));
            exit;
        }
        
        $query = "SELECT FOUND_ROWS()";

        $stmt = $this->db->prepare($query);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    public function selectMunicipalityFromId($mId)
    {
        if(!$this->authenticate()) {
            return json_encode(array("records" => "login_required"));
            exit;
        }
        
        $query = "SELECT * 
                  FROM Kommuner 
                  WHERE Kommunenr=:mId";
        
        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':mId', $mId, PDO::PARAM_INT);
        $stmt->execute();
        
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode(array("records" => $result));
    }

    public function getMunicipalities()
    {
        if(!$this->authenticate()) {
            return json_encode(array("records" => "login_required"));
            exit;
        }
        
        $query = "SELECT Kommunenr, Kommunenavn 
                  FROM kommunalrapport.Kommuner";

        $stmt = $this->db->prepare($query);
        $stmt->execute();
        
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        return json_encode(array("records" => $result));
    }

    public function selectCountyFromId($cId)
    {
        if(!$this->authenticate()) {
            return json_encode(array("records" => "login_required"));
            exit;
        }

        $query = "SELECT * 
                  FROM Fylker 
                  WHERE Fylkenr=:cId";

        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':cId', $cId, PDO::PARAM_INT);
        $stmt->execute();

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode(array("records" => $result));
    }
}