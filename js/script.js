//Плагин Карусель

$(document).ready(function(){
  $('.owl-carousel').owlCarousel({
	  	dots: true,
	  	pagination: true,
	  	items: 1,
	  	navText: ['', '']
  });
});




//Обрабатываем событие по клику на кнопку добавить объявление
$('.give-ad-btn').on('click', function(e) {
   $.ajax({
       method: 'GET',
       url: '../checkauth.php',
       success: function(data, status) {
           var data = JSON.parse(data);
           if(data['status'] && data['userType'] == 'user') {
               window.location.pathname="/accountAddAd/";
           } else {
               window.location.pathname="/enter/";
           }
       },
       error: function(err) {
            console.log(err);
   }
   });
});


//Сообщения - проверка новых

setInterval(function() {
    $.ajax({
        method: 'GET',
        url: '../checkMessage.php',
        success: function(data, status) {
//            data = JSON.parse(data);
            if(data['status'] == true) {
            $('#myMessages').addClass('newMessage');
            $('#myMessages').parent().addClass('colored');
            } else if(data['status'] == false) {
            $('#myMessages').removeClass('newMessage');
            $('#myMessages').parent().removeClass('colored');
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
}, 1000 * 20);

// Pagination on scroll
var inProgress = false;
var startFrom = 4;

window.addEventListener('scroll', function(e) {
    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
    var la = document.querySelector('.latest-ads');
    var laBounding = document.querySelector('.latest-ads').getBoundingClientRect();
    // console.log(scrolled + ' scrolled');
    // console.log(laBounding.height + laBounding.y - la.offsetTop  + ' laOffset');
    if(laBounding.height + laBounding.y - la.offsetTop <= 0) {
        $.ajax({
            method: 'POST',
            url: '../scroll.php',
            data: {"startFrom" : startFrom},
            beforeSend: function() {
            inProgress = true;
            }
            }).done(function(data) {
			data = JSON.parse(data);		
			console.log(data);
			for(var i = 0; i < data.length; i++) {
				$('.latest-ads').append("<div class='latest-ad'><div class='price'>" + data[i].ad_animal_price + "</div><div class='flex-container'><div class='latest-ad-img'><img src=" + data[i].photo + "alt=''></div><div class='flex-item'><h3><a href=''>" + data[i].ad_title + "</a></h3><span class='ad-date>" + data[i].ad_createDate + "</span><p class='ad-city'>" + data[i].city_name + "</p><p class='ad-text'>" + data[i].ad_text + "</p></div></div></div>")

			}			
			
		});
	};
	
});
	
//			
//            if (data.length > 0) {
//				 $.each(data, function(index, data){
//            $(".latest-ads").append("<p>" + data.ad_animal_price + "</p>");
//            });
//				
//            $.each(data, function(index, data){
//            $(".latest-ads").append("<div class='latest-ad'><div class='price'>" + data.ad_animal_price + "</div><div class='flex-container'><div class='latest-ad-img'><img src=" + data.photo + "alt=''></div><div class='flex-item'><h3><a href=''>" + data.ad_title + "</a></h3><span class='ad-date>" + data.ad_createDate + "</span><p class='ad-city'>" + data.city_name + "</p><p class='ad-text'>" + data.ad_text + "</p></div></div></div>");
//            });
//            inProgress = false;
//            startFrom += 10;
//            }});
//        }
//});





 // функция распознавания лиц
//    function faceDetectionJquery(options, callback) {
//        crImg.faceDetection({
//            complete: function (faces) {
//                if (faces === false) {
//                    return console.log('jquery.facedetection returned false');
//                }
//
//                options.boost = Array.prototype.slice.call(faces, 0).map(function (face) {
//                    return {
//                        x: face.x,
//                        y: face.y,
//                        width: face.width,
//                        height: face.height,
//                        weight: 1.0
//                    };
//                });
//
//                callback();
//            }
//        });
//    }

	// функция умной обрезки Фотографии
//    function cropImg(crImg) {
//		if (crImg.length) {
//            var processed = {};
//            var options = {
//                debug: true,
//                ruleOfThirds:true,
//                width: 250,		// запас качества
//                height: 250, 	// запас качества
//            };
//
//            crImg.on('load', function () {
//                window.setTimeout(function () {
//                    var cimg = this;
//
//                    if (processed[cimg.src]) return;
//                    processed[cimg.src] = true;
//
//                    smartcrop.crop(cimg, options, function (result) {
//                        var crop   = result.topCrop,
//                        	canvas = $('<canvas>')[0],
//                        	ctx    = canvas.getContext('2d');
//
//                        canvas.width  = options.width;
//                        canvas.height = options.height;
//
//                        ctx.drawImage(cimg, crop.x, crop.y, crop.width, crop.height, 0, 0, canvas.width, canvas.height);
//                        $(cimg).hide().after(canvas);
//                    });
//                }.bind(this), 100);
//            });
//
//			setTimeout(function () { crImg.load(); }, 200);
//
//            if (this.complete) {
//                $(this).load();
//            }
//        }
//    }
