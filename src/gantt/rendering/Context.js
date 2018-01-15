goog.provide('anychart.ganttModule.rendering.Context');



/**
 *
 * @param {anychart.ganttModule.elements.Base} element - Related element.
 * @param {anychart.treeDataModule.Tree.DataItem|anychart.treeDataModule.View.DataItem} item - Related data item.
 * @param {anychart.math.Rect} predictedBounds - Default predicted bounds to display element.
 * @param {number=} opt_periodIndex - Period index for resources timeline.
 * @constructor
 */
anychart.ganttModule.rendering.Context = function(element, item, predictedBounds, opt_periodIndex) {
  /**
   *
   * @type {anychart.ganttModule.elements.Base}
   */
  this.element = element;

  /**
   *
   * @type {anychart.math.Rect}
   */
  this['predictedBounds'] = predictedBounds;

  /**
   *
   * @type {anychart.treeDataModule.Tree.DataItem|anychart.treeDataModule.View.DataItem}
   */
  this['item'] = item;

  this['shapes'] = this.element.shapeManager.getShapesGroup(item, void 0, void 0, void 0, opt_periodIndex);

  if (goog.isDef(opt_periodIndex)) {
    /**
     *
     * @type {number}
     */
    this['periodIndex'] = opt_periodIndex;

    /**
     *
     * @type {Object}
     */
    this['period'] = item.get(anychart.enums.GanttDataFields.PERIODS, opt_periodIndex);
  }
};


/**
 * Generates a shapes group.
 * @param {Object.<string>=} opt_only If set - contains a subset of shape names that should be returned.
 * @param {number=} opt_baseZIndex - zIndex that is used as a base zIndex for all shapes of the group.
 * @param {acgraph.vector.Shape=} opt_shape Foreign shape.
 * @return {Object.<string, acgraph.vector.Shape>}
 */
anychart.ganttModule.rendering.Context.prototype.getShapesGroup = function(opt_only, opt_baseZIndex, opt_shape) {
  return this.element.shapeManager.getShapesGroup(this['item'], opt_only, opt_baseZIndex, opt_shape, this['periodIndex']);
};
