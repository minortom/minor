// Create items
var itemList = [];

$.ajax({
	dataType: "json",
	url: 'js/data.json',
	async: false,
	success: function(data) {
		itemList.push(data);
	}
});


/* console.log(itemList); */

$.each(itemList[0], function(key,value) {

	for(i=0;i<=9;i++) {
			if(i==value.position) {
				var itemData = {
					name: value.naam,
					category: value.categorie,
					city: value.plaats,
					land: value.land,
					text: value.toeristen_tekst,
					weatherCode: value.yahooweatherCode,
					fact1: value.fact1,
					fact2: value.fact2,
                    comp: value.comparison
				}

//				console.log(itemData);

				Application.createItem(i,itemData);

			}
	}

});

//console.log(Application.items);

// Application start
Application.getData(0);
document.onkeydown = keyPressed;

$("#slide_comp").click(function(){
    event.preventDefault();
    $(".comp").slideToggle();
//    console.log('slide');
});

/* FUNCTIONS */
/**
 * @param e
 */
function keyPressed(e) {
    $(".comp").slideUp();
	e = e || window.event;
	if (e.keyCode == '37') {
		Application.nextItem('left');
//        getDataFade(".information");
	}
	else if (e.keyCode == '39') {
		Application.nextItem('right');
	}
}

/**
 * @param F
 * @return {Number}
 */
function fahrenheitToCelsius(F) {
	return (F-32) * (5/9);
}

/**
 * @param haystack
 * @param needle
 * @return {Boolean}
 */
function inArray(haystack, needle) {
	return (haystack.indexOf(needle) >= 0) ? true : false;
}