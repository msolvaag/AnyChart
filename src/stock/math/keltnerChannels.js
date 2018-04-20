goog.provide('anychart.stockModule.math.keltnerChannels');
goog.require('anychart.stockModule.math.CycledQueue');
goog.require('anychart.stockModule.math.atr');
goog.require('anychart.stockModule.math.ema');
goog.require('anychart.utils');

/** @todo take a look at stochastic and its ema\sma (there might be something about parameter types) */
/**
 * @typedef {{
 *    contextEMA: !anychart.stockModule.math.ema.Context,
 *    contextATR: !anychart.stockModule.math.atr.Context,
 *    multiplier: number,
 *    period: number,
 *    dispose: Function
 * }}
 */
anychart.stockModule.math.keltnerChannels.Context;

/**
 * Creates context.
 * @param {number=} opt_period
 * @param {number=} opt_multiplier
 * @return {anychart.stockModule.math.keltnerChannels.Context}
 * @todo separate periods for ema and atr
 */
anychart.stockModule.math.keltnerChannels.initContext = function(opt_period, opt_multiplier) {
  var period = anychart.utils.normalizeToNaturalNumber(opt_period, 10, false);
  var multiplier = anychart.utils.normalizeToNaturalNumber(opt_multiplier, 2, false);
  return {
    contextEMA: anychart.stockModule.math.ema.initContext(period),
    contextATR: anychart.stockModule.math.atr.initContext(period),
    multiplier: multiplier,
    period: period,
    /**
     * @this {anychart.stockModule.math.keltnerChannels.Context}
     */
    'dispose': function() {
      this.contextEMA.dispose();
      this.contextATR.dispose();
    }
  };
};

/**
 *
 * @param {anychart.stockModule.math.keltnerChannels.Context} context
 */
anychart.stockModule.math.keltnerChannels.startFunction = function(context) {
  anychart.stockModule.math.ema.startFunction(context.contextEMA);
  anychart.stockModule.math.atr.startFunction(context.contextATR);
};

/**
 * Calculates Keltner Channels.
 * @param {anychart.stockModule.data.TableComputer.RowProxy} row
 * @param {anychart.stockModule.math.keltnerChannels.Context} context
 * @this {anychart.stockModule.math.keltnerChannels.Context}
 */
anychart.stockModule.math.keltnerChannels.calculationFunction = function(row, context){
  var close = anychart.utils.toNumber(row.get('close'));
  var high = anychart.utils.toNumber(row.get('high'));
  var low = anychart.utils.toNumber(row.get('low'));
  var result = anychart.stockModule.math.keltnerChannels.calculate(context, close, high, low);
  row.set('middleResult', result.ema);
  row.set('upperResult', result.upper);
  row.set('lowerResult', result.lower);
};

/**
 * Creates Keltner Channel computer for the given table mapping.
 * @param {anychart.stockModule.data.TableMapping} mapping
 * @param {number=} opt_period
 * @param {number=} opt_multiplier
 * @return {anychart.stockModule.data.TableComputer}
 * @todo separate periods for ema and atr
 */
anychart.stockModule.math.keltnerChannels.createComputer = function(mapping, opt_period, opt_multiplier) {
  var result = mapping.getTable().createComputer(mapping);
  result.setContext(anychart.stockModule.math.keltnerChannels.initContext(opt_period, opt_multiplier));
  result.setStartFunction(anychart.stockModule.math.keltnerChannels.startFunction);
  result.setCalculationFunction(anychart.stockModule.math.keltnerChannels.calculationFunction);
  result.addOutputField('middleResult');
  result.addOutputField('upperResult');
  result.addOutputField('lowerResult');
  return result;
};

/**
 * Calculates ema, upper and lower lines of Keltner Channels.
 * @param {anychart.stockModule.math.keltnerChannels.Context} context
 * @param {number} close
 * @param {number} high
 * @param {number} low
 * @return {Object}
 */
anychart.stockModule.math.keltnerChannels.calculate = function(context, close, high, low) {
  var ema = anychart.stockModule.math.ema.calculate(context.contextEMA, close);
  var atr = anychart.stockModule.math.atr.calculate(context.contextATR, close, high, low);
  var result = {};

  if (isNaN(ema) || isNaN(atr)) {
    result = {ema: NaN, upper: NaN, lower: NaN};
  } else {
    result = {
      ema: ema,
      upper: ema + (context.multiplier * atr),
      lower: ema - (context.multiplier * atr)
    };
  }

  return result;
};
