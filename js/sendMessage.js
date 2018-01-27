$(".write-message-btn").on('click', function(e) {
    $(".create-message").addClass("visible");

    $.ajax({
        method: 'POST',
        url: '../sendMessage.php',
        success: function(data, status) {
//            data = JSON.parse(data);
			console.log(data);
            if(data.indexOf('unauthorised user') !== -1) {
            window.location.pathname = '/accountProfile';
            } 
        },
        error: function(err) {
            console.log(err);
        }
    });	
});

$(".close").on('click', function(e) {
    $(".create-message").removeClass("visible");
});

$("#sendMessage").on('click', function(e) {
    e.preventDefault();

    var obj = {
        author: $(this).data('author'),
        ad: $(this).data('ad'),
        messagetext: $('textarea[name="textmessage"]').val()
    }
    
    
    $.ajax({
    method: 'POST',
    url: '../sendMessage.php',
    cache: false,
    processData: false,
    contentType: false,
    data: JSON.stringify(obj),
    success: function(data, status) {
//        data = JSON.parse(data);
		console.log(data);
        if(data.indexOf('Message sent') !== -1) {
            $(".create-message").removeClass("visible");
            var msg = "Ваше сообщение отправлено";
            flashMessage(msg);
        } else {
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

