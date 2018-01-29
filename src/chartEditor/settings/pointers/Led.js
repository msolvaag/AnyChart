goog.provide('anychart.chartEditorModule.settings.pointers.Led');

goog.require('anychart.chartEditorModule.comboBox.Percent');
goog.require('anychart.chartEditorModule.controls.LabeledControl');
goog.require('anychart.chartEditorModule.controls.select.DataField');
goog.require('anychart.chartEditorModule.settings.pointers.LinearBase');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {string} type
 * @param {string|number} pointerId
 * @param {number} pointerIndex
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.settings.pointers.LinearBase}
 */
anychart.chartEditorModule.settings.pointers.Led = function(model, type, pointerId, pointerIndex, opt_domHelper) {
  anychart.chartEditorModule.settings.pointers.Led.base(this, 'constructor', model, type, pointerId, pointerIndex, opt_domHelper);

  this.pointerType_ = 'led';

  this.addClassName(goog.getCssName('anychart-settings-panel-pointer-led'));
};
goog.inherits(anychart.chartEditorModule.settings.pointers.Led, anychart.chartEditorModule.settings.pointers.LinearBase);


/** @override */
anychart.chartEditorModule.settings.pointers.Led.prototype.createDom = function() {
  anychart.chartEditorModule.settings.pointers.Led.base(this, 'createDom');

  // var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

  // var position = new anychart.chartEditorModule.controls.select.DataField({label: 'Position'});
  // position.getSelect().setOptions(goog.object.getValues(anychart.enums.GaugeSidePosition));
  // position.init(model, this.genKey('position()'));
  // this.addChildControl(position);
  //
  // var radius = new anychart.chartEditorModule.comboBox.Percent();
  // radius.setOptions([10, 30, 50, 70, 90, 100]);
  // var radiusLC = new anychart.chartEditorModule.controls.LabeledControl(radius, 'Radius');
  // radiusLC.init(model, this.genKey('radius()'));
  // this.addChildControl(radiusLC);
  //
  // var width = new anychart.chartEditorModule.comboBox.Percent();
  // width.setOptions([0, 1, 3, 5, 10, 20]);
  // var widthLC = new anychart.chartEditorModule.controls.LabeledControl(width, 'Width');
  // widthLC.init(model, this.genKey('width()'));
  // this.addChildControl(widthLC);
};
