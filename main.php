<?php
$arr = (pathinfo($_SERVER['REDIRECT_URL']));
//print_r($arr);
$url = $arr['basename'];
if($url == '') {
    $url = 'index';
}
$url.='.php';
$title = '';
$meta = [];
$css = [];
$js = [];
$name = '';

include_once 'function.php';
include_once $url;

//Отображение основных страниц
//Проверяем, авторизован ли пользователь
$user = checkUser();

//Проверяем, содержится ли в урл ссылка на личный кабнет
$pattern = "/account/";
preg_match($pattern, $url, $matches);
if($user) {
	//Построение страницы личного кабинета обычного пользователя
	if(count($matches) > 0) {
		view('templates/main/head', [
    		'title' => $title,
    		'meta' => $meta,
    		'css' => $css,
 		]);
    	view('templates/account/main/nav');
		view('templates/account/main/header');
    	view('templates/account/' .substr($url, 0, strrpos($url, '.')));
    	view('templates/main/footer');
    	view('templates/main/scriptside', [
			'js' => $js
 		]); 
	} 
	//Построение всех страниц со ссылкой на ЛК в хэдере
	else {
		view('templates/main/head', [
    		'title' => $title,
    		'meta' => $meta,
    		'css' => $css,
 	]);
    	view('templates/main/header');
    	view('templates/auth/nav_user');
    	view('templates/' .substr($url, 0, strrpos($url, '.')));
    	view('templates/main/footer');
    	view('templates/main/scriptside', [
			'js' => $js
	]);
	}

	//Построение остальных страниц для неавторизованного пользователя
	} else {
    	view('templates/main/head', [
    		'title' => $title,
    		'meta' => $meta,
    		'css' => $css,
 		]);
    	view('templates/main/header');
    	view('templates/main/nav');
		view('templates/' .substr($url, 0, strrpos($url, '.')));
    	view('templates/main/footer');
    	view('templates/main/scriptside', [
			'js' => $js
		]);
	}
//$and = '';
//if(isset($_GET['city']) AND (int)$_GET['city'] > 0) {
//	$and.= " AND city_id =" . (int)$_GET['city'];
//}
?>