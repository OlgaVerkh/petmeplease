var $form = $('.editProfile');

$form.on('submit', function(e) {
    e.preventDefault();
//Вводим переменные (каждый инпут)
    
    var check = true;
    
    var formData = {
        user_name: document.forms[0].user_name.value,
        user_lastname: document.forms[0].user_lastname.value,
        user_tel: document.forms[0].user_tel.value,
        files: document.forms[0].file_upload.files
    }
    
//Проверки
for(var prop in formData) {
    
    switch(prop) {
        case 'user_name':
            if(!checkUserName(formData.user_name)) {
                var msg = 'Поле "имя" должно быть заполнено и содержать только буквы';
                check = false;
                flashMessage(msg);
                break;
            }
            break;
        case 'user_lastname': 
            if(!checkUserLastname(formData.user_lastname)) {
                var msg = 'Поле "фамилия" должно быть заполнено и содержать только буквы';
                check = false;
                flashMessage(msg);
                break;
            }
            break;
        case 'user_tel': 
            if(!checkUserTel(formData.user_tel)) {
                var msg = 'В поле "телефон" допустимы только цифры, пробел и символ "+"';
                check = false;
                flashMessage(msg);
                break;
            }
            break;
        case 'files':
            if(formData.files.length == 0) {
                check = true;
                break;
            } else {
               if(!validFileType(formData.files)) {
                var msg = 'Допустимые форматы фото jpg, jpeg и png';
                check = false;
                flashMessage(msg);
                break;
            } else if(!validFileSize(formData.files)) {
                var msg = 'Максимальный размер фото 5МБ';
                check = false;
                flashMessage(msg);
                break;
            } 
            }
             
            break;
       }  
    }
    
var formData = new FormData(document.forms[0]);


//Формируем ajax запрос с данными
    $.ajax({
        url: '../editProfile.php',
        method: 'post',
        cache: false,
        processData: false,
        contentType: false,
        data: formData,
        success: function(data, status) {
            console.log(data);
			
			if(data.indexOf("Connection to DB failed") !== -1) {
                var msg = 'Ошибка соединения с базой данных, повторите попытку позже';
                flashMessage(msg);
			} else if(data.indexOf("IncorrectName") !== -1) {
                var msg = 'Поле "имя" должно быть заполнено и содержать только буквы';
                flashMessage(msg);
            } else if(data.indexOf("IncorrectLastname") !== -1) {
                var msg = 'Поле "фамилия" должно быть заполнено и содержать только буквы';
                flashMessage(msg);
            } else if(data.indexOf("IncorrectTel") !== -1) {
                var msg = 'В поле "телефон" допустимы только цифры, пробел и символ "+"';
                flashMessage(msg);
            } else {
                var msg = 'Изменения успешно внесены в базу данных';
                flashMessage(msg);
            } 
        },
        error: function(err) {
            console.log(err);
        }
    });
    
});

//Функции проверки
//Проверка имени
function checkUserName(userName) {
    var pattern = /[а-яa-z]+/i;
    return pattern.test(userName);
}
//Проверка фамилии
function checkUserLastname(lastName) {
    var pattern = /[а-яa-z]+/i;
    return pattern.test(lastName);
}
//Проверка телефона
function checkUserTel(tel) {
    var pattern = /[\d\+\s-]{6,16}/i;
    return pattern.test(tel);
}
//Проверка загружаемых файлов

var fileTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png'
]

 function validFileType(arr) {
    for(var i = 0; i < arr.length; i++) {
        for(var k = 0; k < fileTypes.length; k++) {
            if(arr[i].type === fileTypes[k]) {
                return true;
            } else {
                return false;
            }
        }
    }
 }

function validFileSize(arr) {
    for(var i = 0; i < arr.length; i++) {
        if(arr[i].size < 5242880) {
            return true;
        } else {
            return false;
        }
    }
}

//Вслывающее сообщение
function flashMessage(msg) {
    $('#flashMessageProfile').addClass('active').text(msg);
    setTimeout( () => $('#flashMessageProfile').removeClass('active').text('') ,7000);
}

