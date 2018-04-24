goog.provide('anychart.stockModule.math.obv');
goog.require('anychart.utils');


/**
 * @typedef {{
 *    prevObvValue: number,
 *    prevCloseValue:number,
 *    dispose: Function
 * }}
 */
anychart.stockModule.math.obv.Context;


/**
 * Creates context for OBV indicator calculation.
 * @return {anychart.stockModule.math.obv.Context}
 */
anychart.stockModule.math.obv.initContext = function () {
    return {
        prevObvValue: NaN,
        prevCloseValue: NaN,
        /**
         * @this {anychart.stockModule.math.obv.Context}
         */
        'dispose': function () {
            this.prevObvValue = NaN;
            this.prevCloseValue = NaN;
        }
    };
};


/**
 * Start calculation function for OBV indicator calculation.
 * @param {anychart.stockModule.math.obv.Context} context
 * @this {anychart.stockModule.math.obv.Context}
 */
anychart.stockModule.math.obv.startFunction = function (context) {
    context.prevObvValue = NaN;
    context.prevCloseValue = NaN;
};


/**
 * Calculates OBV.
 * @param {anychart.stockModule.data.TableComputer.RowProxy} row
 * @param {anychart.stockModule.math.obv.Context} context
 * @this {anychart.stockModule.math.obv.Context}
 */
anychart.stockModule.math.obv.calculationFunction = function (row, context) {
    var close = row.get('close');
    var volume = row.get('volume');
    volume = anychart.utils.toNumber(volume);
    close = anychart.utils.toNumber(close);
    var result = anychart.stockModule.math.obv.calculate(context, close, volume);
    row.set('result', result);
};


/**
 * Creates OBV computer for the given table mapping.
 * @param {anychart.stockModule.data.TableMapping} mapping
 * @return {anychart.stockModule.data.TableComputer}
 */
anychart.stockModule.math.obv.createComputer = function (mapping) {
    var result = mapping.getTable().createComputer(mapping);
    result.setContext(anychart.stockModule.math.obv.initContext());
    result.setStartFunction(anychart.stockModule.math.obv.startFunction);
    result.setCalculationFunction(anychart.stockModule.math.obv.calculationFunction);
    result.addOutputField('result');
    return result;
};


/**
 * Calculates next OBV value based on a previous OBV value and current close value.
 * On first calculation pass 0.
 * @param {anychart.stockModule.math.obv.Context} context
 * @param {number} close Close value
 * @param {number} volume Volume value
 * @return {number}
 */
anychart.stockModule.math.obv.calculate = function (context, close, volume) {
    if (isNaN(context.prevObvValue)) {
        context.prevCloseValue = close;
        context.prevObvValue = 0;
        return 0;
    }

    var prevObv = context.prevObvValue;
    var obvResult = NaN;
    if (context.prevCloseValue > close) {
        obvResult = prevObv + volume;
    }

    if (context.prevCloseValue < close) {
        obvResult = prevObv - volume;
    }

    if (context.prevCloseValue === close) {
        obvResult = prevObv;
    }

    context.prevObvValue = obvResult;
    context.prevCloseValue = close;
    return obvResult;
};


//exports
goog.exportSymbol('anychart.math.OBV.initContext', anychart.stockModule.math.obv.initContext);
goog.exportSymbol('anychart.math.OBV.startFunction', anychart.stockModule.math.obv.startFunction);
goog.exportSymbol('anychart.math.OBV.calculate', anychart.stockModule.math.obv.calculate);
goog.exportSymbol('anychart.math.OBV.calculationFunction', anychart.stockModule.math.obv.calculationFunction);
goog.exportSymbol('anychart.math.OBV.createComputer', anychart.stockModule.math.obv.createComputer);
