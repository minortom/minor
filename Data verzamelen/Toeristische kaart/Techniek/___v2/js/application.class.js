var Application = {

	statics : {
		partDegree : 36,
		worldClass : 'world',
		speed : 500
	},

	globals : {
		currentInt : 0,
		currentDegree : 0,
		nextDegree : 0
	},

	items : [],

	weatherTypes : [
		{name: 'zonnig', wClass: 'weather-sun', bgColor: '#fff'},
		{name: 'bewolkt', wClass: 'weather-clouds', bgColor: '#fff'},
		{name: 'regenachtig', wClass: 'weather-rain', bgColor: '#fff'},
		{name: 'sneeuw', wClass: 'weather-snow', bgColor: '#fff'},
		{name: 'mistig', wClass: 'weather-mist', bgColor: '#fff'}
	],

	/**
	 * @param id
	 * @param data
	 */
	createItem: function (id,data) {
		var item = {
			id: id,
			data: {
				name: data.name,
				category: data.category,
				city: data.city,
				land: data.land,
				text: data.text,
				degreesCelsius: data.degreesCelsius,
				weatherCode: data.weatherCode
			}
		}
		this.items.push(item);
	},

	/**
	 * @param from
	 * @param to
	 */
	rotateWorld: function (from, to) {

		var that = this;
		$({deg: from}).animate({deg: to}, {
			duration: this.speed,
			step: function(now)
			{
				$("." + that.statics.worldClass).css({
					transform: 'rotate(' + now + 'deg)'
				});
			}
		});

	},

	nextItem : function (e) {

		switch(e) {

			case 'left':

				if (this.globals.currentInt <= 0) {

					this.globals.currentInt = this.items.length - 1;

				} else {

					this.globals.currentInt -= 1;

				}

				this.globals.nextDegree = this.globals.currentDegree - this.statics.partDegree;
				this.rotateWorld(this.globals.currentDegree,this.globals.nextDegree);
				this.globals.currentDegree = this.globals.nextDegree;

				break;

			case 'right':

				if (this.globals.currentInt >= this.items.length - 1) {

					this.globals.currentInt = 0;

				} else {

					this.globals.currentInt += 1;

				}

				this.globals.nextDegree = this.globals.currentDegree + this.statics.partDegree;
				this.rotateWorld(this.globals.currentDegree,this.globals.nextDegree);
				this.globals.currentDegree = this.globals.nextDegree;

				break;

		}

		this.getData(this.globals.currentInt);

	},

	getData : function (i) {

		var that = this;
		$.each(this.weatherTypes, function(index, value) {
			if (that.items[i].weatherType == value.name) {
				that.changeBackground(value.wClass);
			}
		});
		
		$(".title").html(this.items[i].data.category + ": " + this.items[i].data.name);

		this.getWeatherData(this.items[i].data.weatherCode,i);

	},

	changeBackground : function (weatherClass) {

		$.each(this.weatherTypes, function(index, value) {
			$('.' + value.class).hide(300);
		});

		$('.' + weatherClass).show(300);

	},

 	getWeatherData : function (id,int) {
		var query = "select * from rss where url='http://weather.yahooapis.com/forecastrss?w=" + id + "'"
		var encodedQuery = encodeURIComponent(query.toLowerCase()),
			url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodedQuery + '&format=json&callback=?';

//		$.getJSON(url, function (data) {
//			var w = data.query.results.item;
//			var type = w.condition.text;
//			$type = type.replace(/\s+/g, '-').toLowerCase();
//		});

		 var $type;
		 var that = this;
		 $.ajax({
			 dataType: "json",
			 url: url,
			 async: false,
			 success: function(data) {
				 var w = data.query.results.item;
				 var type = w.condition.text;
				 $type = type.replace(/\s+/g, '-').toLowerCase();
				 $(".weather").html(that.items[int].data.degreesCelsius + " C<br/>" + $type);


			 }
		 });

	}

};