goog.provide('anychart.ganttModule.defaultTheme');


goog.mixin(goog.global['anychart']['themes']['defaultTheme'], {

  'defaultDataGrid': {
    'isStandalone': true,
    'headerHeight': 25,

    'backgroundFill': 'none',
    'columnStroke': anychart.core.defaultTheme.ganttDefaultStroke,

    'rowHoverFill': anychart.core.defaultTheme.returnSourceColor,
    'rowSelectedFill': anychart.core.defaultTheme.returnSourceColor,

    'rowStroke': anychart.core.defaultTheme.ganttDefaultStroke,
    'rowOddFill': '#fff',
    'rowEvenFill': '#fff',
    'rowFill': '#fff',

    'buttons': {
      'size': 15,
      'padding': [0, 0, 0, 0],
      'cursor': 'pointer',
      'normal': {
        'hAlign': 'center',
        'vAlign': 'middle',
        'fontColor': '#7c868e',
        'fontSize': '10px'
      },
      'collapsed': {
        'hAlign': 'center',
        'vAlign': 'middle',
        'text': '+'
      },
      'expanded': {
        'hAlign': 'center',
        'vAlign': 'middle',
        'text': '-'
      }
    },

    'zIndex': 5,
    'editing': false,
    'editStructurePreviewFill': {
      'color': '#4285F4',
      'opacity': 0.2
    },
    'editStructurePreviewStroke': {
      'color': '#4285F4',
      'thickness': 2
    },
    'editStructurePreviewDashStroke': {
      'color': '#4285F4',
      'dash': '4 4'
    },
    'headerFill': '#f7f7f7',
    'tooltip': {
      'padding': 5,
      'title': {
        'enabled': true,
        'fontSize': '14px',
        'fontWeight': 'normal',
        'fontColor': '#e5e5e5'
      },
      'separator': {
        'enabled': true
      },
      /**
       * @this {*}
       * @return {string}
       */
      'format': function() {
        var name = this['name'];
        return (name !== void 0) ? name + '' : '';
      }
    },
    'defaultColumnSettings': {
      'width': 90,
      'buttonCursor': 'pointer',
      'cellTextSettings': {
        'enabled': true,
        'wordBreak': 'break-all',
        'anchor': 'left-top',
        'vAlign': 'middle',
        'padding': {
          'top': 0,
          'right': 5,
          'bottom': 0,
          'left': 5
        },
        'background': null,
        'fontSize': 11,
        'disablePointerEvents': true
      },
      'depthPaddingMultiplier': 0,
      'collapseExpandButtons': false,
      'title': {
        'enabled': true,
        'margin': 0,
        'vAlign': 'middle',
        'background': {
          'enabled': false
        }
      },
      /**
       * @this {*}
       * @return {string}
       */
      'format': function() {
        return '';
      }
    },
    'columns': [
      {
        'width': 50,
        /**
         * @this {*}
         * @return {string}
         */
        'format': function() {
          var val = this['item']['meta']('index');
          return (val != null) ? (val + 1) + '' : '';
        },
        'title': {
          'text': '#'
        }
      },
      {
        'width': 170,
        'collapseExpandButtons': true,
        'depthPaddingMultiplier': 15,
        /**
         * @this {*}
         * @return {string}
         */
        'format': function() {
          var val = this['name'];
          return (val != null) ? (val + '') : '';
        },
        'title': {
          'text': 'Name'
        }
      }
    ]
  },

  'defaultTimeline': {
    'isStandalone': true,

    'columnStroke': anychart.core.defaultTheme.ganttDefaultStroke,
    'backgroundFill': 'none',

    'rowHoverFill': anychart.core.defaultTheme.returnSourceColor,
    'rowSelectedFill': anychart.core.defaultTheme.returnSourceColor,
    'selectedElementFill': anychart.core.defaultTheme.returnSourceColor,
    'selectedElementStroke': anychart.core.defaultTheme.returnSourceColor,

    'rowStroke': anychart.core.defaultTheme.ganttDefaultStroke,
    'rowOddFill': '#fff',
    'rowEvenFill': '#fff',
    'rowFill': '#fff',

    'zIndex': 5,
    'headerHeight': 70,
    'editing': false,

    'connectorPreviewStroke': {
      'color': '#545f69',
      'dash': '3 3'
    },

    'editPreviewFill': {
      'color': '#fff',
      'opacity': 0.00001
    },

    'editPreviewStroke': {
      'color': '#aaa',
      'dash': '3 3'
    },

    'editProgressFill': '#EAEAEA',
    'editProgressStroke': '#545f69',
    'editIntervalThumbFill': '#EAEAEA',
    'editIntervalThumbStroke': '#545f69',
    'editConnectorThumbFill': '#EAEAEA',
    'editConnectorThumbStroke': '#545f69',

    'editStructurePreviewFill': {
      'color': '#4285F4',
      'opacity': 0.2
    },

    'editStructurePreviewStroke': {
      'color': '#4285F4',
      'thickness': 2
    },

    'editStructurePreviewDashStroke': {
      'color': '#4285F4',
      'dash': '4 4'
    },

    'editStartConnectorMarkerType': 'circle',
    'editStartConnectorMarkerSize': 10,
    'editStartConnectorMarkerHorizontalOffset': 0,
    'editStartConnectorMarkerVerticalOffset': 0,
    'editFinishConnectorMarkerType': 'circle',
    'editFinishConnectorMarkerSize': 10,
    'editFinishConnectorMarkerHorizontalOffset': 0,
    'editFinishConnectorMarkerVerticalOffset': 0,
    'editIntervalWidth': 3,

    'baseFill': anychart.core.defaultTheme.returnSourceColor,
    'baseStroke': anychart.core.defaultTheme.returnSourceColor,

    'baseBarAnchor': 'auto',
    'baseBarPosition': 'left-center',
    'baseBarOffset': 0,
    'baseBarHeight': '70%',
    'progressBarHeight': '100%',
    'progressBarPosition': 'left-center',
    'progressBarAnchor': 'left-center',
    //all another settings should be set to 'null' for serialization demerging purposes

    'connectorFill': '#545f69',
    'connectorStroke': '#545f69',
    'baselineAbove': false,
    'tooltip': {
      'padding': 5,
      'title': {
        'enabled': true,
        'fontSize': '14px',
        'fontWeight': 'normal',
        'fontColor': '#e5e5e5'
      },
      'separator': {
        'enabled': true
      },
      'zIndex': 100
    },
    'labels': {
      'enabled': true,
      'anchor': 'left-center',
      'position': 'right-center',
      'padding': {
        'top': 3,
        'right': 5,
        'bottom': 3,
        'left': 5
      },
      'vAlign': 'middle',
      'background': null,
      'fontSize': 11,
      'zIndex': 40,
      'disablePointerEvents': true
    },
    'markers': {
      'anchor': 'center-top',
      'zIndex': 50,
      'type': 'star5',
      'fill': '#ff0',
      'stroke': '2 red'
    },
    'defaultLineMarkerSettings': {
      'layout': 'vertical',
      'zIndex': 1.5
    },
    'defaultRangeMarkerSettings': {
      'layout': 'vertical',
      'zIndex': 1
    },
    'defaultTextMarkerSettings': {
      'layout': 'vertical',
      'zIndex': 2
    },
    'header': {
      'background': {
        'enabled': true,
        'fill': '#cecece'
      },
      'fill': '#f7f7f7',
      'stroke': anychart.core.defaultTheme.ganttDefaultStroke,
      'anchor': 'left-top',
      'fontSize': 10,
      'vAlign': 'middle',
      //'format': anychart.core.defaultTheme.returnValueAsIs,
      'padding': {
        'top': 0,
        'right': 5,
        'bottom': 0,
        'left': 5
      },
      'disablePointerEvents': true
    }
  },

  // merge with chart
  'ganttBase': {
    'defaultRowHoverFill': '#f8fafb',
    'defaultRowSelectedFill': '#ebf1f4',
    'splitterPosition': '30%',
    'headerHeight': 70,
    'rowStroke': '#cecece',
    'rowHoverFill': anychart.core.defaultTheme.returnSourceColor,
    'rowSelectedFill': anychart.core.defaultTheme.returnSourceColor,
    'editing': false,
    'title': {
      'enabled': false
    },
    'legend': {
      'enabled': false
    },
    'background': {
      'fill': '#fff'
    },
    'margin': 0,
    'padding': 0,
    'dataGrid': {
      'isStandalone': false,
      'backgroundFill': 'none',
      'tooltip': {
        'zIndex': 100
      }
    },
    'timeline': {
      'isStandalone': false,
      'labels': {
        'padding': [0, 4, 0, 4]
      },
      'header': {
        'enabled': true,
        'overlay': {
          'enabled': false
        },
        'zIndex': 2,
        'vAlign': 'middle',
        'hAlign': 'center',
        'textOverflow': '',
        'fill': 'none',
        'stroke': '#ccc',
        'padding': [2, 10, 2, 10],
        'fontSize': 11,
        'fontWeight': 'bold',
        'fontFamily': '"Helvetica Neue", Helvetica, sans-serif',
        'drawTopLine': false,
        'drawRightLine': false,
        'drawBottomLine': true,
        'drawLeftLine': false
      }
    }
  },

  'ganttResource': {
    'dataGrid': {
      'tooltip': {
        'titleFormat': '{%Name}',
        'format': 'Start Date: {%start}\nEnd Date: {%end}'
      }
    },
    'timeline': {
      'tooltip': {
        'titleFormat': '{%Name}',
        'format': 'Start Date: {%start}\nEnd Date: {%end}'
      },
      'labels': {
        'format': 'Progress Label',
        'position': 'center',
        'anchor': 'center',
        'enabled': false
      }
    }
  },
  'ganttProject': {
    'dataGrid': {
      'tooltip': {
        'titleFormat': '{%Name}',
        'format': 'Start Date: {%actualStart}\nEnd Date: {%actualEnd}\nComplete: {%progress}'
      }
    },
    'timeline': {
      'tooltip': {
        'titleFormat': '{%Name}',
        'format': 'Start Date: {%actualStart}\nEnd Date: {%actualEnd}\nComplete: {%progress}'
      },
      'baseLabels': {
        'format': '{%Progress}',
        'position': 'right-center',
        'anchor': 'left-center',
        'enabled': null
      },
      'baselineLabels': {
        'position': 'right-center',
        'anchor': 'left-center',
        'format': 'Baseline Label',
        'enabled': false
      },
      'parentLabels': {
        'format': '{%Progress}',
        'position': 'right-center',
        'anchor': 'left-center',
        'enabled': null
      },
      'milestoneLabels': {
        'format': '{%Name}',
        'anchor': 'left-center',
        'position': 'right-center',
        'enabled': null
      },
      'progressLabels': {
        'format': '{%Progress}',
        'enabled': false
      }
    }
  }
});

goog.mixin(goog.global['anychart']['themes']['defaultTheme']['standalones'], {
  'projectTimeline': {
    'tooltip': {
      'titleFormat': '{%Name}',
      'format': 'Start Date: {%actualStart}\nEnd Date: {%actualEnd}\nComplete: {%progress}'
    }
  },
  'resourceTimeline': {
    'tooltip': {
      'titleFormat': '{%Name}',
      'format': 'Start Date: {%start}\nEnd Date: {%end}'
    }
  },
  'dataGrid': {
    'enabled': true,
    'zIndex': 0
  }
});
