<?php

include 'mysql_local.php';
include 'mysql_remote.php';


$username = $_POST['username'];
$vorname = $_POST['vorname'];
$nachname = $_POST['nachname'];
$email = $_POST['email'];
$geburtsdatum = $_POST['geburtsdatum'];
$geschlecht = $_POST['geschlecht'];
$orientierung = $_POST['orientierung'];
$password = $_POST['password'];
$picuser = $_POST['picuser'];
$picuserbackground = $_POST['picuserbackground'];
$lat = $_POST['lat'];
$lng = $_POST['lng'];
$type = $_POST['type'];


$sql = "INSERT INTO `data` (`username`, `vorname`, `nachname`, `email`, `geburtsdatum`, `geschlecht`, `orientierung`, `password`, `picuser`, `picuserbackground`, `lat`, `lng`, `type`) VALUES ('$username', '$vorname', '$nachname', '$email', '$geburtsdatum', '$geschlecht', '$orientierung', '$password', '$picuser', '$picuserbackground', '$lat', '$lng', '$type' )";
if ($conn->query($sql) === TRUE) {
    echo "data inserted";
} else {
    echo "Error";
}
?>