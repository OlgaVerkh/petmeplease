var messageId = 0;
var obj = {
    receiver: '',
    author: '',
    messagetext: ''
};

$(".write-message-btn").on('click', function(e) {
    $(".create-message").addClass("visible");
});

$(".close").on('click', function(e) {
    $(".create-message").removeClass("visible");
});

$('.write-message-btn').each(function() {
    $(this).on('click', function(e) {
        obj.receiver = $(this).data('receiver');
        obj.author = $(this).data('author');
    });  
});

$('#sendMessage').on('click', function(e) {
   e.preventDefault();
    
    obj.messagetext = $('textarea[name="textmessage"]').val();
    
    $.ajax({
    method: 'POST',
    url: '../responseMessage.php',
    cache: false,
    processData: false,
    contentType: false,
    data: JSON.stringify(obj),
    success: function(data, status) {
        data = JSON.parse(data);
                if(data['status'] == true) {
                $(".create-message").removeClass("visible");
                var msg = "Ваше сообщение отправлено";
                flashMessage(msg);
            }   else if(data['status'] == false) {
                var msg = "Произошел сбой, повторите попытку позже";
                flashMessage(msg);
            }     
        },
        error: function(err) {
            console.log(err);
        }
  
    }); 
    
});
    
function flashMessage(msg) {
    $('#flashMessageAd').addClass('active').text(msg);
    setTimeout( () => $('#flashMessageAd').removeClass('active').text('') ,7000);
}      


