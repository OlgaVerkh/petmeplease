<?php
    include_once "function.php";
    $db = getConnect();
    $user_id = getUserId();

    $startFrom = $_POST['startFrom'];

    $userMessages = mysqli_query($db, '
    SELECT message.*, ad.ad_id, ad.ad_title, user.user_name, user.user_lastname, user.user_avatar
    FROM message
    LEFT JOIN ad ON message.message_idAd = ad.ad_id
    LEFT JOIN user ON message.message_idUser = user.user_id
    WHERE message.message_receiver_id = "' . $user_id . '"
    ORDER BY message_status
    LIMIT '.$startFrom.', 1;
    ');

    $userMessages = mysqli_fetch_all($userMessages, MYSQLI_ASSOC);
    echo json_encode($userMessages, JSON_UNESCAPED_UNICODE);


?>