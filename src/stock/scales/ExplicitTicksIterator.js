goog.provide('anychart.stockModule.scales.ExplicitTicksIterator');
goog.require('anychart.utils');
goog.require('goog.date.UtcDateTime');



/**
 * Scatter ticks iterator.
 * @constructor
 */
anychart.stockModule.scales.ExplicitTicksIterator = function() {
};


anychart.stockModule.scales.ExplicitTicksIterator.prototype.setup = function(majorTicks, minorTicks) {
  this.minorTicks = minorTicks;
  this.majorTicks = majorTicks;

  this.customTicks = goog.array.concat(this.minorTicks, this.majorTicks);
  goog.array.sort(this.customTicks);
  goog.array.removeDuplicates(this.customTicks);
};


/**
 * Resets the iterator to the pre-first position.
 */
anychart.stockModule.scales.ExplicitTicksIterator.prototype.reset = function() {
  this.currentIndex = -1;

  /**
   * @type {number}
   * @protected
   */
  this.preFirstMajor = NaN
};


/**
 * Advances to the next position.
 * @return {boolean}
 */
anychart.stockModule.scales.ExplicitTicksIterator.prototype.advance = function() {
  this.currentIndex++;
  this.current = this.customTicks[this.currentIndex];

  this.currentIsMajor = goog.array.contains(this.majorTicks, this.current);
  this.currentIsMinor = goog.array.contains(this.minorTicks, this.current);

  return !!this.current;
};


/**
 * Returns true if current tick value is major and false otherwise. A tick can be both major and minor at the same time.
 * @return {boolean}
 */
anychart.stockModule.scales.ExplicitTicksIterator.prototype.getCurrentIsMajor = function() {
  return this.currentIsMajor;
};


/**
 * Returns true if current tick value is minor and false otherwise. A tick can be both major and minor at the same time.
 * @return {boolean}
 */
anychart.stockModule.scales.ExplicitTicksIterator.prototype.getCurrentIsMinor = function() {
  return this.currentIsMinor;
};


/**
 * Returns current tick value.
 * @return {number}
 */
anychart.stockModule.scales.ExplicitTicksIterator.prototype.getCurrent = function() {
  return this.current;
};


/**
 * Returns hanging major tick value.
 * @return {number}
 */
anychart.stockModule.scales.ExplicitTicksIterator.prototype.getPreFirstMajor = function() {
  return this.preFirstMajor;
};


/**
 * Returns array of asked ticks.
 * @param {boolean} major
 * @return {!Array.<number>}
 */
anychart.stockModule.scales.ExplicitTicksIterator.prototype.toArray = function(major) {
  return this.customTicks.slice();
};
