goog.provide('anychart.stockModule.indicators.TRIX');
goog.require('anychart.enums');
goog.require('anychart.stockModule.indicators.Base');
goog.require('anychart.stockModule.math.trix');
goog.require('anychart.utils');


/**
 * TRIX indicator class.
 * @param {Array} args [plot, mapping, opt_period, opt_signalPeriod, emType,signalEmType,opt_seriesType]
 * @constructor
 * @extends {anychart.stockModule.indicators.Base}
 */
anychart.stockModule.indicators.TRIX = function (args) {
    anychart.stockModule.indicators.TRIX.base(this, 'constructor', args);
    /**
     * EMA period.
     * @type {number}
     * @private
     */
    this.period_ = anychart.utils.normalizeToNaturalNumber(args[2], 20, false);

    /**
     * Signal
     * @type {number}
     * @private
     */
    this.signal_ = anychart.utils.normalizeToNaturalNumber(args[3], 20, false);
    this.emType_ = goog.isDef(args[4]) ? args[4].toLowerCase() : 'ema';
    this.signalEmType_ = goog.isDef(args[5]) ? args[5].toLowerCase() : 'ema';
    this.declareSeries('trix', args[4]);
    this.declareSeries('signal', args[4]);
    this.init();
};
goog.inherits(anychart.stockModule.indicators.TRIX, anychart.stockModule.indicators.Base);


/** @inheritDoc */
anychart.stockModule.indicators.TRIX.prototype.createComputer = function (mapping) {
    return anychart.stockModule.math.trix.createComputer(mapping, this.period_, this.signal_, this.emType_, this.signalEmType_);
};


/** @inheritDoc */
anychart.stockModule.indicators.TRIX.prototype.createNameForSeries = function (seriesId, series) {
    switch (seriesId) {
        case 'trix':
            return 'TRIX(' + this.period_ + ')';
            break;
        case 'signal':
            return this.signalEmType_.toLocaleUpperCase() + '(' + this.signal_ + ')';
    }
    return '';
};

/** @inheritDoc */
anychart.stockModule.indicators.TRIX.prototype.setupMapping = function (mapping, computer, seriesId, series) {
    switch (seriesId) {
        case 'trix':
            mapping.addField('value', computer.getFieldIndex('trix'));
            break;
        case 'signal':
            mapping.addField('value', computer.getFieldIndex('signal'));
            break;
    }
};
/**
 * Getter for the indicator series or setter for it's type. If passed - recreates the series.
 * @param {anychart.enums.StockSeriesType=} opt_type
 * @return {anychart.stockModule.indicators.TRIX|anychart.stockModule.Series}
 */
anychart.stockModule.indicators.TRIX.prototype.trix = function (opt_type) {
    return /** @type {anychart.stockModule.indicators.TRIX|anychart.stockModule.Series} */(
        this.seriesInternal('trix', opt_type));
};
/**
 * Getter for the indicator series or setter for it's type. If passed - recreates the series.
 * @param {anychart.enums.StockSeriesType=} opt_type
 * @return {anychart.stockModule.indicators.Base|anychart.stockModule.Series}
 */
anychart.stockModule.indicators.TRIX.prototype.signal = function (opt_type) {
    return /** @type {anychart.stockModule.indicators.TRIX|anychart.stockModule.Series} */(
        this.seriesInternal('signal', opt_type));

};

/**
 * Getter and setter for the period.
 * @param {number=} opt_value
 * @return {anychart.stockModule.indicators.TRIX|number}
 */
anychart.stockModule.indicators.TRIX.prototype.period = function (opt_value) {
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


//exports
(function () {
    var proto = anychart.stockModule.indicators.TRIX.prototype;
    proto['trix'] = proto.trix;
    proto['signal'] = proto.signal;
    proto['period'] = proto.period;
})();
