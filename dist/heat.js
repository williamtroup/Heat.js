// src/ts/constant.ts
var HEAT_JS_ATTRIBUTE_NAME = "data-heat-js";

// src/ts/is.ts
var Is;
((Is2) => {
  function defined(value) {
    return value !== null && value !== void 0 && value.toString() !== "" /* empty */;
  }
  Is2.defined = defined;
  function definedObject(object) {
    return defined(object) && typeof object === "object";
  }
  Is2.definedObject = definedObject;
  function definedBoolean(object) {
    return defined(object) && typeof object === "boolean";
  }
  Is2.definedBoolean = definedBoolean;
  function definedString(object) {
    return defined(object) && typeof object === "string";
  }
  Is2.definedString = definedString;
  function definedFunction(object) {
    return defined(object) && typeof object === "function";
  }
  Is2.definedFunction = definedFunction;
  function definedNumber(object) {
    return defined(object) && typeof object === "number";
  }
  Is2.definedNumber = definedNumber;
  function definedArray(object) {
    return definedObject(object) && object instanceof Array;
  }
  Is2.definedArray = definedArray;
  function definedDate(object) {
    return definedObject(object) && object instanceof Date;
  }
  Is2.definedDate = definedDate;
  function invalidOptionArray(array, minimumLength = 1) {
    return !definedArray(array) || array.length < minimumLength;
  }
  Is2.invalidOptionArray = invalidOptionArray;
})(Is || (Is = {}));

// src/ts/data.ts
var Data;
((Data2) => {
  let String;
  ((String2) => {
    function newGuid() {
      const result2 = [];
      for (let charIndex = 0; charIndex < 32; charIndex++) {
        if (charIndex === 8 || charIndex === 12 || charIndex === 16 || charIndex === 20) {
          result2.push("-" /* dash */);
        }
        const character = Math.floor(Math.random() * 16).toString(16);
        result2.push(character);
      }
      return result2.join("" /* empty */);
    }
    String2.newGuid = newGuid;
    function padNumber(number) {
      const numberString = number.toString();
      return numberString.length === 1 ? "0" /* zero */ + numberString : numberString;
    }
    String2.padNumber = padNumber;
    function startsWithAnyCase(data, start) {
      return data.substring(0, start.length).toLowerCase() === start.toLowerCase();
    }
    String2.startsWithAnyCase = startsWithAnyCase;
  })(String = Data2.String || (Data2.String = {}));
  function getDefaultAnyString(value, defaultValue) {
    return typeof value === "string" ? value : defaultValue;
  }
  Data2.getDefaultAnyString = getDefaultAnyString;
  function getDefaultString(value, defaultValue) {
    return Is.definedString(value) ? value : defaultValue;
  }
  Data2.getDefaultString = getDefaultString;
  function getDefaultBoolean(value, defaultValue) {
    return Is.definedBoolean(value) ? value : defaultValue;
  }
  Data2.getDefaultBoolean = getDefaultBoolean;
  function getDefaultNumber(value, defaultValue) {
    return Is.definedNumber(value) ? value : defaultValue;
  }
  Data2.getDefaultNumber = getDefaultNumber;
  function getDefaultFunction(value, defaultValue) {
    return Is.definedFunction(value) ? value : defaultValue;
  }
  Data2.getDefaultFunction = getDefaultFunction;
  function getDefaultArray(value, defaultValue) {
    return Is.definedArray(value) ? value : defaultValue;
  }
  Data2.getDefaultArray = getDefaultArray;
  function getDefaultObject(value, defaultValue) {
    return Is.definedObject(value) ? value : defaultValue;
  }
  Data2.getDefaultObject = getDefaultObject;
  function getDefaultStringOrArray(value, defaultValue) {
    let result2 = defaultValue;
    if (Is.definedString(value)) {
      const values = value.toString().split(" " /* space */);
      if (values.length === 0) {
        value = defaultValue;
      } else {
        result2 = values;
      }
    } else {
      result2 = getDefaultArray(value, defaultValue);
    }
    return result2;
  }
  Data2.getDefaultStringOrArray = getDefaultStringOrArray;
})(Data || (Data = {}));

// src/ts/dom.ts
var DomElement;
((DomElement2) => {
  function createWithNoContainer(type) {
    const nodeType = type.toLowerCase();
    const isText = nodeType === "text";
    let result2 = isText ? document.createTextNode("" /* empty */) : document.createElement(nodeType);
    return result2;
  }
  DomElement2.createWithNoContainer = createWithNoContainer;
  function create(container, type, className = "" /* empty */, beforeNode = null) {
    const nodeType = type.toLowerCase();
    const isText = nodeType === "text";
    let result2 = isText ? document.createTextNode("" /* empty */) : document.createElement(nodeType);
    if (Is.defined(className)) {
      result2.className = className;
    }
    if (Is.defined(beforeNode)) {
      container.insertBefore(result2, beforeNode);
    } else {
      container.appendChild(result2);
    }
    return result2;
  }
  DomElement2.create = create;
  function createWithHTML(container, type, className, html, beforeNode = null) {
    const element = create(container, type, className, beforeNode);
    element.innerHTML = html;
    return element;
  }
  DomElement2.createWithHTML = createWithHTML;
  function getStyleValueByName(element, stylePropertyName, toNumber = false) {
    let value = null;
    if (document.defaultView.getComputedStyle) {
      value = document.defaultView.getComputedStyle(element, null).getPropertyValue(stylePropertyName);
    } else if (element.currentStyle) {
      value = element.currentStyle[stylePropertyName];
    }
    if (toNumber) {
      value = parseFloat(value);
    }
    return value;
  }
  DomElement2.getStyleValueByName = getStyleValueByName;
  function addClass(element, className) {
    element.className += " " /* space */ + className;
    element.className = element.className.trim();
  }
  DomElement2.addClass = addClass;
  function removeClass(element, className) {
    element.className = element.className.replace(className, "" /* empty */);
    element.className = element.className.trim();
  }
  DomElement2.removeClass = removeClass;
  function cancelBubble(e) {
    e.preventDefault();
    e.cancelBubble = true;
  }
  DomElement2.cancelBubble = cancelBubble;
  function getScrollPosition() {
    const doc = document.documentElement;
    const left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    return {
      left,
      top
    };
  }
  DomElement2.getScrollPosition = getScrollPosition;
  function showElementAtMousePosition(e, element) {
    let left = e.pageX;
    let top = e.pageY;
    const scrollPosition = getScrollPosition();
    element.style.display = "block";
    if (left + element.offsetWidth > window.innerWidth) {
      left -= element.offsetWidth;
    } else {
      left++;
    }
    if (top + element.offsetHeight > window.innerHeight) {
      top -= element.offsetHeight;
    } else {
      top++;
    }
    if (left < scrollPosition.left) {
      left = e.pageX + 1;
    }
    if (top < scrollPosition.top) {
      top = e.pageY + 1;
    }
    element.style.left = left + "px";
    element.style.top = top + "px";
  }
  DomElement2.showElementAtMousePosition = showElementAtMousePosition;
  function reverseChildrenOrder(parent) {
    const children = parent.children;
    let childrenLength = children.length - 1;
    for (; childrenLength--; ) {
      parent.appendChild(children[childrenLength]);
    }
  }
  DomElement2.reverseChildrenOrder = reverseChildrenOrder;
  function createCheckBox(container, labelText, checked = null, onClick = null) {
    const lineContainer = create(container, "div");
    const label = create(lineContainer, "label", "checkbox");
    const input = create(label, "input");
    input.type = "checkbox";
    if (Is.defined(onClick)) {
      input.onclick = onClick;
    }
    if (Is.defined(checked)) {
      input.checked = checked;
    }
    create(label, "span", "check-mark");
    createWithHTML(label, "span", "text", labelText);
    return {
      input,
      label
    };
  }
  DomElement2.createCheckBox = createCheckBox;
})(DomElement || (DomElement = {}));

// src/ts/datetime.ts
var DateTime;
((DateTime2) => {
  function getTotalDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }
  DateTime2.getTotalDaysInMonth = getTotalDaysInMonth;
  function getWeekdayNumber(date) {
    return date.getDay() - 1 < 0 ? 6 : date.getDay() - 1;
  }
  DateTime2.getWeekdayNumber = getWeekdayNumber;
  function getDayOrdinal(configuration, value) {
    let result2 = configuration.thText;
    if (value === 31 || value === 21 || value === 1) {
      result2 = configuration.stText;
    } else if (value === 22 || value === 2) {
      result2 = configuration.ndText;
    } else if (value === 23 || value === 3) {
      result2 = configuration.rdText;
    }
    return result2;
  }
  DateTime2.getDayOrdinal = getDayOrdinal;
  function getCustomFormattedDateText(configuration, dateFormat, date) {
    let result2 = dateFormat;
    const weekDayNumber = getWeekdayNumber(date);
    result2 = result2.replace("{dddd}", configuration.dayNames[weekDayNumber]);
    result2 = result2.replace("{dd}", Data.String.padNumber(date.getDate()));
    result2 = result2.replace("{d}", date.getDate().toString());
    result2 = result2.replace("{o}", getDayOrdinal(configuration, date.getDate()));
    result2 = result2.replace("{mmmm}", configuration.monthNames[date.getMonth()]);
    result2 = result2.replace("{mm}", Data.String.padNumber(date.getMonth() + 1));
    result2 = result2.replace("{m}", (date.getMonth() + 1).toString());
    result2 = result2.replace("{yyyy}", date.getFullYear().toString());
    result2 = result2.replace("{yyy}", date.getFullYear().toString().substring(1));
    result2 = result2.replace("{yy}", date.getFullYear().toString().substring(2));
    result2 = result2.replace("{y}", parseInt(date.getFullYear().toString().substring(2)).toString());
    return result2;
  }
  DateTime2.getCustomFormattedDateText = getCustomFormattedDateText;
})(DateTime || (DateTime = {}));

// src/heat.ts
(() => {
  let _configuration = {};
  let _elements_Day_Width = null;
  let _elements_DateCounts = {};
  const _internal_Name_Holiday = "HOLIDAY";
  const _local_Storage_Start_ID = "HJS_";
  const _default_MonthsToShow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const _default_DaysToShow = [1, 2, 3, 4, 5, 6, 7];
  function renderDisabledBackground(bindingOptions) {
    bindingOptions._currentView.disabledBackground = DomElement.create(bindingOptions._currentView.element, "div", "disabled");
  }
  function showDisabledBackground(bindingOptions) {
    if (Is.defined(bindingOptions._currentView.disabledBackground) && bindingOptions._currentView.disabledBackground.style.display !== "block") {
      bindingOptions._currentView.disabledBackground.style.display = "block";
    }
  }
  function hideDisabledBackground(bindingOptions) {
    if (Is.defined(bindingOptions._currentView.disabledBackground) && bindingOptions._currentView.disabledBackground.style.display !== "none") {
      bindingOptions._currentView.disabledBackground.style.display = "none";
    }
  }
  function render() {
    const tagTypes = _configuration.domElementTypes;
    const tagTypesLength = tagTypes.length;
    for (let tagTypeIndex = 0; tagTypeIndex < tagTypesLength; tagTypeIndex++) {
      const domElements = document.getElementsByTagName(tagTypes[tagTypeIndex]);
      const elements = [].slice.call(domElements);
      const elementsLength = elements.length;
      for (let elementIndex = 0; elementIndex < elementsLength; elementIndex++) {
        if (!renderElement(elements[elementIndex])) {
          break;
        }
      }
    }
  }
  function renderElement(element) {
    let result2 = true;
    if (Is.defined(element) && element.hasAttribute(HEAT_JS_ATTRIBUTE_NAME)) {
      const bindingOptionsData = element.getAttribute(HEAT_JS_ATTRIBUTE_NAME);
      if (Is.definedString(bindingOptionsData)) {
        const bindingOptions = getObjectFromString(bindingOptionsData);
        if (bindingOptions.parsed && Is.definedObject(bindingOptions.result)) {
          renderControl(renderBindingOptions(bindingOptions.result, element));
        } else {
          if (!_configuration.safeMode) {
            console.error(_configuration.attributeNotValidErrorText.replace("{{attribute_name}}", HEAT_JS_ATTRIBUTE_NAME));
            result2 = false;
          }
        }
      } else {
        if (!_configuration.safeMode) {
          console.error(_configuration.attributeNotSetErrorText.replace("{{attribute_name}}", HEAT_JS_ATTRIBUTE_NAME));
          result2 = false;
        }
      }
    }
    return result2;
  }
  function renderBindingOptions(data, element) {
    const bindingOptions = buildAttributeOptions(data);
    const view = !Is.definedString(bindingOptions.view) ? "" /* empty */ : bindingOptions.view.toLowerCase();
    let currentView = {};
    currentView.element = element;
    currentView.disabledBackground = null;
    currentView.configurationDialog = null;
    currentView.dayCheckBoxes = [];
    currentView.monthCheckBoxes = [];
    currentView.tooltip = null;
    currentView.tooltipTimer = null;
    currentView.mapContents = null;
    currentView.mapContentsScrollLeft = 0;
    currentView.year = bindingOptions.year;
    currentView.type = _configuration.unknownTrendText;
    currentView.isInFetchMode = Is.definedFunction(bindingOptions.events.onDataFetch);
    currentView.isInFetchModeTimer = null;
    currentView.yearsAvailable = [];
    if (bindingOptions.views.chart.enabled) {
      currentView.chartContents = null;
      currentView.chartContentsScrollLeft = 0;
    }
    if (bindingOptions.views.days.enabled) {
      currentView.daysContents = null;
      currentView.daysContentsScrollLeft = 0;
    }
    if (bindingOptions.views.statistics.enabled) {
      currentView.statisticsContents = null;
      currentView.statisticsContentsScrollLeft = 0;
    }
    if (view === "map" /* map */) {
      currentView.view = 1 /* map */;
    } else if (view === "chart" /* chart */) {
      currentView.view = 2 /* chart */;
    } else if (view === "days" /* days */) {
      currentView.view = 3 /* days */;
    } else if (view === "statistics" /* statistics */) {
      currentView.view = 4 /* statistics */;
    } else {
      currentView.view = 1 /* map */;
    }
    bindingOptions._currentView = currentView;
    return bindingOptions;
  }
  function renderControl(bindingOptions) {
    fireCustomTriggerEvent(bindingOptions.events.onBeforeRender, bindingOptions._currentView.element);
    if (!Is.definedString(bindingOptions._currentView.element.id)) {
      bindingOptions._currentView.element.id = Data.String.newGuid();
    }
    if (bindingOptions._currentView.element.className.trim() === "" /* empty */) {
      bindingOptions._currentView.element.className = "heat-js";
    } else {
      DomElement.addClass(bindingOptions._currentView.element, "heat-js");
    }
    bindingOptions._currentView.element.removeAttribute(HEAT_JS_ATTRIBUTE_NAME);
    createDateStorageForElement(bindingOptions._currentView.element.id, bindingOptions);
    renderControlContainer(bindingOptions);
    fireCustomTriggerEvent(bindingOptions.events.onRenderComplete, bindingOptions._currentView.element);
  }
  function renderControlContainer(bindingOptions, isForDataRefresh = false, isForViewSwitch = false) {
    if (isForDataRefresh) {
      storeDataInLocalStorage(bindingOptions);
    }
    if (Is.defined(bindingOptions._currentView.mapContents)) {
      bindingOptions._currentView.mapContentsScrollLeft = bindingOptions._currentView.mapContents.scrollLeft;
    }
    if (bindingOptions.views.chart.enabled && Is.defined(bindingOptions._currentView.chartContents)) {
      bindingOptions._currentView.chartContentsScrollLeft = bindingOptions._currentView.chartContents.scrollLeft;
    }
    if (bindingOptions.views.days.enabled && Is.defined(bindingOptions._currentView.daysContents)) {
      bindingOptions._currentView.daysContentsScrollLeft = bindingOptions._currentView.daysContents.scrollLeft;
    }
    if (bindingOptions.views.statistics.enabled && Is.defined(bindingOptions._currentView.statisticsContents)) {
      bindingOptions._currentView.statisticsContentsScrollLeft = bindingOptions._currentView.statisticsContents.scrollLeft;
    }
    bindingOptions._currentView.element.innerHTML = "" /* empty */;
    bindingOptions._currentView.yearsAvailable = getYearsAvailableInData(bindingOptions);
    hideToolTip(bindingOptions);
    startDataPullTimer(bindingOptions);
    if (bindingOptions.title.showConfigurationButton) {
      renderDisabledBackground(bindingOptions);
      renderConfigurationDialog(bindingOptions);
    }
    renderControlToolTip(bindingOptions);
    renderControlTitleBar(bindingOptions);
    renderControlMap(bindingOptions, isForViewSwitch);
    if (bindingOptions.views.chart.enabled) {
      renderControlChart(bindingOptions, isForViewSwitch);
      bindingOptions._currentView.chartContents.style.display = "none";
    }
    if (bindingOptions.views.days.enabled) {
      renderControlDays(bindingOptions, isForViewSwitch);
      bindingOptions._currentView.daysContents.style.display = "none";
    }
    if (bindingOptions.views.statistics.enabled) {
      renderControlStatistics(bindingOptions, isForViewSwitch);
      bindingOptions._currentView.statisticsContents.style.display = "none";
    }
    bindingOptions._currentView.mapContents.style.display = "none";
    if (bindingOptions._currentView.view === 1 /* map */) {
      bindingOptions._currentView.mapContents.style.display = "block";
    } else if (bindingOptions.views.chart.enabled && bindingOptions._currentView.view === 2 /* chart */) {
      bindingOptions._currentView.chartContents.style.display = "block";
    } else if (bindingOptions.views.days.enabled && bindingOptions._currentView.view === 3 /* days */) {
      bindingOptions._currentView.daysContents.style.display = "block";
    } else if (bindingOptions.views.statistics.enabled && bindingOptions._currentView.view === 4 /* statistics */) {
      bindingOptions._currentView.statisticsContents.style.display = "block";
    } else {
      bindingOptions._currentView.view = 1 /* map */;
      bindingOptions._currentView.mapContents.style.display = "block";
    }
  }
  function renderConfigurationDialog(bindingOptions) {
    bindingOptions._currentView.configurationDialog = DomElement.create(bindingOptions._currentView.disabledBackground, "div", "dialog configuration");
    const titleBar = DomElement.create(bindingOptions._currentView.configurationDialog, "div", "dialog-title-bar");
    const contents = DomElement.create(bindingOptions._currentView.configurationDialog, "div", "dialog-contents");
    const closeButton = DomElement.create(titleBar, "div", "dialog-close");
    const daysContainer = DomElement.create(contents, "div", "side-container panel");
    const monthsContainer = DomElement.create(contents, "div", "side-container panel");
    DomElement.createWithHTML(titleBar, "span", "dialog-title-bar-text", _configuration.configurationTitleText);
    DomElement.createWithHTML(daysContainer, "div", "side-container-title-text", _configuration.visibleDaysText + ":" /* colon */);
    DomElement.createWithHTML(monthsContainer, "div", "side-container-title-text", _configuration.visibleMonthsText + ":" /* colon */);
    const months1Container = DomElement.create(monthsContainer, "div", "side-container");
    const months2Container = DomElement.create(monthsContainer, "div", "side-container");
    closeButton.onclick = function() {
      hideConfigurationDialog(bindingOptions);
    };
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      bindingOptions._currentView.dayCheckBoxes[dayIndex] = DomElement.createCheckBox(daysContainer, _configuration.dayNames[dayIndex]).input;
    }
    for (let monthIndex1 = 0; monthIndex1 < 7; monthIndex1++) {
      bindingOptions._currentView.monthCheckBoxes[monthIndex1] = DomElement.createCheckBox(months1Container, _configuration.monthNames[monthIndex1]).input;
    }
    for (let monthIndex2 = 7; monthIndex2 < 12; monthIndex2++) {
      bindingOptions._currentView.monthCheckBoxes[monthIndex2] = DomElement.createCheckBox(months2Container, _configuration.monthNames[monthIndex2]).input;
    }
    addToolTip(closeButton, bindingOptions, _configuration.closeToolTipText);
  }
  function showConfigurationDialog(bindingOptions) {
    showDisabledBackground(bindingOptions);
    if (Is.defined(bindingOptions._currentView.configurationDialog) && bindingOptions._currentView.configurationDialog.style.display !== "block") {
      bindingOptions._currentView.configurationDialog.style.display = "block";
    }
    let daysToShow = [];
    let monthsToShow = [];
    if (bindingOptions._currentView.view === 1 /* map */) {
      daysToShow = bindingOptions.views.map.daysToShow;
      monthsToShow = bindingOptions.views.map.monthsToShow;
    } else if (bindingOptions.views.chart.enabled && bindingOptions._currentView.view === 2 /* chart */) {
      daysToShow = bindingOptions.views.chart.daysToShow;
      monthsToShow = bindingOptions.views.chart.monthsToShow;
    } else if (bindingOptions.views.days.enabled && bindingOptions._currentView.view === 3 /* days */) {
      daysToShow = bindingOptions.views.days.daysToShow;
      monthsToShow = bindingOptions.views.days.monthsToShow;
    } else if (bindingOptions.views.statistics.enabled && bindingOptions._currentView.view === 4 /* statistics */) {
      daysToShow = bindingOptions.views.statistics.daysToShow;
      monthsToShow = bindingOptions.views.statistics.monthsToShow;
    } else {
      daysToShow = bindingOptions.views.map.daysToShow;
      monthsToShow = bindingOptions.views.map.monthsToShow;
    }
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      bindingOptions._currentView.dayCheckBoxes[dayIndex].checked = isDayVisible(daysToShow, dayIndex + 1);
    }
    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      bindingOptions._currentView.monthCheckBoxes[monthIndex].checked = isMonthVisible(monthsToShow, monthIndex);
    }
    hideToolTip(bindingOptions);
  }
  function hideConfigurationDialog(bindingOptions) {
    hideDisabledBackground(bindingOptions);
    if (Is.defined(bindingOptions._currentView.configurationDialog) && bindingOptions._currentView.configurationDialog.style.display !== "none") {
      bindingOptions._currentView.configurationDialog.style.display = "none";
    }
    const daysChecked = [];
    const monthsChecked = [];
    let render2 = false;
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      if (bindingOptions._currentView.dayCheckBoxes[dayIndex].checked) {
        daysChecked.push(dayIndex + 1);
      }
    }
    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      if (bindingOptions._currentView.monthCheckBoxes[monthIndex].checked) {
        monthsChecked.push(monthIndex + 1);
      }
    }
    if (daysChecked.length >= 1) {
      if (bindingOptions._currentView.view === 1 /* map */) {
        bindingOptions.views.map.daysToShow = daysChecked;
      } else if (bindingOptions.views.chart.enabled && bindingOptions._currentView.view === 2 /* chart */) {
        bindingOptions.views.chart.daysToShow = daysChecked;
      } else if (bindingOptions.views.days.enabled && bindingOptions._currentView.view === 3 /* days */) {
        bindingOptions.views.days.daysToShow = daysChecked;
      } else if (bindingOptions.views.statistics.enabled && bindingOptions._currentView.view === 4 /* statistics */) {
        bindingOptions.views.statistics.daysToShow = daysChecked;
      } else {
        bindingOptions.views.map.daysToShow = daysChecked;
      }
      render2 = true;
    }
    if (monthsChecked.length >= 1) {
      if (bindingOptions._currentView.view === 1 /* map */) {
        bindingOptions.views.map.monthsToShow = monthsChecked;
      } else if (bindingOptions.views.chart.enabled && bindingOptions._currentView.view === 2 /* chart */) {
        bindingOptions.views.chart.monthsToShow = monthsChecked;
      } else if (bindingOptions.views.days.enabled && bindingOptions._currentView.view === 3 /* days */) {
        bindingOptions.views.days.monthsToShow = monthsChecked;
      } else if (bindingOptions.views.statistics.enabled && bindingOptions._currentView.view === 4 /* statistics */) {
        bindingOptions.views.statistics.monthsToShow = monthsChecked;
      } else {
        bindingOptions.views.map.monthsToShow = monthsChecked;
      }
      render2 = true;
    }
    if (render2) {
      renderControlContainer(bindingOptions);
      fireCustomTriggerEvent(bindingOptions.events.onOptionsUpdate, bindingOptions._currentView.element, bindingOptions);
    } else {
      hideToolTip(bindingOptions);
    }
  }
  function renderControlToolTip(bindingOptions) {
    if (!Is.defined(bindingOptions._currentView.tooltip)) {
      bindingOptions._currentView.tooltip = DomElement.create(document.body, "div", "heat-js-tooltip");
      bindingOptions._currentView.tooltip.style.display = "none";
      assignToolTipEvents(bindingOptions);
    }
  }
  function assignToolTipEvents(bindingOptions, add = true) {
    let addEventListener_Window = add ? window.addEventListener : window.removeEventListener;
    let addEventListener_Document = add ? document.addEventListener : document.removeEventListener;
    addEventListener_Window("mousemove", function() {
      hideToolTip(bindingOptions);
    });
    addEventListener_Document("scroll", function() {
      hideToolTip(bindingOptions);
    });
  }
  function addToolTip(element, bindingOptions, text) {
    if (element !== null) {
      element.onmousemove = function(e) {
        showToolTip(e, bindingOptions, text);
      };
    }
  }
  function showToolTip(e, bindingOptions, text) {
    DomElement.cancelBubble(e);
    hideToolTip(bindingOptions);
    bindingOptions._currentView.tooltipTimer = setTimeout(function() {
      bindingOptions._currentView.tooltip.innerHTML = text;
      bindingOptions._currentView.tooltip.style.display = "block";
      DomElement.showElementAtMousePosition(e, bindingOptions._currentView.tooltip);
    }, bindingOptions.tooltip.delay);
  }
  function hideToolTip(bindingOptions) {
    if (Is.defined(bindingOptions._currentView.tooltip)) {
      if (Is.defined(bindingOptions._currentView.tooltipTimer)) {
        clearTimeout(bindingOptions._currentView.tooltipTimer);
        bindingOptions._currentView.tooltipTimer = null;
      }
      if (bindingOptions._currentView.tooltip.style.display !== "none") {
        bindingOptions._currentView.tooltip.style.display = "none";
      }
    }
  }
  function renderControlTitleBar(bindingOptions) {
    if (bindingOptions.title.showText || bindingOptions.title.showYearSelector || bindingOptions.title.showRefreshButton || bindingOptions.title.showExportButton || bindingOptions.title.showImportButton) {
      const titleBar = DomElement.create(bindingOptions._currentView.element, "div", "title-bar");
      const title = DomElement.create(titleBar, "div", "title");
      if (bindingOptions.views.chart.enabled || bindingOptions.views.days.enabled || bindingOptions.views.statistics.enabled) {
        if (bindingOptions.title.showTitleDropDownButton) {
          DomElement.create(title, "div", "down-arrow");
        }
      } else {
        DomElement.addClass(title, "no-click");
      }
      if (bindingOptions.title.showText) {
        title.innerHTML += bindingOptions.title.text;
      }
      if (bindingOptions.views.chart.enabled || bindingOptions.views.days.enabled || bindingOptions.views.statistics.enabled) {
        renderTitleDropDownMenu(bindingOptions, title);
      }
      if (bindingOptions.title.showImportButton && !bindingOptions._currentView.isInFetchMode) {
        const importData = DomElement.createWithHTML(titleBar, "button", "import", _configuration.importButtonText);
        importData.onclick = function() {
          importFromFilesSelected(bindingOptions);
        };
      }
      if (bindingOptions.title.showExportButton) {
        const exportData = DomElement.createWithHTML(titleBar, "button", "export", _configuration.exportButtonText);
        exportData.onclick = function() {
          exportAllData(bindingOptions);
        };
      }
      if (bindingOptions.title.showRefreshButton) {
        const refresh = DomElement.createWithHTML(titleBar, "button", "refresh", _configuration.refreshButtonText);
        refresh.onclick = function() {
          renderControlContainer(bindingOptions);
          fireCustomTriggerEvent(bindingOptions.events.onRefresh, bindingOptions._currentView.element);
        };
      }
      if (bindingOptions.title.showYearSelector) {
        const back = DomElement.createWithHTML(titleBar, "button", "back", _configuration.backButtonText);
        back.onclick = function() {
          moveToPreviousYear(bindingOptions);
        };
        if (isFirstVisibleYear(bindingOptions, bindingOptions._currentView.year)) {
          back.disabled = true;
        }
        bindingOptions._currentView.yearText = DomElement.createWithHTML(titleBar, "div", "year-text", bindingOptions._currentView.year.toString());
        if (bindingOptions.title.showYearSelectionDropDown) {
          renderYearDropDownMenu(bindingOptions);
        } else {
          DomElement.addClass(bindingOptions._currentView.yearText, "no-click");
        }
        if (bindingOptions.title.showConfigurationButton) {
          let configureButton = DomElement.create(titleBar, "div", "configure");
          addToolTip(configureButton, bindingOptions, _configuration.configurationToolTipText);
          configureButton.onclick = function() {
            showConfigurationDialog(bindingOptions);
          };
        }
        const next = DomElement.createWithHTML(titleBar, "button", "next", _configuration.nextButtonText);
        next.onclick = function() {
          moveToNextYear(bindingOptions);
        };
        if (isLastVisibleYear(bindingOptions, bindingOptions._currentView.year)) {
          next.disabled = true;
        }
      }
    }
  }
  function renderTitleDropDownMenu(bindingOptions, title) {
    const titlesMenuContainer = DomElement.create(title, "div", "titles-menu-container");
    const titlesMenu = DomElement.create(titlesMenuContainer, "div", "titles-menu");
    if (bindingOptions.title.showTitleDropDownHeaders) {
      DomElement.createWithHTML(titlesMenu, "div", "title-menu-header", _configuration.dataText + ":" /* colon */);
    }
    const menuItemMap = DomElement.createWithHTML(titlesMenu, "div", "title-menu-item", _configuration.mapText);
    renderTitleDropDownMenuItemClickEvent(bindingOptions, menuItemMap, 1 /* map */, "map" /* map */);
    if (bindingOptions.views.chart.enabled) {
      const menuItemChart = DomElement.createWithHTML(titlesMenu, "div", "title-menu-item", _configuration.chartText);
      renderTitleDropDownMenuItemClickEvent(bindingOptions, menuItemChart, 2 /* chart */, "chart" /* chart */);
    }
    if (bindingOptions.views.days.enabled) {
      if (bindingOptions.title.showTitleDropDownHeaders) {
        DomElement.createWithHTML(titlesMenu, "div", "title-menu-header", _configuration.yearText + ":" /* colon */);
      }
      const menuItemDays = DomElement.createWithHTML(titlesMenu, "div", "title-menu-item", _configuration.daysText);
      renderTitleDropDownMenuItemClickEvent(bindingOptions, menuItemDays, 3 /* days */, "days" /* days */);
    }
    if (bindingOptions.views.statistics.enabled) {
      if (bindingOptions.title.showTitleDropDownHeaders) {
        DomElement.createWithHTML(titlesMenu, "div", "title-menu-header", _configuration.statisticsText + ":" /* colon */);
      }
      const menuItemStatistics = DomElement.createWithHTML(titlesMenu, "div", "title-menu-item", _configuration.colorRangesText);
      renderTitleDropDownMenuItemClickEvent(bindingOptions, menuItemStatistics, 4 /* statistics */, "statistics" /* statistics */);
    }
  }
  function renderTitleDropDownMenuItemClickEvent(bindingOptions, option, view, viewName) {
    if (bindingOptions._currentView.view === view) {
      DomElement.addClass(option, "title-menu-item-active");
    } else {
      option.onclick = function() {
        bindingOptions._currentView.view = view;
        fireCustomTriggerEvent(bindingOptions.events.onViewSwitch, viewName);
        renderControlContainer(bindingOptions, false, true);
      };
    }
  }
  function renderYearDropDownMenu(bindingOptions) {
    DomElement.create(bindingOptions._currentView.yearText, "div", "down-arrow");
    const yearsMenuContainer = DomElement.create(bindingOptions._currentView.yearText, "div", "years-menu-container");
    const yearsMenu = DomElement.create(yearsMenuContainer, "div", "years-menu");
    const thisYear = (/* @__PURE__ */ new Date()).getFullYear();
    let activeYearMenuItem = null;
    yearsMenuContainer.style.display = "block";
    yearsMenuContainer.style.visibility = "hidden";
    for (let currentYear = thisYear - bindingOptions.title.extraSelectionYears; currentYear < thisYear + bindingOptions.title.extraSelectionYears; currentYear++) {
      if (isYearVisible(bindingOptions, currentYear)) {
        let yearMenuItem = renderYearDropDownMenuItem(bindingOptions, yearsMenu, currentYear, thisYear);
        if (!Is.defined(activeYearMenuItem)) {
          activeYearMenuItem = yearMenuItem;
        }
      }
    }
    if (Is.defined(activeYearMenuItem)) {
      yearsMenu.scrollTop = activeYearMenuItem.offsetTop - yearsMenu.offsetHeight / 2;
    }
    yearsMenuContainer.style.display = "none";
    yearsMenuContainer.style.visibility = "visible";
  }
  function renderYearDropDownMenuItem(bindingOptions, years, currentYear, actualYear) {
    let result2 = null;
    const year = DomElement.createWithHTML(years, "div", "year-menu-item", currentYear.toString());
    if (bindingOptions._currentView.year !== currentYear) {
      year.onclick = function() {
        bindingOptions._currentView.year = currentYear;
        renderControlContainer(bindingOptions);
        fireCustomTriggerEvent(bindingOptions.events.onSetYear, bindingOptions._currentView.year);
      };
      if (currentYear === actualYear) {
        DomElement.addClass(year, "year-menu-item-current");
      }
    } else {
      DomElement.addClass(year, "year-menu-item-active");
      result2 = year;
    }
    return result2;
  }
  function renderControlMap(bindingOptions, isForViewSwitch) {
    bindingOptions._currentView.mapContents = DomElement.create(bindingOptions._currentView.element, "div", "map-contents");
    if (bindingOptions.views.chart.enabled) {
      renderControlChartContents(bindingOptions);
    }
    if (bindingOptions.views.days.enabled) {
      renderControlDaysContents(bindingOptions);
    }
    if (bindingOptions.views.statistics.enabled) {
      renderControlStatisticsContents(bindingOptions);
    }
    renderControlViewGuide(bindingOptions);
    if (bindingOptions.views.map.showNoDataMessageWhenDataIsNotAvailable && !isDataAvailableForYear(bindingOptions)) {
      const noDataMessage = DomElement.createWithHTML(bindingOptions._currentView.mapContents, "div", "no-data-message", _configuration.noMapDataMessage);
      if (isForViewSwitch) {
        DomElement.addClass(noDataMessage, "view-switch");
      }
    } else {
      bindingOptions._currentView.mapContents.style.minHeight = "unset";
      makeAreaDroppable(bindingOptions._currentView.mapContents, bindingOptions);
      const map = DomElement.create(bindingOptions._currentView.mapContents, "div", "map");
      const currentYear = bindingOptions._currentView.year;
      let monthAdded = false;
      if (isForViewSwitch) {
        DomElement.addClass(map, "view-switch");
      }
      if (bindingOptions.views.map.showDayNames) {
        const days = DomElement.create(map, "div", "days");
        const showMinimalDays = bindingOptions.views.map.showMinimalDayNames && bindingOptions.views.map.daysToShow.length === 7;
        if (!bindingOptions.views.map.showMonthNames || bindingOptions.views.map.placeMonthNamesOnTheBottom) {
          days.className = "days-months-bottom";
        }
        for (let dayNameIndex = 0; dayNameIndex < 7; dayNameIndex++) {
          if (isDayVisible(bindingOptions.views.map.daysToShow, dayNameIndex + 1)) {
            const dayText = !showMinimalDays || dayNameIndex % 3 === 0 ? _configuration.dayNames[dayNameIndex] : " " /* space */;
            DomElement.createWithHTML(days, "div", "day-name", dayText);
          }
        }
        if (bindingOptions.views.map.showDaysInReverseOrder) {
          DomElement.reverseChildrenOrder(days);
        }
      }
      const months = DomElement.create(map, "div", "months");
      const colorRanges = getSortedColorRanges(bindingOptions);
      for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
        if (isMonthVisible(bindingOptions.views.map.monthsToShow, monthIndex)) {
          const month = DomElement.create(months, "div", "month");
          const dayColumns = DomElement.create(month, "div", "day-columns");
          let totalDaysInMonth = DateTime.getTotalDaysInMonth(currentYear, monthIndex);
          let currentDayColumn = DomElement.create(dayColumns, "div", "day-column");
          let startFillingDays = false;
          const firstDayInMonth = new Date(currentYear, monthIndex, 1);
          const firstDayNumberInMonth = DateTime.getWeekdayNumber(firstDayInMonth);
          let actualDay = 1;
          totalDaysInMonth += firstDayNumberInMonth;
          for (let dayIndex = 0; dayIndex < totalDaysInMonth; dayIndex++) {
            if (dayIndex >= firstDayNumberInMonth) {
              startFillingDays = true;
            } else {
              if (isDayVisible(bindingOptions.views.map.daysToShow, actualDay)) {
                DomElement.create(currentDayColumn, "div", "day-disabled");
              }
            }
            if (startFillingDays) {
              let day = null;
              if (isDayVisible(bindingOptions.views.map.daysToShow, actualDay)) {
                day = renderControlMapMonthDay(bindingOptions, currentDayColumn, dayIndex - firstDayNumberInMonth, monthIndex, currentYear, colorRanges);
              }
              if ((dayIndex + 1) % 7 === 0) {
                if (bindingOptions.views.map.showDaysInReverseOrder) {
                  DomElement.reverseChildrenOrder(currentDayColumn);
                }
                currentDayColumn = DomElement.create(dayColumns, "div", "day-column");
                actualDay = 0;
                if (!Is.defined(_elements_Day_Width) && Is.defined(day)) {
                  let marginLeft = DomElement.getStyleValueByName(day, "margin-left", true);
                  let marginRight = DomElement.getStyleValueByName(day, "margin-right", true);
                  _elements_Day_Width = day.offsetWidth + marginLeft + marginRight;
                }
              }
            }
            actualDay++;
          }
          if (bindingOptions.views.map.showMonthNames) {
            let monthName = null;
            const monthWidth = month.offsetWidth;
            if (!bindingOptions.views.map.placeMonthNamesOnTheBottom) {
              monthName = DomElement.createWithHTML(month, "div", "month-name", _configuration.monthNames[monthIndex], dayColumns);
            } else {
              monthName = DomElement.createWithHTML(month, "div", "month-name-bottom", _configuration.monthNames[monthIndex]);
            }
            if (Is.defined(monthName)) {
              if (bindingOptions.views.map.showMonthDayGaps) {
                monthName.style.width = monthWidth + "px";
              } else {
                monthName.style.width = monthWidth - _elements_Day_Width + "px";
              }
            }
          }
          if (monthAdded && Is.defined(_elements_Day_Width)) {
            if (firstDayNumberInMonth > 0 && !bindingOptions.views.map.showMonthDayGaps) {
              month.style.marginLeft = -_elements_Day_Width + "px";
            } else if (firstDayNumberInMonth === 0 && bindingOptions.views.map.showMonthDayGaps) {
              month.style.marginLeft = _elements_Day_Width + "px";
            }
          }
          if (bindingOptions.views.map.showMonthsInReverseOrder) {
            DomElement.reverseChildrenOrder(dayColumns);
          }
          monthAdded = true;
        }
      }
      if (bindingOptions.views.map.showMonthsInReverseOrder) {
        DomElement.reverseChildrenOrder(months);
      }
      if (bindingOptions.views.map.keepScrollPositions) {
        bindingOptions._currentView.mapContents.scrollLeft = bindingOptions._currentView.mapContentsScrollLeft;
      }
    }
  }
  function renderControlMapMonthDay(bindingOptions, currentDayColumn, dayNumber, month, year, colorRanges) {
    const actualDay = dayNumber + 1;
    const day = DomElement.create(currentDayColumn, "div", "day");
    const date = new Date(year, month, actualDay);
    let dateCount = _elements_DateCounts[bindingOptions._currentView.element.id].type[bindingOptions._currentView.type][toStorageDate(date)];
    dateCount = Data.getDefaultNumber(dateCount, 0);
    renderDayToolTip(bindingOptions, day, date, dateCount);
    if (bindingOptions.views.map.showDayNumbers && dateCount > 0) {
      day.innerHTML = dateCount.toString();
    }
    if (Is.definedFunction(bindingOptions.events.onDayClick)) {
      day.onclick = function() {
        fireCustomTriggerEvent(bindingOptions.events.onDayClick, date, dateCount);
      };
    } else {
      DomElement.addClass(day, "no-hover");
    }
    const useColorRange = getColorRange(bindingOptions, colorRanges, dateCount, date);
    if (Is.defined(useColorRange) && isColorRangeVisible(bindingOptions, useColorRange.id)) {
      if (Is.definedString(useColorRange.mapCssClassName)) {
        DomElement.addClass(day, useColorRange.mapCssClassName);
      } else {
        DomElement.addClass(day, useColorRange.cssClassName);
      }
    }
    return day;
  }
  function isDataAvailableForYear(bindingOptions) {
    let result2 = false;
    const data = getCurrentViewData(bindingOptions);
    const checkDate = bindingOptions._currentView.year.toString();
    for (let storageDate in data) {
      if (data.hasOwnProperty(storageDate)) {
        if (getStorageDateYear(storageDate) === checkDate) {
          result2 = true;
          break;
        }
      }
    }
    return result2;
  }
  function renderControlChartContents(bindingOptions) {
    bindingOptions._currentView.chartContents = DomElement.create(bindingOptions._currentView.element, "div", "chart-contents");
    makeAreaDroppable(bindingOptions._currentView.chartContents, bindingOptions);
  }
  function renderControlChart(bindingOptions, isForViewSwitch) {
    const chart = DomElement.create(bindingOptions._currentView.chartContents, "div", "chart");
    let labels = DomElement.create(chart, "div", "y-labels");
    const dayLines = DomElement.create(chart, "div", "day-lines");
    const colorRanges = getSortedColorRanges(bindingOptions);
    const largestValueForCurrentYear = getLargestValueForChartYear(bindingOptions);
    const currentYear = bindingOptions._currentView.year;
    let labelsWidth = 0;
    if (isForViewSwitch) {
      DomElement.addClass(chart, "view-switch");
    }
    if (largestValueForCurrentYear > 0 && bindingOptions.views.chart.showChartYLabels) {
      const topLabel = DomElement.createWithHTML(labels, "div", "label-0", largestValueForCurrentYear.toString());
      DomElement.createWithHTML(labels, "div", "label-25", (Math.floor(largestValueForCurrentYear / 4) * 3).toString());
      DomElement.createWithHTML(labels, "div", "label-50", Math.floor(largestValueForCurrentYear / 2).toString());
      DomElement.createWithHTML(labels, "div", "label-75", Math.floor(largestValueForCurrentYear / 4).toString());
      DomElement.createWithHTML(labels, "div", "label-100", "0" /* zero */);
      labels.style.width = topLabel.offsetWidth + "px";
      labelsWidth = labels.offsetWidth + DomElement.getStyleValueByName(labels, "margin-right", true);
    } else {
      labels.parentNode.removeChild(labels);
      labels = null;
    }
    if (largestValueForCurrentYear === 0) {
      bindingOptions._currentView.chartContents.style.minHeight = bindingOptions._currentView.mapContents.offsetHeight + "px";
      chart.parentNode.removeChild(chart);
      const noDataMessage = DomElement.createWithHTML(bindingOptions._currentView.chartContents, "div", "no-data-message", _configuration.noChartDataMessage);
      if (isForViewSwitch) {
        DomElement.addClass(noDataMessage, "view-switch");
      }
    } else {
      const pixelsPerNumbers = bindingOptions._currentView.mapContents.offsetHeight / largestValueForCurrentYear;
      let totalMonths = 0;
      let totalDays = 0;
      for (let monthIndex1 = 0; monthIndex1 < 12; monthIndex1++) {
        if (isMonthVisible(bindingOptions.views.chart.monthsToShow, monthIndex1)) {
          const totalDaysInMonth = DateTime.getTotalDaysInMonth(currentYear, monthIndex1);
          let actualDay = 1;
          totalMonths++;
          for (let dayIndex = 0; dayIndex < totalDaysInMonth; dayIndex++) {
            if (isDayVisible(bindingOptions.views.chart.daysToShow, actualDay)) {
              renderControlChartDay(dayLines, bindingOptions, dayIndex + 1, monthIndex1, currentYear, colorRanges, pixelsPerNumbers);
            }
            if ((dayIndex + 1) % 7 === 0) {
              actualDay = 0;
            }
            actualDay++;
            totalDays++;
          }
        }
      }
      if (bindingOptions.views.chart.showInReverseOrder) {
        DomElement.reverseChildrenOrder(dayLines);
      }
      if (bindingOptions.views.chart.showMonthNames) {
        const chartMonths = DomElement.create(bindingOptions._currentView.chartContents, "div", "chart-months");
        const linesWidth = dayLines.offsetWidth / totalMonths;
        let monthTimesValue = 0;
        const addMonthName = function(addMonthNameIndex) {
          if (isMonthVisible(bindingOptions.views.chart.monthsToShow, addMonthNameIndex)) {
            let monthName = DomElement.createWithHTML(chartMonths, "div", "month-name", _configuration.monthNames[addMonthNameIndex]);
            monthName.style.left = labelsWidth + linesWidth * monthTimesValue + "px";
            monthTimesValue++;
          }
        };
        if (bindingOptions.views.chart.showInReverseOrder) {
          for (let monthIndex2 = 12; monthIndex2--; ) {
            addMonthName(monthIndex2);
          }
        } else {
          for (let monthIndex3 = 0; monthIndex3 < 12; monthIndex3++) {
            addMonthName(monthIndex3);
          }
        }
        chartMonths.style.width = dayLines.offsetWidth + "px";
        const monthNameSpace = DomElement.create(chartMonths, "div", "month-name-space");
        monthNameSpace.style.height = chartMonths.offsetHeight + "px";
        monthNameSpace.style.width = labelsWidth + "px";
      }
      if (bindingOptions.views.chart.keepScrollPositions) {
        bindingOptions._currentView.chartContents.scrollLeft = bindingOptions._currentView.chartContentsScrollLeft;
      }
    }
  }
  function renderControlChartDay(dayLines, bindingOptions, day, month, year, colorRanges, pixelsPerNumbers) {
    const date = new Date(year, month, day);
    const dayLine = DomElement.create(dayLines, "div", "day-line");
    let dateCount = getCurrentViewData(bindingOptions)[toStorageDate(date)];
    dateCount = Data.getDefaultNumber(dateCount, 0);
    renderDayToolTip(bindingOptions, dayLine, date, dateCount);
    if (bindingOptions.views.chart.showLineNumbers && dateCount > 0) {
      DomElement.addClass(dayLine, "day-line-number");
      dayLine.innerHTML = dateCount.toString();
    }
    const dayLineHeight = dateCount * pixelsPerNumbers;
    dayLine.style.height = dayLineHeight + "px";
    if (dayLineHeight <= 0) {
      dayLine.style.visibility = "hidden";
    }
    if (Is.definedFunction(bindingOptions.events.onDayClick)) {
      dayLine.onclick = function() {
        fireCustomTriggerEvent(bindingOptions.events.onDayClick, date, dateCount);
      };
    } else {
      DomElement.addClass(dayLine, "no-hover");
    }
    const useColorRange = getColorRange(bindingOptions, colorRanges, dateCount, date);
    if (Is.defined(useColorRange) && isColorRangeVisible(bindingOptions, useColorRange.id)) {
      if (Is.definedString(useColorRange.chartCssClassName)) {
        DomElement.addClass(dayLine, useColorRange.chartCssClassName);
      } else {
        DomElement.addClass(dayLine, useColorRange.cssClassName);
      }
    }
  }
  function getLargestValueForChartYear(bindingOptions) {
    let result2 = 0;
    const data = getCurrentViewData(bindingOptions);
    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      const totalDaysInMonth = DateTime.getTotalDaysInMonth(bindingOptions._currentView.year, monthIndex);
      for (let dayIndex = 0; dayIndex < totalDaysInMonth; dayIndex++) {
        const storageDate = toStorageDate(new Date(bindingOptions._currentView.year, monthIndex, dayIndex + 1));
        if (data.hasOwnProperty(storageDate)) {
          if (isMonthVisible(bindingOptions.views.chart.monthsToShow, monthIndex) && isDayVisible(bindingOptions.views.chart.daysToShow, dayIndex + 1)) {
            result2 = Math.max(result2, parseInt(data[storageDate]));
          }
        }
      }
    }
    return result2;
  }
  function renderControlDaysContents(bindingOptions) {
    bindingOptions._currentView.daysContents = DomElement.create(bindingOptions._currentView.element, "div", "days-contents");
    makeAreaDroppable(bindingOptions._currentView.daysContents, bindingOptions);
  }
  function renderControlDays(bindingOptions, isForViewSwitch) {
    const days = DomElement.create(bindingOptions._currentView.daysContents, "div", "days");
    const dayNames = DomElement.create(bindingOptions._currentView.daysContents, "div", "day-names");
    let labels = DomElement.create(days, "div", "y-labels");
    const dayLines = DomElement.create(days, "div", "day-lines");
    const dayValuesForCurrentYear = getLargestValuesForEachDay(bindingOptions);
    if (isForViewSwitch) {
      DomElement.addClass(days, "view-switch");
    }
    if (dayValuesForCurrentYear.largestValue > 0 && bindingOptions.views.days.showChartYLabels) {
      const topLabel = DomElement.createWithHTML(labels, "div", "label-0", dayValuesForCurrentYear.largestValue.toString());
      DomElement.createWithHTML(labels, "div", "label-25", (Math.floor(dayValuesForCurrentYear.largestValue / 4) * 3).toString());
      DomElement.createWithHTML(labels, "div", "label-50", Math.floor(dayValuesForCurrentYear.largestValue / 2).toString());
      DomElement.createWithHTML(labels, "div", "label-75", Math.floor(dayValuesForCurrentYear.largestValue / 4).toString());
      DomElement.createWithHTML(labels, "div", "label-100", "0" /* zero */);
      labels.style.width = topLabel.offsetWidth + "px";
      dayNames.style.paddingLeft = labels.offsetWidth + DomElement.getStyleValueByName(labels, "margin-right", true) + "px";
    } else {
      labels.parentNode.removeChild(labels);
      labels = null;
    }
    if (dayValuesForCurrentYear.largestValue === 0) {
      bindingOptions._currentView.daysContents.style.minHeight = bindingOptions._currentView.mapContents.offsetHeight + "px";
      days.parentNode.removeChild(days);
      dayNames.parentNode.removeChild(dayNames);
      const noDataMessage = DomElement.createWithHTML(bindingOptions._currentView.daysContents, "div", "no-days-message", _configuration.noDaysDataMessage);
      if (isForViewSwitch) {
        DomElement.addClass(noDataMessage, "view-switch");
      }
    } else {
      const pixelsPerNumbers = bindingOptions._currentView.mapContents.offsetHeight / dayValuesForCurrentYear.largestValue;
      for (let day in dayValuesForCurrentYear.days) {
        if (dayValuesForCurrentYear.days.hasOwnProperty(day) && isDayVisible(bindingOptions.views.days.daysToShow, parseInt(day))) {
          renderControlDaysDayLine(dayLines, parseInt(day), dayValuesForCurrentYear.days[day], bindingOptions, pixelsPerNumbers);
          if (bindingOptions.views.days.showDayNames) {
            DomElement.createWithHTML(dayNames, "div", "day-name", _configuration.dayNames[parseInt(day) - 1]);
          }
        }
      }
      if (bindingOptions.views.days.showInReverseOrder) {
        DomElement.reverseChildrenOrder(dayLines);
        DomElement.reverseChildrenOrder(dayNames);
      }
      if (bindingOptions.views.days.keepScrollPositions) {
        bindingOptions._currentView.daysContents.scrollLeft = bindingOptions._currentView.daysContentsScrollLeft;
      }
    }
  }
  function renderControlDaysDayLine(dayLines, dayNumber, dayCount, bindingOptions, pixelsPerNumbers) {
    const dayLine = DomElement.create(dayLines, "div", "day-line");
    const dayLineHeight = dayCount * pixelsPerNumbers;
    dayLine.style.height = dayLineHeight + "px";
    if (dayLineHeight <= 0) {
      dayLine.style.visibility = "hidden";
    }
    addToolTip(dayLine, bindingOptions, dayCount.toString());
    if (Is.definedFunction(bindingOptions.events.onWeekDayClick)) {
      dayLine.onclick = function() {
        fireCustomTriggerEvent(bindingOptions.events.onWeekDayClick, dayNumber, dayCount);
      };
    } else {
      DomElement.addClass(dayLine, "no-hover");
    }
    if (bindingOptions.views.days.showDayNumbers && dayCount > 0) {
      DomElement.addClass(dayLine, "day-line-number");
      DomElement.createWithHTML(dayLine, "div", "count", dayCount.toString());
    }
  }
  function getLargestValuesForEachDay(bindingOptions) {
    let largestValue = 0;
    const data = getCurrentViewData(bindingOptions);
    const days = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0
    };
    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      const totalDaysInMonth = DateTime.getTotalDaysInMonth(bindingOptions._currentView.year, monthIndex);
      for (let dayIndex = 0; dayIndex < totalDaysInMonth; dayIndex++) {
        const storageDate = toStorageDate(new Date(bindingOptions._currentView.year, monthIndex, dayIndex + 1));
        if (data.hasOwnProperty(storageDate)) {
          const storageDateParts = getStorageDate(storageDate);
          const storageDateObject = new Date(parseInt(storageDateParts[2]), parseInt(storageDateParts[1]), parseInt(storageDateParts[0]));
          const weekDayNumber = DateTime.getWeekdayNumber(storageDateObject) + 1;
          if (!isHoliday(bindingOptions, storageDateObject).matched && isMonthVisible(bindingOptions.views.days.monthsToShow, storageDateObject.getMonth()) && isDayVisible(bindingOptions.views.days.daysToShow, weekDayNumber)) {
            days[weekDayNumber] += data[storageDate];
            largestValue = Math.max(largestValue, days[weekDayNumber]);
          }
        }
      }
    }
    return {
      days,
      largestValue
    };
  }
  function renderControlStatisticsContents(bindingOptions) {
    bindingOptions._currentView.statisticsContents = DomElement.create(bindingOptions._currentView.element, "div", "statistics-contents");
    makeAreaDroppable(bindingOptions._currentView.statisticsContents, bindingOptions);
  }
  function renderControlStatistics(bindingOptions, isForViewSwitch) {
    const statistics = DomElement.create(bindingOptions._currentView.statisticsContents, "div", "statistics");
    const statisticsRanges = DomElement.create(bindingOptions._currentView.statisticsContents, "div", "statistics-ranges");
    let labels = DomElement.create(statistics, "div", "y-labels");
    const rangeLines = DomElement.create(statistics, "div", "range-lines");
    const colorRanges = getSortedColorRanges(bindingOptions);
    const colorRangeValuesForCurrentYear = getLargestValuesForEachRangeType(bindingOptions, colorRanges);
    if (isForViewSwitch) {
      DomElement.addClass(statistics, "view-switch");
    }
    if (colorRangeValuesForCurrentYear.largestValue > 0 && bindingOptions.views.statistics.showChartYLabels) {
      const topLabel = DomElement.createWithHTML(labels, "div", "label-0", colorRangeValuesForCurrentYear.largestValue.toString());
      DomElement.createWithHTML(labels, "div", "label-25", (Math.floor(colorRangeValuesForCurrentYear.largestValue / 4) * 3).toString());
      DomElement.createWithHTML(labels, "div", "label-50", Math.floor(colorRangeValuesForCurrentYear.largestValue / 2).toString());
      DomElement.createWithHTML(labels, "div", "label-75", Math.floor(colorRangeValuesForCurrentYear.largestValue / 4).toString());
      DomElement.createWithHTML(labels, "div", "label-100", "0" /* zero */);
      labels.style.width = topLabel.offsetWidth + "px";
      statisticsRanges.style.paddingLeft = labels.offsetWidth + DomElement.getStyleValueByName(labels, "margin-right", true) + "px";
    } else {
      labels.parentNode.removeChild(labels);
      labels = null;
    }
    if (colorRangeValuesForCurrentYear.largestValue === 0) {
      bindingOptions._currentView.statisticsContents.style.minHeight = bindingOptions._currentView.mapContents.offsetHeight + "px";
      statistics.parentNode.removeChild(statistics);
      statisticsRanges.parentNode.removeChild(statisticsRanges);
      const noDataMessage = DomElement.createWithHTML(bindingOptions._currentView.statisticsContents, "div", "no-statistics-message", _configuration.noStatisticsDataMessage);
      if (isForViewSwitch) {
        DomElement.addClass(noDataMessage, "view-switch");
      }
    } else {
      const pixelsPerNumbers = bindingOptions._currentView.mapContents.offsetHeight / colorRangeValuesForCurrentYear.largestValue;
      if (!bindingOptions.views.statistics.showColorRangeLabels) {
        statisticsRanges.parentNode.removeChild(statisticsRanges);
      }
      for (let type in colorRangeValuesForCurrentYear.types) {
        if (colorRangeValuesForCurrentYear.types.hasOwnProperty(type)) {
          renderControlStatisticsRangeLine(parseInt(type), rangeLines, colorRangeValuesForCurrentYear.types[type], bindingOptions, colorRanges, pixelsPerNumbers);
          const useColorRange = getColorRangeByMinimum(colorRanges, parseInt(type));
          if (bindingOptions.views.statistics.showColorRangeLabels) {
            if (!bindingOptions.views.statistics.useColorRangeNamesForLabels || !Is.defined(useColorRange) || !Is.definedString(useColorRange.name)) {
              DomElement.createWithHTML(statisticsRanges, "div", "range-name", type + "+" /* plus */);
            } else {
              DomElement.createWithHTML(statisticsRanges, "div", "range-name", useColorRange.name);
            }
          }
        }
      }
      if (bindingOptions.views.statistics.showInReverseOrder) {
        DomElement.reverseChildrenOrder(rangeLines);
        DomElement.reverseChildrenOrder(statisticsRanges);
      }
      if (bindingOptions.views.statistics.keepScrollPositions) {
        bindingOptions._currentView.statisticsContents.scrollLeft = bindingOptions._currentView.statisticsContentsScrollLeft;
      }
    }
  }
  function renderControlStatisticsRangeLine(colorRangeMinimum, dayLines, rangeCount, bindingOptions, colorRanges, pixelsPerNumbers) {
    const rangeLine = DomElement.create(dayLines, "div", "range-line");
    const useColorRange = getColorRangeByMinimum(colorRanges, colorRangeMinimum);
    const rangeLineHeight = rangeCount * pixelsPerNumbers;
    rangeLine.style.height = rangeLineHeight + "px";
    if (rangeLineHeight <= 0) {
      rangeLine.style.visibility = "hidden";
    }
    addToolTip(rangeLine, bindingOptions, rangeCount.toString());
    if (bindingOptions.views.statistics.showRangeNumbers && rangeCount > 0) {
      DomElement.addClass(rangeLine, "range-line-number");
      DomElement.createWithHTML(rangeLine, "div", "count", rangeCount.toString());
    }
    if (Is.definedFunction(bindingOptions.events.onStatisticClick)) {
      rangeLine.onclick = function() {
        fireCustomTriggerEvent(bindingOptions.events.onStatisticClick, useColorRange);
      };
    } else {
      DomElement.addClass(rangeLine, "no-hover");
    }
    if (Is.defined(useColorRange) && isColorRangeVisible(bindingOptions, useColorRange.id)) {
      if (Is.definedString(useColorRange.statisticsCssClassName)) {
        DomElement.addClass(rangeLine, useColorRange.statisticsCssClassName);
      } else {
        DomElement.addClass(rangeLine, useColorRange.cssClassName);
      }
    }
  }
  function getLargestValuesForEachRangeType(bindingOptions, colorRanges) {
    const types = {};
    const data = getCurrentViewData(bindingOptions);
    let largestValue = 0;
    types["0" /* zero */] = 0;
    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      const totalDaysInMonth = DateTime.getTotalDaysInMonth(bindingOptions._currentView.year, monthIndex);
      for (let dayIndex = 0; dayIndex < totalDaysInMonth; dayIndex++) {
        const storageDate = toStorageDate(new Date(bindingOptions._currentView.year, monthIndex, dayIndex + 1));
        if (data.hasOwnProperty(storageDate)) {
          const storageDateParts = getStorageDate(storageDate);
          const storageDateObject = new Date(parseInt(storageDateParts[2]), parseInt(storageDateParts[1]), parseInt(storageDateParts[0]));
          const weekDayNumber = DateTime.getWeekdayNumber(storageDateObject) + 1;
          if (!isHoliday(bindingOptions, storageDateObject).matched && isMonthVisible(bindingOptions.views.statistics.monthsToShow, storageDateObject.getMonth()) && isDayVisible(bindingOptions.views.statistics.daysToShow, weekDayNumber)) {
            const useColorRange = getColorRange(bindingOptions, colorRanges, data[storageDate]);
            if (!Is.defined(useColorRange)) {
              types["0" /* zero */]++;
            } else {
              if (!types.hasOwnProperty(useColorRange.minimum.toString())) {
                types[useColorRange.minimum.toString()] = 0;
              }
              types[useColorRange.minimum]++;
              largestValue = Math.max(largestValue, types[useColorRange.minimum]);
            }
          }
        }
      }
    }
    return {
      types,
      largestValue
    };
  }
  function renderControlViewGuide(bindingOptions) {
    const guide = DomElement.create(bindingOptions._currentView.element, "div", "guide");
    const mapTypes = DomElement.create(guide, "div", "map-types");
    let noneTypeCount = 0;
    for (let storageDate in _elements_DateCounts[bindingOptions._currentView.element.id].type[_configuration.unknownTrendText]) {
      if (_elements_DateCounts[bindingOptions._currentView.element.id].type[_configuration.unknownTrendText].hasOwnProperty(storageDate)) {
        noneTypeCount++;
        break;
      }
    }
    if (_elements_DateCounts[bindingOptions._currentView.element.id].types > 1) {
      if (Is.definedString(bindingOptions.description.text)) {
        const description = DomElement.create(bindingOptions._currentView.element, "div", "description", guide);
        renderDescription(bindingOptions, description);
      }
      for (let type in _elements_DateCounts[bindingOptions._currentView.element.id].type) {
        if (type !== _configuration.unknownTrendText || noneTypeCount > 0) {
          if (noneTypeCount === 0 && bindingOptions._currentView.type === _configuration.unknownTrendText) {
            bindingOptions._currentView.type = type;
          }
          renderControlViewGuideTypeButton(bindingOptions, mapTypes, type);
        }
      }
    } else {
      renderDescription(bindingOptions, mapTypes);
    }
    if (bindingOptions.guide.enabled) {
      const mapToggles = DomElement.create(guide, "div", "map-toggles");
      if (bindingOptions.guide.showLessAndMoreLabels) {
        let lessText = DomElement.createWithHTML(mapToggles, "div", "less-text", _configuration.lessText);
        if (bindingOptions.guide.colorRangeTogglesEnabled) {
          lessText.onclick = function() {
            updateColorRangeToggles(bindingOptions, false);
          };
        } else {
          DomElement.addClass(lessText, "no-click");
        }
      }
      const days = DomElement.create(mapToggles, "div", "days");
      const colorRanges = getSortedColorRanges(bindingOptions);
      const colorRangesLength = colorRanges.length;
      for (let colorRangesIndex = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++) {
        renderControlViewGuideDay(bindingOptions, days, colorRanges[colorRangesIndex]);
      }
      if (bindingOptions.guide.showLessAndMoreLabels) {
        const moreText = DomElement.createWithHTML(mapToggles, "div", "more-text", _configuration.moreText);
        if (bindingOptions.guide.colorRangeTogglesEnabled) {
          moreText.onclick = function() {
            updateColorRangeToggles(bindingOptions, true);
          };
        } else {
          DomElement.addClass(moreText, "no-click");
        }
      }
    }
  }
  function renderControlViewGuideTypeButton(bindingOptions, mapTypes, type) {
    const typeButton = DomElement.createWithHTML(mapTypes, "button", "type", type);
    if (bindingOptions._currentView.type === type) {
      DomElement.addClass(typeButton, "active");
    }
    typeButton.onclick = function() {
      if (bindingOptions._currentView.type !== type) {
        bindingOptions._currentView.type = type;
        fireCustomTriggerEvent(bindingOptions.events.onTypeSwitch, type);
        renderControlContainer(bindingOptions);
      }
    };
  }
  function renderControlViewGuideDay(bindingOptions, days, colorRange) {
    const day = DomElement.create(days, "div");
    day.className = "day";
    addToolTip(day, bindingOptions, colorRange.tooltipText);
    if (isColorRangeVisible(bindingOptions, colorRange.id)) {
      if (bindingOptions._currentView.view === 1 /* map */ && Is.definedString(colorRange.mapCssClassName)) {
        DomElement.addClass(day, colorRange.mapCssClassName);
      } else if (bindingOptions.views.chart.enabled && bindingOptions._currentView.view === 2 /* chart */ && Is.definedString(colorRange.chartCssClassName)) {
        DomElement.addClass(day, colorRange.chartCssClassName);
      } else if (bindingOptions.views.statistics.enabled && bindingOptions._currentView.view === 4 /* statistics */ && Is.definedString(colorRange.statisticsCssClassName)) {
        DomElement.addClass(day, colorRange.statisticsCssClassName);
      } else {
        DomElement.addClass(day, colorRange.cssClassName);
      }
    }
    if (bindingOptions.guide.showNumbersInGuide) {
      DomElement.addClass(day, "day-number");
      day.innerHTML = colorRange.minimum + "+" /* plus */;
    }
    if (bindingOptions.guide.colorRangeTogglesEnabled) {
      day.onclick = function() {
        toggleColorRangeVisibleState(bindingOptions, colorRange.id);
      };
    } else {
      DomElement.addClass(day, "no-hover");
    }
  }
  function renderDescription(bindingOptions, container) {
    if (Is.definedString(bindingOptions.description.text)) {
      if (Is.definedString(bindingOptions.description.url)) {
        const link = DomElement.createWithHTML(container, "a", "label", bindingOptions.description.text);
        link.href = bindingOptions.description.url;
        link.target = bindingOptions.description.urlTarget;
      } else {
        DomElement.createWithHTML(container, "span", "label", bindingOptions.description.text);
      }
    }
  }
  function renderDayToolTip(bindingOptions, day, date, dateCount) {
    if (Is.definedFunction(bindingOptions.events.onDayToolTipRender)) {
      addToolTip(day, bindingOptions, fireCustomTriggerEvent(bindingOptions.events.onDayToolTipRender, date, dateCount));
    } else {
      let tooltip = DateTime.getCustomFormattedDateText(_configuration, bindingOptions.tooltip.dayText, date);
      if (bindingOptions.showHolidaysInDayToolTips) {
        let holiday = isHoliday(bindingOptions, date);
        if (holiday.matched && Is.definedString(holiday.name)) {
          tooltip += ":" /* colon */ + " " /* space */ + holiday.name;
        }
      }
      addToolTip(day, bindingOptions, tooltip);
    }
  }
  function createDateStorageForElement(elementId, bindingOptions, storeLocalData = true) {
    _elements_DateCounts[elementId] = {
      options: bindingOptions,
      type: {},
      types: 1
    };
    _elements_DateCounts[elementId].type[_configuration.unknownTrendText] = {};
    if (storeLocalData && !bindingOptions._currentView.isInFetchMode) {
      loadDataFromLocalStorage(bindingOptions);
    }
  }
  function getCurrentViewData(bindingOptions) {
    return _elements_DateCounts[bindingOptions._currentView.element.id].type[bindingOptions._currentView.type];
  }
  function isMonthVisible(monthsToShow, month) {
    return monthsToShow.indexOf(month + 1) > -1 /* notFound */;
  }
  function isDayVisible(daysToShow, day) {
    return daysToShow.indexOf(day) > -1 /* notFound */;
  }
  function getYearsAvailableInData(bindingOptions) {
    let years = [];
    if (bindingOptions.showOnlyDataForYearsAvailable) {
      let data = getCurrentViewData(bindingOptions);
      for (let storageDate in data) {
        if (data.hasOwnProperty(storageDate)) {
          let year = parseInt(getStorageDateYear(storageDate));
          if (years.indexOf(year) === -1 /* notFound */) {
            years.push(year);
          }
        }
      }
    }
    years = years.sort(function(a, b) {
      return a - b;
    });
    return years;
  }
  function isYearVisible(bindingOptions, year) {
    return bindingOptions.yearsToHide.indexOf(year) === -1 /* notFound */ && (bindingOptions._currentView.yearsAvailable.length === 0 || bindingOptions._currentView.yearsAvailable.indexOf(year) > -1 /* notFound */);
  }
  function isFirstVisibleYear(bindingOptions, year) {
    return bindingOptions._currentView.yearsAvailable.length > 0 && year <= bindingOptions._currentView.yearsAvailable[0];
  }
  function isLastVisibleYear(bindingOptions, year) {
    return bindingOptions._currentView.yearsAvailable.length > 0 && year >= bindingOptions._currentView.yearsAvailable[bindingOptions._currentView.yearsAvailable.length - 1];
  }
  function loadDataFromLocalStorage(bindingOptions) {
    if (bindingOptions.useLocalStorageForData && window.localStorage) {
      const keysLength = window.localStorage.length;
      const elementId = bindingOptions._currentView.element.id;
      for (let keyIndex = 0; keyIndex < keysLength; keyIndex++) {
        const key = window.localStorage.key(keyIndex);
        if (Data.String.startsWithAnyCase(key, _local_Storage_Start_ID)) {
          const typesJson = window.localStorage.getItem(key);
          const typesObject = getObjectFromString(typesJson);
          if (typesObject.parsed) {
            _elements_DateCounts[elementId].type = typesObject.result;
            _elements_DateCounts[elementId].types = 0;
            for (let type in _elements_DateCounts[elementId].type) {
              if (_elements_DateCounts[elementId].type.hasOwnProperty(type)) {
                _elements_DateCounts[elementId].types++;
              }
            }
          }
        }
      }
    }
  }
  function storeDataInLocalStorage(bindingOptions) {
    if (bindingOptions.useLocalStorageForData && window.localStorage) {
      const elementId = bindingOptions._currentView.element.id;
      clearLocalStorageObjects(bindingOptions);
      const jsonData = JSON.stringify(_elements_DateCounts[elementId].type);
      window.localStorage.setItem(_local_Storage_Start_ID + elementId, jsonData);
    }
  }
  function clearLocalStorageObjects(bindingOptions) {
    if (bindingOptions.useLocalStorageForData && window.localStorage) {
      const keysLength = window.localStorage.length;
      const keysToRemove = [];
      const elementId = bindingOptions._currentView.element.id;
      for (let keyIndex = 0; keyIndex < keysLength; keyIndex++) {
        if (Data.String.startsWithAnyCase(window.localStorage.key(keyIndex), _local_Storage_Start_ID + elementId)) {
          keysToRemove.push(window.localStorage.key(keyIndex));
        }
      }
      const keysToRemoveLength = keysToRemove.length;
      for (let keyToRemoveIndex = 0; keyToRemoveIndex < keysToRemoveLength; keyToRemoveIndex++) {
        window.localStorage.removeItem(keysToRemove[keyToRemoveIndex]);
      }
    }
  }
  function startDataPullTimer(bindingOptions) {
    if (bindingOptions._currentView.isInFetchMode) {
      if (!Is.defined(bindingOptions._currentView.isInFetchModeTimer)) {
        pullDataFromCustomTrigger(bindingOptions);
      }
      if (!Is.defined(bindingOptions._currentView.isInFetchModeTimer)) {
        bindingOptions._currentView.isInFetchModeTimer = setInterval(function() {
          pullDataFromCustomTrigger(bindingOptions);
          renderControlContainer(bindingOptions);
        }, bindingOptions.dataFetchDelay);
      }
    }
  }
  function pullDataFromCustomTrigger(bindingOptions) {
    const elementId = bindingOptions._currentView.element.id;
    const data = fireCustomTriggerEvent(bindingOptions.events.onDataFetch, elementId);
    if (Is.definedObject(data)) {
      createDateStorageForElement(elementId, bindingOptions, false);
      for (let storageDate in data) {
        if (data.hasOwnProperty(storageDate)) {
          if (!_elements_DateCounts[elementId].type[_configuration.unknownTrendText].hasOwnProperty(storageDate)) {
            _elements_DateCounts[elementId].type[_configuration.unknownTrendText][storageDate] = 0;
          }
          _elements_DateCounts[elementId].type[_configuration.unknownTrendText][storageDate] += data[storageDate];
        }
      }
    }
  }
  function cancelAllPullDataTimers() {
    for (let elementId in _elements_DateCounts) {
      if (_elements_DateCounts.hasOwnProperty(elementId)) {
        const bindingOptions = _elements_DateCounts[elementId].options;
        if (Is.defined(bindingOptions._currentView.isInFetchModeTimer)) {
          clearInterval(bindingOptions._currentView.isInFetchModeTimer);
        }
      }
    }
  }
  function isColorRangeVisible(bindingOptions, id) {
    let result2 = false;
    if (id === _internal_Name_Holiday) {
      result2 = true;
    } else {
      const colorRangesLength = bindingOptions.colorRanges.length;
      for (let colorRangesIndex = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++) {
        const colorRange = bindingOptions.colorRanges[colorRangesIndex];
        if (colorRange.id === id && Data.getDefaultBoolean(colorRange.visible, true)) {
          result2 = true;
          break;
        }
      }
    }
    return result2;
  }
  function updateColorRangeToggles(bindingOptions, flag) {
    const colorRangesLength = bindingOptions.colorRanges.length;
    for (let colorRangesIndex = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++) {
      bindingOptions.colorRanges[colorRangesIndex].visible = flag;
      fireCustomTriggerEvent(bindingOptions.events.onColorRangeTypeToggle, bindingOptions.colorRanges[colorRangesIndex].id, flag);
    }
    renderControlContainer(bindingOptions);
  }
  function toggleColorRangeVisibleState(bindingOptions, id) {
    const colorRangesLength = bindingOptions.colorRanges.length;
    for (let colorRangesIndex = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++) {
      const colorRange = bindingOptions.colorRanges[colorRangesIndex];
      if (colorRange.id === id) {
        colorRange.visible = !Data.getDefaultBoolean(colorRange.visible, true);
        fireCustomTriggerEvent(bindingOptions.events.onColorRangeTypeToggle, colorRange.id, colorRange.visible);
        renderControlContainer(bindingOptions);
        break;
      }
    }
  }
  function getColorRange(bindingOptions, colorRanges, dateCount, date = null) {
    let useColorRange = null;
    if (Is.defined(date) && isHoliday(bindingOptions, date).matched) {
      const newUseColorRange = {
        cssClassName: "holiday",
        id: _internal_Name_Holiday,
        visible: true,
        name: "" /* empty */,
        minimum: 0,
        mapCssClassName: "" /* empty */,
        chartCssClassName: "" /* empty */,
        statisticsCssClassName: "" /* empty */,
        tooltipText: "" /* empty */
      };
      useColorRange = newUseColorRange;
    }
    if (!Is.defined(useColorRange)) {
      const colorRangesLength = colorRanges.length;
      for (let colorRangesIndex = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++) {
        const colorRange = colorRanges[colorRangesIndex];
        if (dateCount >= colorRange.minimum) {
          useColorRange = colorRange;
        } else {
          break;
        }
      }
    }
    return useColorRange;
  }
  function getColorRangeByMinimum(colorRanges, minimum) {
    const colorRangesLength = colorRanges.length;
    let useColorRange = null;
    for (let colorRangesIndex = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++) {
      const colorRange = colorRanges[colorRangesIndex];
      if (minimum.toString() === colorRange.minimum.toString()) {
        useColorRange = colorRange;
        break;
      }
    }
    return useColorRange;
  }
  function getSortedColorRanges(bindingOptions) {
    return bindingOptions.colorRanges.sort(function(a, b) {
      return a.minimum - b.minimum;
    });
  }
  function isHoliday(bindingOptions, date) {
    const holidaysLength = bindingOptions.holidays.length;
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    let holidayMatched = false;
    let holidayName = null;
    for (let holidayIndex = 0; holidayIndex < holidaysLength; holidayIndex++) {
      let holiday = bindingOptions.holidays[holidayIndex];
      if (Is.definedString(holiday.date) && holiday.showInViews) {
        const dateParts = holiday.date.split("/");
        if (dateParts.length === 2) {
          holidayMatched = day === parseInt(dateParts[0]) && month === parseInt(dateParts[1]);
        } else if (dateParts.length === 3) {
          holidayMatched = day === parseInt(dateParts[0]) && month === parseInt(dateParts[1]) && year === parseInt(dateParts[2]);
        }
        if (holidayMatched) {
          holidayName = holiday.name;
          break;
        }
      }
    }
    return {
      matched: holidayMatched,
      name: holidayName
    };
  }
  function makeAreaDroppable(element, bindingOptions) {
    if (bindingOptions.allowFileImports && !bindingOptions._currentView.isInFetchMode) {
      element.ondragover = DomElement.cancelBubble;
      element.ondragenter = DomElement.cancelBubble;
      element.ondragleave = DomElement.cancelBubble;
      element.ondrop = function(e) {
        DomElement.cancelBubble(e);
        if (Is.defined(window.FileReader) && e.dataTransfer.files.length > 0) {
          importFromFiles(e.dataTransfer.files, bindingOptions);
        }
      };
    }
  }
  function importFromFilesSelected(bindingOptions) {
    const input = DomElement.createWithNoContainer("input");
    input.type = "file";
    input.accept = ".json, .txt, .csv";
    input.multiple = "multiple";
    input.onchange = function() {
      importFromFiles(input.files, bindingOptions);
    };
    input.click();
  }
  function importFromFiles(files, bindingOptions) {
    const filesLength = files.length;
    const filesCompleted = [];
    const data = getCurrentViewData(bindingOptions);
    const onLoadEnd = function(filename, readingObject) {
      filesCompleted.push(filename);
      for (let storageDate in readingObject) {
        if (readingObject.hasOwnProperty(storageDate)) {
          if (!data.hasOwnProperty(storageDate)) {
            data[storageDate] = 0;
          }
          data[storageDate] += readingObject[storageDate];
        }
      }
      if (filesCompleted.length === filesLength) {
        fireCustomTriggerEvent(bindingOptions.events.onImport, bindingOptions._currentView.element);
        renderControlContainer(bindingOptions);
      }
    };
    for (let fileIndex = 0; fileIndex < filesLength; fileIndex++) {
      const file = files[fileIndex];
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (fileExtension === "json" /* json */) {
        importFromJson(file, onLoadEnd);
      } else if (fileExtension === "txt" /* txt */) {
        importFromTxt(file, onLoadEnd);
      } else if (fileExtension === "csv" /* csv */) {
        importFromCsv(file, onLoadEnd);
      }
    }
  }
  function importFromJson(file, onLoadEnd) {
    const reader = new FileReader();
    let readingObject = null;
    reader.readAsText(file);
    reader.onloadend = function() {
      onLoadEnd(file.name, readingObject);
    };
    reader.onload = function(e) {
      const JSON2 = getObjectFromString(e.target.result);
      if (JSON2.parsed && Is.definedObject(JSON2.result)) {
        readingObject = JSON2.result;
      }
    };
  }
  function importFromTxt(file, onLoadEnd) {
    const reader = new FileReader();
    const readingObject = null;
    reader.readAsText(file);
    reader.onloadend = function() {
      onLoadEnd(file.name, readingObject);
    };
    reader.onload = function(e) {
      const lines = e.target.result.toString().split("\n" /* newLine */);
      const linesLength = lines.length;
      for (let lineIndex = 0; lineIndex < linesLength; lineIndex++) {
        const line = lines[lineIndex].split(":" /* colon */);
        readingObject[line[0].trim()] = parseInt(line[1].trim());
      }
    };
  }
  function importFromCsv(file, onLoadEnd) {
    const reader = new FileReader();
    const readingObject = null;
    reader.readAsText(file);
    reader.onloadend = function() {
      onLoadEnd(file.name, readingObject);
    };
    reader.onload = function(e) {
      const data = e.target.result.toString().replace(new RegExp('"', "g"), "" /* empty */);
      const lines = data.split("\n" /* newLine */);
      lines.shift();
      const linesLength = lines.length;
      for (let lineIndex = 0; lineIndex < linesLength; lineIndex++) {
        let line = lines[lineIndex].split("," /* comma */);
        readingObject[line[0].trim()] = parseInt(line[1].trim());
      }
    };
  }
  function exportAllData(bindingOptions, exportType = null) {
    let contents = null;
    const contentsMimeType = getExportMimeType(bindingOptions);
    const contentExportType = Data.getDefaultString(exportType, bindingOptions.exportType).toLowerCase();
    if (contentExportType === "csv" /* csv */) {
      contents = getCsvContent(bindingOptions);
    } else if (contentExportType === "json" /* json */) {
      contents = getJsonContent(bindingOptions);
    } else if (contentExportType === "xml" /* xml */) {
      contents = getXmlContents(bindingOptions);
    } else if (contentExportType === "txt" /* txt */) {
      contents = getTxtContents(bindingOptions);
    }
    if (Is.definedString(contents)) {
      const tempLink = DomElement.create(document.body, "a");
      tempLink.style.display = "none";
      tempLink.setAttribute("target", "_blank");
      tempLink.setAttribute("href", "data:" + contentsMimeType + ";charset=utf-8," + encodeURIComponent(contents));
      tempLink.setAttribute("download", getExportFilename(bindingOptions));
      tempLink.click();
      document.body.removeChild(tempLink);
      fireCustomTriggerEvent(bindingOptions.events.onExport, bindingOptions._currentView.element);
    }
  }
  function getCsvContent(bindingOptions) {
    const data = getExportData(bindingOptions);
    const csvContents = [];
    for (let storageDate in data) {
      if (data.hasOwnProperty(storageDate)) {
        csvContents.push(getCsvValueLine([getCsvValue(storageDate), getCsvValue(data[storageDate])]));
      }
    }
    if (csvContents.length > 0) {
      csvContents.unshift(getCsvValueLine([getCsvValue(_configuration.dateText), getCsvValue(_configuration.countText)]));
    }
    return csvContents.join("\n" /* newLine */);
  }
  function getJsonContent(bindingOptions) {
    return JSON.stringify(getExportData(bindingOptions));
  }
  function getXmlContents(bindingOptions) {
    const data = getExportData(bindingOptions);
    const contents = [];
    contents.push('<?xml version="1.0" ?>');
    contents.push("<Dates>");
    for (let storageDate in data) {
      if (data.hasOwnProperty(storageDate)) {
        contents.push("<Date>");
        contents.push("<FullDate>" + storageDate + "</FullDate>");
        contents.push("<Count>" + data[storageDate] + "</Count>");
        contents.push("</Date>");
      }
    }
    contents.push("</Dates>");
    return contents.join("\n" /* newLine */);
  }
  function getTxtContents(bindingOptions) {
    const data = getExportData(bindingOptions);
    const contents = [];
    for (let storageDate in data) {
      if (data.hasOwnProperty(storageDate)) {
        contents.push(storageDate + ":" /* colon */ + " " /* space */ + data[storageDate].toString());
      }
    }
    return contents.join("\n" /* newLine */);
  }
  function getExportData(bindingOptions) {
    const contents = {};
    const data = getCurrentViewData(bindingOptions);
    if (bindingOptions.exportOnlyYearBeingViewed) {
      for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
        const totalDaysInMonth = DateTime.getTotalDaysInMonth(bindingOptions._currentView.year, monthIndex);
        for (let dayIndex = 0; dayIndex < totalDaysInMonth; dayIndex++) {
          const storageDate2 = toStorageDate(new Date(bindingOptions._currentView.year, monthIndex, dayIndex + 1));
          if (data.hasOwnProperty(storageDate2)) {
            contents[storageDate2] = data[storageDate2];
          }
        }
      }
    } else {
      const storageDates = [];
      for (let storageDate1 in data) {
        if (data.hasOwnProperty(storageDate1)) {
          storageDates.push(storageDate1);
        }
      }
      storageDates.sort();
      const storageDatesLength = storageDates.length;
      for (let storageDateIndex = 0; storageDateIndex < storageDatesLength; storageDateIndex++) {
        const storageDate3 = storageDates[storageDateIndex];
        if (data.hasOwnProperty(storageDate3)) {
          contents[storageDate3] = data[storageDate3];
        }
      }
    }
    return contents;
  }
  function getExportMimeType(bindingOptions) {
    let result2 = null;
    if (bindingOptions.exportType.toLowerCase() === "csv" /* csv */) {
      result2 = "text/csv";
    } else if (bindingOptions.exportType.toLowerCase() === "json" /* json */) {
      result2 = "application/json";
    } else if (bindingOptions.exportType.toLowerCase() === "xml" /* xml */) {
      result2 = "application/xml";
    } else if (bindingOptions.exportType.toLowerCase() === "txt" /* txt */) {
      result2 = "text/plain";
    }
    return result2;
  }
  function getExportFilename(bindingOptions) {
    const date = /* @__PURE__ */ new Date();
    const datePart = Data.String.padNumber(date.getDate()) + "-" /* dash */ + Data.String.padNumber(date.getMonth() + 1) + "-" /* dash */ + date.getFullYear();
    const timePart = Data.String.padNumber(date.getHours()) + "-" /* dash */ + Data.String.padNumber(date.getMinutes());
    let filenameStart = "" /* empty */;
    if (bindingOptions._currentView.type !== _configuration.unknownTrendText) {
      filenameStart = bindingOptions._currentView.type.toLowerCase().replace(" " /* space */, "_" /* underscore */) + "_" /* underscore */;
    }
    return filenameStart + datePart + "_" /* underscore */ + timePart + "." + bindingOptions.exportType.toLowerCase();
  }
  function getCsvValue(text) {
    let result2 = text.toString().replace(/(\r\n|\n|\r)/gm, "" /* empty */).replace(/(\s\s)/gm, " " /* space */);
    result2 = result2.replace(/"/g, '""');
    result2 = '"' + result2 + '"';
    return result2;
  }
  function getCsvValueLine(csvValues) {
    return csvValues.join(",");
  }
  function buildAttributeOptions(newOptions) {
    let options = Data.getDefaultObject(newOptions, {});
    options.views = Data.getDefaultObject(options.views, {});
    options.exportOnlyYearBeingViewed = Data.getDefaultBoolean(options.exportOnlyYearBeingViewed, true);
    options.year = Data.getDefaultNumber(options.year, (/* @__PURE__ */ new Date()).getFullYear());
    options.view = Data.getDefaultString(options.view, "map" /* map */);
    options.exportType = Data.getDefaultString(options.exportType, "csv" /* csv */);
    options.useLocalStorageForData = Data.getDefaultBoolean(options.useLocalStorageForData, false);
    options.allowFileImports = Data.getDefaultBoolean(options.allowFileImports, true);
    options.yearsToHide = Data.getDefaultArray(options.yearsToHide, []);
    options.dataFetchDelay = Data.getDefaultNumber(options.dataFetchDelay, 6e4);
    options.showOnlyDataForYearsAvailable = Data.getDefaultBoolean(options.showOnlyDataForYearsAvailable, false);
    options.showHolidaysInDayToolTips = Data.getDefaultBoolean(options.showHolidaysInDayToolTips, false);
    options = buildAttributeOptionColorRanges(options);
    options = buildAttributeOptionHolidays(options);
    options = buildAttributeOptionTitle(options);
    options = buildAttributeOptionDescription(options);
    options = buildAttributeOptionGuide(options);
    options = buildAttributeOptionToolTip(options);
    options = buildAttributeOptionMapView(options);
    options = buildAttributeOptionChartView(options);
    options = buildAttributeOptionDaysView(options);
    options = buildAttributeOptionStatisticsView(options);
    options = buildAttributeOptionCustomTriggers(options);
    return options;
  }
  function buildAttributeOptionColorRanges(options) {
    if (Is.definedArray(options.colorRanges)) {
      const colorRangesLength = options.colorRanges.length;
      for (let colorRangeIndex = 0; colorRangeIndex < colorRangesLength; colorRangeIndex++) {
        const colorRange = options.colorRanges[colorRangeIndex];
        colorRange.id = Data.getDefaultString(colorRange.id, Data.String.newGuid());
        colorRange.name = Data.getDefaultString(colorRange.name, null);
        colorRange.minimum = Data.getDefaultNumber(colorRange.minimum, 0);
        colorRange.cssClassName = Data.getDefaultString(colorRange.cssClassName, null);
        colorRange.mapCssClassName = Data.getDefaultString(colorRange.mapCssClassName, null);
        colorRange.chartCssClassName = Data.getDefaultString(colorRange.chartCssClassName, null);
        colorRange.statisticsCssClassName = Data.getDefaultString(colorRange.statisticsCssClassName, null);
        colorRange.tooltipText = Data.getDefaultString(colorRange.tooltipText, null);
        colorRange.visible = Data.getDefaultBoolean(colorRange.visible, true);
      }
    } else {
      options.colorRanges = [
        {
          id: Data.String.newGuid(),
          name: "Day Color 1",
          minimum: 10,
          cssClassName: "day-color-1",
          tooltipText: "Day Color 1",
          visible: true,
          mapCssClassName: "" /* empty */,
          chartCssClassName: "" /* empty */,
          statisticsCssClassName: "" /* empty */
        },
        {
          id: Data.String.newGuid(),
          name: "Day Color 2",
          minimum: 15,
          cssClassName: "day-color-2",
          tooltipText: "Day Color 2",
          visible: true,
          mapCssClassName: "" /* empty */,
          chartCssClassName: "" /* empty */,
          statisticsCssClassName: "" /* empty */
        },
        {
          id: Data.String.newGuid(),
          name: "Day Color 3",
          minimum: 20,
          cssClassName: "day-color-3",
          tooltipText: "Day Color 3",
          visible: true,
          mapCssClassName: "" /* empty */,
          chartCssClassName: "" /* empty */,
          statisticsCssClassName: "" /* empty */
        },
        {
          id: Data.String.newGuid(),
          name: "Day Color 4",
          minimum: 25,
          cssClassName: "day-color-4",
          tooltipText: "Day Color 4",
          visible: true,
          mapCssClassName: "" /* empty */,
          chartCssClassName: "" /* empty */,
          statisticsCssClassName: "" /* empty */
        }
      ];
    }
    return options;
  }
  function buildAttributeOptionHolidays(options) {
    if (Is.definedArray(options.holidays)) {
      const holidaysLength = options.holidays.length;
      for (let holidayIndex = 0; holidayIndex < holidaysLength; holidayIndex++) {
        const holiday = options.holidays[holidayIndex];
        holiday.date = Data.getDefaultString(holiday.date, null);
        holiday.name = Data.getDefaultString(holiday.name, null);
        holiday.showInViews = Data.getDefaultBoolean(holiday.showInViews, true);
      }
    } else {
      options.holidays = [];
    }
    return options;
  }
  function buildAttributeOptionTitle(options) {
    options.title = Data.getDefaultObject(options.title, {});
    options.title.text = Data.getDefaultString(options.title.text, "Heat.js");
    options.title.showText = Data.getDefaultBoolean(options.title.showText, true);
    options.title.showYearSelector = Data.getDefaultBoolean(options.title.showYearSelector, true);
    options.title.showRefreshButton = Data.getDefaultBoolean(options.title.showRefreshButton, false);
    options.title.showExportButton = Data.getDefaultBoolean(options.title.showExportButton, false);
    options.title.extraSelectionYears = Data.getDefaultNumber(options.title.extraSelectionYears, 50);
    options.title.showYearSelectionDropDown = Data.getDefaultBoolean(options.title.showYearSelectionDropDown, true);
    options.title.showImportButton = Data.getDefaultBoolean(options.title.showImportButton, false);
    options.title.showConfigurationButton = Data.getDefaultBoolean(options.title.showConfigurationButton, true);
    options.title.showTitleDropDownButton = Data.getDefaultBoolean(options.title.showTitleDropDownButton, true);
    options.title.showTitleDropDownHeaders = Data.getDefaultBoolean(options.title.showTitleDropDownHeaders, true);
    return options;
  }
  function buildAttributeOptionDescription(options) {
    options.description = Data.getDefaultObject(options.description, {});
    options.description.text = Data.getDefaultString(options.description.text, null);
    options.description.url = Data.getDefaultString(options.description.url, null);
    options.description.urlTarget = Data.getDefaultString(options.description.urlTarget, "_blank");
    return options;
  }
  function buildAttributeOptionGuide(options) {
    options.guide = Data.getDefaultObject(options.guide, {});
    options.guide.enabled = Data.getDefaultBoolean(options.guide.enabled, true);
    options.guide.colorRangeTogglesEnabled = Data.getDefaultBoolean(options.guide.colorRangeTogglesEnabled, true);
    options.guide.showLessAndMoreLabels = Data.getDefaultBoolean(options.guide.showLessAndMoreLabels, true);
    options.guide.showNumbersInGuide = Data.getDefaultBoolean(options.guide.showNumbersInGuide, false);
    return options;
  }
  function buildAttributeOptionToolTip(options) {
    options.tooltip = Data.getDefaultObject(options.tooltip, {});
    options.tooltip.delay = Data.getDefaultNumber(options.tooltip.delay, 750);
    options.tooltip.dayText = Data.getDefaultString(options.tooltip.dayText, "{d}{o} {mmmm} {yyyy}");
    return options;
  }
  function buildAttributeOptionMapView(options) {
    options.views.map = Data.getDefaultObject(options.views.map, {});
    options.views.map.showMonthDayGaps = Data.getDefaultBoolean(options.views.map.showMonthDayGaps, true);
    options.views.map.showDayNames = Data.getDefaultBoolean(options.views.map.showDayNames, true);
    options.views.map.placeMonthNamesOnTheBottom = Data.getDefaultBoolean(options.views.map.placeMonthNamesOnTheBottom, false);
    options.views.map.showDayNumbers = Data.getDefaultBoolean(options.views.map.showDayNumbers, false);
    options.views.map.showMonthNames = Data.getDefaultBoolean(options.views.map.showMonthNames, true);
    options.views.map.showDaysInReverseOrder = Data.getDefaultBoolean(options.views.map.showDaysInReverseOrder, false);
    options.views.map.showNoDataMessageWhenDataIsNotAvailable = Data.getDefaultBoolean(options.views.map.showNoDataMessageWhenDataIsNotAvailable, false);
    options.views.map.showMinimalDayNames = Data.getDefaultBoolean(options.views.map.showMinimalDayNames, false);
    options.views.map.showMonthsInReverseOrder = Data.getDefaultBoolean(options.views.map.showMonthsInReverseOrder, false);
    options.views.map.keepScrollPositions = Data.getDefaultBoolean(options.views.map.keepScrollPositions, false);
    if (Is.invalidOptionArray(options.views.map.monthsToShow)) {
      options.views.map.monthsToShow = _default_MonthsToShow;
    }
    if (Is.invalidOptionArray(options.views.map.daysToShow)) {
      options.views.map.daysToShow = _default_DaysToShow;
    }
    return options;
  }
  function buildAttributeOptionChartView(options) {
    options.views.chart = Data.getDefaultObject(options.views.chart, {});
    options.views.chart.enabled = Data.getDefaultBoolean(options.views.chart.enabled, true);
    options.views.chart.showChartYLabels = Data.getDefaultBoolean(options.views.chart.showChartYLabels, true);
    options.views.chart.showMonthNames = Data.getDefaultBoolean(options.views.chart.showMonthNames, true);
    options.views.chart.showLineNumbers = Data.getDefaultBoolean(options.views.chart.showLineNumbers, false);
    options.views.chart.showInReverseOrder = Data.getDefaultBoolean(options.views.chart.showInReverseOrder, false);
    options.views.chart.keepScrollPositions = Data.getDefaultBoolean(options.views.chart.keepScrollPositions, false);
    if (Is.invalidOptionArray(options.views.chart.monthsToShow)) {
      options.views.chart.monthsToShow = _default_MonthsToShow;
    }
    if (Is.invalidOptionArray(options.views.chart.daysToShow)) {
      options.views.chart.daysToShow = _default_DaysToShow;
    }
    return options;
  }
  function buildAttributeOptionDaysView(options) {
    options.views.days = Data.getDefaultObject(options.views.days, {});
    options.views.days.enabled = Data.getDefaultBoolean(options.views.days.enabled, true);
    options.views.days.showChartYLabels = Data.getDefaultBoolean(options.views.days.showChartYLabels, true);
    options.views.days.showDayNames = Data.getDefaultBoolean(options.views.days.showDayNames, true);
    options.views.days.showInReverseOrder = Data.getDefaultBoolean(options.views.days.showInReverseOrder, false);
    options.views.days.showDayNumbers = Data.getDefaultBoolean(options.views.days.showDayNumbers, false);
    options.views.days.keepScrollPositions = Data.getDefaultBoolean(options.views.days.keepScrollPositions, false);
    if (Is.invalidOptionArray(options.views.days.monthsToShow)) {
      options.views.days.monthsToShow = _default_MonthsToShow;
    }
    if (Is.invalidOptionArray(options.views.days.daysToShow)) {
      options.views.days.daysToShow = _default_DaysToShow;
    }
    return options;
  }
  function buildAttributeOptionStatisticsView(options) {
    options.views.statistics = Data.getDefaultObject(options.views.statistics, {});
    options.views.statistics.enabled = Data.getDefaultBoolean(options.views.statistics.enabled, true);
    options.views.statistics.showChartYLabels = Data.getDefaultBoolean(options.views.statistics.showChartYLabels, true);
    options.views.statistics.showColorRangeLabels = Data.getDefaultBoolean(options.views.statistics.showColorRangeLabels, true);
    options.views.statistics.useColorRangeNamesForLabels = Data.getDefaultBoolean(options.views.statistics.useColorRangeNamesForLabels, false);
    options.views.statistics.showRangeNumbers = Data.getDefaultBoolean(options.views.statistics.showRangeNumbers, false);
    options.views.statistics.showInReverseOrder = Data.getDefaultBoolean(options.views.statistics.showInReverseOrder, false);
    options.views.statistics.keepScrollPositions = Data.getDefaultBoolean(options.views.statistics.keepScrollPositions, false);
    if (Is.invalidOptionArray(options.views.statistics.monthsToShow)) {
      options.views.statistics.monthsToShow = _default_MonthsToShow;
    }
    if (Is.invalidOptionArray(options.views.statistics.daysToShow)) {
      options.views.statistics.daysToShow = _default_DaysToShow;
    }
    return options;
  }
  function buildAttributeOptionCustomTriggers(options) {
    options.events = Data.getDefaultObject(options.events, {});
    options.events.onDayClick = Data.getDefaultFunction(options.events.onDayClick, null);
    options.events.onBackYear = Data.getDefaultFunction(options.events.onBackYear, null);
    options.events.onNextYear = Data.getDefaultFunction(options.events.onNextYear, null);
    options.events.onRefresh = Data.getDefaultFunction(options.events.onRefresh, null);
    options.events.onBeforeRender = Data.getDefaultFunction(options.events.onBeforeRender, null);
    options.events.onRenderComplete = Data.getDefaultFunction(options.events.onRenderComplete, null);
    options.events.onDestroy = Data.getDefaultFunction(options.events.onDestroy, null);
    options.events.onExport = Data.getDefaultFunction(options.events.onExport, null);
    options.events.onSetYear = Data.getDefaultFunction(options.events.onSetYear, null);
    options.events.onTypeSwitch = Data.getDefaultFunction(options.events.onTypeSwitch, null);
    options.events.onDayToolTipRender = Data.getDefaultFunction(options.events.onDayToolTipRender, null);
    options.events.onAdd = Data.getDefaultFunction(options.events.onAdd, null);
    options.events.onRemove = Data.getDefaultFunction(options.events.onRemove, null);
    options.events.onReset = Data.getDefaultFunction(options.events.onReset, null);
    options.events.onViewSwitch = Data.getDefaultFunction(options.events.onViewSwitch, null);
    options.events.onColorRangeTypeToggle = Data.getDefaultFunction(options.events.onColorRangeTypeToggle, null);
    options.events.onImport = Data.getDefaultFunction(options.events.onImport, null);
    options.events.onStatisticClick = Data.getDefaultFunction(options.events.onStatisticClick, null);
    options.events.onDataFetch = Data.getDefaultFunction(options.events.onDataFetch, null);
    options.events.onClear = Data.getDefaultFunction(options.events.onClear, null);
    options.events.onUpdate = Data.getDefaultFunction(options.events.onUpdate, null);
    options.events.onOptionsUpdate = Data.getDefaultFunction(options.events.onOptionsUpdate, null);
    options.events.onWeekDayClick = Data.getDefaultFunction(options.events.onWeekDayClick, null);
    return options;
  }
  function fireCustomTriggerEvent(triggerFunction, ...args) {
    let result2 = null;
    if (Is.definedFunction(triggerFunction)) {
      result2 = triggerFunction.apply(null, [].slice.call(args, 0));
    }
    return result2;
  }
  function getObjectFromString(objectString) {
    let parsed = true, result = null;
    try {
      if (Is.definedString(objectString)) {
        result = JSON.parse(objectString);
      }
    } catch (e1) {
      try {
        let evalResult = result = eval("(" + objectString + ")");
        if (Is.definedFunction(result)) {
          result = evalResult();
        }
      } catch (e2) {
        if (!_configuration.safeMode) {
          console.error(_configuration.objectErrorText.replace("{{error_1}}", e1.message).replace("{{error_2}}", e2.message));
          parsed = false;
        }
        result = null;
      }
    }
    return {
      parsed,
      result
    };
  }
  function toStorageDate(date) {
    return date.getFullYear() + "-" /* dash */ + Data.String.padNumber(date.getMonth() + 1) + "-" /* dash */ + Data.String.padNumber(date.getDate());
  }
  function getStorageDate(data) {
    return data.split("-" /* dash */);
  }
  function getStorageDateYear(data) {
    return data.split("-" /* dash */)[0];
  }
  function moveToPreviousYear(bindingOptions, callCustomTrigger = true) {
    let render2 = true;
    let year = bindingOptions._currentView.year;
    year--;
    while (!isYearVisible(bindingOptions, year)) {
      if (isFirstVisibleYear(bindingOptions, year)) {
        render2 = false;
        break;
      }
      year--;
    }
    if (render2) {
      bindingOptions._currentView.year = year;
      renderControlContainer(bindingOptions);
      if (callCustomTrigger) {
        fireCustomTriggerEvent(bindingOptions.events.onBackYear, bindingOptions._currentView.year);
      }
    }
  }
  function moveToNextYear(bindingOptions, callCustomTrigger = true) {
    let render2 = true;
    let year = bindingOptions._currentView.year;
    year++;
    while (!isYearVisible(bindingOptions, year)) {
      if (isLastVisibleYear(bindingOptions, year)) {
        render2 = false;
        break;
      }
      year++;
    }
    if (render2) {
      bindingOptions._currentView.year = year;
      renderControlContainer(bindingOptions);
      if (callCustomTrigger) {
        fireCustomTriggerEvent(bindingOptions.events.onBackYear, bindingOptions._currentView.year);
      }
    }
  }
  function destroyElement(bindingOptions) {
    bindingOptions._currentView.element.innerHTML = "" /* empty */;
    DomElement.removeClass(bindingOptions._currentView.element, "heat-js");
    assignToolTipEvents(bindingOptions, false);
    document.body.removeChild(bindingOptions._currentView.tooltip);
    if (bindingOptions._currentView.isInFetchMode && Is.defined(bindingOptions._currentView.isInFetchModeTimer)) {
      clearInterval(bindingOptions._currentView.isInFetchModeTimer);
    }
    fireCustomTriggerEvent(bindingOptions.events.onDestroy, bindingOptions._currentView.element);
  }
  function buildDefaultConfiguration(newConfiguration = null) {
    _configuration = !Is.definedObject(newConfiguration) ? {} : newConfiguration;
    _configuration.safeMode = Data.getDefaultBoolean(_configuration.safeMode, true);
    _configuration.domElementTypes = Data.getDefaultStringOrArray(_configuration.domElementTypes, ["*"]);
    buildDefaultConfigurationStrings();
    buildDefaultConfigurationArrays();
  }
  function buildDefaultConfigurationStrings() {
    _configuration.stText = Data.getDefaultAnyString(_configuration.stText, "st");
    _configuration.ndText = Data.getDefaultAnyString(_configuration.ndText, "nd");
    _configuration.rdText = Data.getDefaultAnyString(_configuration.rdText, "rd");
    _configuration.thText = Data.getDefaultAnyString(_configuration.thText, "th");
    _configuration.backButtonText = Data.getDefaultAnyString(_configuration.backButtonText, "Back");
    _configuration.nextButtonText = Data.getDefaultAnyString(_configuration.nextButtonText, "Next");
    _configuration.refreshButtonText = Data.getDefaultAnyString(_configuration.refreshButtonText, "Refresh");
    _configuration.exportButtonText = Data.getDefaultAnyString(_configuration.exportButtonText, "Export");
    _configuration.lessText = Data.getDefaultAnyString(_configuration.lessText, "Less");
    _configuration.moreText = Data.getDefaultAnyString(_configuration.moreText, "More");
    _configuration.dateText = Data.getDefaultAnyString(_configuration.dateText, "Date");
    _configuration.countText = Data.getDefaultAnyString(_configuration.countText, "Count");
    _configuration.mapText = Data.getDefaultAnyString(_configuration.mapText, "Map");
    _configuration.chartText = Data.getDefaultAnyString(_configuration.chartText, "Chart");
    _configuration.noChartDataMessage = Data.getDefaultAnyString(_configuration.noChartDataMessage, "There is currently no data to view.");
    _configuration.statisticsText = Data.getDefaultAnyString(_configuration.statisticsText, "Statistics");
    _configuration.noStatisticsDataMessage = Data.getDefaultAnyString(_configuration.noStatisticsDataMessage, "There are currently no statistics to view.");
    _configuration.unknownTrendText = Data.getDefaultAnyString(_configuration.unknownTrendText, "Unknown");
    _configuration.importButtonText = Data.getDefaultAnyString(_configuration.importButtonText, "Import");
    _configuration.noMapDataMessage = Data.getDefaultAnyString(_configuration.noMapDataMessage, "There is currently no data to view.");
    _configuration.objectErrorText = Data.getDefaultAnyString(_configuration.objectErrorText, "Errors in object: {{error_1}}, {{error_2}}");
    _configuration.attributeNotValidErrorText = Data.getDefaultAnyString(_configuration.attributeNotValidErrorText, "The attribute '{{attribute_name}}' is not a valid object.");
    _configuration.attributeNotSetErrorText = Data.getDefaultAnyString(_configuration.attributeNotSetErrorText, "The attribute '{{attribute_name}}' has not been set correctly.");
    _configuration.closeToolTipText = Data.getDefaultAnyString(_configuration.closeToolTipText, "Close");
    _configuration.configurationToolTipText = Data.getDefaultAnyString(_configuration.configurationToolTipText, "Configuration");
    _configuration.configurationTitleText = Data.getDefaultAnyString(_configuration.configurationTitleText, "Configuration");
    _configuration.visibleMonthsText = Data.getDefaultAnyString(_configuration.visibleMonthsText, "Visible Months");
    _configuration.visibleDaysText = Data.getDefaultAnyString(_configuration.visibleDaysText, "Visible Days");
    _configuration.dataText = Data.getDefaultAnyString(_configuration.dataText, "Data");
    _configuration.colorRangesText = Data.getDefaultAnyString(_configuration.colorRangesText, "Color Ranges");
    _configuration.yearText = Data.getDefaultAnyString(_configuration.yearText, "Year");
    _configuration.daysText = Data.getDefaultAnyString(_configuration.daysText, "Days");
    _configuration.noDaysDataMessage = Data.getDefaultAnyString(_configuration.noDaysDataMessage, "There are currently no days to view.");
  }
  function buildDefaultConfigurationArrays() {
    if (Is.invalidOptionArray(_configuration.monthNames, 12)) {
      _configuration.monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
    }
    if (Is.invalidOptionArray(_configuration.dayNames, 7)) {
      _configuration.dayNames = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
      ];
    }
  }
  const _public = {
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public Functions:  Manage Dates
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    addDates: function(elementId, dates, type = null, triggerRefresh = true) {
      if (Is.definedString(elementId) && Is.definedArray(dates) && _elements_DateCounts.hasOwnProperty(elementId)) {
        const bindingOptions = _elements_DateCounts[elementId].options;
        if (!bindingOptions._currentView.isInFetchMode) {
          type = Data.getDefaultString(type, _configuration.unknownTrendText);
          const datesLength = dates.length;
          for (let dateIndex = 0; dateIndex < datesLength; dateIndex++) {
            _public.addDate(elementId, dates[dateIndex], type, false);
          }
          if (triggerRefresh) {
            renderControlContainer(bindingOptions, true);
          }
        }
      }
      return _public;
    },
    addDate: function(elementId, date, type = null, triggerRefresh = true) {
      if (Is.definedString(elementId) && Is.definedDate(date) && _elements_DateCounts.hasOwnProperty(elementId)) {
        const bindingOptions = _elements_DateCounts[elementId].options;
        if (!bindingOptions._currentView.isInFetchMode) {
          type = Data.getDefaultString(type, _configuration.unknownTrendText);
          const storageDate = toStorageDate(date);
          if (!_elements_DateCounts[elementId].type.hasOwnProperty(type)) {
            _elements_DateCounts[elementId].type[type] = {};
            _elements_DateCounts[elementId].types++;
          }
          if (!_elements_DateCounts[elementId].type[type].hasOwnProperty(storageDate)) {
            _elements_DateCounts[elementId].type[type][storageDate] = 0;
          }
          _elements_DateCounts[elementId].type[type][storageDate]++;
          fireCustomTriggerEvent(bindingOptions.events.onAdd, bindingOptions._currentView.element);
          if (triggerRefresh) {
            renderControlContainer(bindingOptions, true);
          }
        }
      }
      return _public;
    },
    updateDate: function(elementId, date, count, type = null, triggerRefresh = true) {
      if (Is.definedString(elementId) && Is.definedDate(date) && _elements_DateCounts.hasOwnProperty(elementId)) {
        const bindingOptions = _elements_DateCounts[elementId].options;
        if (!bindingOptions._currentView.isInFetchMode && count > 0) {
          const storageDate = toStorageDate(date);
          if (_elements_DateCounts[elementId].type.hasOwnProperty(type)) {
            type = Data.getDefaultString(type, _configuration.unknownTrendText);
            _elements_DateCounts[elementId].type[type][storageDate] = count;
            fireCustomTriggerEvent(bindingOptions.events.onUpdate, bindingOptions._currentView.element);
            if (triggerRefresh) {
              renderControlContainer(bindingOptions, true);
            }
          }
        }
      }
      return _public;
    },
    removeDates: function(elementId, dates, type = null, triggerRefresh = true) {
      if (Is.definedString(elementId) && Is.definedArray(dates) && _elements_DateCounts.hasOwnProperty(elementId)) {
        const bindingOptions = _elements_DateCounts[elementId].options;
        if (!bindingOptions._currentView.isInFetchMode) {
          type = Data.getDefaultString(type, _configuration.unknownTrendText);
          const datesLength = dates.length;
          for (let dateIndex = 0; dateIndex < datesLength; dateIndex++) {
            _public.removeDate(elementId, dates[dateIndex], type, false);
          }
          if (triggerRefresh) {
            renderControlContainer(bindingOptions, true);
          }
        }
      }
      return _public;
    },
    removeDate: function(elementId, date, type = null, triggerRefresh = true) {
      if (Is.definedString(elementId) && Is.definedDate(date) && _elements_DateCounts.hasOwnProperty(elementId)) {
        const bindingOptions = _elements_DateCounts[elementId].options;
        if (!bindingOptions._currentView.isInFetchMode) {
          const storageDate = toStorageDate(date);
          if (_elements_DateCounts[elementId].type.hasOwnProperty(type) && _elements_DateCounts[elementId].type[type].hasOwnProperty(storageDate)) {
            type = Data.getDefaultString(type, _configuration.unknownTrendText);
            if (_elements_DateCounts[elementId].type[type][storageDate] > 0) {
              _elements_DateCounts[elementId].type[type][storageDate]--;
            }
            fireCustomTriggerEvent(bindingOptions.events.onRemove, bindingOptions._currentView.element);
            if (triggerRefresh) {
              renderControlContainer(bindingOptions, true);
            }
          }
        }
      }
      return _public;
    },
    clearDate: function(elementId, date, type = null, triggerRefresh = true) {
      if (Is.definedString(elementId) && Is.definedDate(date) && _elements_DateCounts.hasOwnProperty(elementId)) {
        const bindingOptions = _elements_DateCounts[elementId].options;
        if (!bindingOptions._currentView.isInFetchMode) {
          const storageDate = toStorageDate(date);
          if (_elements_DateCounts[elementId].type.hasOwnProperty(type) && _elements_DateCounts[elementId].type[type].hasOwnProperty(storageDate)) {
            type = Data.getDefaultString(type, _configuration.unknownTrendText);
            delete _elements_DateCounts[elementId].type[type][storageDate];
            fireCustomTriggerEvent(bindingOptions.events.onClear, bindingOptions._currentView.element);
            if (triggerRefresh) {
              renderControlContainer(bindingOptions, true);
            }
          }
        }
      }
      return _public;
    },
    resetAll: function(triggerRefresh = true) {
      for (let elementId in _elements_DateCounts) {
        if (_elements_DateCounts.hasOwnProperty(elementId)) {
          _public.reset(elementId, triggerRefresh);
        }
      }
      return _public;
    },
    reset: function(elementId, triggerRefresh = true) {
      if (Is.definedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId)) {
        const bindingOptions = _elements_DateCounts[elementId].options;
        if (!bindingOptions._currentView.isInFetchMode) {
          bindingOptions._currentView.type = _configuration.unknownTrendText;
          createDateStorageForElement(elementId, bindingOptions, false);
          fireCustomTriggerEvent(bindingOptions.events.onReset, bindingOptions._currentView.element);
          if (triggerRefresh) {
            renderControlContainer(bindingOptions, true);
          }
        }
      }
      return _public;
    },
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public Functions:  Export/Import
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    import: function(elementId, files) {
      if (Is.definedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId) && Is.definedArray(files)) {
        importFromFiles(files, _elements_DateCounts[elementId].options);
      }
      return _public;
    },
    export: function(elementId, exportType = null) {
      if (Is.definedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId)) {
        exportAllData(_elements_DateCounts[elementId].options, exportType);
      }
      return _public;
    },
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public Functions:  Manage Instances
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    refresh: function(elementId) {
      if (Is.definedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId)) {
        const bindingOptions = _elements_DateCounts[elementId].options;
        renderControlContainer(bindingOptions, true);
        fireCustomTriggerEvent(bindingOptions.events.onRefresh, bindingOptions._currentView.element);
      }
      return _public;
    },
    refreshAll: function() {
      for (let elementId in _elements_DateCounts) {
        if (_elements_DateCounts.hasOwnProperty(elementId)) {
          const bindingOptions = _elements_DateCounts[elementId].options;
          renderControlContainer(bindingOptions, true);
          fireCustomTriggerEvent(bindingOptions.events.onRefresh, bindingOptions._currentView.element);
        }
      }
      return _public;
    },
    setYear: function(elementId, year) {
      if (Is.definedString(elementId) && Is.definedNumber(year) && _elements_DateCounts.hasOwnProperty(elementId)) {
        const bindingOptions = _elements_DateCounts[elementId].options;
        bindingOptions._currentView.year = year;
        if (!isYearVisible(bindingOptions, bindingOptions._currentView.year)) {
          moveToNextYear(bindingOptions, false);
        } else {
          renderControlContainer(bindingOptions);
        }
        fireCustomTriggerEvent(bindingOptions.events.onSetYear, bindingOptions._currentView.year);
      }
      return _public;
    },
    setYearToHighest: function(elementId) {
      if (Is.definedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId)) {
        const bindingOptions = _elements_DateCounts[elementId].options;
        const data = getCurrentViewData(bindingOptions);
        let maximumYear = 0;
        for (let storageDate in data) {
          if (data.hasOwnProperty(storageDate)) {
            maximumYear = Math.max(maximumYear, parseInt(getStorageDateYear(storageDate)));
          }
        }
        if (maximumYear > 0) {
          bindingOptions._currentView.year = maximumYear;
          if (!isYearVisible(bindingOptions, bindingOptions._currentView.year)) {
            moveToNextYear(bindingOptions, false);
          } else {
            renderControlContainer(bindingOptions);
          }
          fireCustomTriggerEvent(bindingOptions.events.onSetYear, bindingOptions._currentView.year);
        }
      }
      return _public;
    },
    setYearToLowest: function(elementId) {
      if (Is.definedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId)) {
        const bindingOptions = _elements_DateCounts[elementId].options;
        const data = getCurrentViewData(bindingOptions);
        let minimumYear = 9999;
        for (let storageDate in data) {
          if (data.hasOwnProperty(storageDate)) {
            minimumYear = Math.min(minimumYear, parseInt(getStorageDateYear(storageDate)));
          }
        }
        if (minimumYear < 9999) {
          bindingOptions._currentView.year = minimumYear;
          if (!isYearVisible(bindingOptions, bindingOptions._currentView.year)) {
            moveToPreviousYear(bindingOptions, false);
          } else {
            renderControlContainer(bindingOptions);
          }
          fireCustomTriggerEvent(bindingOptions.events.onSetYear, bindingOptions._currentView.year);
        }
      }
      return _public;
    },
    moveToPreviousYear: function(elementId) {
      if (Is.definedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId)) {
        moveToPreviousYear(_elements_DateCounts[elementId].options);
      }
      return _public;
    },
    moveToNextYear: function(elementId) {
      if (Is.definedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId)) {
        moveToNextYear(_elements_DateCounts[elementId].options);
      }
      return _public;
    },
    moveToCurrentYear: function(elementId) {
      if (Is.definedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId)) {
        const bindingOptions = _elements_DateCounts[elementId].options;
        bindingOptions._currentView.year = (/* @__PURE__ */ new Date()).getFullYear();
        if (!isYearVisible(bindingOptions, bindingOptions._currentView.year)) {
          moveToNextYear(bindingOptions, false);
        } else {
          renderControlContainer(bindingOptions);
        }
        fireCustomTriggerEvent(bindingOptions.events.onSetYear, bindingOptions._currentView.year);
      }
      return _public;
    },
    getYear: function(elementId) {
      let result2 = null;
      if (Is.definedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId)) {
        const bindingOptions = _elements_DateCounts[elementId].options;
        result2 = bindingOptions._currentView.year;
      }
      return result2;
    },
    render: function(element, options) {
      if (Is.definedObject(element) && Is.definedObject(options)) {
        renderControl(renderBindingOptions(options, element));
      }
      return _public;
    },
    renderAll: function() {
      render();
      return _public;
    },
    switchView: function(elementId, viewName) {
      if (Is.definedString(elementId) && Is.definedString(viewName) && _elements_DateCounts.hasOwnProperty(elementId)) {
        const bindingOptions = _elements_DateCounts[elementId].options;
        let view = null;
        if (viewName.toLowerCase() === "map" /* map */) {
          view = 1 /* map */;
        } else if (viewName.toLowerCase() === "chart" /* chart */) {
          view = 2 /* chart */;
        } else if (viewName.toLowerCase() === "days" /* days */) {
          view = 3 /* days */;
        } else if (viewName.toLowerCase() === "statistics" /* statistics */) {
          view = 4 /* statistics */;
        }
        if (Is.definedNumber(view)) {
          bindingOptions._currentView.view = view;
          fireCustomTriggerEvent(bindingOptions.events.onViewSwitch, viewName);
          renderControlContainer(bindingOptions, false, true);
        }
      }
      return _public;
    },
    switchType: function(elementId, type) {
      if (Is.definedString(elementId) && Is.definedString(type) && _elements_DateCounts.hasOwnProperty(elementId) && _elements_DateCounts[elementId].type.hasOwnProperty(type)) {
        const bindingOptions = _elements_DateCounts[elementId].options;
        if (bindingOptions._currentView.type !== type) {
          bindingOptions._currentView.type = type;
          fireCustomTriggerEvent(bindingOptions.events.onTypeSwitch, type);
          renderControlContainer(bindingOptions);
        }
      }
      return _public;
    },
    updateOptions: function(elementId, newOptions) {
      if (Is.definedString(elementId) && Is.definedObject(newOptions) && _elements_DateCounts.hasOwnProperty(elementId)) {
        const bindingOptions = _elements_DateCounts[elementId].options;
        const newBindingOptions = buildAttributeOptions(newOptions);
        let optionChanged = false;
        for (let propertyName in newBindingOptions) {
          if (newBindingOptions.hasOwnProperty(propertyName) && bindingOptions.hasOwnProperty(propertyName) && bindingOptions[propertyName] !== newBindingOptions[propertyName]) {
            bindingOptions[propertyName] = newBindingOptions[propertyName];
            optionChanged = true;
          }
        }
        if (optionChanged) {
          renderControlContainer(bindingOptions, true);
          fireCustomTriggerEvent(bindingOptions.events.onRefresh, bindingOptions._currentView.element);
          fireCustomTriggerEvent(bindingOptions.events.onOptionsUpdate, bindingOptions._currentView.element, bindingOptions);
        }
      }
      return _public;
    },
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public Functions:  Destroying
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    destroyAll: function() {
      for (let elementId in _elements_DateCounts) {
        if (_elements_DateCounts.hasOwnProperty(elementId)) {
          destroyElement(_elements_DateCounts[elementId].options);
        }
      }
      _elements_DateCounts = {};
      return _public;
    },
    destroy: function(elementId) {
      if (Is.definedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId)) {
        destroyElement(_elements_DateCounts[elementId].options);
        delete _elements_DateCounts[elementId];
      }
      return _public;
    },
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public Functions:  Configuration
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    setConfiguration: function(newConfiguration, triggerRefresh = true) {
      if (Is.definedObject(newConfiguration)) {
        let configurationHasChanged = false;
        for (let propertyName in newConfiguration) {
          if (newConfiguration.hasOwnProperty(propertyName) && _configuration.hasOwnProperty(propertyName) && _configuration[propertyName] !== newConfiguration[propertyName]) {
            _configuration[propertyName] = newConfiguration[propertyName];
            configurationHasChanged = true;
          }
        }
        if (configurationHasChanged) {
          buildDefaultConfiguration(_configuration);
          if (triggerRefresh) {
            _public.refreshAll();
          }
        }
      }
      return _public;
    },
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public Functions:  Additional Data
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    getIds: function() {
      const result2 = [];
      for (let elementId in _elements_DateCounts) {
        if (_elements_DateCounts.hasOwnProperty(elementId)) {
          result2.push(elementId);
        }
      }
      return result2;
    },
    getVersion: function() {
      return "4.0.0";
    }
  };
  (() => {
    buildDefaultConfiguration();
    document.addEventListener("DOMContentLoaded", function() {
      render();
    });
    window.addEventListener("pagehide", function() {
      cancelAllPullDataTimers();
    });
    if (!Is.defined(window.$heat)) {
      window.$heat = _public;
    }
  })();
})();
/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        heat.ts
 * @version     v4.0.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2024
 */
//# sourceMappingURL=heat.js.map