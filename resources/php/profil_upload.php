<?php

include 'mysql_remote.php';
include 'mysql_local.php';


/* Getting file name */
$filename = $_FILES['file']['name'];
$id = $_POST['idvalue'];


/* Location */
$temp = explode(".", $_FILES["file"]["name"]);
$newfilename = round(microtime(true)) . '.' . end($temp);
$location = "../upload/" . $newfilename;
$uploadOk = 1;
$imageFileType = pathinfo($location, PATHINFO_EXTENSION);

// Check image format
if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
    && $imageFileType != "gif") {
    $uploadOk = 0;
}

if ($uploadOk == 0) {
    echo 0;
} else {

    $jslocation = "resources/upload/" . $newfilename;
    $sql = "UPDATE data SET picuserpfad = '$jslocation', picuser = 1 WHERE id = '".$id."'";
    $conn->query($sql);

    //    if ($conn->query($sql) === TRUE) {
    //        echo "data inserted";
    //    } else {
    //        echo "Error";
    //    }

    /* Upload file */

    if (move_uploaded_file($_FILES['file']['tmp_name'], $location)) {
        echo "resources/upload/" . $newfilename;
    } else {
        echo 0;
    }
}