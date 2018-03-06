goog.provide('anychart.ganttModule.elements.TimelineElement');

//region -- Requirements.
goog.require('anychart.core.Base');
goog.require('anychart.core.StateSettings');
goog.require('anychart.core.settings');
goog.require('anychart.core.ui.LabelsFactory');
goog.require('anychart.ganttModule.rendering.Settings');
goog.require('anychart.ganttModule.rendering.ShapeManager');

goog.require('goog.array');



//endregion
//region -- Constructor.
/**
 * Base element settings storage and provider.
 * @param {anychart.ganttModule.TimeLine} timeline - Related timeline.
 * @constructor
 * @implements {anychart.core.settings.IResolvable}
 * @extends {anychart.core.Base}
 */
anychart.ganttModule.elements.TimelineElement = function(timeline) {
  anychart.ganttModule.elements.TimelineElement.base(this, 'constructor');

  /**
   * Related timeline.
   * @type {anychart.ganttModule.TimeLine}
   * @private
   */
  this.timeline_ = timeline;

  /**
   * Parent element.
   * @type {?anychart.ganttModule.elements.TimelineElement}
   * @private
   */
  this.parent_ = null;

  anychart.core.settings.createDescriptorsMeta(this.descriptorsMeta, [
    ['height', 0, anychart.Signal.NEEDS_REDRAW],
    ['anchor', 0, anychart.Signal.NEEDS_REDRAW],
    ['position', 0, anychart.Signal.NEEDS_REDRAW],
    ['offset', 0, anychart.Signal.NEEDS_REDRAW]
  ]);


  var normalDescriptorsMeta = {};
  anychart.core.settings.createDescriptorsMeta(normalDescriptorsMeta, [
    ['fill', 0, anychart.Signal.NEEDS_REDRAW_APPEARANCE],
    ['stroke', 0, anychart.Signal.NEEDS_REDRAW_APPEARANCE]
  ]);
  this.normal_ = new anychart.core.StateSettings(this, normalDescriptorsMeta, anychart.PointState.NORMAL);

  var selectedDescriptorsMeta = {};
  anychart.core.settings.createDescriptorsMeta(selectedDescriptorsMeta, [
    ['fill', 0, 0],
    ['stroke', 0, 0]
  ]);
  this.selected_ = new anychart.core.StateSettings(this, selectedDescriptorsMeta, anychart.PointState.SELECT);

  /**
   * Labels settings.
   * @type {anychart.core.ui.LabelsFactory}
   * @private
   */
  this.labels_ = null;

  /**
   * Resolution chain cache.
   * @type {?Array.<Object|null|undefined>}
   * @private
   */
  this.resolutionChainCache_ = null;

  this.renderingSettings = new anychart.ganttModule.rendering.Settings(this.timeline_, this);
  this.renderingSettings.listenSignals(this.renderingSettingsInvalidated_, this);
};
goog.inherits(anychart.ganttModule.elements.TimelineElement, anychart.core.Base);
anychart.core.settings.populateAliases(anychart.ganttModule.elements.TimelineElement, ['fill', 'stroke'], 'normal');


//endregion
//region -- Consistency states and signals.
/**
 * Supported signals.
 * @type {number}
 */
anychart.ganttModule.elements.TimelineElement.prototype.SUPPORTED_SIGNALS =
    anychart.Signal.NEEDS_REDRAW | //Needs to redraw position.
    anychart.Signal.NEEDS_REDRAW_LABELS | //Needs to redraw labels.
    anychart.Signal.NEEDS_REDRAW_APPEARANCE; //Needs to reapply coloring.


/**
 * Supported consistency states.
 * @type {number}
 */
anychart.ganttModule.elements.TimelineElement.prototype.SUPPORTED_CONSISTENCY_STATES =
    anychart.core.Base.prototype.SUPPORTED_CONSISTENCY_STATES;


//endregion
//region -- Optimized props descriptors
/**
 * Simple Separator descriptors.
 * @type {!Object.<string, anychart.core.settings.PropertyDescriptor>}
 */
anychart.ganttModule.elements.TimelineElement.DESCRIPTORS = (function() {
  /** @type {!Object.<string, anychart.core.settings.PropertyDescriptor>} */
  var map = {};

  anychart.core.settings.createDescriptor(
      map,
      anychart.enums.PropertyHandlerType.SINGLE_ARG,
      'height',
      anychart.core.settings.numberOrPercentNormalizer);

  anychart.core.settings.createDescriptor(
      map,
      anychart.enums.PropertyHandlerType.SINGLE_ARG,
      'anchor',
      anychart.ganttModule.elements.TimelineElement.normalizeAnchor);

  anychart.core.settings.createDescriptor(
      map,
      anychart.enums.PropertyHandlerType.SINGLE_ARG,
      'position',
      anychart.ganttModule.elements.TimelineElement.normalizePosition);

  anychart.core.settings.createDescriptor(
      map,
      anychart.enums.PropertyHandlerType.SINGLE_ARG,
      'offset',
      anychart.core.settings.numberOrPercentNormalizer);

  return map;
})();
anychart.core.settings.populate(anychart.ganttModule.elements.TimelineElement, anychart.ganttModule.elements.TimelineElement.DESCRIPTORS);


//endregion
//region -- Normalisers adaptation
/**
 * Timeline specific anchor normalizer.
 * @param {*} value - Value to normalize.
 * @return {?anychart.enums.Anchor}
 */
anychart.ganttModule.elements.TimelineElement.normalizeAnchor = function(value) {
  if (goog.isNull(value))
    return null;

  value = anychart.enums.normalizeAnchor(value, anychart.enums.Anchor.LEFT_CENTER);
  if (value == anychart.enums.Anchor.AUTO)
    return anychart.enums.Anchor.AUTO;
  if (anychart.utils.isTopAnchor(value))
    return anychart.enums.Anchor.LEFT_TOP;
  if (anychart.utils.isBottomAnchor(value))
    return anychart.enums.Anchor.LEFT_BOTTOM;
  return anychart.enums.Anchor.LEFT_CENTER;
};


/**
 * Timeline specific position normalizer.
 * @param {*} value - Value to normalize.
 * @return {?anychart.enums.Position}
 */
anychart.ganttModule.elements.TimelineElement.normalizePosition = function(value) {
  if (goog.isNull(value))
    return null;

  value = /** @type {anychart.enums.Anchor} */ (anychart.enums.normalizePosition(value, anychart.enums.Position.LEFT_CENTER));
  if (anychart.utils.isTopAnchor(value))
    return anychart.enums.Position.LEFT_TOP;
  if (anychart.utils.isBottomAnchor(value))
    return anychart.enums.Position.LEFT_BOTTOM;
  return anychart.enums.Position.LEFT_CENTER;
};


//endregion
//region -- IResolvable impl.
/**
 * @override
 * @param {string} name
 * @return {*}
 */
anychart.ganttModule.elements.TimelineElement.prototype.getOption = anychart.core.settings.getOption;


/** @inheritDoc */
anychart.ganttModule.elements.TimelineElement.prototype.getResolutionChain = anychart.core.settings.getResolutionChain;


/** @inheritDoc */
anychart.ganttModule.elements.TimelineElement.prototype.resolutionChainCache = function(opt_value) {
  if (goog.isDef(opt_value)) {
    this.resolutionChainCache_ = opt_value;
  }
  return this.resolutionChainCache_;
};


/** @inheritDoc */
anychart.ganttModule.elements.TimelineElement.prototype.getLowPriorityResolutionChain = function() {
  var sett = [this.themeSettings];
  if (this.parent_) {
    sett = goog.array.concat(sett, this.parent_.getLowPriorityResolutionChain());
  }
  return sett;
};


/** @inheritDoc */
anychart.ganttModule.elements.TimelineElement.prototype.getHighPriorityResolutionChain = function() {
  var sett = [this.ownSettings];
  if (this.parent_) {
    sett = goog.array.concat(sett, this.parent_.getHighPriorityResolutionChain());
  }
  return sett;
};


//endregion
//region -- Parental relations.
/**
 * Gets/sets parent element.
 * @param {?anychart.ganttModule.elements.TimelineElement=} opt_value - Value to set.
 * @return {?anychart.ganttModule.elements.TimelineElement} - Current parent or itself for chaining.
 */
anychart.ganttModule.elements.TimelineElement.prototype.parent = function(opt_value) {
  if (goog.isDef(opt_value)) {
    if (this.parent_ != opt_value) {
      this.resolutionChainCache_ = null;
      if (goog.isNull(opt_value)) {
        //this.parent_ is not null here.
        this.parent_.unlistenSignals(this.parentInvalidated_, this);
        this.rendering().parent(null);
        this.parent_ = null;
      } else {
        if (this.parent_)
          this.parent_.unlistenSignals(this.parentInvalidated_, this);
        this.parent_ = opt_value;
        this.rendering().parent(this.parent_.rendering());
        this.parent_.listenSignals(this.parentInvalidated_, this);
      }
    }
    return this;
  }
  return this.parent_;
};


/**
 * Parent invalidation handler.
 * @param {anychart.SignalEvent} e - Signal event.
 * @private
 */
anychart.ganttModule.elements.TimelineElement.prototype.parentInvalidated_ = function(e) {
  this.dispatchSignal(anychart.Signal.NEEDS_REDRAW);
};


//endregion
//region -- State settings.
/**
 * Normal state settings.
 * @param {!Object=} opt_value
 * @return {anychart.core.StateSettings|anychart.ganttModule.elements.TimelineElement}
 */
anychart.ganttModule.elements.TimelineElement.prototype.normal = function(opt_value) {
  if (goog.isDef(opt_value)) {
    this.normal_.setup(opt_value);
    return this;
  }
  return this.normal_;
};


/**
 * Selected state settings.
 * @param {!Object=} opt_value
 * @return {anychart.core.StateSettings|anychart.ganttModule.elements.TimelineElement}
 */
anychart.ganttModule.elements.TimelineElement.prototype.selected = function(opt_value) {
  if (goog.isDef(opt_value)) {
    this.selected_.setup(opt_value);
    return this;
  }
  return this.selected_;
};


//endregion
//region -- Color resolution.
/**
 * Gets color context.
 * @param {(anychart.treeDataModule.Tree.DataItem|anychart.treeDataModule.View.DataItem)} item - Tree Data Item.
 * @param {string} colorName - 'fill' or 'stroke'.
 * @param {anychart.PointState} state - State.
 * @param {number=} opt_periodIndex - Period index.
 * @return {Object}
 */
anychart.ganttModule.elements.TimelineElement.prototype.getColorResolutionContext = function(item, colorName, state, opt_periodIndex) {
  var rv = {
    'sourceColor': colorName == 'stroke' ? this.getSourceStrokeColor(state) : this.getSourceFillColor(state),
    'item': item,
    'itemIndex': item.meta('index')
  };

  if (goog.isDef(opt_periodIndex)) {
    rv['period'] = item.get(anychart.enums.GanttDataFields.PERIODS)[opt_periodIndex];
    rv['periodIndex'] = opt_periodIndex;
  }
  return rv;
};


/**
 * Gets color.
 * @param {(anychart.treeDataModule.Tree.DataItem|anychart.treeDataModule.View.DataItem)} item - Tree Data Item.
 * @param {anychart.PointState} state - State.
 * @param {string} colorName - 'fill' or 'stroke'.
 * @param {number=} opt_periodIndex - Period index.
 * @return {acgraph.vector.Fill|acgraph.vector.Stroke}
 */
anychart.ganttModule.elements.TimelineElement.prototype.getColor = function(item, state, colorName, opt_periodIndex) {
  //TODO (A.Kudryavtsev): In current implementation (6 Mar 2018) only 'normal' and 'selected' are supportd.
  var isNormal = (state === anychart.PointState.NORMAL);
  var colorSource = isNormal ? this.normal() : this.selected();
  var stateColor = colorSource.getOption(colorName);

  var color;
  var normalizer = (colorName == 'stroke') ?
      anychart.core.settings.strokeOrFunctionSimpleNormalizer :
      anychart.core.settings.fillOrFunctionSimpleNormalizer;
  if (goog.isFunction(stateColor)) {
    var context = this.getColorResolutionContext(item, colorName, state, opt_periodIndex);
    color = /** @type {acgraph.vector.Fill|acgraph.vector.Stroke} */(normalizer(stateColor.call(context, context)));
  } else {
    color = /** @type {acgraph.vector.Fill|acgraph.vector.Stroke} */(normalizer(stateColor));
  }
  return color;
};


/**
 * Gets palette normal fill.
 * @return {acgraph.vector.AnyColor}
 */
anychart.ganttModule.elements.TimelineElement.prototype.getPaletteNormalFill = function() {
  return 'blue';
};


/**
 * Gets palette normal fill.
 * @return {acgraph.vector.AnyColor}
 */
anychart.ganttModule.elements.TimelineElement.prototype.getPaletteNormalStroke = function() {
  return 'blue';
};


/**
 * Gets palette normal fill.
 * @return {acgraph.vector.AnyColor}
 */
anychart.ganttModule.elements.TimelineElement.prototype.getPaletteSelectedFill = function() {
  return this.getPalette().itemAt(2);
};


/**
 * Gets palette normal fill.
 * @return {acgraph.vector.AnyColor}
 */
anychart.ganttModule.elements.TimelineElement.prototype.getPaletteSelectedStroke = function() {
  return anychart.color.darken(this.getPalette().itemAt(2));
};


/**
 * Gets source fill color.
 * @param {anychart.PointState} state - State.
 * @return {acgraph.vector.AnyColor}
 */
anychart.ganttModule.elements.TimelineElement.prototype.getSourceFillColor = function(state) {
  return state == anychart.PointState.NORMAL ?
      this.getPaletteNormalFill() :
      this.getPaletteSelectedFill();
};


/**
 * Gets source fill color.
 * @param {anychart.PointState} state - State.
 * @return {acgraph.vector.AnyColor}
 */
anychart.ganttModule.elements.TimelineElement.prototype.getSourceStrokeColor = function(state) {
  return state == anychart.PointState.NORMAL ?
      this.getPaletteNormalStroke() :
      this.getPaletteSelectedStroke();
};


/**
 * Gets palette.
 * @return {anychart.palettes.RangeColors|anychart.palettes.DistinctColors}
 */
anychart.ganttModule.elements.TimelineElement.prototype.getPalette = function() {
  var paletteSource = /** @type {anychart.ganttModule.IInteractiveGrid} */(this.getTimeline().interactivityHandler);
  return /** @type {anychart.palettes.RangeColors|anychart.palettes.DistinctColors} */ (paletteSource.palette());
};


//endregion
//region -- Internal API.
/**
 * Gets type.
 * @return {anychart.enums.TLElementTypes|string}
 */
anychart.ganttModule.elements.TimelineElement.prototype.getType = function() {
  return anychart.enums.TLElementTypes.ALL;
};


/**
 * Gets current related timeline.
 * @return {anychart.ganttModule.TimeLine}
 */
anychart.ganttModule.elements.TimelineElement.prototype.getTimeline = function() {
  return this.timeline_;
};


// /**
//  * Gets fill option name depending on type.
//  * @return {string}
//  */
// anychart.ganttModule.elements.TimelineElement.prototype.getFillOptionName = function() {
//   var optionName;
//   switch (this.getType()) {
//     case anychart.enums.TLElementTypes.MILESTONES:
//       optionName = 'milestoneFill';
//       break;
//     case anychart.enums.TLElementTypes.BASELINES:
//       optionName = 'baselineFill';
//       break;
//     case anychart.enums.TLElementTypes.GROUPING_TASKS:
//       optionName = 'parentFill';
//       break;
//     case anychart.enums.TLElementTypes.PROGRESS:
//       optionName = 'progressFill';
//       break;
//     default:
//       optionName = 'baseFill';
//   }
//   return /** @type {string} */ (optionName);
// };


// /**
//  * Gets stroke option name depending on type.
//  * @return {string}
//  */
// anychart.ganttModule.elements.TimelineElement.prototype.getStrokeOptionName = function() {
//   var optionName;
//   switch (this.getType()) {
//     case anychart.enums.TLElementTypes.MILESTONES:
//       optionName = 'milestoneStroke';
//       break;
//     case anychart.enums.TLElementTypes.BASELINES:
//       optionName = 'baselineStroke';
//       break;
//     case anychart.enums.TLElementTypes.GROUPING_TASKS:
//       optionName = 'parentStroke';
//       break;
//     case anychart.enums.TLElementTypes.PROGRESS:
//       optionName = 'progressStroke';
//       break;
//     default:
//       optionName = 'baseStroke';
//   }
//   return /** @type {string} */ (optionName);
// };


/**
 * Gets fill represented as suitable for acgraph coloring.
 * @param {(anychart.treeDataModule.Tree.DataItem|anychart.treeDataModule.View.DataItem)} item - Related data item.
 * @param {anychart.PointState} state - Point state.
 * @param {number=} opt_periodIndex - Related period index.
 * @return {acgraph.vector.Fill}
 */
anychart.ganttModule.elements.TimelineElement.prototype.getFill = function(item, state, opt_periodIndex) {
  // var resolver = anychart.ganttModule.BaseGrid.getColorResolver;
  // var optionName = opt_selected ? 'selectedElementFill' : this.getFillOptionName();
  // var resolved = resolver(optionName, anychart.enums.ColorType.FILL, false);
  // return /** @type {acgraph.vector.Fill} */ (resolved(this.getTimeline(), 0, item, void 0, void 0, opt_periodIndex));
  return /** @type {acgraph.vector.Fill} */ (this.getColor(item, state, 'fill', opt_periodIndex));
};


/**
 * Gets stroke represented as suitable for acgraph coloring.
 * @param {(anychart.treeDataModule.Tree.DataItem|anychart.treeDataModule.View.DataItem)} item - Related data item.
 * @param {anychart.PointState} state - Point state.
 * @param {number=} opt_periodIndex - Related period index.
 * @return {acgraph.vector.Stroke}
 */
anychart.ganttModule.elements.TimelineElement.prototype.getStroke = function(item, state, opt_periodIndex) {
  // var resolver = anychart.ganttModule.BaseGrid.getColorResolver;
  // var optionName = opt_selected ? 'selectedElementStroke' : this.getStrokeOptionName();
  // var resolved = resolver(optionName, anychart.enums.ColorType.STROKE, false);
  // return /** @type {acgraph.vector.Stroke} */ (resolved(this.getTimeline(), 0, item, void 0, void 0, opt_periodIndex));
  return /** @type {acgraph.vector.Stroke} */ (this.getColor(item, state, 'stroke', opt_periodIndex));
};


/**
 * Recreates shape manager.
 */
anychart.ganttModule.elements.TimelineElement.prototype.recreateShapeManager = function() {
  goog.dispose(this.shapeManager);
  var shapes = /** @type {!Array.<anychart.ganttModule.rendering.shapes.ShapeConfig>} */ (this.renderingSettings.getOption('shapes'));
  this.shapeManager = new anychart.ganttModule.rendering.ShapeManager(this.getTimeline(), this, shapes);
  this.shapeManager.setContainer(this.getTimeline().getDrawLayer());
};


//endregion
//region -- External API.
/**
 * Labels factory getter/setter.
 * @param {Object=} opt_value - Value to be set.
 * @return {anychart.ganttModule.elements.TimelineElement|anychart.core.ui.LabelsFactory} - Current value or itself for method chaining.
 */
anychart.ganttModule.elements.TimelineElement.prototype.labels = function(opt_value) {
  if (!this.labels_) {
    this.labels_ = new anychart.core.ui.LabelsFactory();
    this.labels_.listenSignals(this.labelsInvalidated_, this);
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
      this.dispatchSignal(anychart.Signal.NEEDS_REDRAW);
    }
    return this;
  }

  return this.labels_;
};


/**
 * Labels invalidation.
 * @param {anychart.SignalEvent} e - Event.
 * @private
 */
anychart.ganttModule.elements.TimelineElement.prototype.labelsInvalidated_ = function(e) {
  this.dispatchSignal(anychart.Signal.NEEDS_REDRAW_LABELS);
};


/**
 * Rendering settings getter/setter.
 * @param {(Object|string)=} opt_value - Value to set.
 * @return {anychart.ganttModule.elements.TimelineElement|anychart.ganttModule.rendering.Settings} - .
 */
anychart.ganttModule.elements.TimelineElement.prototype.rendering = function(opt_value) {
  if (goog.isDef(opt_value)) {
    if (this.renderingSettings != opt_value) {
      this.renderingSettings.setup(opt_value);
    }
    return this;
  }
  return this.renderingSettings;
};


/**
 * Rendering settings invalidation handler.
 * @param {anychart.SignalEvent} e - Signal event.
 * @private
 */
anychart.ganttModule.elements.TimelineElement.prototype.renderingSettingsInvalidated_ = function(e) {
  this.recreateShapeManager();
  this.dispatchSignal(anychart.Signal.NEEDS_REDRAW);
};


// /**
//  * Fill.
//  * @param {...*} var_args - Fill arguments.
//  * @return {anychart.ganttModule.elements.TimelineElement|acgraph.vector.Fill|Function}
//  */
// anychart.ganttModule.elements.TimelineElement.prototype.fill = function(var_args) {
//   var fillOptionName = this.getFillOptionName();
//   if (arguments.length) {
//     this.getTimeline()[fillOptionName].apply(this.getTimeline(), arguments);
//     return this;
//   }
//   return /** @type {acgraph.vector.Fill|Function} */ (this.getTimeline().getOption(fillOptionName));
// };
//
//
// /**
//  * Stroke.
//  * @param {...*} var_args - Stroke arguments.
//  * @return {anychart.ganttModule.elements.TimelineElement|acgraph.vector.Stroke|Function}
//  */
// anychart.ganttModule.elements.TimelineElement.prototype.stroke = function(var_args) {
//   var strokeOptionName = this.getStrokeOptionName();
//   if (arguments.length) {
//     this.getTimeline()[strokeOptionName].apply(this.getTimeline(), arguments);
//     return this;
//   }
//   return /** @type {acgraph.vector.Stroke|Function} */ (this.getTimeline().getOption(strokeOptionName));
// };


//endregion
//region -- Serialization/Deserialization.
/**
 * @inheritDoc
 */
anychart.ganttModule.elements.TimelineElement.prototype.setupByJSON = function(config, opt_default) {
  anychart.ganttModule.elements.TimelineElement.base(this, 'setupByJSON', config, opt_default);
  //TODO (A.Kudryavtsev): We can skip setting up fill and stroke in current implementation because it falls back to Timeline API.
  anychart.core.settings.deserialize(this, anychart.ganttModule.elements.TimelineElement.DESCRIPTORS, config, opt_default);
  this.labels().setupInternal(!!opt_default, config['labels']);
  this.normal().setupInternal(!!opt_default, config['normal']);
  this.selected().setupInternal(!!opt_default, config['selected']);
  this.rendering().setupInternal(!!opt_default, config['rendering']);
};


/**
 * @inheritDoc
 */
anychart.ganttModule.elements.TimelineElement.prototype.serialize = function() {
  var json = anychart.ganttModule.elements.TimelineElement.base(this, 'serialize');
  anychart.core.settings.deserialize(this, anychart.ganttModule.elements.TimelineElement.DESCRIPTORS, json);
  json['labels'] = this.labels().serialize();
  json['rendering'] = this.rendering().serialize();
  json['normal'] = this.normal().serialize();
  json['selected'] = this.selected().serialize();
  //TODO (A.Kudryavtsev): Here fill and stroke are not serialized because of current Timeline API.
  return json;
};


//endregion
//region -- Disposing.
/** @inheritDoc */
anychart.ganttModule.elements.TimelineElement.prototype.disposeInternal = function() {
  this.renderingSettings.unlistenSignals(this.renderingSettingsInvalidated_, this);
  goog.dispose(this.renderingSettings);
  delete this.renderingSettings;

  if (this.parent_) {
    this.parent_.unlistenSignals(this.parentInvalidated_, this);
    delete this.parent_;
  }

  this.resolutionChainCache_ = null;

  anychart.ganttModule.elements.TimelineElement.base(this, 'disposeInternal');
};


//endregion
//region -- Exports.
//exports
(function() {
  var proto = anychart.ganttModule.elements.TimelineElement.prototype;
  proto['rendering'] = proto.rendering;
  proto['normal'] = proto.normal;
  proto['selected'] = proto.selected;
})();


//endregion
