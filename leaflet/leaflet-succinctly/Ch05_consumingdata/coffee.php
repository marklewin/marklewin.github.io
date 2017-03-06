<?php
    $db = new PDO("mysql:host=localhost;dbname=leafletDB", "root", "leaflet");
    $sql = "SELECT * FROM CoffeeShops WHERE City='Boston'";
    $rs = $db->query($sql);
    if (!$rs) {
        echo "An SQL error occured.\n";
        exit;
    }
    $rows = array();
    while($r = $rs->fetch(PDO::FETCH_ASSOC)) {
        $rows[] = $r;
    }
    print json_encode($rows);
    $db = NULL;
?>