goog.provide('anychart.stockModule.indicators.KeltnerChannels');
goog.require('anychart.enums');
goog.require('anychart.stockModule.indicators.Base');
goog.require('anychart.stockModule.math.keltnerChannels');
goog.require('anychart.utils');



/**
 * Keltner Channels indicator class.
 * @param {Array} args [plot, mapping, opt_period, opt_multiplier, opt_middleSeriesType, opt_upperSeriesType, opt_lowerSeriesType]
 * @constructor
 * @extends {anychart.stockModule.indicators.Base}
 * @todo separate periods for ema and atr
 */
anychart.stockModule.indicators.KeltnerChannels = function(args) {
  anychart.stockModule.indicators.KeltnerChannels.base(this, 'constructor', args);

  /**
   * Keltner global period (both for ATR and EMA).
   * @type {number}
   * @private
   */
  this.period_ = anychart.utils.normalizeToNaturalNumber(args[2], 10, false);

  /**
   * Keltner multiplier.
   * @type {number}
   * @private
   */
  this.multiplier_ = anychart.utils.normalizeToNaturalNumber(args[3], 2, false);

  this.declareSeries('middle', args[4]);
  this.declareSeries('upper', args[5]);
  this.declareSeries('lower', args[6]);
  this.init();
};
goog.inherits(anychart.stockModule.indicators.KeltnerChannels, anychart.stockModule.indicators.Base);


/** @inheritDoc */
anychart.stockModule.indicators.KeltnerChannels.prototype.createComputer = function(mapping) {
  return anychart.stockModule.math.keltnerChannels.createComputer(mapping, this.period_, this.multiplier_);
};


/** @inheritDoc */
anychart.stockModule.indicators.KeltnerChannels.prototype.createNameForSeries = function(seriesId, series) {
  switch (seriesId) {
    case 'upper':
      return 'KeltnerChannels U';
    case 'lower':
      return 'KeltnerChannels L';
    case 'middle':
      return 'KeltnerChannels M';
  }
  return '';
};

/** @inheritDoc */
anychart.stockModule.indicators.KeltnerChannels.prototype.setupMapping = function(mapping, computer, seriesId, series) {
  switch (seriesId) {
    case 'upper':
      mapping.addField('value', computer.getFieldIndex('upperResult'));
      break;
    case 'lower':
      mapping.addField('value', computer.getFieldIndex('lowerResult'));
      break;
    case 'middle':
      mapping.addField('value', computer.getFieldIndex('middleResult'));
      break;
  }
};

/**
 * Getter for the upper series.
 * @param {anychart.enums.StockSeriesType=} opt_type
 * @return {anychart.stockModule.indicators.KeltnerChannels|anychart.stockModule.Series}
 */
anychart.stockModule.indicators.KeltnerChannels.prototype.upperSeries = function(opt_type) {
  return /** @type {anychart.stockModule.indicators.KeltnerChannels|anychart.stockModule.Series} */(
    this.seriesInternal('upper', opt_type));
};

/**
 * Getter for the middle series.
 * @param {anychart.enums.StockSeriesType=} opt_type
 * @return {anychart.stockModule.indicators.KeltnerChannels|anychart.stockModule.Series}
 */
anychart.stockModule.indicators.KeltnerChannels.prototype.middleSeries = function(opt_type) {
  return /** @type {anychart.stockModule.indicators.KeltnerChannels|anychart.stockModule.Series} */(
    this.seriesInternal('middle', opt_type));
};

/**
 * Getter for the lower series.
 * @param {anychart.enums.StockSeriesType=} opt_type
 * @return {anychart.stockModule.indicators.KeltnerChannels|anychart.stockModule.Series}
 */
anychart.stockModule.indicators.KeltnerChannels.prototype.lowerSeries = function(opt_type) {
  return /** @type {anychart.stockModule.indicators.KeltnerChannels|anychart.stockModule.Series} */(
    this.seriesInternal('lower', opt_type));
};

/**
 * Getter and setter for the period.
 * @param {number=} opt_value
 * @return {anychart.stockModule.indicators.KeltnerChannels|number}
 */
anychart.stockModule.indicators.KeltnerChannels.prototype.period = function(opt_value) {
  if (goog.isDef(opt_value)) {
    var period = anychart.utils.normalizeToNaturalNumber(opt_value, this.period_, false);
    if (period != this.period_) {
      this.period_ = period;
      this.reinitComputer();
    }
    return this;
  }
  return this.period_;
};

/**
 * Getter and setter for the multiplier.
 * @param {number=} opt_value
 * @return {anychart.stockModule.indicators.KeltnerChannels|number}
 */
anychart.stockModule.indicators.KeltnerChannels.prototype.multiplier = function(opt_value) {
  if (goog.isDef(opt_value)) {
    var multiplier = anychart.utils.normalizeToNaturalNumber(opt_value, this.multiplier_, false);
    if (multiplier != this.multiplier_) {
      this.multiplier_ = multiplier;
      this.reinitComputer();
    }
    return this;
  }
  return this.multiplier_;
};


//exports
(function() {
  var proto = anychart.stockModule.indicators.KeltnerChannels.prototype;
  proto['period'] = proto.period;
  proto['multiplier'] = proto.multiplier;
  proto['upperSeries'] = proto.upperSeries;
  proto['lowerSeries'] = proto.lowerSeries;
  proto['middleSeries'] = proto.middleSeries;
})();
