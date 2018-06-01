<?php

include 'mysql_local.php';
include 'mysql_remote.php';


$id = $_POST['id'];


$sql = "DELETE FROM data WHERE id = '" . $id ."'";


if ($conn->query($sql) === TRUE) {
    echo "data deleted";
} else {
    echo "Error";
}
?>