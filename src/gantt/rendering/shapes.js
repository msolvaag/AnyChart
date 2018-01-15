goog.provide('anychart.ganttModule.rendering.shapes');


//region -- Type definitions.
/**
 * Shape config.
 * @typedef {{
 *   name: string,
 *   shapeType: anychart.enums.ShapeType,
 *   fillName: ?string,
 *   strokeName: ?string,
 *   zIndex: number
 * }}
 */
anychart.ganttModule.rendering.shapes.ShapeConfig;


//endregion
/**
 * Template shape config for easy reusage.
 * @const {anychart.ganttModule.rendering.shapes.ShapeConfig}
 */
anychart.ganttModule.rendering.shapes.barConfig = {
  name: 'bar',
  shapeType: anychart.enums.ShapeType.PATH,
  fillName: 'fill',
  strokeName: 'stroke',
  zIndex: 0
};

