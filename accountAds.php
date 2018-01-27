<?php
include_once 'function.php';

if(checkUser()) {
    $title = 'Мои объявления';
    $meta = ['charset' => 'utf-8'];
    $css = ['style.css'];
    $js = ['script.js'];
} else {
    header('Location: /enter/enter');
}

?>