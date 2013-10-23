// Create items
var itemList = [];
$.getJSON( "js/data.json",

	function ( data ) {

		$.each( data, function( key, val ) {

			for(i=0;i<=9;i++) {

				if(i==val.position) {

					var itemData = {
						name: val.naam,
						city: val.plaats,
						land: val.land,
						text: val.toeristen_tekst,
						degreesCelsius: "20",
						weatherCode: val.yahooweatherCode
					}

					addItem(itemData);

				}

			}

		});

	}
);

// Ik wil hier itemData in itemList stoppen zodat ik daarvan een item kan creeeren in de Applicatie class, helaas werkt dit niet?
function addItem(v) {
	itemList.push(v);
	console.log(v);
}

console.log(itemList);


//Application.createItem(0, "Langste brug", 18, "regenachtig");
//Application.createItem(1, "Dikste boom", 20,"bewolkt");
//Application.createItem(2, "Smalste huis", 10,"zonnig");
//Application.createItem(3, "Scheefste toren", 15,"sneeuw");
//Application.createItem(4, "Oudste huis", 30,"regenachtig");
//Application.createItem(5, "Oudste molen", 20,"zonnig");
//Application.createItem(6, "Laagste plek", 14,"mistig");
//Application.createItem(7, "Kleinste dorp", 10,"sneeuw");
//Application.createItem(8, "Hoogste gebouw", 6,"bewolkt");
//Application.createItem(9, "Stilste plek", 14,"zonnig");

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