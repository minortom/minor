$(document).ready(function() {
	window.data = [];
	window.datum = 1;
	$.ajax({
		dataType: 'json',
        success: function(json) {
            window.data = json;
			loadAll(data, window.datum);
        },
        error : function(xhr, text) {
            console.log('An error occurred', xhr, text);
        },
        url: 'json/conversie_doelen.json'
    }); 
	$( ".prev" ).click(function() {
  		if(window.datum > 1) {
			window.datum = window.datum - 1;
			loadAll(data, window.datum);
		}
	});
	$( ".next" ).click(function() {
  		if(window.datum < 14) {
			window.datum = window.datum + 1;
			loadAll(data, window.datum);
		}
	});	
	function loadAll(data, datum) {
		$("#mobile_chart").empty();
		$("#tablet_chart").empty();
		$("#desktop_chart").empty();
		$(".day").empty();
		var dayData = getDayData(data, datum);
		var mobile = getDeviceData(dayData, "ConversiesMobile");
		var tablet = getDeviceData(dayData, "ConversiesTablet");
		var desktop = getDeviceData(dayData, "ConversieDesktop");
		
	
		
		drawGraph(mobile, "mobile_chart", "#C06", "#3600cc");
		drawGraph(tablet, "tablet_chart", "#C06", "#3600cc");
		drawGraph(desktop, "desktop_chart", "#C06", "#3600cc");
	}
	function getDayData(data, datum) {
		var datum = ""+datum+"/9/2013"
		$(".day").text(datum);
		var dayData = [];
		data.filter(function (data) {  if(data.Day == datum) { dayData.push(data); } });
		return dayData;
	}
	function getDeviceData(data, device) {
		var deviceData = [];
		for(var i = 0; i < data.length; i++) {
			deviceData.push(data[i][''+device+'']);
		}
		return deviceData;
	}
	
	function drawGraph(data, element, cl1, cl2) {
		console.log(data);
		var width = 320,
			height = 320,
			radius = Math.min(width, height) / 2;
		
		var colors = [""+cl1+"", ""+cl2+""];
		
		var arc = d3.svg.arc()
			.outerRadius(radius - 10)
			.innerRadius(radius - 70);
		
		var pie = d3.layout.pie()
			.sort(null)
			.value(function(d) { return d; });
		
		var svg = d3.select("#"+element+"").append("svg")
			.attr("width", width)
			.attr("height", height)
		  .append("g")
			.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
		
	
		
		  data.forEach(function(d) {
			d = +d;
		  });

		  var g = svg.selectAll(".arc")
			  .data(pie(data))
			.enter().append("g")
			  .attr("class", "arc");
		
		  g.append("path")
			  .attr("d", arc)
			  .style("fill", function(d,i) { return colors[i]; });
		
		 g.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("dy", ".35em")
	   .attr("class", "wit")
	  .style("color", "#FFF")
      .style("text-anchor", "middle")
      .text(function(d,i) {console.log(d); return d.value; });
		
		
	}
	
});