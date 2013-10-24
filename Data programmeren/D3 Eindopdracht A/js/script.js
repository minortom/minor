$(document).ready(function() {
	loadGraph(0,26, 9705,10098, "#conversies", "Conversies", "Aantal conversies", "Weeknummer", "#06F", "avgconversies", "Gemiddeld 11000");
	loadGraph(0,26, 9705,10098, "#bezoekers", "ConversieRatio", "Conversie Ratio%", "Weeknummer", "#F00", "avgratio", "Gemiddeld 10%");
	
	
function loadGraph(dx1,dx2, dy1,dy2, element, soort, yText, xText, kleur, avg, legenda) {
var margin = {top: 20, right: 20, bottom: 200, left: 80},
    width = 380,
    height = 180;
var label_colors = {  0 : ["black"],
					1 : [""+kleur+""]
					  }    
var label_names = {  0 : [""+legenda+""],
					1 : [""+soort+""]
					  }    
var x = d3.scale.linear()
	.domain([dx1, dx2])
    .range([0, width]);

var y = d3.scale.linear()
	.domain([dy1, dy2])
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
var line = d3.svg.line()
.x(function(d,i) { 
				console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(i+1) + ' using our xScale.');
				return x(i+1); 
			})
			.y(function(d) { 
		
				console.log('Plotting Y value for data point: ' + d[''+avg+''] + ' to be at: ' + y(d[''+avg+'']) + " using our yScale.");
			
				return y(parseInt(d[''+avg+''])); 
			})
var area = d3.svg.area()
    .x(function(d) { return x(parseInt(d.Weeknummer)); })
    .y0(height)
    .y1(function(d) { return y(parseInt(d[''+soort+''])); });
d3.json("json/conversie_doelen.json", function(error, data) {
var svg = d3.select(""+element+"").append("svg")
	.data(data)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	

	//console.log(d3.max(data, function(d) { return d[''+soort+'']; }));
	//console.log(d3.min(data, function(d) { return d.Conversies; }));


  x.domain(d3.extent(data, function(d) { return parseInt(d.Weeknummer); }));
  y.domain([0, d3.max(data, function(d) { return parseInt(d[''+soort+'']); })]);

  svg.append("path")
      .datum(data)
      .attr("class", "area")
	  .style("fill", ""+kleur+"")
      .attr("d", area);
	 
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
	  .append("text")
      .attr("x", width)
      .attr("dy", "3em")
      .style("text-anchor", "end")
      .text(""+xText+"").style("color","#808080");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 1)
      .attr("dy", "-4em")
      .style("text-anchor", "end")
      .text(""+yText+"").style("color","#808080");


svg.append("svg:path").attr("d", line(data)).attr("class", "linee");

// add legend   
	var legend = svg.append("g")
	  .attr("class", "legend")
        //.attr("x", w - 65)
        //.attr("y", 50)
	  .attr("height", 300)
	  .attr("width", 200)
    .attr('transform', 'translate(-200,300)')    
      
    
    legend.selectAll('rect')
      .data(data)
      .enter()
      .append("rect")
	  .attr("x", width - 65)
      .attr("y", function(d, i){ if(i < 2) {return i *  20;}})
	  .attr("width", 10)
	  .attr("height", 10)
	  .style("fill", function(d, i) { 
        var color = label_colors[i];
        return color;
      })
      
    legend.selectAll('text')
      .data(data)
      .enter()
      .append("text")
	  .attr("x", width - 52)
      .attr("y", function(d, i){ if(i < 2) {return i *  20 + 9;}})
	  .text(function(d, i) {
        var text = label_names[i];
        return text;
      });
});
}
});