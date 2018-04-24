goog.provide('anychart.stockModule.indicators.KeltnerChannels');
goog.require('anychart.enums');
goog.require('anychart.stockModule.indicators.Base');
goog.require('anychart.stockModule.math.keltnerChannels');
goog.require('anychart.utils');



/**
 * Keltner Channels indicator class.
 * @param {Array} args [plot, mapping, opt_maPeriod, opt_atrPeriod, opt_multiplier, opt_maType, opt_maSeries, opt_upperSeries, opt_lowerSeries]
 * @constructor
 * @extends {anychart.stockModule.indicators.Base}
 */
anychart.stockModule.indicators.KeltnerChannels = function(args) {
  anychart.stockModule.indicators.KeltnerChannels.base(this, 'constructor', args);

  /**
   * Keltner ma period.
   * @type {number}
   * @private
   */
  this.maPeriod_ = anychart.utils.normalizeToNaturalNumber(args[2], 10, false);

  /**
   * Keltner atr period.
   * @type {number}
   * @private
   */
  this.atrPeriod_ = anychart.utils.normalizeToNaturalNumber(args[3], 20, false);

  /**
   * Keltner multiplier.
   * @type {number}
   * @private
   */
  this.multiplier_ = anychart.utils.normalizeToNaturalNumber(args[4], 2, false);

  /**
   * K smooth type.
   * @type {anychart.enums.MovingAverageType}
   * @private
   */
  this.maType_ = anychart.enums.normalizeMovingAverageType(args[5], anychart.enums.MovingAverageType.SMA);

  this.declareSeries('ma', args[6]);
  this.declareSeries('upper', args[7]);
  this.declareSeries('lower', args[8]);
  this.init();
};
goog.inherits(anychart.stockModule.indicators.KeltnerChannels, anychart.stockModule.indicators.Base);


/** @inheritDoc */
anychart.stockModule.indicators.KeltnerChannels.prototype.createComputer = function(mapping) {
  return anychart.stockModule.math.keltnerChannels.createComputer(mapping, this.maPeriod_, this.atrPeriod_, this.multiplier_, this.maType_);
};


/** @inheritDoc */
anychart.stockModule.indicators.KeltnerChannels.prototype.createNameForSeries = function(seriesId, series) {
  switch (seriesId) {
    case 'upper':
      return 'KeltnerChannels U';
    case 'lower':
      return 'KeltnerChannels L';
    case 'ma':
      switch (this.maType_) {
        case anychart.enums.MovingAverageType.EMA:
          return 'EMA';
        case anychart.enums.MovingAverageType.SMA:
          return 'SMA';
      }
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
    case 'ma':
      mapping.addField('value', computer.getFieldIndex('maResult'));
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
anychart.stockModule.indicators.KeltnerChannels.prototype.maSeries = function(opt_type) {
  return /** @type {anychart.stockModule.indicators.KeltnerChannels|anychart.stockModule.Series} */(
    this.seriesInternal('ma', opt_type));
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
 * Getter and setter for the ema period.
 * @param {number=} opt_value
 * @return {anychart.stockModule.indicators.KeltnerChannels|number}
 */
anychart.stockModule.indicators.KeltnerChannels.prototype.emaPeriod = function(opt_value) {
  if (goog.isDef(opt_value)) {
    var emaPeriod = anychart.utils.normalizeToNaturalNumber(opt_value, this.emaPeriod_, false);
    if (emaPeriod != this.emaPeriod_) {
      this.emaPeriod_ = emaPeriod;
      this.reinitComputer();
    }
    return this;
  }
  return this.emaPeriod_;
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

/**
 * Getter and setter for the atr period
 * @param {number=} opt_value
 * @return {anychart.stockModule.indicators.KeltnerChannels|number}
 */
anychart.stockModule.indicators.KeltnerChannels.prototype.atrPeriod = function(opt_value) {
  if (goog.isDef(opt_value)) {
    var atrPeriod = anychart.utils.normalizeToNaturalNumber(opt_value, this.atrPeriod_, false);
    if (atrPeriod != this.atrPeriod_) {
      this.atrPeriod_ = atrPeriod;
      this.reinitComputer();
    }
    return this;
  }
  return this.atrPeriod_;
};


//exports
(function() {
  var proto = anychart.stockModule.indicators.KeltnerChannels.prototype;
  proto['emaPeriod'] = proto.emaPeriod;
  proto['atrPeriod'] = proto.atrPeriod;
  proto['multiplier'] = proto.multiplier;
  proto['upperSeries'] = proto.upperSeries;
  proto['lowerSeries'] = proto.lowerSeries;
  proto['maSeries'] = proto.maSeries;
})();
