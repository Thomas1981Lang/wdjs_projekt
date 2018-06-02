<?php

include 'mysql_remote.php';
include 'mysql_local.php';


$id = $_POST['id'];
$lat = $_POST['lat'];
$lng = $_POST['lng'];



$sql = "UPDATE data SET lat = '". $lat ."', lng = '". $lng ."' WHERE id = '" . $id ."'";


if ($conn->query($sql) === TRUE) {
    echo "save FakeGPS";
} else {
    echo "Error";
}
?>