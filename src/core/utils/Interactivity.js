goog.provide('anychart.core.utils.Interactivity');
goog.require('anychart.core.Base');



/**
 * Class is settings for interactivity (like hover, select).
 * @param {anychart.core.Chart} parent Maps should be sets as parent.
 * @constructor
 * @extends {anychart.core.Base}
 */
anychart.core.utils.Interactivity = function(parent) {
  anychart.core.utils.Interactivity.base(this, 'constructor');

  /**
   * @type {anychart.core.Chart}
   * @private
   */
  this.parent_ = parent;

  /**
   * @type {anychart.enums.HoverMode}
   * @private
   */
  this.hoverMode_;

  /**
   * @type {anychart.enums.SelectionMode}
   * @private
   */
  this.selectionMode_;

  /**
   * @type {boolean}
   * @private
   */
  this.allowMultiSeriesSelection_;

  /**
   * @type {number}
   * @private
   */
  this.spotRadius_;

  /**
   * @type {boolean}
   * @private
   */
  this.unselectOnClickOutOfPoint_;

  /**
   * @type {boolean}
   * @private
   */
  this.multiSelectOnClick_;

  /**
   * @type {Object.<boolean>}
   * @private
   */
  this.zoomOnMouseWheel_ = {};
};
goog.inherits(anychart.core.utils.Interactivity, anychart.core.Base);


/**
 * Supported signals.
 * @type {number}
 */
anychart.core.utils.Interactivity.prototype.SUPPORTED_SIGNALS = anychart.Signal.NEEDS_REAPPLICATION;


/**
 *
 * @param {boolean=} opt_value .
 * @return {anychart.core.utils.Interactivity|boolean}
 */
anychart.core.utils.Interactivity.prototype.multiSelectOnClick = function(opt_value) {
  if (goog.isDef(opt_value)) {
    opt_value = !!opt_value;
    if (opt_value != this.multiSelectOnClick_) {
      this.multiSelectOnClick_ = opt_value;
    }
    return this;
  }
  return /** @type {boolean} */(this.multiSelectOnClick_);
};


/**
 *
 * @param {boolean=} opt_value .
 * @return {anychart.core.utils.Interactivity|boolean}
 */
anychart.core.utils.Interactivity.prototype.unselectOnClickOutOfPoint = function(opt_value) {
  if (goog.isDef(opt_value)) {
    opt_value = !!opt_value;
    if (opt_value != this.unselectOnClickOutOfPoint_) {
      this.unselectOnClickOutOfPoint_ = opt_value;
    }
    return this;
  }
  return /** @type {boolean} */(this.unselectOnClickOutOfPoint_);
};


/**
 * @param {(anychart.enums.HoverMode|string)=} opt_value Hover mode.
 * @return {anychart.core.utils.Interactivity|anychart.enums.HoverMode} .
 */
anychart.core.utils.Interactivity.prototype.hoverMode = function(opt_value) {
  if (goog.isDef(opt_value)) {
    opt_value = anychart.enums.normalizeHoverMode(opt_value);
    if (opt_value != this.hoverMode_) {
      this.hoverMode_ = opt_value;
      this.dispatchSignal(anychart.Signal.NEEDS_REAPPLICATION);
    }
    return this;
  }
  return /** @type {anychart.enums.HoverMode}*/(this.hoverMode_);
};


/**
 * @param {(anychart.enums.SelectionMode|string)=} opt_value Selection mode.
 * @return {anychart.core.utils.Interactivity|anychart.enums.SelectionMode} .
 */
anychart.core.utils.Interactivity.prototype.selectionMode = function(opt_value) {
  if (goog.isDef(opt_value)) {
    opt_value = anychart.enums.normalizeSelectMode(opt_value);
    if (opt_value != this.selectionMode_) {
      this.selectionMode_ = opt_value;
    }
    return this;
  }
  return /** @type {anychart.enums.SelectionMode}*/(this.selectionMode_);
};


/**
 * @param {number=} opt_value Spot radius.
 * @return {anychart.core.utils.Interactivity|number} .
 */
anychart.core.utils.Interactivity.prototype.spotRadius = function(opt_value) {
  if (goog.isDef(opt_value)) {
    opt_value = anychart.utils.toNumber(opt_value);
    if (opt_value != this.spotRadius_) {
      this.spotRadius_ = opt_value;
    }
    return this;
  }
  return /** @type {number}*/(this.spotRadius_);
};


/**
 * todo (blackart) not implemented yet, I don't remember what it should be to do.
 * @param {boolean=} opt_value Allow selects more then one series on a chart or not.
 * @return {anychart.core.utils.Interactivity|boolean} .
 */
anychart.core.utils.Interactivity.prototype.allowMultiSeriesSelection = function(opt_value) {
  if (goog.isDef(opt_value)) {
    opt_value = !!opt_value;
    if (opt_value != this.allowMultiSeriesSelection_) {
      this.allowMultiSeriesSelection_ = opt_value;
    }
    return this;
  }
  return /** @type {boolean}*/(this.allowMultiSeriesSelection_);
};


/**
 * Allows use mouse wheel for zooming.
 * @param {boolean=} opt_value Whether will use mouse wheel.
 * @param {boolean=} opt_inverted flag that inverts zoom behaviour.
 * @return {anychart.core.utils.Interactivity|Object.<boolean>} .
 */
anychart.core.utils.Interactivity.prototype.zoomOnMouseWheel = function(opt_value, opt_inverted) {
  if (goog.isDef(opt_value)) {
    if (arguments.length == 1) {
      if (goog.isObject(opt_value)) {
        this.zoomOnMouseWheel_['value'] = !!opt_value['value'];
        this.zoomOnMouseWheel_['inverted'] = !!opt_value['inverted'];
      } else
        this.zoomOnMouseWheel_['value'] = !!opt_value;
    } else if (arguments.length > 1) {
      this.zoomOnMouseWheel_['value'] = !!opt_value;
      this.zoomOnMouseWheel_['inverted'] = !!opt_inverted;
    }
    return this;
  }
  return /** @type {Object.<boolean>} */(this.zoomOnMouseWheel_);
};


/**
 * @inheritDoc
 */
anychart.core.utils.Interactivity.prototype.setupByJSON = function(config, opt_default) {
  anychart.core.utils.Interactivity.base(this, 'setupByJSON', config, opt_default);

  this.parent_.suspendSignalsDispatching();
  this.hoverMode(config['hoverMode']);
  this.selectionMode(config['selectionMode']);
  this.spotRadius(config['spotRadius']);
  this.allowMultiSeriesSelection(config['allowMultiSeriesSelection']);
  this.multiSelectOnClick(config['multiSelectOnClick']);
  this.unselectOnClickOutOfPoint(config['unselectOnClickOutOfPoint']);
  this.parent_.resumeSignalsDispatching(true);
};


/**
 * Serializes element to JSON.
 * @return {!Object} Serialized JSON object.
 */
anychart.core.utils.Interactivity.prototype.serialize = function() {
  var json = {};
  json['hoverMode'] = this.hoverMode();
  json['selectionMode'] = this.selectionMode();
  json['spotRadius'] = this.spotRadius();
  json['allowMultiSeriesSelection'] = this.allowMultiSeriesSelection();
  json['multiSelectOnClick'] = this.multiSelectOnClick();
  json['unselectOnClickOutOfPoint'] = this.unselectOnClickOutOfPoint();
  return json;
};


//exports
(function() {
  var proto = anychart.core.utils.Interactivity.prototype;
  //proto['allowMultiSeriesSelection'] = proto.allowMultiSeriesSelection;
  //TODO(AntonKagakin): uncomment this line when zoom will be implemented in chart
  //TODO(AntonKagakin): also remove export from map and stock interactivity class
  //proto['zoomOnMouseWheel'] = proto.zoomOnMouseWheel;
  proto['multiSelectOnClick'] = proto.multiSelectOnClick;
  proto['unselectOnClickOutOfPoint'] = proto.unselectOnClickOutOfPoint;
  proto['hoverMode'] = proto.hoverMode;
  proto['selectionMode'] = proto.selectionMode;
  proto['spotRadius'] = proto.spotRadius;
})();
