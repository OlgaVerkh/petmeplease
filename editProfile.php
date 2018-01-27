<?php

include_once 'function.php';
$db = getConnect();
$user_id = getUserId();
$res = array("status" => true, "errorText" => "");


if (isset($_POST['user_name']) AND isset($_POST['user_lastname']) AND isset($_POST['user_tel']))    {
    
    
    $userName =   htmlspecialchars($_POST['user_name']);
    $userLastname = htmlspecialchars($_POST['user_lastname']);
    $userTel =    htmlspecialchars($_POST['user_tel']);
    $photo = $_FILES['file_upload'];
    	
	
//Проверка введенных данных
    if(nameCheck($userName) AND lastNameCheck($userLastname) AND telCheck($userTel)) {
     
//В случае ошибки соединения с БД отправляем JSON с текстом ошибки
	if (mysqli_connect_errno()) {
		$res["status"] = false;
		$res["errorText"] = "Connection to DB failed";
		echo json_encode($res);
		exit();
	} else {
        mysqli_query($db, '
		UPDATE user SET
        user_name = "' . mysqli_real_escape_string($db, $userName) . '",
        user_lastname = "' . mysqli_real_escape_string($db, $userLastname) . '",
        user_tel = "' . mysqli_real_escape_string($db, $userTel) . '"
        WHERE user_id = "' . $user_id . '";
		');

//Создаем папку для хранения фото
!is_dir("upload/$user_id") ? mkdir("upload/$user_id") : false;
            
//Сохраняем фото в папку, делаем запись в БД 

if($photo['size'] !== 0) {
        $fileName = $photo['name'];
        $file_tmp = $photo['tmp_name'];
        move_uploaded_file($file_tmp, "upload/$user_id/$fileName");
        echo "ok";
        
        $avatar_link = "upload/$user_id/$fileName";
        
        mysqli_query($db, '
        UPDATE user SET
        user_avatar = "' . $avatar_link . '"
        WHERE user_id = "' . $user_id . '"
        ');
          	}
//		$res['status'] = true;
//		$res['errorText'] = 'ok';
//		echo json_encode($res);
        }
    }    
}

//Проверки

//Проверка имени
   function nameCheck($userName) {
       $userNamePattern = "/[а-яa-z]+/i";
       if(preg_match($userNamePattern, $userName) !== 1 ) {
           $res["status"] = false;
           $res["errorText"] = "IncorrectName";
           echo json_encode($res);
           exit();
       }
        else {
           return true;
        }
    }

//Проверка фамилии
    function lastNameCheck($userLastname) {
        $userLastnamePattern = "/[а-яa-z]+/i";
        if (preg_match($userLastnamePattern, $userLastname) !== 1) {
            $res["status"] = false;
            $res["errorText"] = "IncorrectLastname";
            echo json_encode($res);
           exit();
        }
        else {
            return true;
        }
    }

//Проверка телефона
    function telCheck($userTel) {
        $userTelPattern = "/[\d\+\s-]{6,16}/";
        if (preg_match($userTelPattern, $userTel) !== 1) {
            $res["status"] = false;
            $res["errorText"] = "IncorrectTel";
            echo json_encode($res);
            exit();
        }
        else {
            return true;
        }
    }

?>
