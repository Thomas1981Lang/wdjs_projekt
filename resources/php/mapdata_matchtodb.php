<?php

include 'mysql_local.php';
include 'mysql_remote.php';


$id = $_POST['id'];
$fk_id = $_POST['fk_id'];
$like = $_POST['like'];
$dislike = $_POST['dislike'];
$me = $_POST['me'];




if ($like == 1) {
    $user2_choose = 1;
}

if ($dislike == 1) {
    $user2_choose = 2;
}

if ($me == 1) {
    $sql = "UPDATE match_data SET user1_choose = '" . $user2_choose . "' WHERE  user1_id = '" . $id . "' AND user2_id = '" . $fk_id . "'";
} elseif ($me == 2) {
    $sql = "UPDATE match_data SET user2_choose = '" . $user2_choose . "' WHERE  user1_id = '" . $fk_id . "' AND user2_id = '" . $id . "'";
} else {

$sql = "UPDATE match_data SET user2_choose = '" . $user2_choose . "' WHERE  user1_id = '" . $fk_id . "' AND user2_id = '" . $id . "'";
}


if ($conn->query($sql) === TRUE) {
    echo "data inserted";
} else {
    echo "Error";
}
?>