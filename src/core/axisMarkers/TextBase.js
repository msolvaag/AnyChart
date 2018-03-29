goog.provide('anychart.core.axisMarkers.TextBase');

//region -- Requirements.
goog.require('acgraph.math');
goog.require('anychart.core.Axis');
goog.require('anychart.core.IStandaloneBackend');
goog.require('anychart.core.Text');
goog.require('anychart.core.reporting');
goog.require('anychart.core.ui.Background');
goog.require('anychart.core.utils.Padding');
goog.require('anychart.enums');
goog.require('anychart.utils');
goog.require('goog.math');



//endregion
//region -- Constructor.
/**
 * Text marker base.
 * @constructor
 * @extends {anychart.core.Text}
 * @implements {anychart.core.IStandaloneBackend}
 */
anychart.core.axisMarkers.TextBase = function() {
  anychart.core.axisMarkers.TextBase.base(this, 'constructor');

  /**
   * Current value.
   * @type {*}
   * @protected
   */
  this.val;

  /**
   * Marker element background.
   * @type {anychart.core.ui.Background}
   * @private
   */
  this.background_ = null;

  /**
   * Marker element padding settings.
   * @type {anychart.core.utils.Padding}
   * @private
   */
  this.padding_ = null;

  /**
   * Current scale.
   * @type {anychart.scales.Base|anychart.ganttModule.Scale}
   * @private
   */
  this.scale_;

  /**
   * Marker element.
   * @type {acgraph.vector.Text} - Marker text element.
   * @private
   */
  this.markerElement_;

  /**
   * Assigned axis.
   * @type {anychart.core.Axis}
   * @private
   */
  this.axis_ = null;

  /**
   * Parent chart instance.
   * @type {anychart.core.SeparateChart}
   * @private
   */
  this.chart_ = null;

  /**
   * @type {anychart.enums.Layout}
   * @private
   */
  this.layout_;

  /**
   * @type {anychart.enums.Layout}
   * @private
   */
  this.defaultLayout_ = anychart.enums.Layout.HORIZONTAL;

  anychart.core.settings.createDescriptorsMeta(this.descriptorsMeta, [
    ['text', anychart.ConsistencyState.APPEARANCE | anychart.ConsistencyState.BOUNDS, anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED],
    ['anchor', anychart.ConsistencyState.BOUNDS, anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED],
    ['align', anychart.ConsistencyState.BOUNDS, anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED],
    ['rotation', anychart.ConsistencyState.BOUNDS, anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED],
    ['offsetX', anychart.ConsistencyState.BOUNDS, anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED],
    ['offsetY', anychart.ConsistencyState.BOUNDS, anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED],
    ['width', anychart.ConsistencyState.BOUNDS, anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED],
    ['height', anychart.ConsistencyState.BOUNDS, anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED]
  ]);
};
goog.inherits(anychart.core.axisMarkers.TextBase, anychart.core.Text);
anychart.core.settings.populate(anychart.core.axisMarkers.TextBase, anychart.core.Text.TEXT_DESCRIPTORS);


//endregion
//region -- States and Signals.
/**
 * Supported signals.
 * @type {number}
 */
anychart.core.axisMarkers.TextBase.prototype.SUPPORTED_SIGNALS =
    anychart.core.Text.prototype.SUPPORTED_SIGNALS;


/**
 * Supported consistency states.
 * @type {number}
 */
anychart.core.axisMarkers.TextBase.prototype.SUPPORTED_CONSISTENCY_STATES =
    anychart.core.Text.prototype.SUPPORTED_CONSISTENCY_STATES |
    anychart.ConsistencyState.LABEL_BACKGROUND;


//endregion
//region -- Descriptors.
/**
 * Descriptors.
 * @type {!Object.<string, anychart.core.settings.PropertyDescriptor>}
 */
anychart.core.axisMarkers.TextBase.DESCRIPTORS = (function() {
  /** @type {!Object.<string, anychart.core.settings.PropertyDescriptor>} */
  var map = {};

  //NOTE: 'text' property is not here because it is in anychart.core.Text.

  anychart.core.settings.createDescriptor(
      map,
      anychart.enums.PropertyHandlerType.SINGLE_ARG,
      'anchor',
      anychart.enums.normalizeAnchor);

  anychart.core.settings.createDescriptor(
      map,
      anychart.enums.PropertyHandlerType.SINGLE_ARG,
      'align',
      anychart.enums.normalizeAlign);

  anychart.core.settings.createDescriptor(
      map,
      anychart.enums.PropertyHandlerType.SINGLE_ARG,
      'rotation',
      anychart.core.settings.numberNormalizer);

  anychart.core.settings.createDescriptor(
      map,
      anychart.enums.PropertyHandlerType.SINGLE_ARG,
      'offsetX',
      anychart.utils.normalizeNumberOrPercent);

  anychart.core.settings.createDescriptor(
      map,
      anychart.enums.PropertyHandlerType.SINGLE_ARG,
      'offsetY',
      anychart.utils.normalizeNumberOrPercent);

  anychart.core.settings.createDescriptor(
      map,
      anychart.enums.PropertyHandlerType.SINGLE_ARG,
      'width',
      anychart.core.settings.numberOrPercentNormalizer);

  anychart.core.settings.createDescriptor(
      map,
      anychart.enums.PropertyHandlerType.SINGLE_ARG,
      'height',
      anychart.core.settings.numberOrPercentNormalizer);

  return map;
})();
anychart.core.settings.populate(anychart.core.axisMarkers.TextBase, anychart.core.axisMarkers.TextBase.DESCRIPTORS);


//endregion
//region -- Gettings and setting chart.
/**
 * Sets the chart axisMarkers belongs to.
 * @param {anychart.core.SeparateChart} chart Chart instance.
 */
anychart.core.axisMarkers.TextBase.prototype.setChart = function(chart) {
  this.chart_ = chart;
};


/**
 * Get the chart axisMarkers belongs to.
 * @return {anychart.core.SeparateChart}
 */
anychart.core.axisMarkers.TextBase.prototype.getChart = function() {
  return this.chart_;
};


//endregion
//region -- Padding and Background.
/**
 * Getter/setter for padding.
 * @param {(string|number|Array.<number|string>|{top:(number|string),left:(number|string),bottom:(number|string),right:(number|string)})=} opt_spaceOrTopOrTopAndBottom .
 * @param {(string|number)=} opt_rightOrRightAndLeft .
 * @param {(string|number)=} opt_bottom .
 * @param {(string|number)=} opt_left .
 * @return {anychart.core.axisMarkers.TextBase|anychart.core.utils.Padding} .
 */
anychart.core.axisMarkers.TextBase.prototype.padding = function(opt_spaceOrTopOrTopAndBottom, opt_rightOrRightAndLeft, opt_bottom, opt_left) {
  if (!this.padding_) {
    this.padding_ = new anychart.core.utils.Padding();
    this.padding_.listenSignals(this.boundsInvalidated_, this);
  }
  if (goog.isDef(opt_spaceOrTopOrTopAndBottom)) {
    this.padding_.setup.apply(this.padding_, arguments);
    return this;
  }
  return this.padding_;
};


/**
 * Listener for bounds invalidation.
 * @param {anychart.SignalEvent} event Invalidation event.
 * @private
 */
anychart.core.axisMarkers.TextBase.prototype.boundsInvalidated_ = function(event) {
  if (event.hasSignal(anychart.Signal.NEEDS_REAPPLICATION)) {
    this.invalidate(anychart.ConsistencyState.BOUNDS,
        anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED);
  }
};


/**
 * Getter/setter for background.
 * @param {(string|Object|null|boolean)=} opt_value Background object to set.
 * @return {!(anychart.core.axisMarkers.TextBase|anychart.core.ui.Background)} Returns the background or itself for method chaining.
 */
anychart.core.axisMarkers.TextBase.prototype.background = function(opt_value) {
  if (!this.background_) {
    this.background_ = new anychart.core.ui.Background();
    this.background_.listenSignals(this.backgroundInvalidated_, this);
  }

  if (goog.isDef(opt_value)) {
    this.background_.setup(opt_value);
    return this;
  }
  return this.background_;
};


/**
 * Internal background invalidation handler.
 * @param {anychart.SignalEvent} event Event object.
 * @private
 */
anychart.core.axisMarkers.TextBase.prototype.backgroundInvalidated_ = function(event) {
  this.invalidate(anychart.ConsistencyState.LABEL_BACKGROUND, anychart.Signal.NEEDS_REDRAW);
};


//endregion
//region -- Scale.
/**
 * Getter/setter for default scale.
 * Works with instances of anychart.scales.Base only.
 * @param {(anychart.scales.Base|anychart.ganttModule.Scale|Object|anychart.enums.ScaleTypes)=} opt_value - Scale.
 * @return {anychart.scales.Base|anychart.ganttModule.Scale|!anychart.core.axisMarkers.TextBase} - Axis scale or
 * itself for method chaining.
 */
anychart.core.axisMarkers.TextBase.prototype.scaleInternal = function(opt_value) {
  if (goog.isDef(opt_value)) {
    var scType = opt_value && goog.isFunction(opt_value.getType) && opt_value.getType();
    var ganttScale = scType == anychart.enums.ScaleTypes.GANTT;
    var val = ganttScale ?
        (opt_value == this.scale_ ? null : opt_value) :
        anychart.scales.Base.setupScale(/** @type {anychart.scales.Base} */(this.scale_), opt_value, null, anychart.scales.Base.ScaleTypes.ALL_DEFAULT, null, this.scaleInvalidated, this);
    if (val) {
      var dispatch = this.scale_ == val;
      this.scale_ = /** @type {anychart.scales.Base|anychart.ganttModule.Scale} */(val);
      if (!ganttScale)
        val.resumeSignalsDispatching(dispatch);
      if (!dispatch)
        this.invalidate(anychart.ConsistencyState.BOUNDS,
            anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED);
    }
    return this;
  } else {
    return this.scale_ || (this.axis_ && /** @type {?anychart.scales.Base} */ (this.axis_.scale())) || null;
  }
};


/**
 * Scale invalidation handler.
 * @param {anychart.SignalEvent} event - Event object.
 * @protected
 */
anychart.core.axisMarkers.TextBase.prototype.scaleInvalidated = function(event) {
  var signal = 0;
  if (event.hasSignal(anychart.Signal.NEEDS_RECALCULATION))
    signal |= anychart.Signal.NEEDS_RECALCULATION;
  if (event.hasSignal(anychart.Signal.NEEDS_REAPPLICATION))
    signal |= anychart.Signal.NEEDS_REDRAW;

  signal |= anychart.Signal.BOUNDS_CHANGED;

  this.invalidate(anychart.ConsistencyState.BOUNDS, signal);
};


//endregion
//region -- Axis.
/**
 * Axis invalidation handler.
 * @param {anychart.SignalEvent} event - Event object.
 * @private
 */
anychart.core.axisMarkers.TextBase.prototype.axisInvalidated_ = function(event) {
  this.invalidate(anychart.ConsistencyState.BOUNDS, anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED);
};


/**
 * Sets axis for marker.
 * @param {anychart.core.Axis=} opt_value - Value to be set.
 * @return {(anychart.core.Axis|anychart.core.axisMarkers.TextBase)} - Current value or itself for method chaining.
 */
anychart.core.axisMarkers.TextBase.prototype.axis = function(opt_value) {
  if (goog.isDef(opt_value)) {
    if (this.axis_ != opt_value) {
      if (this.axis_) this.axis_.unlistenSignals(this.axisInvalidated_, this);
      this.axis_ = opt_value;
      this.axis_.listenSignals(this.axisInvalidated_, this);
      this.invalidate(anychart.ConsistencyState.BOUNDS,
          anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED);
    }
    return this;
  }
  return this.axis_;
};


/**
 * Axes lines space.
 * TODO (A.Kudryavtsev): NOTE that this method is useless for text markers.
 * TODO (A.Kudryavtsev): However I don't remove it to keep all markers internal API consistent
 * TODO (A.Kudryavtsev): because ChartWithAxes doesn't differ marker types on draw.
 * @param {(string|number|anychart.core.utils.Space)=} opt_spaceOrTopOrTopAndBottom Space object or top or top and bottom
 *    space.
 * @param {(string|number)=} opt_rightOrRightAndLeft Right or right and left space.
 * @param {(string|number)=} opt_bottom Bottom space.
 * @param {(string|number)=} opt_left Left space.
 * @return {!(anychart.core.VisualBase|anychart.core.utils.Padding)} .
 */
anychart.core.axisMarkers.TextBase.prototype.axesLinesSpace = function(opt_spaceOrTopOrTopAndBottom, opt_rightOrRightAndLeft, opt_bottom, opt_left) {
  if (!this.axesLinesSpace_) {
    this.axesLinesSpace_ = new anychart.core.utils.Padding();
    this.registerDisposable(this.axesLinesSpace_);
  }

  if (goog.isDef(opt_spaceOrTopOrTopAndBottom)) {
    this.axesLinesSpace_.setup.apply(this.axesLinesSpace_, arguments);
    return this;
  } else {
    return this.axesLinesSpace_;
  }
};


//endregion
//region -- Layout,
/**
 * Get/set layout.
 * @param {anychart.enums.Layout=} opt_value - RangeMarker layout.
 * @return {anychart.enums.Layout|anychart.core.axisMarkers.TextBase} - Layout or this.
 */
anychart.core.axisMarkers.TextBase.prototype.layout = function(opt_value) {
  if (goog.isDef(opt_value)) {
    var layout = anychart.enums.normalizeLayout(opt_value);
    if (this.layout_ != layout) {
      this.layout_ = layout;
      this.invalidate(anychart.ConsistencyState.BOUNDS, anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED);
    }
    return this;
  } else if (this.layout_) {
    return this.layout_;
  } else if (this.axis_) {
    var axisOrientation = this.axis_.orientation();
    var isHorizontal = (axisOrientation == anychart.enums.Orientation.LEFT || axisOrientation == anychart.enums.Orientation.RIGHT);
    return isHorizontal ? anychart.enums.Layout.HORIZONTAL : anychart.enums.Layout.VERTICAL;
  } else {
    return this.defaultLayout_;
  }
};


/**
 * Set default layout.
 * @param {anychart.enums.Layout} value - Layout value.
 */
anychart.core.axisMarkers.TextBase.prototype.setDefaultLayout = function(value) {
  var needInvalidate = !this.layout_ && this.defaultLayout_ != value;
  this.defaultLayout_ = value;
  if (needInvalidate) this.invalidate(anychart.ConsistencyState.BOUNDS);
};


/**
 * Whether marker is horizontal
 * @return {boolean} - If the marker is horizontal.
 */
anychart.core.axisMarkers.TextBase.prototype.isHorizontal = function() {
  return this.layout() == anychart.enums.Layout.HORIZONTAL;
};


//endregion
//region -- Value.
/**
 * Getter/setter for scale.
 * @param {*=} opt_value - Value to be set.
 * @return {*} - Current value or itself for method chaining.
 */
anychart.core.axisMarkers.TextBase.prototype.valueInternal = function(opt_value) {
  if (goog.isDef(opt_value)) {
    if (this.val !== opt_value) {
      this.val = opt_value;
      this.invalidate(anychart.ConsistencyState.BOUNDS,
          anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED);
    }
    return this;
  }
  return this.val;
};


//endregion
//region -- Drawing.
/**
 * Drawing.
 * @return {anychart.core.axisMarkers.TextBase} An instance of {@link anychart.core.axisMarkers.Text} class for method chaining.
 */
anychart.core.axisMarkers.TextBase.prototype.draw = function() {
  if (!this.scale()) {
    anychart.core.reporting.error(anychart.enums.ErrorCode.SCALE_NOT_SET);
    return this;
  }

  if (!this.checkDrawingNeeded())
    return this;

  if (this.hasInvalidationState(anychart.ConsistencyState.APPEARANCE)) {
    this.applyTextSettings(this.markerElement(), true);
    this.markConsistent(anychart.ConsistencyState.APPEARANCE);
  }

  if (this.hasInvalidationState(anychart.ConsistencyState.Z_INDEX)) {
    this.markerElement().zIndex(/** @type {number} */(this.zIndex()));
    this.markConsistent(anychart.ConsistencyState.Z_INDEX);
  }

  if (this.hasInvalidationState(anychart.ConsistencyState.BOUNDS)) {
    var ratio = this.scale().transform(this.val, 0.5);
    if (isNaN(ratio)) return this;

    var textElement = this.markerElement();

    if (ratio >= 0 && ratio <= 1) {
      var shift = -.5;

      var parentBounds = /** @type {anychart.math.Rect} */(this.parentBounds());
      parentBounds = parentBounds.clone().round();
      var anchor = /** @type {anychart.enums.Anchor} */(this.getOption('anchor'));

      textElement.setTransformationMatrix(1, 0, 0, 1, 0, 0);
      textElement.width(null);
      textElement.height(null);
      textElement.x(0);
      textElement.y(0);

      var isWidthSet = goog.isDefAndNotNull(this.getOption('width'));
      var isHeightSet = goog.isDefAndNotNull(this.getOption('height'));

      var textElementBounds = textElement.getBounds();

      var width = isWidthSet ?
          Math.ceil(anychart.utils.normalizeSize(/** @type {number|string} */(this.getOption('width')), parentBounds.width)) :
          textElementBounds.width;
      if (isWidthSet) textElement.width(width);

      textElementBounds = this.padding().widenBounds(/** @type {!anychart.math.Rect} */ (textElement.getBounds()));

      var height = isHeightSet ?
          Math.ceil(anychart.utils.normalizeSize(/** @type {number|string} */(this.getOption('height')), parentBounds.height)) :
          textElementBounds.height;
      if (isHeightSet) textElement.height(height);

      var position = /** @type {goog.math.Coordinate}*/(this.getTextPosition_(ratio, shift));

      var angle = anychart.utils.toNumber(this.getOption('rotation'));
      var rotation = isNaN(angle) ?
          this.isHorizontal() ?
              0 : -90 :
          angle;

      var transform = goog.math.AffineTransform.getRotateInstance(goog.math.toRadians(rotation), 0, 0);
      var rotatedBounds = acgraph.math.getBoundsOfRectWithTransform(textElementBounds, transform);
      this.backgroundBounds_ = rotatedBounds;

      var anchorCoordinate = anychart.utils.getCoordinateByAnchor(
          anychart.math.rect(0, 0, rotatedBounds.width, rotatedBounds.height),
          anchor);

      position.x -= anchorCoordinate.x;
      position.y -= anchorCoordinate.y;

      var offsetX = anychart.utils.normalizeSize(/** @type {number|string} */(this.getOption('offsetX')), width);
      var offsetY = anychart.utils.normalizeSize(/** @type {number|string} */(this.getOption('offsetY')), height);

      anychart.utils.applyOffsetByAnchor(position, anchor, offsetX, offsetY);
      this.applyTextSettings(textElement, true);

      textElement
          .x(position.x + rotatedBounds.width / 2 - width / 2)
          .y(position.y + rotatedBounds.height / 2 - height / 2)
          .setRotationByAnchor(rotation, acgraph.vector.Anchor.CENTER);





      //TODO (A.Kudryavtsev): many bg positioning manipulations.





      this.invalidate(anychart.ConsistencyState.CONTAINER);
    } else {
      this.remove();
      if (this.background_) this.background_.remove();
      this.markConsistent(anychart.ConsistencyState.CONTAINER);
    }

    this.markConsistent(anychart.ConsistencyState.BOUNDS);
  }

  if (this.hasInvalidationState(anychart.ConsistencyState.LABEL_BACKGROUND)) {
    if (this.background_) {
      this.background_.suspendSignalsDispatching();
      this.background_.parentBounds(this.backgroundBounds_);
      this.background_.zIndex(/** @type {number} */(this.zIndex()));
      this.background_.draw();
      this.background_.resumeSignalsDispatching(false);
    }
    this.markConsistent(anychart.ConsistencyState.LABEL_BACKGROUND);
  }


  if (this.hasInvalidationState(anychart.ConsistencyState.CONTAINER)) {
    var container = /** @type {acgraph.vector.ILayer} */(this.container());
    if (this.background_) this.background_.container(container).draw();
    this.markerElement().parent(container);
    this.markConsistent(anychart.ConsistencyState.CONTAINER | anychart.ConsistencyState.LABEL_BACKGROUND);
  }

  return this;
};


/**
 * Calculates text position using layout and align.
 * @param {number} ratio Scale ratio.
 * @param {number} shift Pixel shift.
 * @return {anychart.math.Coordinate} text position.
 * @private
 */
anychart.core.axisMarkers.TextBase.prototype.getTextPosition_ = function(ratio, shift) {
  var x, y;
  var parentBounds = this.parentBounds();
  parentBounds = parentBounds.clone().round();
  var align = /** @type {anychart.enums.Align} */ (this.getOption('align'));
  if (this.isHorizontal()) {
    y = Math.round(parentBounds.getTop() + parentBounds.height - (ratio * parentBounds.height));
    ratio == 1 ? y -= shift : y += shift;
    switch (align) {
      case anychart.enums.Align.LEFT:
        x = parentBounds.getLeft();
        break;
      case anychart.enums.Align.RIGHT:
        x = parentBounds.getRight();
        break;
      default: // TOP CENTER BOTTOM
        x = parentBounds.getLeft() + parentBounds.width / 2;
        break;
    }
  } else {
    x = Math.round(parentBounds.getLeft() + ratio * parentBounds.width);
    ratio == 1 ? x += shift : x -= shift;
    switch (align) {
      case anychart.enums.Align.TOP:
        y = parentBounds.getTop();
        break;
      case anychart.enums.Align.BOTTOM:
        y = parentBounds.getBottom();
        break;
      default: // LEFT CENTER RIGHT
        y = parentBounds.getTop() + parentBounds.height / 2;
        break;
    }
  }
  return new goog.math.Coordinate(x, y);
};


//endregion
//region -- Remove.
/** @inheritDoc */
anychart.core.axisMarkers.TextBase.prototype.remove = function() {
  this.markerElement().parent(null);
};


//endregion
//region -- Elements creation.
/**
 * Create marker element.
 * @return {!acgraph.vector.Text} AxisMarker line element.
 * @protected
 */
anychart.core.axisMarkers.TextBase.prototype.markerElement = function() {
  if (!this.markerElement_) {
    this.markerElement_ = acgraph.text();
    this.markerElement_.attr('aria-hidden', 'true');
    this.registerDisposable(this.markerElement_);
  }
  return this.markerElement_;
};


//endregion
//region -- Disposing.
/** @inheritDoc */
anychart.core.axisMarkers.TextBase.prototype.disposeInternal = function() {
  goog.disposeAll(this.markerElement_, this.padding_, this.background_);
  this.markerElement_ = null;
  this.padding_ = null;
  this.background_ = null;
  this.chart_ = null;
  this.axis_ = null;
  anychart.core.axisMarkers.TextBase.base(this, 'disposeInternal');
};


//endregion
//region -- Serialize/Deserialize.
/** @inheritDoc */
anychart.core.axisMarkers.TextBase.prototype.serialize = function() {
  var json = anychart.core.axisMarkers.TextBase.base(this, 'serialize');
  anychart.core.settings.serialize(this, anychart.core.Text.TEXT_DESCRIPTORS, json, 'Text');
  anychart.core.settings.serialize(this, anychart.core.axisMarkers.TextBase.DESCRIPTORS, json, 'TextBase');
  if (this.layout_) json['layout'] = this.layout_;
  return json;
};


/** @inheritDoc */
anychart.core.axisMarkers.TextBase.prototype.setupByJSON = function(config, opt_default) {
  anychart.core.axisMarkers.TextBase.base(this, 'setupByJSON', config, opt_default);

  anychart.core.settings.deserialize(this, anychart.core.Text.TEXT_DESCRIPTORS, config, opt_default);
  anychart.core.settings.deserialize(this, anychart.core.axisMarkers.TextBase.DESCRIPTORS, config, opt_default);

  if ('layout' in config && config['layout']) this.layout(config['layout']);
  if ('background' in config) this.background().setupInternal(!!opt_default, config['background']);
  if ('padding' in config) this.padding().setupInternal(!!opt_default, config['padding']);

  if ('axis' in config) {
    var ax = config['axis'];
    if (goog.isNumber(ax)) {
      if (this.chart_) {
        this.axis((/** @type {anychart.core.CartesianBase} */(this.chart_)).getAxisByIndex(ax));
      }
    } else if (anychart.utils.instanceOf(ax, anychart.core.Axis)) {
      this.axis(ax);
    }
  }
};


//endregion
