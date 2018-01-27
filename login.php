<?php
include_once 'enter.php';
include_once 'function.php';

if(isset($_POST["email"]) AND isset($_POST["pass"])) {
	$email = htmlspecialchars($_POST["email"]);
	$pass = htmlspecialchars($_POST["pass"]);
	$res = array("status" => true, "errorText" => "");
	$db = getConnect();
// В случае ошибки соединения с БД отправляем JSON с текстом ошибки
	if (mysqli_connect_errno()) {
		$res["status"] = false;
		$res["errorText"] = "Connection to DB failed";
		echo json_encode($res);
		exit();
	}
// Проверяем, существует ли в БД введенный email  
	else {
		$check = mysqli_query($db, '
			SELECT * FROM user
            WHERE user_email = "' .  $email .'";
        ');
			if(!mysqli_num_rows($check)) {
                $res["status"] = false;
                $res["errorText"] = "Email does not exist in DB";
                echo json_encode($res);
                exit();
            } else {
                $user = mysqli_fetch_assoc($check);
            }
//Проверяем, совпадают ли пароль и hash, если совпадают, добавляем данные в таблицу connect, направляем пользователя в личный кабинет (js)
			if(password_verify($pass, $user['user_pass'])) {
                $id      = $user['user_id'];
                $expire  = time() + 100 * 60 * 60 * 24;
                $session = isset($_COOKIE['PHPSESSID']) ? $_COOKIE['PHPSESSID'] : session_id();
                $token   = generator();
                mysqli_query($db, '
                    INSERT INTO connect SET
                    session = "' . $session . '",
                    token   = "' . $token   . '",
                    user_id = "' . $id      . '",
                    expire  = "FROM_UNIXTIME(' . $expire . ')";
                ');
                setcookie('_ab', $token, time() + 60 * 60 * 24, '/');
            } 
//Не совпадают - выводим сообщение
			else {
				$res["status"] = false;
				$res["errorText"] = "Password and email do not match";
				echo json_encode($res);
				exit();
      }
   }
};
 ?>