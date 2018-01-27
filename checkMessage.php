<?php
include_once 'function.php';
$db = getConnect();
$user_id = getUserId();
$res = array("status" => true, "errorText" => "");

$messages = mysqli_query($db, '
    SELECT message_receiver_id AS receiver_id,
    message_status AS status
    FROM message
    WHERE message_receiver_id = "' . $user_id . '"
    AND message_status = 0;
');

//    SELECT ad.ad_user_id AS user_id,
//    message.message_status AS status
//    FROM ad
//    JOIN message ON ad.ad_id = message.message_idAd 
//    AND message.message_status = 0
//    WHERE ad.ad_user_id = "' . $user_id . '";

$messages = mysqli_fetch_all($messages, MYSQLI_ASSOC);

if(count($messages) > 0) {
    $res["status"] = true;
    $res["errorText"] = "There is a new message for user";
    echo json_encode($res);
    exit();
} else {
    $res["status"] = false;
    echo json_encode($res);
    exit();
}


?>

    







