/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        type.ts
 * @version     v5.0.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2025
 */


export type InstanceTypeDateCount = Record<string, number>;

export type InstanceData = Record<string, {
    options: BindingOptions;
    totalTypes: number;
    typeData: Record<string, InstanceTypeDateCount>;
}>;

export type StringToJson = {
    parsed: boolean;
    object: any;
};

export type Position = {
    left: number;
    top: number;
};

export type IsHoliday = {
    matched: boolean;
    name: string;
};

export type LargestValueForDays = {
    days: Record<number, number>;
    largestValue: number;
};

export type LargestValuesForEachRangeType = {
    types: InstanceTypeDateCount;
    largestValue: number;
};

export type Configuration = {
	safeMode?: boolean;
	domElementTypes?: string[] | string;
    observationMode?: boolean;
    text?: ConfigurationText;
};

export type ConfigurationText = {
    stText?: string;
    ndText?: string;
    rdText?: string;
    thText?: string;
    backButtonText?: string;
    nextButtonText?: string;
    refreshButtonText?: string;
    exportButtonText?: string;
    lessText?: string;
    moreText?: string;
    dateText?: string;
    countText?: string;
    mapText?: string;
    chartText?: string;
    noChartDataMessage?: string;
    statisticsText?: string;
    noStatisticsDataMessage?: string;
    unknownTrendText?: string;
    importButtonText?: string;
    noMapDataMessage?: string;
    objectErrorText?: string;
    attributeNotValidErrorText?: string;
    attributeNotSetErrorText?: string;
    closeToolTipText?: string;
    configurationToolTipText?: string;
    configurationTitleText?: string;
    visibleMonthsText?: string;
    visibleDaysText?: string;
    dataText?: string;
    colorRangesText?: string;
    yearText?: string;
    daysText?: string;
    noDaysDataMessage?: string;
	dayNames?: string[];
	monthNames?: string[];
    backButtonSymbolText?: string;
    nextButtonSymbolText?: string;
    refreshButtonSymbolText?: string;
    exportButtonSymbolText?: string;
    importButtonSymbolText?: string;
    currentYearText?: string;
    currentYearSymbolText?: string;
    totalTodayText?: string;
    totalThisWeekText?: string;
    totalThisMonthText?: string;
    totalThisYearText?: string;
    unknownText?: string;
};

export type BindingOptions = {
    _currentView?: BindingOptionsCurrentView,
    exportOnlyDataBeingViewed?: boolean;
    year?: number;
    view?: string;
    exportType?: string;
    useLocalStorageForData?: boolean;
    allowFileImports?: boolean;
    yearsToHide?: number[];
    dataFetchDelay?: number;
    showOnlyDataForYearsAvailable?: boolean;
    showHolidaysInDayToolTips?: boolean;
    resizable?: boolean;
    startMonth?: number;
    colorRanges?: BindingOptionsColorRange[];
    holidays?: BindingOptionsHoliday[];
    title?: BindingOptionsTitle;
    yearlyStatistics?: BindingOptionsYearlyStatistics;
    description?: BindingOptionsDescription;
    guide?: BindingOptionsGuide;
    tooltip?: BindingOptionsTooltip;
    events?: BindingOptionsEvents;
    views?: BindingOptionsViews; 
};

export type BindingOptionsCurrentView = {
    element: HTMLElement;
    year: number;
    type: string;
    isInFetchMode: boolean;
    isInFetchModeTimer: number;
    yearsAvailable: number[];
    view: number;
    mapContents: HTMLElement;
    mapContentsScrollLeft: number;
    chartContents: HTMLElement;
    chartContentsScrollLeft: number;
    statisticsContents: HTMLElement;
    statisticsContentsScrollLeft: number;
    daysContents: HTMLElement;
    daysContentsScrollLeft: number;
    yearText: HTMLElement;
    tooltip: HTMLElement;
    tooltipTimer: number;
    dayCheckBoxes: HTMLInputElement[];
    monthCheckBoxes: HTMLInputElement[];
    configurationDialog: HTMLElement;
    disabledBackground: HTMLElement;
    dayWidth: number;
};

export type BindingOptionsViews = {
    map?: BindingOptionsViewsMap;
    chart?: BindingOptionsViewsChart;
    days?: BindingOptionsViewsDays;
    statistics?: BindingOptionsViewsStatistics;
};

export type BindingOptionsViewsMap = {
    showMonthDayGaps?: boolean;
    showDayNames?: boolean;
    placeMonthNamesOnTheBottom?: boolean;
    showDayNumbers?: boolean;
    showMonthNames?: boolean;
    showDaysInReverseOrder?: boolean;
    showNoDataMessageWhenDataIsNotAvailable?: boolean;
    showMinimalDayNames?: boolean;
    showMonthsInReverseOrder?: boolean;
    keepScrollPositions?: boolean;
    monthsToShow?: number[];
    daysToShow?: number[];
    showDayDateNumbers?: boolean;
    showToolTips?: boolean;
};

export type BindingOptionsViewsChart = {
    enabled?: boolean;
    showChartYLabels?: boolean;
    showMonthNames?: boolean;
    showLineNumbers?: boolean;
    showInReverseOrder?: boolean;
    keepScrollPositions?: boolean;
    monthsToShow?: number[];
    daysToShow?: number[];
    showLineDateNumbers?: boolean;
    showToolTips?: boolean;
    useGradients?: boolean;
};

export type BindingOptionsViewsDays = {
    enabled?: boolean;
    showChartYLabels?: boolean;
    showDayNames?: boolean;
    showInReverseOrder?: boolean;
    showDayNumbers?: boolean;
    keepScrollPositions?: boolean;
    monthsToShow?: number[];
    daysToShow?: number[];
    showToolTips?: boolean;
    useGradients?: boolean;
    useDifferentBackgroundOpacities?: boolean;
};

export type BindingOptionsViewsStatistics = {
    enabled?: boolean;
    showChartYLabels?: boolean;
    showColorRangeLabels?: boolean;
    useColorRangeNamesForLabels?: boolean;
    showRangeNumbers?: boolean;
    showInReverseOrder?: boolean;
    keepScrollPositions?: boolean;
    monthsToShow?: number[];
    daysToShow?: number[];
    showToolTips?: boolean;
    useGradients?: boolean;
};

export type BindingOptionsTitle = {
    text?: string;
    showText?: boolean;
    showYearSelector?: boolean;
    showRefreshButton?: boolean;
    showExportButton?: boolean;
    extraSelectionYears?: number;
    showYearSelectionDropDown?: boolean;
    showImportButton?: boolean;
    showConfigurationButton?: boolean;
    showTitleDropDownButton?: boolean;
    showTitleDropDownHeaders?: boolean;
    showCurrentYearButton?: boolean;
    showSectionText?: boolean;
    showToolTips?: boolean;
};

export type BindingOptionsDescription = {
    text?: string;
    url?: string;
    urlTarget?: string;
};

export type BindingOptionsGuide = {
    enabled?: boolean;
    colorRangeTogglesEnabled?: boolean;
    showLessAndMoreLabels?: boolean;
    showNumbersInGuide?: boolean;
    showToolTips?: boolean;
};

export type BindingOptionsTooltip = {
    delay?: number;
    dayText?: string;
};

export type BindingOptionsYearlyStatistics = {
    enabled?: boolean;
    showTotalToday?: boolean;
    showTotalThisWeek?: boolean;
    showTotalThisMonth?: boolean;
    showTotalThisYear?: boolean;
};

export type BindingOptionsEvents = {
    onBackYear?: ( year: number ) => void;
    onNextYear?: ( year: number ) => void;
    onRefresh?: ( element: HTMLElement ) => void;
    onBeforeRender?: ( element: HTMLElement ) => void;
    onRenderComplete?: ( element: HTMLElement ) => void;
    onDestroy?: ( element: HTMLElement ) => void;
    onExport?: ( element: HTMLElement ) => void;
    onSetYear?: ( year: number ) => void;
    onTypeSwitch?: ( type: string ) => void;
    onDayToolTipRender?: ( date: Date, count: number ) => void;
    onAdd?: ( element: HTMLElement ) => void;
    onRemove?: ( element: HTMLElement ) => void;
    onReset?: ( element: HTMLElement ) => void;
    onViewSwitch?: ( view: string ) => void;
    onColorRangeTypeToggle?: ( id: string, visible: boolean ) => void;
    onImport?: ( element: HTMLElement ) => void;
    onDataFetch?: ( element: HTMLElement ) => InstanceTypeDateCount;
    onClear?: ( element: HTMLElement ) => void;
    onUpdate?: ( element: HTMLElement ) => void;
    onOptionsUpdate?: ( element: HTMLElement , options: BindingOptions ) => void;
    onDayClick?: ( date: Date, count: number, isHoliday: boolean ) => void;
    onDayDblClick?: ( date: Date, count: number, isHoliday: boolean ) => void;
    onWeekDayClick?: ( dayNumber: number, count: number, year: number ) => void;
    onWeekDayDblClick?: ( dayNumber: number, count: number, year: number ) => void;
    onStatisticClick?: ( colorRange: BindingOptionsColorRange, rangeCount: number, year: number ) => void;
    onStatisticDblClick?: ( colorRange: BindingOptionsColorRange, rangeCount: number, year: number ) => void;
};

export type BindingOptionsColorRange = {
    id?: string;
    name?: string;
    minimum?: number;
    cssClassName?: string;
    mapCssClassName?: string;
    chartCssClassName?: string;
    statisticsCssClassName?: string;
    tooltipText?: string;
    visible?: boolean;
};

export type BindingOptionsHoliday = {
    date?: string;
    name?: string;
    showInViews?: boolean;
};