//region --- Requiring and Providing
goog.provide('anychart.radarPolarBaseModule.RadialAxisTicks');
goog.require('acgraph');
goog.require('anychart.color');
goog.require('anychart.core.VisualBase');
//endregion



/**
 * Axis radar ticks class.<br/>
 * You can change position, length and line features.
 * @constructor
 * @extends {anychart.core.VisualBase}
 */
anychart.radarPolarBaseModule.RadialAxisTicks = function() {
  anychart.radarPolarBaseModule.RadialAxisTicks.base(this, 'constructor');

  anychart.core.settings.createDescriptorsMeta(this.descriptorsMeta, [
    ['stroke', 0, anychart.Signal.NEEDS_REDRAW],
    ['length', 0, anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED],
    ['position', 0, anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED]
  ]);


  /**
   * Path with ticks.
   * @type {!acgraph.vector.Path}
   * @private
   */
  this.path_ = acgraph.path();
  this.bindHandlersToGraphics(this.path_);
  this.registerDisposable(this.path_);
};
goog.inherits(anychart.radarPolarBaseModule.RadialAxisTicks, anychart.core.VisualBase);


//region --- States and Signals
/**
 * Supported consistency states.
 * @type {number}
 */
anychart.radarPolarBaseModule.RadialAxisTicks.prototype.SUPPORTED_SIGNALS = anychart.core.VisualBase.prototype.SUPPORTED_SIGNALS;


/**
 * Supported consistency states.
 * @type {number}
 */
anychart.radarPolarBaseModule.RadialAxisTicks.prototype.SUPPORTED_CONSISTENCY_STATES = anychart.core.VisualBase.prototype.SUPPORTED_CONSISTENCY_STATES; // ENABLED CONTAINER Z_INDEX


//endregion
//region --- Descriptors
/**
 * Simple descriptors.
 * @type {!Object.<string, anychart.core.settings.PropertyDescriptor>}
 */
anychart.radarPolarBaseModule.RadialAxisTicks.prototype.SIMPLE_PROPS_DESCRIPTORS = (function() {
  /** @type {!Object.<string, anychart.core.settings.PropertyDescriptor>} */
  var map = {};

  anychart.core.settings.createDescriptors(map, [
    [anychart.enums.PropertyHandlerType.MULTI_ARG, 'stroke', anychart.core.settings.strokeNormalizer],
    [anychart.enums.PropertyHandlerType.SINGLE_ARG, 'length', anychart.utils.normalizeNumberOrPercent],
    [anychart.enums.PropertyHandlerType.SINGLE_ARG, 'position', anychart.enums.normalizeSidePosition]
  ]);

  return map;
})();
anychart.core.settings.populate(anychart.radarPolarBaseModule.RadialAxisTicks, anychart.radarPolarBaseModule.RadialAxisTicks.prototype.SIMPLE_PROPS_DESCRIPTORS);


//endregion
//region --- Drawing
/** @inheritDoc */
anychart.radarPolarBaseModule.RadialAxisTicks.prototype.remove = function() {
  if (this.path_) this.path_.parent(null);
};


/**
 * Renders ticks.
 * @return {!anychart.radarPolarBaseModule.RadialAxisTicks} {@link anychart.core.AxisTicks} instance for method chaining.
 */
anychart.radarPolarBaseModule.RadialAxisTicks.prototype.draw = function() {
  this.path_.clear();
  this.path_.stroke(this.getOption('stroke'));

  if (!this.checkDrawingNeeded())
    return this;

  if (this.hasInvalidationState(anychart.ConsistencyState.Z_INDEX)) {
    this.path_.zIndex(/** @type {number} */ (this.zIndex()));
    this.markConsistent(anychart.ConsistencyState.Z_INDEX);
  }

  if (this.hasInvalidationState(anychart.ConsistencyState.CONTAINER)) {
    this.path_.parent(/** @type {acgraph.vector.ILayer} */ (this.container()));
    this.markConsistent(anychart.ConsistencyState.CONTAINER);
  }

  return this;
};


/**
 * Axis ticks drawer for top orientation.
 * @param {number} x .
 * @param {number} y .
 * @param {number} x1 .
 * @param {number} y1 .
 */
anychart.radarPolarBaseModule.RadialAxisTicks.prototype.drawTick = function(x, y, x1, y1) {
  this.path_.moveTo(x, y);
  this.path_.lineTo(x1, y1);
};


//endregion
//region --- Setup and Serialize
/** @inheritDoc */
anychart.radarPolarBaseModule.RadialAxisTicks.prototype.serialize = function() {
  var json = anychart.radarPolarBaseModule.RadialAxisTicks.base(this, 'serialize');
  anychart.core.settings.serialize(this, this.SIMPLE_PROPS_DESCRIPTORS, json, 'RadialAxisTicks');
  return json;
};


/** @inheritDoc */
anychart.radarPolarBaseModule.RadialAxisTicks.prototype.setupByJSON = function(config, opt_default) {
  anychart.radarPolarBaseModule.RadialAxisTicks.base(this, 'setupByJSON', config, opt_default);
  anychart.core.settings.deserialize(this, this.SIMPLE_PROPS_DESCRIPTORS, config, opt_default);
};


//endregion
//region --- Export
//exports
// (function() {
  // var proto = anychart.radarPolarBaseModule.RadialAxisTicks.prototype;
  // proto['length'] = proto.length;
  // proto['stroke'] = proto.stroke;
  // proto['position'] = proto.position;
// })();
//endregion
