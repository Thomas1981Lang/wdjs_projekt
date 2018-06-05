<?php

include 'mysql_local.php';
include 'mysql_remote.php';


$id = $_POST['id'];


$matchArray = [];
//$sql = "SELECT match_id, user1_id, user2_id, user1_choose, user2_choose FROM match_data WHERE  ( user1_id = '" . $id . "' OR user2_id = '" . $id . "') AND ( user1_choose = 1 AND user2_choose = 1)";

$sql = "SELECT data.id, data.vorname, data.nachname, data.geburtsdatum, data.geschlecht, data.orientierung, data.picuserpfad, match_data.user1_id, match_data.user2_id FROM data right JOIN match_data ON data.id = match_data.user1_id WHERE ( match_data.user1_id = '" . $id . "' ) AND ( match_data.user1_choose = 1 AND match_data.user2_choose = 1)";

if ($match = $conn->query($sql)) {

    while ($rowMatch = $match->fetch_array(MYSQLI_ASSOC)) {
        $matchArray[] = $rowMatch;
    }
}
echo json_encode($matchArray);
//
//
//$peopleArray = [];
//$sqlPeople = "SELECT id, vorname, nachname, geburtsdatum, geschlecht, orientierung, picuserpfad, lat, lng, type FROM data WHERE NOT id = '" . $id . "'";
//if ($people = $conndata->query($sqlPeople)) {
//
//    while ($rowPeople = $people->fetch_array(MYSQLI_ASSOC)) {
//        $peopleArray[] = $rowPeople;
//    }
//}
//$mixedArray = array_merge($locationsArray,$peopleArray);
//echo json_encode($mixedArray);
?>