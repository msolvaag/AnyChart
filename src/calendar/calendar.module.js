/**
 * @fileoverview anychart.calendarModule.entry namespace file.
 * @suppress {extraRequire}
 */

goog.provide('anychart.calendarModule.entry');
goog.require('anychart.calendarModule.Chart');


/**
 * Default calendar chart.<br/>
 * @param {Array=} opt_data Data for calendar chart.
 */
anychart.calendar = function(opt_data) {
  var chart = new anychart.calendarModule.Chart(opt_data);
  chart.setType(anychart.enums.ChartTypes.CALENDAR);

  chart.setupInternal(true, anychart.getFullTheme('calendar'));
};
anychart.chartTypesMap[anychart.enums.ChartTypes.CALENDAR] = anychart.calendar;

//exports
goog.exportSymbol('anychart.calendar', anychart.calendar);
