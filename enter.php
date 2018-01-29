<?php
include_once 'function.php';

	if(isset($_COOKIE['PHPSESSID']) AND isset($_COOKIE['_ab'])) {
//        echo 'We are here';
		header('Location: /accountProfile');
	}

	$title = 'Вход в личный кабинет';
	$meta = ['charset' => 'utf-8'];
	$css = ['style.css'];
	$js = ['script.js', 'enter.js'];
?>
