goog.provide('anychart.ganttModule.CollapseButton');

goog.require('anychart.core.ui.Button');



/**
 * Collapse-expand button customization.
 * @param {anychart.ganttModule.DataGrid} dataGrid - Parent data grid.
 * @constructor
 * @extends {anychart.core.ui.Button}
 */
anychart.ganttModule.CollapseButton = function(dataGrid) {
  anychart.ganttModule.CollapseButton.base(this, 'constructor');

  /**
   * Own data grid.
   * @type {anychart.ganttModule.DataGrid}
   * @private
   */
  this.dataGrid_ = dataGrid;

  /**
   * Flag if button is in collapsed state.
   * @type {boolean}
   * @private
   */
  this.collapsed_ = false;

  /**
   * Index of data item to be expanded/collapsed.
   * @type {number}
   * @private
   */
  this.dataItemIndex_ = -1;

  this.suspendSignalsDispatching();
  this
      .width(anychart.ganttModule.CollapseButton.DEFAULT_BUTTON_SIDE)
      .height(anychart.ganttModule.CollapseButton.DEFAULT_BUTTON_SIDE)
      .supportedStates(anychart.core.ui.Button.State.CHECKED, false);

  this['hAlign']('center');
  this['vAlign']('middle');

  //this.backgroundPath.stroke('red');

  this['text']('-');
  this.resumeSignalsDispatching(false);

  //Listens itself to process 'hover' and 'press' button decorations correctly.
  this.listenSignals(function() {
    this.draw();
  });

  this.setParentEventTarget(this.dataGrid_);

};
goog.inherits(anychart.ganttModule.CollapseButton, anychart.core.ui.Button);


/**
 * Default side size of expand-collapse button.
 * @type {number}
 */
anychart.ganttModule.CollapseButton.DEFAULT_BUTTON_SIDE = 15;


/**
 * Handler for mouse up.
 * @param {acgraph.events.BrowserEvent} event - Event.
 * @override
 */
anychart.ganttModule.CollapseButton.prototype.handleMouseUp = function(event) {
  anychart.ganttModule.CollapseButton.base(this, 'handleMouseUp', event);
  this.switchState();
};


/**
 * Gets/sets state of button.
 * @param {boolean=} opt_value - Value to be set.
 * @return {(anychart.ganttModule.CollapseButton|boolean)} - Current value or itself for method chaining.
 */
anychart.ganttModule.CollapseButton.prototype.collapsed = function(opt_value) {
  if (goog.isDef(opt_value)) {
    if (this.collapsed_ != opt_value) {
      this.collapsed_ = opt_value;
      this['text'](this.collapsed_ ? '+' : '-');
    }
    return this;
  }
  return this.collapsed_;
};


/**
 * Gets/sets data item index.
 * @param {number=} opt_value - Value to be set.
 * @return {(anychart.ganttModule.CollapseButton|number)} - Current value or itself for method chaining.
 */
anychart.ganttModule.CollapseButton.prototype.dataItemIndex = function(opt_value) {
  if (goog.isDef(opt_value)) {
    this.dataItemIndex_ = opt_value;
    return this;
  }
  return this.dataItemIndex_;
};


/**
 * Switches button state on button click.
 */
anychart.ganttModule.CollapseButton.prototype.switchState = function() {
  this.collapsed(!this.collapsed());
  this.dataGrid_.collapseExpandItem(this.dataItemIndex_, this.collapsed_);
};
