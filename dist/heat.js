// src/heat.ts
((documentObject, windowObject, mathObject, jsonObject) => {
  let _configuration = {};
  const _elements_Type = {};
  let _elements_Day_Width = null;
  let _elements_DateCounts = {};
  const _internal_Name_Holiday = "HOLIDAY";
  const _local_Storage_Start_ID = "HJS_";
  const _default_MonthsToShow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const _default_DaysToShow = [1, 2, 3, 4, 5, 6, 7];
  const _attribute_Name_Options = "data-heat-js";
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
  function render() {
    const tagTypes = _configuration.domElementTypes;
    const tagTypesLength = tagTypes.length;
    for (let tagTypeIndex = 0; tagTypeIndex < tagTypesLength; tagTypeIndex++) {
      const domElements = documentObject.getElementsByTagName(tagTypes[tagTypeIndex]);
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
    if (isDefined(element) && element.hasAttribute(_attribute_Name_Options)) {
      const bindingOptionsData = element.getAttribute(_attribute_Name_Options);
      if (isDefinedString(bindingOptionsData)) {
        const bindingOptions = getObjectFromString(bindingOptionsData);
        if (bindingOptions.parsed && isDefinedObject(bindingOptions.result)) {
          renderControl(renderBindingOptions(bindingOptions.result, element));
        } else {
          if (!_configuration.safeMode) {
            console.error(_configuration.attributeNotValidErrorText.replace("{{attribute_name}}", _attribute_Name_Options));
            result2 = false;
          }
        }
      } else {
        if (!_configuration.safeMode) {
          console.error(_configuration.attributeNotSetErrorText.replace("{{attribute_name}}", _attribute_Name_Options));
          result2 = false;
        }
      }
    }
    return result2;
  }
  function renderBindingOptions(data, element) {
    const bindingOptions = buildAttributeOptions(data);
    const view = !isDefinedString(bindingOptions.view) ? "" /* empty */ : bindingOptions.view.toLowerCase();
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
    if (!isDefinedString(bindingOptions._currentView.element.id)) {
      bindingOptions._currentView.element.id = newGuid();
    }
    if (bindingOptions._currentView.element.className.trim() === "" /* empty */) {
      bindingOptions._currentView.element.className = "heat-js";
    } else {
      addClass(bindingOptions._currentView.element, "heat-js");
    }
    bindingOptions._currentView.element.removeAttribute(_attribute_Name_Options);
    createDateStorageForElement(bindingOptions._currentView.element.id, bindingOptions);
    renderControlContainer(bindingOptions);
    fireCustomTriggerEvent(bindingOptions.events.onRenderComplete, bindingOptions._currentView.element);
  }
  function renderControlContainer(bindingOptions, isForDataRefresh = false, isForViewSwitch = false) {
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
    bindingOptions._currentView.configurationDialog = createElement(bindingOptions._currentView.disabledBackground, "div", "dialog configuration");
    const titleBar = createElement(bindingOptions._currentView.configurationDialog, "div", "dialog-title-bar");
    const contents = createElement(bindingOptions._currentView.configurationDialog, "div", "dialog-contents");
    const closeButton = createElement(titleBar, "div", "dialog-close");
    const daysContainer = createElement(contents, "div", "side-container panel");
    const monthsContainer = createElement(contents, "div", "side-container panel");
    createElementWithHTML(titleBar, "span", "dialog-title-bar-text", _configuration.configurationTitleText);
    createElementWithHTML(daysContainer, "div", "side-container-title-text", _configuration.visibleDaysText + ":" /* colon */);
    createElementWithHTML(monthsContainer, "div", "side-container-title-text", _configuration.visibleMonthsText + ":" /* colon */);
    const months1Container = createElement(monthsContainer, "div", "side-container");
    const months2Container = createElement(monthsContainer, "div", "side-container");
    closeButton.onclick = function() {
      hideConfigurationDialog(bindingOptions);
    };
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      bindingOptions._currentView.dayCheckBoxes[dayIndex] = buildCheckBox(daysContainer, _configuration.dayNames[dayIndex]).input;
    }
    for (let monthIndex1 = 0; monthIndex1 < 7; monthIndex1++) {
      bindingOptions._currentView.monthCheckBoxes[monthIndex1] = buildCheckBox(months1Container, _configuration.monthNames[monthIndex1]).input;
    }
    for (let monthIndex2 = 7; monthIndex2 < 12; monthIndex2++) {
      bindingOptions._currentView.monthCheckBoxes[monthIndex2] = buildCheckBox(months2Container, _configuration.monthNames[monthIndex2]).input;
    }
    addToolTip(closeButton, bindingOptions, _configuration.closeToolTipText);
  }
  function showConfigurationDialog(bindingOptions) {
    showDisabledBackground(bindingOptions);
    if (isDefined(bindingOptions._currentView.configurationDialog) && bindingOptions._currentView.configurationDialog.style.display !== "block") {
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
    if (isDefined(bindingOptions._currentView.configurationDialog) && bindingOptions._currentView.configurationDialog.style.display !== "none") {
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
    if (!isDefined(bindingOptions._currentView.tooltip)) {
      bindingOptions._currentView.tooltip = createElement(documentObject.body, "div", "heat-js-tooltip");
      bindingOptions._currentView.tooltip.style.display = "none";
      assignToolTipEvents(bindingOptions);
    }
  }
  function assignToolTipEvents(bindingOptions, add = true) {
    let addEventListener_Window = add ? windowObject.addEventListener : windowObject.removeEventListener;
    let addEventListener_Document = add ? documentObject.addEventListener : documentObject.removeEventListener;
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
    cancelBubble(e);
    hideToolTip(bindingOptions);
    bindingOptions._currentView.tooltipTimer = setTimeout(function() {
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
  function renderControlTitleBar(bindingOptions) {
    if (bindingOptions.title.showText || bindingOptions.title.showYearSelector || bindingOptions.title.showRefreshButton || bindingOptions.title.showExportButton || bindingOptions.title.showImportButton) {
      const titleBar = createElement(bindingOptions._currentView.element, "div", "title-bar");
      const title = createElement(titleBar, "div", "title");
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
        const importData = createElementWithHTML(titleBar, "button", "import", _configuration.importButtonText);
        importData.onclick = function() {
          importFromFilesSelected(bindingOptions);
        };
      }
      if (bindingOptions.title.showExportButton) {
        const exportData = createElementWithHTML(titleBar, "button", "export", _configuration.exportButtonText);
        exportData.onclick = function() {
          exportAllData(bindingOptions);
        };
      }
      if (bindingOptions.title.showRefreshButton) {
        const refresh = createElementWithHTML(titleBar, "button", "refresh", _configuration.refreshButtonText);
        refresh.onclick = function() {
          renderControlContainer(bindingOptions);
          fireCustomTriggerEvent(bindingOptions.events.onRefresh, bindingOptions._currentView.element);
        };
      }
      if (bindingOptions.title.showYearSelector) {
        const back = createElementWithHTML(titleBar, "button", "back", _configuration.backButtonText);
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
          let configureButton = createElement(titleBar, "div", "configure");
          addToolTip(configureButton, bindingOptions, _configuration.configurationToolTipText);
          configureButton.onclick = function() {
            showConfigurationDialog(bindingOptions);
          };
        }
        const next = createElementWithHTML(titleBar, "button", "next", _configuration.nextButtonText);
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
    const titlesMenuContainer = createElement(title, "div", "titles-menu-container");
    const titlesMenu = createElement(titlesMenuContainer, "div", "titles-menu");
    if (bindingOptions.title.showTitleDropDownHeaders) {
      createElementWithHTML(titlesMenu, "div", "title-menu-header", _configuration.dataText + ":" /* colon */);
    }
    const menuItemMap = createElementWithHTML(titlesMenu, "div", "title-menu-item", _configuration.mapText);
    renderTitleDropDownMenuItemClickEvent(bindingOptions, menuItemMap, 1 /* map */, "map" /* map */);
    if (bindingOptions.views.chart.enabled) {
      const menuItemChart = createElementWithHTML(titlesMenu, "div", "title-menu-item", _configuration.chartText);
      renderTitleDropDownMenuItemClickEvent(bindingOptions, menuItemChart, 2 /* chart */, "chart" /* chart */);
    }
    if (bindingOptions.views.days.enabled) {
      if (bindingOptions.title.showTitleDropDownHeaders) {
        createElementWithHTML(titlesMenu, "div", "title-menu-header", _configuration.yearText + ":" /* colon */);
      }
      const menuItemDays = createElementWithHTML(titlesMenu, "div", "title-menu-item", _configuration.daysText);
      renderTitleDropDownMenuItemClickEvent(bindingOptions, menuItemDays, 3 /* days */, "days" /* days */);
    }
    if (bindingOptions.views.statistics.enabled) {
      if (bindingOptions.title.showTitleDropDownHeaders) {
        createElementWithHTML(titlesMenu, "div", "title-menu-header", _configuration.statisticsText + ":" /* colon */);
      }
      const menuItemStatistics = createElementWithHTML(titlesMenu, "div", "title-menu-item", _configuration.colorRangesText);
      renderTitleDropDownMenuItemClickEvent(bindingOptions, menuItemStatistics, 4 /* statistics */, "statistics" /* statistics */);
    }
  }
  function renderTitleDropDownMenuItemClickEvent(bindingOptions, option, view, viewName) {
    if (bindingOptions._currentView.view === view) {
      addClass(option, "title-menu-item-active");
    } else {
      option.onclick = function() {
        bindingOptions._currentView.view = view;
        fireCustomTriggerEvent(bindingOptions.events.onViewSwitch, viewName);
        renderControlContainer(bindingOptions, false, true);
      };
    }
  }
  function renderYearDropDownMenu(bindingOptions) {
    createElement(bindingOptions._currentView.yearText, "div", "down-arrow");
    const yearsMenuContainer = createElement(bindingOptions._currentView.yearText, "div", "years-menu-container");
    const yearsMenu = createElement(yearsMenuContainer, "div", "years-menu");
    const thisYear = (/* @__PURE__ */ new Date()).getFullYear();
    let activeYearMenuItem = null;
    yearsMenuContainer.style.display = "block";
    yearsMenuContainer.style.visibility = "hidden";
    for (let currentYear = thisYear - bindingOptions.title.extraSelectionYears; currentYear < thisYear + bindingOptions.title.extraSelectionYears; currentYear++) {
      if (isYearVisible(bindingOptions, currentYear)) {
        let yearMenuItem = renderYearDropDownMenuItem(bindingOptions, yearsMenu, currentYear, thisYear);
        if (!isDefined(activeYearMenuItem)) {
          activeYearMenuItem = yearMenuItem;
        }
      }
    }
    if (isDefined(activeYearMenuItem)) {
      yearsMenu.scrollTop = activeYearMenuItem.offsetTop - yearsMenu.offsetHeight / 2;
    }
    yearsMenuContainer.style.display = "none";
    yearsMenuContainer.style.visibility = "visible";
  }
  function renderYearDropDownMenuItem(bindingOptions, years, currentYear, actualYear) {
    let result2 = null;
    const year = createElementWithHTML(years, "div", "year-menu-item", currentYear.toString());
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
  }
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
      const noDataMessage = createElementWithHTML(bindingOptions._currentView.mapContents, "div", "no-data-message", _configuration.noMapDataMessage);
      if (isForViewSwitch) {
        addClass(noDataMessage, "view-switch");
      }
    } else {
      bindingOptions._currentView.mapContents.style.minHeight = "unset";
      makeAreaDroppable(bindingOptions._currentView.mapContents, bindingOptions);
      const map = createElement(bindingOptions._currentView.mapContents, "div", "map");
      const currentYear = bindingOptions._currentView.year;
      let monthAdded = false;
      if (isForViewSwitch) {
        addClass(map, "view-switch");
      }
      if (bindingOptions.views.map.showDayNames) {
        const days = createElement(map, "div", "days");
        const showMinimalDays = bindingOptions.views.map.showMinimalDayNames && bindingOptions.views.map.daysToShow.length === 7;
        if (!bindingOptions.views.map.showMonthNames || bindingOptions.views.map.placeMonthNamesOnTheBottom) {
          days.className = "days-months-bottom";
        }
        for (let dayNameIndex = 0; dayNameIndex < 7; dayNameIndex++) {
          if (isDayVisible(bindingOptions.views.map.daysToShow, dayNameIndex + 1)) {
            const dayText = !showMinimalDays || dayNameIndex % 3 === 0 ? _configuration.dayNames[dayNameIndex] : " " /* space */;
            createElementWithHTML(days, "div", "day-name", dayText);
          }
        }
        if (bindingOptions.views.map.showDaysInReverseOrder) {
          reverseElementsOrder(days);
        }
      }
      const months = createElement(map, "div", "months");
      const colorRanges = getSortedColorRanges(bindingOptions);
      for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
        if (isMonthVisible(bindingOptions.views.map.monthsToShow, monthIndex)) {
          const month = createElement(months, "div", "month");
          const dayColumns = createElement(month, "div", "day-columns");
          let totalDaysInMonth = getTotalDaysInMonth(currentYear, monthIndex);
          let currentDayColumn = createElement(dayColumns, "div", "day-column");
          let startFillingDays = false;
          const firstDayInMonth = new Date(currentYear, monthIndex, 1);
          const firstDayNumberInMonth = getWeekdayNumber(firstDayInMonth);
          let actualDay = 1;
          totalDaysInMonth += firstDayNumberInMonth;
          for (let dayIndex = 0; dayIndex < totalDaysInMonth; dayIndex++) {
            if (dayIndex >= firstDayNumberInMonth) {
              startFillingDays = true;
            } else {
              if (isDayVisible(bindingOptions.views.map.daysToShow, actualDay)) {
                createElement(currentDayColumn, "div", "day-disabled");
              }
            }
            if (startFillingDays) {
              let day = null;
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
                  let marginLeft = getStyleValueByName(day, "margin-left", true);
                  let marginRight = getStyleValueByName(day, "margin-right", true);
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
              monthName = createElementWithHTML(month, "div", "month-name", _configuration.monthNames[monthIndex], dayColumns);
            } else {
              monthName = createElementWithHTML(month, "div", "month-name-bottom", _configuration.monthNames[monthIndex]);
            }
            if (isDefined(monthName)) {
              if (bindingOptions.views.map.showMonthDayGaps) {
                monthName.style.width = monthWidth + "px";
              } else {
                monthName.style.width = monthWidth - _elements_Day_Width + "px";
              }
            }
          }
          if (monthAdded && isDefined(_elements_Day_Width)) {
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
  }
  function renderControlMapMonthDay(bindingOptions, currentDayColumn, dayNumber, month, year, colorRanges) {
    const actualDay = dayNumber + 1;
    const day = createElement(currentDayColumn, "div", "day");
    const date = new Date(year, month, actualDay);
    let dateCount = _elements_DateCounts[bindingOptions._currentView.element.id].type[bindingOptions._currentView.type][toStorageDate(date)];
    dateCount = getDefaultNumber(dateCount, 0);
    renderDayToolTip(bindingOptions, day, date, dateCount);
    if (bindingOptions.views.map.showDayNumbers && dateCount > 0) {
      day.innerHTML = dateCount.toString();
    }
    if (isDefinedFunction(bindingOptions.events.onDayClick)) {
      day.onclick = function() {
        fireCustomTriggerEvent(bindingOptions.events.onDayClick, date, dateCount);
      };
    } else {
      addClass(day, "no-hover");
    }
    const useColorRange = getColorRange(bindingOptions, colorRanges, dateCount, date);
    if (isDefined(useColorRange) && isColorRangeVisible(bindingOptions, useColorRange.id)) {
      if (isDefinedString(useColorRange.mapCssClassName)) {
        addClass(day, useColorRange.mapCssClassName);
      } else {
        addClass(day, useColorRange.cssClassName);
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
    bindingOptions._currentView.chartContents = createElement(bindingOptions._currentView.element, "div", "chart-contents");
    makeAreaDroppable(bindingOptions._currentView.chartContents, bindingOptions);
  }
  function renderControlChart(bindingOptions, isForViewSwitch) {
    const chart = createElement(bindingOptions._currentView.chartContents, "div", "chart");
    let labels = createElement(chart, "div", "y-labels");
    const dayLines = createElement(chart, "div", "day-lines");
    const colorRanges = getSortedColorRanges(bindingOptions);
    const largestValueForCurrentYear = getLargestValueForChartYear(bindingOptions);
    const currentYear = bindingOptions._currentView.year;
    let labelsWidth = 0;
    if (isForViewSwitch) {
      addClass(chart, "view-switch");
    }
    if (largestValueForCurrentYear > 0 && bindingOptions.views.chart.showChartYLabels) {
      const topLabel = createElementWithHTML(labels, "div", "label-0", largestValueForCurrentYear.toString());
      createElementWithHTML(labels, "div", "label-25", (mathObject.floor(largestValueForCurrentYear / 4) * 3).toString());
      createElementWithHTML(labels, "div", "label-50", mathObject.floor(largestValueForCurrentYear / 2).toString());
      createElementWithHTML(labels, "div", "label-75", mathObject.floor(largestValueForCurrentYear / 4).toString());
      createElementWithHTML(labels, "div", "label-100", "0" /* zero */);
      labels.style.width = topLabel.offsetWidth + "px";
      labelsWidth = labels.offsetWidth + getStyleValueByName(labels, "margin-right", true);
    } else {
      labels.parentNode.removeChild(labels);
      labels = null;
    }
    if (largestValueForCurrentYear === 0) {
      bindingOptions._currentView.chartContents.style.minHeight = bindingOptions._currentView.mapContents.offsetHeight + "px";
      chart.parentNode.removeChild(chart);
      const noDataMessage = createElementWithHTML(bindingOptions._currentView.chartContents, "div", "no-data-message", _configuration.noChartDataMessage);
      if (isForViewSwitch) {
        addClass(noDataMessage, "view-switch");
      }
    } else {
      const pixelsPerNumbers = bindingOptions._currentView.mapContents.offsetHeight / largestValueForCurrentYear;
      let totalMonths = 0;
      let totalDays = 0;
      for (let monthIndex1 = 0; monthIndex1 < 12; monthIndex1++) {
        if (isMonthVisible(bindingOptions.views.chart.monthsToShow, monthIndex1)) {
          const totalDaysInMonth = getTotalDaysInMonth(currentYear, monthIndex1);
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
        reverseElementsOrder(dayLines);
      }
      if (bindingOptions.views.chart.showMonthNames) {
        const chartMonths = createElement(bindingOptions._currentView.chartContents, "div", "chart-months");
        const linesWidth = dayLines.offsetWidth / totalMonths;
        let monthTimesValue = 0;
        const addMonthName = function(addMonthNameIndex) {
          if (isMonthVisible(bindingOptions.views.chart.monthsToShow, addMonthNameIndex)) {
            let monthName = createElementWithHTML(chartMonths, "div", "month-name", _configuration.monthNames[addMonthNameIndex]);
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
        const monthNameSpace = createElement(chartMonths, "div", "month-name-space");
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
    const dayLine = createElement(dayLines, "div", "day-line");
    let dateCount = getCurrentViewData(bindingOptions)[toStorageDate(date)];
    dateCount = getDefaultNumber(dateCount, 0);
    renderDayToolTip(bindingOptions, dayLine, date, dateCount);
    if (bindingOptions.views.chart.showLineNumbers && dateCount > 0) {
      addClass(dayLine, "day-line-number");
      dayLine.innerHTML = dateCount.toString();
    }
    const dayLineHeight = dateCount * pixelsPerNumbers;
    dayLine.style.height = dayLineHeight + "px";
    if (dayLineHeight <= 0) {
      dayLine.style.visibility = "hidden";
    }
    if (isDefinedFunction(bindingOptions.events.onDayClick)) {
      dayLine.onclick = function() {
        fireCustomTriggerEvent(bindingOptions.events.onDayClick, date, dateCount);
      };
    } else {
      addClass(dayLine, "no-hover");
    }
    const useColorRange = getColorRange(bindingOptions, colorRanges, dateCount, date);
    if (isDefined(useColorRange) && isColorRangeVisible(bindingOptions, useColorRange.id)) {
      if (isDefinedString(useColorRange.chartCssClassName)) {
        addClass(dayLine, useColorRange.chartCssClassName);
      } else {
        addClass(dayLine, useColorRange.cssClassName);
      }
    }
  }
  function getLargestValueForChartYear(bindingOptions) {
    let result2 = 0;
    const data = getCurrentViewData(bindingOptions);
    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      const totalDaysInMonth = getTotalDaysInMonth(bindingOptions._currentView.year, monthIndex);
      for (let dayIndex = 0; dayIndex < totalDaysInMonth; dayIndex++) {
        const storageDate = toStorageDate(new Date(bindingOptions._currentView.year, monthIndex, dayIndex + 1));
        if (data.hasOwnProperty(storageDate)) {
          if (isMonthVisible(bindingOptions.views.chart.monthsToShow, monthIndex) && isDayVisible(bindingOptions.views.chart.daysToShow, dayIndex + 1)) {
            result2 = mathObject.max(result2, parseInt(data[storageDate]));
          }
        }
      }
    }
    return result2;
  }
  function renderControlDaysContents(bindingOptions) {
    bindingOptions._currentView.daysContents = createElement(bindingOptions._currentView.element, "div", "days-contents");
    makeAreaDroppable(bindingOptions._currentView.daysContents, bindingOptions);
  }
  function renderControlDays(bindingOptions, isForViewSwitch) {
    const days = createElement(bindingOptions._currentView.daysContents, "div", "days");
    const dayNames = createElement(bindingOptions._currentView.daysContents, "div", "day-names");
    let labels = createElement(days, "div", "y-labels");
    const dayLines = createElement(days, "div", "day-lines");
    const dayValuesForCurrentYear = getLargestValuesForEachDay(bindingOptions);
    if (isForViewSwitch) {
      addClass(days, "view-switch");
    }
    if (dayValuesForCurrentYear.largestValue > 0 && bindingOptions.views.days.showChartYLabels) {
      const topLabel = createElementWithHTML(labels, "div", "label-0", dayValuesForCurrentYear.largestValue.toString());
      createElementWithHTML(labels, "div", "label-25", (mathObject.floor(dayValuesForCurrentYear.largestValue / 4) * 3).toString());
      createElementWithHTML(labels, "div", "label-50", mathObject.floor(dayValuesForCurrentYear.largestValue / 2).toString());
      createElementWithHTML(labels, "div", "label-75", mathObject.floor(dayValuesForCurrentYear.largestValue / 4).toString());
      createElementWithHTML(labels, "div", "label-100", "0" /* zero */);
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
      const noDataMessage = createElementWithHTML(bindingOptions._currentView.daysContents, "div", "no-days-message", _configuration.noDaysDataMessage);
      if (isForViewSwitch) {
        addClass(noDataMessage, "view-switch");
      }
    } else {
      const pixelsPerNumbers = bindingOptions._currentView.mapContents.offsetHeight / dayValuesForCurrentYear.largestValue;
      for (let day in dayValuesForCurrentYear.days) {
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
    const dayLine = createElement(dayLines, "div", "day-line");
    const dayLineHeight = dayCount * pixelsPerNumbers;
    dayLine.style.height = dayLineHeight + "px";
    if (dayLineHeight <= 0) {
      dayLine.style.visibility = "hidden";
    }
    addToolTip(dayLine, bindingOptions, dayCount.toString());
    if (isDefinedFunction(bindingOptions.events.onWeekDayClick)) {
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
      const totalDaysInMonth = getTotalDaysInMonth(bindingOptions._currentView.year, monthIndex);
      for (let dayIndex = 0; dayIndex < totalDaysInMonth; dayIndex++) {
        const storageDate = toStorageDate(new Date(bindingOptions._currentView.year, monthIndex, dayIndex + 1));
        if (data.hasOwnProperty(storageDate)) {
          const storageDateParts = getStorageDate(storageDate);
          const storageDateObject = new Date(parseInt(storageDateParts[2]), parseInt(storageDateParts[1]), parseInt(storageDateParts[0]));
          const weekDayNumber = getWeekdayNumber(storageDateObject) + 1;
          if (!isHoliday(bindingOptions, storageDateObject).matched && isMonthVisible(bindingOptions.views.days.monthsToShow, storageDateObject.getMonth()) && isDayVisible(bindingOptions.views.days.daysToShow, weekDayNumber)) {
            days[weekDayNumber] += data[storageDate];
            largestValue = mathObject.max(largestValue, days[weekDayNumber]);
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
    bindingOptions._currentView.statisticsContents = createElement(bindingOptions._currentView.element, "div", "statistics-contents");
    makeAreaDroppable(bindingOptions._currentView.statisticsContents, bindingOptions);
  }
  function renderControlStatistics(bindingOptions, isForViewSwitch) {
    const statistics = createElement(bindingOptions._currentView.statisticsContents, "div", "statistics");
    const statisticsRanges = createElement(bindingOptions._currentView.statisticsContents, "div", "statistics-ranges");
    let labels = createElement(statistics, "div", "y-labels");
    const rangeLines = createElement(statistics, "div", "range-lines");
    const colorRanges = getSortedColorRanges(bindingOptions);
    const colorRangeValuesForCurrentYear = getLargestValuesForEachRangeType(bindingOptions, colorRanges);
    if (isForViewSwitch) {
      addClass(statistics, "view-switch");
    }
    if (colorRangeValuesForCurrentYear.largestValue > 0 && bindingOptions.views.statistics.showChartYLabels) {
      const topLabel = createElementWithHTML(labels, "div", "label-0", colorRangeValuesForCurrentYear.largestValue.toString());
      createElementWithHTML(labels, "div", "label-25", (mathObject.floor(colorRangeValuesForCurrentYear.largestValue / 4) * 3).toString());
      createElementWithHTML(labels, "div", "label-50", mathObject.floor(colorRangeValuesForCurrentYear.largestValue / 2).toString());
      createElementWithHTML(labels, "div", "label-75", mathObject.floor(colorRangeValuesForCurrentYear.largestValue / 4).toString());
      createElementWithHTML(labels, "div", "label-100", "0" /* zero */);
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
      const noDataMessage = createElementWithHTML(bindingOptions._currentView.statisticsContents, "div", "no-statistics-message", _configuration.noStatisticsDataMessage);
      if (isForViewSwitch) {
        addClass(noDataMessage, "view-switch");
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
            if (!bindingOptions.views.statistics.useColorRangeNamesForLabels || !isDefined(useColorRange) || !isDefinedString(useColorRange.name)) {
              createElementWithHTML(statisticsRanges, "div", "range-name", type + "+" /* plus */);
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
  }
  function renderControlStatisticsRangeLine(colorRangeMinimum, dayLines, rangeCount, bindingOptions, colorRanges, pixelsPerNumbers) {
    const rangeLine = createElement(dayLines, "div", "range-line");
    const useColorRange = getColorRangeByMinimum(colorRanges, colorRangeMinimum);
    const rangeLineHeight = rangeCount * pixelsPerNumbers;
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
      rangeLine.onclick = function() {
        fireCustomTriggerEvent(bindingOptions.events.onStatisticClick, useColorRange);
      };
    } else {
      addClass(rangeLine, "no-hover");
    }
    if (isDefined(useColorRange) && isColorRangeVisible(bindingOptions, useColorRange.id)) {
      if (isDefinedString(useColorRange.statisticsCssClassName)) {
        addClass(rangeLine, useColorRange.statisticsCssClassName);
      } else {
        addClass(rangeLine, useColorRange.cssClassName);
      }
    }
  }
  function getLargestValuesForEachRangeType(bindingOptions, colorRanges) {
    const types = {};
    const data = getCurrentViewData(bindingOptions);
    let largestValue = 0;
    types["0" /* zero */] = 0;
    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      const totalDaysInMonth = getTotalDaysInMonth(bindingOptions._currentView.year, monthIndex);
      for (let dayIndex = 0; dayIndex < totalDaysInMonth; dayIndex++) {
        const storageDate = toStorageDate(new Date(bindingOptions._currentView.year, monthIndex, dayIndex + 1));
        if (data.hasOwnProperty(storageDate)) {
          const storageDateParts = getStorageDate(storageDate);
          const storageDateObject = new Date(parseInt(storageDateParts[2]), parseInt(storageDateParts[1]), parseInt(storageDateParts[0]));
          const weekDayNumber = getWeekdayNumber(storageDateObject) + 1;
          if (!isHoliday(bindingOptions, storageDateObject).matched && isMonthVisible(bindingOptions.views.statistics.monthsToShow, storageDateObject.getMonth()) && isDayVisible(bindingOptions.views.statistics.daysToShow, weekDayNumber)) {
            const useColorRange = getColorRange(bindingOptions, colorRanges, data[storageDate]);
            if (!isDefined(useColorRange)) {
              types["0" /* zero */]++;
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
      types,
      largestValue
    };
  }
  function renderControlViewGuide(bindingOptions) {
    const guide = createElement(bindingOptions._currentView.element, "div", "guide");
    const mapTypes = createElement(guide, "div", "map-types");
    let noneTypeCount = 0;
    for (let storageDate in _elements_DateCounts[bindingOptions._currentView.element.id].type[_configuration.unknownTrendText]) {
      if (_elements_DateCounts[bindingOptions._currentView.element.id].type[_configuration.unknownTrendText].hasOwnProperty(storageDate)) {
        noneTypeCount++;
        break;
      }
    }
    if (_elements_DateCounts[bindingOptions._currentView.element.id].types > 1) {
      if (isDefinedString(bindingOptions.description.text)) {
        const description = createElement(bindingOptions._currentView.element, "div", "description", guide);
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
      const mapToggles = createElement(guide, "div", "map-toggles");
      if (bindingOptions.guide.showLessAndMoreLabels) {
        let lessText = createElementWithHTML(mapToggles, "div", "less-text", _configuration.lessText);
        if (bindingOptions.guide.colorRangeTogglesEnabled) {
          lessText.onclick = function() {
            updateColorRangeToggles(bindingOptions, false);
          };
        } else {
          addClass(lessText, "no-click");
        }
      }
      const days = createElement(mapToggles, "div", "days");
      const colorRanges = getSortedColorRanges(bindingOptions);
      const colorRangesLength = colorRanges.length;
      for (let colorRangesIndex = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++) {
        renderControlViewGuideDay(bindingOptions, days, colorRanges[colorRangesIndex]);
      }
      if (bindingOptions.guide.showLessAndMoreLabels) {
        const moreText = createElementWithHTML(mapToggles, "div", "more-text", _configuration.moreText);
        if (bindingOptions.guide.colorRangeTogglesEnabled) {
          moreText.onclick = function() {
            updateColorRangeToggles(bindingOptions, true);
          };
        } else {
          addClass(moreText, "no-click");
        }
      }
    }
  }
  function renderControlViewGuideTypeButton(bindingOptions, mapTypes, type) {
    const typeButton = createElementWithHTML(mapTypes, "button", "type", type);
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
  }
  function renderControlViewGuideDay(bindingOptions, days, colorRange) {
    const day = createElement(days, "div");
    day.className = "day";
    addToolTip(day, bindingOptions, colorRange.tooltipText);
    if (isColorRangeVisible(bindingOptions, colorRange.id)) {
      if (bindingOptions._currentView.view === 1 /* map */ && isDefinedString(colorRange.mapCssClassName)) {
        addClass(day, colorRange.mapCssClassName);
      } else if (bindingOptions.views.chart.enabled && bindingOptions._currentView.view === 2 /* chart */ && isDefinedString(colorRange.chartCssClassName)) {
        addClass(day, colorRange.chartCssClassName);
      } else if (bindingOptions.views.statistics.enabled && bindingOptions._currentView.view === 4 /* statistics */ && isDefinedString(colorRange.statisticsCssClassName)) {
        addClass(day, colorRange.statisticsCssClassName);
      } else {
        addClass(day, colorRange.cssClassName);
      }
    }
    if (bindingOptions.guide.showNumbersInGuide) {
      addClass(day, "day-number");
      day.innerHTML = colorRange.minimum + "+" /* plus */;
    }
    if (bindingOptions.guide.colorRangeTogglesEnabled) {
      day.onclick = function() {
        toggleColorRangeVisibleState(bindingOptions, colorRange.id);
      };
    } else {
      addClass(day, "no-hover");
    }
  }
  function renderDescription(bindingOptions, container) {
    if (isDefinedString(bindingOptions.description.text)) {
      if (isDefinedString(bindingOptions.description.url)) {
        const link = createElementWithHTML(container, "a", "label", bindingOptions.description.text);
        link.href = bindingOptions.description.url;
        link.target = bindingOptions.description.urlTarget;
      } else {
        createElementWithHTML(container, "span", "label", bindingOptions.description.text);
      }
    }
  }
  function renderDayToolTip(bindingOptions, day, date, dateCount) {
    if (isDefinedFunction(bindingOptions.events.onDayToolTipRender)) {
      addToolTip(day, bindingOptions, fireCustomTriggerEvent(bindingOptions.events.onDayToolTipRender, date, dateCount));
    } else {
      let tooltip = getCustomFormattedDateText(bindingOptions.tooltip.dayText, date);
      if (bindingOptions.showHolidaysInDayToolTips) {
        let holiday = isHoliday(bindingOptions, date);
        if (holiday.matched && isDefinedString(holiday.name)) {
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
    if (bindingOptions.useLocalStorageForData && windowObject.localStorage) {
      const keysLength = windowObject.localStorage.length;
      const elementId = bindingOptions._currentView.element.id;
      for (let keyIndex = 0; keyIndex < keysLength; keyIndex++) {
        const key = windowObject.localStorage.key(keyIndex);
        if (startsWithAnyCase(key, _local_Storage_Start_ID)) {
          const typesJson = windowObject.localStorage.getItem(key);
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
    if (bindingOptions.useLocalStorageForData && windowObject.localStorage) {
      const elementId = bindingOptions._currentView.element.id;
      clearLocalStorageObjects(bindingOptions);
      const jsonData = jsonObject.stringify(_elements_DateCounts[elementId].type);
      windowObject.localStorage.setItem(_local_Storage_Start_ID + elementId, jsonData);
    }
  }
  function clearLocalStorageObjects(bindingOptions) {
    if (bindingOptions.useLocalStorageForData && windowObject.localStorage) {
      const keysLength = windowObject.localStorage.length;
      const keysToRemove = [];
      const elementId = bindingOptions._currentView.element.id;
      for (let keyIndex = 0; keyIndex < keysLength; keyIndex++) {
        if (startsWithAnyCase(windowObject.localStorage.key(keyIndex), _local_Storage_Start_ID + elementId)) {
          keysToRemove.push(windowObject.localStorage.key(keyIndex));
        }
      }
      const keysToRemoveLength = keysToRemove.length;
      for (let keyToRemoveIndex = 0; keyToRemoveIndex < keysToRemoveLength; keyToRemoveIndex++) {
        windowObject.localStorage.removeItem(keysToRemove[keyToRemoveIndex]);
      }
    }
  }
  function startDataPullTimer(bindingOptions) {
    if (bindingOptions._currentView.isInFetchMode) {
      if (!isDefined(bindingOptions._currentView.isInFetchModeTimer)) {
        pullDataFromCustomTrigger(bindingOptions);
      }
      if (!isDefined(bindingOptions._currentView.isInFetchModeTimer)) {
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
    if (isDefinedObject(data)) {
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
        if (isDefined(bindingOptions._currentView.isInFetchModeTimer)) {
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
        if (colorRange.id === id && getDefaultBoolean(colorRange.visible, true)) {
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
        colorRange.visible = !getDefaultBoolean(colorRange.visible, true);
        fireCustomTriggerEvent(bindingOptions.events.onColorRangeTypeToggle, colorRange.id, colorRange.visible);
        renderControlContainer(bindingOptions);
        break;
      }
    }
  }
  function getColorRange(bindingOptions, colorRanges, dateCount, date = null) {
    let useColorRange = null;
    if (isDefined(date) && isHoliday(bindingOptions, date).matched) {
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
    if (!isDefined(useColorRange)) {
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
      if (isDefinedString(holiday.date) && holiday.showInViews) {
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
      element.ondragover = cancelBubble;
      element.ondragenter = cancelBubble;
      element.ondragleave = cancelBubble;
      element.ondrop = function(e) {
        cancelBubble(e);
        if (isDefined(windowObject.FileReader) && e.dataTransfer.files.length > 0) {
          importFromFiles(e.dataTransfer.files, bindingOptions);
        }
      };
    }
  }
  function importFromFilesSelected(bindingOptions) {
    const input = createElementWithNoContainer("input");
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
      const jsonObject2 = getObjectFromString(e.target.result);
      if (jsonObject2.parsed && isDefinedObject(jsonObject2.result)) {
        readingObject = jsonObject2.result;
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
    const contentExportType = getDefaultString(exportType, bindingOptions.exportType).toLowerCase();
    if (contentExportType === "csv" /* csv */) {
      contents = getCsvContent(bindingOptions);
    } else if (contentExportType === "json" /* json */) {
      contents = getJsonContent(bindingOptions);
    } else if (contentExportType === "xml" /* xml */) {
      contents = getXmlContents(bindingOptions);
    } else if (contentExportType === "txt" /* txt */) {
      contents = getTxtContents(bindingOptions);
    }
    if (isDefinedString(contents)) {
      const tempLink = createElement(documentObject.body, "a");
      tempLink.style.display = "none";
      tempLink.setAttribute("target", "_blank");
      tempLink.setAttribute("href", "data:" + contentsMimeType + ";charset=utf-8," + encodeURIComponent(contents));
      tempLink.setAttribute("download", getExportFilename(bindingOptions));
      tempLink.click();
      documentObject.body.removeChild(tempLink);
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
    return jsonObject.stringify(getExportData(bindingOptions));
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
        const totalDaysInMonth = getTotalDaysInMonth(bindingOptions._currentView.year, monthIndex);
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
    const datePart = padNumber(date.getDate()) + "-" /* dash */ + padNumber(date.getMonth() + 1) + "-" /* dash */ + date.getFullYear();
    const timePart = padNumber(date.getHours()) + "-" /* dash */ + padNumber(date.getMinutes());
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
    let options = getDefaultObject(newOptions, {});
    options.views = getDefaultObject(options.views, {});
    options.exportOnlyYearBeingViewed = getDefaultBoolean(options.exportOnlyYearBeingViewed, true);
    options.year = getDefaultNumber(options.year, (/* @__PURE__ */ new Date()).getFullYear());
    options.view = getDefaultString(options.view, "map" /* map */);
    options.exportType = getDefaultString(options.exportType, "csv" /* csv */);
    options.useLocalStorageForData = getDefaultBoolean(options.useLocalStorageForData, false);
    options.allowFileImports = getDefaultBoolean(options.allowFileImports, true);
    options.yearsToHide = getDefaultArray(options.yearsToHide, []);
    options.dataFetchDelay = getDefaultNumber(options.dataFetchDelay, 6e4);
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
      const colorRangesLength = options.colorRanges.length;
      for (let colorRangeIndex = 0; colorRangeIndex < colorRangesLength; colorRangeIndex++) {
        const colorRange = options.colorRanges[colorRangeIndex];
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
    } else {
      options.colorRanges = [
        {
          id: newGuid(),
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
          id: newGuid(),
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
          id: newGuid(),
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
          id: newGuid(),
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
    if (isDefinedArray(options.holidays)) {
      const holidaysLength = options.holidays.length;
      for (let holidayIndex = 0; holidayIndex < holidaysLength; holidayIndex++) {
        const holiday = options.holidays[holidayIndex];
        holiday.date = getDefaultString(holiday.date, null);
        holiday.name = getDefaultString(holiday.name, null);
        holiday.showInViews = getDefaultBoolean(holiday.showInViews, true);
      }
    } else {
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
  function getTotalDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }
  function getWeekdayNumber(date) {
    return date.getDay() - 1 < 0 ? 6 : date.getDay() - 1;
  }
  function getDayOrdinal(value) {
    let result2 = _configuration.thText;
    if (value === 31 || value === 21 || value === 1) {
      result2 = _configuration.stText;
    } else if (value === 22 || value === 2) {
      result2 = _configuration.ndText;
    } else if (value === 23 || value === 3) {
      result2 = _configuration.rdText;
    }
    return result2;
  }
  function getCustomFormattedDateText(dateFormat, date) {
    let result2 = dateFormat;
    const weekDayNumber = getWeekdayNumber(date);
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
  }
  function createElementWithNoContainer(type) {
    let result2 = null;
    const nodeType = type.toLowerCase();
    const isText = nodeType === "text";
    if (!_elements_Type.hasOwnProperty(nodeType)) {
      _elements_Type[nodeType] = isText ? documentObject.createTextNode("" /* empty */) : documentObject.createElement(nodeType);
    }
    result2 = _elements_Type[nodeType].cloneNode(false);
    return result2;
  }
  function createElement(container, type, className = "" /* empty */, beforeNode = null) {
    let result2 = null;
    const nodeType = type.toLowerCase();
    const isText = nodeType === "text";
    if (!_elements_Type.hasOwnProperty(nodeType)) {
      _elements_Type[nodeType] = isText ? documentObject.createTextNode("" /* empty */) : documentObject.createElement(nodeType);
    }
    result2 = _elements_Type[nodeType].cloneNode(false);
    if (isDefined(className)) {
      result2.className = className;
    }
    if (isDefined(beforeNode)) {
      container.insertBefore(result2, beforeNode);
    } else {
      container.appendChild(result2);
    }
    return result2;
  }
  function createElementWithHTML(container, type, className, html, beforeNode = null) {
    const element = createElement(container, type, className, beforeNode);
    element.innerHTML = html;
    return element;
  }
  function getStyleValueByName(element, stylePropertyName, toNumber = false) {
    let value = null;
    if (documentObject.defaultView.getComputedStyle) {
      value = documentObject.defaultView.getComputedStyle(element, null).getPropertyValue(stylePropertyName);
    } else if (element.currentStyle) {
      value = element.currentStyle[stylePropertyName];
    }
    if (toNumber) {
      value = parseFloat(value);
    }
    return value;
  }
  function addClass(element, className) {
    element.className += " " /* space */ + className;
    element.className = element.className.trim();
  }
  function removeClass(element, className) {
    element.className = element.className.replace(className, "" /* empty */);
    element.className = element.className.trim();
  }
  function cancelBubble(e) {
    e.preventDefault();
    e.cancelBubble = true;
  }
  function getScrollPosition() {
    const doc = documentObject.documentElement;
    const left = (windowObject.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    const top = (windowObject.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    return {
      left,
      top
    };
  }
  function showElementAtMousePosition(e, element) {
    let left = e.pageX;
    let top = e.pageY;
    const scrollPosition = getScrollPosition();
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
  }
  function reverseElementsOrder(parent) {
    const children = parent.children;
    let childrenLength = children.length - 1;
    for (; childrenLength--; ) {
      parent.appendChild(children[childrenLength]);
    }
  }
  function buildCheckBox(container, labelText, checked = null, onClick = null) {
    const lineContainer = createElement(container, "div");
    const label = createElement(lineContainer, "label", "checkbox");
    const input = createElement(label, "input");
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
      input,
      label
    };
  }
  function fireCustomTriggerEvent(triggerFunction, ...args) {
    let result2 = null;
    if (isDefinedFunction(triggerFunction)) {
      result2 = triggerFunction.apply(null, [].slice.call(args, 0));
    }
    return result2;
  }
  function isDefined(value) {
    return value !== null && value !== void 0 && value.toString() !== "" /* empty */;
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
  function isInvalidOptionArray(array, minimumLength = 1) {
    return !isDefinedArray(array) || array.length < minimumLength;
  }
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
    let result2 = defaultValue;
    if (isDefinedString(value)) {
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
  function getObjectFromString(objectString) {
    let parsed = true, result = null;
    try {
      if (isDefinedString(objectString)) {
        result = jsonObject.parse(objectString);
      }
    } catch (e1) {
      try {
        let evalResult = result = eval("(" + objectString + ")");
        if (isDefinedFunction(result)) {
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
  function newGuid() {
    const result2 = [];
    for (let charIndex = 0; charIndex < 32; charIndex++) {
      if (charIndex === 8 || charIndex === 12 || charIndex === 16 || charIndex === 20) {
        result2.push("-" /* dash */);
      }
      const character = mathObject.floor(mathObject.random() * 16).toString(16);
      result2.push(character);
    }
    return result2.join("" /* empty */);
  }
  function padNumber(number) {
    const numberString = number.toString();
    return numberString.length === 1 ? "0" /* zero */ + numberString : numberString;
  }
  function startsWithAnyCase(data, start) {
    return data.substring(0, start.length).toLowerCase() === start.toLowerCase();
  }
  function toStorageDate(date) {
    return date.getFullYear() + "-" /* dash */ + padNumber(date.getMonth() + 1) + "-" /* dash */ + padNumber(date.getDate());
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
    removeClass(bindingOptions._currentView.element, "heat-js");
    assignToolTipEvents(bindingOptions, false);
    documentObject.body.removeChild(bindingOptions._currentView.tooltip);
    if (bindingOptions._currentView.isInFetchMode && isDefined(bindingOptions._currentView.isInFetchModeTimer)) {
      clearInterval(bindingOptions._currentView.isInFetchModeTimer);
    }
    fireCustomTriggerEvent(bindingOptions.events.onDestroy, bindingOptions._currentView.element);
  }
  function buildDefaultConfiguration(newConfiguration = null) {
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
  const _public = {
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public Functions:  Manage Dates
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    addDates: function(elementId, dates, type, triggerRefresh = true) {
      if (isDefinedString(elementId) && isDefinedArray(dates) && _elements_DateCounts.hasOwnProperty(elementId)) {
        const bindingOptions = _elements_DateCounts[elementId].options;
        if (!bindingOptions._currentView.isInFetchMode) {
          type = getDefaultString(type, _configuration.unknownTrendText);
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
    addDate: function(elementId, date, type, triggerRefresh = true) {
      if (isDefinedString(elementId) && isDefinedDate(date) && _elements_DateCounts.hasOwnProperty(elementId)) {
        const bindingOptions = _elements_DateCounts[elementId].options;
        if (!bindingOptions._currentView.isInFetchMode) {
          type = getDefaultString(type, _configuration.unknownTrendText);
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
    updateDate: function(elementId, date, count, type, triggerRefresh = true) {
      if (isDefinedString(elementId) && isDefinedDate(date) && _elements_DateCounts.hasOwnProperty(elementId)) {
        const bindingOptions = _elements_DateCounts[elementId].options;
        if (!bindingOptions._currentView.isInFetchMode && count > 0) {
          type = getDefaultString(type, _configuration.unknownTrendText);
          const storageDate = toStorageDate(date);
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
    removeDates: function(elementId, dates, type, triggerRefresh = true) {
      if (isDefinedString(elementId) && isDefinedArray(dates) && _elements_DateCounts.hasOwnProperty(elementId)) {
        const bindingOptions = _elements_DateCounts[elementId].options;
        if (!bindingOptions._currentView.isInFetchMode) {
          type = getDefaultString(type, _configuration.unknownTrendText);
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
    removeDate: function(elementId, date, type, triggerRefresh = true) {
      if (isDefinedString(elementId) && isDefinedDate(date) && _elements_DateCounts.hasOwnProperty(elementId)) {
        const bindingOptions = _elements_DateCounts[elementId].options;
        if (!bindingOptions._currentView.isInFetchMode) {
          type = getDefaultString(type, _configuration.unknownTrendText);
          const storageDate = toStorageDate(date);
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
    clearDate: function(elementId, date, type, triggerRefresh = true) {
      if (isDefinedString(elementId) && isDefinedDate(date) && _elements_DateCounts.hasOwnProperty(elementId)) {
        const bindingOptions = _elements_DateCounts[elementId].options;
        if (!bindingOptions._currentView.isInFetchMode) {
          type = getDefaultString(type, _configuration.unknownTrendText);
          const storageDate = toStorageDate(date);
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
    resetAll: function(triggerRefresh = true) {
      for (let elementId in _elements_DateCounts) {
        if (_elements_DateCounts.hasOwnProperty(elementId)) {
          _public.reset(elementId, triggerRefresh);
        }
      }
      return _public;
    },
    reset: function(elementId, triggerRefresh = true) {
      if (isDefinedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId)) {
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
      if (isDefinedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId) && isDefinedArray(files)) {
        importFromFiles(files, _elements_DateCounts[elementId].options);
      }
      return _public;
    },
    export: function(elementId, exportType) {
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
    refresh: function(elementId) {
      if (isDefinedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId)) {
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
      if (isDefinedString(elementId) && isDefinedNumber(year) && _elements_DateCounts.hasOwnProperty(elementId)) {
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
      if (isDefinedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId)) {
        const bindingOptions = _elements_DateCounts[elementId].options;
        const data = getCurrentViewData(bindingOptions);
        let maximumYear = 0;
        for (let storageDate in data) {
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
    setYearToLowest: function(elementId) {
      if (isDefinedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId)) {
        const bindingOptions = _elements_DateCounts[elementId].options;
        const data = getCurrentViewData(bindingOptions);
        let minimumYear = 9999;
        for (let storageDate in data) {
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
    moveToPreviousYear: function(elementId) {
      if (isDefinedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId)) {
        moveToPreviousYear(_elements_DateCounts[elementId].options);
      }
      return _public;
    },
    moveToNextYear: function(elementId) {
      if (isDefinedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId)) {
        moveToNextYear(_elements_DateCounts[elementId].options);
      }
      return _public;
    },
    moveToCurrentYear: function(elementId) {
      if (isDefinedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId)) {
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
      if (isDefinedString(elementId) && _elements_DateCounts.hasOwnProperty(elementId)) {
        const bindingOptions = _elements_DateCounts[elementId].options;
        result2 = bindingOptions._currentView.year;
      }
      return result2;
    },
    render: function(element, options) {
      if (isDefinedObject(element) && isDefinedObject(options)) {
        renderControl(renderBindingOptions(options, element));
      }
      return _public;
    },
    renderAll: function() {
      render();
      return _public;
    },
    switchView: function(elementId, viewName) {
      if (isDefinedString(elementId) && isDefinedString(viewName) && _elements_DateCounts.hasOwnProperty(elementId)) {
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
        if (isDefinedNumber(view)) {
          bindingOptions._currentView.view = view;
          fireCustomTriggerEvent(bindingOptions.events.onViewSwitch, viewName);
          renderControlContainer(bindingOptions, false, true);
        }
      }
      return _public;
    },
    switchType: function(elementId, type) {
      if (isDefinedString(elementId) && isDefinedString(type) && _elements_DateCounts.hasOwnProperty(elementId) && _elements_DateCounts[elementId].type.hasOwnProperty(type)) {
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
      if (isDefinedString(elementId) && isDefinedObject(newOptions) && _elements_DateCounts.hasOwnProperty(elementId)) {
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
    setConfiguration: function(newConfiguration, triggerRefresh = true) {
      if (isDefinedObject(newConfiguration)) {
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
    documentObject.addEventListener("DOMContentLoaded", function() {
      render();
    });
    windowObject.addEventListener("pagehide", function() {
      cancelAllPullDataTimers();
    });
    if (!isDefined(windowObject.$heat)) {
      windowObject.$heat = _public;
    }
  })();
})(document, window, Math, JSON);
/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        enum.ts
 * @version     v4.0.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2024
 */
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