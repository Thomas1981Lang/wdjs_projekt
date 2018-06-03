<?php

include 'mysql_local.php';
include 'mysql_remote.php';


$id = $_POST['id'];

$matchArray = [];
$sql = "SELECT match_id, user1_id, user2_id, user1_choose, user2_choose FROM match_data WHERE  user1_id = '" . $id . "' OR user2_id = '" . $id . "'";
if ($match = $conn->query($sql)) {

    while ($rowMatch = $match->fetch_array(MYSQLI_ASSOC)) {
        $matchArray[] = $rowMatch;
    }
}
echo json_encode($matchArray);
?>