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


import { ViewId } from "./data/enum";


export type InstanceTypeDateCount = Record<string, number>;
export type InstanceData = Record<string, InstanceTypeData>;

export type InstanceTypeData = {
    options: BindingOptions;
    totalTypes: number;
    typeData: Record<string, InstanceTypeDateCount>;
};

export type StringToJson = {
    parsed: boolean;
    object: unknown;
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
    values: Record<number, LargestValueForViewValue>;
    largestValue: number;
    totalValue: number;
    valueOpacities: Record<number, number>;
};

export type LargestValueForViewValue = {
    total: number;
    typeTotals: Record<string, number>;
};

export type LargestValuesForEachRangeType = {
    types: InstanceTypeDateCount;
    largestValue: number;
    totalValue: number;
};

export type RgbaColor = {
    red: number;
    green: number;
    blue: number;
    alpha: number;
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
    noColorRangesDataMessage?: string;
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
    removeTypeText?: string;
    openNewTypeText?: string;
    clearExistingDataText?: string;
    browseButtonText?: string;
    saveButtonText?: string;
    resetButtonText?: string;
    copyButtonText?: string;
    yesButtonText?: string;
    noButtonText?: string;
    confirmText?: string;
    clearDataConfirmText?: string;
    removeTypeConfirmText?: string;
};

export type BindingOptions = {
    _currentView?: BindingOptionsCurrentView | null,
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
    chartsAnimationDelay?: number;
    exportDateTimeFormat?: string;
    showSideMenu?: boolean;
    dynamicColorRange?: BindingOptionsDynamicColorRange;
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
    sideMenu: HTMLElement;
    container: HTMLElement;
    activeYear: number;
    activeType: string;
    activeView: ViewId;
    isInFetchMode: boolean;
    isInFetchModeTimer: number;
    yearsAvailable: number[];
    viewsEnabled: number;
    mapContentsContainer: HTMLElement;
    mapContents: HTMLElement;
    mapContentsScrollLeft: number;
    chartContents: HTMLElement;
    chartContentsScrollLeft: number;
    lineContentsContainer: HTMLElement;
    lineContents: HTMLElement;
    lineContentsScrollLeft: number;
    colorRangesContents: HTMLElement;
    colorRangesContentsScrollLeft: number;
    daysContents: HTMLElement;
    daysContentsScrollLeft: number;
    monthsContents: HTMLElement;
    monthsContentsScrollLeft: number;
    yearText: HTMLElement;
    yearTextWidth: number;
    tooltip: HTMLElement;
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
    importDialogFileList: FileList;
    importDialogImportButton: HTMLButtonElement;
    importDialogClearExistingData: HTMLInputElement;
    typeAddingDialog: HTMLElement;
    typeAddingDialogTypeInput: HTMLInputElement;
    typeAddingOptionNewType: HTMLInputElement;
    confirmationDialog: HTMLElement;
    confirmationDialogMessage: HTMLElement;
    confirmationDialogYesButton: HTMLButtonElement;
};

export type BindingOptionsViews = {
    map?: BindingOptionsViewsMap;
    chart?: BindingOptionsViewsChart;
    line?: BindingOptionsViewsLine;
    days?: BindingOptionsViewsDays;
    months?: BindingOptionsViewsMonths;
    colorRanges?: BindingOptionsViewsStatistics;
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
    showClearButton?: boolean;
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
    showSpacing?: boolean;
    showDifferences?: boolean;
    showDifferencesInToolTips?: boolean;
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
    showDifferencesInToolTips?: boolean;
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
    showDifferences?: boolean;
    showDifferencesInToolTips?: boolean;
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
    showStackedColorRanges?: boolean;
    dayToolTipText?: string;
}

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
    showStackedColorRanges?: boolean;
    monthToolTipText?: string;
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
    useIncrementToggles?: boolean;
    allowTypeAdding?: boolean;
    allowTypeRemoving?: boolean;
};

export type BindingOptionsZooming = {
    enabled?: boolean;
    defaultLevel?: number;
    maximumLevel?: number;
    showCloseButton?: boolean;
    showResetButton?: boolean;
};

export type BindingOptionsTooltip = {
    delay?: number;
};

export type BindingOptionsColorRange = {
    id?: string;
    name?: string;
    minimum?: number;
    cssClassName?: string;
    mapCssClassName?: string;
    lineCssClassName?: string;
    chartCssClassName?: string;
    daysCssClassName?: string;
    monthsCssClassName?: string;
    colorRangeCssClassName?: string;
    tooltipText?: string;
    visible?: boolean;
};

export type BindingOptionsDynamicColorRange = {
    enabled?: boolean;
    maximumMinimum?: number;
    color?: string;
    totalColors?: number;
    startMinimum?: number;
};

export type BindingOptionsHoliday = {
    date?: string;
    name?: string;
    showInViews?: boolean;
};

export type BindingOptionsEvents = {
    onBackYear?: ( element: HTMLElement, year: number ) => void;
    onNextYear?: ( element: HTMLElement, year: number ) => void;
    onRefresh?: ( element: HTMLElement ) => void;
    onBeforeRender?: ( element: HTMLElement ) => void;
    onRenderComplete?: ( element: HTMLElement ) => void;
    onDestroy?: ( element: HTMLElement ) => void;
    onExport?: ( element: HTMLElement ) => void;
    onSetYear?: ( element: HTMLElement, year: number ) => void;
    onTypeSwitch?: ( element: HTMLElement, type: string ) => void;
    onMapDayToolTipRender?: ( element: HTMLElement, date: Date, count: number, isHoliday: boolean ) => void;
    onLineDayToolTipRender?: ( element: HTMLElement, date: Date, count: number, isHoliday: boolean ) => void;
    onChartDayToolTipRender?: ( element: HTMLElement, date: Date, count: number, isHoliday: boolean ) => void;
    onAddDate?: ( element: HTMLElement ) => void;
    onRemoveDate?: ( element: HTMLElement ) => void;
    onReset?: ( element: HTMLElement ) => void;
    onViewSwitch?: ( element: HTMLElement, view: string ) => void;
    onColorRangeTypeToggle?: ( element: HTMLElement, id: string, visible: boolean ) => void;
    onImport?: ( element: HTMLElement ) => void;
    onDataFetch?: ( element: HTMLElement ) => InstanceTypeDateCount;
    onClearDate?: ( element: HTMLElement ) => void;
    onUpdateDate?: ( element: HTMLElement ) => void;
    onBindingOptionsUpdate?: ( element: HTMLElement, bindingOptions: BindingOptions ) => void;
    onMapDayClick?: ( element: HTMLElement, date: Date, count: number, year: number, isHoliday: boolean ) => void;
    onMapDayDblClick?: ( element: HTMLElement, date: Date, count: number, year: number, isHoliday: boolean ) => void;
    onLineDayClick?: ( element: HTMLElement, date: Date, count: number, year: number, isHoliday: boolean ) => void;
    onLineDayDblClick?: ( element: HTMLElement, date: Date, count: number, year: number, isHoliday: boolean ) => void;
    onChartDayClick?: ( element: HTMLElement, date: Date, count: number, year: number, isHoliday: boolean ) => void;
    onChartDayDblClick?: ( element: HTMLElement, date: Date, count: number, year: number, isHoliday: boolean ) => void;
    onWeekDayClick?: ( element: HTMLElement, dayNumber: number, count: number, year: number ) => void;
    onWeekDayDblClick?: ( element: HTMLElement, dayNumber: number, count: number, year: number ) => void;
    onMonthClick?: ( element: HTMLElement, monthNumber: number, count: number, year: number ) => void;
    onMonthDblClick?: ( element: HTMLElement, monthNumber: number, count: number, year: number ) => void;
    onColorRangeClick?: ( element: HTMLElement, colorRange: BindingOptionsColorRange, rangeCount: number, year: number ) => void;
    onColorRangeDblClick?: ( element: HTMLElement, colorRange: BindingOptionsColorRange, rangeCount: number, year: number ) => void;
    onZoomLevelChange?: ( element: HTMLElement, zoomLevel: number ) => void;
    onClearViewableData?: ( element: HTMLElement ) => void;
    onAddType?: ( element: HTMLElement, type: string ) => void;
    onRemoveType?: ( element: HTMLElement, type: string ) => void;
};