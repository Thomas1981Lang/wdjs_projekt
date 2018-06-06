<?php

include 'mysql_local.php';
include 'mysql_remote.php';


$id = $_POST['id'];
$fk_id = $_POST['fk_id'];



    $sql = "UPDATE match_data SET user1_choose = 2, user2_choose = 2 WHERE  (user1_id = '" . $id . "' AND user2_id = '" . $fk_id . "') OR (user1_id = '" . $fk_id . "' AND user2_id = '" . $id . "')";


if ($conn->query($sql) === TRUE) {
    echo "data inserted";
} else {
    echo "Error";
}
?>