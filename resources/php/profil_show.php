<?php

include 'mysql_local.php';
include 'mysql_remote.php';


$id = $_POST['id'];


$sql = "SELECT id, vorname, nachname, geburtsdatum, geschlecht, orientierung, picuser, picuserbackground, picuserpfad, picuserbackgroundpfad, fakeGPS, lat, lng FROM data WHERE id = '" . $id ."'";

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