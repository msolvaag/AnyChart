goog.provide('anychart.ganttModule.defaultTheme');


goog.mixin(goog.global['anychart']['themes']['defaultTheme'], {
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
        'background': {
          'enabled': false
        },
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
