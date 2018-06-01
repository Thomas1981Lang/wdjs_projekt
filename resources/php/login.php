<?php

include 'mysql_remote.php';
include 'mysql_local.php';


$username = $_POST['username'];
$password = $_POST['password'];


$sql = "SELECT id, vorname, geschlecht, orientierung, picuser, picuserbackground, picuserpfad, picuserbackgroundpfad, fakeGPS, lat, lng, eat, drink, party, singles FROM data WHERE username = '" . $username . "' AND  password = '" . $password . "'";


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