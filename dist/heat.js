// src/ts/constant.ts
"use strict";
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var HEAT_JS_ATTRIBUTE_NAME = "data-heat-js";
// src/ts/validation.ts
var Validation;
(function(Validation2) {
    var isDefined = function isDefined(value) {
        return value !== null && value !== void 0 && value.toString() !== "" /* empty */ ;
    };
    var isDefinedObject = function isDefinedObject(object) {
        return isDefined(object) && (typeof object === "undefined" ? "undefined" : _type_of(object)) === "object";
    };
    var isDefinedBoolean = function isDefinedBoolean(object) {
        return isDefined(object) && typeof object === "boolean";
    };
    var isDefinedString = function isDefinedString(object) {
        return isDefined(object) && typeof object === "string";
    };
    var isDefinedFunction = function isDefinedFunction(object) {
        return isDefined(object) && typeof object === "function";
    };
    var isDefinedNumber = function isDefinedNumber(object) {
        return isDefined(object) && typeof object === "number";
    };
    var isDefinedArray = function isDefinedArray(object) {
        return isDefinedObject(object) && _instanceof(object, Array);
    };
    var isDefinedDate = function isDefinedDate(object) {
        return isDefinedObject(object) && _instanceof(object, Date);
    };
    var isInvalidOptionArray = function isInvalidOptionArray(array) {
        var minimumLength = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
        return !isDefinedArray(array) || array.length < minimumLength;
    };
    Validation2.isDefined = isDefined;
    Validation2.isDefinedObject = isDefinedObject;
    Validation2.isDefinedBoolean = isDefinedBoolean;
    Validation2.isDefinedString = isDefinedString;
    Validation2.isDefinedFunction = isDefinedFunction;
    Validation2.isDefinedNumber = isDefinedNumber;
    Validation2.isDefinedArray = isDefinedArray;
    Validation2.isDefinedDate = isDefinedDate;
    Validation2.isInvalidOptionArray = isInvalidOptionArray;
})(Validation || (Validation = {}));
// src/ts/data.ts
var Data;
(function(Data2) {
    var getDefaultAnyString = function getDefaultAnyString(value, defaultValue) {
        return typeof value === "string" ? value : defaultValue;
    };
    var getDefaultString = function getDefaultString(value, defaultValue) {
        return Validation.isDefinedString(value) ? value : defaultValue;
    };
    var getDefaultBoolean = function getDefaultBoolean(value, defaultValue) {
        return Validation.isDefinedBoolean(value) ? value : defaultValue;
    };
    var getDefaultNumber = function getDefaultNumber(value, defaultValue) {
        return Validation.isDefinedNumber(value) ? value : defaultValue;
    };
    var getDefaultFunction = function getDefaultFunction(value, defaultValue) {
        return Validation.isDefinedFunction(value) ? value : defaultValue;
    };
    var getDefaultArray = function getDefaultArray(value, defaultValue) {
        return Validation.isDefinedArray(value) ? value : defaultValue;
    };
    var getDefaultObject = function getDefaultObject(value, defaultValue) {
        return Validation.isDefinedObject(value) ? value : defaultValue;
    };
    var getDefaultStringOrArray = function getDefaultStringOrArray(value, defaultValue) {
        var result2 = defaultValue;
        if (Validation.isDefinedString(value)) {
            var values = value.toString().split(" " /* space */ );
            if (values.length === 0) {
                value = defaultValue;
            } else {
                result2 = values;
            }
        } else {
            result2 = getDefaultArray(value, defaultValue);
        }
        return result2;
    };
    Data2.getDefaultAnyString = getDefaultAnyString;
    Data2.getDefaultString = getDefaultString;
    Data2.getDefaultBoolean = getDefaultBoolean;
    Data2.getDefaultNumber = getDefaultNumber;
    Data2.getDefaultFunction = getDefaultFunction;
    Data2.getDefaultArray = getDefaultArray;
    Data2.getDefaultObject = getDefaultObject;
    Data2.getDefaultStringOrArray = getDefaultStringOrArray;
})(Data || (Data = {}));
// src/heat.ts
(function(documentObject, windowObject, mathObject, jsonObject) {
    var renderDisabledBackground = function renderDisabledBackground(bindingOptions) {
        bindingOptions._currentView.disabledBackground = createElement(bindingOptions._currentView.element, "div", "disabled");
    };
    var showDisabledBackground = function showDisabledBackground(bindingOptions) {
        if (Validation.isDefined(bindingOptions._currentView.disabledBackground) && bindingOptions._currentView.disabledBackground.style.display !== "block") {
            bindingOptions._currentView.disabledBackground.style.display = "block";
        }
    };
    var hideDisabledBackground = function hideDisabledBackground(bindingOptions) {
        if (Validation.isDefined(bindingOptions._currentView.disabledBackground) && bindingOptions._currentView.disabledBackground.style.display !== "none") {
            bindingOptions._currentView.disabledBackground.style.display = "none";
        }
    };
    var render = function render() {
        var tagTypes = _configuration.domElementTypes;
        var tagTypesLength = tagTypes.length;
        for(var tagTypeIndex = 0; tagTypeIndex < tagTypesLength; tagTypeIndex++){
            var domElements = documentObject.getElementsByTagName(tagTypes[tagTypeIndex]);
            var elements = [].slice.call(domElements);
            var elementsLength = elements.length;
            for(var elementIndex = 0; elementIndex < elementsLength; elementIndex++){
                if (!renderElement(elements[elementIndex])) {
                    break;
                }
            }
        }
    };
    var renderElement = function renderElement(element) {
        var result2 = true;
        if (Validation.isDefined(element) && element.hasAttribute(HEAT_JS_ATTRIBUTE_NAME)) {
            var bindingOptionsData = element.getAttribute(HEAT_JS_ATTRIBUTE_NAME);
            if (Validation.isDefinedString(bindingOptionsData)) {
                var bindingOptions = getObjectFromString(bindingOptionsData);
                if (bindingOptions.parsed && Validation.isDefinedObject(bindingOptions.result)) {
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
    };
    var renderBindingOptions = function renderBindingOptions(data, element) {
        var bindingOptions = buildAttributeOptions(data);
        var view = !Validation.isDefinedString(bindingOptions.view) ? "" /* empty */  : bindingOptions.view.toLowerCase();
        var currentView = {};
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
        currentView.isInFetchMode = Validation.isDefinedFunction(bindingOptions.events.onDataFetch);
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
        if (view === "map" /* map */ ) {
            currentView.view = 1 /* map */ ;
        } else if (view === "chart" /* chart */ ) {
            currentView.view = 2 /* chart */ ;
        } else if (view === "days" /* days */ ) {
            currentView.view = 3 /* days */ ;
        } else if (view === "statistics" /* statistics */ ) {
            currentView.view = 4 /* statistics */ ;
        } else {
            currentView.view = 1 /* map */ ;
        }
        bindingOptions._currentView = currentView;
        return bindingOptions;
    };
    var renderControl = function renderControl(bindingOptions) {
        fireCustomTriggerEvent(bindingOptions.events.onBeforeRender, bindingOptions._currentView.element);
        if (!Validation.isDefinedString(bindingOptions._currentView.element.id)) {
            bindingOptions._currentView.element.id = newGuid();
        }
        if (bindingOptions._currentView.element.className.trim() === "" /* empty */ ) {
            bindingOptions._currentView.element.className = "heat-js";
        } else {
            addClass(bindingOptions._currentView.element, "heat-js");
        }
        bindingOptions._currentView.element.removeAttribute(HEAT_JS_ATTRIBUTE_NAME);
        createDateStorageForElement(bindingOptions._currentView.element.id, bindingOptions);
        renderControlContainer(bindingOptions);
        fireCustomTriggerEvent(bindingOptions.events.onRenderComplete, bindingOptions._currentView.element);
    };
    var renderControlContainer = function renderControlContainer(bindingOptions) {
        var isForDataRefresh = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false, isForViewSwitch = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
        if (isForDataRefresh) {
            storeDataInLocalStorage(bindingOptions);
        }
        if (Validation.isDefined(bindingOptions._currentView.mapContents)) {
            bindingOptions._currentView.mapContentsScrollLeft = bindingOptions._currentView.mapContents.scrollLeft;
        }
        if (bindingOptions.views.chart.enabled && Validation.isDefined(bindingOptions._currentView.chartContents)) {
            bindingOptions._currentView.chartContentsScrollLeft = bindingOptions._currentView.chartContents.scrollLeft;
        }
        if (bindingOptions.views.days.enabled && Validation.isDefined(bindingOptions._currentView.daysContents)) {
            bindingOptions._currentView.daysContentsScrollLeft = bindingOptions._currentView.daysContents.scrollLeft;
        }
        if (bindingOptions.views.statistics.enabled && Validation.isDefined(bindingOptions._currentView.statisticsContents)) {
            bindingOptions._currentView.statisticsContentsScrollLeft = bindingOptions._currentView.statisticsContents.scrollLeft;
        }
        bindingOptions._currentView.element.innerHTML = "" /* empty */ ;
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
        if (bindingOptions._currentView.view === 1 /* map */ ) {
            bindingOptions._currentView.mapContents.style.display = "block";
        } else if (bindingOptions.views.chart.enabled && bindingOptions._currentView.view === 2 /* chart */ ) {
            bindingOptions._currentView.chartContents.style.display = "block";
        } else if (bindingOptions.views.days.enabled && bindingOptions._currentView.view === 3 /* days */ ) {
            bindingOptions._currentView.daysContents.style.display = "block";
        } else if (bindingOptions.views.statistics.enabled && bindingOptions._currentView.view === 4 /* statistics */ ) {
            bindingOptions._currentView.statisticsContents.style.display = "block";
        } else {
            bindingOptions._currentView.view = 1 /* map */ ;
            bindingOptions._currentView.mapContents.style.display = "block";
        }
    };
    var renderConfigurationDialog = function renderConfigurationDialog(bindingOptions) {
        bindingOptions._currentView.configurationDialog = createElement(bindingOptions._currentView.disabledBackground, "div", "dialog configuration");
        var titleBar = createElement(bindingOptions._currentView.configurationDialog, "div", "dialog-title-bar");
        var contents = createElement(bindingOptions._currentView.configurationDialog, "div", "dialog-contents");
        var closeButton = createElement(titleBar, "div", "dialog-close");
        var daysContainer = createElement(contents, "div", "side-container panel");
        var monthsContainer = createElement(contents, "div", "side-container panel");
        createElementWithHTML(titleBar, "span", "dialog-title-bar-text", _configuration.configurationTitleText);
        createElementWithHTML(daysContainer, "div", "side-container-title-text", _configuration.visibleDaysText + ":" /* colon */ );
        createElementWithHTML(monthsContainer, "div", "side-container-title-text", _configuration.visibleMonthsText + ":" /* colon */ );
        var months1Container = createElement(monthsContainer, "div", "side-container");
        var months2Container = createElement(monthsContainer, "div", "side-container");
        closeButton.onclick = function() {
            hideConfigurationDialog(bindingOptions);
        };
        for(var dayIndex = 0; dayIndex < 7; dayIndex++){
            bindingOptions._currentView.dayCheckBoxes[dayIndex] = buildCheckBox(daysContainer, _configuration.dayNames[dayIndex]).input;
        }
        for(var monthIndex1 = 0; monthIndex1 < 7; monthIndex1++){
            bindingOptions._currentView.monthCheckBoxes[monthIndex1] = buildCheckBox(months1Container, _configuration.monthNames[monthIndex1]).input;
        }
        for(var monthIndex2 = 7; monthIndex2 < 12; monthIndex2++){
            bindingOptions._currentView.monthCheckBoxes[monthIndex2] = buildCheckBox(months2Container, _configuration.monthNames[monthIndex2]).input;
        }
        addToolTip(closeButton, bindingOptions, _configuration.closeToolTipText);
    };
    var showConfigurationDialog = function showConfigurationDialog(bindingOptions) {
        showDisabledBackground(bindingOptions);
        if (Validation.isDefined(bindingOptions._currentView.configurationDialog) && bindingOptions._currentView.configurationDialog.style.display !== "block") {
            bindingOptions._currentView.configurationDialog.style.display = "block";
        }
        var daysToShow = [];
        var monthsToShow = [];
        if (bindingOptions._currentView.view === 1 /* map */ ) {
            daysToShow = bindingOptions.views.map.daysToShow;
            monthsToShow = bindingOptions.views.map.monthsToShow;
        } else if (bindingOptions.views.chart.enabled && bindingOptions._currentView.view === 2 /* chart */ ) {
            daysToShow = bindingOptions.views.chart.daysToShow;
            monthsToShow = bindingOptions.views.chart.monthsToShow;
        } else if (bindingOptions.views.days.enabled && bindingOptions._currentView.view === 3 /* days */ ) {
            daysToShow = bindingOptions.views.days.daysToShow;
            monthsToShow = bindingOptions.views.days.monthsToShow;
        } else if (bindingOptions.views.statistics.enabled && bindingOptions._currentView.view === 4 /* statistics */ ) {
            daysToShow = bindingOptions.views.statistics.daysToShow;
            monthsToShow = bindingOptions.views.statistics.monthsToShow;
        } else {
            daysToShow = bindingOptions.views.map.daysToShow;
            monthsToShow = bindingOptions.views.map.monthsToShow;
        }
        for(var dayIndex = 0; dayIndex < 7; dayIndex++){
            bindingOptions._currentView.dayCheckBoxes[dayIndex].checked = isDayVisible(daysToShow, dayIndex + 1);
        }
        for(var monthIndex = 0; monthIndex < 12; monthIndex++){
            bindingOptions._currentView.monthCheckBoxes[monthIndex].checked = isMonthVisible(monthsToShow, monthIndex);
        }
        hideToolTip(bindingOptions);
    };
    var hideConfigurationDialog = function hideConfigurationDialog(bindingOptions) {
        hideDisabledBackground(bindingOptions);
        if (Validation.isDefined(bindingOptions._currentView.configurationDialog) && bindingOptions._currentView.configurationDialog.style.display !== "none") {
            bindingOptions._currentView.configurationDialog.style.display = "none";
        }
        var daysChecked = [];
        var monthsChecked = [];
        var render2 = false;
        for(var dayIndex = 0; dayIndex < 7; dayIndex++){
            if (bindingOptions._currentView.dayCheckBoxes[dayIndex].checked) {
                daysChecked.push(dayIndex + 1);
            }
        }
        for(var monthIndex = 0; monthIndex < 12; monthIndex++){
            if (bindingOptions._currentView.monthCheckBoxes[monthIndex].checked) {
                monthsChecked.push(monthIndex + 1);
            }
        }
        if (daysChecked.length >= 1) {
            if (bindingOptions._currentView.view === 1 /* map */ ) {
                bindingOptions.views.map.daysToShow = daysChecked;
            } else if (bindingOptions.views.chart.enabled && bindingOptions._currentView.view === 2 /* chart */ ) {
                bindingOptions.views.chart.daysToShow = daysChecked;
            } else if (bindingOptions.views.days.enabled && bindingOptions._currentView.view === 3 /* days */ ) {
                bindingOptions.views.days.daysToShow = daysChecked;
            } else if (bindingOptions.views.statistics.enabled && bindingOptions._currentView.view === 4 /* statistics */ ) {
                bindingOptions.views.statistics.daysToShow = daysChecked;
            } else {
                bindingOptions.views.map.daysToShow = daysChecked;
            }
            render2 = true;
        }
        if (monthsChecked.length >= 1) {
            if (bindingOptions._currentView.view === 1 /* map */ ) {
                bindingOptions.views.map.monthsToShow = monthsChecked;
            } else if (bindingOptions.views.chart.enabled && bindingOptions._currentView.view === 2 /* chart */ ) {
                bindingOptions.views.chart.monthsToShow = monthsChecked;
            } else if (bindingOptions.views.days.enabled && bindingOptions._currentView.view === 3 /* days */ ) {
                bindingOptions.views.days.monthsToShow = monthsChecked;
            } else if (bindingOptions.views.statistics.enabled && bindingOptions._currentView.view === 4 /* statistics */ ) {
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
    };
    var renderControlToolTip = function renderControlToolTip(bindingOptions) {
        if (!Validation.isDefined(bindingOptions._currentView.tooltip)) {
            bindingOptions._currentView.tooltip = createElement(documentObject.body, "div", "heat-js-tooltip");
            bindingOptions._currentView.tooltip.style.display = "none";
            assignToolTipEvents(bindingOptions);
        }
    };
    var assignToolTipEvents = function assignToolTipEvents(bindingOptions) {
        var add = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        var addEventListener_Window = add ? windowObject.addEventListener : windowObject.removeEventListener;
        var addEventListener_Document = add ? documentObject.addEventListener : documentObject.removeEventListener;
        addEventListener_Window("mousemove", function() {
            hideToolTip(bindingOptions);
        });
        addEventListener_Document("scroll", function() {
            hideToolTip(bindingOptions);
        });
    };
    var addToolTip = function addToolTip(element, bindingOptions, text) {
        if (element !== null) {
            element.onmousemove = function(e) {
                showToolTip(e, bindingOptions, text);
            };
        }
    };
    var showToolTip = function showToolTip(e, bindingOptions, text) {
        cancelBubble(e);
        hideToolTip(bindingOptions);
        bindingOptions._currentView.tooltipTimer = setTimeout(function() {
            bindingOptions._currentView.tooltip.innerHTML = text;
            bindingOptions._currentView.tooltip.style.display = "block";
            showElementAtMousePosition(e, bindingOptions._currentView.tooltip);
        }, bindingOptions.tooltip.delay);
    };
    var hideToolTip = function hideToolTip(bindingOptions) {
        if (Validation.isDefined(bindingOptions._currentView.tooltip)) {
            if (Validation.isDefined(bindingOptions._currentView.tooltipTimer)) {
                clearTimeout(bindingOptions._currentView.tooltipTimer);
                bindingOptions._currentView.tooltipTimer = null;
            }
            if (bindingOptions._currentView.tooltip.style.display !== "none") {
                bindingOptions._currentView.tooltip.style.display = "none";
            }
        }
    };
    var renderControlTitleBar = function renderControlTitleBar(bindingOptions) {
        if (bindingOptions.title.showText || bindingOptions.title.showYearSelector || bindingOptions.title.showRefreshButton || bindingOptions.title.showExportButton || bindingOptions.title.showImportButton) {
            var titleBar = createElement(bindingOptions._currentView.element, "div", "title-bar");
            var title = createElement(titleBar, "div", "title");
            if (bindingOptions.views.chart.enabled || bindingOptions.views.days.enabled || bindingOptions.views.statistics.enabled) {
                if (bindingOptions.title.showTitleDropDownButton) {
                    createElement(title, "div", "down-arrow");
                }
            } else {
                addClass(title, "no-click");
            }
            if (bindingOptions.title.showText) {
                title.innerHTML += bindingOptions.title.text;
            }
            if (bindingOptions.views.chart.enabled || bindingOptions.views.days.enabled || bindingOptions.views.statistics.enabled) {
                renderTitleDropDownMenu(bindingOptions, title);
            }
            if (bindingOptions.title.showImportButton && !bindingOptions._currentView.isInFetchMode) {
                var importData = createElementWithHTML(titleBar, "button", "import", _configuration.importButtonText);
                importData.onclick = function() {
                    importFromFilesSelected(bindingOptions);
                };
            }
            if (bindingOptions.title.showExportButton) {
                var exportData = createElementWithHTML(titleBar, "button", "export", _configuration.exportButtonText);
                exportData.onclick = function() {
                    exportAllData(bindingOptions);
                };
            }
            if (bindingOptions.title.showRefreshButton) {
                var refresh = createElementWithHTML(titleBar, "button", "refresh", _configuration.refreshButtonText);
                refresh.onclick = function() {
                    renderControlContainer(bindingOptions);
                    fireCustomTriggerEvent(bindingOptions.events.onRefresh, bindingOptions._currentView.element);
                };
            }
            if (bindingOptions.title.showYearSelector) {
                var back = createElementWithHTML(titleBar, "button", "back", _configuration.backButtonText);
                back.onclick = function() {
                    moveToPreviousYear(bindingOptions);
                };
                if (isFirstVisibleYear(bindingOptions, bindingOptions._currentView.year)) {
                    back.disabled = true;
                }
                bindingOptions._currentView.yearText = createElementWithHTML(titleBar, "div", "year-text", bindingOptions._currentView.year.toString());
                if (bindingOptions.title.showYearSelectionDropDown) {
                    renderYearDropDownMenu(bindingOptions);
                } else {
                    addClass(bindingOptions._currentView.yearText, "no-click");
                }
                if (bindingOptions.title.showConfigurationButton) {
                    var configureButton = createElement(titleBar, "div", "configure");
                    addToolTip(configureButton, bindingOptions, _configuration.configurationToolTipText);
                    configureButton.onclick = function() {
                        showConfigurationDialog(bindingOptions);
                    };
                }
                var next = createElementWithHTML(titleBar, "button", "next", _configuration.nextButtonText);
                next.onclick = function() {
                    moveToNextYear(bindingOptions);
                };
                if (isLastVisibleYear(bindingOptions, bindingOptions._currentView.year)) {
                    next.disabled = true;
                }
            }
        }
    };
    var renderTitleDropDownMenu = function renderTitleDropDownMenu(bindingOptions, title) {
        var titlesMenuContainer = createElement(title, "div", "titles-menu-container");
        var titlesMenu = createElement(titlesMenuContainer, "div", "titles-menu");
        if (bindingOptions.title.showTitleDropDownHeaders) {
            createElementWithHTML(titlesMenu, "div", "title-menu-header", _configuration.dataText + ":" /* colon */ );
        }
        var menuItemMap = createElementWithHTML(titlesMenu, "div", "title-menu-item", _configuration.mapText);
        renderTitleDropDownMenuItemClickEvent(bindingOptions, menuItemMap, 1 /* map */ , "map" /* map */ );
        if (bindingOptions.views.chart.enabled) {
            var menuItemChart = createElementWithHTML(titlesMenu, "div", "title-menu-item", _configuration.chartText);
            renderTitleDropDownMenuItemClickEvent(bindingOptions, menuItemChart, 2 /* chart */ , "chart" /* chart */ );
        }
        if (bindingOptions.views.days.enabled) {
            if (bindingOptions.title.showTitleDropDownHeaders) {
                createElementWithHTML(titlesMenu, "div", "title-menu-header", _configuration.yearText + ":" /* colon */ );
            }
            var menuItemDays = createElementWithHTML(titlesMenu, "div", "title-menu-item", _configuration.daysText);
            renderTitleDropDownMenuItemClickEvent(bindingOptions, menuItemDays, 3 /* days */ , "days" /* days */ );
        }
        if (bindingOptions.views.statistics.enabled) {
            if (bindingOptions.title.showTitleDropDownHeaders) {
                createElementWithHTML(titlesMenu, "div", "title-menu-header", _configuration.statisticsText + ":" /* colon */ );
            }
            var menuItemStatistics = createElementWithHTML(titlesMenu, "div", "title-menu-item", _configuration.colorRangesText);
            renderTitleDropDownMenuItemClickEvent(bindingOptions, menuItemStatistics, 4 /* statistics */ , "statistics" /* statistics */ );
        }
    };
    var renderTitleDropDownMenuItemClickEvent = function renderTitleDropDownMenuItemClickEvent(bindingOptions, option, view, viewName) {
        if (bindingOptions._currentView.view === view) {
            addClass(option, "title-menu-item-active");
        } else {
            option.onclick = function() {
                bindingOptions._currentView.view = view;
                fireCustomTriggerEvent(bindingOptions.events.onViewSwitch, viewName);
                renderControlContainer(bindingOptions, false, true);
            };
        }
    };
    var renderYearDropDownMenu = function renderYearDropDownMenu(bindingOptions) {
        createElement(bindingOptions._currentView.yearText, "div", "down-arrow");
        var yearsMenuContainer = createElement(bindingOptions._currentView.yearText, "div", "years-menu-container");
        var yearsMenu = createElement(yearsMenuContainer, "div", "years-menu");
        var thisYear = /* @__PURE__ */ new Date().getFullYear();
        var activeYearMenuItem = null;
        yearsMenuContainer.style.display = "block";
        yearsMenuContainer.style.visibility = "hidden";
        for(var currentYear = thisYear - bindingOptions.title.extraSelectionYears; currentYear < thisYear + bindingOptions.title.extraSelectionYears; currentYear++){
            if (isYearVisible(bindingOptions, currentYear)) {
                var yearMenuItem = renderYearDropDownMenuItem(bindingOptions, yearsMenu, currentYear, thisYear);
                if (!Validation.isDefined(activeYearMenuItem)) {
                    activeYearMenuItem = yearMenuItem;
                }
            }
        }
        if (Validation.isDefined(activeYearMenuItem)) {
            yearsMenu.scrollTop = activeYearMenuItem.offsetTop - yearsMenu.offsetHeight / 2;
        }
        yearsMenuContainer.style.display = "none";
        yearsMenuContainer.style.visibility = "visible";
    };
    var renderYearDropDownMenuItem = function renderYearDropDownMenuItem(bindingOptions, years, currentYear, actualYear) {
        var result2 = null;
        var year = createElementWithHTML(years, "div", "year-menu-item", currentYear.toString());
        if (bindingOptions._currentView.year !== currentYear) {
            year.onclick = function() {
                bindingOptions._currentView.year = currentYear;
                renderControlContainer(bindingOptions);
                fireCustomTriggerEvent(bindingOptions.events.onSetYear, bindingOptions._currentView.year);
            };
            if (currentYear === actualYear) {
                addClass(year, "year-menu-item-current");
            }
        } else {
            addClass(year, "year-menu-item-active");
            result2 = year;
        }
        return result2;
    };
    var renderControlMap = function renderControlMap(bindingOptions, isForViewSwitch) {
        bindingOptions._currentView.mapContents = createElement(bindingOptions._currentView.element, "div", "map-contents");
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
            var noDataMessage = createElementWithHTML(bindingOptions._currentView.mapContents, "div", "no-data-message", _configuration.noMapDataMessage);
            if (isForViewSwitch) {
                addClass(noDataMessage, "view-switch");
            }
        } else {
            bindingOptions._currentView.mapContents.style.minHeight = "unset";
            makeAreaDroppable(bindingOptions._currentView.mapContents, bindingOptions);
            var map = createElement(bindingOptions._currentView.mapContents, "div", "map");
            var currentYear = bindingOptions._currentView.year;
            var monthAdded = false;
            if (isForViewSwitch) {
                addClass(map, "view-switch");
            }
            if (bindingOptions.views.map.showDayNames) {
                var days = createElement(map, "div", "days");
                var showMinimalDays = bindingOptions.views.map.showMinimalDayNames && bindingOptions.views.map.daysToShow.length === 7;
                if (!bindingOptions.views.map.showMonthNames || bindingOptions.views.map.placeMonthNamesOnTheBottom) {
                    days.className = "days-months-bottom";
                }
                for(var dayNameIndex = 0; dayNameIndex < 7; dayNameIndex++){
                    if (isDayVisible(bindingOptions.views.map.daysToShow, dayNameIndex + 1)) {
                        var dayText = !showMinimalDays || dayNameIndex % 3 === 0 ? _configuration.dayNames[dayNameIndex] : " " /* space */ ;
                        createElementWithHTML(days, "div", "day-name", dayText);
                    }
                }
                if (bindingOptions.views.map.showDaysInReverseOrder) {
                    reverseElementsOrder(days);
                }
            }
            var months = createElement(map, "div", "months");
            var colorRanges = getSortedColorRanges(bindingOptions);
            for(var monthIndex = 0; monthIndex < 12; monthIndex++){
                if (isMonthVisible(bindingOptions.views.map.monthsToShow, monthIndex)) {
                    var month = createElement(months, "div", "month");
                    var dayColumns = createElement(month, "div", "day-columns");
                    var totalDaysInMonth = getTotalDaysInMonth(currentYear, monthIndex);
                    var currentDayColumn = createElement(dayColumns, "div", "day-column");
                    var startFillingDays = false;
                    var firstDayInMonth = new Date(currentYear, monthIndex, 1);
                    var firstDayNumberInMonth = getWeekdayNumber(firstDayInMonth);
                    var actualDay = 1;
                    totalDaysInMonth += firstDayNumberInMonth;
                    for(var dayIndex = 0; dayIndex < totalDaysInMonth; dayIndex++){
                        if (dayIndex >= firstDayNumberInMonth) {
                            startFillingDays = true;
                        } else {
                            if (isDayVisible(bindingOptions.views.map.daysToShow, actualDay)) {
                                createElement(currentDayColumn, "div", "day-disabled");
                            }
                        }
                        if (startFillingDays) {
                            var day = null;
                            if (isDayVisible(bindingOptions.views.map.daysToShow, actualDay)) {
                                day = renderControlMapMonthDay(bindingOptions, currentDayColumn, dayIndex - firstDayNumberInMonth, monthIndex, currentYear, colorRanges);
                            }
                            if ((dayIndex + 1) % 7 === 0) {
                                if (bindingOptions.views.map.showDaysInReverseOrder) {
                                    reverseElementsOrder(currentDayColumn);
                                }
                                currentDayColumn = createElement(dayColumns, "div", "day-column");
                                actualDay = 0;
                                if (!Validation.isDefined(_elements_Day_Width) && Validation.isDefined(day)) {
                                    var marginLeft = getStyleValueByName(day, "margin-left", true);
                                    var marginRight = getStyleValueByName(day, "margin-right", true);
                                    _elements_Day_Width = day.offsetWidth + marginLeft + marginRight;
                                }
                            }
                        }
                        actualDay++;
                    }
                    if (bindingOptions.views.map.showMonthNames) {
                        var monthName = null;
                        var monthWidth = month.offsetWidth;
                        if (!bindingOptions.views.map.placeMonthNamesOnTheBottom) {
                            monthName = createElementWithHTML(month, "div", "month-name", _configuration.monthNames[monthIndex], dayColumns);
                        } else {
                            monthName = createElementWithHTML(month, "div", "month-name-bottom", _configuration.monthNames[monthIndex]);
                        }
                        if (Validation.isDefined(monthName)) {
                            if (bindingOptions.views.map.showMonthDayGaps) {
                                monthName.style.width = monthWidth + "px";
                            } else {
                                monthName.style.width = monthWidth - _elements_Day_Width + "px";
                            }
                        }
                    }
                    if (monthAdded && Validation.isDefined(_elements_Day_Width)) {
                        if (firstDayNumberInMonth > 0 && !bindingOptions.views.map.showMonthDayGaps) {
                            month.style.marginLeft = -_elements_Day_Width + "px";
                        } else if (firstDayNumberInMonth === 0 && bindingOptions.views.map.showMonthDayGaps) {
                            month.style.marginLeft = _elements_Day_Width + "px";
                        }
                    }
                    if (bindingOptions.views.map.showMonthsInReverseOrder) {
                        reverseElementsOrder(dayColumns);
                    }
                    monthAdded = true;
                }
            }
            if (bindingOptions.views.map.showMonthsInReverseOrder) {
                reverseElementsOrder(months);
            }
            if (bindingOptions.views.map.keepScrollPositions) {
                bindingOptions._currentView.mapContents.scrollLeft = bindingOptions._currentView.mapContentsScrollLeft;
            }
        }
    };
    var renderControlMapMonthDay = function renderControlMapMonthDay(bindingOptions, currentDayColumn, dayNumber, month, year, colorRanges) {
        var actualDay = dayNumber + 1;
        var day = createElement(currentDayColumn, "div", "day");
        var date = new Date(year, month, actualDay);
        var dateCount = _elements_DateCounts[bindingOptions._currentView.element.id].type[bindingOptions._currentView.type][toStorageDate(date)];
        dateCount = Data.getDefaultNumber(dateCount, 0);
        renderDayToolTip(bindingOptions, day, date, dateCount);
        if (bindingOptions.views.map.showDayNumbers && dateCount > 0) {
            day.innerHTML = dateCount.toString();
        }
        if (Validation.isDefinedFunction(bindingOptions.events.onDayClick)) {
            day.onclick = function() {
                fireCustomTriggerEvent(bindingOptions.events.onDayClick, date, dateCount);
            };
        } else {
            addClass(day, "no-hover");
        }
        var useColorRange = getColorRange(bindingOptions, colorRanges, dateCount, date);
        if (Validation.isDefined(useColorRange) && isColorRangeVisible(bindingOptions, useColorRange.id)) {
            if (Validation.isDefinedString(useColorRange.mapCssClassName)) {
                addClass(day, useColorRange.mapCssClassName);
            } else {
                addClass(day, useColorRange.cssClassName);
            }
        }
        return day;
    };
    var isDataAvailableForYear = function isDataAvailableForYear(bindingOptions) {
        var result2 = false;
        var data = getCurrentViewData(bindingOptions);
        var checkDate = bindingOptions._currentView.year.toString();
        for(var storageDate in data){
            if (data.hasOwnProperty(storageDate)) {
                if (getStorageDateYear(storageDate) === checkDate) {
                    result2 = true;
                    break;
                }
            }
        }
        return result2;
    };
    var renderControlChartContents = function renderControlChartContents(bindingOptions) {
        bindingOptions._currentView.chartContents = createElement(bindingOptions._currentView.element, "div", "chart-contents");
        makeAreaDroppable(bindingOptions._currentView.chartContents, bindingOptions);
    };
    var renderControlChart = function renderControlChart(bindingOptions, isForViewSwitch) {
        var chart = createElement(bindingOptions._currentView.chartContents, "div", "chart");
        var labels = createElement(chart, "div", "y-labels");
        var dayLines = createElement(chart, "div", "day-lines");
        var colorRanges = getSortedColorRanges(bindingOptions);
        var largestValueForCurrentYear = getLargestValueForChartYear(bindingOptions);
        var currentYear = bindingOptions._currentView.year;
        var labelsWidth = 0;
        if (isForViewSwitch) {
            addClass(chart, "view-switch");
        }
        if (largestValueForCurrentYear > 0 && bindingOptions.views.chart.showChartYLabels) {
            var topLabel = createElementWithHTML(labels, "div", "label-0", largestValueForCurrentYear.toString());
            createElementWithHTML(labels, "div", "label-25", (mathObject.floor(largestValueForCurrentYear / 4) * 3).toString());
            createElementWithHTML(labels, "div", "label-50", mathObject.floor(largestValueForCurrentYear / 2).toString());
            createElementWithHTML(labels, "div", "label-75", mathObject.floor(largestValueForCurrentYear / 4).toString());
            createElementWithHTML(labels, "div", "label-100", "0" /* zero */ );
            labels.style.width = topLabel.offsetWidth + "px";
            labelsWidth = labels.offsetWidth + getStyleValueByName(labels, "margin-right", true);
        } else {
            labels.parentNode.removeChild(labels);
            labels = null;
        }
        if (largestValueForCurrentYear === 0) {
            bindingOptions._currentView.chartContents.style.minHeight = bindingOptions._currentView.mapContents.offsetHeight + "px";
            chart.parentNode.removeChild(chart);
            var noDataMessage = createElementWithHTML(bindingOptions._currentView.chartContents, "div", "no-data-message", _configuration.noChartDataMessage);
            if (isForViewSwitch) {
                addClass(noDataMessage, "view-switch");
            }
        } else {
            var pixelsPerNumbers = bindingOptions._currentView.mapContents.offsetHeight / largestValueForCurrentYear;
            var totalMonths = 0;
            var totalDays = 0;
            for(var monthIndex1 = 0; monthIndex1 < 12; monthIndex1++){
                if (isMonthVisible(bindingOptions.views.chart.monthsToShow, monthIndex1)) {
                    var totalDaysInMonth = getTotalDaysInMonth(currentYear, monthIndex1);
                    var actualDay = 1;
                    totalMonths++;
                    for(var dayIndex = 0; dayIndex < totalDaysInMonth; dayIndex++){
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
                reverseElementsOrder(dayLines);
            }
            if (bindingOptions.views.chart.showMonthNames) {
                var chartMonths = createElement(bindingOptions._currentView.chartContents, "div", "chart-months");
                var linesWidth = dayLines.offsetWidth / totalMonths;
                var monthTimesValue = 0;
                var addMonthName = function addMonthName(addMonthNameIndex) {
                    if (isMonthVisible(bindingOptions.views.chart.monthsToShow, addMonthNameIndex)) {
                        var monthName = createElementWithHTML(chartMonths, "div", "month-name", _configuration.monthNames[addMonthNameIndex]);
                        monthName.style.left = labelsWidth + linesWidth * monthTimesValue + "px";
                        monthTimesValue++;
                    }
                };
                if (bindingOptions.views.chart.showInReverseOrder) {
                    for(var monthIndex2 = 12; monthIndex2--;){
                        addMonthName(monthIndex2);
                    }
                } else {
                    for(var monthIndex3 = 0; monthIndex3 < 12; monthIndex3++){
                        addMonthName(monthIndex3);
                    }
                }
                chartMonths.style.width = dayLines.offsetWidth + "px";
                var monthNameSpace = createElement(chartMonths, "div", "month-name-space");
                monthNameSpace.style.height = chartMonths.offsetHeight + "px";
                monthNameSpace.style.width = labelsWidth + "px";
            }
            if (bindingOptions.views.chart.keepScrollPositions) {
                bindingOptions._currentView.chartContents.scrollLeft = bindingOptions._currentView.chartContentsScrollLeft;
            }
        }
    };
    var renderControlChartDay = function renderControlChartDay(dayLines, bindingOptions, day, month, year, colorRanges, pixelsPerNumbers) {
        var date = new Date(year, month, day);
        var dayLine = createElement(dayLines, "div", "day-line");
        var dateCount = getCurrentViewData(bindingOptions)[toStorageDate(date)];
        dateCount = Data.getDefaultNumber(dateCount, 0);
        renderDayToolTip(bindingOptions, dayLine, date, dateCount);
        if (bindingOptions.views.chart.showLineNumbers && dateCount > 0) {
            addClass(dayLine, "day-line-number");
            dayLine.innerHTML = dateCount.toString();
        }
        var dayLineHeight = dateCount * pixelsPerNumbers;
        dayLine.style.height = dayLineHeight + "px";
        if (dayLineHeight <= 0) {
            dayLine.style.visibility = "hidden";
        }
        if (Validation.isDefinedFunction(bindingOptions.events.onDayClick)) {
            dayLine.onclick = function() {
                fireCustomTriggerEvent(bindingOptions.events.onDayClick, date, dateCount);
            };
        } else {
            addClass(dayLine, "no-hover");
        }
        var useColorRange = getColorRange(bindingOptions, colorRanges, dateCount, date);
        if (Validation.isDefined(useColorRange) && isColorRangeVisible(bindingOptions, useColorRange.id)) {
            if (Validation.isDefinedString(useColorRange.chartCssClassName)) {
                addClass(dayLine, useColorRange.chartCssClassName);
            } else {
                addClass(dayLine, useColorRange.cssClassName);
            }
        }
    };
    var getLargestValueForChartYear = function getLargestValueForChartYear(bindingOptions) {
        var result2 = 0;
        var data = getCurrentViewData(bindingOptions);
        for(var monthIndex = 0; monthIndex < 12; monthIndex++){
            var totalDaysInMonth = getTotalDaysInMonth(bindingOptions._currentView.year, monthIndex);
            for(var dayIndex = 0; dayIndex < totalDaysInMonth; dayIndex++){
                var storageDate = toStorageDate(new Date(bindingOptions._currentView.year, monthIndex, dayIndex + 1));
                if (data.hasOwnProperty(storageDate)) {
                    if (isMonthVisible(bindingOptions.views.chart.monthsToShow, monthIndex) && isDayVisible(bindingOptions.views.chart.daysToShow, dayIndex + 1)) {
                        result2 = mathObject.max(result2, parseInt(data[storageDate]));
                    }
                }
            }
        }
        return result2;
    };
    var renderControlDaysContents = function renderControlDaysContents(bindingOptions) {
        bindingOptions._currentView.daysContents = createElement(bindingOptions._currentView.element, "div", "days-contents");
        makeAreaDroppable(bindingOptions._currentView.daysContents, bindingOptions);
    };
    var renderControlDays = function renderControlDays(bindingOptions, isForViewSwitch) {
        var days = createElement(bindingOptions._currentView.daysContents, "div", "days");
        var dayNames = createElement(bindingOptions._currentView.daysContents, "div", "day-names");
        var labels = createElement(days, "div", "y-labels");
        var dayLines = createElement(days, "div", "day-lines");
        var dayValuesForCurrentYear = getLargestValuesForEachDay(bindingOptions);
        if (isForViewSwitch) {
            addClass(days, "view-switch");
        }
        if (dayValuesForCurrentYear.largestValue > 0 && bindingOptions.views.days.showChartYLabels) {
            var topLabel = createElementWithHTML(labels, "div", "label-0", dayValuesForCurrentYear.largestValue.toString());
            createElementWithHTML(labels, "div", "label-25", (mathObject.floor(dayValuesForCurrentYear.largestValue / 4) * 3).toString());
            createElementWithHTML(labels, "div", "label-50", mathObject.floor(dayValuesForCurrentYear.largestValue / 2).toString());
            createElementWithHTML(labels, "div", "label-75", mathObject.floor(dayValuesForCurrentYear.largestValue / 4).toString());
            createElementWithHTML(labels, "div", "label-100", "0" /* zero */ );
            labels.style.width = topLabel.offsetWidth + "px";
            dayNames.style.paddingLeft = labels.offsetWidth + getStyleValueByName(labels, "margin-right", true) + "px";
        } else {
            labels.parentNode.removeChild(labels);
            labels = null;
        }
        if (dayValuesForCurrentYear.largestValue === 0) {
            bindingOptions._currentView.daysContents.style.minHeight = bindingOptions._currentView.mapContents.offsetHeight + "px";
            days.parentNode.removeChild(days);
            dayNames.parentNode.removeChild(dayNames);
            var noDataMessage = createElementWithHTML(bindingOptions._currentView.daysContents, "div", "no-days-message", _configuration.noDaysDataMessage);
            if (isForViewSwitch) {
                addClass(noDataMessage, "view-switch");
            }
        } else {
            var pixelsPerNumbers = bindingOptions._currentView.mapContents.offsetHeight / dayValuesForCurrentYear.largestValue;
            for(var day in dayValuesForCurrentYear.days){
                if (dayValuesForCurrentYear.days.hasOwnProperty(day) && isDayVisible(bindingOptions.views.days.daysToShow, parseInt(day))) {
                    renderControlDaysDayLine(dayLines, parseInt(day), dayValuesForCurrentYear.days[day], bindingOptions, pixelsPerNumbers);
                    if (bindingOptions.views.days.showDayNames) {
                        createElementWithHTML(dayNames, "div", "day-name", _configuration.dayNames[parseInt(day) - 1]);
                    }
                }
            }
            if (bindingOptions.views.days.showInReverseOrder) {
                reverseElementsOrder(dayLines);
                reverseElementsOrder(dayNames);
            }
            if (bindingOptions.views.days.keepScrollPositions) {
                bindingOptions._currentView.daysContents.scrollLeft = bindingOptions._currentView.daysContentsScrollLeft;
            }
        }
    };
    var renderControlDaysDayLine = function renderControlDaysDayLine(dayLines, dayNumber, dayCount, bindingOptions, pixelsPerNumbers) {
        var dayLine = createElement(dayLines, "div", "day-line");
        var dayLineHeight = dayCount * pixelsPerNumbers;
        dayLine.style.height = dayLineHeight + "px";
        if (dayLineHeight <= 0) {
            dayLine.style.visibility = "hidden";
        }
        addToolTip(dayLine, bindingOptions, dayCount.toString());
        if (Validation.isDefinedFunction(bindingOptions.events.onWeekDayClick)) {
            dayLine.onclick = function() {
                fireCustomTriggerEvent(bindingOptions.events.onWeekDayClick, dayNumber, dayCount);
            };
        } else {
            addClass(dayLine, "no-hover");
        }
        if (bindingOptions.views.days.showDayNumbers && dayCount > 0) {
            addClass(dayLine, "day-line-number");
            createElementWithHTML(dayLine, "div", "count", dayCount.toString());
        }
    };
    var getLargestValuesForEachDay = function getLargestValuesForEachDay(bindingOptions) {
        var largestValue = 0;
        var data = getCurrentViewData(bindingOptions);
        var days = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0
        };
        for(var monthIndex = 0; monthIndex < 12; monthIndex++){
            var totalDaysInMonth = getTotalDaysInMonth(bindingOptions._currentView.year, monthIndex);
            for(var dayIndex = 0; dayIndex < totalDaysInMonth; dayIndex++){
                var storageDate = toStorageDate(new Date(bindingOptions._currentView.year, monthIndex, dayIndex + 1));
                if (data.hasOwnProperty(storageDate)) {
                    var storageDateParts = getStorageDate(storageDate);
                    var storageDateObject = new Date(parseInt(storageDateParts[2]), parseInt(storageDateParts[1]), parseInt(storageDateParts[0]));
                    var weekDayNumber = getWeekdayNumber(storageDateObject) + 1;
                    if (!isHoliday(bindingOptions, storageDateObject).matched && isMonthVisible(bindingOptions.views.days.monthsToShow, storageDateObject.getMonth()) && isDayVisible(bindingOptions.views.days.daysToShow, weekDayNumber)) {
                        days[weekDayNumber] += data[storageDate];
                        largestValue = mathObject.max(largestValue, days[weekDayNumber]);
                    }
                }
            }
        }
        return {
            days: days,
            largestValue: largestValue
        };
    };
    var renderControlStatisticsContents = function renderControlStatisticsContents(bindingOptions) {
        bindingOptions._currentView.statisticsContents = createElement(bindingOptions._currentView.element, "div", "statistics-contents");
        makeAreaDroppable(bindingOptions._currentView.statisticsContents, bindingOptions);
    };
    var renderControlStatistics = function renderControlStatistics(bindingOptions, isForViewSwitch) {
        var statistics = createElement(bindingOptions._currentView.statisticsContents, "div", "statistics");
        var statisticsRanges = createElement(bindingOptions._currentView.statisticsContents, "div", "statistics-ranges");
        var labels = createElement(statistics, "div", "y-labels");
        var rangeLines = createElement(statistics, "div", "range-lines");
        var colorRanges = getSortedColorRanges(bindingOptions);
        var colorRangeValuesForCurrentYear = getLargestValuesForEachRangeType(bindingOptions, colorRanges);
        if (isForViewSwitch) {
            addClass(statistics, "view-switch");
        }
        if (colorRangeValuesForCurrentYear.largestValue > 0 && bindingOptions.views.statistics.showChartYLabels) {
            var topLabel = createElementWithHTML(labels, "div", "label-0", colorRangeValuesForCurrentYear.largestValue.toString());
            createElementWithHTML(labels, "div", "label-25", (mathObject.floor(colorRangeValuesForCurrentYear.largestValue / 4) * 3).toString());
            createElementWithHTML(labels, "div", "label-50", mathObject.floor(colorRangeValuesForCurrentYear.largestValue / 2).toString());
            createElementWithHTML(labels, "div", "label-75", mathObject.floor(colorRangeValuesForCurrentYear.largestValue / 4).toString());
            createElementWithHTML(labels, "div", "label-100", "0" /* zero */ );
            labels.style.width = topLabel.offsetWidth + "px";
            statisticsRanges.style.paddingLeft = labels.offsetWidth + getStyleValueByName(labels, "margin-right", true) + "px";
        } else {
            labels.parentNode.removeChild(labels);
            labels = null;
        }
        if (colorRangeValuesForCurrentYear.largestValue === 0) {
            bindingOptions._currentView.statisticsContents.style.minHeight = bindingOptions._currentView.mapContents.offsetHeight + "px";
            statistics.parentNode.removeChild(statistics);
            statisticsRanges.parentNode.removeChild(statisticsRanges);
            var noDataMessage = createElementWithHTML(bindingOptions._currentView.statisticsContents, "div", "no-statistics-message", _configuration.noStatisticsDataMessage);
            if (isForViewSwitch) {
                addClass(noDataMessage, "view-switch");
            }
        } else {
            var pixelsPerNumbers = bindingOptions._currentView.mapContents.offsetHeight / colorRangeValuesForCurrentYear.largestValue;
            if (!bindingOptions.views.statistics.showColorRangeLabels) {
                statisticsRanges.parentNode.removeChild(statisticsRanges);
            }
            for(var type in colorRangeValuesForCurrentYear.types){
                if (colorRangeValuesForCurrentYear.types.hasOwnProperty(type)) {
                    renderControlStatisticsRangeLine(parseInt(type), rangeLines, colorRangeValuesForCurrentYear.types[type], bindingOptions, colorRanges, pixelsPerNumbers);
                    var useColorRange = getColorRangeByMinimum(colorRanges, parseInt(type));
                    if (bindingOptions.views.statistics.showColorRangeLabels) {
                        if (!bindingOptions.views.statistics.useColorRangeNamesForLabels || !Validation.isDefined(useColorRange) || !Validation.isDefinedString(useColorRange.name)) {
                            createElementWithHTML(statisticsRanges, "div", "range-name", type + "+" /* plus */ );
                        } else {
                            createElementWithHTML(statisticsRanges, "div", "range-name", useColorRange.name);
                        }
                    }
                }
            }
            if (bindingOptions.views.statistics.showInReverseOrder) {
                reverseElementsOrder(rangeLines);
                reverseElementsOrder(statisticsRanges);
            }
            if (bindingOptions.views.statistics.keepScrollPositions) {
                bindingOptions._currentView.statisticsContents.scrollLeft = bindingOptions._currentView.statisticsContentsScrollLeft;
            }
        }
    };
    var renderControlStatisticsRangeLine = function renderControlStatisticsRangeLine(colorRangeMinimum, dayLines, rangeCount, bindingOptions, colorRanges, pixelsPerNumbers) {
        var rangeLine = createElement(dayLines, "div", "range-line");
        var useColorRange = getColorRangeByMinimum(colorRanges, colorRangeMinimum);
        var rangeLineHeight = rangeCount * pixelsPerNumbers;
        rangeLine.style.height = rangeLineHeight + "px";
        if (rangeLineHeight <= 0) {
            rangeLine.style.visibility = "hidden";
        }
        addToolTip(rangeLine, bindingOptions, rangeCount.toString());
        if (bindingOptions.views.statistics.showRangeNumbers && rangeCount > 0) {
            addClass(rangeLine, "range-line-number");
            createElementWithHTML(rangeLine, "div", "count", rangeCount.toString());
        }
        if (Validation.isDefinedFunction(bindingOptions.events.onStatisticClick)) {
            rangeLine.onclick = function() {
                fireCustomTriggerEvent(bindingOptions.events.onStatisticClick, useColorRange);
            };
        } else {
            addClass(rangeLine, "no-hover");
        }
        if (Validation.isDefined(useColorRange) && isColorRangeVisible(bindingOptions, useColorRange.id)) {
            if (Validation.isDefinedString(useColorRange.statisticsCssClassName)) {
                addClass(rangeLine, useColorRange.statisticsCssClassName);
            } else {
                addClass(rangeLine, useColorRange.cssClassName);
            }
        }
    };
    var getLargestValuesForEachRangeType = function getLargestValuesForEachRangeType(bindingOptions, colorRanges) {
        var types = {};
        var data = getCurrentViewData(bindingOptions);
        var largestValue = 0;
        types["0" /* zero */ ] = 0;
        for(var monthIndex = 0; monthIndex < 12; monthIndex++){
            var totalDaysInMonth = getTotalDaysInMonth(bindingOptions._currentView.year, monthIndex);
            for(var dayIndex = 0; dayIndex < totalDaysInMonth; dayIndex++){
                var storageDate = toStorageDate(new Date(bindingOptions._currentView.year, monthIndex, dayIndex + 1));
                if (data.hasOwnProperty(storageDate)) {
                    var storageDateParts = getStorageDate(storageDate);
                    var storageDateObject = new Date(parseInt(storageDateParts[2]), parseInt(storageDateParts[1]), parseInt(storageDateParts[0]));
                    var weekDayNumber = getWeekdayNumber(storageDateObject) + 1;
                    if (!isHoliday(bindingOptions, storageDateObject).matched && isMonthVisible(bindingOptions.views.statistics.monthsToShow, storageDateObject.getMonth()) && isDayVisible(bindingOptions.views.statistics.daysToShow, weekDayNumber)) {
                        var useColorRange = getColorRange(bindingOptions, colorRanges, data[storageDate]);
                        if (!Validation.isDefined(useColorRange)) {
                            types["0" /* zero */ ]++;
                        } else {
                            if (!types.hasOwnProperty(useColorRange.minimum.toString())) {
                                types[useColorRange.minimum.toString()] = 0;
                            }
                            types[useColorRange.minimum]++;
                            largestValue = mathObject.max(largestValue, types[useColorRange.minimum]);
                        }
                    }
                }
            }
        }
        return {
            types: types,
            largestValue: largestValue
        };
    };
    var renderControlViewGuide = function renderControlViewGuide(bindingOptions) {
        var guide = createElement(bindingOptions._currentView.element, "div", "guide");
        var mapTypes = createElement(guide, "div", "map-types");
        var noneTypeCount = 0;
        for(var storageDate in _elements_DateCounts[bindingOptions._currentView.element.id].type[_configuration.unknownTrendText]){
            if (_elements_DateCounts[bindingOptions._currentView.element.id].type[_configuration.unknownTrendText].hasOwnProperty(storageDate)) {
                noneTypeCount++;
                break;
            }
        }
        if (_elements_DateCounts[bindingOptions._currentView.element.id].types > 1) {
            if (Validation.isDefinedString(bindingOptions.description.text)) {
                var description = createElement(bindingOptions._currentView.element, "div", "description", guide);
                renderDescription(bindingOptions, description);
            }
            for(var type in _elements_DateCounts[bindingOptions._currentView.element.id].type){
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
            var mapToggles = createElement(guide, "div", "map-toggles");
            if (bindingOptions.guide.showLessAndMoreLabels) {
                var lessText = createElementWithHTML(mapToggles, "div", "less-text", _configuration.lessText);
                if (bindingOptions.guide.colorRangeTogglesEnabled) {
                    lessText.onclick = function() {
                        updateColorRangeToggles(bindingOptions, false);
                    };
                } else {
                    addClass(lessText, "no-click");
                }
            }
            var days = createElement(mapToggles, "div", "days");
            var colorRanges = getSortedColorRanges(bindingOptions);
            var colorRangesLength = colorRanges.length;
            for(var colorRangesIndex = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++){
                renderControlViewGuideDay(bindingOptions, days, colorRanges[colorRangesIndex]);
            }
            if (bindingOptions.guide.showLessAndMoreLabels) {
                var moreText = createElementWithHTML(mapToggles, "div", "more-text", _configuration.moreText);
                if (bindingOptions.guide.colorRangeTogglesEnabled) {
                    moreText.onclick = function() {
                        updateColorRangeToggles(bindingOptions, true);
                    };
                } else {
                    addClass(moreText, "no-click");
                }
            }
        }
    };
    var renderControlViewGuideTypeButton = function renderControlViewGuideTypeButton(bindingOptions, mapTypes, type) {
        var typeButton = createElementWithHTML(mapTypes, "button", "type", type);
        if (bindingOptions._currentView.type === type) {
            addClass(typeButton, "active");
        }
        typeButton.onclick = function() {
            if (bindingOptions._currentView.type !== type) {
                bindingOptions._currentView.type = type;
                fireCustomTriggerEvent(bindingOptions.events.onTypeSwitch, type);
                renderControlContainer(bindingOptions);
            }
        };
    };
    var renderControlViewGuideDay = function renderControlViewGuideDay(bindingOptions, days, colorRange) {
        var day = createElement(days, "div");
        day.className = "day";
        addToolTip(day, bindingOptions, colorRange.tooltipText);
        if (isColorRangeVisible(bindingOptions, colorRange.id)) {
            if (bindingOptions._currentView.view === 1 /* map */  && Validation.isDefinedString(colorRange.mapCssClassName)) {
                addClass(day, colorRange.mapCssClassName);
            } else if (bindingOptions.views.chart.enabled && bindingOptions._currentView.view === 2 /* chart */  && Validation.isDefinedString(colorRange.chartCssClassName)) {
                addClass(day, colorRange.chartCssClassName);
            } else if (bindingOptions.views.statistics.enabled && bindingOptions._currentView.view === 4 /* statistics */  && Validation.isDefinedString(colorRange.statisticsCssClassName)) {
                addClass(day, colorRange.statisticsCssClassName);
            } else {
                addClass(day, colorRange.cssClassName);
            }
        }
        if (bindingOptions.guide.showNumbersInGuide) {
            addClass(day, "day-number");
            day.innerHTML = colorRange.minimum + "+" /* plus */ ;
        }
        if (bindingOptions.guide.colorRangeTogglesEnabled) {
            day.onclick = function() {
                toggleColorRangeVisibleState(bindingOptions, colorRange.id);
            };
        } else {
            addClass(day, "no-hover");
        }
    };
    var renderDescription = function renderDescription(bindingOptions, container) {
        if (Validation.isDefinedString(bindingOptions.description.text)) {
            if (Validation.isDefinedString(bindingOptions.description.url)) {
                var link = createElementWithHTML(container, "a", "label", bindingOptions.description.text);
                link.href = bindingOptions.description.url;
                link.target = bindingOptions.description.urlTarget;
            } else {
                createElementWithHTML(container, "span", "label", bindingOptions.description.text);
            }
        }
    };
    var renderDayToolTip = function renderDayToolTip(bindingOptions, day, date, dateCount) {
        if (Validation.isDefinedFunction(bindingOptions.events.onDayToolTipRender)) {
            addToolTip(day, bindingOptions, fireCustomTriggerEvent(bindingOptions.events.onDayToolTipRender, date, dateCount));
        } else {
            var tooltip = getCustomFormattedDateText(bindingOptions.tooltip.dayText, date);
            if (bindingOptions.showHolidaysInDayToolTips) {
                var holiday = isHoliday(bindingOptions, date);
                if (holiday.matched && Validation.isDefinedString(holiday.name)) {
                    tooltip += ":" /* colon */  + " " /* space */  + holiday.name;
                }
            }
            addToolTip(day, bindingOptions, tooltip);
        }
    };
    var createDateStorageForElement = function createDateStorageForElement(elementId, bindingOptions) {
        var storeLocalData = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
        _elements_DateCounts[elementId] = {
            options: bindingOptions,
            type: {},
            types: 1
        };
        _elements_DateCounts[elementId].type[_configuration.unknownTrendText] = {};
        if (storeLocalData && !bindingOptions._currentView.isInFetchMode) {
            loadDataFromLocalStorage(bindingOptions);
        }
    };
    var getCurrentViewData = function getCurrentViewData(bindingOptions) {
        return _elements_DateCounts[bindingOptions._currentView.element.id].type[bindingOptions._currentView.type];
    };
    var isMonthVisible = function isMonthVisible(monthsToShow, month) {
        return monthsToShow.indexOf(month + 1) > -1 /* notFound */ ;
    };
    var isDayVisible = function isDayVisible(daysToShow, day) {
        return daysToShow.indexOf(day) > -1 /* notFound */ ;
    };
    var getYearsAvailableInData = function getYearsAvailableInData(bindingOptions) {
        var years = [];
        if (bindingOptions.showOnlyDataForYearsAvailable) {
            var data = getCurrentViewData(bindingOptions);
            for(var storageDate in data){
                if (data.hasOwnProperty(storageDate)) {
                    var year = parseInt(getStorageDateYear(storageDate));
                    if (years.indexOf(year) === -1 /* notFound */ ) {
                        years.push(year);
                    }
                }
            }
        }
        years = years.sort(function(a, b) {
            return a - b;
        });
        return years;
    };
    var isYearVisible = function isYearVisible(bindingOptions, year) {
        return bindingOptions.yearsToHide.indexOf(year) === -1 /* notFound */  && (bindingOptions._currentView.yearsAvailable.length === 0 || bindingOptions._currentView.yearsAvailable.indexOf(year) > -1 /* notFound */ );
    };
    var isFirstVisibleYear = function isFirstVisibleYear(bindingOptions, year) {
        return bindingOptions._currentView.yearsAvailable.length > 0 && year <= bindingOptions._currentView.yearsAvailable[0];
    };
    var isLastVisibleYear = function isLastVisibleYear(bindingOptions, year) {
        return bindingOptions._currentView.yearsAvailable.length > 0 && year >= bindingOptions._currentView.yearsAvailable[bindingOptions._currentView.yearsAvailable.length - 1];
    };
    var loadDataFromLocalStorage = function loadDataFromLocalStorage(bindingOptions) {
        if (bindingOptions.useLocalStorageForData && windowObject.localStorage) {
            var keysLength = windowObject.localStorage.length;
            var elementId = bindingOptions._currentView.element.id;
            for(var keyIndex = 0; keyIndex < keysLength; keyIndex++){
                var key = windowObject.localStorage.key(keyIndex);
                if (startsWithAnyCase(key, _local_Storage_Start_ID)) {
                    var typesJson = windowObject.localStorage.getItem(key);
                    var typesObject = getObjectFromString(typesJson);
                    if (typesObject.parsed) {
                        _elements_DateCounts[elementId].type = typesObject.result;
                        _elements_DateCounts[elementId].types = 0;
                        for(var type in _elements_DateCounts[elementId].type){
                            if (_elements_DateCounts[elementId].type.hasOwnProperty(type)) {
                                _elements_DateCounts[elementId].types++;
                            }
                        }
                    }
                }
            }
        }
    };
    var storeDataInLocalStorage = function storeDataInLocalStorage(bindingOptions) {
        if (bindingOptions.useLocalStorageForData && windowObject.localStorage) {
            var elementId = bindingOptions._currentView.element.id;
            clearLocalStorageObjects(bindingOptions);
            var jsonData = jsonObject.stringify(_elements_DateCounts[elementId].type);
            windowObject.localStorage.setItem(_local_Storage_Start_ID + elementId, jsonData);
        }
    };
    var clearLocalStorageObjects = function clearLocalStorageObjects(bindingOptions) {
        if (bindingOptions.useLocalStorageForData && windowObject.localStorage) {
            var keysLength = windowObject.localStorage.length;
            var keysToRemove = [];
            var elementId = bindingOptions._currentView.element.id;
            for(var keyIndex = 0; keyIndex < keysLength; keyIndex++){
                if (startsWithAnyCase(windowObject.localStorage.key(keyIndex), _local_Storage_Start_ID + elementId)) {
                    keysToRemove.push(windowObject.localStorage.key(keyIndex));
                }
            }
            var keysToRemoveLength = keysToRemove.length;
            for(var keyToRemoveIndex = 0; keyToRemoveIndex < keysToRemoveLength; keyToRemoveIndex++){
                windowObject.localStorage.removeItem(keysToRemove[keyToRemoveIndex]);
            }
        }
    };
    var startDataPullTimer = function startDataPullTimer(bindingOptions) {
        if (bindingOptions._currentView.isInFetchMode) {
            if (!Validation.isDefined(bindingOptions._currentView.isInFetchModeTimer)) {
                pullDataFromCustomTrigger(bindingOptions);
            }
            if (!Validation.isDefined(bindingOptions._currentView.isInFetchModeTimer)) {
                bindingOptions._currentView.isInFetchModeTimer = setInterval(function() {
                    pullDataFromCustomTrigger(bindingOptions);
                    renderControlContainer(bindingOptions);
                }, bindingOptions.dataFetchDelay);
            }
        }
    };
    var pullDataFromCustomTrigger = function pullDataFromCustomTrigger(bindingOptions) {
        var elementId = bindingOptions._currentView.element.id;
        var data = fireCustomTriggerEvent(bindingOptions.events.onDataFetch, elementId);
        if (Validation.isDefinedObject(data)) {
            createDateStorageForElement(elementId, bindingOptions, false);
            for(var storageDate in data){
                if (data.hasOwnProperty(storageDate)) {
                    if (!_elements_DateCounts[elementId].type[_configuration.unknownTrendText].hasOwnProperty(storageDate)) {
                        _elements_DateCounts[elementId].type[_configuration.unknownTrendText][storageDate] = 0;
                    }
                    _elements_DateCounts[elementId].type[_configuration.unknownTrendText][storageDate] += data[storageDate];
                }
            }
        }
    };
    var cancelAllPullDataTimers = function cancelAllPullDataTimers() {
        for(var elementId in _elements_DateCounts){
            if (_elements_DateCounts.hasOwnProperty(elementId)) {
                var bindingOptions = _elements_DateCounts[elementId].options;
                if (Validation.isDefined(bindingOptions._currentView.isInFetchModeTimer)) {
                    clearInterval(bindingOptions._currentView.isInFetchModeTimer);
                }
            }
        }
    };
    var isColorRangeVisible = function isColorRangeVisible(bindingOptions, id) {
        var result2 = false;
        if (id === _internal_Name_Holiday) {
            result2 = true;
        } else {
            var colorRangesLength = bindingOptions.colorRanges.length;
            for(var colorRangesIndex = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++){
                var colorRange = bindingOptions.colorRanges[colorRangesIndex];
                if (colorRange.id === id && Data.getDefaultBoolean(colorRange.visible, true)) {
                    result2 = true;
                    break;
                }
            }
        }
        return result2;
    };
    var updateColorRangeToggles = function updateColorRangeToggles(bindingOptions, flag) {
        var colorRangesLength = bindingOptions.colorRanges.length;
        for(var colorRangesIndex = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++){
            bindingOptions.colorRanges[colorRangesIndex].visible = flag;
            fireCustomTriggerEvent(bindingOptions.events.onColorRangeTypeToggle, bindingOptions.colorRanges[colorRangesIndex].id, flag);
        }
        renderControlContainer(bindingOptions);
    };
    var toggleColorRangeVisibleState = function toggleColorRangeVisibleState(bindingOptions, id) {
        var colorRangesLength = bindingOptions.colorRanges.length;
        for(var colorRangesIndex = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++){
            var colorRange = bindingOptions.colorRanges[colorRangesIndex];
            if (colorRange.id === id) {
                colorRange.visible = !Data.getDefaultBoolean(colorRange.visible, true);
                fireCustomTriggerEvent(bindingOptions.events.onColorRangeTypeToggle, colorRange.id, colorRange.visible);
                renderControlContainer(bindingOptions);
                break;
            }
        }
    };
    var getColorRange = function getColorRange(bindingOptions, colorRanges, dateCount) {
        var date = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
        var useColorRange = null;
        if (Validation.isDefined(date) && isHoliday(bindingOptions, date).matched) {
            var newUseColorRange = {
                cssClassName: "holiday",
                id: _internal_Name_Holiday,
                visible: true,
                name: "" /* empty */ ,
                minimum: 0,
                mapCssClassName: "" /* empty */ ,
                chartCssClassName: "" /* empty */ ,
                statisticsCssClassName: "" /* empty */ ,
                tooltipText: "" /* empty */ 
            };
            useColorRange = newUseColorRange;
        }
        if (!Validation.isDefined(useColorRange)) {
            var colorRangesLength = colorRanges.length;
            for(var colorRangesIndex = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++){
                var colorRange = colorRanges[colorRangesIndex];
                if (dateCount >= colorRange.minimum) {
                    useColorRange = colorRange;
                } else {
                    break;
                }
            }
        }
        return useColorRange;
    };
    var getColorRangeByMinimum = function getColorRangeByMinimum(colorRanges, minimum) {
        var colorRangesLength = colorRanges.length;
        var useColorRange = null;
        for(var colorRangesIndex = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++){
            var colorRange = colorRanges[colorRangesIndex];
            if (minimum.toString() === colorRange.minimum.toString()) {
                useColorRange = colorRange;
                break;
            }
        }
        return useColorRange;
    };
    var getSortedColorRanges = function getSortedColorRanges(bindingOptions) {
        return bindingOptions.colorRanges.sort(function(a, b) {
            return a.minimum - b.minimum;
        });
    };
    var isHoliday = function isHoliday(bindingOptions, date) {
        var holidaysLength = bindingOptions.holidays.length;
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var holidayMatched = false;
        var holidayName = null;
        for(var holidayIndex = 0; holidayIndex < holidaysLength; holidayIndex++){
            var holiday = bindingOptions.holidays[holidayIndex];
            if (Validation.isDefinedString(holiday.date) && holiday.showInViews) {
                var dateParts = holiday.date.split("/");
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
    };
    var makeAreaDroppable = function makeAreaDroppable(element, bindingOptions) {
        if (bindingOptions.allowFileImports && !bindingOptions._currentView.isInFetchMode) {
            element.ondragover = cancelBubble;
            element.ondragenter = cancelBubble;
            element.ondragleave = cancelBubble;
            element.ondrop = function(e) {
                cancelBubble(e);
                if (Validation.isDefined(windowObject.FileReader) && e.dataTransfer.files.length > 0) {
                    importFromFiles(e.dataTransfer.files, bindingOptions);
                }
            };
        }
    };
    var importFromFilesSelected = function importFromFilesSelected(bindingOptions) {
        var input = createElementWithNoContainer("input");
        input.type = "file";
        input.accept = ".json, .txt, .csv";
        input.multiple = "multiple";
        input.onchange = function() {
            importFromFiles(input.files, bindingOptions);
        };
        input.click();
    };
    var importFromFiles = function importFromFiles(files, bindingOptions) {
        var filesLength = files.length;
        var filesCompleted = [];
        var data = getCurrentViewData(bindingOptions);
        var onLoadEnd = function onLoadEnd(filename, readingObject) {
            filesCompleted.push(filename);
            for(var storageDate in readingObject){
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
        for(var fileIndex = 0; fileIndex < filesLength; fileIndex++){
            var file = files[fileIndex];
            var fileExtension = file.name.split(".").pop().toLowerCase();
            if (fileExtension === "json" /* json */ ) {
                importFromJson(file, onLoadEnd);
            } else if (fileExtension === "txt" /* txt */ ) {
                importFromTxt(file, onLoadEnd);
            } else if (fileExtension === "csv" /* csv */ ) {
                importFromCsv(file, onLoadEnd);
            }
        }
    };
    var importFromJson = function importFromJson(file, onLoadEnd) {
        var reader = new FileReader();
        var readingObject = null;
        reader.readAsText(file);
        reader.onloadend = function() {
            onLoadEnd(file.name, readingObject);
        };
        reader.onload = function(e) {
            var jsonObject2 = getObjectFromString(e.target.result);
            if (jsonObject2.parsed && Validation.isDefinedObject(jsonObject2.result)) {
                readingObject = jsonObject2.result;
            }
        };
    };
    var importFromTxt = function importFromTxt(file, onLoadEnd) {
        var reader = new FileReader();
        var readingObject = null;
        reader.readAsText(file);
        reader.onloadend = function() {
            onLoadEnd(file.name, readingObject);
        };
        reader.onload = function(e) {
            var lines = e.target.result.toString().split("\n" /* newLine */ );
            var linesLength = lines.length;
            for(var lineIndex = 0; lineIndex < linesLength; lineIndex++){
                var line = lines[lineIndex].split(":" /* colon */ );
                readingObject[line[0].trim()] = parseInt(line[1].trim());
            }
        };
    };
    var importFromCsv = function importFromCsv(file, onLoadEnd) {
        var reader = new FileReader();
        var readingObject = null;
        reader.readAsText(file);
        reader.onloadend = function() {
            onLoadEnd(file.name, readingObject);
        };
        reader.onload = function(e) {
            var data = e.target.result.toString().replace(new RegExp('"', "g"), "" /* empty */ );
            var lines = data.split("\n" /* newLine */ );
            lines.shift();
            var linesLength = lines.length;
            for(var lineIndex = 0; lineIndex < linesLength; lineIndex++){
                var line = lines[lineIndex].split("," /* comma */ );
                readingObject[line[0].trim()] = parseInt(line[1].trim());
            }
        };
    };
    var exportAllData = function exportAllData(bindingOptions) {
        var exportType = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        var contents = null;
        var contentsMimeType = getExportMimeType(bindingOptions);
        var contentExportType = Data.getDefaultString(exportType, bindingOptions.exportType).toLowerCase();
        if (contentExportType === "csv" /* csv */ ) {
            contents = getCsvContent(bindingOptions);
        } else if (contentExportType === "json" /* json */ ) {
            contents = getJsonContent(bindingOptions);
        } else if (contentExportType === "xml" /* xml */ ) {
            contents = getXmlContents(bindingOptions);
        } else if (contentExportType === "txt" /* txt */ ) {
            contents = getTxtContents(bindingOptions);
        }
        if (Validation.isDefinedString(contents)) {
            var tempLink = createElement(documentObject.body, "a");
            tempLink.style.display = "none";
            tempLink.setAttribute("target", "_blank");
            tempLink.setAttribute("href", "data:" + contentsMimeType + ";charset=utf-8," + encodeURIComponent(contents));
            tempLink.setAttribute("download", getExportFilename(bindingOptions));
            tempLink.click();
            documentObject.body.removeChild(tempLink);
            fireCustomTriggerEvent(bindingOptions.events.onExport, bindingOptions._currentView.element);
        }
    };
    var getCsvContent = function getCsvContent(bindingOptions) {
        var data = getExportData(bindingOptions);
        var csvContents = [];
        for(var storageDate in data){
            if (data.hasOwnProperty(storageDate)) {
                csvContents.push(getCsvValueLine([
                    getCsvValue(storageDate),
                    getCsvValue(data[storageDate])
                ]));
            }
        }
        if (csvContents.length > 0) {
            csvContents.unshift(getCsvValueLine([
                getCsvValue(_configuration.dateText),
                getCsvValue(_configuration.countText)
            ]));
        }
        return csvContents.join("\n" /* newLine */ );
    };
    var getJsonContent = function getJsonContent(bindingOptions) {
        return jsonObject.stringify(getExportData(bindingOptions));
    };
    var getXmlContents = function getXmlContents(bindingOptions) {
        var data = getExportData(bindingOptions);
        var contents = [];
        contents.push('<?xml version="1.0" ?>');
        contents.push("<Dates>");
        for(var storageDate in data){
            if (data.hasOwnProperty(storageDate)) {
                contents.push("<Date>");
                contents.push("<FullDate>" + storageDate + "</FullDate>");
                contents.push("<Count>" + data[storageDate] + "</Count>");
                contents.push("</Date>");
            }
        }
        contents.push("</Dates>");
        return contents.join("\n" /* newLine */ );
    };
    var getTxtContents = function getTxtContents(bindingOptions) {
        var data = getExportData(bindingOptions);
        var contents = [];
        for(var storageDate in data){
            if (data.hasOwnProperty(storageDate)) {
                contents.push(storageDate + ":" /* colon */  + " " /* space */  + data[storageDate].toString());
            }
        }
        return contents.join("\n" /* newLine */ );
    };
    var getExportData = function getExportData(bindingOptions) {
        var contents = {};
        var data = getCurrentViewData(bindingOptions);
        if (bindingOptions.exportOnlyYearBeingViewed) {
            for(var monthIndex = 0; monthIndex < 12; monthIndex++){
                var totalDaysInMonth = getTotalDaysInMonth(bindingOptions._currentView.year, monthIndex);
                for(var dayIndex = 0; dayIndex < totalDaysInMonth; dayIndex++){
                    var storageDate2 = toStorageDate(new Date(bindingOptions._currentView.year, monthIndex, dayIndex + 1));
                    if (data.hasOwnProperty(storageDate2)) {
                        contents[storageDate2] = data[storageDate2];
                    }
                }
            }
        } else {
            var storageDates = [];
            for(var storageDate1 in data){
                if (data.hasOwnProperty(storageDate1)) {
                    storageDates.push(storageDate1);
                }
            }
            storageDates.sort();
            var storageDatesLength = storageDates.length;
            for(var storageDateIndex = 0; storageDateIndex < storageDatesLength; storageDateIndex++){
                var storageDate3 = storageDates[storageDateIndex];
                if (data.hasOwnProperty(storageDate3)) {
                    contents[storageDate3] = data[storageDate3];
                }
            }
        }
        return contents;
    };
    var getExportMimeType = function getExportMimeType(bindingOptions) {
        var result2 = null;
        if (bindingOptions.exportType.toLowerCase() === "csv" /* csv */ ) {
            result2 = "text/csv";
        } else if (bindingOptions.exportType.toLowerCase() === "json" /* json */ ) {
            result2 = "application/json";
        } else if (bindingOptions.exportType.toLowerCase() === "xml" /* xml */ ) {
            result2 = "application/xml";
        } else if (bindingOptions.exportType.toLowerCase() === "txt" /* txt */ ) {
            result2 = "text/plain";
        }
        return result2;
    };
    var getExportFilename = function getExportFilename(bindingOptions) {
        var date = /* @__PURE__ */ new Date();
        var datePart = padNumber(date.getDate()) + "-" /* dash */  + padNumber(date.getMonth() + 1) + "-" /* dash */  + date.getFullYear();
        var timePart = padNumber(date.getHours()) + "-" /* dash */  + padNumber(date.getMinutes());
        var filenameStart = "" /* empty */ ;
        if (bindingOptions._currentView.type !== _configuration.unknownTrendText) {
            filenameStart = bindingOptions._currentView.type.toLowerCase().replace(" " /* space */ , "_" /* underscore */ ) + "_" /* underscore */ ;
        }
        return filenameStart + datePart + "_" /* underscore */  + timePart + "." + bindingOptions.exportType.toLowerCase();
    };
    var getCsvValue = function getCsvValue(text) {
        var result2 = text.toString().replace(/(\r\n|\n|\r)/gm, "" /* empty */ ).replace(/(\s\s)/gm, " " /* space */ );
        result2 = result2.replace(/"/g, '""');
        result2 = '"' + result2 + '"';
        return result2;
    };
    var getCsvValueLine = function getCsvValueLine(csvValues) {
        return csvValues.join(",");
    };
    var buildAttributeOptions = function buildAttributeOptions(newOptions) {
        var options = Data.getDefaultObject(newOptions, {});
        options.views = Data.getDefaultObject(options.views, {});
        options.exportOnlyYearBeingViewed = Data.getDefaultBoolean(options.exportOnlyYearBeingViewed, true);
        options.year = Data.getDefaultNumber(options.year, /* @__PURE__ */ new Date().getFullYear());
        options.view = Data.getDefaultString(options.view, "map" /* map */ );
        options.exportType = Data.getDefaultString(options.exportType, "csv" /* csv */ );
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
    };
    var buildAttributeOptionColorRanges = function buildAttributeOptionColorRanges(options) {
        if (Validation.isDefinedArray(options.colorRanges)) {
            var colorRangesLength = options.colorRanges.length;
            for(var colorRangeIndex = 0; colorRangeIndex < colorRangesLength; colorRangeIndex++){
                var colorRange = options.colorRanges[colorRangeIndex];
                colorRange.id = Data.getDefaultString(colorRange.id, newGuid());
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
                    id: newGuid(),
                    name: "Day Color 1",
                    minimum: 10,
                    cssClassName: "day-color-1",
                    tooltipText: "Day Color 1",
                    visible: true,
                    mapCssClassName: "" /* empty */ ,
                    chartCssClassName: "" /* empty */ ,
                    statisticsCssClassName: "" /* empty */ 
                },
                {
                    id: newGuid(),
                    name: "Day Color 2",
                    minimum: 15,
                    cssClassName: "day-color-2",
                    tooltipText: "Day Color 2",
                    visible: true,
                    mapCssClassName: "" /* empty */ ,
                    chartCssClassName: "" /* empty */ ,
                    statisticsCssClassName: "" /* empty */ 
                },
                {
                    id: newGuid(),
                    name: "Day Color 3",
                    minimum: 20,
                    cssClassName: "day-color-3",
                    tooltipText: "Day Color 3",
                    visible: true,
                    mapCssClassName: "" /* empty */ ,
                    chartCssClassName: "" /* empty */ ,
                    statisticsCssClassName: "" /* empty */ 
                },
                {
                    id: newGuid(),
                    name: "Day Color 4",
                    minimum: 25,
                    cssClassName: "day-color-4",
                    tooltipText: "Day Color 4",
                    visible: true,
                    mapCssClassName: "" /* empty */ ,
                    chartCssClassName: "" /* empty */ ,
                    statisticsCssClassName: "" /* empty */ 
                }
            ];
        }
        return options;
    };
    var buildAttributeOptionHolidays = function buildAttributeOptionHolidays(options) {
        if (Validation.isDefinedArray(options.holidays)) {
            var holidaysLength = options.holidays.length;
            for(var holidayIndex = 0; holidayIndex < holidaysLength; holidayIndex++){
                var holiday = options.holidays[holidayIndex];
                holiday.date = Data.getDefaultString(holiday.date, null);
                holiday.name = Data.getDefaultString(holiday.name, null);
                holiday.showInViews = Data.getDefaultBoolean(holiday.showInViews, true);
            }
        } else {
            options.holidays = [];
        }
        return options;
    };
    var buildAttributeOptionTitle = function buildAttributeOptionTitle(options) {
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
    };
    var buildAttributeOptionDescription = function buildAttributeOptionDescription(options) {
        options.description = Data.getDefaultObject(options.description, {});
        options.description.text = Data.getDefaultString(options.description.text, null);
        options.description.url = Data.getDefaultString(options.description.url, null);
        options.description.urlTarget = Data.getDefaultString(options.description.urlTarget, "_blank");
        return options;
    };
    var buildAttributeOptionGuide = function buildAttributeOptionGuide(options) {
        options.guide = Data.getDefaultObject(options.guide, {});
        options.guide.enabled = Data.getDefaultBoolean(options.guide.enabled, true);
        options.guide.colorRangeTogglesEnabled = Data.getDefaultBoolean(options.guide.colorRangeTogglesEnabled, true);
        options.guide.showLessAndMoreLabels = Data.getDefaultBoolean(options.guide.showLessAndMoreLabels, true);
        options.guide.showNumbersInGuide = Data.getDefaultBoolean(options.guide.showNumbersInGuide, false);
        return options;
    };
    var buildAttributeOptionToolTip = function buildAttributeOptionToolTip(options) {
        options.tooltip = Data.getDefaultObject(options.tooltip, {});
        options.tooltip.delay = Data.getDefaultNumber(options.tooltip.delay, 750);
        options.tooltip.dayText = Data.getDefaultString(options.tooltip.dayText, "{d}{o} {mmmm} {yyyy}");
        return options;
    };
    var buildAttributeOptionMapView = function buildAttributeOptionMapView(options) {
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
        if (Validation.isInvalidOptionArray(options.views.map.monthsToShow)) {
            options.views.map.monthsToShow = _default_MonthsToShow;
        }
        if (Validation.isInvalidOptionArray(options.views.map.daysToShow)) {
            options.views.map.daysToShow = _default_DaysToShow;
        }
        return options;
    };
    var buildAttributeOptionChartView = function buildAttributeOptionChartView(options) {
        options.views.chart = Data.getDefaultObject(options.views.chart, {});
        options.views.chart.enabled = Data.getDefaultBoolean(options.views.chart.enabled, true);
        options.views.chart.showChartYLabels = Data.getDefaultBoolean(options.views.chart.showChartYLabels, true);
        options.views.chart.showMonthNames = Data.getDefaultBoolean(options.views.chart.showMonthNames, true);
        options.views.chart.showLineNumbers = Data.getDefaultBoolean(options.views.chart.showLineNumbers, false);
        options.views.chart.showInReverseOrder = Data.getDefaultBoolean(options.views.chart.showInReverseOrder, false);
        options.views.chart.keepScrollPositions = Data.getDefaultBoolean(options.views.chart.keepScrollPositions, false);
        if (Validation.isInvalidOptionArray(options.views.chart.monthsToShow)) {
            options.views.chart.monthsToShow = _default_MonthsToShow;
        }
        if (Validation.isInvalidOptionArray(options.views.chart.daysToShow)) {
            options.views.chart.daysToShow = _default_DaysToShow;
        }
        return options;
    };
    var buildAttributeOptionDaysView = function buildAttributeOptionDaysView(options) {
        options.views.days = Data.getDefaultObject(options.views.days, {});
        options.views.days.enabled = Data.getDefaultBoolean(options.views.days.enabled, true);
        options.views.days.showChartYLabels = Data.getDefaultBoolean(options.views.days.showChartYLabels, true);
        options.views.days.showDayNames = Data.getDefaultBoolean(options.views.days.showDayNames, true);
        options.views.days.showInReverseOrder = Data.getDefaultBoolean(options.views.days.showInReverseOrder, false);
        options.views.days.showDayNumbers = Data.getDefaultBoolean(options.views.days.showDayNumbers, false);
        options.views.days.keepScrollPositions = Data.getDefaultBoolean(options.views.days.keepScrollPositions, false);
        if (Validation.isInvalidOptionArray(options.views.days.monthsToShow)) {
            options.views.days.monthsToShow = _default_MonthsToShow;
        }
        if (Validation.isInvalidOptionArray(options.views.days.daysToShow)) {
            options.views.days.daysToShow = _default_DaysToShow;
        }
        return options;
    };
    var buildAttributeOptionStatisticsView = function buildAttributeOptionStatisticsView(options) {
        options.views.statistics = Data.getDefaultObject(options.views.statistics, {});
        options.views.statistics.enabled = Data.getDefaultBoolean(options.views.statistics.enabled, true);
        options.views.statistics.showChartYLabels = Data.getDefaultBoolean(options.views.statistics.showChartYLabels, true);
        options.views.statistics.showColorRangeLabels = Data.getDefaultBoolean(options.views.statistics.showColorRangeLabels, true);
        options.views.statistics.useColorRangeNamesForLabels = Data.getDefaultBoolean(options.views.statistics.useColorRangeNamesForLabels, false);
        options.views.statistics.showRangeNumbers = Data.getDefaultBoolean(options.views.statistics.showRangeNumbers, false);
        options.views.statistics.showInReverseOrder = Data.getDefaultBoolean(options.views.statistics.showInReverseOrder, false);
        options.views.statistics.keepScrollPositions = Data.getDefaultBoolean(options.views.statistics.keepScrollPositions, false);
        if (Validation.isInvalidOptionArray(options.views.statistics.monthsToShow)) {
            options.views.statistics.monthsToShow = _default_MonthsToShow;
        }
        if (Validation.isInvalidOptionArray(options.views.statistics.daysToShow)) {
            options.views.statistics.daysToShow = _default_DaysToShow;
        }
        return options;
    };
    var buildAttributeOptionCustomTriggers = function buildAttributeOptionCustomTriggers(options) {
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
    };
    var getTotalDaysInMonth = function getTotalDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    };
    var getWeekdayNumber = function getWeekdayNumber(date) {
        return date.getDay() - 1 < 0 ? 6 : date.getDay() - 1;
    };
    var getDayOrdinal = function getDayOrdinal(value) {
        var result2 = _configuration.thText;
        if (value === 31 || value === 21 || value === 1) {
            result2 = _configuration.stText;
        } else if (value === 22 || value === 2) {
            result2 = _configuration.ndText;
        } else if (value === 23 || value === 3) {
            result2 = _configuration.rdText;
        }
        return result2;
    };
    var getCustomFormattedDateText = function getCustomFormattedDateText(dateFormat, date) {
        var result2 = dateFormat;
        var weekDayNumber = getWeekdayNumber(date);
        result2 = result2.replace("{dddd}", _configuration.dayNames[weekDayNumber]);
        result2 = result2.replace("{dd}", padNumber(date.getDate()));
        result2 = result2.replace("{d}", date.getDate().toString());
        result2 = result2.replace("{o}", getDayOrdinal(date.getDate()));
        result2 = result2.replace("{mmmm}", _configuration.monthNames[date.getMonth()]);
        result2 = result2.replace("{mm}", padNumber(date.getMonth() + 1));
        result2 = result2.replace("{m}", (date.getMonth() + 1).toString());
        result2 = result2.replace("{yyyy}", date.getFullYear().toString());
        result2 = result2.replace("{yyy}", date.getFullYear().toString().substring(1));
        result2 = result2.replace("{yy}", date.getFullYear().toString().substring(2));
        result2 = result2.replace("{y}", parseInt(date.getFullYear().toString().substring(2)).toString());
        return result2;
    };
    var createElementWithNoContainer = function createElementWithNoContainer(type) {
        var result2 = null;
        var nodeType = type.toLowerCase();
        var isText = nodeType === "text";
        if (!_elements_Type.hasOwnProperty(nodeType)) {
            _elements_Type[nodeType] = isText ? documentObject.createTextNode("" /* empty */ ) : documentObject.createElement(nodeType);
        }
        result2 = _elements_Type[nodeType].cloneNode(false);
        return result2;
    };
    var createElement = function createElement(container, type) {
        var className = arguments.length > 2 && arguments[2] !== void 0 /* empty */  ? arguments[2] : "", beforeNode = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
        var result2 = null;
        var nodeType = type.toLowerCase();
        var isText = nodeType === "text";
        if (!_elements_Type.hasOwnProperty(nodeType)) {
            _elements_Type[nodeType] = isText ? documentObject.createTextNode("" /* empty */ ) : documentObject.createElement(nodeType);
        }
        result2 = _elements_Type[nodeType].cloneNode(false);
        if (Validation.isDefined(className)) {
            result2.className = className;
        }
        if (Validation.isDefined(beforeNode)) {
            container.insertBefore(result2, beforeNode);
        } else {
            container.appendChild(result2);
        }
        return result2;
    };
    var createElementWithHTML = function createElementWithHTML(container, type, className, html) {
        var beforeNode = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : null;
        var element = createElement(container, type, className, beforeNode);
        element.innerHTML = html;
        return element;
    };
    var getStyleValueByName = function getStyleValueByName(element, stylePropertyName) {
        var toNumber = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
        var value = null;
        if (documentObject.defaultView.getComputedStyle) {
            value = documentObject.defaultView.getComputedStyle(element, null).getPropertyValue(stylePropertyName);
        } else if (element.currentStyle) {
            value = element.currentStyle[stylePropertyName];
        }
        if (toNumber) {
            value = parseFloat(value);
        }
        return value;
    };
    var addClass = function addClass(element, className) {
        element.className += " " /* space */  + className;
        element.className = element.className.trim();
    };
    var removeClass = function removeClass(element, className) {
        element.className = element.className.replace(className, "" /* empty */ );
        element.className = element.className.trim();
    };
    var cancelBubble = function cancelBubble(e) {
        e.preventDefault();
        e.cancelBubble = true;
    };
    var getScrollPosition = function getScrollPosition() {
        var doc = documentObject.documentElement;
        var left = (windowObject.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
        var top = (windowObject.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        return {
            left: left,
            top: top
        };
    };
    var showElementAtMousePosition = function showElementAtMousePosition(e, element) {
        var left = e.pageX;
        var top = e.pageY;
        var scrollPosition = getScrollPosition();
        element.style.display = "block";
        if (left + element.offsetWidth > windowObject.innerWidth) {
            left -= element.offsetWidth;
        } else {
            left++;
        }
        if (top + element.offsetHeight > windowObject.innerHeight) {
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
    };
    var reverseElementsOrder = function reverseElementsOrder(parent) {
        var children = parent.children;
        var childrenLength = children.length - 1;
        for(; childrenLength--;){
            parent.appendChild(children[childrenLength]);
        }
    };
    var buildCheckBox = function buildCheckBox(container, labelText) {
        var checked = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null, onClick = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
        var lineContainer = createElement(container, "div");
        var label = createElement(lineContainer, "label", "checkbox");
        var input = createElement(label, "input");
        input.type = "checkbox";
        if (Validation.isDefined(onClick)) {
            input.onclick = onClick;
        }
        if (Validation.isDefined(checked)) {
            input.checked = checked;
        }
        createElement(label, "span", "check-mark");
        createElementWithHTML(label, "span", "text", labelText);
        return {
            input: input,
            label: label
        };
    };
    var fireCustomTriggerEvent = function fireCustomTriggerEvent(triggerFunction) {
        for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
            args[_key - 1] = arguments[_key];
        }
        var result2 = null;
        if (Validation.isDefinedFunction(triggerFunction)) {
            result2 = triggerFunction.apply(null, [].slice.call(args, 0));
        }
        return result2;
    };
    var getObjectFromString = function getObjectFromString(objectString) {
        var parsed = true, result = null;
        try {
            if (Validation.isDefinedString(objectString)) {
                result = jsonObject.parse(objectString);
            }
        } catch (e1) {
            try {
                var evalResult = result = eval("(" + objectString + ")");
                if (Validation.isDefinedFunction(result)) {
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
            parsed: parsed,
            result: result
        };
    };
    var newGuid = function newGuid() {
        var result2 = [];
        for(var charIndex = 0; charIndex < 32; charIndex++){
            if (charIndex === 8 || charIndex === 12 || charIndex === 16 || charIndex === 20) {
                result2.push("-" /* dash */ );
            }
            var character = mathObject.floor(mathObject.random() * 16).toString(16);
            result2.push(character);
        }
        return result2.join("" /* empty */ );
    };
    var padNumber = function padNumber(number) {
        var numberString = number.toString();
        return numberString.length === 1 ? "0" /* zero */  + numberString : numberString;
    };
    var startsWithAnyCase = function startsWithAnyCase(data, start) {
        return data.substring(0, start.length).toLowerCase() === start.toLowerCase();
    };
    var toStorageDate = function toStorageDate(date) {
        return date.getFullYear() + "-" /* dash */  + padNumber(date.getMonth() + 1) + "-" /* dash */  + padNumber(date.getDate());
    };
    var getStorageDate = function getStorageDate(data) {
        return data.split("-" /* dash */ );
    };
    var getStorageDateYear = function getStorageDateYear(data) {
        return data.split("-" /* dash */ )[0];
    };
    var moveToPreviousYear = function moveToPreviousYear(bindingOptions) {
        var callCustomTrigger = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        var render2 = true;
        var year = bindingOptions._currentView.year;
        year--;
        while(!isYearVisible(bindingOptions, year)){
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
    };
    var moveToNextYear = function moveToNextYear(bindingOptions) {
        var callCustomTrigger = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        var render2 = true;
        var year = bindingOptions._currentView.year;
        year++;
        while(!isYearVisible(bindingOptions, year)){
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
    };
    var destroyElement = function destroyElement(bindingOptions) {
        bindingOptions._currentView.element.innerHTML = "" /* empty */ ;
        removeClass(bindingOptions._currentView.element, "heat-js");
        assignToolTipEvents(bindingOptions, false);
        documentObject.body.removeChild(bindingOptions._currentView.tooltip);
        if (bindingOptions._currentView.isInFetchMode && Validation.isDefined(bindingOptions._currentView.isInFetchModeTimer)) {
            clearInterval(bindingOptions._currentView.isInFetchModeTimer);
        }
        fireCustomTriggerEvent(bindingOptions.events.onDestroy, bindingOptions._currentView.element);
    };
    var buildDefaultConfiguration = function buildDefaultConfiguration() {
        var newConfiguration = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
        _configuration = !Validation.isDefinedObject(newConfiguration) ? {} : newConfiguration;
        _configuration.safeMode = Data.getDefaultBoolean(_configuration.safeMode, true);
        _configuration.domElementTypes = Data.getDefaultStringOrArray(_configuration.domElementTypes, [
            "*"
        ]);
        buildDefaultConfigurationStrings();
        buildDefaultConfigurationArrays();
    };
    var buildDefaultConfigurationStrings = function buildDefaultConfigurationStrings() {
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
    };
    var buildDefaultConfigurationArrays = function buildDefaultConfigurationArrays() {
        if (Validation.isInvalidOptionArray(_configuration.monthNames, 12)) {
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
        if (Validation.isInvalidOptionArray(_configuration.dayNames, 7)) {
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
    };
    var _configuration = {};
    var _elements_Type = {};
    var _elements_Day_Width = null;
    var _elements_DateCounts = {};
    var _internal_Name_Holiday = "HOLIDAY";
    var _local_Storage_Start_ID = "HJS_";
    var _default_MonthsToShow = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
    ];
    var _default_DaysToShow = [
        1,
        2,
        3,
        4,
        5,
        6,
        7
    ];
    var _public = {
        /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public Functions:  Manage Dates
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */ addDates: function addDates(elementId, dates) {
            var type = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : _configuration.unknownTrendText, triggerRefresh = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
            if (Validation.isDefinedString(elementId) && Validation.isDefinedArray(dates) && _elements_DateCounts.hasOwnProperty(elementId)) {
                var bindingOptions = _elements_DateCounts[elementId].options;
                if (!bindingOptions._currentView.isInFetchMode) {
                    var datesLength = dates.length;
                    for(var dateIndex = 0; dateIndex < datesLength; dateIndex++){
                        _public.addDate(elementId, dates[dateIndex], type, false);
                    }
                    if (triggerRefresh) {
                        renderControlContainer(bindingOptions, true);
                    }
                }
            }
            return _public;
        },
        addDate: function addDate(elementId, date) {
            var type = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : _configuration.unknownTrendText, triggerRefresh = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
            if (Validation.isDefinedString(elementId) && Validation.isDefinedDate(date) && _elements_DateCounts.hasOwnProperty(elementId)) {
                var bindingOptions = _elements_DateCounts[elementId].options;
                if (!bindingOptions._currentView.isInFetchMode) {
                    var storageDate = toStorageDate(date);
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
        updateDate: function updateDate(elementId, date, count) {
            var type = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : _configuration.unknownTrendText, triggerRefresh = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : true;
            if (Validation.isDefinedString(elementId) && Validation.isDefinedDate(date) && _elements_DateCounts.hasOwnProperty(elementId)) {
                var bindingOptions = _elements_DateCounts[elementId].options;
                if (!bindingOptions._currentView.isInFetchMode && count > 0) {
                    var storageDate = toStorageDate(date);
                    if (_elements_DateCounts[elementId].type.hasOwnProperty(type)) {
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
        removeDates: function removeDates(elementId, dates) {
            var type = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : _configuration.unknownTrendText, triggerRefresh = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
            if (Validation.isDefinedString(elementId) && Validation.isDefinedArray(dates) && _elements_DateCounts.hasOwnProperty(elementId)) {
                var bindingOptions = _elements_DateCounts[elementId].options;
                if (!bindingOptions._currentView.isInFetchMode) {
                    var datesLength = dates.length;
                    for(var dateIndex = 0; dateIndex < datesLength; dateIndex++){
                        _public.removeDate(elementId, dates[dateIndex], type, false);
                    }
                    if (triggerRefresh) {
                        renderControlContainer(bindingOptions, true);
                    }
                }
            }
            return _public;
        },
        removeDate: function removeDate(elementId, date) {
            var type = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : _configuration.unknownTrendText, triggerRefresh = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
            if (Validation.isDefinedString(elementId) && Validation.isDefinedDate(date) && _elements_DateCounts.hasOwnProperty(elementId)) {
                var bindingOptions = _elements_DateCounts[elementId].options;
                if (!bindingOptions._currentView.isInFetchMode) {
                    var storageDate = toStorageDate(date);
                    if (_elements_DateCounts[elementId].type.hasOwnProperty(type) && _elements_DateCounts[elementId].type[type].hasOwnProperty(storageDate)) {
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
        clearDate: function clearDate(elementId, date) {
            var type = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : _configuration.unknownTrendText, triggerRefresh = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
            if (Validation.isDefinedString(elementId) && Validation.isDefinedDate(date) && _elements_DateCounts.hasOwnProperty(elementId)) {
                var bindingOptions = _elements_DateCounts[elementId].options;
                if (!bindingOptions._currentView.isInFetchMode) {
                    var storageDate = toStorageDate(date);
                    if (_elements_DateCounts[elementId].type.hasOwnProperty(type) && _elements_DateCounts[elementId].type[type].hasOwnProperty(storageDate)) {
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
        resetAll: function resetAll() {
            var triggerRefresh = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
            for(var elementId in _elements_DateCounts){
                if (_elements_DateCounts.hasOwnProperty(elementId)) {
                    _public.reset(elementId, triggerRefresh);
                }
            }
            return _public;
        },
        reset: function reset(elementId) {
            var triggerRefresh = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
            if (Validation.isDefinedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId)) {
                var bindingOptions = _elements_DateCounts[elementId].options;
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
     */ import: function _import(elementId, files) {
            if (Validation.isDefinedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId) && Validation.isDefinedArray(files)) {
                importFromFiles(files, _elements_DateCounts[elementId].options);
            }
            return _public;
        },
        export: function _export(elementId) {
            var exportType = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
            if (Validation.isDefinedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId)) {
                exportAllData(_elements_DateCounts[elementId].options, exportType);
            }
            return _public;
        },
        /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public Functions:  Manage Instances
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */ refresh: function refresh(elementId) {
            if (Validation.isDefinedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId)) {
                var bindingOptions = _elements_DateCounts[elementId].options;
                renderControlContainer(bindingOptions, true);
                fireCustomTriggerEvent(bindingOptions.events.onRefresh, bindingOptions._currentView.element);
            }
            return _public;
        },
        refreshAll: function refreshAll() {
            for(var elementId in _elements_DateCounts){
                if (_elements_DateCounts.hasOwnProperty(elementId)) {
                    var bindingOptions = _elements_DateCounts[elementId].options;
                    renderControlContainer(bindingOptions, true);
                    fireCustomTriggerEvent(bindingOptions.events.onRefresh, bindingOptions._currentView.element);
                }
            }
            return _public;
        },
        setYear: function setYear(elementId, year) {
            if (Validation.isDefinedString(elementId) && Validation.isDefinedNumber(year) && _elements_DateCounts.hasOwnProperty(elementId)) {
                var bindingOptions = _elements_DateCounts[elementId].options;
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
        setYearToHighest: function setYearToHighest(elementId) {
            if (Validation.isDefinedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId)) {
                var bindingOptions = _elements_DateCounts[elementId].options;
                var data = getCurrentViewData(bindingOptions);
                var maximumYear = 0;
                for(var storageDate in data){
                    if (data.hasOwnProperty(storageDate)) {
                        maximumYear = mathObject.max(maximumYear, parseInt(getStorageDateYear(storageDate)));
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
        setYearToLowest: function setYearToLowest(elementId) {
            if (Validation.isDefinedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId)) {
                var bindingOptions = _elements_DateCounts[elementId].options;
                var data = getCurrentViewData(bindingOptions);
                var minimumYear = 9999;
                for(var storageDate in data){
                    if (data.hasOwnProperty(storageDate)) {
                        minimumYear = mathObject.min(minimumYear, parseInt(getStorageDateYear(storageDate)));
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
        moveToPreviousYear: function moveToPreviousYear1(elementId) {
            if (Validation.isDefinedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId)) {
                moveToPreviousYear(_elements_DateCounts[elementId].options);
            }
            return _public;
        },
        moveToNextYear: function moveToNextYear1(elementId) {
            if (Validation.isDefinedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId)) {
                moveToNextYear(_elements_DateCounts[elementId].options);
            }
            return _public;
        },
        moveToCurrentYear: function moveToCurrentYear(elementId) {
            if (Validation.isDefinedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId)) {
                var bindingOptions = _elements_DateCounts[elementId].options;
                bindingOptions._currentView.year = /* @__PURE__ */ new Date().getFullYear();
                if (!isYearVisible(bindingOptions, bindingOptions._currentView.year)) {
                    moveToNextYear(bindingOptions, false);
                } else {
                    renderControlContainer(bindingOptions);
                }
                fireCustomTriggerEvent(bindingOptions.events.onSetYear, bindingOptions._currentView.year);
            }
            return _public;
        },
        getYear: function getYear(elementId) {
            var result2 = null;
            if (Validation.isDefinedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId)) {
                var bindingOptions = _elements_DateCounts[elementId].options;
                result2 = bindingOptions._currentView.year;
            }
            return result2;
        },
        render: function render(element, options) {
            if (Validation.isDefinedObject(element) && Validation.isDefinedObject(options)) {
                renderControl(renderBindingOptions(options, element));
            }
            return _public;
        },
        renderAll: function renderAll() {
            render();
            return _public;
        },
        switchView: function switchView(elementId, viewName) {
            if (Validation.isDefinedString(elementId) && Validation.isDefinedString(viewName) && _elements_DateCounts.hasOwnProperty(elementId)) {
                var bindingOptions = _elements_DateCounts[elementId].options;
                var view = null;
                if (viewName.toLowerCase() === "map" /* map */ ) {
                    view = 1 /* map */ ;
                } else if (viewName.toLowerCase() === "chart" /* chart */ ) {
                    view = 2 /* chart */ ;
                } else if (viewName.toLowerCase() === "days" /* days */ ) {
                    view = 3 /* days */ ;
                } else if (viewName.toLowerCase() === "statistics" /* statistics */ ) {
                    view = 4 /* statistics */ ;
                }
                if (Validation.isDefinedNumber(view)) {
                    bindingOptions._currentView.view = view;
                    fireCustomTriggerEvent(bindingOptions.events.onViewSwitch, viewName);
                    renderControlContainer(bindingOptions, false, true);
                }
            }
            return _public;
        },
        switchType: function switchType(elementId, type) {
            if (Validation.isDefinedString(elementId) && Validation.isDefinedString(type) && _elements_DateCounts.hasOwnProperty(elementId) && _elements_DateCounts[elementId].type.hasOwnProperty(type)) {
                var bindingOptions = _elements_DateCounts[elementId].options;
                if (bindingOptions._currentView.type !== type) {
                    bindingOptions._currentView.type = type;
                    fireCustomTriggerEvent(bindingOptions.events.onTypeSwitch, type);
                    renderControlContainer(bindingOptions);
                }
            }
            return _public;
        },
        updateOptions: function updateOptions(elementId, newOptions) {
            if (Validation.isDefinedString(elementId) && Validation.isDefinedObject(newOptions) && _elements_DateCounts.hasOwnProperty(elementId)) {
                var bindingOptions = _elements_DateCounts[elementId].options;
                var newBindingOptions = buildAttributeOptions(newOptions);
                var optionChanged = false;
                for(var propertyName in newBindingOptions){
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
     */ destroyAll: function destroyAll() {
            for(var elementId in _elements_DateCounts){
                if (_elements_DateCounts.hasOwnProperty(elementId)) {
                    destroyElement(_elements_DateCounts[elementId].options);
                }
            }
            _elements_DateCounts = {};
            return _public;
        },
        destroy: function destroy(elementId) {
            if (Validation.isDefinedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId)) {
                destroyElement(_elements_DateCounts[elementId].options);
                delete _elements_DateCounts[elementId];
            }
            return _public;
        },
        /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public Functions:  Configuration
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */ setConfiguration: function setConfiguration(newConfiguration) {
            var triggerRefresh = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
            if (Validation.isDefinedObject(newConfiguration)) {
                var configurationHasChanged = false;
                for(var propertyName in newConfiguration){
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
     */ getIds: function getIds() {
            var result2 = [];
            for(var elementId in _elements_DateCounts){
                if (_elements_DateCounts.hasOwnProperty(elementId)) {
                    result2.push(elementId);
                }
            }
            return result2;
        },
        getVersion: function getVersion() {
            return "4.0.0";
        }
    };
    (function() {
        buildDefaultConfiguration();
        documentObject.addEventListener("DOMContentLoaded", function() {
            render();
        });
        windowObject.addEventListener("pagehide", function() {
            cancelAllPullDataTimers();
        });
        if (!Validation.isDefined(windowObject.$heat)) {
            windowObject.$heat = _public;
        }
    })();
})(document, window, Math, JSON); /**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        enum.ts
 * @version     v4.0.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2024
 */  /**
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