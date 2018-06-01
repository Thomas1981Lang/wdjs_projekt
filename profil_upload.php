<?php
$conn = new mysqli('localhost', 'root', '', 'insert');
//$conn = new mysqli('mysqlsvr39.world4you.com', 'sql9679214', 'c9+@*nx', '4698418db6');


/* Getting file name */
$filename = $_FILES['file']['name'];
$id = $_POST['idvalue'];


/* Location */
$temp = explode(".", $_FILES["file"]["name"]);
$newfilename = round(microtime(true)) . '.' . end($temp);
$location = "resources/upload/" . $newfilename;
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


    $sql = "UPDATE data SET picuserpfad = '$location', picuser = 1 WHERE id = '".$id."'";
    $conn->query($sql);

    //    if ($conn->query($sql) === TRUE) {
    //        echo "data inserted";
    //    } else {
    //        echo "Error";
    //    }

    /* Upload file */

    if (move_uploaded_file($_FILES['file']['tmp_name'], $location)) {
        echo $location;
    } else {
        echo 0;
    }
}