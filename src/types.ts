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
    _currentView: BindingOptionsCurrentView,
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
    title: Title,
    description: Description,
    guide: Guide,
    tooltip: Tooltip,
    events: Events,
    views: {
        map: Map,
        chart: Chart,
        days: Days,
        statistics: Statistics
    };
};

export type BindingOptionsCurrentView = {
    element: HTMLElement,
    year: number,
    type: string,
    isInFetchMode: boolean,
    isInFetchModeTimer: number,
    yearsAvailable: number[],
    view: number,
    mapContents: HTMLElement,
    mapContentsScrollLeft: number;
    chartContents: HTMLElement,
    chartContentsScrollLeft: number,
    statisticsContents: HTMLElement,
    statisticsContentsScrollLeft: number,
    daysContents: HTMLElement,
    daysContentsScrollLeft: number,
    yearText: HTMLElement,
    tooltip: HTMLElement,
    tooltipTimer: number,
    dayCheckBoxes: any[],
    monthCheckBoxes: any[],
    configurationDialog: HTMLElement,
    disabledBackground: HTMLElement
};

export type Title = {
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

export type Description = {
    text: string;
    url: string;
    urlTarget: string;
};

export type Guide = {
    enabled: boolean;
    colorRangeTogglesEnabled: boolean;
    showLessAndMoreLabels: boolean;
    showNumbersInGuide: boolean;
};

export type Tooltip = {
    delay: number;
    dayText: string;
};

export type Map = {
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

export type Chart = {
    enabled: boolean;
    showChartYLabels: boolean;
    showMonthNames: boolean;
    showLineNumbers: boolean;
    showInReverseOrder: boolean;
    keepScrollPositions: boolean;
    monthsToShow: number[];
    daysToShow: number[];
};

export type Days = {
    enabled: boolean;
    showChartYLabels: boolean;
    showDayNames: boolean;
    showInReverseOrder: boolean;
    showDayNumbers: boolean;
    keepScrollPositions: boolean;
    monthsToShow: number[];
    daysToShow: number[];
};

export type Statistics = {
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

export type Events = {
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