// Pagination on scroll
var inProgress = false;
var startFrom = 5;
var params = !window.location.search ? {} : findGetParameter(window.location.search);



if(!window.location.search) {
    window.addEventListener('scroll', function(e) {
    if(($(window).scrollTop() + $(window).height() >= $(document).height() - 80) && !inProgress) {
        $.ajax({
            method: 'POST',
            url: '../scrollindex.php',
            data: {
                "startFrom" : startFrom,
                "kind" : params.kind,
                "city" : params.city,
                "section" : params.section,
                "kind_id" : params.kind_id
            },
            beforeSend: function() {
            inProgress = true;
            }
            }).done(function(data) {
			data = JSON.parse(data);
            startFrom += 2;
            inProgress = false;
			for(var i = 0; i < data.length; i++) {
                setTimeout( appear.bind(null, data, i), 400 * i);
			}

		});
	};

});
}

else {
    console.log('Nothing to do!');
}



function appear(data, i) {
    var date = new Date(data[i].ad_createDate);
    $('.latest-ads').append("<div class='latest-ad'><div class='price'>" + (data[i].ad_animal_price ? data[i].ad_animal_price + ' рублей' : 'Цена не установлена' ) + "</div><div class='flex-container'><div class='latest-ad-img'><img src=../" + data[i].photo + " alt=''></div><div class='flex-item'><h3><a href='singleAd?ad_id="+data[i].ad_id+"'>" + data[i].ad_title + "</a></h3><span class='ad-date'>" +date.getDate()+"-"+(date.getMonth() + 1)+"-"+date.getFullYear()+"</span><p class='ad-city'>" + data[i].city_name + "</p><p class='ad-text'>" + data[i].ad_text + "</p></div></div></div>");
    $('.latest-ad:last-child').addClass('animated fadeIn');
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


