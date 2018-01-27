<?php
include_once 'function.php';

if(checkUser()) {
    $title = 'Мои сообщения';
    $meta = ['charset' => 'utf-8'];
    $css = ['animate.css', 'style.css'];
    $js = ['scrollMessages.js', 'script.js', 'responseMessage.js', 'viewedMessage.js'];
} else {
    header('Location: /enter');
}

?>