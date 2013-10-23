var Application = {

	statics : {
		partDegree : 36,
		worldClass : 'world',
		speed : 500
	},

	globals : {
		currentInt : 0,
		currentDegree : 0,
		nextDegree : 0,
		currentWeatherCode : 0
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
				weatherCode: data.weatherCode,
				fact1: data.fact1,
				fact2: data.fact2,
                comp: data.comp
			}
		}
		this.items.push(item);
//        console.log(data);

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

	/**
	 * @param e
	 */
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

	/**
	 * @param i
	 */
	getData : function (i) {

		var that = this;
		$.each(this.weatherTypes, function(index, value) {
			if (that.items[i].weatherType == value.name) {
				that.changeBackground(value.wClass);
			}
		});
//		        console.log(this.items);
				
		if (this.items[i].data.fact2 != '') {
			fact2 = " || "+this.items[i].data.fact2;		
		}else{
			fact2 = '';
		}
		var name = '';
		if(!this.items[i].data.name == "") {
			name = ": " + this.items[i].data.name;
		}
		$(".title").html(this.items[i].data.category + name);
        $(".text").html(this.items[i].data.text);
        $(".fact-text").html(this.items[i].data.fact1+fact2);
        $(".place").html(''+this.items[i].data.city);
        this.getWeatherData(this.items[i].data.weatherCode,i);

        if (this.items[i].data.comp.fact2 != '') {
            fact2 = " || "+this.items[i].data.comp.fact2;
        }else{
            fact2 = '';
        }
        $(".comp_title").html(this.items[i].data.comp.naam);
        $(".comp_text").html(this.items[i].data.comp.toeristen_tekst);
        $(".comp_fact-text").html(this.items[i].data.comp.fact1+fact2);
        $(".comp_place").html('Waar? -- '+this.items[i].data.comp.plaats);


	},

	/**
	 * @param weatherClass
	 */
	changeBackground : function (weatherClass) {

		$.each(this.weatherTypes, function(index, value) {
			$('.' + value.class).hide(300);
		});

		$('.' + weatherClass).show(300);

	},

	/**
	 * @param id
	 * @param int
	 */
 	getWeatherData : function (id,int) {
		var query = "select * from rss where url='http://weather.yahooapis.com/forecastrss?w=" + id + "'"
		var encodedQuery = encodeURIComponent(query.toLowerCase()),
			url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodedQuery + '&format=json&callback=?';

		 var that = this;
		 $.ajax({
			 dataType: "json",
			 url: url,
			 async: false,
			 success: function(data) {
				 var w = data.query.results.item;
				 var type = w.condition.text;
				 var celsius = fahrenheitToCelsius(w.condition.temp);
				 var code = w.condition.code;
				 celsius = Math.round(celsius * 10) / 10;
//                 <br/>" + type
				 $(".weather").html(celsius + " C "+"<div class='row weather-text'><div class='small-12 columns'>Graden</div></div>");

				 that.getWeatherClass(code);

			 }
		 });

	},

	/**
	 * @param code
	 */
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

		var weatherTitle = getWeatherTitle(code);
		var currentWeatherTitle = getWeatherTitle(this.globals.currentWeatherCode);

		if(currentWeatherTitle != weatherTitle) {
			switch(weatherTitle) {

				case 'rain':
					changeBackground("rain");
					$('#weather-description').html('Het regent');
					break;
				case 'heavyRain':
					changeBackground("heavyRain");
					$('#weather-description').html('Het regent erg hard!');
					break;
				case 'snow':
					changeBackground("snow");
					$('#weather-description').html('Het sneeuwt');
					break;
				case 'mist':
					changeBackground("mist");
					$('#weather-description').html('Het is erg mistig');
					break;
				case 'sunny':
					changeBackground("sunny");
					$('#weather-description').html('De zon schijnt');
					break;
				case 'cloudy':
					changeBackground("cloudy");
					$('#weather-description').html('Het is bewolkt');
					break;
				case 'storm':
					changeBackground("storm");
					$('#weather-description').html('Het stormt');
					break;
				case 'unkown':
					changeBackground("unknown");
					$('#weather-description').html('');
					break;
			}
		}

		this.globals.currentWeatherCode = code;

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

		function getWeatherTitle(code) {
			var rain = [5,6,17];
			var heavyRain = [11,12,35,40,45];
			var snow = [7,8,13,14,15,16,18,41,42,43,46];
			var mist = [19,20,21,22,23,24,25];
			var sunny = [32,36];
			var cloudy = [26,27,28,29,30,44];
			var storm = [1,3,4,37,38,39,47];
			var unknown = [0,2,31,33,34];

			if(inArray(rain,code)) {
				return 'rain';
			} else if(inArray(heavyRain,code)) {
				return 'heavyRain';
			} else if(inArray(snow,code)) {
				return 'snow';
			} else if(inArray(mist,code)) {
				return 'mist';
			} else if(inArray(sunny,code)) {
				return 'sunny';
			} else if(inArray(cloudy,code)) {
				return 'cloudy';
			} else if(inArray(storm,code)) {
				return 'storm';
			} else {
				return 'unknown';
			}

		}

	}

};