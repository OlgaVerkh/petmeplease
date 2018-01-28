<?php
include_once 'function.php';

if(checkUser()) {
    $title = 'Редактирование объявления';
	$meta = ['charset' => 'utf-8'];
	$css = ['owl.carousel.css', 'account.css'];
	$js = ['owl.carousel.js', 'script.js', 'editAd.js', 'deleteAd.js'];
} else {
    header('Location: /enter');
}


?>