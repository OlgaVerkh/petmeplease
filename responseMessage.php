<?php 
include_once 'function.php';
$db = getConnect();
$user_id = getUserId();
$res = array("status" => true, "errorText" => "");

$data = json_decode(file_get_contents('php://input'), true);

$message_receiver_id = $data['receiver'];
$message_author_id = $data['author'];
$message_text = $data['messagetext'];

//В случае ошибки соединения с БД отправляем JSON с текстом ошибки
if(mysqli_connect_errno()) {
    $res["status"] = false;
    $res["errorText"] = "Connection to DB failed";
    echo json_encode($res);
    exit();
} else {
    mysqli_query($db, '
    INSERT INTO message SET
    message_text = "' . $message_text . '",
    message_idUser = "' . $user_id . '",
    message_receiver_id = "' . $message_receiver_id . '",
    message_status = 0;
');
    $res['status'] = true;
    $res['errorText'] = "Message sent";
    echo json_encode($res);
}







?>