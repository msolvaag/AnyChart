goog.provide('anychart.ganttModule.rendering.Settings');

goog.require('anychart.core.Base');



/**
 *
 * @constructor
 */
anychart.ganttModule.rendering.Settings = function() {
  anychart.ganttModule.rendering.Settings.base(this, 'constructor');

};
goog.inherits(anychart.ganttModule.rendering.Settings, anychart.core.Base);


/** @inheritDoc */
anychart.ganttModule.rendering.Settings.prototype.setupByJSON = function(config, opt_default) {
  anychart.ganttModule.rendering.Settings.base(this, 'setupByJSON', config);
  anychart.core.settings.deserialize(this, anychart.ganttModule.rendering.Settings.DESCRIPTORS, config);
  var shapes = config['shapes'];
  if (goog.isDef(shapes))
    this.shapes(shapes);
};
