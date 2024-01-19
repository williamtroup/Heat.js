/*! Heat.js v1.2.0 | (c) Bunoon 2024 | MIT License */
(function() {
  function render() {
    var tagTypes = _configuration.domElementTypes;
    var tagTypesLength = tagTypes.length;
    var tagTypeIndex = 0;
    for (; tagTypeIndex < tagTypesLength; tagTypeIndex++) {
      var domElements = _parameter_Document.getElementsByTagName(tagTypes[tagTypeIndex]);
      var elements = [].slice.call(domElements);
      var elementsLength = elements.length;
      var elementIndex = 0;
      for (; elementIndex < elementsLength; elementIndex++) {
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
          bindingOptions = buildAttributeOptions(bindingOptions.result);
          bindingOptions.element = element;
          bindingOptions.currentView = {};
          bindingOptions.currentView.colorsVisible = {};
          bindingOptions.currentView.year = bindingOptions.year;
          bindingOptions.currentView.type = _elements_DateCounts_DefaultType;
          fireCustomTrigger(bindingOptions.onBeforeRender, element);
          if (!isDefinedString(element.id)) {
            element.id = newGuid();
          }
          element.removeAttribute(_attribute_Name_Options);
          createDateStorageForElement(element.id, bindingOptions);
          renderControl(bindingOptions);
          fireCustomTrigger(bindingOptions.onRenderComplete, element);
        } else {
          if (!_configuration.safeMode) {
            console.error("The attribute '" + _attribute_Name_Options + "' is not a valid object.");
            result = false;
          }
        }
      } else {
        if (!_configuration.safeMode) {
          console.error("The attribute '" + _attribute_Name_Options + "' has not been set correctly.");
          result = false;
        }
      }
    }
    return result;
  }
  function renderControl(bindingOptions) {
    bindingOptions.element.className = "heat-js";
    bindingOptions.element.innerHTML = _string.empty;
    renderControlTitleBar(bindingOptions);
    renderControlMap(bindingOptions);
  }
  function renderControlTitleBar(bindingOptions) {
    if (bindingOptions.showTitle || bindingOptions.showYearSelector || bindingOptions.showRefreshButton || bindingOptions.showExportButton) {
      var titleBar = createElement("div", "title-bar", bindingOptions.element);
      if (bindingOptions.showTitle) {
        createElementWithHTML(titleBar, "div", "title", bindingOptions.titleText);
      }
      if (bindingOptions.showExportButton) {
        var exportData = createElementWithHTML(titleBar, "button", "export", _configuration.exportButtonText);
        exportData.onclick = function() {
          exportAllData(bindingOptions);
          fireCustomTrigger(bindingOptions.onExport, bindingOptions.element);
        };
      }
      if (bindingOptions.showRefreshButton) {
        var refresh = createElementWithHTML(titleBar, "button", "refresh", _configuration.refreshButtonText);
        refresh.onclick = function() {
          renderControl(bindingOptions);
          fireCustomTrigger(bindingOptions.onRefresh, bindingOptions.element);
        };
      }
      if (bindingOptions.showYearSelector) {
        var back = createElementWithHTML(titleBar, "button", "back", _configuration.backButtonText);
        back.onclick = function() {
          bindingOptions.currentView.year--;
          renderControl(bindingOptions);
          fireCustomTrigger(bindingOptions.onBackYear, bindingOptions.currentView.year);
        };
        bindingOptions.currentView.yearText = createElementWithHTML(titleBar, "div", "year-text", bindingOptions.currentView.year);
        var next = createElementWithHTML(titleBar, "button", "next", _configuration.nextButtonText);
        next.onclick = function() {
          bindingOptions.currentView.year++;
          renderControl(bindingOptions);
          fireCustomTrigger(bindingOptions.onNextYear, bindingOptions.currentView.year);
        };
      }
    }
  }
  function renderControlMap(bindingOptions) {
    var mapContents = createElement("div", "map-contents", bindingOptions.element);
    var map = createElement("div", "map", mapContents);
    renderControlViewGuide(bindingOptions);
    var currentYear = bindingOptions.currentView.year;
    var monthAdded = false;
    if (bindingOptions.showDayNames) {
      var days = createElement("div", "days", map);
      if (!bindingOptions.showMonthNames || bindingOptions.placeMonthNamesOnTheBottom) {
        days.style.paddingTop = "0px";
        days.style.marginTop = !bindingOptions.placeMonthNamesOnTheBottom ? "-5px" : "-2px";
      }
      var dayNameIndex = 0;
      for (; dayNameIndex < 7; dayNameIndex++) {
        if (bindingOptions.daysToShow.indexOf(dayNameIndex + 1) > -1) {
          createElementWithHTML(days, "div", "day-name", _configuration.dayNames[dayNameIndex]);
        }
      }
    }
    var months = createElement("div", "months", map);
    var mapRangeColors = bindingOptions.mapRangeColors.sort(function(a, b) {
      return b.range - a.range;
    });
    var monthIndex = 0;
    for (; monthIndex < 12; monthIndex++) {
      if (bindingOptions.monthsToShow.indexOf(monthIndex + 1) > -1) {
        var month = createElement("div", "month", months);
        if (bindingOptions.showMonthNames && !bindingOptions.placeMonthNamesOnTheBottom) {
          createElementWithHTML(month, "div", "month-name", _configuration.monthNames[monthIndex]);
        }
        var dayColumns = createElement("div", "day-columns", month);
        var totalDaysInMonth = getTotalDaysInMonth(currentYear, monthIndex);
        var currentDayColumn = createElement("div", "day-column", dayColumns);
        var startFillingDays = false;
        var firstDayInMonth = new Date(currentYear, monthIndex, 1);
        var firstDayNumberInMonth = getWeekdayNumber(firstDayInMonth);
        var actualDay = 1;
        totalDaysInMonth = totalDaysInMonth + firstDayNumberInMonth;
        var dayIndex = 0;
        for (; dayIndex < totalDaysInMonth; dayIndex++) {
          if (dayIndex >= firstDayNumberInMonth) {
            startFillingDays = true;
          } else {
            createElement("div", "day-disabled", currentDayColumn);
          }
          if (startFillingDays) {
            if (bindingOptions.daysToShow.indexOf(actualDay) > -1) {
              renderControlViewMonthDay(bindingOptions, currentDayColumn, dayIndex - firstDayNumberInMonth, monthIndex, currentYear, mapRangeColors);
            }
            if ((dayIndex + 1) % 7 === 0) {
              currentDayColumn = createElement("div", "day-column", dayColumns);
              actualDay = 0;
            }
          }
          actualDay++;
        }
        if (bindingOptions.showMonthNames && bindingOptions.placeMonthNamesOnTheBottom) {
          createElementWithHTML(month, "div", "month-name-bottom", _configuration.monthNames[monthIndex]);
        }
        if (monthAdded && isDefined(_elements_Day_Width)) {
          if (firstDayNumberInMonth > 0 && !bindingOptions.showMonthDayGaps) {
            month.style.marginLeft = -_elements_Day_Width + "px";
          } else if (firstDayNumberInMonth === 0 && bindingOptions.showMonthDayGaps) {
            month.style.marginLeft = _elements_Day_Width + "px";
          }
        }
        monthAdded = true;
      }
    }
  }
  function renderControlViewMonthDay(bindingOptions, currentDayColumn, dayNumber, month, year, mapRangeColors) {
    var actualDay = dayNumber + 1;
    var day = createElement("div", "day", currentDayColumn);
    var date = new Date(year, month, actualDay);
    var dateCount = _elements_DateCounts[bindingOptions.element.id].type[bindingOptions.currentView.type][toStorageDate(date)];
    dateCount = isDefinedNumber(dateCount) ? dateCount : 0;
    day.title = getCustomFormattedDateText(bindingOptions.dayToolTipText, date);
    if (isDefinedFunction(bindingOptions.onDayClick)) {
      day.onclick = function() {
        fireCustomTrigger(bindingOptions.onDayClick, date, dateCount);
      };
    }
    var mapRangeColorsLength = bindingOptions.mapRangeColors.length;
    var useMapRangeColor = null;
    var mapRangeColorsIndex = 0;
    for (; mapRangeColorsIndex < mapRangeColorsLength; mapRangeColorsIndex++) {
      var mapRangeColor = mapRangeColors[mapRangeColorsIndex];
      if (dateCount >= mapRangeColor.minimum) {
        useMapRangeColor = mapRangeColor;
      } else {
        break;
      }
    }
    if (isDefined(useMapRangeColor) && isHeatMapColorVisible(bindingOptions, useMapRangeColor.id)) {
      day.className += _string.space + useMapRangeColor.cssClassName;
    }
    if (!isDefined(_elements_Day_Width)) {
      var marginLeft = getStyleValueByName(day, "margin-left", true);
      var marginRight = getStyleValueByName(day, "margin-right", true);
      _elements_Day_Width = day.offsetWidth + marginLeft + marginRight;
    }
  }
  function renderControlViewGuide(bindingOptions) {
    var guide = createElement("div", "guide", bindingOptions.element);
    var mapTypes = createElement("div", "map-types", guide);
    var noneTypeCount = 0;
    var storageDate;
    for (storageDate in _elements_DateCounts[bindingOptions.element.id].type[_elements_DateCounts_DefaultType]) {
      if (_elements_DateCounts[bindingOptions.element.id].type[_elements_DateCounts_DefaultType].hasOwnProperty(storageDate)) {
        noneTypeCount++;
        break;
      }
    }
    if (_elements_DateCounts[bindingOptions.element.id].types > 1) {
      var type;
      for (type in _elements_DateCounts[bindingOptions.element.id].type) {
        if (type !== _elements_DateCounts_DefaultType || noneTypeCount > 0) {
          if (noneTypeCount === 0 && bindingOptions.currentView.type === _elements_DateCounts_DefaultType) {
            bindingOptions.currentView.type = type;
          }
          renderControlViewGuideTypeButton(bindingOptions, mapTypes, type);
        }
      }
    }
    if (bindingOptions.showGuide) {
      var mapToggles = createElement("div", "map-toggles", guide);
      var lessText = createElementWithHTML(mapToggles, "div", "less-text", _configuration.lessText);
      if (bindingOptions.mapTogglesEnabled) {
        lessText.onclick = function() {
          updateMapRangeColorToggles(bindingOptions, false);
        };
      } else {
        lessText.className += _string.space + "no-click";
      }
      var days = createElement("div", "days", mapToggles);
      var mapRangeColors = bindingOptions.mapRangeColors.sort(function(a, b) {
        return b.range - a.range;
      });
      var mapRangeColorsLength = mapRangeColors.length;
      var mapRangeColorsIndex = 0;
      for (; mapRangeColorsIndex < mapRangeColorsLength; mapRangeColorsIndex++) {
        renderControlViewGuideDay(bindingOptions, days, mapRangeColors[mapRangeColorsIndex]);
      }
      var moreText = createElementWithHTML(mapToggles, "div", "more-text", _configuration.moreText);
      if (bindingOptions.mapTogglesEnabled) {
        moreText.onclick = function() {
          updateMapRangeColorToggles(bindingOptions, true);
        };
      } else {
        moreText.className += _string.space + "no-click";
      }
    }
  }
  function renderControlViewGuideTypeButton(bindingOptions, mapTypes, type) {
    var typeButton = createElementWithHTML(mapTypes, "button", "type", type);
    if (bindingOptions.currentView.type === type) {
      typeButton.className += _string.space + "active";
    }
    typeButton.onclick = function() {
      if (bindingOptions.currentView.type !== type) {
        bindingOptions.currentView.type = type;
        fireCustomTrigger(bindingOptions.onTypeSwitch, type);
        renderControl(bindingOptions);
      }
    };
  }
  function renderControlViewGuideDay(bindingOptions, days, mapRangeColor) {
    var day = createElement("div", null, days);
    day.title = mapRangeColor.tooltipText;
    if (isHeatMapColorVisible(bindingOptions, mapRangeColor.id)) {
      day.className = "day " + mapRangeColor.cssClassName;
    } else {
      day.className = "day";
    }
    if (bindingOptions.mapTogglesEnabled) {
      day.onclick = function() {
        if (!bindingOptions.currentView.colorsVisible.hasOwnProperty(mapRangeColor.id)) {
          bindingOptions.currentView.colorsVisible[mapRangeColor.id] = true;
        }
        if (bindingOptions.currentView.colorsVisible[mapRangeColor.id]) {
          day.className = "day";
        } else {
          day.className = "day " + mapRangeColor.cssClassName;
        }
        bindingOptions.currentView.colorsVisible[mapRangeColor.id] = !bindingOptions.currentView.colorsVisible[mapRangeColor.id];
        renderControl(bindingOptions);
      };
    } else {
      day.className += _string.space + "no-click";
    }
  }
  function isHeatMapColorVisible(bindingOptions, id) {
    return !bindingOptions.currentView.colorsVisible.hasOwnProperty(id) || bindingOptions.currentView.colorsVisible[id];
  }
  function createDateStorageForElement(elementId, bindingOptions) {
    _elements_DateCounts[elementId] = {options:bindingOptions, type:{}, types:1};
    _elements_DateCounts[elementId].type[_elements_DateCounts_DefaultType] = {};
  }
  function updateMapRangeColorToggles(bindingOptions, flag) {
    var mapRangeColorsLength = bindingOptions.mapRangeColors.length;
    var mapRangeColorsIndex = 0;
    for (; mapRangeColorsIndex < mapRangeColorsLength; mapRangeColorsIndex++) {
      bindingOptions.currentView.colorsVisible[bindingOptions.mapRangeColors[mapRangeColorsIndex].id] = flag;
    }
    renderControl(bindingOptions);
  }
  function exportAllData(bindingOptions) {
    var csvContents = getCsvContent(bindingOptions);
    if (csvContents !== _string.empty) {
      var tempLink = createElement("a", null, _parameter_Document.body);
      tempLink.style.display = "none";
      tempLink.setAttribute("target", "_blank");
      tempLink.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(csvContents));
      tempLink.setAttribute("download", getCsvFilename(bindingOptions));
      tempLink.click();
      _parameter_Document.body.removeChild(tempLink);
    }
  }
  function getCsvContent(bindingOptions) {
    var csvData = _elements_DateCounts[bindingOptions.element.id].type[bindingOptions.currentView.type];
    var csvContents = [];
    var csvStorageDates = [];
    csvContents.push(getCsvValueLine([getCsvValue(_configuration.dateText), getCsvValue(_configuration.countText)]));
    var storageDate1;
    for (storageDate1 in csvData) {
      if (csvData.hasOwnProperty(storageDate1)) {
        csvStorageDates.push(storageDate1);
      }
    }
    csvStorageDates.sort();
    if (bindingOptions.exportOnlyYearBeingViewed) {
      var monthIndex = 0;
      for (; monthIndex < 12; monthIndex++) {
        var totalDaysInMonth = getTotalDaysInMonth(bindingOptions.currentView.year, monthIndex);
        var dayIndex = 0;
        for (; dayIndex < totalDaysInMonth; dayIndex++) {
          var storageDate2 = toStorageDate(new Date(bindingOptions.currentView.year, monthIndex, dayIndex + 1));
          if (csvData.hasOwnProperty(storageDate2)) {
            csvContents.push(getCsvValueLine([getCsvValue(storageDate2), getCsvValue(csvData[storageDate2])]));
          }
        }
      }
    } else {
      var csvStorageDatesLength = csvStorageDates.length;
      var csvStorageDateIndex = 0;
      for (; csvStorageDateIndex < csvStorageDatesLength; csvStorageDateIndex++) {
        var storageDate3 = csvStorageDates[csvStorageDateIndex];
        if (csvData.hasOwnProperty(storageDate3)) {
          csvContents.push(getCsvValueLine([getCsvValue(storageDate3), getCsvValue(csvData[storageDate3])]));
        }
      }
    }
    return csvContents.join(_string.newLine);
  }
  function getCsvFilename(bindingOptions) {
    var date = new Date();
    var datePart = padNumber(date.getDate()) + "-" + padNumber(date.getMonth() + 1) + "-" + date.getFullYear();
    var timePart = padNumber(date.getHours()) + "-" + padNumber(date.getMinutes());
    var filenameStart = _string.empty;
    if (bindingOptions.currentView.type !== _elements_DateCounts_DefaultType) {
      filenameStart = bindingOptions.currentView.type.toLowerCase().replace(_string.space, "_") + "_";
    }
    return filenameStart + datePart + "_" + timePart + ".csv";
  }
  function getCsvValue(text) {
    text = text.toString().replace(/(\r\n|\n|\r)/gm, _string.empty).replace(/(\s\s)/gm, _string.space);
    text = text.replace(/"/g, '""');
    text = '"' + text + '"';
    return text;
  }
  function getCsvValueLine(csvValues) {
    return csvValues.join(",");
  }
  function buildAttributeOptions(newOptions) {
    var options = !isDefinedObject(newOptions) ? {} : newOptions;
    options.showDayNames = getDefaultBoolean(options.showDayNames, true);
    options.showGuide = getDefaultBoolean(options.showGuide, true);
    options.showTitle = getDefaultBoolean(options.showTitle, true);
    options.showYearSelector = getDefaultBoolean(options.showYearSelector, true);
    options.showMonthDayGaps = getDefaultBoolean(options.showMonthDayGaps, true);
    options.showRefreshButton = getDefaultBoolean(options.showRefreshButton, false);
    options.showMonthNames = getDefaultBoolean(options.showMonthNames, true);
    options.showExportButton = getDefaultBoolean(options.showExportButton, false);
    options.mapTogglesEnabled = getDefaultBoolean(options.mapTogglesEnabled, true);
    options.placeMonthNamesOnTheBottom = getDefaultBoolean(options.placeMonthNamesOnTheBottom, false);
    options.exportOnlyYearBeingViewed = getDefaultBoolean(options.exportOnlyYearBeingViewed, true);
    options.year = getDefaultNumber(options.year, (new Date()).getFullYear());
    if (isInvalidOptionArray(options.monthsToShow)) {
      options.monthsToShow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    }
    if (isInvalidOptionArray(options.daysToShow)) {
      options.daysToShow = [1, 2, 3, 4, 5, 6, 7];
    }
    options.mapRangeColors = getDefaultArray(options.mapRangeColors, [{minimum:10, cssClassName:"day-color-1", tooltipText:"Day Color 1"}, {minimum:15, cssClassName:"day-color-2", tooltipText:"Day Color 2"}, {minimum:20, cssClassName:"day-color-3", tooltipText:"Day Color 3"}, {minimum:25, cssClassName:"day-color-4", tooltipText:"Day Color 4"}]);
    var mapRangeColorsLength = options.mapRangeColors.length;
    var mapRangeColorsIndex = 0;
    for (; mapRangeColorsIndex < mapRangeColorsLength; mapRangeColorsIndex++) {
      if (!isDefinedString(options.mapRangeColors[mapRangeColorsIndex].id)) {
        options.mapRangeColors[mapRangeColorsIndex].id = newGuid();
      }
    }
    options = buildAttributeOptionStrings(options);
    return buildAttributeOptionCustomTriggers(options);
  }
  function buildAttributeOptionStrings(options) {
    options.titleText = getDefaultString(options.titleText, "Heat.js");
    options.dayToolTipText = getDefaultString(options.dayToolTipText, "{d}{o} {mmmm} {yyyy}");
    return options;
  }
  function buildAttributeOptionCustomTriggers(options) {
    options.onDayClick = getDefaultFunction(options.onDayClick, null);
    options.onBackYear = getDefaultFunction(options.onBackYear, null);
    options.onNextYear = getDefaultFunction(options.onNextYear, null);
    options.onRefresh = getDefaultFunction(options.onRefresh, null);
    options.onBeforeRender = getDefaultFunction(options.onBeforeRender, null);
    options.onRenderComplete = getDefaultFunction(options.onRenderComplete, null);
    options.onDestroy = getDefaultFunction(options.onDestroy, null);
    options.onExport = getDefaultFunction(options.onExport, null);
    options.onSetYear = getDefaultFunction(options.onSetYear, null);
    options.onTypeSwitch = getDefaultFunction(options.onTypeSwitch, null);
    return options;
  }
  function getTotalDaysInMonth(year, month) {
    return (new Date(year, month + 1, 0)).getDate();
  }
  function getWeekdayNumber(date) {
    return date.getDay() - 1 < 0 ? 6 : date.getDay() - 1;
  }
  function getDayOrdinal(value) {
    var result = _configuration.thText;
    if (value === 31 || value === 21 || value === 1) {
      result = _configuration.stText;
    } else if (value === 22 || value === 2) {
      result = _configuration.ndText;
    } else if (value === 23 || value === 3) {
      result = _configuration.rdText;
    }
    return result;
  }
  function getCustomFormattedDateText(dateFormat, date) {
    var result = dateFormat;
    var weekDayNumber = getWeekdayNumber(date);
    result = result.replace("{dddd}", _configuration.dayNames[weekDayNumber]);
    result = result.replace("{dd}", padNumber(date.getDate()));
    result = result.replace("{d}", date.getDate());
    result = result.replace("{o}", getDayOrdinal(date.getDate()));
    result = result.replace("{mmmm}", _configuration.monthNames[date.getMonth()]);
    result = result.replace("{mm}", padNumber(date.getMonth() + 1));
    result = result.replace("{m}", date.getMonth() + 1);
    result = result.replace("{yyyy}", date.getFullYear());
    result = result.replace("{yyy}", date.getFullYear().toString().substring(1));
    result = result.replace("{yy}", date.getFullYear().toString().substring(2));
    result = result.replace("{y}", parseInt(date.getFullYear().toString().substring(2)).toString());
    return result;
  }
  function isDefined(value) {
    return value !== null && value !== undefined && value !== _string.empty;
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
  function createElement(type, className, container) {
    var result = null;
    var nodeType = type.toLowerCase();
    var isText = nodeType === "text";
    if (!_elements_Type.hasOwnProperty(nodeType)) {
      _elements_Type[nodeType] = isText ? _parameter_Document.createTextNode(_string.empty) : _parameter_Document.createElement(nodeType);
    }
    result = _elements_Type[nodeType].cloneNode(false);
    if (isDefined(className)) {
      result.className = className;
    }
    if (isDefined(container)) {
      container.appendChild(result);
    }
    return result;
  }
  function createElementWithHTML(container, type, className, html) {
    var element = createElement(type, className, container);
    element.innerHTML = html;
    return element;
  }
  function getStyleValueByName(element, stylePropertyName, toNumber) {
    var value = null;
    toNumber = isDefined(toNumber) ? toNumber : false;
    if (_parameter_Window.getComputedStyle) {
      value = _parameter_Document.defaultView.getComputedStyle(element, null).getPropertyValue(stylePropertyName);
    } else if (element.currentStyle) {
      value = element.currentStyle[stylePropertyName];
    }
    if (toNumber) {
      value = parseFloat(value, 10);
    }
    return value;
  }
  function fireCustomTrigger(triggerFunction) {
    if (isDefinedFunction(triggerFunction)) {
      triggerFunction.apply(null, [].slice.call(arguments, 1));
    }
  }
  function getDefaultString(value, defaultValue) {
    return isDefinedString(value) ? value : defaultValue;
  }
  function getDefaultBoolean(value, defaultValue) {
    return isDefinedBoolean(value) ? value : defaultValue;
  }
  function getDefaultFunction(value, defaultValue) {
    return isDefinedFunction(value) ? value : defaultValue;
  }
  function getDefaultArray(value, defaultValue) {
    return isDefinedArray(value) ? value : defaultValue;
  }
  function getDefaultNumber(value, defaultValue) {
    return isDefinedNumber(value) ? value : defaultValue;
  }
  function getDefaultStringOrArray(value, defaultValue) {
    if (isDefinedString(value)) {
      value = value.split(_string.space);
      if (value.length === 0) {
        value = defaultValue;
      }
    } else {
      value = getDefaultArray(value, defaultValue);
    }
    return value;
  }
  function getObjectFromString(objectString) {
    var parsed = true;
    var result = null;
    try {
      if (isDefinedString(objectString)) {
        result = JSON.parse(objectString);
      }
    } catch (e1) {
      try {
        result = eval("(" + objectString + ")");
        if (isDefinedFunction(result)) {
          result = result();
        }
      } catch (e2) {
        if (!_configuration.safeMode) {
          console.error("Errors in object: " + e1.message + ", " + e2.message);
          parsed = false;
        }
        result = null;
      }
    }
    return {parsed:parsed, result:result};
  }
  function newGuid() {
    var result = [];
    var charIndex = 0;
    for (; charIndex < 32; charIndex++) {
      if (charIndex === 8 || charIndex === 12 || charIndex === 16 || charIndex === 20) {
        result.push("-");
      }
      var character = Math.floor(Math.random() * 16).toString(16);
      result.push(character);
    }
    return result.join(_string.empty);
  }
  function padNumber(number) {
    var numberString = number.toString();
    return numberString.length === 1 ? "0" + numberString : numberString;
  }
  function toStorageDate(date) {
    return date.getFullYear() + "-" + padNumber(date.getMonth() + 1) + "-" + padNumber(date.getDate());
  }
  function buildDefaultConfiguration() {
    _configuration.safeMode = getDefaultBoolean(_configuration.safeMode, true);
    _configuration.domElementTypes = getDefaultStringOrArray(_configuration.domElementTypes, ["*"]);
    buildDefaultConfigurationStrings();
    buildDefaultConfigurationArrays();
  }
  function buildDefaultConfigurationStrings() {
    _configuration.stText = getDefaultString(_configuration.stText, "st");
    _configuration.ndText = getDefaultString(_configuration.ndText, "nd");
    _configuration.rdText = getDefaultString(_configuration.rdText, "rd");
    _configuration.thText = getDefaultString(_configuration.thText, "th");
    _configuration.backButtonText = getDefaultString(_configuration.backButtonText, "Back");
    _configuration.nextButtonText = getDefaultString(_configuration.nextButtonText, "Next");
    _configuration.refreshButtonText = getDefaultString(_configuration.refreshButtonText, "Refresh");
    _configuration.exportButtonText = getDefaultString(_configuration.exportButtonText, "Export");
    _configuration.lessText = getDefaultString(_configuration.lessText, "Less");
    _configuration.moreText = getDefaultString(_configuration.moreText, "More");
    _configuration.dateText = getDefaultString(_configuration.dateText, "Date");
    _configuration.countText = getDefaultString(_configuration.countText, "Count");
  }
  function buildDefaultConfigurationArrays() {
    if (isInvalidOptionArray(_configuration.monthNames, 12)) {
      _configuration.monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    }
    if (isInvalidOptionArray(_configuration.dayNames, 7)) {
      _configuration.dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    }
  }
  function isInvalidOptionArray(array, minimumLength) {
    minimumLength = isDefinedNumber(minimumLength) ? minimumLength : 1;
    return !isDefinedArray(array) || array.length < minimumLength;
  }
  var _parameter_Document = null;
  var _parameter_Window = null;
  var _configuration = {};
  var _string = {empty:"", space:" ", newLine:"\n"};
  var _elements_Type = {};
  var _elements_Day_Width = null;
  var _elements_DateCounts = {};
  var _elements_DateCounts_DefaultType = "None";
  var _attribute_Name_Options = "data-heat-options";
  this.addDate = function(elementId, date, type, triggerRefresh) {
    if (_elements_DateCounts.hasOwnProperty(elementId)) {
      triggerRefresh = !isDefinedBoolean(triggerRefresh) ? true : triggerRefresh;
      type = !isDefinedString(type) ? _elements_DateCounts_DefaultType : type;
      var storageDate = toStorageDate(date);
      if (!_elements_DateCounts[elementId].type.hasOwnProperty(type)) {
        _elements_DateCounts[elementId].type[type] = {};
        _elements_DateCounts[elementId].types++;
      }
      if (!_elements_DateCounts[elementId].type[type].hasOwnProperty(storageDate)) {
        _elements_DateCounts[elementId].type[type][storageDate] = 0;
      }
      _elements_DateCounts[elementId].type[type][storageDate]++;
      if (triggerRefresh) {
        renderControl(_elements_DateCounts[elementId].options);
      }
    }
    return this;
  };
  this.removeDate = function(elementId, date, type, triggerRefresh) {
    if (_elements_DateCounts.hasOwnProperty(elementId)) {
      type = !isDefinedString(type) ? _elements_DateCounts_DefaultType : type;
      var storageDate = toStorageDate(date);
      if (_elements_DateCounts[elementId].type.hasOwnProperty(type) && _elements_DateCounts[elementId].type[type].hasOwnProperty(storageDate)) {
        triggerRefresh = !isDefinedBoolean(triggerRefresh) ? true : triggerRefresh;
        if (_elements_DateCounts[elementId].type[type][storageDate] > 0) {
          _elements_DateCounts[elementId].type[type][storageDate]--;
        }
        if (triggerRefresh) {
          renderControl(_elements_DateCounts[elementId].options);
        }
      }
    }
    return this;
  };
  this.reset = function(elementId, triggerRefresh) {
    if (_elements_DateCounts.hasOwnProperty(elementId)) {
      triggerRefresh = !isDefinedBoolean(triggerRefresh) ? true : triggerRefresh;
      var bindingOptions = _elements_DateCounts[elementId].options;
      bindingOptions.currentView.type = _elements_DateCounts_DefaultType;
      createDateStorageForElement(elementId, bindingOptions);
      if (triggerRefresh) {
        renderControl(_elements_DateCounts[elementId].options);
      }
    }
    return this;
  };
  this.refresh = function(elementId) {
    if (_elements_DateCounts.hasOwnProperty(elementId)) {
      var bindingOptions = _elements_DateCounts[elementId].options;
      renderControl(bindingOptions);
      fireCustomTrigger(bindingOptions.onRefresh, bindingOptions.element);
    }
    return this;
  };
  this.refreshAll = function() {
    var elementId;
    for (elementId in _elements_DateCounts) {
      if (_elements_DateCounts.hasOwnProperty(elementId)) {
        var bindingOptions = _elements_DateCounts[elementId].options;
        renderControl(bindingOptions);
        fireCustomTrigger(bindingOptions.onRefresh, bindingOptions.element);
      }
    }
    return this;
  };
  this.setYear = function(elementId, year) {
    if (_elements_DateCounts.hasOwnProperty(elementId)) {
      var bindingOptions = _elements_DateCounts[elementId].options;
      bindingOptions.currentView.year = year;
      renderControl(bindingOptions);
      fireCustomTrigger(bindingOptions.onSetYear, bindingOptions.currentView.year);
    }
    return this;
  };
  this.getYear = function(elementId) {
    var result = null;
    if (_elements_DateCounts.hasOwnProperty(elementId)) {
      var bindingOptions = _elements_DateCounts[elementId].options;
      result = bindingOptions.currentView.year;
    }
    return result;
  };
  this.destroyAll = function() {
    var elementId;
    for (elementId in _elements_DateCounts) {
      if (_elements_DateCounts.hasOwnProperty(elementId)) {
        var bindingOptions = _elements_DateCounts[elementId].options;
        bindingOptions.element.innerHTML = _string.empty;
        bindingOptions.element.className = _string.empty;
        fireCustomTrigger(bindingOptions.onDestroy, bindingOptions.element);
      }
    }
    _elements_DateCounts = {};
    return this;
  };
  this.destroy = function(elementId) {
    if (_elements_DateCounts.hasOwnProperty(elementId)) {
      var bindingOptions = _elements_DateCounts[elementId].options;
      bindingOptions.element.innerHTML = _string.empty;
      bindingOptions.element.className = _string.empty;
      fireCustomTrigger(bindingOptions.onDestroy, bindingOptions.element);
      delete _elements_DateCounts[elementId];
    }
    return this;
  };
  this.setConfiguration = function(newOptions) {
    _configuration = !isDefinedObject(newOptions) ? {} : newOptions;
    buildDefaultConfiguration();
    return this;
  };
  this.getVersion = function() {
    return "1.2.0";
  };
  (function(documentObject, windowObject) {
    _parameter_Document = documentObject;
    _parameter_Window = windowObject;
    buildDefaultConfiguration();
    _parameter_Document.addEventListener("DOMContentLoaded", function() {
      render();
    });
    if (!isDefined(_parameter_Window.$heat)) {
      _parameter_Window.$heat = this;
    }
  })(document, window);
})();