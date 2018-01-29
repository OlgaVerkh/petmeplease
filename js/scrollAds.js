// Pagination on scroll
var inProgress = false;
var startFromAds = 2;
var params = !window.location.search ? {} : findGetParameter(window.location.search);

console.log(params);

if(!window.location.search) {
window.addEventListener('scroll', function(e) {
    if(($(window).scrollTop() + $(window).height() >= $(document).height() - 100) && !inProgress) {
        $.ajax({
            method: 'POST',
            url: '../scrollAds.php',
            data: {"startFrom" : startFromAds},
            beforeSend: function() {
            inProgress = true;
            }
            }).done(function(data) {
			data = JSON.parse(data);
            startFromAds += 1;
            inProgress = false;
			for(var i = 0; i < data.length; i++) {
                setTimeout( appear.bind(null, data, i), 400 * i);
			}

		});
	};

});
} else {
    console.log('Nothing to do!');
}

function appear(data, i) {
    var date = new Date(data[i].ad_createDate);
    $('.ads').append("<div class='ad'><div class='price'>" + (data[i].ad_animal_price ? data[i].ad_animal_price + ' рублей' : 'Цена не установлена' ) + "</div><div class='flex-container'><div class='ad-img'><img src=../" + data[i].photo + " alt=''></div><div class='flex-item'><h3><a href='/singleAd?ad_id="+data[i].ad_id+"'>" + data[i].ad_title + "</a></h3><span class='ad-date'>" +date.getDate()+"-"+(date.getMonth() + 1)+"-"+date.getFullYear()+"</span><p class='ad-city'>" + data[i].city_name + "</p><p class='ad-text'>" + data[i].ad_text + "</p></div></div></div>");
    $('.ad:last-child').addClass('animated fadeIn');
}

function findGetParameter(parameterName) {
    var obj = {};
    var paramsArr = parameterName.slice(1).split('&');
    paramsArr.forEach( function(v,i,a) {
        var tmpArr = v.split('=');
        obj[tmpArr[0]] = tmpArr[1];
    });
    return obj;
}