


//-------------------------------------------------------------------------
//  BERNIE ON CLIMATE CHANGE
//-------------------------------------------------------------------------

d3.csv("data/bernie.csv", function(data) {



    var negative = [];
    var positive = [];
    var neutral = [];
         
         for(var i = 0; i < data.length; i++){
            if(data[i]['score'] > 0){
              positive.push({
                  "score" : data[i].score,     
                  "name"  : data[i].screen_name,
                  "text"  : data[i].text,
                  "time"  : data[i].time
                });


            } else if(data[i]['score']==0){
              neutral.push(
                {
                  "score" : data[i].score,     
                  "name"  : data[i].screen_name,
                  "text"  : data[i].text,
                  "time"  : data[i].time
                });

            } else{
              negative.push({
                  "score" : data[i].score,     
                  "name"  : data[i].screen_name,
                  "text"  : data[i].text,
                  "time"  : data[i].time
                  
              
                });

            }       

          }

      var negt = [];
      var post = [];
      var neut = [];

      for (var j = 0; j < positive.length; j++){     
      var posName = positive[j].name;
          post[j] = positive[j].text;
      }


      for (var j = 0; j < negative.length; j++){    
      var negName = negative[j].name;      
          negt[j] = negative[j].text;      
      }


      for (var j = 0; j < neutral.length; j++){    
      var neuName = neutral[j].name;      
          neut[j] = neutral[j].text;      
      }
     

        var negp = Math.round((negative.length / data.length) * 100, 2);
        var neup = Math.round((neutral.length / data.length) * 100, 2);
        var posp = Math.round((positive.length / data.length) * 100, 2);


        var dataset = {
              pol: [ negp , neup, posp],
              tweet : [negt, neut, post],
              name: ["NEGATIVE", "NEUTRAL", "POSITIVE"],
          };

        var width = 200,
            height = 200,
            radius = Math.min(width, height) / 2;

        var color = d3.scale.ordinal().range(["#82193f", "#0d5d7a", "#1da8a8"]);



        var pie = d3.layout.pie()
            .sort(null);

        var arc = d3.svg.arc()
            .innerRadius(radius - 30)
            .outerRadius(radius - 7);

        var svg = d3.select("#bernie").append("svg")
            .attr("width", width + 30)
            .attr("height", height + 30)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


        div = d3.select("body")
        .append("div")     
        .attr("class", "tooltip")
        .attr("id", "tip");


        var g = svg.selectAll(".arc")
        .data(pie(dataset.pol))
        .data(pie(dataset.tweet))
        .enter()
        .append("g")
        .attr("class","arc")
        .on("mouseover",function(d, i){
        console.log(dataset.tweet[i][0])
        var mouseVal = d3.mouse(this);
        div.style("display","none");
        div
        .html("<strong><span style='font-family: DIN Condensed; font-size: 1.6em'>BERNIE SANDERS</span></strong>" + "</br>"  + dataset.name[i] + " " + ":" + " " + dataset.pol[i] + "%"+ "</br>" + "</br>" + dataset.tweet[i][0])
        // .style("left", "100px")
        // .style("top", "40px")
        // .style("font-family", "Gotham XNarrow")
        .style("display","block");
        })
        // .on("mouseout",function(){div.html(" ").style("display","none");})
       
      


        setTimeout(function(){            
            g.append("path")
            .attr("d", arc)
            .data(pie(dataset.pol))
            .attr("fill", function(d, i) { return color(i); })
            
            .transition().delay(function(d, i) { return i * 100; }).duration(500)
            .attrTween('d', function(d) {
                 var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
                 return function(t) {
                     d.endAngle = i(t);
                   return arc(d);
                 }
            })         
             svg.append("text")
            .text("Bernie Sanders")
            .attr("x", "-50")
            .attr("y", "120")
            .style("font-size", "16px")

        }, 500);


});
// });

//-------------------------------------------------------------------------
//  OBAMA ON CLIMATE CHANGE
//-------------------------------------------------------------------------

d3.csv("data/obama.csv", function(data) {

    var negative = [];
    var positive = [];
    var neutral = [];
         
         for(var i = 0; i < data.length; i++){
            if(data[i]['score'] > 0){
              positive.push({
                  "score" : data[i].score,     
                  "name"  : data[i].screen_name,
                  "text"  : data[i].text,
                  "time"  : data[i].time
                });

            } else if(data[i]['score']==0){
              neutral.push(
                {
                  "score" : data[i].score,     
                  "name"  : data[i].screen_name,
                  "text"  : data[i].text,
                  "time"  : data[i].time
                });

            } else{
              negative.push({
                  "score" : data[i].score,     
                  "name"  : data[i].screen_name,
                  "text"  : data[i].text,
                  "time"  : data[i].time
                });
            }
          }


        var negt = [];
        var post = [];
        var neut = [];

        for (var j = 0; j < positive.length; j++){     
        var posName = positive[j].name;
            post[j] = positive[j].text;
        }


        for (var j = 0; j < negative.length; j++){    
        var negName = negative[j].name;      
            negt[j] = negative[j].text;      
        }


        for (var j = 0; j < neutral.length; j++){    
        var neuName = neutral[j].name;      
            neut[j] = neutral[j].text;      
        }

        var negp = Math.round((negative.length / data.length) * 100, 2);
        var neup = Math.round((neutral.length / data.length) * 100, 2);
        var posp = Math.round((positive.length / data.length) * 100, 2);


        var dataset = {
              pol: [ negp , neup, posp],
              tweet : [negt, neut, post],
              name: ["NEGATIVE", "NEUTRAL", "POSITIVE"],
          };

        var width = 170,
            height = 170,
            radius = Math.min(width, height) / 2;

        var color = d3.scale.ordinal().range(["#82193f", "#0d5d7a", "#1da8a8"]);

        var pie = d3.layout.pie()
            .sort(null);

        var arc = d3.svg.arc()
            .innerRadius(radius - 30)
            .outerRadius(radius - 7);

        var svg = d3.select("#obama").append("svg")
            .attr("width", width + 30)
            .attr("height", height + 30)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


        div = d3.select("body")
        .append("div")     
        .attr("class", "tooltip")
        .attr("id", "tip");

        
        var g = svg.selectAll(".arc")
        .data(pie(dataset.pol))
        .data(pie(dataset.tweet))
        .enter()
        .append("g")
        .attr("class","arc")
        .on("mouseover",function(d, i){
        console.log(dataset.tweet[i][0])
        var mouseVal = d3.mouse(this);
        div.style("display","none");
        div
        .html("<strong><span style='font-family: DIN Condensed; font-size: 1.6em'>BARACK OBAMA</span></strong>" + "</br>"  + dataset.name[i] + " " + ":" + " " + dataset.pol[i] + "%"+ "</br>" + "</br>" + dataset.tweet[i][0])
        // .style("left", (d3.event.pageX-300) + "px")
        // .style("top", (d3.event.pageY-10) + "px")
        // .style("opacity", 1)
        .style("display","block");
        })
        // .on("mouseout",function(){div.html(" ").style("display","none");})
            

        


        setTimeout(function(){

        g.append("path")
            .attr("d", arc)
            .data(pie(dataset.pol))
            .attr("fill", function(d, i) { return color(i); })
            
            .transition().delay(function(d, i) { return i * 100; }).duration(500)
            .attrTween('d', function(d) {
                 var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
                 return function(t) {
                     d.endAngle = i(t);
                   return arc(d);
                 }
            })
            
            svg.append("text")
            .text("Barack Obama")
            .attr("x", "-50")
            .attr("y", "105")
            .style("font-size", "16px")


        }, 1500);

});

//-------------------------------------------------------------------------
//  HILLARY CLINTON ON CLIMATE CHANGE
//-------------------------------------------------------------------------

d3.csv("data/clinton.csv", function(data) {

    var negative = [];
    var positive = [];
    var neutral = [];
         
         for(var i = 0; i < data.length; i++){
            if(data[i]['score'] > 0){
              positive.push({
                  "score" : data[i].score,     
                  "name"  : data[i].screen_name,
                  "text"  : data[i].text,
                  "time"  : data[i].time
                });

            } else if(data[i]['score']==0){
              neutral.push(
                {
                  "score" : data[i].score,     
                  "name"  : data[i].screen_name,
                  "text"  : data[i].text,
                  "time"  : data[i].time
                });

            } else{
              negative.push({
                  "score" : data[i].score,     
                  "name"  : data[i].screen_name,
                  "text"  : data[i].text,
                  "time"  : data[i].time
                });
            }
          }

        var negt = [];
        var post = [];
        var neut = [];

        for (var j = 0; j < positive.length; j++){     
        var posName = positive[j].name;
            post[j] = positive[j].text;
        }


        for (var j = 0; j < negative.length; j++){    
        var negName = negative[j].name;      
            negt[j] = negative[j].text;      
        }


        for (var j = 0; j < neutral.length; j++){    
        var neuName = neutral[j].name;      
            neut[j] = neutral[j].text;      
        }

        var negp = Math.round((negative.length / data.length) * 100, 2);
        var neup = Math.round((neutral.length / data.length) * 100, 2);
        var posp = Math.round((positive.length / data.length) * 100, 2);


        var dataset = {
              pol: [ negp , neup, posp],
              tweet : [negt, neut, post],
              name: ["NEGATIVE", "NEUTRAL", "POSITIVE"],
          };

        var width = 110,
            height = 110,
            radius = Math.min(width, height) / 2;

        var color = d3.scale.ordinal().range(["#82193f", "#0d5d7a", "#1da8a8"]);

        var pie = d3.layout.pie()
            .sort(null);

        var arc = d3.svg.arc()
            .innerRadius(radius - 30)
            .outerRadius(radius - 7);



        var svg = d3.select("#clinton").append("svg")
            .attr("width", width + 30)
            .attr("height", height + 30)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


         div = d3.select("body")
        .append("div")     
        .attr("class", "tooltip")
        .attr("id", "tip");

        
        var g = svg.selectAll(".arc")
        .data(pie(dataset.pol))
        .data(pie(dataset.tweet))
        .enter()
        .append("g")
        .attr("class","arc")
        .on("mouseover",function(d, i){
        console.log(dataset.tweet[i][0])
        var mouseVal = d3.mouse(this);
        div.style("display","none");
        div
        .html("<strong><span style='font-family: DIN Condensed; font-size: 1.6em'>HILLARY CLINTON</span></strong>" + "</br>"  + dataset.name[i] + " " + ":" + " " + dataset.pol[i] + "%"+ "</br>" + "</br>" + dataset.tweet[i][0])
        // .style("left", (d3.event.pageX-300) + "px")
        // .style("top", (d3.event.pageY-10) + "px")
        // .style("opacity", 1)
        .style("display","block");
        })
        // .on("mouseout",function(){div.html(" ").style("display","none");})
            

        


        setTimeout(function(){

        g.append("path")
            .attr("d", arc)
            .data(pie(dataset.pol))
            .attr("fill", function(d, i) { return color(i); })
            
            .transition().delay(function(d, i) { return i * 100; }).duration(500)
            .attrTween('d', function(d) {
                 var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
                 return function(t) {
                     d.endAngle = i(t);
                   return arc(d);
                 }
            })

            svg.append("text")
            .text("Hillary Clinton")
            .attr("x", "-50")
            .attr("y", "80")
            .style("font-size", "16px")
            }, 2500);
        
           

});

//-------------------------------------------------------------------------
//  TED CRUZ ON CLIMATE CHANGE
//-------------------------------------------------------------------------

d3.csv("data/cruz.csv", function(data) {

    var negative = [];
    var positive = [];
    var neutral = [];
         
         for(var i = 0; i < data.length; i++){
            if(data[i]['score'] > 0){
              positive.push({
                  "score" : data[i].score,     
                  "name"  : data[i].screen_name,
                  "text"  : data[i].text,
                  "time"  : data[i].time
                });

            } else if(data[i]['score']==0){
              neutral.push(
                {
                  "score" : data[i].score,     
                  "name"  : data[i].screen_name,
                  "text"  : data[i].text,
                  "time"  : data[i].time
                });

            } else{
              negative.push({
                  "score" : data[i].score,     
                  "name"  : data[i].screen_name,
                  "text"  : data[i].text,
                  "time"  : data[i].time
                });
            }
          }

        var negt = [];
        var post = [];
        var neut = [];

        for (var j = 0; j < positive.length; j++){     
        var posName = positive[j].name;
            post[j] = positive[j].text;
        }


        for (var j = 0; j < negative.length; j++){    
        var negName = negative[j].name;      
            negt[j] = negative[j].text;      
        }


        for (var j = 0; j < neutral.length; j++){    
        var neuName = neutral[j].name;      
            neut[j] = neutral[j].text;      
        }

        var negp = Math.round((negative.length / data.length) * 100, 2);
        var neup = Math.round((neutral.length / data.length) * 100, 2);
        var posp = Math.round((positive.length / data.length) * 100, 2);


        var dataset = {
              pol: [ negp , neup, posp],
              tweet : [negt, neut, post],
              name: ["NEGATIVE", "NEUTRAL", "POSITIVE"],
          };

        var width = 200,
            height = 200,
            radius = Math.min(width, height) / 2;

        var color = d3.scale.ordinal().range(["#82193f", "#0d5d7a", "#1da8a8"]);

        var pie = d3.layout.pie()
            .sort(null);

        var arc = d3.svg.arc()
            .innerRadius(radius - 30)
            .outerRadius(radius - 7);

        var svg = d3.select("#cruz").append("svg")
            .attr("width", width + 30)
            .attr("height", height + 30)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        
         div = d3.select("body")
        .append("div")     
        .attr("class", "tooltip")
        .attr("id", "tip");

        
        var g = svg.selectAll(".arc")
        .data(pie(dataset.pol))
        .data(pie(dataset.tweet))
        .enter()
        .append("g")
        .attr("class","arc")
        .on("mouseover",function(d, i){
        var mouseVal = d3.mouse(this);
        div.style("display","none");
        div
        .html("<strong><span style='font-family: DIN Condensed; font-size: 1.6em'>TED CRUZ</span></strong>" + "</br>"  + dataset.name[i] + " " + ":" + " " + dataset.pol[i] + "%"+ "</br>" + "</br>" + dataset.tweet[i][0])
        .style("display","block");
        })

        setTimeout(function(){

        g.append("path")
            .attr("d", arc)
            .data(pie(dataset.pol))
            .attr("fill", function(d, i) { return color(i); })
            
            .transition().delay(function(d, i) { return i * 100; }).duration(500)
            .attrTween('d', function(d) {
                 var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
                 return function(t) {
                     d.endAngle = i(t);
                   return arc(d);
                 }
            })
             svg.append("text")
            .text("Ted Cruz")
            .attr("x", "-30")
            .attr("y", "120")
            .style("font-size", "16px")
            }, 3500);

});

//-------------------------------------------------------------------------
//  TRUMP ON CLIMATE CHANGE
//-------------------------------------------------------------------------

d3.csv("data/trump.csv", function(data) {

    var negative = [];
    var positive = [];
    var neutral = [];
         
         for(var i = 0; i < data.length; i++){
            if(data[i]['score'] > 0){
              positive.push({
                  "score" : data[i].score,     
                  "name"  : data[i].screen_name,
                  "text"  : data[i].text,
                  "time"  : data[i].time
                });

            } else if(data[i]['score']==0){
              neutral.push(
                {
                  "score" : data[i].score,     
                  "name"  : data[i].screen_name,
                  "text"  : data[i].text,
                  "time"  : data[i].time
                });

            } else{
              negative.push({
                  "score" : data[i].score,     
                  "name"  : data[i].screen_name,
                  "text"  : data[i].text,
                  "time"  : data[i].time
                });
            }
          }

        var negt = [];
        var post = [];
        var neut = [];

        for (var j = 0; j < positive.length; j++){     
        var posName = positive[j].name;
            post[j] = positive[j].text;
        }


        for (var j = 0; j < negative.length; j++){    
        var negName = negative[j].name;      
            negt[j] = negative[j].text;      
        }


        for (var j = 0; j < neutral.length; j++){    
        var neuName = neutral[j].name;      
            neut[j] = neutral[j].text;      
        }

        var negp = Math.round((negative.length / data.length) * 100, 2);
        var neup = Math.round((neutral.length / data.length) * 100, 2);
        var posp = Math.round((positive.length / data.length) * 100, 2);


        var dataset = {
              pol: [ negp , neup, posp],
              tweet : [negt, neut, post],
              name: ["NEGATIVE", "NEUTRAL", "POSITIVE"],
          };

        var width = 150,
            height = 150,
            radius = Math.min(width, height) / 2;

        var color = d3.scale.ordinal().range(["#82193f", "#0d5d7a", "#1da8a8"]);

        var pie = d3.layout.pie()
            .sort(null);

       var arc = d3.svg.arc()
            .innerRadius(radius - 30)
            .outerRadius(radius - 7);

        var svg = d3.select("#trump").append("svg")
            .attr("width", width + 30)
            .attr("height", height + 30)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
            
        div = d3.select("body")
        .append("div")     
        .attr("class", "tooltip")
        .attr("id", "tip");

        
        var g = svg.selectAll(".arc")
        .data(pie(dataset.pol))
        .data(pie(dataset.tweet))
        .enter()
        .append("g")
        .attr("class","arc")
        .on("mouseover",function(d, i){
        var mouseVal = d3.mouse(this);
        div.style("display","none");
        div
        .html("<strong><span style='font-family: DIN Condensed; font-size: 1.6em'>DONALD TRUMP</span></strong>" + "</br>"  + dataset.name[i] + " " + ":" + " " + dataset.pol[i] + "%"+ "</br>" + "</br>" + dataset.tweet[i][0])
        .style("display","block");
        })

        setTimeout(function(){

        g.append("path")
            .attr("d", arc)
            .data(pie(dataset.pol))
            .attr("fill", function(d, i) { return color(i); })
            
            .transition().delay(function(d, i) { return i * 100; }).duration(500)
            .attrTween('d', function(d) {
                 var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
                 return function(t) {
                     d.endAngle = i(t);
                   return arc(d);
                 }
            })

            svg.append("text")
            .text("Donald Trump")
            .attr("x", "-50")
            .attr("y", "95")
            .style("font-size", "16px")
        }, 4500); 


});

//-------------------------------------------------------------------------
//  SARAH PALIN ON CLIMATE CHANGE
//-------------------------------------------------------------------------

d3.csv("data/palin.csv", function(data) {

    var negative = [];
    var positive = [];
    var neutral = [];
         
         for(var i = 0; i < data.length; i++){
            if(data[i]['score'] > 0){
              positive.push({
                  "score" : data[i].score,     
                  "name"  : data[i].screen_name,
                  "text"  : data[i].text,
                  "time"  : data[i].time
                });

            } else if(data[i]['score']==0){
              neutral.push(
                {
                  "score" : data[i].score,     
                  "name"  : data[i].screen_name,
                  "text"  : data[i].text,
                  "time"  : data[i].time
                });

            } else{
              negative.push({
                  "score" : data[i].score,     
                  "name"  : data[i].screen_name,
                  "text"  : data[i].text,
                  "time"  : data[i].time
                });
            }
          }

        var negt = [];
        var post = [];
        var neut = [];

        for (var j = 0; j < positive.length; j++){     
        var posName = positive[j].name;
            post[j] = positive[j].text;
        }


        for (var j = 0; j < negative.length; j++){    
        var negName = negative[j].name;      
            negt[j] = negative[j].text;      
        }


        for (var j = 0; j < neutral.length; j++){    
        var neuName = neutral[j].name;      
            neut[j] = neutral[j].text;      
        }

        var negp = Math.round((negative.length / data.length) * 100, 2);
        var neup = Math.round((neutral.length / data.length) * 100, 2);
        var posp = Math.round((positive.length / data.length) * 100, 2);


        var dataset = {
              pol: [ negp , neup, posp],
              tweet : [negt, neut, post],
              name: ["NEGATIVE", "NEUTRAL", "POSITIVE"],
          };

        var width = 130,
            height = 130,
            radius = Math.min(width, height) / 2;

        var color = d3.scale.ordinal().range(["#82193f", "#0d5d7a", "#1da8a8"]);

        var pie = d3.layout.pie()
            .sort(null);

       var arc = d3.svg.arc()
            .innerRadius(radius - 30)
            .outerRadius(radius - 7);

        var svg = d3.select("#palin").append("svg")
            .attr("width", width + 30)
            .attr("height", height + 30)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
            
        div = d3.select("body")
        .append("div")     
        .attr("class", "tooltip")
        .attr("id", "tip");

        
        var g = svg.selectAll(".arc")
        .data(pie(dataset.pol))
        .data(pie(dataset.tweet))
        .enter()
        .append("g")
        .attr("class","arc")
        .on("mouseover",function(d, i){
        var mouseVal = d3.mouse(this);
        div.style("display","none");
        div
        .html("<strong><span style='font-family: DIN Condensed; font-size: 1.6em'>SARAH PALIN</span></strong>" + "</br>"  + dataset.name[i] + " " + ":" + " " + dataset.pol[i] + "%"+ "</br>" + "</br>" + dataset.tweet[i][0])
        .style("display","block");
        })

        setTimeout(function(){

        g.append("path")
            .attr("d", arc)
            .data(pie(dataset.pol))
            .attr("fill", function(d, i) { return color(i); })
            
            .transition().delay(function(d, i) { return i * 100; }).duration(500)
            .attrTween('d', function(d) {
                 var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
                 return function(t) {
                     d.endAngle = i(t);
                   return arc(d);
                 }
            })

            svg.append("text")
            .text("Sarah Palin")
            .attr("x", "-40")
            .attr("y", "85")
            .style("font-size", "16px")
        }, 5500); 


});