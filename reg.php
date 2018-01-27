<?php

include_once 'function.php';
$db = getConnect();
$res = array("status" => true, "errorText" => "");

if (isset($_POST['email']) AND isset($_POST['pass']) AND isset($_POST['pass_check'])) {
    $email =      htmlspecialchars($_POST['email']);
    $pass =       htmlspecialchars($_POST['pass']);
    $passRepeat = htmlspecialchars($_POST['pass_check']);
    
//Проверка Email
    if(emailCheck($email)) {
    // В случае ошибки соединения с БД отправляем JSON с текстом ошибки
        if (mysqli_connect_errno()) {
            $res["status"] = false;
            $res["errorText"] = "Connection to DB failed";
            echo json_encode($res);
            exit();
        }
        else {
        // Проверяем, есть ли пользователь с таким Email в БД
            $check = mysqli_query($db, '
            SELECT * FROM user
            WHERE user_email = "' . $email . '";
            ');
            
        // Если есть, то вернем ошибку
            if(mysqli_num_rows($check)) {
                $res["status"] = false;
                $res["errorText"] = "This email already exists in DB";;
                echo json_encode($res);
                exit();
            }
            else {
                
// Проверка пароля
	if(passwordCheck($pass, $passRepeat)) {
		$pass = password_hash($pass, PASSWORD_BCRYPT);
		$email = mysqli_real_escape_string($db, $email);
		mysqli_query($db, '
			INSERT INTO user SET
            user_email = "' . $email . '",
            user_pass  = "' . $pass  . '";
		');
		
		$id      = mysqli_insert_id($db);
		$expire  = time() + 1000 * 60 * 60 * 24;
		$session = $_COOKIE['PHPSESSID'];
		$token   = generator();
		
		mysqli_query($db, '
			INSERT INTO connect SET
			session = "' . $session . '",
			token   = "' . $token   . '",
			user_id = "' . $id      . '",
			expire  = "FROM_UNIXTIME(' . $expire . ')";
		');

	setcookie('_ab', $token, time() + 60 * 60 * 24, '/');
	echo json_encode($res);
				}
            }
        }
    }
}
    
//Проверки

    //Проверка email
    function emailCheck($email) {
        $emailPattern = '/^(?!(?:(?:\\x22?\\x5C[\\x00-\\x7E]\\x22?)|(?:\\x22?[^\\x5C\\x22]\\x22?)){255,})(?!(?:(?:\\x22?\\x5C[\\x00-\\x7E]\\x22?)|(?:\\x22?[^\\x5C\\x22]\\x22?)){65,}@)(?:(?:[\\x21\\x23-\\x27\\x2A\\x2B\\x2D\\x2F-\\x39\\x3D\\x3F\\x5E-\\x7E]+)|(?:\\x22(?:[\\x01-\\x08\\x0B\\x0C\\x0E-\\x1F\\x21\\x23-\\x5B\\x5D-\\x7F]|(?:\\x5C[\\x00-\\x7F]))*\\x22))(?:\\.(?:(?:[\\x21\\x23-\\x27\\x2A\\x2B\\x2D\\x2F-\\x39\\x3D\\x3F\\x5E-\\x7E]+)|(?:\\x22(?:[\\x01-\\x08\\x0B\\x0C\\x0E-\\x1F\\x21\\x23-\\x5B\\x5D-\\x7F]|(?:\\x5C[\\x00-\\x7F]))*\\x22)))*@(?:(?:(?!.*[^.]{64,})(?:(?:(?:xn--)?[a-z0-9]+(?:-+[a-z0-9]+)*\\.){1,126}){1,}(?:(?:[a-z][a-z0-9]*)|(?:(?:xn--)[a-z0-9]+))(?:-+[a-z0-9]+)*)|(?:\\[(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){7})|(?:(?!(?:.*[a-f0-9][:\\]]){7,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?)))|(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){5}:)|(?:(?!(?:.*[a-f0-9]:){5,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3}:)?)))?(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))(?:\\.(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))){3}))\\]))$/iD';
        if(preg_match($emailPattern, $email) !== 1 ) {
            $res["status"] = false;
            $res["errorText"] = "IncorrectEmail";
            echo json_encode($res);
            exit();
        }
        else {
            return true;
        }
    }

    //Проверка пароля
    function passwordCheck($pass, $passRepeat) {
        $passPattern = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,30}/";
        if (strcmp($pass, $passRepeat) !== 0) {
            $res["status"] = false;
            $res["errorText"] = "Passwords aren't equal";
            echo json_encode($res);
            exit();
        }
        elseif(preg_match($passPattern, $pass) !== 1) {
            $res["status"] = false;
            $res["errorText"] = "IncorrectPassword";
            echo json_encode($res);
            exit();
        }
        else {
            return true;
        }
    }   
?>	

