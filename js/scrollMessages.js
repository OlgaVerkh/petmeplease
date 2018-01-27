// Pagination on scroll
var inProgress = false;
var startFromMsg = 1;

window.addEventListener('scroll', function(e) {
        
    if(($(window).scrollTop() + $(window).height() >= $(document).height() - 100) && !inProgress) {
                
        $.ajax({
            method: 'POST',
            url: '../scrollMessages.php',
            data: {"startFrom" : startFromMsg},
            beforeSend: function() {
            inProgress = true;
            }
            }).done(function(data) {
			data = JSON.parse(data);
            startFromMsg += 1;
            inProgress = false;
			for(var i = 0; i < data.length; i++) {
                setTimeout( appear.bind(null, data, i), 400 * i);
			}

		});
	};

});

function appear(data, i) {
    var date = new Date(data[i].message_createDate);
    $('.account-messages').append("<div class='account-message'><div class='message-author'><div class='author-avatar'><img src='../"+(data[i].user_avatar ? data[i].user_avatar : 'upload/default.png')+" 'alt=''></div><div class='author-name'>"+ data[i].user_name+" "+data[i].user_lastname+"</div></div><div class='message-text'><div class='message-date'>"+date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()+"</div><p class='bold colored'>Входящее сообщение</p><div class='message-ad-name'>Ответ на объявление: "+(data[i].ad_title ? data[i].ad_title : 'не указано')+"</div><div class='message-text'><p class='bold'>Текст сообщения:</p><p>"+data[i].message_text+"</p></div></div><div class='message-manage-btns'><div class='viewed "+(data[i].message_status == 1 ? 'inactive' : '')+"' data-messageid='"+data[i].message_id+"'>прочитано</div><div class='write-message-btn' data-receiver='"+data[i].message_idUser+"' data-author='"+data[i].message_receiver_id+"'>ответить</div></div></div>");
    $('.account-message:last-child').addClass('animated fadeIn');
}

