<?php
include_once 'function.php';

if(!empty($_COOKIE['PHPSESSID']) AND isset($_COOKIE['_ab'])) {
	header('Location: /accountProfile');
};

$title = 'Вход в личный кабинет';
$meta = ['charset' => 'utf-8'];
$css = ['style.css'];
$js = ['enter.js'];
?>