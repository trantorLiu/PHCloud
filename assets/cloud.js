$(function() {
  var cloud = d3.layout.cloud;

  var layout = cloud()
      .size([$(window).width() - 20, $(window).height() - 60]) // Minus 60px for footer
      .words(phcloud.keywords)
      .padding(5)
      .rotate(function() { return getRandomInt(-2, 2) * 30; })
      .font("Impact")
      .fontSize(function(d) { return d.score / 300 * 120 + 20; })
      .on("end", draw);

  function draw(words) {
    d3.select("body .cloud").append("svg")
        .attr("width", layout.size()[0])
        .attr("height", layout.size()[1])
      .append("g")
        .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Impact")
        .style("fill", function(d, i) { return phcloud.color(i % 5); })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  layout.start();

});