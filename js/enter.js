var $form = $('.enterForm');
var message = document.getElementById('flashMessage');

$form.on('submit', function(e) {
    e.preventDefault();
    var inputs = $(this).children('input[type="text"], input[type="password"]');
    
//Вводим переменные (каждый инпут)    
    var email = inputs.eq(0).val();
    var password = inputs.eq(1).val();
    
//Собираем данные    
    var formData = new FormData();
    formData.append('email', email);
    formData.append('pass', password);
    
//Формируем ajax запрос с данными
    $.ajax({
        url: '../login.php',
        method: 'post',
        cache: false,
        processData: false,
        contentType: false,
        data: formData,
        success: function(data, status) {
            console.log(data);
            
            if(data.indexOf("Connection to DB failed") !== -1) {
                message.classList.add('active');
                message.innerHTML = 'Ошибка соединения с базой данных, попробуйте войти позже';
                setTimeout( () => message.remove() ,5000);
            } else if(data.indexOf("Password and email do not match") !== -1) {
                message.classList.add('active');
                message.innerHTML = 'email и пароль не совпадают, попробуйте ввести данные еще раз';
                setTimeout( () => message.remove() ,5000);
            } else if(data.indexOf("Email does not exist in DB") !== -1) {
                message.classList.add('active');
                message.innerHTML = 'Такой email не зарегистрирован в системе, сначала зарегистрируйтесь';
                setTimeout( () => message.remove() ,5000);
            } else {
					window.location.pathname = '/accountProfile';
				}          
            },
        error: function(err) {
            console.log(err);
        }
    });
    
});