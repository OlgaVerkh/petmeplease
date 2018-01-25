<?php 
    include_once 'function.php';
    $ad_id = (int)$_GET['ad_id'];
    $db = getConnect();

    mysqli_query($db, '
        DELETE FROM photo
        WHERE photo_ad_id = '.$ad_id.';
    ');

    mysqli_query($db, '
        DELETE FROM ad
        WHERE ad_id = '.$ad_id.';
    ');

    if(mysqli_affected_rows($db) == 1) {
        echo 1;
    }
    else {
        echo 0;
    }
?>