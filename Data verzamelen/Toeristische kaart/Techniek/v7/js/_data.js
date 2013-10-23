var currentItem = 0;
var newItem = 0;
var items = [];

function createItem(id, name, weather, weatherType)
{
	this.id = id;
	this.name = name;
	this.weather = weather;
	this.weatherType = weatherType;
	return this;
}

items[0] = new createItem(0, "Langste brug", 18, "regenachtig");
items[1] = new createItem(1, "Dikste boom", 20,"bewolkt");
items[2] = new createItem(2, "Smalste huis", 10,"zonnig");
items[3] = new createItem(3, "Scheefste toren", 15,"sneeuw");
items[4] = new createItem(4, "Oudste huis", 30,"regenachtig");
items[5] = new createItem(5, "Oudste molen", 20,"zonnig");
items[6] = new createItem(6, "Laagste plek", 14,"mistig");
items[7] = new createItem(7, "Kleinste dorp", 10,"sneeuw");
items[8] = new createItem(8, "Hoogste gebouw", 6,"bewolkt");
items[9] = new createItem(9, "Stilste plek", 14,"zonnig");
