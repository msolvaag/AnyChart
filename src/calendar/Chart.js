goog.provide('anychart.calendarModule.Chart');



/**
 * AnyChart Calendar class.
 * @param {(anychart.data.View|anychart.data.Set|Array|string)=} opt_data Data for the chart.
 * @param {(anychart.enums.TextParsingMode|anychart.data.TextParsingSettings)=} opt_csvSettings If CSV string is passed, you can pass CSV parser settings here as a hash map.
 * @constructor
 * @extends {anychart.core.SeparateChart}
 */
anychart.calendarModule.Chart = function(opt_data, opt_csvSettings) {
  anychart.calendarModule.Chart.base(this, 'constructor');

  anychart.core.settings.createDescriptorsMeta(this.descriptorsMeta, []);
};
goog.inherits(anychart.calendarModule.Chart, anychart.core.SeparateChart);
anychart.core.settings.populateAliases(anychart.calendarModule.Chart, [], 'normal');


//region --- Consistency and Signals
/**
 * Supported signals.
 * @type {number}
 */
anychart.calendarModule.Chart.prototype.SUPPORTED_SIGNALS =
    anychart.core.SeparateChart.prototype.SUPPORTED_SIGNALS |
    anychart.Signal.NEED_UPDATE_COLOR_RANGE;


/**
 * Supported consistency states.
 * @type {number}
 */
anychart.calendarModule.Chart.prototype.SUPPORTED_CONSISTENCY_STATES =
    anychart.core.SeparateChart.prototype.SUPPORTED_CONSISTENCY_STATES |
    anychart.ConsistencyState.APPEARANCE;


//endregion
//region --- Property descriptors
/**
 * @type {!Object.<string, anychart.core.settings.PropertyDescriptor>}
 */
anychart.calendarModule.Chart.OWN_DESCRIPTORS = (function() {
  /** @type {!Object.<string, anychart.core.settings.PropertyDescriptor>} */
  var map = {};
  var single = anychart.enums.PropertyHandlerType.SINGLE_ARG;
  var multi = anychart.enums.PropertyHandlerType.MULTI_ARG;
  function monthNormalizer(opt_value) {
    if (opt_value == 'auto') return opt_value;
    var numValue = anychart.utils.toNumber(opt_value);
    numValue = numValue ? goog.math.clamp(numValue, 0, 11) : 'auto';
    return numValue;
  }
  function weekStartNormalizer(opt_value) {
    return goog.math.clamp((anychart.utils.toNumber(opt_value) || 0), 0, 6);
  }
  anychart.core.settings.createDescriptors(map, [
    // chart properties
    [single, 'startMonth', monthNormalizer],
    [single, 'endMonth', monthNormalizer],
    [single, 'weekStart', weekStartNormalizer],

    // color properties
    // stroke for month with data
    [multi, 'outlineStroke', anychart.core.settings.strokeOrFunctionNormalizer],
    // stroke for month without data
    [multi, 'unusedOutlineStroke', anychart.core.settings.strokeOrFunctionNormalizer],
    // stroke for day without data
    [multi, 'unusedStroke', anychart.core.settings.strokeOrFunctionNormalizer],
    // fill for day without data
    [multi, 'unusedFill', anychart.core.settings.fillOrFunctionNormalizer]
  ]);
  return map;
})();
anychart.core.settings.populate(anychart.calendarModule.Chart, anychart.calendarModule.Chart.OWN_DESCRIPTORS);


//endregion
//region --- Complex properties
/**
 * .
 */
anychart.calendarModule.Chart.prototype.colorRange = function() {};


/**
 * .
 */
anychart.calendarModule.Chart.prototype.colorScale = function() {};


//endregion
//region --- Infrastructure
/** @inheritDoc */
anychart.calendarModule.Chart.prototype.calculate = function() {
  anychart.calendarModule.Chart.base(this, 'calculate');
};


//endregion
//region --- Drawing
/** @inheritDoc */
anychart.calendarModule.Chart.prototype.drawContent = function(bounds) {
  if (this.isConsistent())
    return this;

  this.calculate();

  return this;
};


//endregion
//region --- Serialize / deserialize / Disposing
/** @inheritDoc */
anychart.calendarModule.Chart.prototype.serialize = function() {
  var json = anychart.calendarModule.Chart.base(this, 'serialize');
  json['type'] = this.getType();

  anychart.core.settings.serialize(this, anychart.calendarModule.Chart.OWN_DESCRIPTORS, json, 'Calendar');

  return {'chart': json};
};


/** @inheritDoc */
anychart.calendarModule.Chart.prototype.setupByJSON = function(config, opt_default) {
  anychart.calendarModule.Chart.base(this, 'setupByJSON', config, opt_default);
  anychart.core.settings.deserialize(this, anychart.calendarModule.Chart.OWN_DESCRIPTORS, config, opt_default);
};


/** @inheritDoc */
anychart.calendarModule.Chart.prototype.disposeInternal = function() {
  anychart.calendarModule.Chart.base(this, 'disposeInternal');
};
//endregion
