goog.provide('anychart.ui.chartEditor2.PlotPanel');

goog.require('anychart.ui.chartEditor2.MenuItemWithTwoValues');
goog.require('anychart.ui.chartEditor2.SeriesPanel');
goog.require('goog.ui.Component');



/**
 * @constructor
 * @extends {goog.ui.Component}
 */
anychart.ui.chartEditor2.PlotPanel = function(dataModel, chartType, index) {
  anychart.ui.chartEditor2.PlotPanel.base(this, 'constructor');

  /**
   * @type {anychart.ui.chartEditor2.DataModel}
   * @private
   */
  this.dataModel_ = dataModel;

  this.type_ = chartType;

  this.index_ = index;

  this.series_ = [];
};
goog.inherits(anychart.ui.chartEditor2.PlotPanel, goog.ui.Component);


/** @inheritDoc */
anychart.ui.chartEditor2.PlotPanel.prototype.createDom = function() {
  anychart.ui.chartEditor2.PlotPanel.base(this, 'createDom');

  goog.dom.classlist.add(this.getElement(), 'plot-panel');
  goog.dom.classlist.add(this.getElement(), 'plot-panel-' + this.type_);
  goog.dom.classlist.add(this.getElement(), 'closable');

  var dom = this.getDomHelper();
  if (this.type_ == 'stock' && this.index_ > 0) {
    this.close_ = dom.createDom(goog.dom.TagName.DIV, 'close', 'X');
    this.getElement().appendChild(this.close_);
  }

  this.title_ = dom.createDom(goog.dom.TagName.H2, 'title', 'Plot ' + (this.index_ + 1));
  this.getElement().appendChild(this.title_);

  // X Values Input
  this.xInput_ = new goog.ui.Select();
  this.addChild(this.xInput_, true);

  this.addSeriesBtn_ = new goog.ui.Button('Add series');
  this.addChild(this.addSeriesBtn_, true);

  this.addSeries_(this.getDefaultSeriesType_());
};


anychart.ui.chartEditor2.PlotPanel.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  this.getHandler().listen(this.addSeriesBtn_, goog.ui.Component.EventType.ACTION, this.onAddSeries_);
  this.listen(anychart.ui.chartEditor2.events.EventType.CLOSE_PANEL, this.onCloseSeries_);
  if (this.close_)
    this.getHandler().listen(this.close_, goog.events.EventType.CLICK, this.onClose_);
  this.getHandler().listen(this.dataModel_, anychart.ui.chartEditor2.events.EventType.UPDATE_DATA_MODEL, this.update);

  this.update(null);
};


anychart.ui.chartEditor2.PlotPanel.prototype.update = function(evt) {
  var data = this.dataModel_.getPreparedData();

  for (var a = this.xInput_.getItemCount(); a--;) {
    this.xInput_.removeItemAt(a);
  }

  for(var i = 0; i < data.length; i++) {
    var fields = data[i]['fields'];
    for(var j = 0; j < fields.length; j++) {
      var caption = data.length == 1 ? fields[j]['name'] : data[i]['name'] + ' - ' + fields[j]['name'];
      var item = new anychart.ui.chartEditor2.MenuItemWithTwoValues(caption, fields[j]['key'], data[i]['setId']);
      this.xInput_.addItem(item);
    }
  }

  // todo: Do more deliberate choice
  this.xInput_.setSelectedIndex(0);
};


anychart.ui.chartEditor2.PlotPanel.prototype.index = function(opt_value) {
  if (goog.isDef(opt_value)) {
    if (goog.isNumber(opt_value)) {
      this.index_ = opt_value;
      this.title_.innerHTML = this.type_ + ' plot ' + (this.index_ + 1);
    }
    return this;
  }
  return this.index_;
};


anychart.ui.chartEditor2.PlotPanel.prototype.addSeries_ = function(seriesType) {
  var series = new anychart.ui.chartEditor2.SeriesPanel(seriesType, this.series_.length);
  this.series_.push(series);
  this.addChildAt(series, this.getChildCount() - 1, true);
};


anychart.ui.chartEditor2.PlotPanel.prototype.onAddSeries_ = function(evt) {
  this.addSeries_(this.getDefaultSeriesType_());
};


anychart.ui.chartEditor2.PlotPanel.prototype.onCloseSeries_ = function(evt) {

  if (evt.panelType == 'series') {
    var series = goog.array.splice(this.series_, evt.index, 1)[0];
    this.removeChild(series, true);
    series.dispose();

    for (var i = 0; i < this.series_.length; i++) {
      this.series_[i].index(i);
    }
  }
};


anychart.ui.chartEditor2.PlotPanel.prototype.getDefaultSeriesType_ = function() {
  return 'line';
};


anychart.ui.chartEditor2.PlotPanel.prototype.onClose_ = function(evt) {
  this.dispatchEvent({
    type: anychart.ui.chartEditor2.events.EventType.CLOSE_PANEL,
    panelType: 'plot',
    index: this.index_
  })
};