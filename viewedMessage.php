<?php 
include_once 'function.php';
$db = getConnect();
$user_id = getUserId();
$res = array("status" => true, "errorText" => "");

$data = json_decode(file_get_contents('php://input'), true);
$message_id = (int)$data;


//В случае ошибки соединения с БД отправляем JSON с текстом ошибки
if(mysqli_connect_errno()) {
    $res["status"] = false;
    $res["errorText"] = "Connection to DB failed";
    echo json_encode($res);
    exit();
} else {
    mysqli_query($db, '
    UPDATE message SET
    message_status = 1
    WHERE message_id = "' . $message_id . '";
');
    $res['status'] = true;
    $res['errorText'] = "Status changed";
    echo json_encode($res);
}

