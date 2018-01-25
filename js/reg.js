var $form = $('.registrationForm');

$form.on('submit', function(e) {
    e.preventDefault();
    var inputs = $(this).children('input[type="text"], input[type="password"]');
	
    
//Вводим переменные (каждый инпут)
    var $email = inputs.eq(0).val();
    var $password = inputs.eq(1).val();
    var $passwordCheck = inputs.eq(2).val();
    
//Проверяем первый инпут (email) на пустоту и корректность введенных данных

    if($email == '') {
        var msg = 'Заполните поле email';
        flashMessage(msg);
    } else {
        var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(pattern.test($email)) {
            console.log('ok');
        } else {
        var msg = 'Введен некорректный email';
        flashMessage(msg);
        }
    }
    
//Проверяем введены ли пароли и совпадают ли они
    if($password == '' || $passwordCheck == '') {
        var msg = 'Заполните поля "пароль" и "повторить пароль"';
        flashMessage(msg);
    } else if($password !== $passwordCheck) {
        var msg = 'Пароли не совпадают';
        flashMessage(msg);
    } else {
        var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,30}/;
        if(pattern.test($password)) {
            console.log('ok');
        } else {
        var msg = 'Пароль должен быть от 6 до 30 символов, обязательно должен содержать по одной заглавной и малой букве и цифру. Допустимы буквы латинского алфавита, цифры и спецсимволы «-», «_», «+», «#», «$», «@».';
        flashMessage(msg);
        }
    }
    
//Собираем данные
    var formData = new FormData();
    
    formData.append('email', $email);
    formData.append('pass', $password);
    formData.append('pass_check', $passwordCheck);
    
//Формируем ajax запрос с данными
    $.ajax({
        url: '../reg.php',
        method: 'post',
        cache: false,
        processData: false,
        contentType: false,
        data: formData,
        success: function(data, status) {
            console.log(data);
            
            if(data.indexOf("IncorrectEmail") !== -1) {
                var msg = 'Неверно введен email';
                flashMessage(msg);
            } else if(data.indexOf("Passwords aren't equal") !== -1) {
                var msg = 'Пароли не совпадают, попробуйте ввести еще раз';
                flashMessage(msg);
            } else if(data.indexOf("IncorrectPassword") !== -1) {
                var msg = 'Пароль должен быть от 6 до 30 символов, обязательно должен содержать по одной заглавной и малой букве и цифру. Допустимы буквы латинского алфавита, цифры и спецсимволы «-», «_», «+», «#», «$», «@».';
                flashMessage(msg);
            } else if(data.indexOf("Connection to DB failed") !== -1) {
                var msg = 'Ошибка соединения с базой данных, попробуйте зарегистрироваться позже';
                flashMessage(msg);
            } else if(data.indexOf("This email already exists in DB") !== -1) {
                var msg = 'Данный email уже используется, введите другой email';
                flashMessage(msg);
            } else {
				window.location.pathname = '/accountProfile';
			}
        },
        error: function(err) {
            console.log(err);
        }
    });
    
});

//Всплывающее сообщение
function flashMessage(msg) {
    $('#flashMessageAd').addClass('active').text(msg);
    setTimeout( () => $('#flashMessageAd').removeClass('active').text('') ,7000);
}
