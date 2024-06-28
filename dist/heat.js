"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("./enums");
(function (documentObject, windowObject, mathObject, jsonObject) {
    // Variables: Configuration
    var _configuration = {};
    // Variables: Elements
    var _elements_Type = {};
    var _elements_Day_Width = null;
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
        return monthsToShow.indexOf(month + 1) > enums_1.VALUE.notFound;
    }
    function isDayVisible(daysToShow, day) {
        return daysToShow.indexOf(day) > enums_1.VALUE.notFound;
    }
    function getYearsAvailableInData(bindingOptions) {
        var years = [];
        if (bindingOptions.showOnlyDataForYearsAvailable) {
            var data = getCurrentViewData(bindingOptions);
            for (var storageDate in data) {
                if (data.hasOwnProperty(storageDate)) {
                    var year = parseInt(getStorageDateYear(storageDate));
                    if (years.indexOf(year) === enums_1.VALUE.notFound) {
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
        return bindingOptions.yearsToHide.indexOf(year) === enums_1.VALUE.notFound && (bindingOptions._currentView.yearsAvailable.length === 0 || bindingOptions._currentView.yearsAvailable.indexOf(year) > enums_1.VALUE.notFound);
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
                    // renderControlContainer( bindingOptions ); TODO: Enable
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
        //renderControlContainer( bindingOptions ); TODO: Enable
    }
    function toggleColorRangeVisibleState(bindingOptions, id) {
        var colorRangesLength = bindingOptions.colorRanges.length;
        for (var colorRangesIndex = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++) {
            var colorRange = bindingOptions.colorRanges[colorRangesIndex];
            if (colorRange.id === id) {
                colorRange.visible = !getDefaultBoolean(colorRange.visible, true);
                fireCustomTrigger(bindingOptions.events.onColorRangeTypeToggle, colorRange.id, colorRange.visible);
                //renderControlContainer( bindingOptions ); TODO: Enable
                break;
            }
        }
    }
    function getColorRange(bindingOptions, colorRanges, dateCount, date) {
        var useColorRange = null;
        if (isDefined(date) && isHoliday(bindingOptions, date).matched) {
            var newUseColorRange = {
                cssClassName: "holiday",
                id: _internal_Name_Holiday,
                visible: true,
                name: enums_1.STRING.empty,
                minimum: 0,
                mapCssClassName: enums_1.STRING.empty,
                chartCssClassName: enums_1.STRING.empty,
                statisticsCssClassName: enums_1.STRING.empty,
                tooltipText: enums_1.STRING.empty
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
        var holidayMatched = false;
        var holidayName = null;
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
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
     * Export
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    function exportAllData(bindingOptions, exportType) {
        var contents = null;
        var contentsMimeType = getExportMimeType(bindingOptions);
        var contentExportType = getDefaultString(exportType, bindingOptions.exportType).toLowerCase();
        if (contentExportType === enums_1.EXPORT_TYPE.csv) {
            contents = getCsvContent(bindingOptions);
        }
        else if (contentExportType === enums_1.EXPORT_TYPE.json) {
            contents = getJsonContent(bindingOptions);
        }
        else if (contentExportType === enums_1.EXPORT_TYPE.xml) {
            contents = getXmlContents(bindingOptions);
        }
        else if (contentExportType === enums_1.EXPORT_TYPE.txt) {
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
        return csvContents.join(enums_1.STRING.newLine);
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
        return contents.join(enums_1.STRING.newLine);
    }
    function getTxtContents(bindingOptions) {
        var data = getExportData(bindingOptions);
        var contents = [];
        for (var storageDate in data) {
            if (data.hasOwnProperty(storageDate)) {
                contents.push(storageDate + enums_1.STRING.colon + enums_1.STRING.space + data[storageDate].toString());
            }
        }
        return contents.join(enums_1.STRING.newLine);
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
        if (bindingOptions.exportType.toLowerCase() === enums_1.EXPORT_TYPE.csv) {
            result = "text/csv";
        }
        else if (bindingOptions.exportType.toLowerCase() === enums_1.EXPORT_TYPE.json) {
            result = "application/json";
        }
        else if (bindingOptions.exportType.toLowerCase() === enums_1.EXPORT_TYPE.xml) {
            result = "application/xml";
        }
        else if (bindingOptions.exportType.toLowerCase() === enums_1.EXPORT_TYPE.txt) {
            result = "text/plain";
        }
        return result;
    }
    function getExportFilename(bindingOptions) {
        var date = new Date();
        var datePart = padNumber(date.getDate()) + enums_1.STRING.dash + padNumber(date.getMonth() + 1) + enums_1.STRING.dash + date.getFullYear();
        var timePart = padNumber(date.getHours()) + enums_1.STRING.dash + padNumber(date.getMinutes());
        var filenameStart = enums_1.STRING.empty;
        if (bindingOptions._currentView.type !== _configuration.unknownTrendText) {
            filenameStart = bindingOptions._currentView.type.toLowerCase().replace(enums_1.STRING.space, enums_1.STRING.underscore) + enums_1.STRING.underscore;
        }
        return filenameStart + datePart + enums_1.STRING.underscore + timePart + "." + bindingOptions.exportType.toLowerCase();
    }
    function getCsvValue(text) {
        var result = text.toString().replace(/(\r\n|\n|\r)/gm, enums_1.STRING.empty).replace(/(\s\s)/gm, enums_1.STRING.space);
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
        options.view = getDefaultString(options.view, enums_1.VIEW_NAME.map);
        options.exportType = getDefaultString(options.exportType, enums_1.EXPORT_TYPE.csv);
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
                    mapCssClassName: enums_1.STRING.empty,
                    chartCssClassName: enums_1.STRING.empty,
                    statisticsCssClassName: enums_1.STRING.empty
                },
                {
                    id: newGuid(),
                    name: "Day Color 2",
                    minimum: 15,
                    cssClassName: "day-color-2",
                    tooltipText: "Day Color 2",
                    visible: true,
                    mapCssClassName: enums_1.STRING.empty,
                    chartCssClassName: enums_1.STRING.empty,
                    statisticsCssClassName: enums_1.STRING.empty
                },
                {
                    id: newGuid(),
                    name: "Day Color 3",
                    minimum: 20,
                    cssClassName: "day-color-3",
                    tooltipText: "Day Color 3",
                    visible: true,
                    mapCssClassName: enums_1.STRING.empty,
                    chartCssClassName: enums_1.STRING.empty,
                    statisticsCssClassName: enums_1.STRING.empty
                },
                {
                    id: newGuid(),
                    name: "Day Color 4",
                    minimum: 25,
                    cssClassName: "day-color-4",
                    tooltipText: "Day Color 4",
                    visible: true,
                    mapCssClassName: enums_1.STRING.empty,
                    chartCssClassName: enums_1.STRING.empty,
                    statisticsCssClassName: enums_1.STRING.empty
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
            _elements_Type[nodeType] = isText ? documentObject.createTextNode(enums_1.STRING.empty) : documentObject.createElement(nodeType);
        }
        result = _elements_Type[nodeType].cloneNode(false);
        return result;
    }
    function createElement(container, type, className, beforeNode) {
        if (className === void 0) { className = enums_1.STRING.empty; }
        if (beforeNode === void 0) { beforeNode = null; }
        var result = null;
        var nodeType = type.toLowerCase();
        var isText = nodeType === "text";
        if (!_elements_Type.hasOwnProperty(nodeType)) {
            _elements_Type[nodeType] = isText ? documentObject.createTextNode(enums_1.STRING.empty) : documentObject.createElement(nodeType);
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
        element.className += enums_1.STRING.space + className;
        element.className = element.className.trim();
    }
    function removeClass(element, className) {
        element.className = element.className.replace(className, enums_1.STRING.empty);
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
        return value !== null && value !== undefined && value.toString() !== enums_1.STRING.empty;
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
            var values = value.toString().split(enums_1.STRING.space);
            if (values.length === 0) {
                value = defaultValue;
            }
            else {
                result = values;
            }
        }
        else {
            value = getDefaultArray(value, defaultValue);
        }
        return value;
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
                result.push(enums_1.STRING.dash);
            }
            var character = mathObject.floor(mathObject.random() * 16).toString(16);
            result.push(character);
        }
        return result.join(enums_1.STRING.empty);
    }
    function padNumber(number) {
        var numberString = number.toString();
        return numberString.length === 1 ? enums_1.STRING.zero + numberString : numberString;
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
        return date.getFullYear() + enums_1.STRING.dash + padNumber(date.getMonth() + 1) + enums_1.STRING.dash + padNumber(date.getDate());
    }
    function getStorageDate(data) {
        return data.split(enums_1.STRING.dash);
    }
    function getStorageDateYear(data) {
        return data.split(enums_1.STRING.dash)[0];
    }
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Initialize Heat.js
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    (function () {
    })();
})(document, window, Math, JSON);
//# sourceMappingURL=heat.js.map