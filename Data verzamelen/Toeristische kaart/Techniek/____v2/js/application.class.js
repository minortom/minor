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

		 var that = this;
		 $.ajax({
			 dataType: "json",
			 url: url,
			 async: false,
			 success: function(data) {
				 var w = data.query.results.item;

				 console.log(w);

				 var type = w.condition.text;
				 var celsius = fahrenheitToCelsius(w.condition.temp);
				 var code = w.condition.code;

				 var $type = type.replace(/\s+/g, '-').toLowerCase();

				 celsius = Math.round(celsius * 10) / 10;

				 $(".weather").html(celsius + " C<br/>" + $type);

				 that.getWeatherClass(code);

			 }
		 });

	},

	getWeatherClass : function (code) {

		code = parseInt(code);
		var rain = [5,6,17];
		var heavyRain = [11,12,35,40,45];
		var snow = [7,8,13,14,15,16,18,41,42,43,46];
		var mist = [19,20,21,22,23,24,25];
		var sunny = [32,36];
		var cloudy = [26,27,28,29,30,44];
		var storm = [1,3,4,37,38,39,47];
		var unknown = [0,2,31,33,34];

		if(inArray(rain,code)) {
			changeBackground("rain");
		} else if(inArray(heavyRain,code)) {
			changeBackground("heavyRain");
		} else if(inArray(snow,code)) {
			changeBackground("snow");
		} else if(inArray(mist,code)) {
			changeBackground("mist");
		} else if(inArray(sunny,code)) {
			changeBackground("sunny");
		} else if(inArray(cloudy,code)) {
			changeBackground("cloudy");
		} else if(inArray(storm,code)) {
			changeBackground("storm");
		} else {
			changeBackground("unknown");
		}

		return "test";

		function changeBackground(weather) {

			$('.weather-rain').hide(300);
			$('.weather-heavyRain').hide(300);
			$('.weather-snow').hide(300);
			$('.weather-mist').hide(300);
			$('.weather-sunny').hide(300);
			$('.weather-cloudy').hide(300);
			$('.weather-storm').hide(300);
			$('.weather-unknown').hide(300);
			$('.weather-' + weather).show(300);

		}

	}

};