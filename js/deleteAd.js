$('.delete').on('click', function(e) {
    if(window.confirm('Вы уверены, что хотите удалить объявление?')) {
        
        $.ajax({
            method: 'GET',
            url: 'deleteAd.php' + window.location.search,
            success: function(data, status) {
            console.log(data);
				window.location.pathname = '/accountAds';
            },
            error: function(err) {
                console.log(err);
            }
        });
        
    }
});