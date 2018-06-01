<?php

header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, POST');

header("Access-Control-Allow-Headers: X-Requested-With");

$conn = new mysqli('localhost', 'root', '', 'insert');
////$conn = new mysqli('mysqlsvr39.world4you.com', 'sql9679214', 'c9+@*nx', '4698418db6');

$id = $_POST['id'];


$locationsArray = [];
$sqlLocation = "SELECT id_location, title, type, content, lat, lng FROM locations";
if ($locations = $conn->query($sqlLocation)) {

    while ($rowLocation = $locations->fetch_array(MYSQLI_ASSOC)) {
        $locationsArray[] = $rowLocation;
    }
//    print_r(array_merge($locationsArray,$locationsArray));
   //print_r( $locationsArray);
//    echo json_encode($locationsArray);
}

$conndata = new mysqli('localhost', 'root', '', 'insert');
$peopleArray = [];
$sqlPeople = "SELECT id, vorname, nachname, geburtsdatum, geschlecht, orientierung, picuserpfad, lat, lng, type FROM data WHERE NOT id = '" . $id . "'";
if ($people = $conndata->query($sqlPeople)) {

    while ($rowPeople = $people->fetch_array(MYSQLI_ASSOC)) {
        $peopleArray[] = $rowPeople;
    }
}
$mixedArray = array_merge($locationsArray,$peopleArray);
echo json_encode($mixedArray);
?>