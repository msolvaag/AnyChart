goog.provide('anychart.ganttModule.elements.Base');

//region -- Requirements.
goog.require('anychart.core.Base');
goog.require('anychart.ganttModule.rendering.Settings');



//endregion
//region -- Constructor.
/**
 * Base element settings storage and provider.
 * @constructor
 */
anychart.ganttModule.elements.Base = function() {
  anychart.ganttModule.elements.Base.base(this, 'constructor');

  this.renderingSettings = new anychart.ganttModule.rendering.Settings();
};
goog.inherits(anychart.ganttModule.elements.Base, anychart.core.Base);


//endregion
//region --  Consistency states and signals.
/**
 * Supported signals.
 * @type {number}
 */
anychart.ganttModule.elements.Base.prototype.SUPPORTED_SIGNALS = anychart.Signal.NEEDS_REDRAW;


/**
 * Supported consistency states.
 * @type {number}
 */
anychart.ganttModule.elements.Base.prototype.SUPPORTED_CONSISTENCY_STATES =
    anychart.core.Base.prototype.SUPPORTED_CONSISTENCY_STATES;


//endregion
//region -- External API.
/**
 * Rendering settings getter/setter.
 * @param {(Object|Function|string)=} opt_value - Value to set.
 * @return {anychart.ganttModule.elements.Base|anychart.ganttModule.rendering.Settings} - .
 */
anychart.ganttModule.elements.Base.prototype.rendering = function(opt_value) {
  if (goog.isDef(opt_value)) {
    if (this.renderingSettings != opt_value) {
      this.renderingSettings.setup(opt_value);
      // this.dispatchSignal(anychart.Signal.NEEDS_REDRAW);
    }
    return this;
  }
  return this.renderingSettings;
};


//
//region -- Disposing.
/** @inheritDoc */
anychart.ganttModule.elements.Base.prototype.disposeInternal = function() {
  goog.dispose(this.renderingSettings);
  delete this.renderingSettings;
  anychart.ganttModule.elements.Base.base(this, 'disposeInternal');
};


//endregion
//region -- Exports.
//exports
(function() {
  var proto = anychart.ganttModule.elements.Base.prototype;
  proto['rendering'] = proto.rendering;//doc|ex
})();


//endregion
