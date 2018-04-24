goog.provide('anychart.stockModule.math.keltnerChannels');
goog.require('anychart.stockModule.math.atr');
goog.require('anychart.stockModule.math.ema');
goog.require('anychart.stockModule.math.sma');
goog.require('anychart.utils');

/**
 * @typedef {{
 *    maContext: (anychart.stockModule.math.ema.Context|anychart.stockModule.math.sma.Context),
 *    maCalculate: Function,
 *    atrContext: !anychart.stockModule.math.atr.Context,
 *    multiplier: number,
 *    maPeriod: number,
 *    atrPeriod: number,
 *    maType: !anychart.enums.MovingAverageType,
 *    dispose: Function
 * }}
 */
anychart.stockModule.math.keltnerChannels.Context;

/**
 * Creates context.
 * @param {number=} opt_maPeriod
 * @param {number=} opt_atrPeriod
 * @param {number=} opt_multiplier
 * @param {anychart.enums.MovingAverageType=} opt_maType Indicator smoothing type. Defaults to SMA.
 * @return {anychart.stockModule.math.keltnerChannels.Context}
 */
anychart.stockModule.math.keltnerChannels.initContext = function(opt_maPeriod, opt_atrPeriod, opt_multiplier, opt_maType) {
  var maPeriod = anychart.utils.normalizeToNaturalNumber(opt_maPeriod, 10, false);
  var atrPeriod = anychart.utils.normalizeToNaturalNumber(opt_atrPeriod, 20, false);
  var multiplier = anychart.utils.normalizeToNaturalNumber(opt_multiplier, 2, false);
  var maType = anychart.enums.normalizeMovingAverageType(opt_maType, anychart.enums.MovingAverageType.SMA);

  var maInitContext;
  var maCalculate;
  if (maType == anychart.enums.MovingAverageType.SMA) {
    maInitContext = anychart.stockModule.math.sma.initContext;
    maCalculate = anychart.stockModule.math.sma.calculate;
  } else {
    maInitContext = anychart.stockModule.math.ema.initContext;
    maCalculate = anychart.stockModule.math.ema.calculate;
  }
  return {
    maContext: maInitContext(maPeriod),
    maCalculate: maCalculate,
    atrContext: anychart.stockModule.math.atr.initContext(atrPeriod),
    multiplier: multiplier,
    maPeriod: maPeriod,
    atrPeriod: atrPeriod,
    maType: maType,
    /**
     * @this {anychart.stockModule.math.keltnerChannels.Context}
     */
    'dispose': function() {
      this.maContext['dispose']();
      this.atrContext['dispose']();
    }
  };
};

/**
 *
 * @param {anychart.stockModule.math.keltnerChannels.Context} context
 */
anychart.stockModule.math.keltnerChannels.startFunction = function(context) {
  if (context.maType == anychart.enums.MovingAverageType.SMA) {
    anychart.stockModule.math.sma.startFunction(/** @type {anychart.stockModule.math.sma.Context} */ (context.maContext));
  } else {
    anychart.stockModule.math.ema.startFunction(/** @type {anychart.stockModule.math.sma.Context} */ (context.maContext));
  }
  anychart.stockModule.math.atr.startFunction(context.atrContext);
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
  row.set('maResult', result[0]);
  row.set('upperResult', result[1]);
  row.set('lowerResult', result[2]);
};

/**
 * Creates Keltner Channel computer for the given table mapping.
 * @param {anychart.stockModule.data.TableMapping} mapping
 * @param {number=} opt_maPeriod
 * @param {number=} opt_atrPeriod
 * @param {number=} opt_multiplier
 * @param {anychart.enums.MovingAverageType=} opt_maType Indicator smoothing type. Defaults to SMA.
 * @return {anychart.stockModule.data.TableComputer}
 */
anychart.stockModule.math.keltnerChannels.createComputer = function(mapping, opt_maPeriod, opt_atrPeriod, opt_multiplier, opt_maType) {
  var result = mapping.getTable().createComputer(mapping);
  result.setContext(anychart.stockModule.math.keltnerChannels.initContext(opt_maPeriod, opt_atrPeriod, opt_multiplier, opt_maType));
  result.setStartFunction(anychart.stockModule.math.keltnerChannels.startFunction);
  result.setCalculationFunction(anychart.stockModule.math.keltnerChannels.calculationFunction);
  result.addOutputField('maResult');
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
 * @return {Array.<number>}
 */
anychart.stockModule.math.keltnerChannels.calculate = function(context, close, high, low) {
  var ema = context.maCalculate(context.maContext, close);
  var atr = anychart.stockModule.math.atr.calculate(context.atrContext, close, high, low);

  return [
    ema,
    ema + (context.multiplier * atr),
    ema - (context.multiplier * atr)
  ];
};
