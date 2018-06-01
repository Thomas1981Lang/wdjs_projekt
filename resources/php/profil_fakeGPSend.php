<?php

include 'mysql_local.php';
include 'mysql_remote.php';


$id = $_POST['id'];



$sql = "UPDATE data SET fakeGPS = 0 WHERE id = '" . $id ."'";


if ($conn->query($sql) === TRUE) {
    echo "set FakeGPS to 0";
} else {
    echo "Error";
}
?>