      
// window.onopen = function(e){


      var negative = [];
      var positive = [];
      var neutral = [];


      d3.csv("data/tweets.csv", function(data) {


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

      var arr1 = [];
      var arr2 = [];

      for (var j = 0; j < 5; j++){     
      var posName = positive[j].name,
          posTime = positive[j].time;
          arr1[j] = positive[j].text;
      }

      for (var j = 0; j < 5; j++){ 
      $('#pos p').append(arr1[j] + "<br>"); 
      
      }

      for (var j = 0; j < 5 ; j++){    
      var negName = negative[j].name;     
      var negTime = negative[j].time;  
      arr2[j] = negative[j].text;      
     }
     

     for (var j = 0; j < 5; j++){ 
     $('#neg p').append(arr2[j] + "<br>"); 
      
     }


      var negp = Math.round((negative.length / data.length) * 100, 2);
      var neup = Math.round((neutral.length / data.length) * 100, 2);
      var posp = Math.round((positive.length / data.length) * 100, 2);
   

      var margins = {
          top: 40,
          left: 0,
          right: 0,
          // bottom: 100
      },

   

          width = 1435,
          height = 140,


          // text = d3.select('#neg')
          //       .html(function(data){ return data[i]['text']})

          dataset = [{
              data: [{count : negp}],
              // text : [{text : negative.}]
              name: 'Negative'
          }, {
              data: [{count : neup}],
              name: 'Neutral'
          },{
              data: [{count : posp}],
              name: 'Positive'
          }
          ],

          series = dataset.map(function (d) {  return d.name;}),
          dataset = dataset.map(function (d) {
              return d.data.map(function (o, i) {
                  return {
                      y: o.count
                  };
              });
          }),
          stack = d3.layout.stack();

          stack(dataset);
          // console.log(series);

      var dataset = dataset.map(function (group) {
          return group.map(function (d) {
              // Invert the x and y values, and y0 becomes x0
              return {

                 x: d.y,
                 y: d.x,
                 x0: d.y0
                 // name : series

              };
              
          });

          // dataset.map(function (d) { console.log(d.name); return d.name;})
      }),
          svg = d3.select('#bars')
              .append('svg')
              .attr('width', width)
              .attr('height', height)
              .append('g')
              .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')')

              xMax = d3.max(dataset, function (group) {
        
              return d3.max(group, function (d) {
                  return d.x + d.x0;
              });

          }),

          xScale = d3.scale.linear()
              .domain([0, xMax])
              .range([0, width]),
          months = dataset[0].map(function (d) {
              return d.y;
          }),
          yScale = d3.scale.ordinal()
              .domain(months)
              .rangeRoundBands([0, height], .1),
        
          colours = d3.scale.ordinal().range(["#82193f", "#0d5d7a", "#1da8a8"]);

          groups = svg.selectAll('g')
              .data(dataset)
              .enter()
              .append('g')
              .style('fill', function (d, i) {
              return colours(i);
          }),

          rects = groups.selectAll('rect')
              .data(function (d) {return d;})
              .enter()
              .append('rect')
              .attr('x', function (d) {return xScale(d.x0);})
              .attr('y', function (d, i) {return yScale(d.y);})
              .attr('height', function (d) {return yScale.rangeBand();})
              .attr('width', 50)
              .transition()
              .delay(1000)
              .duration(2000)
         
              .attr('height', function (d) {return yScale.rangeBand();})
              .attr('width', function (d) {return xScale(d.x);})



        // document.getElementById("bars").addEventListener('click', function (){
          // console.log('aaa');
           setTimeout(function animate_tweet (){
           groups.selectAll(".bartext")
                .data(function (d) {return d;})
                .enter()
                .append("text")
                .attr("class", "bartext")
                .attr("x", function(d) {return (xScale(d.x0) + width/2 -655)})
                .attr("y", function(d, i) { return yScale(d.y) + height/2.5})
                .text(function(d) { return (d.x + '%') ;});
          }, 3500);    
        // },false);
       
     


})
// }
     