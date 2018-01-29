<?php
session_start();
include 'global.php';
include 'config/db.ini';
function getConnect() {
	$db = mysqli_connect(HOST, USER, PASS, BASE);
	mysqli_set_charset($db, 'utf8');
	return $db;
}

function view($page, $data = []) {
	extract($data);

	if (preg_match('/([.a-z_\/0-9]*)\.?\w*/i', $page, $result)) {
		if(file_exists($result[1] . '.html')) {
			include './' . $result[1] . '.html';
		}
	}
}

function generator($size = 32) {
	$alphabet = '0123456789abcdefghijklmnopqrstuvwxyz';
	$code     = '';

	for ($i = 0; $i < $size; $i++) {
		$num  = rand(0, strlen($alphabet) - 1);
		$code.= $alphabet[$num];
	}

	return $code;
}

function checkUser() {
    
//	$session = isset($_COOKIE['PHPSESSID']) ? $_COOKIE['PHPSESSID'] : session_regenerate_id();
	$token   = isset($_COOKIE['_ab']) ? $_COOKIE['_ab'] : false;


    if(!$token) {
        return false;

    }

	else {
        $db  = mysqli_connect(HOST, USER, PASS, BASE);

        if (mysqli_connect_errno()) {
			return false;
		}

		else {
			mysqli_set_charset($db, 'UTF8');
			$query = mysqli_query($db, '
				SELECT
					user.user_id             AS id,
					user_email               AS email,
					IF(NOW() > expire, 1, 0) AS rebuild
				FROM user
				LEFT JOIN connect USING(user_id)
				WHERE   token   = "' . mysqli_real_escape_string($db, $token)   . '";
			');
            
			$user = mysqli_fetch_assoc($query);

			if ($user AND $user['rebuild'] == 0) {
				$expire  = time() + 300;
				$session = $_COOKIE['PHPSESSID'];
				$token   = generator();
				mysqli_query($db, '
					UPDATE connect SET
						token   = "' . $token . '",
						expire  = "FROM_UNIXTIME(' . $expire . ')"
					WHERE session = "' . $session . '";
				');
				setcookie('_ab', $token, time() + 60 * 60 * 24, '/');
			}
	        return $user;
	    }
	}
}

function getUserId() {

	if(isset($_COOKIE['_ab'])) {
		$token = $_COOKIE['_ab'];
	} else {
		return false;
	}

    $db = getConnect();

    $user = mysqli_query($db, '
        SELECT user_id
        FROM connect
        WHERE token = "' . $token . '";
    ');

    $user_id = mysqli_fetch_assoc($user);

    return (int)$user_id['user_id'];
}

//Проверяем профиль пользователя на заполненость
function checkUserProfile($user_id) {
    $check = true;
    $db = getConnect();

    $user_profile = mysqli_query($db, '
        SELECT user_name AS name,
        user_lastname AS lastname,
        user_tel AS tel
        FROM user
        WHERE user_id = '.$user_id.'');

    $user_profile = mysqli_fetch_assoc($user_profile);
    foreach($user_profile as $value) {
        $check = isset($value);
    }

    return $check;
}

?>
