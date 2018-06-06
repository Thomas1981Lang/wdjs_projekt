<?php

include 'mysql_local.php';
include 'mysql_remote.php';


$id = $_POST['id'];


$matchArrayOne = [];


$sqlOne = "SELECT data.id, data.vorname, data.nachname, data.geburtsdatum, data.geschlecht, data.orientierung, data.picuserpfad, match_data.user1_id, match_data.user2_id FROM data JOIN match_data ON data.id = match_data.user1_id WHERE ( match_data.user1_id = '" . $id . "' OR match_data.user2_id = '" . $id . "') AND ( match_data.user1_choose = 1 AND match_data.user2_choose = 1) AND NOT data.id = '" . $id . "'";

if ($matchOne = $conn->query($sqlOne)) {

    while ($rowMatchOne = $matchOne->fetch_array(MYSQLI_ASSOC)) {
        $matchArrayOne[] = $rowMatchOne;
    }
}
$matchArrayTwo = [];
$sqlTwo = "SELECT data.id, data.vorname, data.nachname, data.geburtsdatum, data.geschlecht, data.orientierung, data.picuserpfad, match_data.user1_id, match_data.user2_id 
          FROM data JOIN match_data ON data.id = match_data.user2_id WHERE ( match_data.user1_id = '" . $id . "' OR match_data.user2_id = '" . $id . "') AND ( match_data.user1_choose = 1 AND match_data.user2_choose = 1) AND NOT data.id = '" . $id . "'";

if ($matchTwo = $conn->query($sqlTwo)) {

    while ($rowMatchTwo = $matchTwo->fetch_array(MYSQLI_ASSOC)) {
        $matchArrayTwo[] = $rowMatchTwo;
    }
}
$mixedArray = array_merge($matchArrayTwo, $matchArrayOne);
//var_dump($matchArrayOne);
//var_dump($matchArrayTwo);
echo json_encode($mixedArray);
//echo json_encode($matchArrayTwo);
?>