<?php
include_once 'function.php';

if(checkUser()) {
    $title = 'Редактирование объявления';
	$meta = ['charset' => 'utf-8'];
	$css = ['style.css'];
	$js = ['script.js', 'editAd.js', 'deleteAd.js', 'owl.carousel.js'];
} else {
    header('Location: /enter');
}


?>