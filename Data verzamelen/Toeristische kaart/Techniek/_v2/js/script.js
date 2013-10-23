// Create items
var itemList = [];

$.ajax({
	dataType: "json",
	url: 'js/data.json',
	async: false,
	data: function(data) {

//		$.each(data, function(key,value) {
//			console.log(value);
//		});

	},
	success: function(data) {
//		console.log(data);
		itemList.push(data);
	}
});


//console.log(itemList[0]);

$.each(itemList[0], function(key,value) {

	for(i=0;i<=9;i++) {
			if(i==value.position) {

				var itemData = {
					name: value.naam,
					category: value.categorie,
					city: value.plaats,
					land: value.land,
					text: value.toeristen_tekst,
					degreesCelsius: "20",
					weatherCode: value.yahooweatherCode
				}

				Application.createItem(i,itemData);

			}
	}

});

console.log(Application.items);

// Application start
Application.getData(0);

document.onkeydown = keyPressed;
function keyPressed(e) {
	e = e || window.event;
	if (e.keyCode == '37') {
		Application.nextItem('left');
	}
	else if (e.keyCode == '39') {
		Application.nextItem('right');
	}
}