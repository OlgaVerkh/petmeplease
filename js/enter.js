var $form = $('.enterForm');

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
                var msg = 'Ошибка соединения с базой данных, попробуйте войти позже';
                flashMessage(msg);
            } else if(data.indexOf("Password and email do not match") !== -1) {
                var msg = 'email и пароль не совпадают, попробуйте ввести данные еще раз';
                flashMessage(msg);
            } else if(data.indexOf("Email does not exist in DB") !== -1) {
                var msg = 'Такой email не зарегистрирован в системе, сначала зарегистрируйтесь';
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
    $('#flashMessage').addClass('active').text(msg);
    setTimeout( () => $('#flashMessage').removeClass('active').text('') ,7000);
}
