goog.provide('anychart.ganttModule.elements.BaselinesElement');

//region -- Requirements.
goog.require('anychart.ganttModule.elements.TimelineElement');



//endregion
//region -- Constructor.
/**
 * Base element settings storage and provider.
 * @param {anychart.ganttModule.TimeLine} timeline - Related timeline.
 * @constructor
 * @extends {anychart.ganttModule.elements.TimelineElement}
 */
anychart.ganttModule.elements.BaselinesElement = function(timeline) {
  anychart.ganttModule.elements.BaselinesElement.base(this, 'constructor', timeline);
};
goog.inherits(anychart.ganttModule.elements.BaselinesElement, anychart.ganttModule.elements.TimelineElement);


//endregion
//region -- Inherited API.
/** @inheritDoc */
anychart.ganttModule.elements.BaselinesElement.prototype.getType = function() {
  return anychart.enums.TLElementTypes.BASELINES;
};


/** @inheritDoc */
anychart.ganttModule.elements.BaselinesElement.prototype.getPaletteNormalFill = function() {
  return anychart.color.lighten(this.getPalette().itemAt(1), 0.7);
};


/** @inheritDoc */
anychart.ganttModule.elements.BaselinesElement.prototype.getPaletteNormalStroke = function() {
  return anychart.color.darken(anychart.color.lighten(this.getPalette().itemAt(1), 0.7));
};


//endregion

