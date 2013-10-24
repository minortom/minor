$(document).ready(function() {
	// tooltip opties
	$(".item").hover(function(){
    var currentTipHolder = $(this);
    var $tipTxt = $(this).text();
    var $tipTitle = $(this).attr('data-title');
	var $color = $(this).attr('color');

    $('.image').prepend('<div id="tooltip" style="background:'+$color+'">' + $tipTitle + '</div>');

    // jQueryUI position
    $('#tooltip').position({
        of: currentTipHolder,
        at: 'center top',
        my: 'center bottom'
    });
},function() {
    $('#tooltip').remove();
});
	// data inladen
	$.getJSON("data.json", function(data) {
		var items = [];
		data=data.sort(compare);
  		$.each(data, function(key, val) {
    		items.push(val);
  		});
		populateDropdown(items);
		loadCountry(items[0]);
		$('select').change(function(){
			var countrynumber = $('option:selected',$(this)).index();
    		loadCountry(items[countrynumber]);
		});
	});
		function compare(a,b) {
	  if (a.Country < b.Country)
		 return -1;
	  if (a.Country > b.Country)
		return 1;
	  return 0;
	}

	// data van land laden
function loadCountry(countryArray) {
	var colors = [ "#e88b07", "#5db12f", "#b762a3", "#e63c12", "#59c4e6", "#e51e20", "#f0e50d", "#27519f", "#e71862", "#b74c97" ];
	var tijdelijkeArrayValues = [];
	var tijdelijkeArrayKeys = [];
	
	$.each(countryArray, function(key, val) {
    		tijdelijkeArrayValues.push(val);
  	});
	tijdelijkeArrayValues.splice(0, 1);
	$.each(countryArray, function(key, val) {
    		tijdelijkeArrayKeys.push(key);
  	});
	tijdelijkeArrayKeys.splice(0, 1);
	for(var i = 0; i < 11; i++)
	{
		//$(".item[data-id='" + (i + 1) + "']").css('opacity', (demoData[i] / 100));
		if(i == 2) {
			$(".item[data-id='" + (i + 1) + "']").animate({
				opacity: (tijdelijkeArrayValues[i] / 94)
			}, 1000);
		} else if(i == 10) {
			$(".item[data-id='" + (i + 1) + "']").animate({
				opacity: (tijdelijkeArrayValues[i] / 82)
			}, 1000);
		} else {
			$(".item[data-id='" + (i + 1) + "']").animate({
				opacity: (tijdelijkeArrayValues[i] / 100)
			}, 1000);
		}
		$(".item[data-id='" + (i + 1) + "']").attr("data-title", ""+tijdelijkeArrayKeys[i]+"<br> "+tijdelijkeArrayValues[i]+"" );
		$(".item[data-id='" + (i + 1) + "']").attr("color", ""+colors[i]+"" );
		 
	}
	searchPics(countryArray.Country + ' landscape');
}
	// alle landen inladen in dropdown menu
function populateDropdown(countries) {
	
	$.each(countries, function(key, val) {
    		$(".dropdown").append('<option value="'+key+'">'+val.Country+'</option>');
  	});

}
});

function searchPics(yourKeywords)
{
	console.log("search for: " + yourKeywords);
	$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
	{
		lang    : 'en-us',
		tags    : yourKeywords,
		limit   : '5',
		format  : 'json'
	},
	function(data){
		$.each(data.items, function(i,item){
			if (i == 1) return false;
			var imgThumb = item.media.m.split('m.jpg')[0] + 'm.jpg'; //size of the image small max 240px
			var imgLarge = item.media.m.split('_m.jpg')[0] + '.jpg'; //large size of the image for fancybox
			$(".background").css("background", "url('" + imgLarge + "') no-repeat");
		});              
	});
}