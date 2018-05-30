<?php

header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, POST');

header("Access-Control-Allow-Headers: X-Requested-With");

$conn = new mysqli('localhost', 'root', '', 'insert');
//$conn = new mysqli('mysqlsvr39.world4you.com', 'sql9679214', 'c9+@*nx', '4698418db6');

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