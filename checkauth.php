<?php

    include_once 'function.php';
    $user = checkUser();

    if($user) {
        echo json_encode(array('status' => true, 'userType' => 'user'));
    } 
    else {
        echo json_encode(array('status' => false));  
    }

?>