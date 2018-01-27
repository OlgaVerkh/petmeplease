$(".write-message-btn").on('click', function(e) {
    $(".create-message").addClass("visible");
});

$(".close").on('click', function(e) {
    $(".create-message").removeClass("visible");
});

$('.viewed').each(function(){
    $(this).on('click', function(e) {
        messageId = $(this).data('messageid');
        $(this).addClass('inactive');
        
        $.ajax({
        method: 'POST',
        url: '../viewedMessage.php',
        cache: false,
        processData: false,
        contentType: false,
        data: messageId,
        success: function(data, status) {
            console.log(data);
        },
        error: function(err) {
            console.log(err);
        }
  
    }); 
        
        
    });
});
