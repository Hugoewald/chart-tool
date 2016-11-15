var version = {
  version: require('../../../package.json').version,
  build: require('../../../package.json').buildver
};

var settings = require('../../../custom/chart-tool-config.json');

module.exports = {

  CUSTOM: settings.CUSTOM,
  version: version.version,
  build: version.build,
  id: '',
  data: '',
  dateFormat: settings.dateFormat,
  timeFormat: settings.timeFormat,
  image: settings.image,
  heading: '',
  qualifier: '',
  source: '',
  deck: '',
  index: '',
  hasHours: false,
  social: settings.social,
  seriesHighlight: function() {
    if (this.data.seriesAmount && this.data.seriesAmount <= 1) {
      return 1;
    } else {
      return 0;
    }
  },
  baseClass: function() { return this.prefix + 'chart'; },
  customClass: '',

  options: {
    type: 'line',
    interpolation: 'linear',
    stacked: false,
    expanded: false,
    head: true,
    deck: false,
    qualifier: true,
    legend: true,
    footer: true,
    x_axis: true,
    y_axis: true,
    tips: false,
    annotations: false,
    range: false,
    series: false,
    share_data: true,
    social: true
  },

  range: {},
  series: {},
  xAxis: settings.xAxis,
  yAxis: settings.yAxis,

  exportable: false, // this can be overwritten by the backend as needed
  editable: false,

  prefix: settings.prefix,
  debounce: settings.debounce,
  tipTimeout: settings.tipTimeout,
  monthsAbr: settings.monthsAbr,

  dimensions: {
    width: 0,
    computedWidth: function() {
      return this.width - this.margin.left - this.margin.right;
    },
    height: function() {
      var ratioScale = d3.scale.linear().range([300, 900]).domain([this.width * this.ratioMobile, this.width * this.ratioDesktop]);
      return Math.round(ratioScale(this.width));
    },
    computedHeight: function() {
      return (this.height() - this.headerHeight - this.footerHeight - this.margin.top - this.margin.bottom);
    },
    ratioMobile: settings.ratioMobile,
    ratioDesktop: settings.ratioDesktop,
    margin: settings.margin,
    tipPadding: settings.tipPadding,
    tipOffset: settings.tipOffset,
    headerHeight: 0,
    footerHeight: 0,
    xAxisHeight: 0,
    yAxisHeight: function() {
      return (this.computedHeight() - this.xAxisHeight);
    },
    xAxisWidth: 0,
    labelWidth: 0,
    yAxisPaddingRight: settings.yAxis.paddingRight,
    tickWidth: function() {
      return (this.computedWidth() - (this.labelWidth + this.yAxisPaddingRight));
    },
    barHeight: settings.barHeight,
    bands: {
      padding: settings.bands.padding,
      offset: settings.bands.offset,
      outerPadding: settings.bands.outerPadding
    }
  }

};
