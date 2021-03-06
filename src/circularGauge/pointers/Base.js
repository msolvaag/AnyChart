goog.provide('anychart.circularGaugeModule.pointers.Base');
goog.require('acgraph');
goog.require('anychart.core.VisualBase');
goog.require('anychart.core.reporting');
goog.require('anychart.core.utils.IInteractiveSeries');
goog.require('anychart.core.utils.InteractivityState');
goog.require('anychart.data.Set');
goog.require('anychart.format.Context');



/**
 * Bar pointer class.<br/>
 * @constructor
 * @extends {anychart.core.VisualBase}
 * @implements {anychart.core.utils.IInteractiveSeries}
 */
anychart.circularGaugeModule.pointers.Base = function() {
  anychart.circularGaugeModule.pointers.Base.base(this, 'constructor');

  /**
   * Pointer stroke.
   * @type {acgraph.vector.Stroke|string|Function}
   * @private
   */
  this.stroke_;

  /**
   * Pointer fill.
   * @type {acgraph.vector.Fill|string|Function}
   * @private
   */
  this.fill_;

  /**
   * Pointer hatch fill.
   * @type {acgraph.vector.PatternFill|acgraph.vector.HatchFill|boolean}
   * @private
   */
  this.hatchFill_;

  /**
   * Defines index of axis which will be used to display its data value.
   * @type {number}
   * @private
   */
  this.axisIndex_;

  /**
   * @type {anychart.core.ui.MarkersFactory|acgraph.vector.Path}
   * @protected
   */
  this.domElement;

  /**
   * @type {anychart.core.ui.MarkersFactory|acgraph.vector.Path}
   * @protected
   */
  this.hatchFillElement;

  /**
   * @type {Object}
   * @protected
   */
  this.contextProvider = {};

  /**
   * Interactivity state.
   * @type {anychart.core.utils.InteractivityState}
   */
  this.state = new anychart.core.utils.InteractivityState(this);
};
goog.inherits(anychart.circularGaugeModule.pointers.Base, anychart.core.VisualBase);


/**
 * Supported consistency states.
 * @type {number}
 */
anychart.circularGaugeModule.pointers.Base.prototype.SUPPORTED_CONSISTENCY_STATES =
    anychart.core.VisualBase.prototype.SUPPORTED_CONSISTENCY_STATES |
    anychart.ConsistencyState.APPEARANCE |
    anychart.ConsistencyState.GAUGE_HATCH_FILL;


/**
 * Supported signals.
 * @type {number}
 */
anychart.circularGaugeModule.pointers.Base.prototype.SUPPORTED_SIGNALS =
    anychart.core.VisualBase.prototype.SUPPORTED_SIGNALS |
    anychart.Signal.NEEDS_RECALCULATION;


/**
 * Tester if the series is discrete based.
 * @return {boolean}
 */
anychart.circularGaugeModule.pointers.Base.prototype.isDiscreteBased = function() {
  return true;
};


/**
 * Interface tester.
 * @return {boolean}
 */
anychart.circularGaugeModule.pointers.Base.prototype.isSizeBased = function() {
  return false;
};


/**
 * Tester if it is series.
 * @return {boolean}
 */
anychart.circularGaugeModule.pointers.Base.prototype.isSeries = function() {
  return true;
};


/**
 * Tester if it is chart.
 * @return {boolean}
 */
anychart.circularGaugeModule.pointers.Base.prototype.isChart = function() {
  return false;
};


/**
 * Pointer stroke.
 * @param {(acgraph.vector.Stroke|acgraph.vector.ColoredFill|Function|string|null)=} opt_strokeOrFill Fill settings
 *    or stroke settings.
 * @param {number=} opt_thickness [1] Line thickness.
 * @param {string=} opt_dashpattern Controls the pattern of dashes and gaps used to stroke paths.
 * @param {acgraph.vector.StrokeLineJoin=} opt_lineJoin Line joint style.
 * @param {acgraph.vector.StrokeLineCap=} opt_lineCap Line cap style.
 * @return {(!anychart.circularGaugeModule.pointers.Base|acgraph.vector.Stroke|Function)} .
 */
anychart.circularGaugeModule.pointers.Base.prototype.stroke = function(opt_strokeOrFill, opt_thickness, opt_dashpattern, opt_lineJoin, opt_lineCap) {
  if (goog.isDef(opt_strokeOrFill)) {
    var stroke = goog.isFunction(opt_strokeOrFill) ?
        opt_strokeOrFill :
        acgraph.vector.normalizeStroke.apply(null, arguments);
    if (stroke != this.stroke_) {
      this.stroke_ = stroke;
      this.invalidate(anychart.ConsistencyState.APPEARANCE, anychart.Signal.NEEDS_REDRAW);
    }
    return this;
  }
  return this.stroke_;
};


/**
 * Pointer fill.
 * @param {(!acgraph.vector.Fill|!Array.<(acgraph.vector.GradientKey|string)>|Function|null)=} opt_fillOrColorOrKeys .
 * @param {number=} opt_opacityOrAngleOrCx .
 * @param {(number|boolean|!anychart.math.Rect|!{left:number,top:number,width:number,height:number})=} opt_modeOrCy .
 * @param {(number|!anychart.math.Rect|!{left:number,top:number,width:number,height:number}|null)=} opt_opacityOrMode .
 * @param {number=} opt_opacity .
 * @param {number=} opt_fx .
 * @param {number=} opt_fy .
 * @return {(!anychart.circularGaugeModule.pointers.Base|acgraph.vector.Fill|Function)} .
 */
anychart.circularGaugeModule.pointers.Base.prototype.fill = function(opt_fillOrColorOrKeys, opt_opacityOrAngleOrCx, opt_modeOrCy, opt_opacityOrMode, opt_opacity, opt_fx, opt_fy) {
  if (goog.isDef(opt_fillOrColorOrKeys)) {

    var fill = goog.isFunction(opt_fillOrColorOrKeys) ?
        opt_fillOrColorOrKeys :
        acgraph.vector.normalizeFill.apply(null, arguments);
    if (fill != this.fill_) {
      this.fill_ = fill;
      this.invalidate(anychart.ConsistencyState.APPEARANCE, anychart.Signal.NEEDS_REDRAW);
    }
    return this;
  }
  return this.fill_;
};


/**
 * Gets final normalized fill or stroke color.
 * @param {acgraph.vector.Fill|acgraph.vector.Stroke|Function} color Normal state color.
 * @param {boolean} isFill Is it fill?
 * @return {acgraph.vector.Fill|acgraph.vector.Stroke} Normalized color.
 * @protected
 */
anychart.circularGaugeModule.pointers.Base.prototype.normalizeColor = function(color, isFill) {
  var fill;
  if (goog.isFunction(color)) {
    fill = color.call(this.contextProvider, this.contextProvider);
    fill = isFill ?
        acgraph.vector.normalizeFill(fill) :
        acgraph.vector.normalizeStroke(fill);
  } else
    fill = color;
  return /** @type {acgraph.vector.Fill|acgraph.vector.Stroke} */(fill);
};


/**
 * Pointer hatch fill.
 * @param {(acgraph.vector.PatternFill|acgraph.vector.HatchFill|acgraph.vector.HatchFill.HatchFillType|
 * string|boolean)=} opt_patternFillOrTypeOrState PatternFill or HatchFill instance or type or state of hatch fill.
 * @param {string=} opt_color Color.
 * @param {number=} opt_thickness Thickness.
 * @param {number=} opt_size Pattern size.
 * @return {acgraph.vector.PatternFill|acgraph.vector.HatchFill|anychart.circularGaugeModule.pointers.Base|boolean} Hatch fill.
 */
anychart.circularGaugeModule.pointers.Base.prototype.hatchFill = function(opt_patternFillOrTypeOrState, opt_color, opt_thickness, opt_size) {
  if (goog.isDef(opt_patternFillOrTypeOrState)) {
    if (goog.isBoolean(opt_patternFillOrTypeOrState))
      opt_patternFillOrTypeOrState = opt_patternFillOrTypeOrState ?
          anychart.circularGaugeModule.Chart.DEFAULT_HATCH_FILL_TYPE : 'none';

    var hatchFill = acgraph.vector.normalizeHatchFill.apply(null, arguments);

    if (hatchFill !== this.hatchFill_) {
      this.hatchFill_ = hatchFill;
      this.invalidate(anychart.ConsistencyState.GAUGE_HATCH_FILL,
          anychart.Signal.NEEDS_REDRAW);
    }
    return this;
  }
  return this.hatchFill_;
};


/**
 * Axis index.
 * @param {number=} opt_index .
 * @return {number|anychart.circularGaugeModule.pointers.Base} .
 */
anychart.circularGaugeModule.pointers.Base.prototype.axisIndex = function(opt_index) {
  if (goog.isDef(opt_index)) {
    if (this.axisIndex_ != opt_index) {
      this.axisIndex_ = opt_index;
      this.invalidate(anychart.ConsistencyState.BOUNDS,
          anychart.Signal.NEEDS_REDRAW |
          anychart.Signal.NEEDS_RECALCULATION
      );
    }
    return this;
  } else {
    return this.axisIndex_;
  }
};


/**
 * Data index.
 * @param {number=} opt_index .
 * @return {number|anychart.circularGaugeModule.pointers.Base} .
 */
anychart.circularGaugeModule.pointers.Base.prototype.dataIndex = function(opt_index) {
  if (goog.isDef(opt_index)) {
    if (this.dataIndex_ != opt_index) {
      this.dataIndex_ = opt_index;
      this.invalidate(anychart.ConsistencyState.BOUNDS,
          anychart.Signal.NEEDS_REDRAW |
          anychart.Signal.NEEDS_RECALCULATION);
    }
    return this;
  } else {
    return /** @type {number} */(goog.isDefAndNotNull(this.dataIndex_) ? this.dataIndex_ : (this.ownData ? 0 : this.autoDataIndex()));
  }
};


/**
 * Set/get link to gauge.
 * @param {anychart.circularGaugeModule.Chart=} opt_gauge Gauge inst for set.
 * @return {anychart.circularGaugeModule.pointers.Base|anychart.circularGaugeModule.Chart}
 */
anychart.circularGaugeModule.pointers.Base.prototype.gauge = function(opt_gauge) {
  if (goog.isDef(opt_gauge)) {
    if (this.gauge_ != opt_gauge) {
      this.gauge_ = opt_gauge;
    }
    return this;
  } else {
    return this.gauge_;
  }
};


/**
 * Returns pointer index in gauge.
 * @return {number}
 */
anychart.circularGaugeModule.pointers.Base.prototype.getIndex = function() {
  if (this.isDisposed())
    return -1;
  return goog.array.indexOf(this.gauge_.getAllSeries(), this);
};


/**
 * Getter/setter for pointer global index, used in palettes and autoId.
 * @param {number=} opt_value Auto index of the pointer.
 * @return {number|anychart.circularGaugeModule.pointers.Base} Auto index or self for chaining.
 */
anychart.circularGaugeModule.pointers.Base.prototype.autoIndex = function(opt_value) {
  if (goog.isDef(opt_value)) {
    this.autoIndex_ = opt_value;
    return this;
  }
  return this.autoIndex_;
};


/**
 * Auto data index. (this method exists only because of knob pointer existence)
 * @param {number=} opt_value auto data index of the pointer.
 * @return {number|anychart.circularGaugeModule.pointers.Base} Auto data index or self for chaining.
 */
anychart.circularGaugeModule.pointers.Base.prototype.autoDataIndex = function(opt_value) {
  if (goog.isDef(opt_value)) {
    this.autoDataIndex_ = opt_value;
    return this;
  }
  return this.autoDataIndex_;
};


/**
 * Getter/setter for pointer id.
 * @param {(string|number)=} opt_value Id of the pointer.
 * @return {string|number|anychart.circularGaugeModule.pointers.Base} Id or self for chaining.
 */
anychart.circularGaugeModule.pointers.Base.prototype.id = function(opt_value) {
  if (goog.isDef(opt_value)) {
    this.id_ = opt_value;
    return this;
  } else {
    return this.id_ || String(this.autoIndex_);
  }
};


/**
 * Returns type of the pointer.
 * @return {anychart.enums.CircularGaugePointerType}
 */
anychart.circularGaugeModule.pointers.Base.prototype.getType = goog.abstractMethod;


/** @inheritDoc */
anychart.circularGaugeModule.pointers.Base.prototype.remove = function() {
  if (this.domElement) {
    if (anychart.utils.instanceOf(this.domElement, acgraph.vector.Path))
      this.domElement.parent(null);
    else
      this.domElement.container(null);
  }

  if (this.hatchFillElement) {
    if (anychart.utils.instanceOf(this.hatchFillElement, acgraph.vector.Path))
      this.hatchFillElement.parent(null);
    else
      this.hatchFillElement.container(null);
  }
};


//region --- DATA ---
/**
 * Getter/setter for series mapping.
 * @param {?(anychart.data.View|anychart.data.Set|Array|string)=} opt_value Value to set.
 * @param {(anychart.enums.TextParsingMode|anychart.data.TextParsingSettings)=} opt_csvSettings If CSV string is passed, you can pass CSV parser settings here as a hash map.
 * @return {(!anychart.circularGaugeModule.pointers.Base|!anychart.data.View)} Returns itself if used as a setter or the mapping if used as a getter.
 */
anychart.circularGaugeModule.pointers.Base.prototype.data = function(opt_value, opt_csvSettings) {
  if (goog.isDef(opt_value)) {
    if (this.rawData !== opt_value) {
      this.rawData = opt_value;
      goog.dispose(this.parentViewToDispose); // disposing a view created by the series if any;
      if (anychart.utils.instanceOf(opt_value, anychart.data.View))
        this.ownData = this.parentViewToDispose = opt_value.derive(); // deriving a view to avoid interference with other view users
      else if (anychart.utils.instanceOf(opt_value, anychart.data.Set))
        this.ownData = this.parentViewToDispose = opt_value.mapAs();
      else
        this.ownData = !goog.isNull(opt_value) ? (this.parentViewToDispose = new anychart.data.Set(
            (goog.isArray(opt_value) || goog.isString(opt_value)) ? opt_value : null, opt_csvSettings)).mapAs() : null;
      if (this.ownData)
        this.ownData.listenSignals(this.dataInvalidated_, this);
      this.invalidate(anychart.ConsistencyState.BOUNDS,
          anychart.Signal.NEEDS_REDRAW |
          anychart.Signal.NEEDS_RECALCULATION
      );
    }
    return this;
  }
  return this.ownData;
};


/**
 * Listens to data invalidation.
 * @param {anychart.SignalEvent} e
 * @private
 */
anychart.circularGaugeModule.pointers.Base.prototype.dataInvalidated_ = function(e) {
  if (e.hasSignal(anychart.Signal.DATA_CHANGED)) {
    this.invalidate(anychart.ConsistencyState.BOUNDS,
        anychart.Signal.NEEDS_REDRAW |
        anychart.Signal.NEEDS_RECALCULATION
    );
  }
};


/**
 * Returns own data iterator.
 * @return {!anychart.data.Iterator}
 */
anychart.circularGaugeModule.pointers.Base.prototype.getOwnIterator = function() {
  return this.iterator_ || this.getOwnResetIterator();
};


/**
 * Returns own data reset iterator.
 * @return {!anychart.data.Iterator}
 */
anychart.circularGaugeModule.pointers.Base.prototype.getOwnResetIterator = function() {
  return (this.iterator_ = this.ownData.getIterator());
};


/**
 * Returns gauge iterator.
 * @return {!anychart.data.Iterator} Iterator.
 */
anychart.circularGaugeModule.pointers.Base.prototype.getIterator = function() {
  return this.ownData ? this.getOwnIterator() : this.gauge_.getIterator();
};


/**
 * Returns reset iterator.
 * @return {!anychart.data.Iterator}
 */
anychart.circularGaugeModule.pointers.Base.prototype.getResetIterator = function() {
  return this.ownData ? this.getOwnResetIterator() : this.gauge_.getResetIterator();
};


//endregion


/**
 * Ensure dom element created.
 */
anychart.circularGaugeModule.pointers.Base.prototype.ensureCreated = function() {
  if (!this.domElement) {
    this.domElement = acgraph.path();
  }
};


/**
 * Drawing.
 * @return {anychart.circularGaugeModule.pointers.Base} .
 */
anychart.circularGaugeModule.pointers.Base.prototype.draw = function() {
  if (this.hasInvalidationState(anychart.ConsistencyState.APPEARANCE)) {
    this.domElement.fill(/** @type {acgraph.vector.Fill} */(this.normalizeColor(this.fill_, true)));
    this.domElement.stroke(/** @type {acgraph.vector.Stroke} */(this.normalizeColor(this.stroke_, false)));

    this.markConsistent(anychart.ConsistencyState.APPEARANCE);
  }

  if (this.hasInvalidationState(anychart.ConsistencyState.Z_INDEX)) {
    this.domElement.zIndex(/** @type {number} */(this.zIndex()));

    if (this.hatchFillElement)
      this.hatchFillElement.zIndex(/** @type {number} */(this.zIndex() + anychart.circularGaugeModule.Chart.ZINDEX_MULTIPLIER * 0.1));
    this.markConsistent(anychart.ConsistencyState.Z_INDEX);
  }

  if (this.hasInvalidationState(anychart.ConsistencyState.CONTAINER)) {
    if (anychart.utils.instanceOf(this.domElement, acgraph.vector.Path))
      this.domElement.parent(/** @type {acgraph.vector.ILayer} */(this.container()));
    else
      this.domElement.container(/** @type {acgraph.vector.ILayer} */(this.container()));

    if (this.hatchFillElement) {
      if (anychart.utils.instanceOf(this.hatchFillElement, acgraph.vector.Path))
        this.hatchFillElement.parent(/** @type {acgraph.vector.ILayer} */(this.container()));
      else
        this.hatchFillElement.container(/** @type {acgraph.vector.ILayer} */(this.container()));
    }

    this.markConsistent(anychart.ConsistencyState.CONTAINER);
  }

  return this;
};


//----------------------------------------------------------------------------------------------------------------------
//
//  Interactivity section.
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Create base series format provider.
 * @param {boolean=} opt_force create context provider forcibly.
 * @return {Object} Object with info for labels formatting.
 */
anychart.circularGaugeModule.pointers.Base.prototype.createFormatProvider = function(opt_force) {
  if (!this.pointProvider_ || opt_force)
    this.pointProvider_ = new anychart.format.Context();

  var iterator = this.getIterator();

  var values = {
    'series': {value: this, type: anychart.enums.TokenType.UNKNOWN},
    'index': {value: iterator.getIndex(), type: anychart.enums.TokenType.NUMBER},
    'value': {value: iterator.get('value'), type: anychart.enums.TokenType.NUMBER}
  };

  this.pointProvider_
      .dataSource(iterator)
      .statisticsSources([this]);

  return this.pointProvider_.propagate(values);
};


/**
 * Creates tooltip format provider.
 * @return {Object}
 */
anychart.circularGaugeModule.pointers.Base.prototype.createTooltipContextProvider = function() {
  return this.createFormatProvider();
};


/** @inheritDoc */
anychart.circularGaugeModule.pointers.Base.prototype.applyAppearanceToPoint = goog.nullFunction;


/** @inheritDoc */
anychart.circularGaugeModule.pointers.Base.prototype.finalizePointAppearance = goog.nullFunction;


/** @inheritDoc */
anychart.circularGaugeModule.pointers.Base.prototype.applyAppearanceToSeries = goog.nullFunction;


/** @inheritDoc */
anychart.circularGaugeModule.pointers.Base.prototype.getStartValueForAppearanceReduction = goog.nullFunction;


//----------------------------------------------------------------------------------------------------------------------
//
//  Events manipulation.
//
//----------------------------------------------------------------------------------------------------------------------
/** @inheritDoc */
anychart.circularGaugeModule.pointers.Base.prototype.makeBrowserEvent = function(e) {
  //this method is invoked only for events from data layer
  var res = anychart.circularGaugeModule.pointers.Base.base(this, 'makeBrowserEvent', e);
  res['pointIndex'] = this.getIndexByEvent(res);
  return res;
};


/**
 * This method also has a side effect - it patches the original source event to maintain pointIndex support for
 * browser events.
 * @param {anychart.core.MouseEvent} event
 * @return {Object} An object of event to dispatch. If null - unrecognized type was found.
 */
anychart.circularGaugeModule.pointers.Base.prototype.makePointEvent = function(event) {
  var type = event['type'];
  switch (type) {
    case acgraph.events.EventType.MOUSEOUT:
      type = anychart.enums.EventType.POINT_MOUSE_OUT;
      break;
    case acgraph.events.EventType.MOUSEOVER:
      type = anychart.enums.EventType.POINT_MOUSE_OVER;
      break;
    case acgraph.events.EventType.MOUSEMOVE:
      type = anychart.enums.EventType.POINT_MOUSE_MOVE;
      break;
    case acgraph.events.EventType.MOUSEDOWN:
      type = anychart.enums.EventType.POINT_MOUSE_DOWN;
      break;
    case acgraph.events.EventType.MOUSEUP:
      type = anychart.enums.EventType.POINT_MOUSE_UP;
      break;
    case acgraph.events.EventType.CLICK:
      type = anychart.enums.EventType.POINT_CLICK;
      break;
    case acgraph.events.EventType.DBLCLICK:
      type = anychart.enums.EventType.POINT_DBLCLICK;
      break;
    default:
      return null;
  }

  var pointIndex;
  if ('pointIndex' in event) {
    pointIndex = event['pointIndex'];
  } else if ('labelIndex' in event) {
    pointIndex = event['labelIndex'];
  } else if ('markerIndex' in event) {
    pointIndex = event['markerIndex'];
  }
  pointIndex = anychart.utils.toNumber(pointIndex);
  event['pointIndex'] = pointIndex;

  var iter = this.getIterator();
  if (!iter.select(pointIndex))
    iter.reset();

  return {
    'type': type,
    'actualTarget': event['target'],
    'series': this,
    'iterator': iter,
    'pointIndex': pointIndex,
    'target': this,
    'originalEvent': event
  };
};


/**
 * Get point index by event. Used for events from data layer only
 * @param {anychart.core.MouseEvent} event .
 * @protected
 * @return {number} Point index.
 */
anychart.circularGaugeModule.pointers.Base.prototype.getIndexByEvent = function(event) {
  return anychart.utils.toNumber(anychart.utils.extractTag(event['domTarget']).index);
};


/** @inheritDoc */
anychart.circularGaugeModule.pointers.Base.prototype.handleMouseEvent = function(event) {
  var evt = this.makePointEvent(event);
  if (evt)
    this.dispatchEvent(evt);
};


/**
 * Temporarily works only for acgraph.vector.Element.
 * @param {acgraph.vector.Element} element .
 * @param {boolean=} opt_seriesGlobal .
 * @protected
 */
anychart.circularGaugeModule.pointers.Base.prototype.makeInteractive = function(element, opt_seriesGlobal) {
  if (!element) return;
  element.tag = {series: this};
  if (opt_seriesGlobal) {
    element.tag.index = true;
  } else {
    element.tag.index = this.getIterator().getIndex();
  }
};


//----------------------------------------------------------------------------------------------------------------------
//
//  Hover.
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * If index is passed, hovers a point of the series by its index, else hovers all points of the series.
 * @param {(number|Array<number>)=} opt_indexOrIndexes Point index or array of indexes.
 * @return {!anychart.circularGaugeModule.pointers.Base}  {@link anychart.circularGaugeModule.pointers.Base} instance for method chaining.
 */
anychart.circularGaugeModule.pointers.Base.prototype.hover = function(opt_indexOrIndexes) {
  if (goog.isDef(opt_indexOrIndexes))
    this.hoverPoint(opt_indexOrIndexes);
  else
    this.hoverSeries();

  return this;
};


/**
 * Removes hover from the series.
 * @return {!anychart.circularGaugeModule.pointers.Base} {@link anychart.circularGaugeModule.pointers.Base} instance for method chaining.
 */
anychart.circularGaugeModule.pointers.Base.prototype.unhover = function() {
  if (!(this.state.hasPointState(anychart.PointState.HOVER) ||
      this.state.isStateContains(this.state.getSeriesState(), anychart.PointState.HOVER)) ||
      !this.enabled())
    return this;

  this.state.removePointState(anychart.PointState.HOVER, this.state.seriesState == anychart.PointState.NORMAL ? NaN : undefined);

  return this;
};


/**
 * Hovers a point of the series by its index.
 * @param {number|Array<number>} index Index of the point to hover.
 * @return {!anychart.circularGaugeModule.pointers.Base}  {@link anychart.circularGaugeModule.pointers.Base} instance for method chaining.
 */
anychart.circularGaugeModule.pointers.Base.prototype.hoverPoint = function(index) {
  if (!this.enabled())
    return this;

  if (goog.isArray(index)) {
    var hoveredPoints = this.state.getIndexByPointState(anychart.PointState.HOVER);
    for (var i = 0; i < hoveredPoints.length; i++) {
      if (!goog.array.contains(index, hoveredPoints[i])) {
        this.state.removePointState(anychart.PointState.HOVER, hoveredPoints[i]);
      }
    }
    this.state.addPointState(anychart.PointState.HOVER, index);
  } else if (goog.isNumber(index)) {
    this.unhover();
    this.state.addPointState(anychart.PointState.HOVER, index);
  }
  return this;
};


/**
 * Hovers all points of the series. Use <b>unhover</b> method for unhover series.
 * @return {!anychart.circularGaugeModule.pointers.Base} An instance of the {@link anychart.circularGaugeModule.pointers.Base} class for method chaining.
 */
anychart.circularGaugeModule.pointers.Base.prototype.hoverSeries = function() {
  if (!this.enabled())
    return this;

  this.state.setPointState(anychart.PointState.HOVER);

  return this;
};


//----------------------------------------------------------------------------------------------------------------------
//
//  Select.
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Deselects all points.
 * @return {!anychart.circularGaugeModule.pointers.Base} {@link anychart.circularGaugeModule.pointers.Base} instance for method chaining.
 */
anychart.circularGaugeModule.pointers.Base.prototype.unselect = function() {
  return this;
};


//----------------------------------------------------------------------------------------------------------------------
//
//  Interactivity modes.
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Selection mode.
 * @type {?anychart.enums.SelectionMode}
 * @private
 */
anychart.circularGaugeModule.pointers.Base.prototype.selectionMode_;


/**
 * Selection mode.
 * @type {anychart.enums.HoverMode}
 * @private
 */
anychart.circularGaugeModule.pointers.Base.prototype.hoverMode_;


/**
 * @param {(anychart.enums.SelectionMode|string|null)=} opt_value Selection mode.
 * @return {anychart.circularGaugeModule.pointers.Base|anychart.enums.SelectionMode|null} .
 */
anychart.circularGaugeModule.pointers.Base.prototype.selectionMode = function(opt_value) {
  if (goog.isDef(opt_value)) {
    opt_value = goog.isNull(opt_value) ? null : anychart.enums.normalizeSelectMode(opt_value);
    if (opt_value != this.selectionMode_) {
      this.selectionMode_ = opt_value;
    }
    return this;
  }
  return /** @type {anychart.enums.SelectionMode}*/(this.selectionMode_);
};


/**
 * @param {(anychart.enums.HoverMode|string)=} opt_value Hover mode.
 * @return {anychart.circularGaugeModule.pointers.Base|anychart.enums.HoverMode} .
 */
anychart.circularGaugeModule.pointers.Base.prototype.hoverMode = function(opt_value) {
  if (goog.isDef(opt_value)) {
    opt_value = anychart.enums.normalizeHoverMode(opt_value);
    if (opt_value != this.hoverMode_) {
      this.hoverMode_ = opt_value;
    }
    return this;
  }
  return /** @type {anychart.enums.HoverMode}*/(this.hoverMode_);
};


//----------------------------------------------------------------------------------------------------------------------
//
//  Serialize & Deserialize
//
//----------------------------------------------------------------------------------------------------------------------
/** @inheritDoc */
anychart.circularGaugeModule.pointers.Base.prototype.serialize = function() {
  var json = anychart.circularGaugeModule.pointers.Base.base(this, 'serialize');
  json['pointerType'] = this.getType();

  if (goog.isFunction(this['fill'])) {
    if (goog.isFunction(this.fill())) {
      anychart.core.reporting.warning(
          anychart.enums.WarningCode.CANT_SERIALIZE_FUNCTION,
          null,
          ['Pointers fill']
      );
    } else {
      json['fill'] = anychart.color.serialize(/** @type {acgraph.vector.Fill}*/(this.fill()));
    }
  }
  if (goog.isFunction(this['stroke'])) {
    if (goog.isFunction(this.stroke())) {
      anychart.core.reporting.warning(
          anychart.enums.WarningCode.CANT_SERIALIZE_FUNCTION,
          null,
          ['Pointers stroke']
      );
    } else {
      json['stroke'] = anychart.color.serialize(/** @type {acgraph.vector.Stroke}*/(this.stroke()));
    }
  }
  json['hatchFill'] = anychart.color.serialize(/** @type {acgraph.vector.Fill}*/(this.hatchFill()));
  json['axisIndex'] = this.axisIndex();
  if (this.ownData) {
    json['data'] = this.data().serialize();
  }
  if (goog.isDef(this.dataIndex_))
    json['dataIndex'] = this.dataIndex_;

  if (this.id_)
    json['id'] = this.id();

  if (this.autoIndex_ != this.getIndex())
    json['autoIndex'] = this.autoIndex();

  return json;
};


/** @inheritDoc */
anychart.circularGaugeModule.pointers.Base.prototype.setupByJSON = function(config, opt_default) {
  anychart.circularGaugeModule.pointers.Base.base(this, 'setupByJSON', config, opt_default);

  this.id(config['id']);
  this.autoIndex(config['autoIndex']);

  this.fill(config['fill']);
  this.stroke(config['stroke']);
  this.hatchFill(config['hatchFill']);
  this.axisIndex(config['axisIndex']);
  this.dataIndex(config['dataIndex']);
  if ('data' in config)
    this.data(config['data'] || null);
};


//exports
(function() {
  var proto = anychart.circularGaugeModule.pointers.Base.prototype;
  proto['id'] = proto.id;
  proto['data'] = proto.data;
  proto['stroke'] = proto.stroke;
  proto['fill'] = proto.fill;
  proto['hatchFill'] = proto.hatchFill;
  proto['axisIndex'] = proto.axisIndex;
  proto['dataIndex'] = proto.dataIndex;
})();
