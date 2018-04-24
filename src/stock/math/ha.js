goog.provide('anychart.stockModule.math.ha');
goog.require('anychart.stockModule.math.CycledQueue');
goog.require('anychart.utils');


/**
 * @typedef {{
 *    queue: !anychart.stockModule.math.CycledQueue,
 *    dispose: Function
 * }}
 */
anychart.stockModule.math.ha.Context;


/**
 * Creates context for HA indicator calculation.
 * @return {anychart.stockModule.math.ha.Context}
 */
anychart.stockModule.math.ha.initContext = function() {
  return {
    queue: anychart.math.cycledQueue(1),
    /**
     * @this {anychart.stockModule.math.ha.Context}
     */
    'dispose': function() {
      this.queue.clear();
    }
  };
};


/**
 * Start calculation function for HA indicator calculation.
 * @param {anychart.stockModule.math.ha.Context} context
 * @this {anychart.stockModule.math.ha.Context}
 */
anychart.stockModule.math.ha.startFunction = function(context) {
  context.queue.clear();
};


/**
 * Calculates HA.
 * @param {anychart.stockModule.data.TableComputer.RowProxy} row
 * @param {anychart.stockModule.math.ha.Context} context
 * @this {anychart.stockModule.math.ha.Context}
 */
anychart.stockModule.math.ha.calculationFunction = function(row, context) {
  var  currOpen = /** @type {number} */ (row.get('open'));
  var currHigh = /** @type {number} */ (row.get('high'));
  var currLow = /** @type {number} */ (row.get('low'));
  var currClose = /** @type {number} */ (row.get('close'));
  var /** @type {number} */ haOpen;
  var /** @type {number} */ haHigh;
  var /** @type {number} */ haLow;
  var /** @type {number} */ haClose;
  var storedValues;
  var missing = isNaN(currOpen) || isNaN(currHigh) || isNaN(currLow) || isNaN(currClose);
  var dequeuedValue = context.queue.get(0);
  if (missing) {
    haOpen = NaN;
    haHigh = NaN;
    haLow = NaN;
    haClose = NaN;
  } else {
    if (!goog.isDef(dequeuedValue)) {
      //alternative approach to calculate the haCandle open
      // haOpen = goog.math.average(currOpen, currClose);
      haOpen = currOpen;
      haHigh = currHigh;
      haLow = currLow;
      haClose = goog.math.average(currOpen, currHigh, currLow, currClose);
    }
    else {
      haOpen = goog.math.average(dequeuedValue.storedOpen, dequeuedValue.storedClose);
      haClose = goog.math.average(currOpen, currHigh, currLow, currClose);
      haHigh = Math.max(currHigh, haOpen, haClose);
      haLow = Math.min(currLow, haOpen, haClose);
    }
    storedValues = {
      storedOpen: haOpen,
      storedClose: haClose
    };
    context.queue.enqueue(storedValues);
  }
  row.set('haOpen', haOpen);
  row.set('haHigh', haHigh);
  row.set('haLow', haLow);
  row.set('haClose', haClose);
};


/**
 * Creates HA computer for the given table mapping.
 * @param {anychart.stockModule.data.TableMapping} mapping
 * @return {anychart.stockModule.data.TableComputer}
 */
anychart.stockModule.math.ha.createComputer = function(mapping) {
  var result = mapping.getTable().createComputer(mapping);
  result.setContext(anychart.stockModule.math.ha.initContext());
  result.setStartFunction(anychart.stockModule.math.ha.startFunction);
  result.setCalculationFunction(anychart.stockModule.math.ha.calculationFunction);
  result.addOutputField('haOpen');
  result.addOutputField('haHigh');
  result.addOutputField('haLow');
  result.addOutputField('haClose');
  return result;
};


//exports
goog.exportSymbol('anychart.math.ha.initContext', anychart.stockModule.math.ha.initContext);
goog.exportSymbol('anychart.math.ha.startFunction', anychart.stockModule.math.ha.startFunction);
goog.exportSymbol('anychart.math.ha.calculationFunction', anychart.stockModule.math.ha.calculationFunction);
goog.exportSymbol('anychart.math.ha.createComputer', anychart.stockModule.math.ha.createComputer);