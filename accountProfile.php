<?php
include_once 'function.php';

if(checkUser()) {
	$title = 'Мой профиль';
    $meta = ['charset' => 'utf-8'];
    $css = ['account.css'];
    $js = ['script.js', 'profile.js'];
} 
else {
    header('Location: /enter');
}



?>