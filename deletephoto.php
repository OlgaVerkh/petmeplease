<?php 
    include_once 'function.php';
    $photo_id = (int)$_GET['photo_id'];
    $db = getConnect();

    $photo_link = mysqli_query($db, '
        SELECT photo_link
        FROM photo
        WHERE photo_id = "' .$photo_id.'";
    ');

    $photo_link = mysqli_fetch_assoc($photo_link);

    mysqli_query($db, '
        DELETE FROM photo
        WHERE photo_id = "'.$photo_id.'";
    ');

    unlink($photo_link['photo_link']);

    if(mysqli_affected_rows($db) == 1) {
        echo 1;
    }
    else {
        echo 0;
    }

?>