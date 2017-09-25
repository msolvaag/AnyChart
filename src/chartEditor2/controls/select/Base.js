goog.provide('anychart.chartEditor2Module.select.Base');

goog.require('anychart.chartEditor2Module.events');
goog.require('anychart.chartEditor2Module.select.Renderer');

goog.require('goog.ui.Option');
goog.require('goog.ui.Select');



/**
 *
 * @param {goog.ui.ControlContent=} opt_caption Default caption or existing DOM
 *     structure to display as the button's caption when nothing is selected.
 *     Defaults to no caption.
 * @param {goog.ui.Menu=} opt_menu Menu containing selection options.
 * @param {goog.ui.ButtonRenderer=} opt_renderer Renderer used to render or
 *     decorate the control; defaults to {@link goog.ui.MenuButtonRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @param {!goog.ui.MenuRenderer=} opt_menuRenderer Renderer used to render or
 *     decorate the menu; defaults to {@link goog.ui.MenuRenderer}.
 * @constructor
 * @extends {goog.ui.Select}
 */
anychart.chartEditor2Module.select.Base = function(opt_caption, opt_menu, opt_renderer, opt_domHelper, opt_menuRenderer) {
  anychart.chartEditor2Module.select.Base.base(this, 'constructor', opt_caption, opt_menu,
      opt_renderer || anychart.chartEditor2Module.select.Renderer.getInstance(),
      opt_domHelper, opt_menuRenderer);

  this.options_ = [];
  this.captions_ = [];
  this.icons_ = [];

  /**
   * Editor Model key.
   *
   * @type {anychart.chartEditor2Module.EditorModel.Key}
   * @protected
   */
  this.key = [];

  /**
   * @type {boolean}
   * @protected
   */
  this.suspendDispatch = false;

  /**
   * @type {boolean}
   * @protected
   */
  this.noRebuild = false;

  /**
   * Target object (usually it's chart)
   * @type {?Object}
   * @protected
   */
  this.target = null;
};
goog.inherits(anychart.chartEditor2Module.select.Base, goog.ui.Select);


/**
 * @type {Array.<string>}
 * @private
 */
anychart.chartEditor2Module.select.Base.prototype.options_;


/**
 * @type {Array.<string>}
 * @private
 */
anychart.chartEditor2Module.select.Base.prototype.captions_;


/**
 * @type {Array.<string>}
 * @private
 */
anychart.chartEditor2Module.select.Base.prototype.icons_;


/**
 * Set model for options.
 * @param {Array.<Array|string>} options
 */
anychart.chartEditor2Module.select.Base.prototype.setOptions = function(options) {
  this.options_ = [];
  var updateCaption = false;
  for (var i = 0; i < options.length; i++) {
    var option = options[i];
    if (option) {
      if (goog.isArray(option)) {
        if (!updateCaption) {
          updateCaption = true;
          this.captions_ = [];
        }

        this.captions_.push(option[0]);
        this.options_.push(option[1]);
      } else
        this.options_.push(option);
    }
  }
};


/**
 * Set caption for options.
 * @param {Array.<?string>} captions
 */
anychart.chartEditor2Module.select.Base.prototype.setCaptions = function(captions) {
  this.captions_ = captions;
};


/**
 * Set caption for options.
 * @param {Array.<string>} icons
 */
anychart.chartEditor2Module.select.Base.prototype.setIcons = function(icons) {
  this.icons_ = icons;
};


/** @param {anychart.chartEditor2Module.EditorModel.Key} value */
anychart.chartEditor2Module.select.Base.prototype.setKey = function(value) {
  this.key = value;
};


/**
 * Gets key.
 * @return {anychart.chartEditor2Module.EditorModel.Key}
 */
anychart.chartEditor2Module.select.Base.prototype.getKey = function() {
  return this.key;
};


/** @override */
anychart.chartEditor2Module.select.Base.prototype.createDom = function() {
  anychart.chartEditor2Module.select.Base.base(this, 'createDom');

  this.updateOptions();
};


/**
 *
 * @param {string=} opt_default
 */
anychart.chartEditor2Module.select.Base.prototype.updateOptions = function(opt_default) {
  var optionItem;

  if (this.options_.length) {
    for (var a = this.getItemCount(); a--;) {
      this.removeItemAt(a);
    }

    for (var i = 0; i < this.options_.length; i++) {

      var option = this.options_[i];
      var caption = this.captions_[i];
      var icon = this.icons_[i];
      var content = this.createContentElements(option, caption, icon);

      optionItem = new goog.ui.Option(content, option);
      optionItem.setContent(content);
      optionItem.setModel(option);
      this.addItemAt(optionItem, i);
    }
  } else {
    this.captions_.length = 0;
    // Items are created, but options_ are not filled
    for (var k = 0; k < this.getItemCount(); k++) {
      optionItem = this.getItemAt(k);
      this.options_.push(/** @type {string} */(optionItem.getModel()));
      this.captions_.push(/** @type {string} */(optionItem.getContent()));
    }
  }

  if (opt_default && !this.getValue())
    this.setValue(opt_default);
};


/**
 * @param {string} option
 * @param {string} caption
 * @param {string} icon
 * @return {Array|string}
 */
anychart.chartEditor2Module.select.Base.prototype.createContentElements = function(option, caption, icon) {
  if (!goog.isDefAndNotNull(option)) return this.getCaption();
  caption = goog.isDef(caption) ? caption : option.toString();
  var content = [];
  if (caption) content.push(caption);
  if (icon) content.push(goog.dom.createDom(goog.dom.TagName.I, [goog.getCssName('anychart-chart-editor-icon'), icon]));
  return content;
};


/** @override */
anychart.chartEditor2Module.select.Base.prototype.enterDocument = function() {
  anychart.chartEditor2Module.select.Base.base(this, 'enterDocument');

  goog.events.listen(this, goog.ui.Component.EventType.CHANGE, this.onChange, false, this);
};


/** @override */
anychart.chartEditor2Module.select.Base.prototype.exitDocument = function() {
  goog.events.unlisten(this, goog.ui.Component.EventType.CHANGE, this.onChange, false, this);

  anychart.chartEditor2Module.select.Base.base(this, 'exitDocument');
};


/**
 * @param {goog.events.Event} evt
 * @protected
 */
anychart.chartEditor2Module.select.Base.prototype.onChange = function(evt) {
  evt.preventDefault();
  evt.stopPropagation();

  if (!this.suspendDispatch && this.editorModel && goog.isDefAndNotNull(this.getValue())) {
    if (this.callback)
      this.editorModel.callbackByString(this.callback, this);
    else
      this.editorModel.setValue(this.key, this.getValue(), false, this.noRebuild);
  }
};


/**
 * Connects control with EditorMode.
 *
 * @param {anychart.chartEditor2Module.EditorModel} model Editor model instance to connect with.
 * @param {anychart.chartEditor2Module.EditorModel.Key} key Key of control's field in model's structure.
 * @param {string=} opt_callback Callback function that will be called on control's value change instead of simple change value in model.
 *  This function should be model's public method.
 * @param {boolean=} opt_noRebuild Should or not rebuild target (chart) on change value of this control.
 */
anychart.chartEditor2Module.select.Base.prototype.init = function(model, key, opt_callback, opt_noRebuild) {
  /**
   * @type {anychart.chartEditor2Module.EditorModel}
   * @protected
   */
  this.editorModel = model;

  this.key = key;

  this.callback = opt_callback;

  this.noRebuild = !!opt_noRebuild;
};


/**
 * @param {*} value
 * @param {?string=} opt_value2
 */
anychart.chartEditor2Module.select.Base.prototype.setValue = function(value, opt_value2) {
  var selectionModel = this.getSelectionModel();
  if (goog.isDefAndNotNull(value) && selectionModel) {
    for (var i = 0, item; item = selectionModel.getItemAt(i); i++) {
      if (item &&
          typeof item.getValue == 'function' && item.getValue() == value &&
          (!goog.isDef(opt_value2) || typeof item.getValue2 == 'function' && item.getValue2() == opt_value2)
      ) {
        this.setSelectedItem(/** @type {!goog.ui.MenuItem} */ (item));
        return;
      }
    }
  }

  this.setSelectedItem(null);
};


/**
 * Sets value of this control to model's value.
 *
 * @param {?string=} opt_value2 Second value in case of using OptionWithTwoValues.
 */
anychart.chartEditor2Module.select.Base.prototype.setValueByModel = function(opt_value2) {
  var value;
  this.suspendDispatch = true;

  if (this.editorModel && this.key)
    value = this.editorModel.getValue(this.key);

  if (goog.isDef(value))
    this.setValue(value, opt_value2);

  if (!this.getSelectedItem()) {
    console.warn("no model value by key:", this.key);
  }

  this.suspendDispatch = false;
};


/**
 * Sets value of this control to target's value.
 * Updates model state.
 * @param {?Object} target Object, who's property corresponds to control's key. Used to get value of this control.
 */
anychart.chartEditor2Module.select.Base.prototype.setValueByTarget = function(target) {
  this.target = target;

  var stringKey = anychart.chartEditor2Module.EditorModel.getStringKey(this.key);
  var value = /** @type {string} */(anychart.bindingModule.exec(this.target, stringKey));

  this.suspendDispatch = true;
  this.setValue(value);
  this.suspendDispatch = false;
};


/**
 * Returns value2 of selected option (if option are anychart.chartEditor2Module.select.MenuItemWithTwoValues instances.
 *
 * @return {?string}
 */
anychart.chartEditor2Module.select.Base.prototype.getValue2 = function() {
  var selectedItem = /** @type {?(goog.ui.MenuItem|anychart.chartEditor2Module.select.MenuItemWithTwoValues)} */(this.getSelectedItem());
  return selectedItem ? selectedItem.getValue2() : null;
};


/**
 * Hides control by assigning 'hidden' class
 */
anychart.chartEditor2Module.select.Base.prototype.hide = function() {
  goog.dom.classlist.add(this.getElement(), 'hidden');
};


/**
 * Shows control by removing 'hidden' class
 */
anychart.chartEditor2Module.select.Base.prototype.show = function() {
  goog.dom.classlist.remove(this.getElement(), 'hidden');
};


/**
 * @override
 * @suppress {visibility}
 */
anychart.chartEditor2Module.select.Base.prototype.updateCaption = function() {
  var selectedIndex = this.getSelectedIndex();
  var item = this.getSelectedItem();
  var option = this.options_[selectedIndex];
  var caption = this.captions_[selectedIndex];
  var icon = this.icons_[selectedIndex];
  var content = this.createContentElements(option, caption, icon);
  this.setContent(content);

  var contentElement = this.getRenderer().getContentElement(this.getElement());
  // Despite the ControlRenderer interface indicating the return value is
  // {Element}, many renderers cast element.firstChild to {Element} when it is
  // really {Node}. Checking tagName verifies this is an {!Element}.
  if (contentElement && this.getDomHelper().isElement(contentElement)) {
    if (this.initialAriaLabel_ == null) {
      this.initialAriaLabel_ = goog.a11y.aria.getLabel(contentElement);
    }
    var itemElement = item ? item.getElement() : null;
    goog.a11y.aria.setLabel(contentElement, itemElement ?
        goog.a11y.aria.getLabel(itemElement) : this.initialAriaLabel_);
    this.updateAriaActiveDescendant_();
  }
};


/** @inheritDoc */
anychart.chartEditor2Module.select.Base.prototype.addItemAt = function(item, index) {
  anychart.chartEditor2Module.select.Base.base(this, 'addItemAt', item, index);


};