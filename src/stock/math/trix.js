goog.provide('anychart.stockModule.math.trix');
goog.require('anychart.stockModule.math.CycledQueue');
goog.require('anychart.stockModule.math.ema');
goog.require('anychart.utils');


/**
 * @namespace {anychart.stockModule.math.trix}
 */


/**
 * @typedef {{
 *    queue: !anychart.stockModule.math.CycledQueue,
 *    signalQueue:!anychart.stockModule.math.CycledQueue,
 *    period: number,
 *    prevResult: number,
 *    signal: number,
 *    firstEmaContext: anychart.stockModule.math.ema.Context,
 *    secondEmaContext:anychart.stockModule.math.ema.Context,
 *    thirdEmaContext:anychart.stockModule.math.ema.Context,
 *    signalEmaContext:anychart.stockModule.math.ema.Context,
 *    emSignalFunction:Function,
 *    emFunction:Function,
 *    dispose: Function
 * }}
 */
anychart.stockModule.math.trix.Context;


/**
 * Creates context for TRIX indicator calculation.
 * @param {number=} opt_period Defaults to 20.
 * @param {number=} opt_signal
 * @param {string=} opt_emType type of ema function
 * @param {string=} opt_signalEmType type of signal ema function
 * @return {anychart.stockModule.math.trix.Context}
 */
anychart.stockModule.math.trix.initContext = function (opt_period, opt_signal, opt_emType, opt_signalEmType) {
    var period = anychart.utils.normalizeToNaturalNumber(opt_period, 20, false);
    var signalPeriod = anychart.utils.normalizeToNaturalNumber(opt_signal, 20, false);
    var emFunction = null;
    var emSignalFunction = null;
    switch (opt_emType) {
        case "ema":
            emFunction = anychart.stockModule.math.ema.calculate;
            break;
        case "sma":
            emFunction = anychart.stockModule.math.sma.calculate;
            break;
        default:
            emFunction = anychart.stockModule.math.sma.calculate;
            break;
    }
    switch (opt_signalEmType) {
        case "ema":
            emSignalFunction = anychart.stockModule.math.ema.calculate;
            break;
        case "sma":
            emSignalFunction = anychart.stockModule.math.sma.calculate;
            break;
        default:
            emSignalFunction = anychart.stockModule.math.sma.calculate;
            break;
    }

    return {
        queue: anychart.math.cycledQueue(period),
        signalQueue: anychart.math.cycledQueue(signalPeriod),
        period: period,
        signal: signalPeriod,
        prevResult: NaN,
        firstEmaContext: anychart.stockModule.math.ema.initContext(period),
        secondEmaContext: anychart.stockModule.math.ema.initContext(period),
        thirdEmaContext: anychart.stockModule.math.ema.initContext(period),
        signalEmaContext: anychart.stockModule.math.ema.initContext(signalPeriod),
        emFunction: emFunction,
        emSignalFunction: emSignalFunction,
        /**
         * @this {anychart.stockModule.math.trix.Context}
         */
        'dispose': function () {
            this.queue.clear();
            this.signalQueue.clear();
        }
    };
};


/**
 * Start calculation function for TRIX indicator calculation.
 * @param {anychart.stockModule.math.trix.Context} context
 * @this {anychart.stockModule.math.trix.Context}
 */
anychart.stockModule.math.trix.startFunction = function (context) {
    context.queue.clear();
    context.prevResult = NaN;
};


/**
 * Calculates TRIX.
 * @param {anychart.stockModule.data.TableComputer.RowProxy} row
 * @param {anychart.stockModule.math.trix.Context} context
 * @this {anychart.stockModule.math.trix.Context}
 */
anychart.stockModule.math.trix.calculationFunction = function (row, context) {
    var value = row.get('value');
    value = goog.isDef(value) ? value : row.get('close');
    value = anychart.utils.toNumber(value);
    var result = anychart.stockModule.math.trix.calculate(context, value);
    row.set('trix', result[0]);
    row.set('signal', result[1]);
};


/**
 * Creates TRIX computer for the given table mapping.
 * @param {anychart.stockModule.data.TableMapping} mapping
 * @param {number=} opt_period
 * @param {number=} opt_signal
 * @param {string=} opt_emType
 * @param {string=} opt_signalEmType
 * @return {anychart.stockModule.data.TableComputer}
 */
anychart.stockModule.math.trix.createComputer = function (mapping, opt_period, opt_signal, opt_emType, opt_signalEmType) {
    var result = mapping.getTable().createComputer(mapping);
    result.setContext(anychart.stockModule.math.trix.initContext(opt_period, opt_signal, opt_emType, opt_signalEmType));
    result.setStartFunction(anychart.stockModule.math.trix.startFunction);
    result.setCalculationFunction(anychart.stockModule.math.trix.calculationFunction);
    result.addOutputField('trix');
    result.addOutputField('signal');
    return result;
};


/**
 * Calculates next TRIX value based on a previous EMA value and current data value.
 * To use this function you need a setup queue with length equal to period.
 * On first calculation pass NaN or nothing as a opt_prevResult.
 * @param {anychart.stockModule.math.trix.Context} context
 * @param {number} value
 * @return {Array}
 */
anychart.stockModule.math.trix.calculate = function (context, value) {
    if (isNaN(value)) {
        return [NaN, NaN];
    }

    context.queue.enqueue(value);
    context.prevResult = context.thirdEmaContext.prevResult;
    var firstEma = context.emFunction(context.firstEmaContext, /** @type {number} */(context.queue.get(-1)));
    var secondEma = context.emFunction(context.secondEmaContext, firstEma);
    var thirdEma = context.emFunction(context.thirdEmaContext, secondEma);
    var trix = ((thirdEma - context.prevResult) / context.prevResult) * 100.0;
    var signal = context.emSignalFunction(context.signalEmaContext, trix);
    var result = [trix, signal];

    return result;
};


//exports
goog.exportSymbol('anychart.math.trix.initContext', anychart.stockModule.math.trix.initContext);
goog.exportSymbol('anychart.math.trix.startFunction', anychart.stockModule.math.trix.startFunction);
goog.exportSymbol('anychart.math.trix.calculate', anychart.stockModule.math.trix.calculate);
goog.exportSymbol('anychart.math.trix.calculationFunction', anychart.stockModule.math.trix.calculationFunction);
goog.exportSymbol('anychart.math.trix.createComputer', anychart.stockModule.math.trix.createComputer);
