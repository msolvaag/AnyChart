goog.provide('anychart.ganttModule.Column');

goog.require('anychart.core.VisualBase');
goog.require('anychart.core.ui.LabelsFactory');
goog.require('anychart.core.ui.Title');
goog.require('anychart.ganttModule.CollapseButton');
goog.require('anychart.math.Rect');



/**
 * Data grid column.
 * 1) Has own labels factory.
 * 2) Has own index in data grid.
 * 3) Has own clip bounds.
 * 4) Has title.
 * 5) Has vertical offset.
 *
 * @param {anychart.ganttModule.DataGrid} dataGrid - Column's data grid.
 *
 * @constructor
 * @extends {anychart.core.VisualBase}
 */
anychart.ganttModule.Column = function(dataGrid) {
  anychart.ganttModule.Column.base(this, 'constructor');

  /**
   * Data grid of column.
   * @type {anychart.ganttModule.DataGrid}
   * @private
   */
  this.dataGrid_ = dataGrid;

  /**
   * Column's labels factory.
   * @type {anychart.core.ui.LabelsFactory}
   * @private
   */
  this.labels_ = null;

  /**
   * Base layer to be clipped.
   * @type {acgraph.vector.Layer}
   * @private
   */
  this.base_ = null;

  /**
   * Title layer.
   * @type {acgraph.vector.Layer}
   * @private
   */
  this.titleLayer_ = null;

  /**
   * Cells layer.
   * @type {acgraph.vector.Layer}
   * @private
   */
  this.cellsLayer_ = null;

  /**
   * Title.
   * @type {anychart.core.ui.Title}
   * @private
   */
  this.title_ = null;

  /**
   * Title path.
   * NOTE:
   *  This path is added here despite we already have headerPath in data grid.
   *  It will be filled with the same fill as DG's header path.
   *  These paths have different purposes:
   *  - this title path covers labels during the scrolling.
   *  - data grid's headerPath just lingers a header in data grid's width to fill a visible gap in gantt diagram.
   * @type {acgraph.vector.Path}
   * @private
   */
  this.titlePath_ = null;

  /**
   * Clip bounds.
   * @type {anychart.math.Rect}
   * @private
   */
  this.clip_ = null;

  /**
   * Width of column.
   * @type {(string|number)}
   * @private
   */
  this.width_ = 0;

  /**
   * Height of column.
   * @type {(string|number)}
   * @private
   */
  this.height_ = 0;

  /**
   * Default column width.
   * @type {number}
   * @private
   */
  this.defaultWidth_;

  /**
   * Pixel bounds cache.
   * @type {anychart.math.Rect}
   * @private
   */
  this.pixelBoundsCache_ = null;

  /**
   * Function that returns a text value for the cell by data item.
   * @type {function(anychart.treeDataModule.Tree.DataItem=):string}
   * @private
   */
  this.format_ = this.defaultFormat_;

  /**
   * Multiplier to choose a left padding in a cell depending on a tree data item's depth.
   * Used to highlight a hierarchy of data items.
   * Overall left padding will be calculated as anychart.ganttModule.DataGrid.DEFAULT_PADDING + depthPaddingMultiplier_ * item.meta('depth');
   * @type {number}
   * @private
   */
  this.depthPaddingMultiplier_ = 0;

  /**
   * Flag if collapse/expand buttons must be used.
   * @type {boolean}
   * @private
   */
  this.collapseExpandButtons_ = false;

  /**
   * Pool of collapse/expand buttons.
   * @type {Array.<anychart.ganttModule.CollapseButton>}
   * @private
   */
  this.buttons_ = [];


  /**
   * @type {function(string):(undefined|Object.<string, *>)}
   * @private
   */
  this.onEdit_ = goog.nullFunction;

  /**
   * Labels text values.
   * @type {Array<string>}
   * @private
   */
  this.labelsTexts_ = [];

  /**
   * Function that overrides text settings for label.
   * @type {function(anychart.core.ui.LabelsFactory.Label, anychart.treeDataModule.Tree.DataItem)}
   * @private
   */
  this.cellTextSettingsOverrider_ = this.defaultCellTextSettingsOverrider_;

  this.setParentEventTarget(this.dataGrid_);

  /*
    Enabling/disabling column makes data grid redraw.
    When column is just created, we suppose it is enabled to avoid unnecessary data grid redraw.
   */
  this.markConsistent(anychart.ConsistencyState.ENABLED);

};
goog.inherits(anychart.ganttModule.Column, anychart.core.VisualBase);


/**
 * Supported consistency states.
 * @type {number}
 */
anychart.ganttModule.Column.prototype.SUPPORTED_CONSISTENCY_STATES =
    anychart.core.VisualBase.prototype.SUPPORTED_CONSISTENCY_STATES |
    anychart.ConsistencyState.APPEARANCE |
    anychart.ConsistencyState.DATA_GRID_COLUMN_TITLE |
    anychart.ConsistencyState.DATA_GRID_COLUMN_POSITION |
    anychart.ConsistencyState.DATA_GRID_COLUMN_BUTTON_CURSOR;


/**
 * Supported consistency states.
 * @type {number}
 */
anychart.ganttModule.Column.prototype.SUPPORTED_SIGNALS = anychart.core.VisualBase.prototype.SUPPORTED_SIGNALS;


/**
 * Labels factory z-index.
 * @type {number}
 */
anychart.ganttModule.Column.LF_Z_INDEX = 0;


/**
 * Buttons z-index.
 * @type {number}
 */
anychart.ganttModule.Column.BUTTONS_Z_INDEX = 10;


/**
 * Sets column format.
 * @param {string} fieldName - Name of field of data item to work with.
 * @param {anychart.enums.ColumnFormats|Object} presetOrSettings - Preset or custom column format.
 * @return {anychart.ganttModule.Column} - Itself for method chaining.
 */
anychart.ganttModule.Column.prototype.setColumnFormat = function(fieldName, presetOrSettings) {
  var settings = goog.isString(presetOrSettings) ? this.dataGrid_.getColumnFormatByName(presetOrSettings) : presetOrSettings;
  if (goog.isObject(settings)) {
    this.suspendSignalsDispatching();

    var formatter = settings['formatter'];
    var width = settings['width'];
    var textStyle = settings['textStyle'];

    if (goog.isDef(formatter)) this.labels().format(function() {
      var item = this['item'];
      return formatter(item.get(fieldName));
    });

    if (goog.isDef(width)) this.width(width).defaultWidth(width);

    if (goog.isDef(textStyle)) this.labels().textSettings(textStyle);

    this.resumeSignalsDispatching(true);
  }
  return this;
};


/**
 * Default function that returns a text value for the cell by data item.
 * @param {anychart.treeDataModule.Tree.DataItem=} opt_item - Context.
 * @return {string} - Text value.
 * @private
 */
anychart.ganttModule.Column.prototype.defaultFormat_ = function(opt_item) {
  return '';
};


/**
 * Gets/sets multiplier to choose a left padding in a cell depending on a tree data item's depth.
 * Used to highlight a hierarchy of data items.
 * Overall left padding will be calculated as anychart.ganttModule.DataGrid.DEFAULT_PADDING + depthPaddingMultiplier_ * item.meta('depth');
 * @param {number=} opt_value - Value to be set.
 * @return {(number|anychart.ganttModule.Column)} - Current value or itself for method chaining.
 */
anychart.ganttModule.Column.prototype.depthPaddingMultiplier = function(opt_value) {
  if (goog.isDef(opt_value)) {
    if (this.depthPaddingMultiplier_ != opt_value) {
      this.depthPaddingMultiplier_ = opt_value;
      this.invalidate(anychart.ConsistencyState.DATA_GRID_COLUMN_POSITION, anychart.Signal.NEEDS_REDRAW);
    }
    return this;
  }
  return this.depthPaddingMultiplier_;
};


/**
 * Default cell text settings overrider.
 * @param {anychart.core.ui.LabelsFactory.Label} label - Incoming label.
 * @param {anychart.treeDataModule.Tree.DataItem} treeDataItem - Incoming tree data item.
 * @private
 */
anychart.ganttModule.Column.prototype.defaultCellTextSettingsOverrider_ = goog.nullFunction;


/**
 * @param {(string|Function)=} opt_value - Value.
 * @deprecated since 8.2.0 use column.labels().format() instead.
 * @return {(string|Function|anychart.ganttModule.Column)}
 */
anychart.ganttModule.Column.prototype.format = function(opt_value) {
  var l = /** @type {anychart.core.ui.LabelsFactory} */ (this.labels());
  return l.format(opt_value);
};


/**
 * Getter/setter for onEdit callback.
 * @param {(function(string):(undefined|Object.<string, *>))=} opt_value - onEdit callback.
 * @return {(function(string):(undefined|Object.<string, *>)|anychart.ganttModule.Column)}
 */
anychart.ganttModule.Column.prototype.onEdit = function(opt_value) {
  if (goog.isDef(opt_value)) {
    this.onEdit_ = opt_value;

    //Doesn't invalidate anything.
    return this;
  }
  return this.onEdit_;
};


/**
 * Gets/sets label factory to decorate cells.
 * @param {Object=} opt_value - Value to be set.
 * @return {(anychart.ganttModule.Column|anychart.core.ui.LabelsFactory)} - Current value or itself for method chaining.
 */
anychart.ganttModule.Column.prototype.labels = function(opt_value) {
  if (!this.labels_) {
    this.labels_ = new anychart.core.ui.LabelsFactory();
    this.labels_.container(this.getCellsLayer_());
    this.labels_.setParentEventTarget(this.dataGrid_.getBase());
    this.labels_.zIndex(anychart.ganttModule.Column.LF_Z_INDEX);
    this.labels_.listenSignals(this.labelsInvalidated_, this);

    this.labels_.setParentEventTarget(this);

    this.registerDisposable(this.labels_);
  }

  if (goog.isDef(opt_value)) {
    var redraw = true;
    if (anychart.utils.instanceOf(opt_value, anychart.core.ui.LabelsFactory)) {
      this.labels_.setup(opt_value.serialize());
    } else if (goog.isObject(opt_value)) {
      this.labels_.setup(opt_value);
    } else if (anychart.utils.isNone(opt_value)) {
      this.labels_.enabled(false);
    } else {
      redraw = false;
    }
    if (redraw) {
      //TODO (A.Kudryavtsev): WE invalidate position because labels factory work that way: must clear and redraw all labels.
      this.invalidate(anychart.ConsistencyState.DATA_GRID_COLUMN_POSITION, anychart.Signal.NEEDS_REDRAW);
    }
    return this;
  }
  return this.labels_;

};


/**
 * @deprecated since 8.2.0 use column.labels() instead.
 */
anychart.ganttModule.Column.prototype.cellTextSettings = anychart.ganttModule.Column.prototype.labels;


/**
 * Label invalidation handler.
 * @param {anychart.SignalEvent} event - Signal event.
 * @private
 */
anychart.ganttModule.Column.prototype.labelsInvalidated_ = function(event) {
  if (event.hasSignal(anychart.Signal.NEEDS_REDRAW)) {
    this.invalidate(anychart.ConsistencyState.DATA_GRID_COLUMN_POSITION, anychart.Signal.NEEDS_REDRAW);
  }
};


/**
 * Gets/sets cells text settings overrider.
 * @param {function(anychart.core.ui.LabelsFactory.Label, anychart.treeDataModule.Tree.DataItem)=} opt_value - New text settings
 *  overrider function.
 * @return {(anychart.ganttModule.Column|function(anychart.core.ui.LabelsFactory.Label, anychart.treeDataModule.Tree.DataItem))} - Current value or itself for method chaining.
 */
anychart.ganttModule.Column.prototype.cellTextSettingsOverrider = function(opt_value) {
  if (goog.isDef(opt_value)) {
    this.cellTextSettingsOverrider_ = opt_value;
    //TODO (A.Kudryavtsev): WE invalidate position because labels factory work that way: must clear and redraw all labels.
    this.invalidate(anychart.ConsistencyState.DATA_GRID_COLUMN_POSITION, anychart.Signal.NEEDS_REDRAW);
    return this;
  }
  return this.cellTextSettingsOverrider_;
};


/**
 * Gets/sets a flag if column must use expand/collapse buttons.
 * Do not export.
 * @param {boolean=} opt_value - Value to be set.
 * @return {(anychart.ganttModule.Column|boolean)} - Current value or itself for method chaining.
 */
anychart.ganttModule.Column.prototype.collapseExpandButtons = function(opt_value) {
  if (goog.isDef(opt_value)) {
    if (this.collapseExpandButtons_ != opt_value) {
      this.collapseExpandButtons_ = opt_value;
      this.invalidate(anychart.ConsistencyState.DATA_GRID_COLUMN_POSITION, anychart.Signal.NEEDS_REDRAW);
    }
    return this;
  }
  return this.collapseExpandButtons_;
};


/**
 * Gets/sets column title.
 * @param {(null|boolean|Object|string)=} opt_value - Value to be set.
 * @return {!(anychart.core.ui.Title|anychart.ganttModule.Column)} - Current value or itself for method chaining.
 */
anychart.ganttModule.Column.prototype.title = function(opt_value) {
  if (!this.title_) {
    this.title_ = new anychart.core.ui.Title();

    this.title_.suspendSignalsDispatching();
    this.title_
        .container(this.getTitleLayer_())
        .margin(0);
    this.title_['wordWrap']('normal');
    this.title_['wordBreak']('normal');
    this.title_['hAlign'](anychart.enums.HAlign.CENTER);
    this.title_['vAlign'](anychart.enums.VAlign.MIDDLE);
    this.title_.resumeSignalsDispatching(false);

    this.title_.listenSignals(this.titleInvalidated_, this);
    this.title_.setParentEventTarget(this);

    this.registerDisposable(this.title_);
  }

  if (goog.isDef(opt_value)) {
    this.suspendSignalsDispatching();
    this.title_.setup(opt_value);
    this.title_.container(this.getTitleLayer_());
    this.resumeSignalsDispatching(true);
    return this;
  } else {
    return this.title_;
  }
};


/**
 * Internal title invalidation handler.
 * @param {anychart.SignalEvent} event Event object.
 * @private
 */
anychart.ganttModule.Column.prototype.titleInvalidated_ = function(event) {
  if (event.hasSignal(anychart.Signal.NEEDS_REDRAW)) {
    this.dataGrid_.invalidate(anychart.ConsistencyState.APPEARANCE, anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED);
  }
};


/**
 * Inner getter for this.base_.
 * @return {acgraph.vector.Layer}
 * @private
 */
anychart.ganttModule.Column.prototype.getBase_ = function() {
  if (!this.base_) {
    this.base_ = /** @type {acgraph.vector.Layer} */ (acgraph.layer());
    this.registerDisposable(this.base_);
  }
  return this.base_;
};


/**
 * Inner getter for this.titleLayer_.
 * @return {acgraph.vector.Layer}
 * @private
 */
anychart.ganttModule.Column.prototype.getTitleLayer_ = function() {
  if (!this.titleLayer_) {
    this.titleLayer_ = /** @type {acgraph.vector.Layer} */ (acgraph.layer());
    this.registerDisposable(this.titleLayer_);
  }
  return this.titleLayer_;
};


/**
 * Getter for this.titlePath_.
 * @return {acgraph.vector.Path}
 * @private
 */
anychart.ganttModule.Column.prototype.getTitlePath_ = function() {
  if (!this.titlePath_) {
    this.titlePath_ = acgraph.path();
    this.getTitleLayer_().addChildAt(this.titlePath_, 0);
    this.titlePath_.fill(/** @type {acgraph.vector.Fill} */ (this.dataGrid_.resolveHeaderFill()));
    this.titlePath_.stroke(null);
    this.registerDisposable(this.titlePath_);
  }
  return this.titlePath_;
};


/**
 * Gets/sets position.
 * @param {anychart.math.Coordinate=} opt_value - Value to be set.
 * @return {(anychart.math.Coordinate|anychart.ganttModule.Column)} - Current value or itself for method chaining.
 */
anychart.ganttModule.Column.prototype.position = function(opt_value) {
  if (goog.isDef(opt_value)) {
    if (!this.position_ || this.position_.x != opt_value.x || this.position_.y != opt_value.y) {
      this.position_ = opt_value;
      this.pixelBoundsCache_ = null;
      this.invalidate(anychart.ConsistencyState.BOUNDS, anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED);
    }
    return this;
  } else {
    return this.position_;
  }
};


/**
 * Column width.
 * @param {(number|string)=} opt_value Width value.
 * @return {(number|string|anychart.ganttModule.Column)} - Width or itself for method chaining.
 */
anychart.ganttModule.Column.prototype.width = function(opt_value) {
  if (goog.isDef(opt_value)) {
    if (this.width_ != opt_value) {
      this.width_ = opt_value;
      this.pixelBoundsCache_ = null;
      this.invalidate(anychart.ConsistencyState.BOUNDS, anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED);
    }
    return this;
  }
  return this.width_;
};


/**
 * Column default width.
 * @param {number=} opt_value - Default width value.
 * @return {(number|anychart.ganttModule.Column)} - Width or itself for method chaining.
 */
anychart.ganttModule.Column.prototype.defaultWidth = function(opt_value) {
  if (goog.isDef(opt_value)) {
    this.defaultWidth_ = opt_value; //We don't invalidate anything right here.
    return this;
  }
  return this.defaultWidth_;
};


/**
 * Column height.
 * @param {(number|string)=} opt_value Height value.
 * @return {(number|string|anychart.ganttModule.Column)} - Height or itself for method chaining.
 */
anychart.ganttModule.Column.prototype.height = function(opt_value) {
  if (goog.isDef(opt_value)) {
    if (this.height_ != opt_value) {
      this.height_ = opt_value;
      this.pixelBoundsCache_ = null;
      this.invalidate(anychart.ConsistencyState.BOUNDS, anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED);
    }
    return this;
  }
  return this.height_;
};


/**
 * Getter/setter for buttonCursor.
 * @param {(anychart.enums.Cursor|string)=} opt_value buttonCursor.
 * @return {anychart.enums.Cursor|anychart.ganttModule.Column} buttonCursor or self for chaining.
 */
anychart.ganttModule.Column.prototype.buttonCursor = function(opt_value) {
  if (goog.isDef(opt_value)) {
    opt_value = anychart.enums.normalizeCursor(opt_value, anychart.enums.Cursor.DEFAULT);
    if (this.buttonCursor_ != opt_value) {
      this.buttonCursor_ = opt_value;
      this.invalidate(anychart.ConsistencyState.DATA_GRID_COLUMN_BUTTON_CURSOR, anychart.Signal.NEEDS_REDRAW);
    }
    return this;
  }
  return this.buttonCursor_;
};


/**
 * Inner getter for this.cellsLayer_.
 * @return {acgraph.vector.Layer}
 * @private
 */
anychart.ganttModule.Column.prototype.getCellsLayer_ = function() {
  if (!this.cellsLayer_) {
    this.cellsLayer_ = /** @type {acgraph.vector.Layer} */ (acgraph.layer());
    this.registerDisposable(this.cellsLayer_);
  }
  return this.cellsLayer_;
};


/** @inheritDoc */
anychart.ganttModule.Column.prototype.remove = function() {
  if (this.base_) this.base_.parent(null);
  this.dataGrid_.invalidate(anychart.ConsistencyState.DATA_GRID_GRIDS, anychart.Signal.NEEDS_REDRAW);
};


/**
 * Calculates actual column bounds.
 * @return {anychart.math.Rect}
 */
anychart.ganttModule.Column.prototype.calculateBounds = function() {
  if (this.pixelBoundsCache_)
    return this.pixelBoundsCache_;

  var parentBounds = this.dataGrid_.getPixelBounds();
  var width = anychart.utils.normalizeSize(this.width_ || 0, parentBounds.width);
  width = Math.max(anychart.ganttModule.DataGrid.MIN_COLUMN_WIDTH, width);
  var height = anychart.utils.normalizeSize(this.height_ || 0, parentBounds.height);
  var position = anychart.math.normalizeCoordinate(this.position_);

  return this.pixelBoundsCache_ = new anychart.math.Rect(parentBounds.left + position.x, parentBounds.top + position.y, width, height);
};


/**
 * Draws data grid column.
 * @return {anychart.ganttModule.Column} - Itself for method chaining.
 */
anychart.ganttModule.Column.prototype.draw = function() {
  if (this.checkDrawingNeeded()) { //We have to control enabled state manually.
    var container = /** @type {acgraph.vector.ILayer} */(this.container());
    var stage = container ? container.getStage() : null;
    var manualSuspend = stage && !stage.isSuspended();
    if (manualSuspend) stage.suspend();

    //Ensure DOM structure is created.
    if (!this.getBase_().numChildren()) {
      this.getBase_()
          .addChild(/** @type {!acgraph.vector.Layer} */ (this.getCellsLayer_()))
          .addChild(/** @type {!acgraph.vector.Layer} */ (this.getTitleLayer_()));
    }

    if (this.hasInvalidationState(anychart.ConsistencyState.CONTAINER)) {
      this.getBase_().parent(container);
      this.markConsistent(anychart.ConsistencyState.CONTAINER);
    }

    if (this.hasInvalidationState(anychart.ConsistencyState.BOUNDS)) {
      this.calculateBounds();
      this.getBase_().clip(/** @type {goog.math.Rect} */ (this.pixelBoundsCache_));

      /*
        TODO (A.Kudryavtsev):
        NOTE: Here I can't just say "Hey labelFactory, set new X and Y coordinate to all labels without clearing it before
        new data passage".
        In current implementation of labelsFactory we have to clear labels and add it again in new data passage.
        That's why we invalidate anychart.ConsistencyState.DATA_GRID_COLUMN_POSITION here.
       */
      this.invalidate(anychart.ConsistencyState.DATA_GRID_COLUMN_POSITION);

      this.markConsistent(anychart.ConsistencyState.BOUNDS);
    }

    if (this.hasInvalidationState(anychart.ConsistencyState.DATA_GRID_COLUMN_POSITION)) {
      var headerHeight = /** @type {number} */ (this.dataGrid_.headerHeight());

      this.getTitlePath_()
          .clear()
          .moveTo(this.pixelBoundsCache_.left, this.pixelBoundsCache_.top)
          .lineTo(this.pixelBoundsCache_.left + this.pixelBoundsCache_.width, this.pixelBoundsCache_.top)
          .lineTo(this.pixelBoundsCache_.left + this.pixelBoundsCache_.width, this.pixelBoundsCache_.top + headerHeight)
          .lineTo(this.pixelBoundsCache_.left, this.pixelBoundsCache_.top + headerHeight)
          .close();

      var titleParentBounds = new anychart.math.Rect(this.pixelBoundsCache_.left, this.pixelBoundsCache_.top,
          this.pixelBoundsCache_.width, headerHeight);

      this.title_.suspendSignalsDispatching();
      this.title_.parentBounds(titleParentBounds);
      this.title_.height(headerHeight);
      this.title_.resumeSignalsDispatching(false);
      this.invalidate(anychart.ConsistencyState.DATA_GRID_COLUMN_TITLE);

      var data = this.dataGrid_.getVisibleItems();
      var startIndex = /** @type {number} */(this.dataGrid_.startIndex());
      var endIndex = /** @type {number} */(this.dataGrid_.endIndex());
      var verticalOffset = this.dataGrid_.verticalOffset();

      var totalTop = this.pixelBoundsCache_.top + headerHeight + 1 - verticalOffset;

      this.labels().suspendSignalsDispatching();
      this.labels().clear();

      var paddingLeft = anychart.utils.normalizeSize(/** @type {number|string} */ (this.labels().padding().getOption('left')),
          this.pixelBoundsCache_.width);
      var paddingRight = anychart.utils.normalizeSize(/** @type {(number|string)} */ (this.labels().padding().getOption('right')),
          this.pixelBoundsCache_.width);
      var paddingTop = anychart.utils.normalizeSize(/** @type {(number|string)} */ (this.labels().padding().getOption('top')),
          this.pixelBoundsCache_.height);
      var paddingBottom = anychart.utils.normalizeSize(/** @type {(number|string)} */ (this.labels().padding().getOption('bottom')),
          this.pixelBoundsCache_.height);

      var counter = -1;
      this.labelsTexts_.length = 0;
      for (var i = startIndex; i <= endIndex; i++) {
        var item = data[i];
        if (!item) break;

        var height = this.dataGrid_.controller.getItemHeight(item);
        var depth = item.meta('depth') || 0;
        var padding = paddingLeft + this.depthPaddingMultiplier_ * /** @type {number} */ (depth);
        var addButton = 0;

        if (this.collapseExpandButtons_ && item.numChildren()) {
          counter++;
          addButton = anychart.ganttModule.CollapseButton.DEFAULT_BUTTON_SIDE + anychart.ganttModule.DataGrid.DEFAULT_PADDING;
          var button = this.buttons_[counter];
          if (!button) {
            button = new anychart.ganttModule.CollapseButton(this.dataGrid_);
            this.buttons_.push(button);
            button.zIndex(anychart.ganttModule.Column.BUTTONS_Z_INDEX);
            button.container(this.getCellsLayer_());
          }

          button.suspendSignalsDispatching();

          var top = totalTop + ((height - anychart.ganttModule.CollapseButton.DEFAULT_BUTTON_SIDE) / 2);

          var pixelShift = (acgraph.type() === acgraph.StageType.SVG) ? .5 : 0;
          button
              .enabled(true)
              .cursor(/** @type {anychart.enums.Cursor} */ (this.buttonCursor()))
              .collapsed(!!item.meta('collapsed'))
              .dataItemIndex(i)
              .parentBounds(this.pixelBoundsCache_)
              .position({
                'x': Math.floor(this.pixelBoundsCache_.left + padding) + pixelShift,
                'y': Math.floor(top) + pixelShift
              });

          button.resumeSignalsDispatching(false);
          button.draw();
        }

        var newTop = totalTop + height;

        var format = this.dataGrid_.createFormatProvider(item);

        var label = this.labels().add(format,
            {'value': {'x': this.pixelBoundsCache_.left, 'y': totalTop}});

        label.suspendSignalsDispatching();

        label.height(height);
        label.width(this.pixelBoundsCache_.width);
        label.padding(paddingTop, paddingRight, paddingBottom, padding + addButton);

        this.cellTextSettingsOverrider_(label, item);
        label.resumeSignalsDispatching(false);
        label.draw();

        this.labelsTexts_.push(/** @type {string} */ (label.getTextElement().text()));
        // console.log(label.textElement.text());

        totalTop = (newTop + this.dataGrid_.rowStrokeThickness);
      }

      while (++counter < this.buttons_.length && this.collapseExpandButtons_) { //This disables all remaining buttons.
        if (!this.buttons_[counter].enabled()) break;
        this.buttons_[counter].enabled(false).draw();
      }

      this.labels().resumeSignalsDispatching(false);
      this.labels().draw();
      this.markConsistent(anychart.ConsistencyState.DATA_GRID_COLUMN_POSITION);
    }

    if (this.hasInvalidationState(anychart.ConsistencyState.APPEARANCE)) {
      this.getTitlePath_().fill(/** @type {acgraph.vector.Fill} */ (this.dataGrid_.resolveHeaderFill()));
      this.invalidate(anychart.ConsistencyState.DATA_GRID_COLUMN_TITLE);
      this.markConsistent(anychart.ConsistencyState.APPEARANCE);
    }

    if (this.hasInvalidationState(anychart.ConsistencyState.DATA_GRID_COLUMN_TITLE)) {
      this.title_.draw();
      this.markConsistent(anychart.ConsistencyState.DATA_GRID_COLUMN_TITLE);
    }

    if (this.hasInvalidationState(anychart.ConsistencyState.DATA_GRID_COLUMN_BUTTON_CURSOR)) {
      if (this.buttons_ && this.buttons_.length) {
        for (i = 0; i < this.buttons_.length; i++) {
          button = this.buttons_[i];
          button.cursor(/** @type {anychart.enums.Cursor} */ (this.buttonCursor()));
          if (button.enabled()) button.draw();
        }
      }
      this.markConsistent(anychart.ConsistencyState.DATA_GRID_COLUMN_BUTTON_CURSOR);
    }

    if (this.hasInvalidationState(anychart.ConsistencyState.Z_INDEX)) {
      this.getBase_().zIndex(/** @type {number} */ (this.zIndex()));
      this.markConsistent(anychart.ConsistencyState.Z_INDEX);
    }

    if (manualSuspend) stage.resume();
  }
  return this;
};


/**
 *
 * @return {Array.<string>}
 */
anychart.ganttModule.Column.prototype.getLabelTexts = function() {
  return this.labelsTexts_;
};


/** @inheritDoc */
anychart.ganttModule.Column.prototype.serialize = function() {
  var json = anychart.ganttModule.Column.base(this, 'serialize');

  json['width'] = this.width_;
  if (goog.isDef(this.defaultWidth_)) json['defaultWidth'] = this.defaultWidth_;
  json['collapseExpandButtons'] = this.collapseExpandButtons_;
  json['depthPaddingMultiplier'] = this.depthPaddingMultiplier_;
  json['labels'] = this.labels().serialize();
  json['title'] = this.title_.serialize();
  json['buttonCursor'] = this.buttonCursor_;

  if (this.cellTextSettingsOverrider_ != this.defaultCellTextSettingsOverrider_) {
    anychart.core.reporting.warning(
        anychart.enums.WarningCode.CANT_SERIALIZE_FUNCTION,
        null,
        ['Data Grid Column cellTextSettingsOverrider']
    );
  }

  return json;
};


/** @inheritDoc */
anychart.ganttModule.Column.prototype.setupByJSON = function(json, opt_default) {
  anychart.ganttModule.Column.base(this, 'setupByJSON', json, opt_default);

  this.width(json['width']);
  this.defaultWidth(json['defaultWidth']);
  this.collapseExpandButtons(json['collapseExpandButtons']);
  this.depthPaddingMultiplier(json['depthPaddingMultiplier']);
  // this.cellTextSettings(json['cellTextSettings']);
  this.labels().setupInternal(!!opt_default, json['labels']);
  this.buttonCursor(json['buttonCursor']);
  this.onEdit(json['onEdit']);

  this.title(json['title']);

  // if ('format' in json) this.format(json['format']);
  if ('cellTextSettingsOverrider' in json) this.cellTextSettingsOverrider(json['cellTextSettingsOverrider']);
};


//exports
/**
 * @suppress {deprecated}
 */
(function() {
  var proto = anychart.ganttModule.Column.prototype;
  proto['title'] = proto.title;
  proto['onEdit'] = proto.onEdit;
  proto['width'] = proto.width;
  proto['defaultWidth'] = proto.defaultWidth;
  proto['enabled'] = proto.enabled;
  proto['format'] = proto.format;
  proto['cellTextSettings'] = proto.cellTextSettings;
  proto['labels'] = proto.labels;
  proto['cellTextSettingsOverrider'] = proto.cellTextSettingsOverrider;
  proto['collapseExpandButtons'] = proto.collapseExpandButtons;
  proto['depthPaddingMultiplier'] = proto.depthPaddingMultiplier;
  proto['setColumnFormat'] = proto.setColumnFormat;
  proto['buttonCursor'] = proto.buttonCursor;
  proto['draw'] = proto.draw;
})();
