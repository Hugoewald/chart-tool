function StreamgraphChart(node, obj) {

  var axisModule = require("../components/axis"),
      scaleModule = require("../components/scale"),
      Axis = axisModule.axisManager,
      Scale = scaleModule.scaleManager;

  //  scales
  var xScaleObj = new Scale(obj, "xAxis"),
      yScaleObj = new Scale(obj, "yAxis"),
      xScale = xScaleObj.scale, yScale = yScaleObj.scale;

  // axes
  var xAxisObj = new Axis(node, obj, xScaleObj.scale, "xAxis"),
      yAxisObj = new Axis(node, obj, yScaleObj.scale, "yAxis");

  axisModule.axisCleanup(node, obj, xAxisObj, yAxisObj);

  if (xScaleObj.obj.type === "ordinal") {
    xScale.rangeRoundPoints([0, obj.dimensions.tickWidth()], 1.0);
  }

  var seriesGroup = node.append("g")
    .attrs({
      "class": obj.prefix + "series_group",
      "transform": function() {
        return "translate(" + (obj.dimensions.computedWidth() - obj.dimensions.tickWidth()) + ",0)"
    }});

  // Add a group for each cause.
  var series = seriesGroup.selectAll("g." + obj.prefix + "series")
    .data(obj.data.stackedData)
    .enter().append("g")
    .attr("class", function(d, i) { return obj.prefix + "series " + obj.prefix + "series_" + (i); });

  var area = d3.svg.area().interpolate(obj.options.interpolation)
    .x(function(d) { return xScale(d.x); })
    .y0(function(d) { return yScale(d.y0); })
    .y1(function(d) { return yScale(d.y0 + d.y); });

  var line = d3.svg.line().interpolate(obj.options.interpolation)
    .x(function(d) { return xScale(d.x); })
    .y(function(d) { return yScale(d.y0 + d.y); });

  series.append("path")
    .attr("class", function(d, i) {
      var output = obj.prefix + "stream-series " + obj.prefix + "stream-" + (i);
      if (i === obj.seriesHighlight()) {
        output = obj.prefix + "stream-series " + obj.prefix + "stream-" + (i) + " " + obj.prefix + "highlight";
      }
      return output;
    })
    .attr("d", area);

  series.append("path")
    .attr("class", function() { return obj.prefix + "stream-series " + obj.prefix + "line"; })
    .attr("d", line);

  axisModule.addZeroLine(obj, node, yAxisObj, "yAxis");

  return {
    xScaleObj: xScaleObj,
    yScaleObj: yScaleObj,
    xAxisObj: xAxisObj,
    yAxisObj: yAxisObj,
    seriesGroup: seriesGroup,
    series: series,
    line: line,
    area: area
  };

};

module.exports = StreamgraphChart;
