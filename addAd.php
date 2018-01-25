<?php

include_once 'function.php';
$db = getConnect();
$res = array("status" => true, "errorText" => "");

if (isset($_POST['adTitle']) AND isset($_POST['section']) AND isset($_POST['city']) AND isset($_POST['kind']) AND isset($_POST['breed']) AND isset($_POST['animalAge']) AND isset($_POST['sex']) AND isset($_POST['comment'])) {
    
    $adTitle =   htmlspecialchars($_POST['adTitle']);
    $adSection = (int)$_POST['section'];
    $adCity =    (int)$_POST['city'];
    $animalKind = (int)$_POST['kind'];
    $animalBreed = (int)$_POST['breed'];
    $animalAge = htmlspecialchars($_POST['animalAge']);
    $animalSex = (int)$_POST['sex'];
    $animalPrice = htmlspecialchars($_POST['animalPrice']);
    $comment =   htmlspecialchars($_POST['comment']);
    $user_id = getUserId();
    $photos = $_FILES['file_upload'];
//    echo json_encode($photos);
//    exit();
    
//Проверка введенных данных
    if(adTitleCheck($adTitle) AND animalAgeCheck($animalAge) AND commentCheck($comment)) {
     
//В случае ошибки соединения с БД отправляем JSON с текстом ошибки
        if (mysqli_connect_errno()) {
            $res["status"] = false;
            $res["errorText"] = "Connection to DB failed";
            echo json_encode($res);
            exit();
        }
        else {	
        mysqli_query($db, '
		INSERT INTO ad SET
        ad_title = "' . mysqli_real_escape_string($db, $adTitle) . '",
        ad_text = "' . mysqli_real_escape_string($db, $comment) . '",
        ad_animal_age = "' . $animalAge . '",
        ad_animal_sex = "' . $animalSex . '",
        ad_animal_price = "' .$animalPrice  . '",
        ad_animal_kind_id = "' . $animalKind . '",
        ad_animal_breed_id = "' . $animalBreed . '",
        ad_user_id = "' . $user_id . '",
        ad_section_id = "' . $adSection . '",
        ad_city_id = "' . $adCity . '";
		');

//Получаем id объявления
        $ad_id = mysqli_insert_id($db);   

//Создаем папку для хранения файлов
!is_dir("upload/$user_id") ? mkdir("upload/$user_id") : false;
!is_dir("upload/$user_id/$ad_id") ? mkdir("upload/$user_id/$ad_id") : false;

//Перебираем файлы, сохраняем их в папку, делаем запись в таблицу photo в БД          
        for($i = 0; $i < count($photos['name']); $i++) {
            $fileName = $photos['name'][$i];
            $file_tmp = $photos['tmp_name'][$i];
            move_uploaded_file($file_tmp, "upload/$user_id/$ad_id/$fileName");
            echo "ok";
        
        $photo_link = "upload/$user_id/$ad_id/$fileName";
        
        mysqli_query($db, '
        INSERT INTO photo SET
        photo_link = "' . $photo_link . '",
        photo_ad_id = "' . $ad_id . '"
        ');
    }
		$res['status'] = true;
		$res['errorText'] = "ad added";
		echo json_encode($res);
    }    
}
}

//Проверки

//Проверка заголовка
   function adTitleCheck($adTitle) {
       $adTitlePattern = "/[а-яa-z0-9]{6,255}/i";
       if(preg_match($adTitlePattern, $adTitle) !== 1 ) {
           $res["status"] = false;
           $res["errorText"] = "IncorrectTitle";
           echo json_encode($res);
           exit();
       }
        else {
           return true;
        }
    }

//Проверка возраста животного
    function animalAgeCheck($animalAge) {
        $animalAgePattern = "/[а-яa-z0-9]{1,10}/i";
        if (preg_match($animalAgePattern, $animalAge) !== 1) {
            $res["status"] = false;
            $res["errorText"] = "IncorrectAnimalAge";
            echo json_encode($res);
           exit();
        }
        else {
            return true;
        }
    }

//Проверка текста объявления
    function commentCheck($comment) {
        $commentPattern = "/[\wа-я]+/i";
        if (preg_match($commentPattern, $comment) !== 1) {
            $res["status"] = false;
            $res["errorText"] = "IncorrectComment";
            echo json_encode($res);
            exit();
        }
        else {
            return true;
        }
    }	
?>
