<?php

header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, POST');

header("Access-Control-Allow-Headers: X-Requested-With");

$conn = new mysqli('localhost', 'root', '', 'insert');
//$conn = new mysqli('mysqlsvr39.world4you.com', 'sql9679214', 'c9+@*nx', '4698418db6');

$id = $_POST['id'];


$sql = "SELECT id, vorname, nachname, geburtsdatum, geschlecht, orientierung FROM data WHERE id = '" . $id ."'";

$result = $conn->query($sql);

/* determine number of rows result set */

$row = $result -> fetch_assoc();

$row_cnt = $result->num_rows;

if ($row_cnt > 0) {
    echo json_encode($row);
} else {
    echo "Error";
}
?>