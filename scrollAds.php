<?php
    include_once "function.php";
    $db = getConnect();


    $startFrom = $_POST['startFrom'];


    $ads = mysqli_query($db, '
    SELECT ad.*,
    (SELECT photo_link
    FROM photo
    WHERE photo_ad_id = ad.ad_id
    LIMIT 1) as photo, city.city_name
    FROM ad
    LEFT JOIN city ON ad.ad_city_id = city.city_id
    ORDER BY ad_createDate DESC
    LIMIT '.$startFrom.', 1;
    ');

    $ads = mysqli_fetch_all($ads, MYSQLI_ASSOC);
    echo json_encode($ads, JSON_UNESCAPED_UNICODE);


?>