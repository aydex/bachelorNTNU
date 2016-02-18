<?php

namespace bachelor;

use PDO;

class QueryClass
{
	private $db;

	public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function select_person($name)
    {

    	$sql = $this->db->prepare("SELECT * FROM kommunalrapport.Personer WHERE navn LIKE %?%");
        $sql->execute(array("as"));

        echo $name;

        $this->show_row($sql);
    }

    private function show_row($sql){
    	$row = $sql->fetch();
        

        print_r($row);
    }
}	