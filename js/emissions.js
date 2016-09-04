	d3.csv("data/emissions2.csv", function(data) {
    overallTeamViz(data);
	})


	var width = 1500,
        height = 960,
        centered;

    var projection = d3.geo.mercator()
        .scale((width + 1) / 2 / Math.PI)
        .translate([width / 2, height / 2]);
       

    var path = d3.geo.path()
        .projection(projection);

    var graticule = d3.geo.graticule();
    
    var svg = d3.select("#container").append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.append("path")
        .attr("class", "graticule")
        .attr("d", path);

    d3.json("world-50m.json", function(error, world) {
      if (error) throw error;

      svg.insert("path", ".graticule")
          .datum(topojson.feature(world, world.objects.land))
          .attr("class", "land")
          .attr("d", path);

      svg.insert("path", ".graticule")
          .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
          .attr("class", "boundary")
          .attr("d", path);

    });

    

    


function overallTeamViz(incomingData) {
	d3.select('svg')
	.append("g")
	.attr("id", "teamsG")
	.selectAll("g")
	.data(incomingData)
	.enter()
	.append("g")
	.attr("class", "overallG");
	    
	var teamG = d3.selectAll("g.overallG");
	    
	teamG
	.append("circle")
	.attr("cx", function(incomingData) {
        return projection([incomingData.long, incomingData.lat])[0];
    })
    .attr("cy", function(incomingData) {
        return projection([incomingData.long, incomingData.lat])[1];
    })
	.attr("r", 0)
	.transition()
	.duration(500)
	.attr("r", 20)
	.transition()
	.duration(500)
	.attr("r", 55);
	

	// var colours = d3.scale.ordinal().range(["#264572", "#1c377c", "#172f66", "#0e1735", "#172f66", "#1c377c", "#264572", "#172f66"]);


	var dataKeys = d3.keys(incomingData[0])
		.filter(function (el) {return el != "country" && el != "lat" && el != "long"})    
		d3.select("#years").selectAll("button.teams")
		// .style("fill", "red")
		// .style('fill', function (d, i) {
  //             return colours(i)})
		.data(dataKeys)
		.enter()
		.append("button")
		
		.on("click", years)
		
		.html(function(d) {return d});

	
		// div = d3.select("#val")
  //       .append("div")     
  //       .attr("class", "tooltip")
  //       .attr("id", "tip");
		

		function years(datapoint) {
			var maxValue = d3.max(incomingData, 
			function(d) {return parseFloat(d[datapoint])});

			var tip = d3.tip()
		 	.attr('class', 'd3-tip')
		    .html(function(d) {
		  	return "<span style='color:#fff'>" + parseFloat(d[datapoint]) + "</span>" + " " + "mt"});

		    svg.call(tip);

		 	


			var radiusScale = d3.scale.linear().domain([0,maxValue]).range([10,100]);
			d3.selectAll("g.overallG").select("circle")
			.on('mouseover', tip.show)
			.on('mouseout', tip.hide)

			// .on("mouseover",function(d, i){ return parseFloat(d[datapoint])})

	        
	        // .html(function(d, i){return parseFloat(d[datapoint])} )
	    
	        // .style("display","block")
	        // })

			.transition()
			.duration(1000)
			.attr("r", function (d){return radiusScale(d[datapoint])})

		}	

}
