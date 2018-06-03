<?php

include 'mysql_local.php';
include 'mysql_remote.php';


$id = $_POST['id'];
$fk_id = $_POST['fk_id'];
$like = $_POST['like'];
$dislike = $_POST['dislike'];


if ($like == 1) {
$user1_choose = 1;
}

if($dislike == 1 ) {
    $user1_choose = 0;
}


$sql = "INSERT INTO `match_data` (`user1_id`, `user2_id`, `user1_choose`) VALUES ('$id', '$fk_id', '$user1_choose' )";
if ($conn->query($sql) === TRUE) {
    echo "data inserted";
} else {
    echo "Error";
}
?>
