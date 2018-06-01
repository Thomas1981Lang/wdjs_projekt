<?php

include 'mysql_local.php';
include 'mysql_remote.php';


$id = $_POST['id'];
$setnav = $_POST['setnav'];

$sql = "UPDATE data SET ". $setnav ." = 1 WHERE id = '" . $id ."'";


if ($conn->query($sql) === TRUE) {
    echo "set eat to 1";
} else {
    echo "Error";
}
?>