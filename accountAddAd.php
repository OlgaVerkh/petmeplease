<?php
include_once "function.php";

if(checkUser()) {
    $title = 'Добавление объявления';
	$meta = ['charset' => 'utf-8'];
	$css = ['style.css'];
	$js = ['script.js', 'ads.js'];
} else {
    header('Location: /enter');
}



?>