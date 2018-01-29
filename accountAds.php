<?php
include_once 'function.php';

if(checkUser()) {
    $title = 'Мои объявления';
    $meta = ['charset' => 'utf-8'];
    $css = ['account.css'];
    $js = ['script.js', 'editAd.js', 'deleteAd.js'];
} else {
    header('Location: /enter');
}

?>