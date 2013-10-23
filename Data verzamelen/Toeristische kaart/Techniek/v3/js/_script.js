document.onkeydown = keyPressed;
var encodedClass;
var currentDegree = 0;
var partDegrees = 36;
var weatherCode;
var arrInt = 0;
var items = [];

$.getJSON( "js/data.json", function( data ) {

	$.each( data, function( key, val ) {

		var item = {
			'id': val.position,
			'weatherCode': val.yahooweatherCode
		};

		items.push(item);

	});

});

console.log(items);

$(document).on(function() {
	$(".title").html(items[0]['name']);
	console.log(getWeatherType(getWeatherCode(arrInt)));
	getData(arrInt);
});

function rotateWorld(degreeFrom, degreeTo)
{
	$({deg: degreeFrom}).animate({deg: degreeTo}, {
        duration: 500,
        step: function(now)
		{
            $(".world").css({
                transform: 'rotate(' + now + 'deg)'
            });
        }
    });
}

function keyPressed(e) {
    e = e || window.event;
    if (e.keyCode == '37') {
        nextItem('left');
	}
    else if (e.keyCode == '39') {
        nextItem('right');
    }
}

function nextItem(key)
{

	if(key == 'left') {

//		if (int==0) {
//			int = items.length-1;
//		} else {
//			int -= 1;
//		}
		arrInt -= 1;
		if(arrInt<=0) {
			arrInt = 9;
		}

		nextDegree = currentDegree - partDegrees;
		rotateWorld(currentDegree, nextDegree);
		currentDegree = nextDegree;

	} else {

//		if (int==items.length-1) {
//			int = 0;
//		} else {
//			int += 1;
//		}

		arrInt += 1;
		if(arrInt>=9) {
			arrInt=0;
		}

		nextDegree = currentDegree + partDegrees;
		rotateWorld(currentDegree, nextDegree);
		currentDegree = nextDegree;

	}

	console.log(arrInt);

	console.log(getWeatherType(getWeatherCode(arrInt)));
	console.log(getWeatherCode(arrInt));
	getData(arrInt);

}

function getWeatherCode(i) {
	$.getJSON( "js/data.json", function( data ) {

		$.each( data, function( key, val ) {

			if(val.position==i) {
				console.log(val.position);
				weatherCode = val.yahooweatherCode;
			}

		});

	});
	console.log(weatherCode);
	return weatherCode;

}

function getData(i) {
	switch(items[i]['weatherType']) {
		case "regenachtig":
//			console.log("Het is regenachtig");
			changeBackground('weather-rain');
			break;
		case "bewolkt":
//			console.log("Het is bewolkt");
			changeBackground('weather-clouds');
			break;
		case "zonnig":
//			console.log("Het is zonnig");
			changeBackground('weather-sun');
			break;
		case "mistig":
//			console.log("Het is mistig");
			changeBackground('weather-mist');
			break;
		case "sneeuw":
//			console.log("Het sneeuwt!");
			changeBackground('weather-snow');
			break;
	}

	$(".title").html(items[i]['name']);
	$(".weather").html(items[i]['weather'] + " C<br/>" + items[i]['weatherType'] );
}

function changeBackground(weatherClass) {

	$('.weather-rain').hide(300);
	$('.weather-clouds').hide(300);
	$('.weather-sun').hide(300);
	$('.weather-mist').hide(300);
	$('.weather-snow').hide(300);
	$('.' + weatherClass).show(300);

}

function getWeatherType(id) {
	var query = "select * from rss where url='http://weather.yahooapis.com/forecastrss?w="+id+"'"
	var encodedQuery = encodeURIComponent(query.toLowerCase()),
		url = 'http://query.yahooapis.com/v1/public/yql?q='
			+ encodedQuery + '&format=json&callback=?';

	$.getJSON(url, function (data) {
		var w=data.query.results.item;
		var type=w.condition.text;
		encodedClass = type.replace(/\s+/g, '-').toLowerCase();

	});

	return encodedClass;

}