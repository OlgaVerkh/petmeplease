<?php
include_once 'function.php';

$session = isset($_COOKIE['PHPSESSID']) ? $_COOKIE['PHPSESSID'] : '';
$token   = isset($_COOKIE['_ab']) ? $_COOKIE['_ab'] : '';
$db = getConnect();

	if (mysqli_connect_errno()) {
		return false;
	} else {
		mysqli_query($db, '
			DELETE FROM connect
			WHERE session = "' . $session . '"
			AND   token   = "' . $token   . '"
			LIMIT 1;
		');
		
		setcookie('PHPSESSID', '', time(), '/');
		setcookie('_ab', '', time(), '/');
	}

	header('Location: index');
?>