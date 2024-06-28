(function (documentObject, windowObject, mathObject, jsonObject) {
    // Variables: Configuration
    var _configuration = {};
    // Variables: Elements
    var _elements_Type = {};
    var _elements_Day_Width = null;
    // Enum: Strings
    var STRING;
    (function (STRING) {
        STRING["empty"] = "";
        STRING["space"] = " ";
        STRING["newLine"] = "\n";
        STRING["dash"] = "-";
        STRING["underscore"] = "_";
        STRING["plus"] = "+";
        STRING["zero"] = "0";
        STRING["colon"] = ":";
        STRING["comma"] = ",";
    })(STRING || (STRING = {}));
    ;
    // Enum: Values
    var VALUE;
    (function (VALUE) {
        VALUE[VALUE["notFound"] = -1] = "notFound";
    })(VALUE || (VALUE = {}));
    ;
    // Enum: View
    var VIEW;
    (function (VIEW) {
        VIEW[VIEW["map"] = 1] = "map";
        VIEW[VIEW["chart"] = 2] = "chart";
        VIEW[VIEW["days"] = 3] = "days";
        VIEW[VIEW["statistics"] = 4] = "statistics";
    })(VIEW || (VIEW = {}));
    ;
    // Enum: View (names)
    var VIEW_NAME;
    (function (VIEW_NAME) {
        VIEW_NAME["map"] = "map";
        VIEW_NAME["chart"] = "chart";
        VIEW_NAME["days"] = "days";
        VIEW_NAME["statistics"] = "statistics";
    })(VIEW_NAME || (VIEW_NAME = {}));
    ;
    // Enum: Export Types
    var EXPORT_TYPE;
    (function (EXPORT_TYPE) {
        EXPORT_TYPE["csv"] = "csv";
        EXPORT_TYPE["json"] = "json";
        EXPORT_TYPE["xml"] = "xml";
        EXPORT_TYPE["txt"] = "txt";
    })(EXPORT_TYPE || (EXPORT_TYPE = {}));
    ;
    // Variables: Date Counts
    var _elements_DateCounts = {};
    // Variables: Internal Names
    var _internal_Name_Holiday = "HOLIDAY";
    // Variables: Local Storage
    var _local_Storage_Start_ID = "HJS_";
    // Variables: Defaults
    var _default_MonthsToShow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    var _default_DaysToShow = [1, 2, 3, 4, 5, 6, 7];
    // Variables: Attribute Names
    var _attribute_Name_Options = "data-heat-js";
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Disabled Background
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    function renderDisabledBackground(bindingOptions) {
        bindingOptions._currentView.disabledBackground = createElement(bindingOptions._currentView.element, "div", "disabled");
    }
    function showDisabledBackground(bindingOptions) {
        if (isDefined(bindingOptions._currentView.disabledBackground) && bindingOptions._currentView.disabledBackground.style.display !== "block") {
            bindingOptions._currentView.disabledBackground.style.display = "block";
        }
    }
    function hideDisabledBackground(bindingOptions) {
        if (isDefined(bindingOptions._currentView.disabledBackground) && bindingOptions._currentView.disabledBackground.style.display !== "none") {
            bindingOptions._currentView.disabledBackground.style.display = "none";
        }
    }
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    function render() {
        var tagTypes = _configuration.domElementTypes;
        var tagTypesLength = tagTypes.length;
        for (var tagTypeIndex = 0; tagTypeIndex < tagTypesLength; tagTypeIndex++) {
            var domElements = documentObject.getElementsByTagName(tagTypes[tagTypeIndex]);
            var elements = [].slice.call(domElements);
            var elementsLength = elements.length;
            for (var elementIndex = 0; elementIndex < elementsLength; elementIndex++) {
                if (!renderElement(elements[elementIndex])) {
                    break;
                }
            }
        }
    }
    function renderElement(element) {
        var result = true;
        if (isDefined(element) && element.hasAttribute(_attribute_Name_Options)) {
            var bindingOptionsData = element.getAttribute(_attribute_Name_Options);
            if (isDefinedString(bindingOptionsData)) {
                var bindingOptions = getObjectFromString(bindingOptionsData);
                if (bindingOptions.parsed && isDefinedObject(bindingOptions.result)) {
                    renderControl(renderBindingOptions(bindingOptions.result, element));
                }
                else {
                    if (!_configuration.safeMode) {
                        console.error(_configuration.attributeNotValidErrorText.replace("{{attribute_name}}", _attribute_Name_Options));
                        result = false;
                    }
                }
            }
            else {
                if (!_configuration.safeMode) {
                    console.error(_configuration.attributeNotSetErrorText.replace("{{attribute_name}}", _attribute_Name_Options));
                    result = false;
                }
            }
        }
        return result;
    }
    function renderBindingOptions(data, element) {
        var bindingOptions = buildAttributeOptions(data);
        var view = !isDefinedString(bindingOptions.view) ? STRING.empty : bindingOptions.view.toLowerCase();
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
        currentView.isInFetchMode = isDefinedFunction(bindingOptions.events.onDataFetch);
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
        if (view === VIEW_NAME.map) {
            currentView.view = VIEW.map;
        }
        else if (view === VIEW_NAME.chart) {
            currentView.view = VIEW.chart;
        }
        else if (view === VIEW_NAME.days) {
            currentView.view = VIEW.days;
        }
        else if (view === VIEW_NAME.statistics) {
            currentView.view = VIEW.statistics;
        }
        else {
            currentView.view = VIEW.map;
        }
        bindingOptions._currentView = currentView;
        return bindingOptions;
    }
    function renderControl(bindingOptions) {
        fireCustomTrigger(bindingOptions.events.onBeforeRender, bindingOptions._currentView.element);
        if (!isDefinedString(bindingOptions._currentView.element.id)) {
            bindingOptions._currentView.element.id = newGuid();
        }
        if (bindingOptions._currentView.element.className.trim() === STRING.empty) {
            bindingOptions._currentView.element.className = "heat-js";
        }
        else {
            addClass(bindingOptions._currentView.element, "heat-js");
        }
        bindingOptions._currentView.element.removeAttribute(_attribute_Name_Options);
        createDateStorageForElement(bindingOptions._currentView.element.id, bindingOptions);
        renderControlContainer(bindingOptions);
        fireCustomTrigger(bindingOptions.events.onRenderComplete, bindingOptions._currentView.element);
    }
    function renderControlContainer(bindingOptions, isForDataRefresh, isForViewSwitch) {
        if (isForDataRefresh === void 0) { isForDataRefresh = false; }
        if (isForViewSwitch === void 0) { isForViewSwitch = false; }
        if (isForDataRefresh) {
            storeDataInLocalStorage(bindingOptions);
        }
        if (isDefined(bindingOptions._currentView.mapContents)) {
            bindingOptions._currentView.mapContentsScrollLeft = bindingOptions._currentView.mapContents.scrollLeft;
        }
        if (bindingOptions.views.chart.enabled && isDefined(bindingOptions._currentView.chartContents)) {
            bindingOptions._currentView.chartContentsScrollLeft = bindingOptions._currentView.chartContents.scrollLeft;
        }
        if (bindingOptions.views.days.enabled && isDefined(bindingOptions._currentView.daysContents)) {
            bindingOptions._currentView.daysContentsScrollLeft = bindingOptions._currentView.daysContents.scrollLeft;
        }
        if (bindingOptions.views.statistics.enabled && isDefined(bindingOptions._currentView.statisticsContents)) {
            bindingOptions._currentView.statisticsContentsScrollLeft = bindingOptions._currentView.statisticsContents.scrollLeft;
        }
        bindingOptions._currentView.element.innerHTML = STRING.empty;
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
        if (bindingOptions._currentView.view === VIEW.map) {
            bindingOptions._currentView.mapContents.style.display = "block";
        }
        else if (bindingOptions.views.chart.enabled && bindingOptions._currentView.view === VIEW.chart) {
            bindingOptions._currentView.chartContents.style.display = "block";
        }
        else if (bindingOptions.views.days.enabled && bindingOptions._currentView.view === VIEW.days) {
            bindingOptions._currentView.daysContents.style.display = "block";
        }
        else if (bindingOptions.views.statistics.enabled && bindingOptions._currentView.view === VIEW.statistics) {
            bindingOptions._currentView.statisticsContents.style.display = "block";
        }
        else {
            bindingOptions._currentView.view = VIEW.map;
            bindingOptions._currentView.mapContents.style.display = "block";
        }
    }
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Configuration Dialog
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    function renderConfigurationDialog(bindingOptions) {
        bindingOptions._currentView.configurationDialog = createElement(bindingOptions._currentView.disabledBackground, "div", "dialog configuration");
        var titleBar = createElement(bindingOptions._currentView.configurationDialog, "div", "dialog-title-bar");
        var contents = createElement(bindingOptions._currentView.configurationDialog, "div", "dialog-contents");
        var closeButton = createElement(titleBar, "div", "dialog-close");
        var daysContainer = createElement(contents, "div", "side-container panel");
        var monthsContainer = createElement(contents, "div", "side-container panel");
        createElementWithHTML(titleBar, "span", "dialog-title-bar-text", _configuration.configurationTitleText);
        createElementWithHTML(daysContainer, "div", "side-container-title-text", _configuration.visibleDaysText + STRING.colon);
        createElementWithHTML(monthsContainer, "div", "side-container-title-text", _configuration.visibleMonthsText + STRING.colon);
        var months1Container = createElement(monthsContainer, "div", "side-container");
        var months2Container = createElement(monthsContainer, "div", "side-container");
        closeButton.onclick = function () {
            hideConfigurationDialog(bindingOptions);
        };
        for (var dayIndex = 0; dayIndex < 7; dayIndex++) {
            bindingOptions._currentView.dayCheckBoxes[dayIndex] = buildCheckBox(daysContainer, _configuration.dayNames[dayIndex]).input;
        }
        for (var monthIndex1 = 0; monthIndex1 < 7; monthIndex1++) {
            bindingOptions._currentView.monthCheckBoxes[monthIndex1] = buildCheckBox(months1Container, _configuration.monthNames[monthIndex1]).input;
        }
        for (var monthIndex2 = 7; monthIndex2 < 12; monthIndex2++) {
            bindingOptions._currentView.monthCheckBoxes[monthIndex2] = buildCheckBox(months2Container, _configuration.monthNames[monthIndex2]).input;
        }
        addToolTip(closeButton, bindingOptions, _configuration.closeToolTipText);
    }
    function showConfigurationDialog(bindingOptions) {
        showDisabledBackground(bindingOptions);
        if (isDefined(bindingOptions._currentView.configurationDialog) && bindingOptions._currentView.configurationDialog.style.display !== "block") {
            bindingOptions._currentView.configurationDialog.style.display = "block";
        }
        var daysToShow = [];
        var monthsToShow = [];
        if (bindingOptions._currentView.view === VIEW.map) {
            daysToShow = bindingOptions.views.map.daysToShow;
            monthsToShow = bindingOptions.views.map.monthsToShow;
        }
        else if (bindingOptions.views.chart.enabled && bindingOptions._currentView.view === VIEW.chart) {
            daysToShow = bindingOptions.views.chart.daysToShow;
            monthsToShow = bindingOptions.views.chart.monthsToShow;
        }
        else if (bindingOptions.views.days.enabled && bindingOptions._currentView.view === VIEW.days) {
            daysToShow = bindingOptions.views.days.daysToShow;
            monthsToShow = bindingOptions.views.days.monthsToShow;
        }
        else if (bindingOptions.views.statistics.enabled && bindingOptions._currentView.view === VIEW.statistics) {
            daysToShow = bindingOptions.views.statistics.daysToShow;
            monthsToShow = bindingOptions.views.statistics.monthsToShow;
        }
        else {
            daysToShow = bindingOptions.views.map.daysToShow;
            monthsToShow = bindingOptions.views.map.monthsToShow;
        }
        for (var dayIndex = 0; dayIndex < 7; dayIndex++) {
            bindingOptions._currentView.dayCheckBoxes[dayIndex].checked = isDayVisible(daysToShow, dayIndex + 1);
        }
        for (var monthIndex = 0; monthIndex < 12; monthIndex++) {
            bindingOptions._currentView.monthCheckBoxes[monthIndex].checked = isMonthVisible(monthsToShow, monthIndex);
        }
        hideToolTip(bindingOptions);
    }
    function hideConfigurationDialog(bindingOptions) {
        hideDisabledBackground(bindingOptions);
        if (isDefined(bindingOptions._currentView.configurationDialog) && bindingOptions._currentView.configurationDialog.style.display !== "none") {
            bindingOptions._currentView.configurationDialog.style.display = "none";
        }
        var daysChecked = [];
        var monthsChecked = [];
        var render = false;
        for (var dayIndex = 0; dayIndex < 7; dayIndex++) {
            if (bindingOptions._currentView.dayCheckBoxes[dayIndex].checked) {
                daysChecked.push(dayIndex + 1);
            }
        }
        for (var monthIndex = 0; monthIndex < 12; monthIndex++) {
            if (bindingOptions._currentView.monthCheckBoxes[monthIndex].checked) {
                monthsChecked.push(monthIndex + 1);
            }
        }
        if (daysChecked.length >= 1) {
            if (bindingOptions._currentView.view === VIEW.map) {
                bindingOptions.views.map.daysToShow = daysChecked;
            }
            else if (bindingOptions.views.chart.enabled && bindingOptions._currentView.view === VIEW.chart) {
                bindingOptions.views.chart.daysToShow = daysChecked;
            }
            else if (bindingOptions.views.days.enabled && bindingOptions._currentView.view === VIEW.days) {
                bindingOptions.views.days.daysToShow = daysChecked;
            }
            else if (bindingOptions.views.statistics.enabled && bindingOptions._currentView.view === VIEW.statistics) {
                bindingOptions.views.statistics.daysToShow = daysChecked;
            }
            else {
                bindingOptions.views.map.daysToShow = daysChecked;
            }
            render = true;
        }
        if (monthsChecked.length >= 1) {
            if (bindingOptions._currentView.view === VIEW.map) {
                bindingOptions.views.map.monthsToShow = monthsChecked;
            }
            else if (bindingOptions.views.chart.enabled && bindingOptions._currentView.view === VIEW.chart) {
                bindingOptions.views.chart.monthsToShow = monthsChecked;
            }
            else if (bindingOptions.views.days.enabled && bindingOptions._currentView.view === VIEW.days) {
                bindingOptions.views.days.monthsToShow = monthsChecked;
            }
            else if (bindingOptions.views.statistics.enabled && bindingOptions._currentView.view === VIEW.statistics) {
                bindingOptions.views.statistics.monthsToShow = monthsChecked;
            }
            else {
                bindingOptions.views.map.monthsToShow = monthsChecked;
            }
            render = true;
        }
        if (render) {
            renderControlContainer(bindingOptions);
            fireCustomTrigger(bindingOptions.events.onOptionsUpdate, bindingOptions._currentView.element, bindingOptions);
        }
        else {
            hideToolTip(bindingOptions);
        }
    }
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  ToolTip
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    function renderControlToolTip(bindingOptions) {
        if (!isDefined(bindingOptions._currentView.tooltip)) {
            bindingOptions._currentView.tooltip = createElement(documentObject.body, "div", "heat-js-tooltip");
            bindingOptions._currentView.tooltip.style.display = "none";
            assignToolTipEvents(bindingOptions);
        }
    }
    function assignToolTipEvents(bindingOptions, add) {
        if (add === void 0) { add = true; }
        var addEventListener_Window = add ? windowObject.addEventListener : windowObject.removeEventListener;
        var addEventListener_Document = add ? documentObject.addEventListener : documentObject.removeEventListener;
        addEventListener_Window("mousemove", function () {
            hideToolTip(bindingOptions);
        });
        addEventListener_Document("scroll", function () {
            hideToolTip(bindingOptions);
        });
    }
    function addToolTip(element, bindingOptions, text) {
        if (element !== null) {
            element.onmousemove = function (e) {
                showToolTip(e, bindingOptions, text);
            };
        }
    }
    function showToolTip(e, bindingOptions, text) {
        cancelBubble(e);
        hideToolTip(bindingOptions);
        bindingOptions._currentView.tooltipTimer = setTimeout(function () {
            bindingOptions._currentView.tooltip.innerHTML = text;
            bindingOptions._currentView.tooltip.style.display = "block";
            showElementAtMousePosition(e, bindingOptions._currentView.tooltip);
        }, bindingOptions.tooltip.delay);
    }
    function hideToolTip(bindingOptions) {
        if (isDefined(bindingOptions._currentView.tooltip)) {
            if (isDefined(bindingOptions._currentView.tooltipTimer)) {
                clearTimeout(bindingOptions._currentView.tooltipTimer);
                bindingOptions._currentView.tooltipTimer = null;
            }
            if (bindingOptions._currentView.tooltip.style.display !== "none") {
                bindingOptions._currentView.tooltip.style.display = "none";
            }
        }
    }
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Title Bar
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    function renderControlTitleBar(bindingOptions) {
        if (bindingOptions.title.showText || bindingOptions.title.showYearSelector || bindingOptions.title.showRefreshButton || bindingOptions.title.showExportButton || bindingOptions.title.showImportButton) {
            var titleBar = createElement(bindingOptions._currentView.element, "div", "title-bar");
            var title = createElement(titleBar, "div", "title");
            if (bindingOptions.views.chart.enabled || bindingOptions.views.days.enabled || bindingOptions.views.statistics.enabled) {
                if (bindingOptions.title.showTitleDropDownButton) {
                    createElement(title, "div", "down-arrow");
                }
            }
            else {
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
                importData.onclick = function () {
                    importFromFilesSelected(bindingOptions);
                };
            }
            if (bindingOptions.title.showExportButton) {
                var exportData = createElementWithHTML(titleBar, "button", "export", _configuration.exportButtonText);
                exportData.onclick = function () {
                    exportAllData(bindingOptions);
                };
            }
            if (bindingOptions.title.showRefreshButton) {
                var refresh = createElementWithHTML(titleBar, "button", "refresh", _configuration.refreshButtonText);
                refresh.onclick = function () {
                    renderControlContainer(bindingOptions);
                    fireCustomTrigger(bindingOptions.events.onRefresh, bindingOptions._currentView.element);
                };
            }
            if (bindingOptions.title.showYearSelector) {
                var back = createElementWithHTML(titleBar, "button", "back", _configuration.backButtonText);
                back.onclick = function () {
                    moveToPreviousYear(bindingOptions);
                };
                if (isFirstVisibleYear(bindingOptions, bindingOptions._currentView.year)) {
                    back.disabled = true;
                }
                bindingOptions._currentView.yearText = createElementWithHTML(titleBar, "div", "year-text", bindingOptions._currentView.year.toString());
                if (bindingOptions.title.showYearSelectionDropDown) {
                    renderYearDropDownMenu(bindingOptions);
                }
                else {
                    addClass(bindingOptions._currentView.yearText, "no-click");
                }
                if (bindingOptions.title.showConfigurationButton) {
                    var configureButton = createElement(titleBar, "div", "configure");
                    addToolTip(configureButton, bindingOptions, _configuration.configurationToolTipText);
                    configureButton.onclick = function () {
                        showConfigurationDialog(bindingOptions);
                    };
                }
                var next = createElementWithHTML(titleBar, "button", "next", _configuration.nextButtonText);
                next.onclick = function () {
                    moveToNextYear(bindingOptions);
                };
                if (isLastVisibleYear(bindingOptions, bindingOptions._currentView.year)) {
                    next.disabled = true;
                }
            }
        }
    }
    function renderTitleDropDownMenu(bindingOptions, title) {
        var titlesMenuContainer = createElement(title, "div", "titles-menu-container");
        var titlesMenu = createElement(titlesMenuContainer, "div", "titles-menu");
        if (bindingOptions.title.showTitleDropDownHeaders) {
            createElementWithHTML(titlesMenu, "div", "title-menu-header", _configuration.dataText + STRING.colon);
        }
        var menuItemMap = createElementWithHTML(titlesMenu, "div", "title-menu-item", _configuration.mapText);
        renderTitleDropDownMenuItemClickEvent(bindingOptions, menuItemMap, VIEW.map, VIEW_NAME.map);
        if (bindingOptions.views.chart.enabled) {
            var menuItemChart = createElementWithHTML(titlesMenu, "div", "title-menu-item", _configuration.chartText);
            renderTitleDropDownMenuItemClickEvent(bindingOptions, menuItemChart, VIEW.chart, VIEW_NAME.chart);
        }
        if (bindingOptions.views.days.enabled) {
            if (bindingOptions.title.showTitleDropDownHeaders) {
                createElementWithHTML(titlesMenu, "div", "title-menu-header", _configuration.yearText + STRING.colon);
            }
            var menuItemDays = createElementWithHTML(titlesMenu, "div", "title-menu-item", _configuration.daysText);
            renderTitleDropDownMenuItemClickEvent(bindingOptions, menuItemDays, VIEW.days, VIEW_NAME.days);
        }
        if (bindingOptions.views.statistics.enabled) {
            if (bindingOptions.title.showTitleDropDownHeaders) {
                createElementWithHTML(titlesMenu, "div", "title-menu-header", _configuration.statisticsText + STRING.colon);
            }
            var menuItemStatistics = createElementWithHTML(titlesMenu, "div", "title-menu-item", _configuration.colorRangesText);
            renderTitleDropDownMenuItemClickEvent(bindingOptions, menuItemStatistics, VIEW.statistics, VIEW_NAME.statistics);
        }
    }
    function renderTitleDropDownMenuItemClickEvent(bindingOptions, option, view, viewName) {
        if (bindingOptions._currentView.view === view) {
            addClass(option, "title-menu-item-active");
        }
        else {
            option.onclick = function () {
                bindingOptions._currentView.view = view;
                fireCustomTrigger(bindingOptions.events.onViewSwitch, viewName);
                renderControlContainer(bindingOptions, false, true);
            };
        }
    }
    function renderYearDropDownMenu(bindingOptions) {
        createElement(bindingOptions._currentView.yearText, "div", "down-arrow");
        var yearsMenuContainer = createElement(bindingOptions._currentView.yearText, "div", "years-menu-container");
        var yearsMenu = createElement(yearsMenuContainer, "div", "years-menu");
        var thisYear = new Date().getFullYear();
        var activeYearMenuItem = null;
        yearsMenuContainer.style.display = "block";
        yearsMenuContainer.style.visibility = "hidden";
        for (var currentYear = thisYear - bindingOptions.title.extraSelectionYears; currentYear < thisYear + bindingOptions.title.extraSelectionYears; currentYear++) {
            if (isYearVisible(bindingOptions, currentYear)) {
                var yearMenuItem = renderYearDropDownMenuItem(bindingOptions, yearsMenu, currentYear, thisYear);
                if (!isDefined(activeYearMenuItem)) {
                    activeYearMenuItem = yearMenuItem;
                }
            }
        }
        if (isDefined(activeYearMenuItem)) {
            yearsMenu.scrollTop = activeYearMenuItem.offsetTop - (yearsMenu.offsetHeight / 2);
        }
        yearsMenuContainer.style.display = "none";
        yearsMenuContainer.style.visibility = "visible";
    }
    function renderYearDropDownMenuItem(bindingOptions, years, currentYear, actualYear) {
        var result = null;
        var year = createElementWithHTML(years, "div", "year-menu-item", currentYear.toString());
        if (bindingOptions._currentView.year !== currentYear) {
            year.onclick = function () {
                bindingOptions._currentView.year = currentYear;
                renderControlContainer(bindingOptions);
                fireCustomTrigger(bindingOptions.events.onSetYear, bindingOptions._currentView.year);
            };
            if (currentYear === actualYear) {
                addClass(year, "year-menu-item-current");
            }
        }
        else {
            addClass(year, "year-menu-item-active");
            result = year;
        }
        return result;
    }
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  View:  Map
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    function renderControlMap(bindingOptions, isForViewSwitch) {
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
        }
        else {
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
                for (var dayNameIndex = 0; dayNameIndex < 7; dayNameIndex++) {
                    if (isDayVisible(bindingOptions.views.map.daysToShow, dayNameIndex + 1)) {
                        var dayText = !showMinimalDays || dayNameIndex % 3 === 0 ? _configuration.dayNames[dayNameIndex] : STRING.space;
                        createElementWithHTML(days, "div", "day-name", dayText);
                    }
                }
                if (bindingOptions.views.map.showDaysInReverseOrder) {
                    reverseElementsOrder(days);
                }
            }
            var months = createElement(map, "div", "months");
            var colorRanges = getSortedColorRanges(bindingOptions);
            for (var monthIndex = 0; monthIndex < 12; monthIndex++) {
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
                    for (var dayIndex = 0; dayIndex < totalDaysInMonth; dayIndex++) {
                        if (dayIndex >= firstDayNumberInMonth) {
                            startFillingDays = true;
                        }
                        else {
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
                                if (!isDefined(_elements_Day_Width) && isDefined(day)) {
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
                        }
                        else {
                            monthName = createElementWithHTML(month, "div", "month-name-bottom", _configuration.monthNames[monthIndex]);
                        }
                        if (isDefined(monthName)) {
                            if (bindingOptions.views.map.showMonthDayGaps) {
                                monthName.style.width = monthWidth + "px";
                            }
                            else {
                                monthName.style.width = (monthWidth - _elements_Day_Width) + "px";
                            }
                        }
                    }
                    if (monthAdded && isDefined(_elements_Day_Width)) {
                        if (firstDayNumberInMonth > 0 && !bindingOptions.views.map.showMonthDayGaps) {
                            month.style.marginLeft = -_elements_Day_Width + "px";
                        }
                        else if (firstDayNumberInMonth === 0 && bindingOptions.views.map.showMonthDayGaps) {
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
    }
    function renderControlMapMonthDay(bindingOptions, currentDayColumn, dayNumber, month, year, colorRanges) {
        var actualDay = dayNumber + 1;
        var day = createElement(currentDayColumn, "div", "day");
        var date = new Date(year, month, actualDay);
        var dateCount = _elements_DateCounts[bindingOptions._currentView.element.id].type[bindingOptions._currentView.type][toStorageDate(date)];
        dateCount = getDefaultNumber(dateCount, 0);
        renderDayToolTip(bindingOptions, day, date, dateCount);
        if (bindingOptions.views.map.showDayNumbers && dateCount > 0) {
            day.innerHTML = dateCount.toString();
        }
        if (isDefinedFunction(bindingOptions.events.onDayClick)) {
            day.onclick = function () {
                fireCustomTrigger(bindingOptions.events.onDayClick, date, dateCount);
            };
        }
        else {
            addClass(day, "no-hover");
        }
        var useColorRange = getColorRange(bindingOptions, colorRanges, dateCount, date);
        if (isDefined(useColorRange) && isColorRangeVisible(bindingOptions, useColorRange.id)) {
            if (isDefinedString(useColorRange.mapCssClassName)) {
                addClass(day, useColorRange.mapCssClassName);
            }
            else {
                addClass(day, useColorRange.cssClassName);
            }
        }
        return day;
    }
    function isDataAvailableForYear(bindingOptions) {
        var result = false;
        var data = getCurrentViewData(bindingOptions);
        var checkDate = bindingOptions._currentView.year.toString();
        for (var storageDate in data) {
            if (data.hasOwnProperty(storageDate)) {
                if (getStorageDateYear(storageDate) === checkDate) {
                    result = true;
                    break;
                }
            }
        }
        return result;
    }
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  View:  Chart
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    function renderControlChartContents(bindingOptions) {
        bindingOptions._currentView.chartContents = createElement(bindingOptions._currentView.element, "div", "chart-contents");
        makeAreaDroppable(bindingOptions._currentView.chartContents, bindingOptions);
    }
    function renderControlChart(bindingOptions, isForViewSwitch) {
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
            createElementWithHTML(labels, "div", "label-100", STRING.zero);
            labels.style.width = topLabel.offsetWidth + "px";
            labelsWidth = labels.offsetWidth + getStyleValueByName(labels, "margin-right", true);
        }
        else {
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
        }
        else {
            var pixelsPerNumbers = bindingOptions._currentView.mapContents.offsetHeight / largestValueForCurrentYear;
            var totalMonths = 0;
            var totalDays = 0;
            for (var monthIndex1 = 0; monthIndex1 < 12; monthIndex1++) {
                if (isMonthVisible(bindingOptions.views.chart.monthsToShow, monthIndex1)) {
                    var totalDaysInMonth = getTotalDaysInMonth(currentYear, monthIndex1);
                    var actualDay = 1;
                    totalMonths++;
                    for (var dayIndex = 0; dayIndex < totalDaysInMonth; dayIndex++) {
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
                var chartMonths_1 = createElement(bindingOptions._currentView.chartContents, "div", "chart-months");
                var linesWidth_1 = dayLines.offsetWidth / totalMonths;
                var monthTimesValue_1 = 0;
                var addMonthName = function (addMonthNameIndex) {
                    if (isMonthVisible(bindingOptions.views.chart.monthsToShow, addMonthNameIndex)) {
                        var monthName = createElementWithHTML(chartMonths_1, "div", "month-name", _configuration.monthNames[addMonthNameIndex]);
                        monthName.style.left = labelsWidth + (linesWidth_1 * monthTimesValue_1) + "px";
                        monthTimesValue_1++;
                    }
                };
                if (bindingOptions.views.chart.showInReverseOrder) {
                    for (var monthIndex2 = 12; monthIndex2--;) {
                        addMonthName(monthIndex2);
                    }
                }
                else {
                    for (var monthIndex3 = 0; monthIndex3 < 12; monthIndex3++) {
                        addMonthName(monthIndex3);
                    }
                }
                chartMonths_1.style.width = dayLines.offsetWidth + "px";
                var monthNameSpace = createElement(chartMonths_1, "div", "month-name-space");
                monthNameSpace.style.height = chartMonths_1.offsetHeight + "px";
                monthNameSpace.style.width = labelsWidth + "px";
            }
            if (bindingOptions.views.chart.keepScrollPositions) {
                bindingOptions._currentView.chartContents.scrollLeft = bindingOptions._currentView.chartContentsScrollLeft;
            }
        }
    }
    function renderControlChartDay(dayLines, bindingOptions, day, month, year, colorRanges, pixelsPerNumbers) {
        var date = new Date(year, month, day);
        var dayLine = createElement(dayLines, "div", "day-line");
        var dateCount = getCurrentViewData(bindingOptions)[toStorageDate(date)];
        dateCount = getDefaultNumber(dateCount, 0);
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
        if (isDefinedFunction(bindingOptions.events.onDayClick)) {
            dayLine.onclick = function () {
                fireCustomTrigger(bindingOptions.events.onDayClick, date, dateCount);
            };
        }
        else {
            addClass(dayLine, "no-hover");
        }
        var useColorRange = getColorRange(bindingOptions, colorRanges, dateCount, date);
        if (isDefined(useColorRange) && isColorRangeVisible(bindingOptions, useColorRange.id)) {
            if (isDefinedString(useColorRange.chartCssClassName)) {
                addClass(dayLine, useColorRange.chartCssClassName);
            }
            else {
                addClass(dayLine, useColorRange.cssClassName);
            }
        }
    }
    function getLargestValueForChartYear(bindingOptions) {
        var result = 0;
        var data = getCurrentViewData(bindingOptions);
        for (var monthIndex = 0; monthIndex < 12; monthIndex++) {
            var totalDaysInMonth = getTotalDaysInMonth(bindingOptions._currentView.year, monthIndex);
            for (var dayIndex = 0; dayIndex < totalDaysInMonth; dayIndex++) {
                var storageDate = toStorageDate(new Date(bindingOptions._currentView.year, monthIndex, dayIndex + 1));
                if (data.hasOwnProperty(storageDate)) {
                    if (isMonthVisible(bindingOptions.views.chart.monthsToShow, monthIndex) && isDayVisible(bindingOptions.views.chart.daysToShow, dayIndex + 1)) {
                        result = mathObject.max(result, parseInt(data[storageDate]));
                    }
                }
            }
        }
        return result;
    }
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  View:  Days
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    function renderControlDaysContents(bindingOptions) {
        bindingOptions._currentView.daysContents = createElement(bindingOptions._currentView.element, "div", "days-contents");
        makeAreaDroppable(bindingOptions._currentView.daysContents, bindingOptions);
    }
    function renderControlDays(bindingOptions, isForViewSwitch) {
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
            createElementWithHTML(labels, "div", "label-100", STRING.zero);
            labels.style.width = topLabel.offsetWidth + "px";
            dayNames.style.paddingLeft = labels.offsetWidth + getStyleValueByName(labels, "margin-right", true) + "px";
        }
        else {
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
        }
        else {
            var pixelsPerNumbers = bindingOptions._currentView.mapContents.offsetHeight / dayValuesForCurrentYear.largestValue;
            for (var day in dayValuesForCurrentYear.days) {
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
    }
    function renderControlDaysDayLine(dayLines, dayNumber, dayCount, bindingOptions, pixelsPerNumbers) {
        var dayLine = createElement(dayLines, "div", "day-line");
        var dayLineHeight = dayCount * pixelsPerNumbers;
        dayLine.style.height = dayLineHeight + "px";
        if (dayLineHeight <= 0) {
            dayLine.style.visibility = "hidden";
        }
        addToolTip(dayLine, bindingOptions, dayCount.toString());
        if (isDefinedFunction(bindingOptions.events.onWeekDayClick)) {
            dayLine.onclick = function () {
                fireCustomTrigger(bindingOptions.events.onWeekDayClick, dayNumber, dayCount);
            };
        }
        else {
            addClass(dayLine, "no-hover");
        }
        if (bindingOptions.views.days.showDayNumbers && dayCount > 0) {
            addClass(dayLine, "day-line-number");
            createElementWithHTML(dayLine, "div", "count", dayCount.toString());
        }
    }
    function getLargestValuesForEachDay(bindingOptions) {
        var largestValue = 0;
        var data = getCurrentViewData(bindingOptions);
        var days = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
        };
        for (var monthIndex = 0; monthIndex < 12; monthIndex++) {
            var totalDaysInMonth = getTotalDaysInMonth(bindingOptions._currentView.year, monthIndex);
            for (var dayIndex = 0; dayIndex < totalDaysInMonth; dayIndex++) {
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
    }
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  View:  Statistics
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    function renderControlStatisticsContents(bindingOptions) {
        bindingOptions._currentView.statisticsContents = createElement(bindingOptions._currentView.element, "div", "statistics-contents");
        makeAreaDroppable(bindingOptions._currentView.statisticsContents, bindingOptions);
    }
    function renderControlStatistics(bindingOptions, isForViewSwitch) {
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
            createElementWithHTML(labels, "div", "label-100", STRING.zero);
            labels.style.width = topLabel.offsetWidth + "px";
            statisticsRanges.style.paddingLeft = labels.offsetWidth + getStyleValueByName(labels, "margin-right", true) + "px";
        }
        else {
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
        }
        else {
            var pixelsPerNumbers = bindingOptions._currentView.mapContents.offsetHeight / colorRangeValuesForCurrentYear.largestValue;
            if (!bindingOptions.views.statistics.showColorRangeLabels) {
                statisticsRanges.parentNode.removeChild(statisticsRanges);
            }
            for (var type in colorRangeValuesForCurrentYear.types) {
                if (colorRangeValuesForCurrentYear.types.hasOwnProperty(type)) {
                    renderControlStatisticsRangeLine(parseInt(type), rangeLines, colorRangeValuesForCurrentYear.types[type], bindingOptions, colorRanges, pixelsPerNumbers);
                    var useColorRange = getColorRangeByMinimum(colorRanges, parseInt(type));
                    if (bindingOptions.views.statistics.showColorRangeLabels) {
                        if (!bindingOptions.views.statistics.useColorRangeNamesForLabels || !isDefined(useColorRange) || !isDefinedString(useColorRange.name)) {
                            createElementWithHTML(statisticsRanges, "div", "range-name", type + STRING.plus);
                        }
                        else {
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
    }
    function renderControlStatisticsRangeLine(colorRangeMinimum, dayLines, rangeCount, bindingOptions, colorRanges, pixelsPerNumbers) {
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
        if (isDefinedFunction(bindingOptions.events.onStatisticClick)) {
            rangeLine.onclick = function () {
                fireCustomTrigger(bindingOptions.events.onStatisticClick, useColorRange);
            };
        }
        else {
            addClass(rangeLine, "no-hover");
        }
        if (isDefined(useColorRange) && isColorRangeVisible(bindingOptions, useColorRange.id)) {
            if (isDefinedString(useColorRange.statisticsCssClassName)) {
                addClass(rangeLine, useColorRange.statisticsCssClassName);
            }
            else {
                addClass(rangeLine, useColorRange.cssClassName);
            }
        }
    }
    function getLargestValuesForEachRangeType(bindingOptions, colorRanges) {
        var types = {};
        var data = getCurrentViewData(bindingOptions);
        var largestValue = 0;
        types[STRING.zero] = 0;
        for (var monthIndex = 0; monthIndex < 12; monthIndex++) {
            var totalDaysInMonth = getTotalDaysInMonth(bindingOptions._currentView.year, monthIndex);
            for (var dayIndex = 0; dayIndex < totalDaysInMonth; dayIndex++) {
                var storageDate = toStorageDate(new Date(bindingOptions._currentView.year, monthIndex, dayIndex + 1));
                if (data.hasOwnProperty(storageDate)) {
                    var storageDateParts = getStorageDate(storageDate);
                    var storageDateObject = new Date(parseInt(storageDateParts[2]), parseInt(storageDateParts[1]), parseInt(storageDateParts[0]));
                    var weekDayNumber = getWeekdayNumber(storageDateObject) + 1;
                    if (!isHoliday(bindingOptions, storageDateObject).matched && isMonthVisible(bindingOptions.views.statistics.monthsToShow, storageDateObject.getMonth()) && isDayVisible(bindingOptions.views.statistics.daysToShow, weekDayNumber)) {
                        var useColorRange = getColorRange(bindingOptions, colorRanges, data[storageDate]);
                        if (!isDefined(useColorRange)) {
                            types[STRING.zero]++;
                        }
                        else {
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
    }
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Guide
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    function renderControlViewGuide(bindingOptions) {
        var guide = createElement(bindingOptions._currentView.element, "div", "guide");
        var mapTypes = createElement(guide, "div", "map-types");
        var noneTypeCount = 0;
        for (var storageDate in _elements_DateCounts[bindingOptions._currentView.element.id].type[_configuration.unknownTrendText]) {
            if (_elements_DateCounts[bindingOptions._currentView.element.id].type[_configuration.unknownTrendText].hasOwnProperty(storageDate)) {
                noneTypeCount++;
                break;
            }
        }
        if (_elements_DateCounts[bindingOptions._currentView.element.id].types > 1) {
            if (isDefinedString(bindingOptions.description.text)) {
                var description = createElement(bindingOptions._currentView.element, "div", "description", guide);
                renderDescription(bindingOptions, description);
            }
            for (var type in _elements_DateCounts[bindingOptions._currentView.element.id].type) {
                if (type !== _configuration.unknownTrendText || noneTypeCount > 0) {
                    if (noneTypeCount === 0 && bindingOptions._currentView.type === _configuration.unknownTrendText) {
                        bindingOptions._currentView.type = type;
                    }
                    renderControlViewGuideTypeButton(bindingOptions, mapTypes, type);
                }
            }
        }
        else {
            renderDescription(bindingOptions, mapTypes);
        }
        if (bindingOptions.guide.enabled) {
            var mapToggles = createElement(guide, "div", "map-toggles");
            if (bindingOptions.guide.showLessAndMoreLabels) {
                var lessText = createElementWithHTML(mapToggles, "div", "less-text", _configuration.lessText);
                if (bindingOptions.guide.colorRangeTogglesEnabled) {
                    lessText.onclick = function () {
                        updateColorRangeToggles(bindingOptions, false);
                    };
                }
                else {
                    addClass(lessText, "no-click");
                }
            }
            var days = createElement(mapToggles, "div", "days");
            var colorRanges = getSortedColorRanges(bindingOptions);
            var colorRangesLength = colorRanges.length;
            for (var colorRangesIndex = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++) {
                renderControlViewGuideDay(bindingOptions, days, colorRanges[colorRangesIndex]);
            }
            if (bindingOptions.guide.showLessAndMoreLabels) {
                var moreText = createElementWithHTML(mapToggles, "div", "more-text", _configuration.moreText);
                if (bindingOptions.guide.colorRangeTogglesEnabled) {
                    moreText.onclick = function () {
                        updateColorRangeToggles(bindingOptions, true);
                    };
                }
                else {
                    addClass(moreText, "no-click");
                }
            }
        }
    }
    function renderControlViewGuideTypeButton(bindingOptions, mapTypes, type) {
        var typeButton = createElementWithHTML(mapTypes, "button", "type", type);
        if (bindingOptions._currentView.type === type) {
            addClass(typeButton, "active");
        }
        typeButton.onclick = function () {
            if (bindingOptions._currentView.type !== type) {
                bindingOptions._currentView.type = type;
                fireCustomTrigger(bindingOptions.events.onTypeSwitch, type);
                renderControlContainer(bindingOptions);
            }
        };
    }
    function renderControlViewGuideDay(bindingOptions, days, colorRange) {
        var day = createElement(days, "div");
        day.className = "day";
        addToolTip(day, bindingOptions, colorRange.tooltipText);
        if (isColorRangeVisible(bindingOptions, colorRange.id)) {
            if (bindingOptions._currentView.view === VIEW.map && isDefinedString(colorRange.mapCssClassName)) {
                addClass(day, colorRange.mapCssClassName);
            }
            else if (bindingOptions.views.chart.enabled && bindingOptions._currentView.view === VIEW.chart && isDefinedString(colorRange.chartCssClassName)) {
                addClass(day, colorRange.chartCssClassName);
            }
            else if (bindingOptions.views.statistics.enabled && bindingOptions._currentView.view === VIEW.statistics && isDefinedString(colorRange.statisticsCssClassName)) {
                addClass(day, colorRange.statisticsCssClassName);
            }
            else {
                addClass(day, colorRange.cssClassName);
            }
        }
        if (bindingOptions.guide.showNumbersInGuide) {
            addClass(day, "day-number");
            day.innerHTML = colorRange.minimum + STRING.plus;
        }
        if (bindingOptions.guide.colorRangeTogglesEnabled) {
            day.onclick = function () {
                toggleColorRangeVisibleState(bindingOptions, colorRange.id);
            };
        }
        else {
            addClass(day, "no-hover");
        }
    }
    function renderDescription(bindingOptions, container) {
        if (isDefinedString(bindingOptions.description.text)) {
            if (isDefinedString(bindingOptions.description.url)) {
                var link = createElementWithHTML(container, "a", "label", bindingOptions.description.text);
                link.href = bindingOptions.description.url;
                link.target = bindingOptions.description.urlTarget;
            }
            else {
                createElementWithHTML(container, "span", "label", bindingOptions.description.text);
            }
        }
    }
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Shared
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    function renderDayToolTip(bindingOptions, day, date, dateCount) {
        if (isDefinedFunction(bindingOptions.events.onDayToolTipRender)) {
            addToolTip(day, bindingOptions, fireCustomTrigger(bindingOptions.events.onDayToolTipRender, date, dateCount));
        }
        else {
            var tooltip = getCustomFormattedDateText(bindingOptions.tooltip.dayText, date);
            if (bindingOptions.showHolidaysInDayToolTips) {
                var holiday = isHoliday(bindingOptions, date);
                if (holiday.matched && isDefinedString(holiday.name)) {
                    tooltip += STRING.colon + STRING.space + holiday.name;
                }
            }
            addToolTip(day, bindingOptions, tooltip);
        }
    }
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Data
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    function createDateStorageForElement(elementId, bindingOptions, storeLocalData) {
        if (storeLocalData === void 0) { storeLocalData = true; }
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
        return monthsToShow.indexOf(month + 1) > VALUE.notFound;
    }
    function isDayVisible(daysToShow, day) {
        return daysToShow.indexOf(day) > VALUE.notFound;
    }
    function getYearsAvailableInData(bindingOptions) {
        var years = [];
        if (bindingOptions.showOnlyDataForYearsAvailable) {
            var data = getCurrentViewData(bindingOptions);
            for (var storageDate in data) {
                if (data.hasOwnProperty(storageDate)) {
                    var year = parseInt(getStorageDateYear(storageDate));
                    if (years.indexOf(year) === VALUE.notFound) {
                        years.push(year);
                    }
                }
            }
        }
        years = years.sort(function (a, b) {
            return a - b;
        });
        return years;
    }
    function isYearVisible(bindingOptions, year) {
        return bindingOptions.yearsToHide.indexOf(year) === VALUE.notFound && (bindingOptions._currentView.yearsAvailable.length === 0 || bindingOptions._currentView.yearsAvailable.indexOf(year) > VALUE.notFound);
    }
    function isFirstVisibleYear(bindingOptions, year) {
        return bindingOptions._currentView.yearsAvailable.length > 0 && year <= bindingOptions._currentView.yearsAvailable[0];
    }
    function isLastVisibleYear(bindingOptions, year) {
        return bindingOptions._currentView.yearsAvailable.length > 0 && year >= bindingOptions._currentView.yearsAvailable[bindingOptions._currentView.yearsAvailable.length - 1];
    }
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Local Storage
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    function loadDataFromLocalStorage(bindingOptions) {
        if (bindingOptions.useLocalStorageForData && windowObject.localStorage) {
            var keysLength = windowObject.localStorage.length;
            var elementId = bindingOptions._currentView.element.id;
            for (var keyIndex = 0; keyIndex < keysLength; keyIndex++) {
                var key = windowObject.localStorage.key(keyIndex);
                if (startsWithAnyCase(key, _local_Storage_Start_ID)) {
                    var typesJson = windowObject.localStorage.getItem(key);
                    var typesObject = getObjectFromString(typesJson);
                    if (typesObject.parsed) {
                        _elements_DateCounts[elementId].type = typesObject.result;
                        _elements_DateCounts[elementId].types = 0;
                        for (var type in _elements_DateCounts[elementId].type) {
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
        if (bindingOptions.useLocalStorageForData && windowObject.localStorage) {
            var elementId = bindingOptions._currentView.element.id;
            clearLocalStorageObjects(bindingOptions);
            var jsonData = jsonObject.stringify(_elements_DateCounts[elementId].type);
            windowObject.localStorage.setItem(_local_Storage_Start_ID + elementId, jsonData);
        }
    }
    function clearLocalStorageObjects(bindingOptions) {
        if (bindingOptions.useLocalStorageForData && windowObject.localStorage) {
            var keysLength = windowObject.localStorage.length;
            var keysToRemove = [];
            var elementId = bindingOptions._currentView.element.id;
            for (var keyIndex = 0; keyIndex < keysLength; keyIndex++) {
                if (startsWithAnyCase(windowObject.localStorage.key(keyIndex), _local_Storage_Start_ID + elementId)) {
                    keysToRemove.push(windowObject.localStorage.key(keyIndex));
                }
            }
            var keysToRemoveLength = keysToRemove.length;
            for (var keyToRemoveIndex = 0; keyToRemoveIndex < keysToRemoveLength; keyToRemoveIndex++) {
                windowObject.localStorage.removeItem(keysToRemove[keyToRemoveIndex]);
            }
        }
    }
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Data Pulling
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    function startDataPullTimer(bindingOptions) {
        if (bindingOptions._currentView.isInFetchMode) {
            if (!isDefined(bindingOptions._currentView.isInFetchModeTimer)) {
                pullDataFromCustomTrigger(bindingOptions);
            }
            if (!isDefined(bindingOptions._currentView.isInFetchModeTimer)) {
                bindingOptions._currentView.isInFetchModeTimer = setInterval(function () {
                    pullDataFromCustomTrigger(bindingOptions);
                    renderControlContainer(bindingOptions);
                }, bindingOptions.dataFetchDelay);
            }
        }
    }
    function pullDataFromCustomTrigger(bindingOptions) {
        var elementId = bindingOptions._currentView.element.id;
        var data = fireCustomTrigger(bindingOptions.events.onDataFetch, elementId);
        if (isDefinedObject(data)) {
            createDateStorageForElement(elementId, bindingOptions, false);
            for (var storageDate in data) {
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
        for (var elementId in _elements_DateCounts) {
            if (_elements_DateCounts.hasOwnProperty(elementId)) {
                var bindingOptions = _elements_DateCounts[elementId].options;
                if (isDefined(bindingOptions._currentView.isInFetchModeTimer)) {
                    clearInterval(bindingOptions._currentView.isInFetchModeTimer);
                }
            }
        }
    }
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Color Ranges
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    function isColorRangeVisible(bindingOptions, id) {
        var result = false;
        if (id === _internal_Name_Holiday) {
            result = true;
        }
        else {
            var colorRangesLength = bindingOptions.colorRanges.length;
            for (var colorRangesIndex = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++) {
                var colorRange = bindingOptions.colorRanges[colorRangesIndex];
                if (colorRange.id === id && getDefaultBoolean(colorRange.visible, true)) {
                    result = true;
                    break;
                }
            }
        }
        return result;
    }
    function updateColorRangeToggles(bindingOptions, flag) {
        var colorRangesLength = bindingOptions.colorRanges.length;
        for (var colorRangesIndex = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++) {
            bindingOptions.colorRanges[colorRangesIndex].visible = flag;
            fireCustomTrigger(bindingOptions.events.onColorRangeTypeToggle, bindingOptions.colorRanges[colorRangesIndex].id, flag);
        }
        renderControlContainer(bindingOptions);
    }
    function toggleColorRangeVisibleState(bindingOptions, id) {
        var colorRangesLength = bindingOptions.colorRanges.length;
        for (var colorRangesIndex = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++) {
            var colorRange = bindingOptions.colorRanges[colorRangesIndex];
            if (colorRange.id === id) {
                colorRange.visible = !getDefaultBoolean(colorRange.visible, true);
                fireCustomTrigger(bindingOptions.events.onColorRangeTypeToggle, colorRange.id, colorRange.visible);
                renderControlContainer(bindingOptions);
                break;
            }
        }
    }
    function getColorRange(bindingOptions, colorRanges, dateCount, date) {
        if (date === void 0) { date = null; }
        var useColorRange = null;
        if (isDefined(date) && isHoliday(bindingOptions, date).matched) {
            var newUseColorRange = {
                cssClassName: "holiday",
                id: _internal_Name_Holiday,
                visible: true,
                name: STRING.empty,
                minimum: 0,
                mapCssClassName: STRING.empty,
                chartCssClassName: STRING.empty,
                statisticsCssClassName: STRING.empty,
                tooltipText: STRING.empty
            };
            useColorRange = newUseColorRange;
        }
        if (!isDefined(useColorRange)) {
            var colorRangesLength = colorRanges.length;
            for (var colorRangesIndex = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++) {
                var colorRange = colorRanges[colorRangesIndex];
                if (dateCount >= colorRange.minimum) {
                    useColorRange = colorRange;
                }
                else {
                    break;
                }
            }
        }
        return useColorRange;
    }
    function getColorRangeByMinimum(colorRanges, minimum) {
        var colorRangesLength = colorRanges.length;
        var useColorRange = null;
        for (var colorRangesIndex = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++) {
            var colorRange = colorRanges[colorRangesIndex];
            if (minimum.toString() === colorRange.minimum.toString()) {
                useColorRange = colorRange;
                break;
            }
        }
        return useColorRange;
    }
    function getSortedColorRanges(bindingOptions) {
        return bindingOptions.colorRanges.sort(function (a, b) {
            return a.minimum - b.minimum;
        });
    }
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Holiday
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    function isHoliday(bindingOptions, date) {
        var holidaysLength = bindingOptions.holidays.length;
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var holidayMatched = false;
        var holidayName = null;
        for (var holidayIndex = 0; holidayIndex < holidaysLength; holidayIndex++) {
            var holiday = bindingOptions.holidays[holidayIndex];
            if (isDefinedString(holiday.date) && holiday.showInViews) {
                var dateParts = holiday.date.split("/");
                if (dateParts.length === 2) {
                    holidayMatched = day === parseInt(dateParts[0]) && month === parseInt(dateParts[1]);
                }
                else if (dateParts.length === 3) {
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
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Import
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    function makeAreaDroppable(element, bindingOptions) {
        if (bindingOptions.allowFileImports && !bindingOptions._currentView.isInFetchMode) {
            element.ondragover = cancelBubble;
            element.ondragenter = cancelBubble;
            element.ondragleave = cancelBubble;
            element.ondrop = function (e) {
                cancelBubble(e);
                if (isDefined(windowObject.FileReader) && e.dataTransfer.files.length > 0) {
                    importFromFiles(e.dataTransfer.files, bindingOptions);
                }
            };
        }
    }
    function importFromFilesSelected(bindingOptions) {
        var input = createElementWithNoContainer("input");
        input.type = "file";
        input.accept = ".json, .txt, .csv";
        input.multiple = "multiple";
        input.onchange = function () {
            importFromFiles(input.files, bindingOptions);
        };
        input.click();
    }
    function importFromFiles(files, bindingOptions) {
        var filesLength = files.length;
        var filesCompleted = [];
        var data = getCurrentViewData(bindingOptions);
        var onLoadEnd = function (filename, readingObject) {
            filesCompleted.push(filename);
            for (var storageDate in readingObject) {
                if (readingObject.hasOwnProperty(storageDate)) {
                    if (!data.hasOwnProperty(storageDate)) {
                        data[storageDate] = 0;
                    }
                    data[storageDate] += readingObject[storageDate];
                }
            }
            if (filesCompleted.length === filesLength) {
                fireCustomTrigger(bindingOptions.events.onImport, bindingOptions._currentView.element);
                renderControlContainer(bindingOptions);
            }
        };
        for (var fileIndex = 0; fileIndex < filesLength; fileIndex++) {
            var file = files[fileIndex];
            var fileExtension = file.name.split(".").pop().toLowerCase();
            if (fileExtension === EXPORT_TYPE.json) {
                importFromJson(file, onLoadEnd);
            }
            else if (fileExtension === EXPORT_TYPE.txt) {
                importFromTxt(file, onLoadEnd);
            }
            else if (fileExtension === EXPORT_TYPE.csv) {
                importFromCsv(file, onLoadEnd);
            }
        }
    }
    function importFromJson(file, onLoadEnd) {
        var reader = new FileReader();
        var readingObject = null;
        reader.readAsText(file);
        reader.onloadend = function () {
            onLoadEnd(file.name, readingObject);
        };
        reader.onload = function (e) {
            var jsonObject = getObjectFromString(e.target.result);
            if (jsonObject.parsed && isDefinedObject(jsonObject.result)) {
                readingObject = jsonObject.result;
            }
        };
    }
    function importFromTxt(file, onLoadEnd) {
        var reader = new FileReader();
        var readingObject = null;
        reader.readAsText(file);
        reader.onloadend = function () {
            onLoadEnd(file.name, readingObject);
        };
        reader.onload = function (e) {
            var lines = e.target.result.toString().split(STRING.newLine);
            var linesLength = lines.length;
            for (var lineIndex = 0; lineIndex < linesLength; lineIndex++) {
                var line = lines[lineIndex].split(STRING.colon);
                readingObject[line[0].trim()] = parseInt(line[1].trim());
            }
        };
    }
    function importFromCsv(file, onLoadEnd) {
        var reader = new FileReader();
        var readingObject = null;
        reader.readAsText(file);
        reader.onloadend = function () {
            onLoadEnd(file.name, readingObject);
        };
        reader.onload = function (e) {
            var data = e.target.result.toString().replace(new RegExp("\"", "g"), STRING.empty);
            var lines = data.split(STRING.newLine);
            lines.shift();
            var linesLength = lines.length;
            for (var lineIndex = 0; lineIndex < linesLength; lineIndex++) {
                var line = lines[lineIndex].split(STRING.comma);
                readingObject[line[0].trim()] = parseInt(line[1].trim());
            }
        };
    }
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Export
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    function exportAllData(bindingOptions, exportType) {
        if (exportType === void 0) { exportType = null; }
        var contents = null;
        var contentsMimeType = getExportMimeType(bindingOptions);
        var contentExportType = getDefaultString(exportType, bindingOptions.exportType).toLowerCase();
        if (contentExportType === EXPORT_TYPE.csv) {
            contents = getCsvContent(bindingOptions);
        }
        else if (contentExportType === EXPORT_TYPE.json) {
            contents = getJsonContent(bindingOptions);
        }
        else if (contentExportType === EXPORT_TYPE.xml) {
            contents = getXmlContents(bindingOptions);
        }
        else if (contentExportType === EXPORT_TYPE.txt) {
            contents = getTxtContents(bindingOptions);
        }
        if (isDefinedString(contents)) {
            var tempLink = createElement(documentObject.body, "a");
            tempLink.style.display = "none";
            tempLink.setAttribute("target", "_blank");
            tempLink.setAttribute("href", "data:" + contentsMimeType + ";charset=utf-8," + encodeURIComponent(contents));
            tempLink.setAttribute("download", getExportFilename(bindingOptions));
            tempLink.click();
            documentObject.body.removeChild(tempLink);
            fireCustomTrigger(bindingOptions.events.onExport, bindingOptions._currentView.element);
        }
    }
    function getCsvContent(bindingOptions) {
        var data = getExportData(bindingOptions);
        var csvContents = [];
        for (var storageDate in data) {
            if (data.hasOwnProperty(storageDate)) {
                csvContents.push(getCsvValueLine([getCsvValue(storageDate), getCsvValue(data[storageDate])]));
            }
        }
        if (csvContents.length > 0) {
            csvContents.unshift(getCsvValueLine([getCsvValue(_configuration.dateText), getCsvValue(_configuration.countText)]));
        }
        return csvContents.join(STRING.newLine);
    }
    function getJsonContent(bindingOptions) {
        return jsonObject.stringify(getExportData(bindingOptions));
    }
    function getXmlContents(bindingOptions) {
        var data = getExportData(bindingOptions);
        var contents = [];
        contents.push("<?xml version=\"1.0\" ?>");
        contents.push("<Dates>");
        for (var storageDate in data) {
            if (data.hasOwnProperty(storageDate)) {
                contents.push("<Date>");
                contents.push("<FullDate>" + storageDate + "</FullDate>");
                contents.push("<Count>" + data[storageDate] + "</Count>");
                contents.push("</Date>");
            }
        }
        contents.push("</Dates>");
        return contents.join(STRING.newLine);
    }
    function getTxtContents(bindingOptions) {
        var data = getExportData(bindingOptions);
        var contents = [];
        for (var storageDate in data) {
            if (data.hasOwnProperty(storageDate)) {
                contents.push(storageDate + STRING.colon + STRING.space + data[storageDate].toString());
            }
        }
        return contents.join(STRING.newLine);
    }
    function getExportData(bindingOptions) {
        var contents = {};
        var data = getCurrentViewData(bindingOptions);
        if (bindingOptions.exportOnlyYearBeingViewed) {
            for (var monthIndex = 0; monthIndex < 12; monthIndex++) {
                var totalDaysInMonth = getTotalDaysInMonth(bindingOptions._currentView.year, monthIndex);
                for (var dayIndex = 0; dayIndex < totalDaysInMonth; dayIndex++) {
                    var storageDate2 = toStorageDate(new Date(bindingOptions._currentView.year, monthIndex, dayIndex + 1));
                    if (data.hasOwnProperty(storageDate2)) {
                        contents[storageDate2] = data[storageDate2];
                    }
                }
            }
        }
        else {
            var storageDates = [];
            for (var storageDate1 in data) {
                if (data.hasOwnProperty(storageDate1)) {
                    storageDates.push(storageDate1);
                }
            }
            storageDates.sort();
            var storageDatesLength = storageDates.length;
            for (var storageDateIndex = 0; storageDateIndex < storageDatesLength; storageDateIndex++) {
                var storageDate3 = storageDates[storageDateIndex];
                if (data.hasOwnProperty(storageDate3)) {
                    contents[storageDate3] = data[storageDate3];
                }
            }
        }
        return contents;
    }
    function getExportMimeType(bindingOptions) {
        var result = null;
        if (bindingOptions.exportType.toLowerCase() === EXPORT_TYPE.csv) {
            result = "text/csv";
        }
        else if (bindingOptions.exportType.toLowerCase() === EXPORT_TYPE.json) {
            result = "application/json";
        }
        else if (bindingOptions.exportType.toLowerCase() === EXPORT_TYPE.xml) {
            result = "application/xml";
        }
        else if (bindingOptions.exportType.toLowerCase() === EXPORT_TYPE.txt) {
            result = "text/plain";
        }
        return result;
    }
    function getExportFilename(bindingOptions) {
        var date = new Date();
        var datePart = padNumber(date.getDate()) + STRING.dash + padNumber(date.getMonth() + 1) + STRING.dash + date.getFullYear();
        var timePart = padNumber(date.getHours()) + STRING.dash + padNumber(date.getMinutes());
        var filenameStart = STRING.empty;
        if (bindingOptions._currentView.type !== _configuration.unknownTrendText) {
            filenameStart = bindingOptions._currentView.type.toLowerCase().replace(STRING.space, STRING.underscore) + STRING.underscore;
        }
        return filenameStart + datePart + STRING.underscore + timePart + "." + bindingOptions.exportType.toLowerCase();
    }
    function getCsvValue(text) {
        var result = text.toString().replace(/(\r\n|\n|\r)/gm, STRING.empty).replace(/(\s\s)/gm, STRING.space);
        result = result.replace(/"/g, '""');
        result = '"' + result + '"';
        return result;
    }
    function getCsvValueLine(csvValues) {
        return csvValues.join(",");
    }
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Attribute Options
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    function buildAttributeOptions(newOptions) {
        var options = getDefaultObject(newOptions, {});
        options.views = getDefaultObject(options.views, {});
        options.exportOnlyYearBeingViewed = getDefaultBoolean(options.exportOnlyYearBeingViewed, true);
        options.year = getDefaultNumber(options.year, new Date().getFullYear());
        options.view = getDefaultString(options.view, VIEW_NAME.map);
        options.exportType = getDefaultString(options.exportType, EXPORT_TYPE.csv);
        options.useLocalStorageForData = getDefaultBoolean(options.useLocalStorageForData, false);
        options.allowFileImports = getDefaultBoolean(options.allowFileImports, true);
        options.yearsToHide = getDefaultArray(options.yearsToHide, []);
        options.dataFetchDelay = getDefaultNumber(options.dataFetchDelay, 60000);
        options.showOnlyDataForYearsAvailable = getDefaultBoolean(options.showOnlyDataForYearsAvailable, false);
        options.showHolidaysInDayToolTips = getDefaultBoolean(options.showHolidaysInDayToolTips, false);
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
        if (isDefinedArray(options.colorRanges)) {
            var colorRangesLength = options.colorRanges.length;
            for (var colorRangeIndex = 0; colorRangeIndex < colorRangesLength; colorRangeIndex++) {
                var colorRange = options.colorRanges[colorRangeIndex];
                colorRange.id = getDefaultString(colorRange.id, newGuid());
                colorRange.name = getDefaultString(colorRange.name, null);
                colorRange.minimum = getDefaultNumber(colorRange.minimum, 0);
                colorRange.cssClassName = getDefaultString(colorRange.cssClassName, null);
                colorRange.mapCssClassName = getDefaultString(colorRange.mapCssClassName, null);
                colorRange.chartCssClassName = getDefaultString(colorRange.chartCssClassName, null);
                colorRange.statisticsCssClassName = getDefaultString(colorRange.statisticsCssClassName, null);
                colorRange.tooltipText = getDefaultString(colorRange.tooltipText, null);
                colorRange.visible = getDefaultBoolean(colorRange.visible, true);
            }
        }
        else {
            options.colorRanges = [
                {
                    id: newGuid(),
                    name: "Day Color 1",
                    minimum: 10,
                    cssClassName: "day-color-1",
                    tooltipText: "Day Color 1",
                    visible: true,
                    mapCssClassName: STRING.empty,
                    chartCssClassName: STRING.empty,
                    statisticsCssClassName: STRING.empty
                },
                {
                    id: newGuid(),
                    name: "Day Color 2",
                    minimum: 15,
                    cssClassName: "day-color-2",
                    tooltipText: "Day Color 2",
                    visible: true,
                    mapCssClassName: STRING.empty,
                    chartCssClassName: STRING.empty,
                    statisticsCssClassName: STRING.empty
                },
                {
                    id: newGuid(),
                    name: "Day Color 3",
                    minimum: 20,
                    cssClassName: "day-color-3",
                    tooltipText: "Day Color 3",
                    visible: true,
                    mapCssClassName: STRING.empty,
                    chartCssClassName: STRING.empty,
                    statisticsCssClassName: STRING.empty
                },
                {
                    id: newGuid(),
                    name: "Day Color 4",
                    minimum: 25,
                    cssClassName: "day-color-4",
                    tooltipText: "Day Color 4",
                    visible: true,
                    mapCssClassName: STRING.empty,
                    chartCssClassName: STRING.empty,
                    statisticsCssClassName: STRING.empty
                }
            ];
        }
        return options;
    }
    function buildAttributeOptionHolidays(options) {
        if (isDefinedArray(options.holidays)) {
            var holidaysLength = options.holidays.length;
            for (var holidayIndex = 0; holidayIndex < holidaysLength; holidayIndex++) {
                var holiday = options.holidays[holidayIndex];
                holiday.date = getDefaultString(holiday.date, null);
                holiday.name = getDefaultString(holiday.name, null);
                holiday.showInViews = getDefaultBoolean(holiday.showInViews, true);
            }
        }
        else {
            options.holidays = [];
        }
        return options;
    }
    function buildAttributeOptionTitle(options) {
        options.title = getDefaultObject(options.title, {});
        options.title.text = getDefaultString(options.title.text, "Heat.js");
        options.title.showText = getDefaultBoolean(options.title.showText, true);
        options.title.showYearSelector = getDefaultBoolean(options.title.showYearSelector, true);
        options.title.showRefreshButton = getDefaultBoolean(options.title.showRefreshButton, false);
        options.title.showExportButton = getDefaultBoolean(options.title.showExportButton, false);
        options.title.extraSelectionYears = getDefaultNumber(options.title.extraSelectionYears, 50);
        options.title.showYearSelectionDropDown = getDefaultBoolean(options.title.showYearSelectionDropDown, true);
        options.title.showImportButton = getDefaultBoolean(options.title.showImportButton, false);
        options.title.showConfigurationButton = getDefaultBoolean(options.title.showConfigurationButton, true);
        options.title.showTitleDropDownButton = getDefaultBoolean(options.title.showTitleDropDownButton, true);
        options.title.showTitleDropDownHeaders = getDefaultBoolean(options.title.showTitleDropDownHeaders, true);
        return options;
    }
    function buildAttributeOptionDescription(options) {
        options.description = getDefaultObject(options.description, {});
        options.description.text = getDefaultString(options.description.text, null);
        options.description.url = getDefaultString(options.description.url, null);
        options.description.urlTarget = getDefaultString(options.description.urlTarget, "_blank");
        return options;
    }
    function buildAttributeOptionGuide(options) {
        options.guide = getDefaultObject(options.guide, {});
        options.guide.enabled = getDefaultBoolean(options.guide.enabled, true);
        options.guide.colorRangeTogglesEnabled = getDefaultBoolean(options.guide.colorRangeTogglesEnabled, true);
        options.guide.showLessAndMoreLabels = getDefaultBoolean(options.guide.showLessAndMoreLabels, true);
        options.guide.showNumbersInGuide = getDefaultBoolean(options.guide.showNumbersInGuide, false);
        return options;
    }
    function buildAttributeOptionToolTip(options) {
        options.tooltip = getDefaultObject(options.tooltip, {});
        options.tooltip.delay = getDefaultNumber(options.tooltip.delay, 750);
        options.tooltip.dayText = getDefaultString(options.tooltip.dayText, "{d}{o} {mmmm} {yyyy}");
        return options;
    }
    function buildAttributeOptionMapView(options) {
        options.views.map = getDefaultObject(options.views.map, {});
        options.views.map.showMonthDayGaps = getDefaultBoolean(options.views.map.showMonthDayGaps, true);
        options.views.map.showDayNames = getDefaultBoolean(options.views.map.showDayNames, true);
        options.views.map.placeMonthNamesOnTheBottom = getDefaultBoolean(options.views.map.placeMonthNamesOnTheBottom, false);
        options.views.map.showDayNumbers = getDefaultBoolean(options.views.map.showDayNumbers, false);
        options.views.map.showMonthNames = getDefaultBoolean(options.views.map.showMonthNames, true);
        options.views.map.showDaysInReverseOrder = getDefaultBoolean(options.views.map.showDaysInReverseOrder, false);
        options.views.map.showNoDataMessageWhenDataIsNotAvailable = getDefaultBoolean(options.views.map.showNoDataMessageWhenDataIsNotAvailable, false);
        options.views.map.showMinimalDayNames = getDefaultBoolean(options.views.map.showMinimalDayNames, false);
        options.views.map.showMonthsInReverseOrder = getDefaultBoolean(options.views.map.showMonthsInReverseOrder, false);
        options.views.map.keepScrollPositions = getDefaultBoolean(options.views.map.keepScrollPositions, false);
        if (isInvalidOptionArray(options.views.map.monthsToShow)) {
            options.views.map.monthsToShow = _default_MonthsToShow;
        }
        if (isInvalidOptionArray(options.views.map.daysToShow)) {
            options.views.map.daysToShow = _default_DaysToShow;
        }
        return options;
    }
    function buildAttributeOptionChartView(options) {
        options.views.chart = getDefaultObject(options.views.chart, {});
        options.views.chart.enabled = getDefaultBoolean(options.views.chart.enabled, true);
        options.views.chart.showChartYLabels = getDefaultBoolean(options.views.chart.showChartYLabels, true);
        options.views.chart.showMonthNames = getDefaultBoolean(options.views.chart.showMonthNames, true);
        options.views.chart.showLineNumbers = getDefaultBoolean(options.views.chart.showLineNumbers, false);
        options.views.chart.showInReverseOrder = getDefaultBoolean(options.views.chart.showInReverseOrder, false);
        options.views.chart.keepScrollPositions = getDefaultBoolean(options.views.chart.keepScrollPositions, false);
        if (isInvalidOptionArray(options.views.chart.monthsToShow)) {
            options.views.chart.monthsToShow = _default_MonthsToShow;
        }
        if (isInvalidOptionArray(options.views.chart.daysToShow)) {
            options.views.chart.daysToShow = _default_DaysToShow;
        }
        return options;
    }
    function buildAttributeOptionDaysView(options) {
        options.views.days = getDefaultObject(options.views.days, {});
        options.views.days.enabled = getDefaultBoolean(options.views.days.enabled, true);
        options.views.days.showChartYLabels = getDefaultBoolean(options.views.days.showChartYLabels, true);
        options.views.days.showDayNames = getDefaultBoolean(options.views.days.showDayNames, true);
        options.views.days.showInReverseOrder = getDefaultBoolean(options.views.days.showInReverseOrder, false);
        options.views.days.showDayNumbers = getDefaultBoolean(options.views.days.showDayNumbers, false);
        options.views.days.keepScrollPositions = getDefaultBoolean(options.views.days.keepScrollPositions, false);
        if (isInvalidOptionArray(options.views.days.monthsToShow)) {
            options.views.days.monthsToShow = _default_MonthsToShow;
        }
        if (isInvalidOptionArray(options.views.days.daysToShow)) {
            options.views.days.daysToShow = _default_DaysToShow;
        }
        return options;
    }
    function buildAttributeOptionStatisticsView(options) {
        options.views.statistics = getDefaultObject(options.views.statistics, {});
        options.views.statistics.enabled = getDefaultBoolean(options.views.statistics.enabled, true);
        options.views.statistics.showChartYLabels = getDefaultBoolean(options.views.statistics.showChartYLabels, true);
        options.views.statistics.showColorRangeLabels = getDefaultBoolean(options.views.statistics.showColorRangeLabels, true);
        options.views.statistics.useColorRangeNamesForLabels = getDefaultBoolean(options.views.statistics.useColorRangeNamesForLabels, false);
        options.views.statistics.showRangeNumbers = getDefaultBoolean(options.views.statistics.showRangeNumbers, false);
        options.views.statistics.showInReverseOrder = getDefaultBoolean(options.views.statistics.showInReverseOrder, false);
        options.views.statistics.keepScrollPositions = getDefaultBoolean(options.views.statistics.keepScrollPositions, false);
        if (isInvalidOptionArray(options.views.statistics.monthsToShow)) {
            options.views.statistics.monthsToShow = _default_MonthsToShow;
        }
        if (isInvalidOptionArray(options.views.statistics.daysToShow)) {
            options.views.statistics.daysToShow = _default_DaysToShow;
        }
        return options;
    }
    function buildAttributeOptionCustomTriggers(options) {
        options.events = getDefaultObject(options.events, {});
        options.events.onDayClick = getDefaultFunction(options.events.onDayClick, null);
        options.events.onBackYear = getDefaultFunction(options.events.onBackYear, null);
        options.events.onNextYear = getDefaultFunction(options.events.onNextYear, null);
        options.events.onRefresh = getDefaultFunction(options.events.onRefresh, null);
        options.events.onBeforeRender = getDefaultFunction(options.events.onBeforeRender, null);
        options.events.onRenderComplete = getDefaultFunction(options.events.onRenderComplete, null);
        options.events.onDestroy = getDefaultFunction(options.events.onDestroy, null);
        options.events.onExport = getDefaultFunction(options.events.onExport, null);
        options.events.onSetYear = getDefaultFunction(options.events.onSetYear, null);
        options.events.onTypeSwitch = getDefaultFunction(options.events.onTypeSwitch, null);
        options.events.onDayToolTipRender = getDefaultFunction(options.events.onDayToolTipRender, null);
        options.events.onAdd = getDefaultFunction(options.events.onAdd, null);
        options.events.onRemove = getDefaultFunction(options.events.onRemove, null);
        options.events.onReset = getDefaultFunction(options.events.onReset, null);
        options.events.onViewSwitch = getDefaultFunction(options.events.onViewSwitch, null);
        options.events.onColorRangeTypeToggle = getDefaultFunction(options.events.onColorRangeTypeToggle, null);
        options.events.onImport = getDefaultFunction(options.events.onImport, null);
        options.events.onStatisticClick = getDefaultFunction(options.events.onStatisticClick, null);
        options.events.onDataFetch = getDefaultFunction(options.events.onDataFetch, null);
        options.events.onClear = getDefaultFunction(options.events.onClear, null);
        options.events.onUpdate = getDefaultFunction(options.events.onUpdate, null);
        options.events.onOptionsUpdate = getDefaultFunction(options.events.onOptionsUpdate, null);
        options.events.onWeekDayClick = getDefaultFunction(options.events.onWeekDayClick, null);
        return options;
    }
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Date/Time
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    function getTotalDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }
    function getWeekdayNumber(date) {
        return date.getDay() - 1 < 0 ? 6 : date.getDay() - 1;
    }
    function getDayOrdinal(value) {
        var result = _configuration.thText;
        if (value === 31 || value === 21 || value === 1) {
            result = _configuration.stText;
        }
        else if (value === 22 || value === 2) {
            result = _configuration.ndText;
        }
        else if (value === 23 || value === 3) {
            result = _configuration.rdText;
        }
        return result;
    }
    function getCustomFormattedDateText(dateFormat, date) {
        var result = dateFormat;
        var weekDayNumber = getWeekdayNumber(date);
        result = result.replace("{dddd}", _configuration.dayNames[weekDayNumber]);
        result = result.replace("{dd}", padNumber(date.getDate()));
        result = result.replace("{d}", date.getDate().toString());
        result = result.replace("{o}", getDayOrdinal(date.getDate()));
        result = result.replace("{mmmm}", _configuration.monthNames[date.getMonth()]);
        result = result.replace("{mm}", padNumber(date.getMonth() + 1));
        result = result.replace("{m}", (date.getMonth() + 1).toString());
        result = result.replace("{yyyy}", date.getFullYear().toString());
        result = result.replace("{yyy}", date.getFullYear().toString().substring(1));
        result = result.replace("{yy}", date.getFullYear().toString().substring(2));
        result = result.replace("{y}", parseInt(date.getFullYear().toString().substring(2)).toString());
        return result;
    }
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Element Handling
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    function createElementWithNoContainer(type) {
        var result = null;
        var nodeType = type.toLowerCase();
        var isText = nodeType === "text";
        if (!_elements_Type.hasOwnProperty(nodeType)) {
            _elements_Type[nodeType] = isText ? documentObject.createTextNode(STRING.empty) : documentObject.createElement(nodeType);
        }
        result = _elements_Type[nodeType].cloneNode(false);
        return result;
    }
    function createElement(container, type, className, beforeNode) {
        if (className === void 0) { className = STRING.empty; }
        if (beforeNode === void 0) { beforeNode = null; }
        var result = null;
        var nodeType = type.toLowerCase();
        var isText = nodeType === "text";
        if (!_elements_Type.hasOwnProperty(nodeType)) {
            _elements_Type[nodeType] = isText ? documentObject.createTextNode(STRING.empty) : documentObject.createElement(nodeType);
        }
        result = _elements_Type[nodeType].cloneNode(false);
        if (isDefined(className)) {
            result.className = className;
        }
        if (isDefined(beforeNode)) {
            container.insertBefore(result, beforeNode);
        }
        else {
            container.appendChild(result);
        }
        return result;
    }
    function createElementWithHTML(container, type, className, html, beforeNode) {
        if (beforeNode === void 0) { beforeNode = null; }
        var element = createElement(container, type, className, beforeNode);
        element.innerHTML = html;
        return element;
    }
    function getStyleValueByName(element, stylePropertyName, toNumber) {
        if (toNumber === void 0) { toNumber = false; }
        var value = null;
        if (documentObject.defaultView.getComputedStyle) {
            value = documentObject.defaultView.getComputedStyle(element, null).getPropertyValue(stylePropertyName);
        }
        else if (element.currentStyle) {
            value = element.currentStyle[stylePropertyName];
        }
        if (toNumber) {
            value = parseFloat(value);
        }
        return value;
    }
    function addClass(element, className) {
        element.className += STRING.space + className;
        element.className = element.className.trim();
    }
    function removeClass(element, className) {
        element.className = element.className.replace(className, STRING.empty);
        element.className = element.className.trim();
    }
    function cancelBubble(e) {
        e.preventDefault();
        e.cancelBubble = true;
    }
    function getScrollPosition() {
        var doc = documentObject.documentElement;
        var left = (windowObject.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
        var top = (windowObject.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        return {
            left: left,
            top: top
        };
    }
    function showElementAtMousePosition(e, element) {
        var left = e.pageX;
        var top = e.pageY;
        var scrollPosition = getScrollPosition();
        element.style.display = "block";
        if (left + element.offsetWidth > windowObject.innerWidth) {
            left -= element.offsetWidth;
        }
        else {
            left++;
        }
        if (top + element.offsetHeight > windowObject.innerHeight) {
            top -= element.offsetHeight;
        }
        else {
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
    function reverseElementsOrder(parent) {
        var children = parent.children;
        var childrenLength = children.length - 1;
        for (; childrenLength--;) {
            parent.appendChild(children[childrenLength]);
        }
    }
    function buildCheckBox(container, labelText, checked, onClick) {
        if (checked === void 0) { checked = null; }
        if (onClick === void 0) { onClick = null; }
        var lineContainer = createElement(container, "div");
        var label = createElement(lineContainer, "label", "checkbox");
        var input = createElement(label, "input");
        input.type = "checkbox";
        if (isDefined(onClick)) {
            input.onclick = onClick;
        }
        if (isDefined(checked)) {
            input.checked = checked;
        }
        createElement(label, "span", "check-mark");
        createElementWithHTML(label, "span", "text", labelText);
        return {
            input: input,
            label: label
        };
    }
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Triggering Custom Events
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    function fireCustomTrigger(triggerFunction) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var result = null;
        if (isDefinedFunction(triggerFunction)) {
            result = triggerFunction.apply(null, [].slice.call(args, 1));
        }
        return result;
    }
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Validation
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    function isDefined(value) {
        return value !== null && value !== undefined && value.toString() !== STRING.empty;
    }
    function isDefinedObject(object) {
        return isDefined(object) && typeof object === "object";
    }
    function isDefinedBoolean(object) {
        return isDefined(object) && typeof object === "boolean";
    }
    function isDefinedString(object) {
        return isDefined(object) && typeof object === "string";
    }
    function isDefinedFunction(object) {
        return isDefined(object) && typeof object === "function";
    }
    function isDefinedNumber(object) {
        return isDefined(object) && typeof object === "number";
    }
    function isDefinedArray(object) {
        return isDefinedObject(object) && object instanceof Array;
    }
    function isDefinedDate(object) {
        return isDefinedObject(object) && object instanceof Date;
    }
    function isInvalidOptionArray(array, minimumLength) {
        if (minimumLength === void 0) { minimumLength = 1; }
        return !isDefinedArray(array) || array.length < minimumLength;
    }
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Default Parameter/Option Handling
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    function getDefaultAnyString(value, defaultValue) {
        return typeof value === "string" ? value : defaultValue;
    }
    function getDefaultString(value, defaultValue) {
        return isDefinedString(value) ? value : defaultValue;
    }
    function getDefaultBoolean(value, defaultValue) {
        return isDefinedBoolean(value) ? value : defaultValue;
    }
    function getDefaultNumber(value, defaultValue) {
        return isDefinedNumber(value) ? value : defaultValue;
    }
    function getDefaultFunction(value, defaultValue) {
        return isDefinedFunction(value) ? value : defaultValue;
    }
    function getDefaultArray(value, defaultValue) {
        return isDefinedArray(value) ? value : defaultValue;
    }
    function getDefaultObject(value, defaultValue) {
        return isDefinedObject(value) ? value : defaultValue;
    }
    function getDefaultStringOrArray(value, defaultValue) {
        var result = defaultValue;
        if (isDefinedString(value)) {
            var values = value.toString().split(STRING.space);
            if (values.length === 0) {
                value = defaultValue;
            }
            else {
                result = values;
            }
        }
        else {
            result = getDefaultArray(value, defaultValue);
        }
        return result;
    }
    function getObjectFromString(objectString) {
        var parsed = true, result = null;
        try {
            if (isDefinedString(objectString)) {
                result = jsonObject.parse(objectString);
            }
        }
        catch (e1) {
            try {
                var evalResult = result = eval("(" + objectString + ")");
                if (isDefinedFunction(result)) {
                    result = evalResult();
                }
            }
            catch (e2) {
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
    }
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * String Handling
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    function newGuid() {
        var result = [];
        for (var charIndex = 0; charIndex < 32; charIndex++) {
            if (charIndex === 8 || charIndex === 12 || charIndex === 16 || charIndex === 20) {
                result.push(STRING.dash);
            }
            var character = mathObject.floor(mathObject.random() * 16).toString(16);
            result.push(character);
        }
        return result.join(STRING.empty);
    }
    function padNumber(number) {
        var numberString = number.toString();
        return numberString.length === 1 ? STRING.zero + numberString : numberString;
    }
    function startsWithAnyCase(data, start) {
        return data.substring(0, start.length).toLowerCase() === start.toLowerCase();
    }
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Storage Dates
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    function toStorageDate(date) {
        return date.getFullYear() + STRING.dash + padNumber(date.getMonth() + 1) + STRING.dash + padNumber(date.getDate());
    }
    function getStorageDate(data) {
        return data.split(STRING.dash);
    }
    function getStorageDateYear(data) {
        return data.split(STRING.dash)[0];
    }
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public API Functions:  Helpers:  Manage Instances
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    function moveToPreviousYear(bindingOptions, callCustomTrigger) {
        if (callCustomTrigger === void 0) { callCustomTrigger = true; }
        var render = true;
        var year = bindingOptions._currentView.year;
        year--;
        while (!isYearVisible(bindingOptions, year)) {
            if (isFirstVisibleYear(bindingOptions, year)) {
                render = false;
                break;
            }
            year--;
        }
        if (render) {
            bindingOptions._currentView.year = year;
            renderControlContainer(bindingOptions);
            if (callCustomTrigger) {
                fireCustomTrigger(bindingOptions.events.onBackYear, bindingOptions._currentView.year);
            }
        }
    }
    function moveToNextYear(bindingOptions, callCustomTrigger) {
        if (callCustomTrigger === void 0) { callCustomTrigger = true; }
        var render = true;
        var year = bindingOptions._currentView.year;
        year++;
        while (!isYearVisible(bindingOptions, year)) {
            if (isLastVisibleYear(bindingOptions, year)) {
                render = false;
                break;
            }
            year++;
        }
        if (render) {
            bindingOptions._currentView.year = year;
            renderControlContainer(bindingOptions);
            if (callCustomTrigger) {
                fireCustomTrigger(bindingOptions.events.onBackYear, bindingOptions._currentView.year);
            }
        }
    }
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public API Functions:  Helpers:  Destroy
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    function destroyElement(bindingOptions) {
        bindingOptions._currentView.element.innerHTML = STRING.empty;
        removeClass(bindingOptions._currentView.element, "heat-js");
        assignToolTipEvents(bindingOptions, false);
        documentObject.body.removeChild(bindingOptions._currentView.tooltip);
        if (bindingOptions._currentView.isInFetchMode && isDefined(bindingOptions._currentView.isInFetchModeTimer)) {
            clearInterval(bindingOptions._currentView.isInFetchModeTimer);
        }
        fireCustomTrigger(bindingOptions.events.onDestroy, bindingOptions._currentView.element);
    }
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public API Functions:  Helpers:  Configuration
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    function buildDefaultConfiguration(newConfiguration) {
        if (newConfiguration === void 0) { newConfiguration = null; }
        _configuration = !isDefinedObject(newConfiguration) ? {} : newConfiguration;
        _configuration.safeMode = getDefaultBoolean(_configuration.safeMode, true);
        _configuration.domElementTypes = getDefaultStringOrArray(_configuration.domElementTypes, ["*"]);
        buildDefaultConfigurationStrings();
        buildDefaultConfigurationArrays();
    }
    function buildDefaultConfigurationStrings() {
        _configuration.stText = getDefaultAnyString(_configuration.stText, "st");
        _configuration.ndText = getDefaultAnyString(_configuration.ndText, "nd");
        _configuration.rdText = getDefaultAnyString(_configuration.rdText, "rd");
        _configuration.thText = getDefaultAnyString(_configuration.thText, "th");
        _configuration.backButtonText = getDefaultAnyString(_configuration.backButtonText, "Back");
        _configuration.nextButtonText = getDefaultAnyString(_configuration.nextButtonText, "Next");
        _configuration.refreshButtonText = getDefaultAnyString(_configuration.refreshButtonText, "Refresh");
        _configuration.exportButtonText = getDefaultAnyString(_configuration.exportButtonText, "Export");
        _configuration.lessText = getDefaultAnyString(_configuration.lessText, "Less");
        _configuration.moreText = getDefaultAnyString(_configuration.moreText, "More");
        _configuration.dateText = getDefaultAnyString(_configuration.dateText, "Date");
        _configuration.countText = getDefaultAnyString(_configuration.countText, "Count");
        _configuration.mapText = getDefaultAnyString(_configuration.mapText, "Map");
        _configuration.chartText = getDefaultAnyString(_configuration.chartText, "Chart");
        _configuration.noChartDataMessage = getDefaultAnyString(_configuration.noChartDataMessage, "There is currently no data to view.");
        _configuration.statisticsText = getDefaultAnyString(_configuration.statisticsText, "Statistics");
        _configuration.noStatisticsDataMessage = getDefaultAnyString(_configuration.noStatisticsDataMessage, "There are currently no statistics to view.");
        _configuration.unknownTrendText = getDefaultAnyString(_configuration.unknownTrendText, "Unknown");
        _configuration.importButtonText = getDefaultAnyString(_configuration.importButtonText, "Import");
        _configuration.noMapDataMessage = getDefaultAnyString(_configuration.noMapDataMessage, "There is currently no data to view.");
        _configuration.objectErrorText = getDefaultAnyString(_configuration.objectErrorText, "Errors in object: {{error_1}}, {{error_2}}");
        _configuration.attributeNotValidErrorText = getDefaultAnyString(_configuration.attributeNotValidErrorText, "The attribute '{{attribute_name}}' is not a valid object.");
        _configuration.attributeNotSetErrorText = getDefaultAnyString(_configuration.attributeNotSetErrorText, "The attribute '{{attribute_name}}' has not been set correctly.");
        _configuration.closeToolTipText = getDefaultAnyString(_configuration.closeToolTipText, "Close");
        _configuration.configurationToolTipText = getDefaultAnyString(_configuration.configurationToolTipText, "Configuration");
        _configuration.configurationTitleText = getDefaultAnyString(_configuration.configurationTitleText, "Configuration");
        _configuration.visibleMonthsText = getDefaultAnyString(_configuration.visibleMonthsText, "Visible Months");
        _configuration.visibleDaysText = getDefaultAnyString(_configuration.visibleDaysText, "Visible Days");
        _configuration.dataText = getDefaultAnyString(_configuration.dataText, "Data");
        _configuration.colorRangesText = getDefaultAnyString(_configuration.colorRangesText, "Color Ranges");
        _configuration.yearText = getDefaultAnyString(_configuration.yearText, "Year");
        _configuration.daysText = getDefaultAnyString(_configuration.daysText, "Days");
        _configuration.noDaysDataMessage = getDefaultAnyString(_configuration.noDaysDataMessage, "There are currently no days to view.");
    }
    function buildDefaultConfigurationArrays() {
        if (isInvalidOptionArray(_configuration.monthNames, 12)) {
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
        if (isInvalidOptionArray(_configuration.dayNames, 7)) {
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
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public API Functions:
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    var _public = {
        /*
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         * Public Functions:  Manage Dates
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         */
        addDates: function (elementId, dates, type, triggerRefresh) {
            if (triggerRefresh === void 0) { triggerRefresh = true; }
            if (isDefinedString(elementId) && isDefinedArray(dates) && _elements_DateCounts.hasOwnProperty(elementId)) {
                var bindingOptions = _elements_DateCounts[elementId].options;
                if (!bindingOptions._currentView.isInFetchMode) {
                    type = getDefaultString(type, _configuration.unknownTrendText);
                    var datesLength = dates.length;
                    for (var dateIndex = 0; dateIndex < datesLength; dateIndex++) {
                        _public.addDate(elementId, dates[dateIndex], type, false);
                    }
                    if (triggerRefresh) {
                        renderControlContainer(bindingOptions, true);
                    }
                }
            }
            return _public;
        },
        addDate: function (elementId, date, type, triggerRefresh) {
            if (triggerRefresh === void 0) { triggerRefresh = true; }
            if (isDefinedString(elementId) && isDefinedDate(date) && _elements_DateCounts.hasOwnProperty(elementId)) {
                var bindingOptions = _elements_DateCounts[elementId].options;
                if (!bindingOptions._currentView.isInFetchMode) {
                    type = getDefaultString(type, _configuration.unknownTrendText);
                    var storageDate = toStorageDate(date);
                    if (!_elements_DateCounts[elementId].type.hasOwnProperty(type)) {
                        _elements_DateCounts[elementId].type[type] = {};
                        _elements_DateCounts[elementId].types++;
                    }
                    if (!_elements_DateCounts[elementId].type[type].hasOwnProperty(storageDate)) {
                        _elements_DateCounts[elementId].type[type][storageDate] = 0;
                    }
                    _elements_DateCounts[elementId].type[type][storageDate]++;
                    fireCustomTrigger(bindingOptions.events.onAdd, bindingOptions._currentView.element);
                    if (triggerRefresh) {
                        renderControlContainer(bindingOptions, true);
                    }
                }
            }
            return _public;
        },
        updateDate: function (elementId, date, count, type, triggerRefresh) {
            if (triggerRefresh === void 0) { triggerRefresh = true; }
            if (isDefinedString(elementId) && isDefinedDate(date) && _elements_DateCounts.hasOwnProperty(elementId)) {
                var bindingOptions = _elements_DateCounts[elementId].options;
                if (!bindingOptions._currentView.isInFetchMode && count > 0) {
                    type = getDefaultString(type, _configuration.unknownTrendText);
                    var storageDate = toStorageDate(date);
                    if (_elements_DateCounts[elementId].type.hasOwnProperty(type)) {
                        _elements_DateCounts[elementId].type[type][storageDate] = count;
                        fireCustomTrigger(bindingOptions.events.onUpdate, bindingOptions._currentView.element);
                        if (triggerRefresh) {
                            renderControlContainer(bindingOptions, true);
                        }
                    }
                }
            }
            return _public;
        },
        removeDates: function (elementId, dates, type, triggerRefresh) {
            if (triggerRefresh === void 0) { triggerRefresh = true; }
            if (isDefinedString(elementId) && isDefinedArray(dates) && _elements_DateCounts.hasOwnProperty(elementId)) {
                var bindingOptions = _elements_DateCounts[elementId].options;
                if (!bindingOptions._currentView.isInFetchMode) {
                    type = getDefaultString(type, _configuration.unknownTrendText);
                    var datesLength = dates.length;
                    for (var dateIndex = 0; dateIndex < datesLength; dateIndex++) {
                        _public.removeDate(elementId, dates[dateIndex], type, false);
                    }
                    if (triggerRefresh) {
                        renderControlContainer(bindingOptions, true);
                    }
                }
            }
            return _public;
        },
        removeDate: function (elementId, date, type, triggerRefresh) {
            if (triggerRefresh === void 0) { triggerRefresh = true; }
            if (isDefinedString(elementId) && isDefinedDate(date) && _elements_DateCounts.hasOwnProperty(elementId)) {
                var bindingOptions = _elements_DateCounts[elementId].options;
                if (!bindingOptions._currentView.isInFetchMode) {
                    type = getDefaultString(type, _configuration.unknownTrendText);
                    var storageDate = toStorageDate(date);
                    if (_elements_DateCounts[elementId].type.hasOwnProperty(type) && _elements_DateCounts[elementId].type[type].hasOwnProperty(storageDate)) {
                        if (_elements_DateCounts[elementId].type[type][storageDate] > 0) {
                            _elements_DateCounts[elementId].type[type][storageDate]--;
                        }
                        fireCustomTrigger(bindingOptions.events.onRemove, bindingOptions._currentView.element);
                        if (triggerRefresh) {
                            renderControlContainer(bindingOptions, true);
                        }
                    }
                }
            }
            return _public;
        },
        clearDate: function (elementId, date, type, triggerRefresh) {
            if (triggerRefresh === void 0) { triggerRefresh = true; }
            if (isDefinedString(elementId) && isDefinedDate(date) && _elements_DateCounts.hasOwnProperty(elementId)) {
                var bindingOptions = _elements_DateCounts[elementId].options;
                if (!bindingOptions._currentView.isInFetchMode) {
                    type = getDefaultString(type, _configuration.unknownTrendText);
                    var storageDate = toStorageDate(date);
                    if (_elements_DateCounts[elementId].type.hasOwnProperty(type) && _elements_DateCounts[elementId].type[type].hasOwnProperty(storageDate)) {
                        delete _elements_DateCounts[elementId].type[type][storageDate];
                        fireCustomTrigger(bindingOptions.events.onClear, bindingOptions._currentView.element);
                        if (triggerRefresh) {
                            renderControlContainer(bindingOptions, true);
                        }
                    }
                }
            }
            return _public;
        },
        resetAll: function (triggerRefresh) {
            if (triggerRefresh === void 0) { triggerRefresh = true; }
            for (var elementId in _elements_DateCounts) {
                if (_elements_DateCounts.hasOwnProperty(elementId)) {
                    _public.reset(elementId, triggerRefresh);
                }
            }
            return _public;
        },
        reset: function (elementId, triggerRefresh) {
            if (triggerRefresh === void 0) { triggerRefresh = true; }
            if (isDefinedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId)) {
                var bindingOptions = _elements_DateCounts[elementId].options;
                if (!bindingOptions._currentView.isInFetchMode) {
                    bindingOptions._currentView.type = _configuration.unknownTrendText;
                    createDateStorageForElement(elementId, bindingOptions, false);
                    fireCustomTrigger(bindingOptions.events.onReset, bindingOptions._currentView.element);
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
        import: function (elementId, files) {
            if (isDefinedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId) && isDefinedArray(files)) {
                importFromFiles(files, _elements_DateCounts[elementId].options);
            }
            return _public;
        },
        export: function (elementId, exportType) {
            if (isDefinedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId)) {
                exportAllData(_elements_DateCounts[elementId].options, exportType);
            }
            return _public;
        },
        /*
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         * Public Functions:  Manage Instances
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         */
        refresh: function (elementId) {
            if (isDefinedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId)) {
                var bindingOptions = _elements_DateCounts[elementId].options;
                renderControlContainer(bindingOptions, true);
                fireCustomTrigger(bindingOptions.events.onRefresh, bindingOptions._currentView.element);
            }
            return _public;
        },
        refreshAll: function () {
            for (var elementId in _elements_DateCounts) {
                if (_elements_DateCounts.hasOwnProperty(elementId)) {
                    var bindingOptions = _elements_DateCounts[elementId].options;
                    renderControlContainer(bindingOptions, true);
                    fireCustomTrigger(bindingOptions.events.onRefresh, bindingOptions._currentView.element);
                }
            }
            return _public;
        },
        setYear: function (elementId, year) {
            if (isDefinedString(elementId) && isDefinedNumber(year) && _elements_DateCounts.hasOwnProperty(elementId)) {
                var bindingOptions = _elements_DateCounts[elementId].options;
                bindingOptions._currentView.year = year;
                if (!isYearVisible(bindingOptions, bindingOptions._currentView.year)) {
                    moveToNextYear(bindingOptions, false);
                }
                else {
                    renderControlContainer(bindingOptions);
                }
                fireCustomTrigger(bindingOptions.events.onSetYear, bindingOptions._currentView.year);
            }
            return _public;
        },
        setYearToHighest: function (elementId) {
            if (isDefinedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId)) {
                var bindingOptions = _elements_DateCounts[elementId].options;
                var data = getCurrentViewData(bindingOptions);
                var maximumYear = 0;
                for (var storageDate in data) {
                    if (data.hasOwnProperty(storageDate)) {
                        maximumYear = mathObject.max(maximumYear, parseInt(getStorageDateYear(storageDate)));
                    }
                }
                if (maximumYear > 0) {
                    bindingOptions._currentView.year = maximumYear;
                    if (!isYearVisible(bindingOptions, bindingOptions._currentView.year)) {
                        moveToNextYear(bindingOptions, false);
                    }
                    else {
                        renderControlContainer(bindingOptions);
                    }
                    fireCustomTrigger(bindingOptions.events.onSetYear, bindingOptions._currentView.year);
                }
            }
            return _public;
        },
        setYearToLowest: function (elementId) {
            if (isDefinedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId)) {
                var bindingOptions = _elements_DateCounts[elementId].options;
                var data = getCurrentViewData(bindingOptions);
                var minimumYear = 9999;
                for (var storageDate in data) {
                    if (data.hasOwnProperty(storageDate)) {
                        minimumYear = mathObject.min(minimumYear, parseInt(getStorageDateYear(storageDate)));
                    }
                }
                if (minimumYear < 9999) {
                    bindingOptions._currentView.year = minimumYear;
                    if (!isYearVisible(bindingOptions, bindingOptions._currentView.year)) {
                        moveToPreviousYear(bindingOptions, false);
                    }
                    else {
                        renderControlContainer(bindingOptions);
                    }
                    fireCustomTrigger(bindingOptions.events.onSetYear, bindingOptions._currentView.year);
                }
            }
            return _public;
        },
        moveToPreviousYear: function (elementId) {
            if (isDefinedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId)) {
                moveToPreviousYear(_elements_DateCounts[elementId].options);
            }
            return _public;
        },
        moveToNextYear: function (elementId) {
            if (isDefinedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId)) {
                moveToNextYear(_elements_DateCounts[elementId].options);
            }
            return _public;
        },
        moveToCurrentYear: function (elementId) {
            if (isDefinedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId)) {
                var bindingOptions = _elements_DateCounts[elementId].options;
                bindingOptions._currentView.year = new Date().getFullYear();
                if (!isYearVisible(bindingOptions, bindingOptions._currentView.year)) {
                    moveToNextYear(bindingOptions, false);
                }
                else {
                    renderControlContainer(bindingOptions);
                }
                fireCustomTrigger(bindingOptions.events.onSetYear, bindingOptions._currentView.year);
            }
            return _public;
        },
        getYear: function (elementId) {
            var result = null;
            if (isDefinedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId)) {
                var bindingOptions = _elements_DateCounts[elementId].options;
                result = bindingOptions._currentView.year;
            }
            return result;
        },
        render: function (element, options) {
            if (isDefinedObject(element) && isDefinedObject(options)) {
                renderControl(renderBindingOptions(options, element));
            }
            return _public;
        },
        renderAll: function () {
            render();
            return _public;
        },
        switchView: function (elementId, viewName) {
            if (isDefinedString(elementId) && isDefinedString(viewName) && _elements_DateCounts.hasOwnProperty(elementId)) {
                var bindingOptions = _elements_DateCounts[elementId].options;
                var view = null;
                if (viewName.toLowerCase() === VIEW_NAME.map) {
                    view = VIEW.map;
                }
                else if (viewName.toLowerCase() === VIEW_NAME.chart) {
                    view = VIEW.chart;
                }
                else if (viewName.toLowerCase() === VIEW_NAME.days) {
                    view = VIEW.days;
                }
                else if (viewName.toLowerCase() === VIEW_NAME.statistics) {
                    view = VIEW.statistics;
                }
                if (isDefinedNumber(view)) {
                    bindingOptions._currentView.view = view;
                    fireCustomTrigger(bindingOptions.events.onViewSwitch, viewName);
                    renderControlContainer(bindingOptions, false, true);
                }
            }
            return _public;
        },
        switchType: function (elementId, type) {
            if (isDefinedString(elementId) && isDefinedString(type) && _elements_DateCounts.hasOwnProperty(elementId) && _elements_DateCounts[elementId].type.hasOwnProperty(type)) {
                var bindingOptions = _elements_DateCounts[elementId].options;
                if (bindingOptions._currentView.type !== type) {
                    bindingOptions._currentView.type = type;
                    fireCustomTrigger(bindingOptions.events.onTypeSwitch, type);
                    renderControlContainer(bindingOptions);
                }
            }
            return _public;
        },
        updateOptions: function (elementId, newOptions) {
            if (isDefinedString(elementId) && isDefinedObject(newOptions) && _elements_DateCounts.hasOwnProperty(elementId)) {
                var bindingOptions = _elements_DateCounts[elementId].options;
                var newBindingOptions = buildAttributeOptions(newOptions);
                var optionChanged = false;
                for (var propertyName in newBindingOptions) {
                    if (newBindingOptions.hasOwnProperty(propertyName) && bindingOptions.hasOwnProperty(propertyName) && bindingOptions[propertyName] !== newBindingOptions[propertyName]) {
                        bindingOptions[propertyName] = newBindingOptions[propertyName];
                        optionChanged = true;
                    }
                }
                if (optionChanged) {
                    renderControlContainer(bindingOptions, true);
                    fireCustomTrigger(bindingOptions.events.onRefresh, bindingOptions._currentView.element);
                    fireCustomTrigger(bindingOptions.events.onOptionsUpdate, bindingOptions._currentView.element, bindingOptions);
                }
            }
            return _public;
        },
        /*
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         * Public Functions:  Destroying
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         */
        destroyAll: function () {
            for (var elementId in _elements_DateCounts) {
                if (_elements_DateCounts.hasOwnProperty(elementId)) {
                    destroyElement(_elements_DateCounts[elementId].options);
                }
            }
            _elements_DateCounts = {};
            return _public;
        },
        destroy: function (elementId) {
            if (isDefinedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId)) {
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
        setConfiguration: function (newConfiguration, triggerRefresh) {
            if (triggerRefresh === void 0) { triggerRefresh = true; }
            if (isDefinedObject(newConfiguration)) {
                var configurationHasChanged = false;
                for (var propertyName in newConfiguration) {
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
        getIds: function () {
            var result = [];
            for (var elementId in _elements_DateCounts) {
                if (_elements_DateCounts.hasOwnProperty(elementId)) {
                    result.push(elementId);
                }
            }
            return result;
        },
        getVersion: function () {
            return "4.0.0";
        }
    };
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Initialize Heat.js
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    (function () {
        buildDefaultConfiguration();
        documentObject.addEventListener("DOMContentLoaded", function () {
            render();
        });
        windowObject.addEventListener("pagehide", function () {
            cancelAllPullDataTimers();
        });
        if (!isDefined(windowObject.$heat)) {
            windowObject.$heat = _public;
        }
    })();
})(document, window, Math, JSON);
//# sourceMappingURL=heat.js.map