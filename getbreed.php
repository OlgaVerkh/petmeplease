<?php

    include_once 'function.php';

    $kind_id = (int)$_GET['kind'];

    $db = getConnect();
    
    $breed = mysqli_query($db, '
        SELECT * FROM breed
        WHERE breed_kind_id = " ' . $kind_id .' "
    ');

    $breed = mysqli_fetch_all($breed, MYSQLI_ASSOC);

    echo json_encode($breed);
    

?>