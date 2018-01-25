<?php
include_once 'function.php';

if(checkUser()) {
    $title = 'Мои сообщения';
    $meta = ['charset' => 'utf-8'];
    $css = ['style.css'];
    $js = ['script.js', 'responseMessage.js', 'viewedMessage.js'];
} else {
    header('Location: /enter');
}

?>