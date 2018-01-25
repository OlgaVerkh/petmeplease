$(".edit").on('click', function(e) {
    $(".edit-form").addClass('visible');
});

$(".close").on('click', function(e) {
    $(".edit-form").removeClass('visible');
});


//Удаление фотографий
$('.edit-form-content-photos a').each( function() {
    $(this).on('click', function(e) {
        e.preventDefault();
        var photoId = $(this).data('photoid');
        $elem = $(this);
        $largeImmSrc = '../' + $elem.parent().children('img').attr('src');
        
        $.ajax({
            method: 'GET',
            url: '../deletephoto.php?photo_id=' +photoId,
            success: function(data, status) {
                $elem.parent().remove();
                $('.single-ad-edit img[src="'+$largeImmSrc+'"]').remove();
                console.log(data);
            },
            error: function( err) {
                console.log(err);
            }
        });
        
    });
});



$form = $('.addAdForm');

$form.on('submit', function(e) {
    e.preventDefault();
    
    var check = true;
    
    var formData = {
        title: document.forms[0].adTitle.value,
        age: document.forms[0].animalAge.value,
        price: document.forms[0].animalPrice.value,
        comment: document.forms[0].comment.value,
        files: document.forms[0].file_upload.files
    }
    
    
//Проверки
checks:
for(var prop in formData) {
 
    switch(prop) {
        case 'title':
            if(!checkTitle(formData.title)) {
                var msg = 'Поле "заголовок" должно быть заполнено и содержать от 6 до 255 символов. Допустимы буквы и цифры';
                check = false;
                flashMessage(msg);
                break;
            }
            break;
        case 'age': 
            if(!checkAge(formData.age)) {
                var msg = 'Поле "возраст" должно быть заполнено и содержать от 1 до 10 символов. Допустимы цифры и буквы';
                check = false;
                flashMessage(msg);
               break;
            }
            break;
        case 'price': 
            if(!checkPrice(formData.price)) {
                var msg = 'В поле "цена" допустимо до 10 символов. Допустимы только цифры';
                check = false;
                flashMessage(msg);
                break;
            }
            break;
        case 'comment': 
            if(!checkComment(formData.comment)) {
                var msg = 'В поле "текст объявления" допустимы цифры, буквы и знаки препинания';
                check = false;
                flashMessage(msg);
                break;
            }
            break;
        case 'files':
            if(formData.files.length == 0) {
                check = true;
                break;
            } else if(formData.files.length !== 0) {
                if(!validFileType(formData.files)) {
                var msg = 'Допустимые форматы фото jpg, jpeg и png';
                check = false;
                flashMessage(msg);
                break;
            } else if(!validFileSize(formData.files)) {
                var msg = 'Максимальный размер фото 2МБ';
                check = false;
                flashMessage(msg);
                break;
            } else if(!validFileNum(formData.files)) {
                var msg = 'Допустимо максимум 5 фото';
                check = false;
                flashMessage(msg);
                break;
            }
            } break;
       }  
    }

    
    var formData = new FormData(document.forms[0]);
    formData.append("ad_id", window.location.search.slice(7));
   

//Формируем ajax запрос с данными
    $.ajax({
        url: '../editAd.php',
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
            } else if(data.indexOf("IncorrectTitle") !== -1) {
                var msg = 'Поле "заголовок" должно быть заполнено и состоять из 6-255 символов (буквы, цифры)';
                flashMessage(msg);
            } else if(data.indexOf("IncorrectAnimalAge") !== -1) {
                var msg = 'Поле "возраст" должно быть заполнено и состоять из 1-15 символов (буквы, цифры)';
                flashMessage(msg);
            } else if(data.indexOf("IncorrectComment") !== -1) {
                var msg = 'Поле "текст объявления" должно быть заполнено и состоять из букв, цифр и знаков препинания';
                flashMessage(msg);
            } 
        },
        error: function(err) {
            console.log(err);
        }
    });
    
});

//Функции проверки
//Проверка заголовка
function checkTitle(title) {
    var pattern = /[а-яa-z0-9\s]{6,255}/i;
    return pattern.test(title);
}
//Проверка возраста животного
function checkAge(age) {
    var pattern = /[а-яa-z0-9\s]{1,10}/i;
    return pattern.test(age);
}
//Проверка цены
function checkPrice(price) {
    var pattern = /[0-9\s]{0,15}/;
    return pattern.test(price);
}
//Проверка текста объявления
function checkComment(comment) {
    var pattern = /[\wа-я]+/i;
    return pattern.test(comment);
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
        if(arr[i].size < 2097152) {
            return true;
        } else {
            return false;
        }
    }
}

function validFileNum(arr) {
    if(arr.length <= 5) {
        return true;
    } else {
        return false;
    }
}

//Вслывающее сообщение
function flashMessage(msg) {
    $('#flashMessageAd').addClass('active').text(msg);
    setTimeout( () => $('#flashMessageAd').removeClass('active').text('') ,7000);
}