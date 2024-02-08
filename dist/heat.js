/*! Heat.js v2.0.0 | (c) Bunoon 2024 | MIT License */
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
          renderControl(renderBindingOptions(bindingOptions.result, element));
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
  function renderBindingOptions(data, element) {
    var bindingOptions = buildAttributeOptions(data);
    var view = !isDefinedString(bindingOptions.view) ? _string.empty : bindingOptions.view.toLowerCase();
    bindingOptions.currentView = {};
    bindingOptions.currentView.element = element;
    bindingOptions.currentView.tooltip = null;
    bindingOptions.currentView.tooltipTimer = null;
    bindingOptions.currentView.mapContents = null;
    bindingOptions.currentView.mapContentsScrollLeft = 0;
    bindingOptions.currentView.chartContents = null;
    bindingOptions.currentView.chartContentsScrollLeft = 0;
    bindingOptions.currentView.statisticsContents = null;
    bindingOptions.currentView.statisticsContentsScrollLeft = 0;
    bindingOptions.currentView.year = bindingOptions.year;
    bindingOptions.currentView.type = _elements_DateCounts_DefaultType;
    if (view === _elements_View_Name_Map) {
      bindingOptions.currentView.view = _elements_View_Map;
    } else if (view === _elements_View_Name_Chart) {
      bindingOptions.currentView.view = _elements_View_Chart;
    } else if (view === _elements_View_Name_Statistics) {
      bindingOptions.currentView.view = _elements_View_Statistics;
    } else {
      bindingOptions.currentView.view = _elements_View_Map;
    }
    return bindingOptions;
  }
  function renderControl(bindingOptions) {
    fireCustomTrigger(bindingOptions.onBeforeRender, bindingOptions.currentView.element);
    if (!isDefinedString(bindingOptions.currentView.element.id)) {
      bindingOptions.currentView.element.id = newGuid();
    }
    bindingOptions.currentView.element.removeAttribute(_attribute_Name_Options);
    createDateStorageForElement(bindingOptions.currentView.element.id, bindingOptions);
    renderControlContainer(bindingOptions);
    fireCustomTrigger(bindingOptions.onRenderComplete, bindingOptions.currentView.element);
  }
  function renderControlContainer(bindingOptions) {
    if (isDefined(bindingOptions.currentView.mapContents)) {
      bindingOptions.currentView.mapContentsScrollLeft = bindingOptions.currentView.mapContents.scrollLeft;
    }
    if (isDefined(bindingOptions.currentView.chartContents)) {
      bindingOptions.currentView.chartContentsScrollLeft = bindingOptions.currentView.chartContents.scrollLeft;
    }
    if (isDefined(bindingOptions.currentView.statisticsContents)) {
      bindingOptions.currentView.statisticsContentsScrollLeft = bindingOptions.currentView.statisticsContents.scrollLeft;
    }
    bindingOptions.currentView.element.className = "heat-js";
    bindingOptions.currentView.element.innerHTML = _string.empty;
    renderControlToolTip(bindingOptions);
    renderControlTitleBar(bindingOptions);
    renderControlMap(bindingOptions);
    renderControlChart(bindingOptions);
    renderControlStatistics(bindingOptions);
    bindingOptions.currentView.mapContents.style.display = "none";
    bindingOptions.currentView.chartContents.style.display = "none";
    bindingOptions.currentView.statisticsContents.style.display = "none";
    if (bindingOptions.currentView.view === _elements_View_Map) {
      bindingOptions.currentView.mapContents.style.display = "block";
    } else if (bindingOptions.currentView.view === _elements_View_Chart) {
      bindingOptions.currentView.chartContents.style.display = "block";
    } else if (bindingOptions.currentView.view === _elements_View_Statistics) {
      bindingOptions.currentView.statisticsContents.style.display = "block";
    } else {
      bindingOptions.currentView.chartContents.style.display = "block";
    }
  }
  function createDateStorageForElement(elementId, bindingOptions) {
    _elements_DateCounts[elementId] = {options:bindingOptions, type:{}, types:1};
    _elements_DateCounts[elementId].type[_elements_DateCounts_DefaultType] = {};
  }
  function getCurrentViewData(bindingOptions) {
    return _elements_DateCounts[bindingOptions.currentView.element.id].type[bindingOptions.currentView.type];
  }
  function isMonthVisible(monthsToShow, month) {
    return monthsToShow.indexOf(month + 1) > -1;
  }
  function isDayVisible(daysToShow, day) {
    return daysToShow.indexOf(day) > -1;
  }
  function renderControlToolTip(bindingOptions) {
    if (!isDefined(bindingOptions.currentView.tooltip)) {
      bindingOptions.currentView.tooltip = createElement(_parameter_Document.body, "div", "heat-js-tooltip");
      bindingOptions.currentView.tooltip.style.display = "none";
      _parameter_Document.body.addEventListener("mousemove", function() {
        hideToolTip(bindingOptions);
      });
      _parameter_Document.addEventListener("scroll", function() {
        hideToolTip(bindingOptions);
      });
    }
  }
  function addToolTip(element, bindingOptions, text) {
    if (element !== null) {
      element.onmousemove = function(e) {
        showToolTip(e, bindingOptions, text);
      };
    }
  }
  function showToolTip(e, bindingOptions, text) {
    cancelBubble(e);
    hideToolTip(bindingOptions);
    bindingOptions.currentView.tooltipTimer = setTimeout(function() {
      bindingOptions.currentView.tooltip.innerHTML = text;
      bindingOptions.currentView.tooltip.style.display = "block";
      showElementAtMousePosition(e, bindingOptions.currentView.tooltip);
    }, bindingOptions.tooltipDelay);
  }
  function hideToolTip(bindingOptions) {
    if (isDefined(bindingOptions.currentView.tooltip)) {
      if (isDefined(bindingOptions.currentView.tooltipTimer)) {
        clearTimeout(bindingOptions.currentView.tooltipTimer);
        bindingOptions.currentView.tooltipTimer = null;
      }
      if (bindingOptions.currentView.tooltip.style.display === "block") {
        bindingOptions.currentView.tooltip.style.display = "none";
      }
    }
  }
  function renderControlTitleBar(bindingOptions) {
    if (bindingOptions.showTitle || bindingOptions.showYearSelector || bindingOptions.showRefreshButton || bindingOptions.showExportButton) {
      var titleBar = createElement(bindingOptions.currentView.element, "div", "title-bar");
      var title = createElement(titleBar, "div", "title");
      createElement(title, "div", "down-arrow");
      if (bindingOptions.showTitle) {
        title.innerHTML += bindingOptions.titleText;
      }
      var titlesList = createElement(title, "div", "titles-list");
      var titles = createElement(titlesList, "div", "titles");
      var optionMap = createElementWithHTML(titles, "div", "title", _configuration.mapText);
      var optionChart = createElementWithHTML(titles, "div", "title", _configuration.chartText);
      var statisticsChart = createElementWithHTML(titles, "div", "title", _configuration.statisticsText);
      renderTitleDropDownClickEvent(bindingOptions, optionMap, _elements_View_Map, _elements_View_Name_Map);
      renderTitleDropDownClickEvent(bindingOptions, optionChart, _elements_View_Chart, _elements_View_Name_Chart);
      renderTitleDropDownClickEvent(bindingOptions, statisticsChart, _elements_View_Statistics, _elements_View_Name_Statistics);
      if (bindingOptions.showExportButton) {
        var exportData = createElementWithHTML(titleBar, "button", "export", _configuration.exportButtonText);
        exportData.onclick = function() {
          exportAllData(bindingOptions);
          fireCustomTrigger(bindingOptions.onExport, bindingOptions.currentView.element);
        };
      }
      if (bindingOptions.showRefreshButton) {
        var refresh = createElementWithHTML(titleBar, "button", "refresh", _configuration.refreshButtonText);
        refresh.onclick = function() {
          renderControlContainer(bindingOptions);
          fireCustomTrigger(bindingOptions.onRefresh, bindingOptions.currentView.element);
        };
      }
      if (bindingOptions.showYearSelector) {
        var back = createElementWithHTML(titleBar, "button", "back", _configuration.backButtonText);
        back.onclick = function() {
          bindingOptions.currentView.year--;
          renderControlContainer(bindingOptions);
          fireCustomTrigger(bindingOptions.onBackYear, bindingOptions.currentView.year);
        };
        bindingOptions.currentView.yearText = createElementWithHTML(titleBar, "div", "year-text", bindingOptions.currentView.year);
        createElement(bindingOptions.currentView.yearText, "div", "down-arrow");
        if (bindingOptions.showYearSelectionDropDown) {
          var yearList = createElement(bindingOptions.currentView.yearText, "div", "years-list");
          var years = createElement(yearList, "div", "years");
          var thisYear = (new Date()).getFullYear();
          var activeYear = null;
          yearList.style.display = "block";
          yearList.style.visibility = "hidden";
          var currentYear = thisYear - bindingOptions.extraSelectionYears;
          for (; currentYear < thisYear + bindingOptions.extraSelectionYears; currentYear++) {
            var year = renderControlTitleBarYear(bindingOptions, years, currentYear);
            if (!isDefined(activeYear)) {
              activeYear = year;
            }
          }
          if (isDefined(activeYear)) {
            years.scrollTop = activeYear.offsetTop - years.offsetHeight / 2;
          }
          yearList.style.display = "none";
          yearList.style.visibility = "visible";
        }
        var next = createElementWithHTML(titleBar, "button", "next", _configuration.nextButtonText);
        next.onclick = function() {
          bindingOptions.currentView.year++;
          renderControlContainer(bindingOptions);
          fireCustomTrigger(bindingOptions.onNextYear, bindingOptions.currentView.year);
        };
      }
    }
  }
  function renderTitleDropDownClickEvent(bindingOptions, option, view, viewName) {
    if (bindingOptions.currentView.view === view) {
      addClass(option, "title-active");
    } else {
      option.onclick = function() {
        bindingOptions.currentView.view = view;
        fireCustomTrigger(bindingOptions.onViewSwitch, viewName);
        renderControlContainer(bindingOptions);
      };
    }
  }
  function renderControlTitleBarYear(bindingOptions, years, currentYear) {
    var result = null;
    var year = createElementWithHTML(years, "div", "year", currentYear);
    if (bindingOptions.currentView.year !== currentYear) {
      year.onclick = function() {
        bindingOptions.currentView.year = currentYear;
        renderControlContainer(bindingOptions);
        fireCustomTrigger(bindingOptions.onNextYear, bindingOptions.currentView.year);
      };
    } else {
      addClass(year, "year-active");
      result = year;
    }
    return result;
  }
  function renderControlMap(bindingOptions) {
    bindingOptions.currentView.mapContents = createElement(bindingOptions.currentView.element, "div", "map-contents");
    var map = createElement(bindingOptions.currentView.mapContents, "div", "map");
    var currentYear = bindingOptions.currentView.year;
    var monthAdded = false;
    renderControlChartContents(bindingOptions);
    renderControlStatisticsContents(bindingOptions);
    renderControlViewGuide(bindingOptions);
    if (bindingOptions.views.map.showDayNames) {
      var days = createElement(map, "div", "days");
      if (!bindingOptions.views.map.showMonthNames || bindingOptions.views.map.placeMonthNamesOnTheBottom) {
        days.className = "days-months-bottom";
      }
      var dayNameIndex = 0;
      for (; dayNameIndex < 7; dayNameIndex++) {
        if (isDayVisible(bindingOptions.views.map.daysToShow, dayNameIndex + 1)) {
          createElementWithHTML(days, "div", "day-name", _configuration.dayNames[dayNameIndex]);
        }
      }
    }
    var months = createElement(map, "div", "months");
    var colorRanges = getSortedMapRanges(bindingOptions);
    var monthIndex = 0;
    for (; monthIndex < 12; monthIndex++) {
      if (isMonthVisible(bindingOptions.views.map.monthsToShow, monthIndex)) {
        var month = createElement(months, "div", "month");
        if (bindingOptions.views.map.showMonthNames && !bindingOptions.views.map.placeMonthNamesOnTheBottom) {
          createElementWithHTML(month, "div", "month-name", _configuration.monthNames[monthIndex]);
        }
        var dayColumns = createElement(month, "div", "day-columns");
        var totalDaysInMonth = getTotalDaysInMonth(currentYear, monthIndex);
        var currentDayColumn = createElement(dayColumns, "div", "day-column");
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
        if (bindingOptions.views.map.showMonthNames && bindingOptions.views.map.placeMonthNamesOnTheBottom) {
          createElementWithHTML(month, "div", "month-name-bottom", _configuration.monthNames[monthIndex]);
        }
        if (monthAdded && isDefined(_elements_Day_Width)) {
          if (firstDayNumberInMonth > 0 && !bindingOptions.views.map.showMonthDayGaps) {
            month.style.marginLeft = -_elements_Day_Width + "px";
          } else if (firstDayNumberInMonth === 0 && bindingOptions.views.map.showMonthDayGaps) {
            month.style.marginLeft = _elements_Day_Width + "px";
          }
        }
        monthAdded = true;
      }
    }
    if (bindingOptions.keepScrollPositions) {
      bindingOptions.currentView.mapContents.scrollLeft = bindingOptions.currentView.mapContentsScrollLeft;
    }
  }
  function renderControlMapMonthDay(bindingOptions, currentDayColumn, dayNumber, month, year, colorRanges) {
    var actualDay = dayNumber + 1;
    var day = createElement(currentDayColumn, "div", "day");
    var date = new Date(year, month, actualDay);
    var dateCount = _elements_DateCounts[bindingOptions.currentView.element.id].type[bindingOptions.currentView.type][toStorageDate(date)];
    dateCount = isDefinedNumber(dateCount) ? dateCount : 0;
    if (isDefinedFunction(bindingOptions.onDayToolTipRender)) {
      addToolTip(day, bindingOptions, fireCustomTrigger(bindingOptions.onDayToolTipRender, date, dateCount));
    } else {
      addToolTip(day, bindingOptions, getCustomFormattedDateText(bindingOptions.dayToolTipText, date));
    }
    if (bindingOptions.views.map.showDayNumbers && dateCount > 0) {
      day.innerHTML = dateCount.toString();
    }
    if (isDefinedFunction(bindingOptions.onDayClick)) {
      day.onclick = function() {
        fireCustomTrigger(bindingOptions.onDayClick, date, dateCount);
      };
    } else {
      addClass(day, "no-hover");
    }
    var useColorRange = getColorRange(colorRanges, dateCount);
    if (isDefined(useColorRange) && isHeatMapColorVisible(bindingOptions, useColorRange.id)) {
      addClass(day, useColorRange.cssClassName);
    }
    return day;
  }
  function renderControlChartContents(bindingOptions) {
    bindingOptions.currentView.chartContents = createElement(bindingOptions.currentView.element, "div", "chart-contents");
  }
  function renderControlChart(bindingOptions) {
    var chart = createElement(bindingOptions.currentView.chartContents, "div", "chart");
    var labels = createElement(chart, "div", "y-labels");
    var dayLines = createElement(chart, "div", "day-lines");
    var colorRanges = getSortedMapRanges(bindingOptions);
    var largestValueForCurrentYear = getLargestValueForChartYear(bindingOptions);
    var currentYear = bindingOptions.currentView.year;
    var labelsWidth = 0;
    if (largestValueForCurrentYear > 0 && bindingOptions.views.chart.showChartYLabels) {
      var topLabel = createElementWithHTML(labels, "div", "label-0", largestValueForCurrentYear.toString());
      createElementWithHTML(labels, "div", "label-25", (_parameter_Math.floor(largestValueForCurrentYear / 4) * 3).toString());
      createElementWithHTML(labels, "div", "label-50", _parameter_Math.floor(largestValueForCurrentYear / 2).toString());
      createElementWithHTML(labels, "div", "label-75", _parameter_Math.floor(largestValueForCurrentYear / 4).toString());
      createElementWithHTML(labels, "div", "label-100", "0");
      labels.style.width = topLabel.offsetWidth + "px";
      labelsWidth = labels.offsetWidth + getStyleValueByName(labels, "margin-right", true);
    } else {
      labels.parentNode.removeChild(labels);
      labels = null;
    }
    if (largestValueForCurrentYear === 0) {
      bindingOptions.currentView.chartContents.style.minHeight = bindingOptions.currentView.mapContents.offsetHeight + "px";
      chart.parentNode.removeChild(chart);
      createElementWithHTML(bindingOptions.currentView.chartContents, "div", "no-data-message", _configuration.noChartDataMessage);
    } else {
      var pixelsPerNumbers = bindingOptions.currentView.mapContents.offsetHeight / largestValueForCurrentYear;
      var totalMonths = 0;
      var totalDays = 0;
      var monthIndex1 = 0;
      for (; monthIndex1 < 12; monthIndex1++) {
        if (isMonthVisible(bindingOptions.views.chart.monthsToShow, monthIndex1)) {
          var totalDaysInMonth = getTotalDaysInMonth(currentYear, monthIndex1);
          var actualDay = 1;
          totalMonths++;
          var dayIndex = 0;
          for (; dayIndex < totalDaysInMonth; dayIndex++) {
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
      if (bindingOptions.views.chart.showMonthNames) {
        var chartMonths = createElement(bindingOptions.currentView.chartContents, "div", "chart-months");
        var linesWidth = dayLines.offsetWidth / totalMonths;
        var monthTimesValue = 0;
        var monthIndex2 = 0;
        for (; monthIndex2 < 12; monthIndex2++) {
          if (isMonthVisible(bindingOptions.views.chart.monthsToShow, monthIndex2)) {
            var monthName = createElementWithHTML(chartMonths, "div", "month-name", _configuration.monthNames[monthIndex2]);
            monthName.style.left = labelsWidth + linesWidth * monthTimesValue + "px";
            monthTimesValue++;
          }
        }
        chartMonths.style.width = dayLines.offsetWidth + "px";
        var monthNameSpace = createElement(chartMonths, "div", "month-name-space");
        monthNameSpace.style.height = chartMonths.offsetHeight + "px";
        monthNameSpace.style.width = labelsWidth + "px";
      }
      if (bindingOptions.keepScrollPositions) {
        bindingOptions.currentView.chartContents.scrollLeft = bindingOptions.currentView.chartContentsScrollLeft;
      }
    }
  }
  function renderControlChartDay(dayLines, bindingOptions, day, month, year, colorRanges, pixelsPerNumbers) {
    var date = new Date(year, month, day);
    var dayLine = createElement(dayLines, "div", "day-line");
    var dateCount = getCurrentViewData(bindingOptions)[toStorageDate(date)];
    dateCount = isDefinedNumber(dateCount) ? dateCount : 0;
    if (isDefinedFunction(bindingOptions.onDayToolTipRender)) {
      addToolTip(dayLine, bindingOptions, fireCustomTrigger(bindingOptions.onDayToolTipRender, date, dateCount));
    } else {
      addToolTip(dayLine, bindingOptions, getCustomFormattedDateText(bindingOptions.dayToolTipText, date));
    }
    dayLine.style.height = dateCount * pixelsPerNumbers + "px";
    dayLine.style.setProperty("border-bottom-width", "0", "important");
    if (isDefinedFunction(bindingOptions.onDayClick)) {
      dayLine.onclick = function() {
        fireCustomTrigger(bindingOptions.onDayClick, date, dateCount);
      };
    } else {
      addClass(dayLine, "no-hover");
    }
    var useColorRange = getColorRange(colorRanges, dateCount);
    if (isDefined(useColorRange) && isHeatMapColorVisible(bindingOptions, useColorRange.id)) {
      addClass(dayLine, useColorRange.cssClassName);
    }
  }
  function getLargestValueForChartYear(bindingOptions) {
    var result = 0;
    var data = getCurrentViewData(bindingOptions);
    var monthIndex = 0;
    for (; monthIndex < 12; monthIndex++) {
      var totalDaysInMonth = getTotalDaysInMonth(bindingOptions.currentView.year, monthIndex);
      var dayIndex = 0;
      for (; dayIndex < totalDaysInMonth; dayIndex++) {
        var storageDate = toStorageDate(new Date(bindingOptions.currentView.year, monthIndex, dayIndex + 1));
        if (data.hasOwnProperty(storageDate)) {
          result = _parameter_Math.max(result, parseInt(data[storageDate]));
        }
      }
    }
    return result;
  }
  function renderControlStatisticsContents(bindingOptions) {
    bindingOptions.currentView.statisticsContents = createElement(bindingOptions.currentView.element, "div", "statistics-contents");
  }
  function renderControlStatistics(bindingOptions) {
    var statistics = createElement(bindingOptions.currentView.statisticsContents, "div", "statistics");
    var statisticsRanges = createElement(bindingOptions.currentView.statisticsContents, "div", "statistics-ranges");
    var labels = createElement(statistics, "div", "y-labels");
    var rangeLines = createElement(statistics, "div", "range-lines");
    var colorRanges = getSortedMapRanges(bindingOptions);
    var colorRangeValuesForCurrentYear = getLargestValuesForEachRangeType(bindingOptions, colorRanges);
    if (colorRangeValuesForCurrentYear.largestValue > 0 && bindingOptions.views.statistics.showChartYLabels) {
      var topLabel = createElementWithHTML(labels, "div", "label-0", colorRangeValuesForCurrentYear.largestValue.toString());
      createElementWithHTML(labels, "div", "label-25", (_parameter_Math.floor(colorRangeValuesForCurrentYear.largestValue / 4) * 3).toString());
      createElementWithHTML(labels, "div", "label-50", _parameter_Math.floor(colorRangeValuesForCurrentYear.largestValue / 2).toString());
      createElementWithHTML(labels, "div", "label-75", _parameter_Math.floor(colorRangeValuesForCurrentYear.largestValue / 4).toString());
      createElementWithHTML(labels, "div", "label-100", "0");
      labels.style.width = topLabel.offsetWidth + "px";
      statisticsRanges.style.paddingLeft = labels.offsetWidth + getStyleValueByName(labels, "margin-right", true) + "px";
    } else {
      labels.parentNode.removeChild(labels);
      labels = null;
    }
    if (colorRangeValuesForCurrentYear.largestValue === 0) {
      bindingOptions.currentView.statisticsContents.style.minHeight = bindingOptions.currentView.mapContents.offsetHeight + "px";
      statistics.parentNode.removeChild(statistics);
      statisticsRanges.parentNode.removeChild(statisticsRanges);
      createElementWithHTML(bindingOptions.currentView.statisticsContents, "div", "no-statistics-message", _configuration.noStatisticsDataMessage);
    } else {
      var pixelsPerNumbers = bindingOptions.currentView.mapContents.offsetHeight / colorRangeValuesForCurrentYear.largestValue;
      if (!bindingOptions.views.statistics.showColorRangeLabels) {
        statisticsRanges.parentNode.removeChild(statisticsRanges);
      }
      var type;
      for (type in colorRangeValuesForCurrentYear.types) {
        if (colorRangeValuesForCurrentYear.types.hasOwnProperty(type)) {
          renderControlStatisticsDay(type, rangeLines, colorRangeValuesForCurrentYear.types[type], bindingOptions, colorRanges, pixelsPerNumbers);
          if (bindingOptions.views.statistics.showColorRangeLabels) {
            createElementWithHTML(statisticsRanges, "div", "range-name", type + "+");
          }
        }
      }
      if (bindingOptions.keepScrollPositions) {
        bindingOptions.currentView.statisticsContents.scrollLeft = bindingOptions.currentView.statisticsContentsScrollLeft;
      }
    }
  }
  function renderControlStatisticsDay(colorRangeMinimum, dayLines, rangeCount, bindingOptions, colorRanges, pixelsPerNumbers) {
    var rangeLine = createElement(dayLines, "div", "range-line no-hover");
    var colorRange = getColorRangeByMinimum(colorRanges, colorRangeMinimum);
    rangeLine.style.height = rangeCount * pixelsPerNumbers + "px";
    rangeLine.style.setProperty("border-bottom-width", "0", "important");
    addToolTip(rangeLine, bindingOptions, rangeCount.toString());
    if (isDefined(colorRange) && isHeatMapColorVisible(bindingOptions, colorRange.id)) {
      addClass(rangeLine, colorRange.cssClassName);
    }
  }
  function getLargestValuesForEachRangeType(bindingOptions, colorRanges) {
    var types = {};
    var largestValue = 0;
    var data = getCurrentViewData(bindingOptions);
    types["0"] = 0;
    var monthIndex = 0;
    for (; monthIndex < 12; monthIndex++) {
      var totalDaysInMonth = getTotalDaysInMonth(bindingOptions.currentView.year, monthIndex);
      var dayIndex = 0;
      for (; dayIndex < totalDaysInMonth; dayIndex++) {
        var storageDate = toStorageDate(new Date(bindingOptions.currentView.year, monthIndex, dayIndex + 1));
        if (data.hasOwnProperty(storageDate)) {
          var storageDateParts = getStorageDate(storageDate);
          var storageDateObject = new Date(storageDateParts[2], storageDateParts[1], storageDateParts[0]);
          var weekDayNumber = getWeekdayNumber(storageDateObject);
          if (isMonthVisible(bindingOptions.views.statistics.monthsToShow, storageDateObject.getMonth()) && isDayVisible(bindingOptions.views.statistics.daysToShow, weekDayNumber)) {
            var useColorRange = getColorRange(colorRanges, data[storageDate]);
            if (!isDefined(useColorRange)) {
              types["0"]++;
            } else {
              if (!types.hasOwnProperty(useColorRange.minimum.toString())) {
                types[useColorRange.minimum.toString()] = 0;
              }
              types[useColorRange.minimum]++;
              largestValue = _parameter_Math.max(largestValue, types[useColorRange.minimum]);
            }
          }
        }
      }
    }
    return {types:types, largestValue:largestValue};
  }
  function renderControlViewGuide(bindingOptions) {
    var guide = createElement(bindingOptions.currentView.element, "div", "guide");
    var mapTypes = createElement(guide, "div", "map-types");
    var noneTypeCount = 0;
    var storageDate;
    for (storageDate in _elements_DateCounts[bindingOptions.currentView.element.id].type[_elements_DateCounts_DefaultType]) {
      if (_elements_DateCounts[bindingOptions.currentView.element.id].type[_elements_DateCounts_DefaultType].hasOwnProperty(storageDate)) {
        noneTypeCount++;
        break;
      }
    }
    if (_elements_DateCounts[bindingOptions.currentView.element.id].types > 1) {
      var type;
      for (type in _elements_DateCounts[bindingOptions.currentView.element.id].type) {
        if (type !== _elements_DateCounts_DefaultType || noneTypeCount > 0) {
          if (noneTypeCount === 0 && bindingOptions.currentView.type === _elements_DateCounts_DefaultType) {
            bindingOptions.currentView.type = type;
          }
          renderControlViewGuideTypeButton(bindingOptions, mapTypes, type);
        }
      }
    } else {
      if (isDefinedString(bindingOptions.noTypesLabel)) {
        if (isDefinedString(bindingOptions.noTypesLabelLink)) {
          var link = createElementWithHTML(mapTypes, "a", "label", bindingOptions.noTypesLabel);
          link.href = bindingOptions.noTypesLabelLink;
        } else {
          createElementWithHTML(mapTypes, "span", "label", bindingOptions.noTypesLabel);
        }
      }
    }
    if (bindingOptions.showGuide) {
      var mapToggles = createElement(guide, "div", "map-toggles");
      var lessText = createElementWithHTML(mapToggles, "div", "less-text", _configuration.lessText);
      if (bindingOptions.mapTogglesEnabled) {
        lessText.onclick = function() {
          updateColorRangeToggles(bindingOptions, false);
        };
      } else {
        addClass(lessText, "no-click");
      }
      var days = createElement(mapToggles, "div", "days");
      var colorRanges = getSortedMapRanges(bindingOptions);
      var colorRangesLength = colorRanges.length;
      var colorRangesIndex = 0;
      for (; colorRangesIndex < colorRangesLength; colorRangesIndex++) {
        renderControlViewGuideDay(bindingOptions, days, colorRanges[colorRangesIndex]);
      }
      var moreText = createElementWithHTML(mapToggles, "div", "more-text", _configuration.moreText);
      if (bindingOptions.mapTogglesEnabled) {
        moreText.onclick = function() {
          updateColorRangeToggles(bindingOptions, true);
        };
      } else {
        addClass(moreText, "no-click");
      }
    }
  }
  function renderControlViewGuideTypeButton(bindingOptions, mapTypes, type) {
    var typeButton = createElementWithHTML(mapTypes, "button", "type", type);
    if (bindingOptions.currentView.type === type) {
      addClass(typeButton, "active");
    }
    typeButton.onclick = function() {
      if (bindingOptions.currentView.type !== type) {
        bindingOptions.currentView.type = type;
        fireCustomTrigger(bindingOptions.onTypeSwitch, type);
        renderControlContainer(bindingOptions);
      }
    };
  }
  function renderControlViewGuideDay(bindingOptions, days, colorRange) {
    var day = createElement(days, "div");
    addToolTip(day, bindingOptions, colorRange.tooltipText);
    if (isHeatMapColorVisible(bindingOptions, colorRange.id)) {
      day.className = "day " + colorRange.cssClassName;
    } else {
      day.className = "day";
    }
    if (bindingOptions.mapTogglesEnabled) {
      day.onclick = function() {
        toggleColorRangeVisibleState(bindingOptions, colorRange.id);
      };
    } else {
      addClass(day, "no-hover");
    }
  }
  function isHeatMapColorVisible(bindingOptions, id) {
    var result = false;
    var colorRangesLength = bindingOptions.colorRanges.length;
    var colorRangesIndex = 0;
    for (; colorRangesIndex < colorRangesLength; colorRangesIndex++) {
      var colorRange = bindingOptions.colorRanges[colorRangesIndex];
      if (colorRange.id === id && (!isDefinedBoolean(colorRange.visible) || colorRange.visible)) {
        result = true;
        break;
      }
    }
    return result;
  }
  function updateColorRangeToggles(bindingOptions, flag) {
    var colorRangesLength = bindingOptions.colorRanges.length;
    var colorRangesIndex = 0;
    for (; colorRangesIndex < colorRangesLength; colorRangesIndex++) {
      bindingOptions.colorRanges[colorRangesIndex].visible = flag;
      fireCustomTrigger(bindingOptions.onColorRangeTypeToggle, bindingOptions.colorRanges[colorRangesIndex].id, flag);
    }
    renderControlContainer(bindingOptions);
  }
  function toggleColorRangeVisibleState(bindingOptions, id) {
    var colorRangesLength = bindingOptions.colorRanges.length;
    var colorRangesIndex = 0;
    for (; colorRangesIndex < colorRangesLength; colorRangesIndex++) {
      var colorRange = bindingOptions.colorRanges[colorRangesIndex];
      if (colorRange.id === id) {
        colorRange.visible = !(isDefinedBoolean(colorRange.visible) && colorRange.visible);
        fireCustomTrigger(bindingOptions.onColorRangeTypeToggle, colorRange.id, colorRange.visible);
        renderControlContainer(bindingOptions);
        break;
      }
    }
  }
  function getColorRange(colorRanges, dateCount) {
    var colorRangesLength = colorRanges.length;
    var useColorRange = null;
    var colorRangesIndex = 0;
    for (; colorRangesIndex < colorRangesLength; colorRangesIndex++) {
      var colorRange = colorRanges[colorRangesIndex];
      if (dateCount >= colorRange.minimum) {
        useColorRange = colorRange;
      } else {
        break;
      }
    }
    return useColorRange;
  }
  function getColorRangeByMinimum(colorRanges, minimum) {
    var colorRangesLength = colorRanges.length;
    var useColorRange = null;
    var colorRangesIndex = 0;
    for (; colorRangesIndex < colorRangesLength; colorRangesIndex++) {
      var colorRange = colorRanges[colorRangesIndex];
      if (minimum.toString() === colorRange.minimum.toString()) {
        useColorRange = colorRange;
        break;
      }
    }
    return useColorRange;
  }
  function getSortedMapRanges(bindingOptions) {
    return bindingOptions.colorRanges.sort(function(a, b) {
      return a.minimum - b.minimum;
    });
  }
  function exportAllData(bindingOptions) {
    var contents = null;
    var contentsMimeType = getExportMimeType(bindingOptions);
    if (bindingOptions.exportType.toLowerCase() === _export_Type_Csv) {
      contents = getCsvContent(bindingOptions);
    } else if (bindingOptions.exportType.toLowerCase() === _export_Type_Json) {
      contents = getJsonContent(bindingOptions);
    } else if (bindingOptions.exportType.toLowerCase() === _export_Type_Xml) {
      contents = getXmlContents(bindingOptions);
    }
    if (contents !== _string.empty) {
      var tempLink = createElement(_parameter_Document.body, "a");
      tempLink.style.display = "none";
      tempLink.setAttribute("target", "_blank");
      tempLink.setAttribute("href", "data:" + contentsMimeType + ";charset=utf-8," + encodeURIComponent(contents));
      tempLink.setAttribute("download", getExportFilename(bindingOptions));
      tempLink.click();
      _parameter_Document.body.removeChild(tempLink);
    }
  }
  function getCsvContent(bindingOptions) {
    var data = getExportData(bindingOptions);
    var csvContents = [];
    var storageDate;
    for (storageDate in data) {
      if (data.hasOwnProperty(storageDate)) {
        csvContents.push(getCsvValueLine([getCsvValue(storageDate), getCsvValue(data[storageDate])]));
      }
    }
    if (csvContents.length > 0) {
      csvContents.unshift(getCsvValueLine([getCsvValue(_configuration.dateText), getCsvValue(_configuration.countText)]));
    }
    return csvContents.join(_string.newLine);
  }
  function getJsonContent(bindingOptions) {
    return _parameter_JSON.stringify(getExportData(bindingOptions));
  }
  function getXmlContents(bindingOptions) {
    var data = getExportData(bindingOptions);
    var contents = [];
    contents.push('<?xml version="1.0" ?>');
    contents.push("<Dates>");
    var storageDate;
    for (storageDate in data) {
      if (data.hasOwnProperty(storageDate)) {
        contents.push("<Date>");
        contents.push("<FullDate>" + storageDate + "</FullDate>");
        contents.push("<Count>" + data[storageDate] + "</Count>");
        contents.push("</Date>");
      }
    }
    contents.push("</Dates>");
    return contents.join(_string.newLine);
  }
  function getExportData(bindingOptions) {
    var contents = {};
    var data = getCurrentViewData(bindingOptions);
    if (bindingOptions.exportOnlyYearBeingViewed) {
      var monthIndex = 0;
      for (; monthIndex < 12; monthIndex++) {
        var totalDaysInMonth = getTotalDaysInMonth(bindingOptions.currentView.year, monthIndex);
        var dayIndex = 0;
        for (; dayIndex < totalDaysInMonth; dayIndex++) {
          var storageDate2 = toStorageDate(new Date(bindingOptions.currentView.year, monthIndex, dayIndex + 1));
          if (data.hasOwnProperty(storageDate2)) {
            contents[storageDate2] = data[storageDate2];
          }
        }
      }
    } else {
      var storageDates = [];
      var storageDate1;
      for (storageDate1 in data) {
        if (data.hasOwnProperty(storageDate1)) {
          storageDates.push(storageDate1);
        }
      }
      storageDates.sort();
      var storageDatesLength = storageDates.length;
      var storageDateIndex = 0;
      for (; storageDateIndex < storageDatesLength; storageDateIndex++) {
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
    if (bindingOptions.exportType.toLowerCase() === _export_Type_Csv) {
      result = "text/csv";
    } else if (bindingOptions.exportType.toLowerCase() === _export_Type_Json) {
      result = "application/json";
    } else if (bindingOptions.exportType.toLowerCase() === _export_Type_Xml) {
      result = "application/xml";
    }
    return result;
  }
  function getExportFilename(bindingOptions) {
    var date = new Date();
    var datePart = padNumber(date.getDate()) + _string.dash + padNumber(date.getMonth() + 1) + _string.dash + date.getFullYear();
    var timePart = padNumber(date.getHours()) + _string.dash + padNumber(date.getMinutes());
    var filenameStart = _string.empty;
    if (bindingOptions.currentView.type !== _elements_DateCounts_DefaultType) {
      filenameStart = bindingOptions.currentView.type.toLowerCase().replace(_string.space, _string.underscore) + _string.underscore;
    }
    return filenameStart + datePart + _string.underscore + timePart + "." + bindingOptions.exportType.toLowerCase();
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
    options.views = !isDefinedObject(options.views) ? {} : options.views;
    options.showGuide = getDefaultBoolean(options.showGuide, true);
    options.showTitle = getDefaultBoolean(options.showTitle, true);
    options.showYearSelector = getDefaultBoolean(options.showYearSelector, true);
    options.showRefreshButton = getDefaultBoolean(options.showRefreshButton, false);
    options.showExportButton = getDefaultBoolean(options.showExportButton, false);
    options.mapTogglesEnabled = getDefaultBoolean(options.mapTogglesEnabled, true);
    options.exportOnlyYearBeingViewed = getDefaultBoolean(options.exportOnlyYearBeingViewed, true);
    options.year = getDefaultNumber(options.year, (new Date()).getFullYear());
    options.keepScrollPositions = getDefaultBoolean(options.keepScrollPositions, false);
    options.extraSelectionYears = getDefaultNumber(options.extraSelectionYears, 50);
    options.showYearSelectionDropDown = getDefaultBoolean(options.showYearSelectionDropDown, true);
    options.view = getDefaultString(options.view, _elements_View_Name_Map);
    options.tooltipDelay = getDefaultNumber(options.tooltipDelay, 750);
    options.exportType = getDefaultString(options.exportType, _export_Type_Csv);
    options.noTypesLabel = getDefaultString(options.noTypesLabel, null);
    options.noTypesLabelLink = getDefaultString(options.noTypesLabelLink, null);
    options = buildAttributeOptionMapView(options);
    options = buildAttributeOptionChartView(options);
    options = buildAttributeOptionStatisticsView(options);
    options = buildAttributeOptionMapRanges(options);
    options = buildAttributeOptionStrings(options);
    return buildAttributeOptionCustomTriggers(options);
  }
  function buildAttributeOptionMapView(options) {
    options.views.map = !isDefinedObject(options.views.map) ? {} : options.views.map;
    options.views.map.showMonthDayGaps = getDefaultBoolean(options.views.map.showMonthDayGaps, true);
    options.views.map.showDayNames = getDefaultBoolean(options.views.map.showDayNames, true);
    options.views.map.placeMonthNamesOnTheBottom = getDefaultBoolean(options.views.map.placeMonthNamesOnTheBottom, false);
    options.views.map.showDayNumbers = getDefaultBoolean(options.views.map.showDayNumbers, false);
    options.views.map.showMonthNames = getDefaultBoolean(options.views.map.showMonthNames, true);
    if (isInvalidOptionArray(options.views.map.monthsToShow)) {
      options.views.map.monthsToShow = _default_MonthsToShow;
    }
    if (isInvalidOptionArray(options.views.map.daysToShow)) {
      options.views.map.daysToShow = _default_DaysToShow;
    }
    return options;
  }
  function buildAttributeOptionChartView(options) {
    options.views.chart = !isDefinedObject(options.views.chart) ? {} : options.views.chart;
    options.views.chart.showChartYLabels = getDefaultBoolean(options.views.chart.showChartYLabels, true);
    options.views.chart.showMonthNames = getDefaultBoolean(options.views.chart.showMonthNames, true);
    if (isInvalidOptionArray(options.views.chart.monthsToShow)) {
      options.views.chart.monthsToShow = _default_MonthsToShow;
    }
    if (isInvalidOptionArray(options.views.chart.daysToShow)) {
      options.views.chart.daysToShow = _default_DaysToShow;
    }
    return options;
  }
  function buildAttributeOptionStatisticsView(options) {
    options.views.statistics = !isDefinedObject(options.views.statistics) ? {} : options.views.statistics;
    options.views.statistics.showChartYLabels = getDefaultBoolean(options.views.statistics.showChartYLabels, true);
    options.views.statistics.showColorRangeLabels = getDefaultBoolean(options.views.statistics.showColorRangeLabels, true);
    if (isInvalidOptionArray(options.views.statistics.monthsToShow)) {
      options.views.statistics.monthsToShow = _default_MonthsToShow;
    }
    if (isInvalidOptionArray(options.views.statistics.daysToShow)) {
      options.views.statistics.daysToShow = _default_DaysToShow;
    }
    return options;
  }
  function buildAttributeOptionMapRanges(options) {
    options.colorRanges = getDefaultArray(options.colorRanges, [{minimum:10, cssClassName:"day-color-1", tooltipText:"Day Color 1", visible:true}, {minimum:15, cssClassName:"day-color-2", tooltipText:"Day Color 2", visible:true}, {minimum:20, cssClassName:"day-color-3", tooltipText:"Day Color 3", visible:true}, {minimum:25, cssClassName:"day-color-4", tooltipText:"Day Color 4", visible:true}]);
    var colorRangesLength = options.colorRanges.length;
    var colorRangesIndex = 0;
    for (; colorRangesIndex < colorRangesLength; colorRangesIndex++) {
      if (!isDefinedString(options.colorRanges[colorRangesIndex].id)) {
        options.colorRanges[colorRangesIndex].id = newGuid();
      }
    }
    return options;
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
    options.onDayToolTipRender = getDefaultFunction(options.onDayToolTipRender, null);
    options.onAdd = getDefaultFunction(options.onAdd, null);
    options.onRemove = getDefaultFunction(options.onRemove, null);
    options.onReset = getDefaultFunction(options.onReset, null);
    options.onViewSwitch = getDefaultFunction(options.onViewSwitch, null);
    options.onColorRangeTypeToggle = getDefaultFunction(options.onColorRangeTypeToggle, null);
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
  function createElement(container, type, className) {
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
    container.appendChild(result);
    return result;
  }
  function createElementWithHTML(container, type, className, html) {
    var element = createElement(container, type, className);
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
  function addClass(element, className) {
    element.className += _string.space + className;
  }
  function cancelBubble(e) {
    e.preventDefault();
    e.cancelBubble = true;
  }
  function getScrollPosition() {
    var doc = _parameter_Document.documentElement;
    var left = (_parameter_Window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    var top = (_parameter_Window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    return {left:left, top:top};
  }
  function showElementAtMousePosition(e, element) {
    var left = e.pageX;
    var top = e.pageY;
    var scrollPosition = getScrollPosition();
    element.style.display = "block";
    if (left + element.offsetWidth > _parameter_Window.innerWidth) {
      left = left - element.offsetWidth;
    } else {
      left++;
    }
    if (top + element.offsetHeight > _parameter_Window.innerHeight) {
      top = top - element.offsetHeight;
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
  function fireCustomTrigger(triggerFunction) {
    var result = null;
    if (isDefinedFunction(triggerFunction)) {
      result = triggerFunction.apply(null, [].slice.call(arguments, 1));
    }
    return result;
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
        result = _parameter_JSON.parse(objectString);
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
        result.push(_string.dash);
      }
      var character = _parameter_Math.floor(_parameter_Math.random() * 16).toString(16);
      result.push(character);
    }
    return result.join(_string.empty);
  }
  function padNumber(number) {
    var numberString = number.toString();
    return numberString.length === 1 ? "0" + numberString : numberString;
  }
  function toStorageDate(date) {
    return date.getFullYear() + _string.dash + padNumber(date.getMonth() + 1) + _string.dash + padNumber(date.getDate());
  }
  function getStorageDate(data) {
    return data.split(_string.dash);
  }
  function getStorageDateYear(data) {
    return data.split(_string.dash)[0];
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
    _configuration.mapText = getDefaultString(_configuration.mapText, "Map");
    _configuration.chartText = getDefaultString(_configuration.chartText, "Chart");
    _configuration.noChartDataMessage = getDefaultString(_configuration.noChartDataMessage, "There is currently no data to view.");
    _configuration.statisticsText = getDefaultString(_configuration.statisticsText, "Statistics");
    _configuration.noStatisticsDataMessage = getDefaultString(_configuration.noStatisticsDataMessage, "There is currently no statistics to view.");
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
  var _parameter_Math = null;
  var _parameter_JSON = null;
  var _configuration = {};
  var _string = {empty:"", space:" ", newLine:"\n", dash:"-", underscore:"_"};
  var _default_MonthsToShow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  var _default_DaysToShow = [1, 2, 3, 4, 5, 6, 7];
  var _elements_Type = {};
  var _elements_Day_Width = null;
  var _elements_DateCounts = {};
  var _elements_DateCounts_DefaultType = "None";
  var _elements_View_Name_Map = "map";
  var _elements_View_Name_Chart = "chart";
  var _elements_View_Name_Statistics = "statistics";
  var _elements_View_Map = 1;
  var _elements_View_Chart = 2;
  var _elements_View_Statistics = 3;
  var _export_Type_Csv = "csv";
  var _export_Type_Json = "json";
  var _export_Type_Xml = "xml";
  var _attribute_Name_Options = "data-heat-options";
  this.addDates = function(elementId, dates, type, triggerRefresh) {
    if (_elements_DateCounts.hasOwnProperty(elementId)) {
      triggerRefresh = !isDefinedBoolean(triggerRefresh) ? true : triggerRefresh;
      type = !isDefinedString(type) ? _elements_DateCounts_DefaultType : type;
      var datesLength = dates.length;
      var bindingOptions = _elements_DateCounts[elementId].options;
      var dateIndex = 0;
      for (; dateIndex < datesLength; dateIndex++) {
        this.addDate(elementId, dates[dateIndex], type, false);
      }
      fireCustomTrigger(bindingOptions.onAdd, bindingOptions.currentView.element);
      if (triggerRefresh) {
        renderControlContainer(_elements_DateCounts[elementId].options);
      }
    }
    return this;
  };
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
      var bindingOptions = _elements_DateCounts[elementId].options;
      fireCustomTrigger(bindingOptions.onAdd, bindingOptions.currentView.element);
      if (triggerRefresh) {
        renderControlContainer(_elements_DateCounts[elementId].options);
      }
    }
    return this;
  };
  this.removeDates = function(elementId, dates, type, triggerRefresh) {
    if (_elements_DateCounts.hasOwnProperty(elementId)) {
      type = !isDefinedString(type) ? _elements_DateCounts_DefaultType : type;
      triggerRefresh = !isDefinedBoolean(triggerRefresh) ? true : triggerRefresh;
      var datesLength = dates.length;
      var bindingOptions = _elements_DateCounts[elementId].options;
      var dateIndex = 0;
      for (; dateIndex < datesLength; dateIndex++) {
        this.removeDate(elementId, dates[dateIndex], type, false);
      }
      fireCustomTrigger(bindingOptions.onRemove, bindingOptions.currentView.element);
      if (triggerRefresh) {
        renderControlContainer(_elements_DateCounts[elementId].options);
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
        var bindingOptions = _elements_DateCounts[elementId].options;
        fireCustomTrigger(bindingOptions.onRemove, bindingOptions.currentView.element);
        if (triggerRefresh) {
          renderControlContainer(_elements_DateCounts[elementId].options);
        }
      }
    }
    return this;
  };
  this.resetAll = function(triggerRefresh) {
    var elementId;
    for (elementId in _elements_DateCounts) {
      if (_elements_DateCounts.hasOwnProperty(elementId)) {
        this.reset(elementId, triggerRefresh);
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
      fireCustomTrigger(bindingOptions.onReset, bindingOptions.currentView.element);
      if (triggerRefresh) {
        renderControlContainer(_elements_DateCounts[elementId].options);
      }
    }
    return this;
  };
  this["export"] = function(elementId) {
    if (_elements_DateCounts.hasOwnProperty(elementId)) {
      var bindingOptions = _elements_DateCounts[elementId].options;
      exportAllData(bindingOptions);
    }
    return this;
  };
  this.refresh = function(elementId) {
    if (_elements_DateCounts.hasOwnProperty(elementId)) {
      var bindingOptions = _elements_DateCounts[elementId].options;
      renderControlContainer(bindingOptions);
      fireCustomTrigger(bindingOptions.onRefresh, bindingOptions.currentView.element);
    }
    return this;
  };
  this.refreshAll = function() {
    var elementId;
    for (elementId in _elements_DateCounts) {
      if (_elements_DateCounts.hasOwnProperty(elementId)) {
        var bindingOptions = _elements_DateCounts[elementId].options;
        renderControlContainer(bindingOptions);
        fireCustomTrigger(bindingOptions.onRefresh, bindingOptions.currentView.element);
      }
    }
    return this;
  };
  this.setYear = function(elementId, year) {
    if (_elements_DateCounts.hasOwnProperty(elementId)) {
      var bindingOptions = _elements_DateCounts[elementId].options;
      bindingOptions.currentView.year = year;
      renderControlContainer(bindingOptions);
      fireCustomTrigger(bindingOptions.onSetYear, bindingOptions.currentView.year);
    }
    return this;
  };
  this.setYearToHighest = function(elementId) {
    if (_elements_DateCounts.hasOwnProperty(elementId)) {
      var bindingOptions = _elements_DateCounts[elementId].options;
      var data = getCurrentViewData(bindingOptions);
      var maximumYear = 0;
      var storageDate;
      for (storageDate in data) {
        if (data.hasOwnProperty(storageDate)) {
          maximumYear = _parameter_Math.max(maximumYear, parseInt(getStorageDateYear(storageDate)));
        }
      }
      if (maximumYear > 0) {
        bindingOptions.currentView.year = maximumYear;
        renderControlContainer(bindingOptions);
        fireCustomTrigger(bindingOptions.onSetYear, bindingOptions.currentView.year);
      }
    }
    return this;
  };
  this.setYearToLowest = function(elementId) {
    if (_elements_DateCounts.hasOwnProperty(elementId)) {
      var bindingOptions = _elements_DateCounts[elementId].options;
      var data = getCurrentViewData(bindingOptions);
      var minimumYear = 9999;
      var storageDate;
      for (storageDate in data) {
        if (data.hasOwnProperty(storageDate)) {
          minimumYear = _parameter_Math.min(minimumYear, parseInt(getStorageDateYear(storageDate)));
        }
      }
      if (minimumYear < 9999) {
        bindingOptions.currentView.year = minimumYear;
        renderControlContainer(bindingOptions);
        fireCustomTrigger(bindingOptions.onSetYear, bindingOptions.currentView.year);
      }
    }
    return this;
  };
  this.moveToPreviousYear = function(elementId) {
    if (_elements_DateCounts.hasOwnProperty(elementId)) {
      var bindingOptions = _elements_DateCounts[elementId].options;
      bindingOptions.currentView.year--;
      renderControlContainer(bindingOptions);
      fireCustomTrigger(bindingOptions.onBackYear, bindingOptions.currentView.year);
    }
    return this;
  };
  this.moveToNextYear = function(elementId) {
    if (_elements_DateCounts.hasOwnProperty(elementId)) {
      var bindingOptions = _elements_DateCounts[elementId].options;
      bindingOptions.currentView.year++;
      renderControlContainer(bindingOptions);
      fireCustomTrigger(bindingOptions.onNextYear, bindingOptions.currentView.year);
    }
    return this;
  };
  this.moveToCurrentYear = function(elementId) {
    if (_elements_DateCounts.hasOwnProperty(elementId)) {
      var bindingOptions = _elements_DateCounts[elementId].options;
      bindingOptions.currentView.year = (new Date()).getFullYear();
      renderControlContainer(bindingOptions);
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
  this.render = function(element, options) {
    renderControl(renderBindingOptions(options, element));
    return this;
  };
  this.renderAll = function() {
    render();
    return this;
  };
  this.switchView = function(elementId, viewName) {
    if (_elements_DateCounts.hasOwnProperty(elementId)) {
      var bindingOptions = _elements_DateCounts[elementId].options;
      var view = null;
      if (viewName.toLowerCase() === _elements_View_Name_Map) {
        view = _elements_View_Map;
      } else if (viewName.toLowerCase() === _elements_View_Name_Chart) {
        view = _elements_View_Chart;
      } else if (viewName.toLowerCase() === _elements_View_Name_Statistics) {
        view = _elements_View_Statistics;
      }
      if (isDefinedNumber(view)) {
        bindingOptions.currentView.view = view;
        fireCustomTrigger(bindingOptions.onViewSwitch, viewName);
        renderControlContainer(bindingOptions);
      }
    }
    return this;
  };
  this.switchType = function(elementId, type) {
    if (_elements_DateCounts.hasOwnProperty(elementId) && _elements_DateCounts[elementId].type.hasOwnProperty(type)) {
      var bindingOptions = _elements_DateCounts[elementId].options;
      if (bindingOptions.currentView.type !== type) {
        bindingOptions.currentView.type = type;
        fireCustomTrigger(bindingOptions.onTypeSwitch, type);
        renderControlContainer(bindingOptions);
      }
    }
    return this;
  };
  this.destroyAll = function() {
    var elementId;
    for (elementId in _elements_DateCounts) {
      if (_elements_DateCounts.hasOwnProperty(elementId)) {
        var bindingOptions = _elements_DateCounts[elementId].options;
        bindingOptions.currentView.element.innerHTML = _string.empty;
        bindingOptions.currentView.element.className = _string.empty;
        _parameter_Document.body.removeChild(bindingOptions.currentView.tooltip);
        fireCustomTrigger(bindingOptions.onDestroy, bindingOptions.currentView.element);
      }
    }
    _elements_DateCounts = {};
    return this;
  };
  this.destroy = function(elementId) {
    if (_elements_DateCounts.hasOwnProperty(elementId)) {
      var bindingOptions = _elements_DateCounts[elementId].options;
      bindingOptions.currentView.element.innerHTML = _string.empty;
      bindingOptions.currentView.element.className = _string.empty;
      _parameter_Document.body.removeChild(bindingOptions.currentView.tooltip);
      fireCustomTrigger(bindingOptions.onDestroy, bindingOptions.currentView.element);
      delete _elements_DateCounts[elementId];
    }
    return this;
  };
  this.setConfiguration = function(newOptions) {
    _configuration = !isDefinedObject(newOptions) ? {} : newOptions;
    buildDefaultConfiguration();
    return this;
  };
  this.getIds = function() {
    var result = [];
    var elementId;
    for (elementId in _elements_DateCounts) {
      if (_elements_DateCounts.hasOwnProperty(elementId)) {
        result.push(elementId);
      }
    }
    return result;
  };
  this.getVersion = function() {
    return "2.0.0";
  };
  (function(documentObject, windowObject, mathObject, jsonObject) {
    _parameter_Document = documentObject;
    _parameter_Window = windowObject;
    _parameter_Math = mathObject;
    _parameter_JSON = jsonObject;
    buildDefaultConfiguration();
    _parameter_Document.addEventListener("DOMContentLoaded", function() {
      render();
    });
    if (!isDefined(_parameter_Window.$heat)) {
      _parameter_Window.$heat = this;
    }
  })(document, window, Math, JSON);
})();