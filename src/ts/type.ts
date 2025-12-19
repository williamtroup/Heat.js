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

export type LargestValueForView = {
    values: Record<number, number>;
    largestValue: number;
    totalValue: number;
    valueOpacities: Record<number, number>;
};

export type LargestValuesForEachRangeType = {
    types: InstanceTypeDateCount;
    largestValue: number;
    totalValue: number;
};

export type ConfigurationOptions = {
	safeMode?: boolean;
	domElementTypes?: string[] | string;
    observationMode?: boolean;
    text?: ConfigurationOptionsText;
};

export type ConfigurationOptionsText = {
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
    closeButtonText?: string;
    configurationButtonText?: string;
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
    currentYearText?: string;
    todayText?: string;
    thisWeekText?: string;
    thisMonthText?: string;
    thisYearText?: string;
    unavailableText?: string;
    monthsText?: string;
    noMonthsDataMessage?: string;
    selectTypeText?: string;
    filenamePlaceholderText?: string;
    onlyDataBeingViewedText?: string;
    zoomInText?: string;
    zoomOutText?: string;
    clearButtonText?: string;
    selectFilesText?: string;
    dragAndDropFilesText?: string;
    addTypeText?: string;
    typePlaceholderText?: string;
    addButtonText?: string;
    removeButtonText?: string;
    invertText?: string;
    lineText?: string;
    noLineDataMessage?: string;
};

export type BindingOptions = {
    _currentView?: BindingOptionsCurrentView,
    exportOnlyDataBeingViewed?: boolean;
    defaultYear?: number;
    defaultView?: string;
    exportType?: string;
    useLocalStorageForData?: boolean;
    allowFileImports?: boolean;
    yearsToHide?: number[];
    dataFetchDelay?: number;
    showOnlyDataForYearsAvailable?: boolean;
    showHolidaysInDayToolTips?: boolean;
    resizable?: boolean;
    startMonth?: number;
    allowMultipleFileImports?: boolean;
    percentageDecimalPoints?: number;
    allowTypeAdding?: boolean;
    chartsAnimationDelay?: number;
    exportDateTimeFormat?: string;
    colorRanges?: BindingOptionsColorRange[];
    holidays?: BindingOptionsHoliday[];
    zooming?: BindingOptionsZooming;
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
    viewsEnabled: number;
    mapContentsContainer: HTMLElement;
    mapContents: HTMLElement;
    mapContentsScrollLeft: number;
    chartContents: HTMLElement;
    chartContentsScrollLeft: number;
    lineContentsContainer: HTMLElement;
    lineContents: HTMLElement;
    lineContentsScrollLeft: number;
    statisticsContents: HTMLElement;
    statisticsContentsScrollLeft: number;
    daysContents: HTMLElement;
    daysContentsScrollLeft: number;
    monthsContents: HTMLElement;
    monthsContentsScrollLeft: number;
    yearText: HTMLElement;
    yearTextWidth: number;
    tooltip: HTMLElement;
    tooltipTimer: number;
    configurationDialog: HTMLElement;
    configurationDialogDayCheckBoxes: HTMLInputElement[];
    configurationDialogMonthCheckBoxes: HTMLInputElement[];
    disabledBackground: HTMLElement;
    dayWidth: number;
    exportDialog: HTMLElement;
    exportDialogExportTypeSelect: HTMLSelectElement;
    exportDialogExportFilenameInput: HTMLInputElement;
    exportDialogExportOnlyDataBeingViewedCheckBox: HTMLInputElement;
    zoomLevel: number;
    mapZoomIncrement: number;
    lineZoomIncrement: number;
    importDialog: HTMLElement;
    importDialogDragAndDrop: HTMLElement;
    importDialogClearExistingData: HTMLInputElement;
    importDialogFileList: FileList;
    importDialogImportButton: HTMLButtonElement;
    typeAddingDialog: HTMLElement;
    typeAddingDialogTypeInput: HTMLInputElement;
};

export type BindingOptionsViews = {
    map?: BindingOptionsViewsMap;
    chart?: BindingOptionsViewsChart;
    line?: BindingOptionsViewsLine;
    days?: BindingOptionsViewsDays;
    months?: BindingOptionsViewsMonths;
    statistics?: BindingOptionsViewsStatistics;
};

export type BindingOptionsViewsMap = {
    enabled?: boolean;
    showMonthDayGaps?: boolean;
    showDayNames?: boolean;
    placeMonthNamesOnTheBottom?: boolean;
    showDayCounts?: boolean;
    showMonthNames?: boolean;
    showDaysInReverseOrder?: boolean;
    showMinimalDayNames?: boolean;
    showMonthsInReverseOrder?: boolean;
    keepScrollPositions?: boolean;
    monthsToShow?: number[];
    daysToShow?: number[];
    showDayDateNumbers?: boolean;
    showToolTips?: boolean;
    highlightCurrentDay?: boolean;
    dayToolTipText?: string;
    showYearsInMonthNames?: boolean;
    showCountsInToolTips?: boolean;
};

export type BindingOptionsViewsChart = {
    enabled?: boolean;
    showChartYLabels?: boolean;
    showMonthNames?: boolean;
    showLineCounts?: boolean;
    showInReverseOrder?: boolean;
    keepScrollPositions?: boolean;
    monthsToShow?: number[];
    daysToShow?: number[];
    showLineDateNumbers?: boolean;
    showToolTips?: boolean;
    useGradients?: boolean;
    highlightCurrentDay?: boolean;
    dayToolTipText?: string;
    showYearsInMonthNames?: boolean;
    showCountsInToolTips?: boolean;
    addMonthSpacing?: boolean;
};

export type BindingOptionsViewsLine = {
    enabled?: boolean;
    showMonthNames?: boolean;
    showInReverseOrder?: boolean;
    keepScrollPositions?: boolean;
    monthsToShow?: number[];
    daysToShow?: number[];
    showYearsInMonthNames?: boolean;
    dayToolTipText?: string;
    showToolTips?: boolean;
    showCountsInToolTips?: boolean;
};

export type BindingOptionsViewsDays = {
    enabled?: boolean;
    showChartYLabels?: boolean;
    showDayNames?: boolean;
    showInReverseOrder?: boolean;
    showDayCounts?: boolean;
    keepScrollPositions?: boolean;
    monthsToShow?: number[];
    daysToShow?: number[];
    showToolTips?: boolean;
    useGradients?: boolean;
    useDifferentOpacities?: boolean;
    showDayCountPercentages?: boolean;
};

export type BindingOptionsViewsMonths = {
    enabled?: boolean;
    showChartYLabels?: boolean;
    showMonthNames?: boolean;
    showInReverseOrder?: boolean;
    showMonthCounts?: boolean;
    keepScrollPositions?: boolean;
    monthsToShow?: number[];
    daysToShow?: number[];
    showToolTips?: boolean;
    useGradients?: boolean;
    useDifferentOpacities?: boolean;
    highlightCurrentMonth?: boolean;
    showMonthCountPercentages?: boolean;
};

export type BindingOptionsViewsStatistics = {
    enabled?: boolean;
    showChartYLabels?: boolean;
    showColorRangeLabels?: boolean;
    useColorRangeNamesForLabels?: boolean;
    showRangeCounts?: boolean;
    showInReverseOrder?: boolean;
    keepScrollPositions?: boolean;
    monthsToShow?: number[];
    daysToShow?: number[];
    showToolTips?: boolean;
    useGradients?: boolean;
    showRangeCountPercentages?: boolean;
    showRangeNamesInToolTips?: boolean;
};

export type BindingOptionsZooming = {
    enabled?: boolean;
    defaultLevel?: number;
    maximumLevel?: number;
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
    showTitleDropDownMenu?: boolean;
    showClearButton?: boolean;
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
    showInvertLabel?: boolean;
};

export type BindingOptionsTooltip = {
    delay?: number;
};

export type BindingOptionsYearlyStatistics = {
    enabled?: boolean;
    showToday?: boolean;
    showThisWeek?: boolean;
    showThisMonth?: boolean;
    showThisYear?: boolean;
    showOnlyForCurrentYear?: boolean;
    showPercentages?: boolean;
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
    onMapDayToolTipRender?: ( date: Date, count: number, isHoliday: boolean ) => void;
    onChartDayToolTipRender?: ( date: Date, count: number, isHoliday: boolean ) => void;
    onLineDayToolTipRender?: ( date: Date, count: number, isHoliday: boolean ) => void;
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
    onMapDayClick?: ( date: Date, count: number, isHoliday: boolean ) => void;
    onMapDayDblClick?: ( date: Date, count: number, isHoliday: boolean ) => void;
    onLineDayClick?: ( date: Date, count: number, isHoliday: boolean ) => void;
    onLineDayDblClick?: ( date: Date, count: number, isHoliday: boolean ) => void;
    onChartDayClick?: ( date: Date, count: number, isHoliday: boolean ) => void;
    onChartDayDblClick?: ( date: Date, count: number, isHoliday: boolean ) => void;
    onWeekDayClick?: ( dayNumber: number, count: number, year: number ) => void;
    onWeekDayDblClick?: ( dayNumber: number, count: number, year: number ) => void;
    onMonthClick?: ( monthNumber: number, count: number, year: number ) => void;
    onMonthDblClick?: ( monthNumber: number, count: number, year: number ) => void;
    onStatisticClick?: ( colorRange: BindingOptionsColorRange, rangeCount: number, year: number ) => void;
    onStatisticDblClick?: ( colorRange: BindingOptionsColorRange, rangeCount: number, year: number ) => void;
    onZoomLevelChange?: ( element: HTMLElement, zoomLevel: number ) => void;
};

export type BindingOptionsColorRange = {
    id?: string;
    name?: string;
    minimum?: number;
    cssClassName?: string;
    mapCssClassName?: string;
    chartCssClassName?: string;
    lineCssClassName?: string;
    statisticsCssClassName?: string;
    tooltipText?: string;
    visible?: boolean;
};

export type BindingOptionsHoliday = {
    date?: string;
    name?: string;
    showInViews?: boolean;
};