
//get data
prevalence.sort(function(a,b){return b.value - a.value;});
intensity.sort(function(a,b){return b.value - a.value;});
var data = prevalence;

var yScale = function(d,i) {
  return i * 30;
};

//do stuff with data

var svg = d3.select('body')
  .append('svg')
  .attr('width', 1000)
  .attr('height', 3000);

var groups = svg
  .selectAll('g')
  .data(data, state);

groups.enter()
  .append('g')
  .append('rect')
  .attr('y', yScale)
  .attr('class', 'bar')
  .attr('width', function(d) {
    return d.value * 10 + 'px';
  });

var bars = groups.selectAll('rect');

groups.append('text')
  .attr('y', function(d,i) {return yScale(d,i) + 17;})
  .text(function(d){return d.state;});

var showIntensity = function() {
  bars.data(intensity, state)
      .transition()
      .attr('width',function(d){ return d.value * 30 + 'px'; })
      .duration(1500);

  setTimeout(barSort, 2000);
};

var barSort = function() {
  groups.data(intensity, state)
        .transition()
        .duration(1000)
        .attr('transform',function(d,i){
          var currentY = $(this).position().top;
          var yTrans = yScale(d,i) - currentY + 30;
          return 'translate(0,' + yTrans + ')';
        });
};

function state(d) {
  return d.state;
}
