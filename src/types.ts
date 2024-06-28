export type Configuration = {
	safeMode: boolean;
	domElementTypes: string[];
    stText: string;
    ndText: string;
    rdText: string;
    thText: string;
    backButtonText: string;
    nextButtonText: string;
    refreshButtonText: string;
    exportButtonText: string;
    lessText: string;
    moreText: string;
    dateText: string;
    countText: string;
    mapText: string;
    chartText: string;
    noChartDataMessage: string;
    statisticsText: string;
    noStatisticsDataMessage: string;
    unknownTrendText: string;
    importButtonText: string;
    noMapDataMessage: string;
    objectErrorText: string;
    attributeNotValidErrorText: string;
    attributeNotSetErrorText: string;
    closeToolTipText: string;
    configurationToolTipText: string;
    configurationTitleText: string;
    visibleMonthsText: string;
    visibleDaysText: string;
    dataText: string;
    colorRangesText: string;
    yearText: string;
    daysText: string;
    noDaysDataMessage: string;
	dayNames: string[];
	monthNames: string[];
};

export type BindingOptions = {
    _currentView: {
        element: HTMLElement,
        year: number,
        type: string,
        isInFetchMode: boolean,
        yearsAvailable: number[]
    },
    exportOnlyYearBeingViewed: boolean;
    year: number;
    view: string;
    exportType: string;
    useLocalStorageForData: boolean;
    allowFileImports: boolean;
    yearsToHide: number[];
    dataFetchDelay: number;
    showOnlyDataForYearsAvailable: boolean;
    showHolidaysInDayToolTips: boolean;
    colorRanges: ColorRange[];
    holidays: Holiday[];
    title: title,
    description: description,
    guide: guide,
    tooltip: tooltip,
    events: events,
    views: {
        map: map,
        chart: chart,
        days: days,
        statistics: statistics
    };
};

export type title = {
    text: string;
    showText: boolean;
    showYearSelector: boolean;
    showRefreshButton: boolean;
    showExportButton: boolean;
    extraSelectionYears: number;
    showYearSelectionDropDown: boolean;
    showImportButton: boolean;
    showConfigurationButton: boolean;
    showTitleDropDownButton: boolean;
    showTitleDropDownHeaders: boolean;
};

export type description = {
    text: string;
    url: string;
    urlTarget: string;
};

export type guide = {
    enabled: boolean;
    colorRangeTogglesEnabled: boolean;
    showLessAndMoreLabels: boolean;
    showNumbersInGuide: boolean;
};

export type tooltip = {
    delay: number;
    dayText: string;
};

export type map = {
    showMonthDayGaps: boolean;
    showDayNames: boolean;
    placeMonthNamesOnTheBottom: boolean;
    showDayNumbers: boolean;
    showMonthNames: boolean;
    showDaysInReverseOrder: boolean;
    showNoDataMessageWhenDataIsNotAvailable: boolean;
    showMinimalDayNames: boolean;
    showMonthsInReverseOrder: boolean;
    keepScrollPositions: boolean;
    monthsToShow: number[];
    daysToShow: number[];
};

export type chart = {
    enabled: boolean;
    showChartYLabels: boolean;
    showMonthNames: boolean;
    showLineNumbers: boolean;
    showInReverseOrder: boolean;
    keepScrollPositions: boolean;
    monthsToShow: number[];
    daysToShow: number[];
};

export type days = {
    enabled: boolean;
    showChartYLabels: boolean;
    showDayNames: boolean;
    showInReverseOrder: boolean;
    showDayNumbers: boolean;
    keepScrollPositions: boolean;
    monthsToShow: number[];
    daysToShow: number[];
};

export type statistics = {
    enabled: boolean;
    showChartYLabels: boolean;
    showColorRangeLabels: boolean;
    useColorRangeNamesForLabels: boolean;
    showRangeNumbers: boolean;
    showInReverseOrder: boolean;
    keepScrollPositions: boolean;
    monthsToShow: number[];
    daysToShow: number[];
};

export type events = {
    onDayClick: Function | null;
    onBackYear: Function | null;
    onNextYear: Function | null;
    onRefresh: Function | null;
    onBeforeRender: Function | null;
    onRenderComplete: Function | null;
    onDestroy: Function | null;
    onExport: Function | null;
    onSetYear: Function | null;
    onTypeSwitch: Function | null;
    onDayToolTipRender: Function | null;
    onAdd: Function | null;
    onRemove: Function | null;
    onReset: Function | null;
    onViewSwitch: Function | null;
    onColorRangeTypeToggle: Function | null;
    onImport: Function | null;
    onStatisticClick: Function | null;
    onDataFetch: Function | null;
    onClear: Function | null;
    onUpdate: Function | null;
    onOptionsUpdate: Function | null;
    onWeekDayClick: Function | null;
};

export type ColorRange = {
    id: string;
    name: string;
    minimum: number;
    cssClassName: string;
    mapCssClassName: string;
    chartCssClassName: string;
    statisticsCssClassName: string;
    tooltipText: string;
    visible: boolean;
};

export type Holiday = {
    date: string;
    name: string;
    showInViews: boolean;
};