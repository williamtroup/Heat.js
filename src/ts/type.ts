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


export type TypeCountsData = Record<string, number>;

export type DateCounts = Record<string, {
    options: BindingOptions;
    totalTypes: number;
    typeData: Record<string, TypeCountsData>
}>;

export type IsHoliday = {
    matched: boolean,
    name: string
};

export type AttributeJsonObject = {
    parsed: boolean,
    object: any
};

export type Configuration = {
	safeMode?: boolean;
	domElementTypes?: string[];
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
};

export type BindingOptions = {
    _currentView: BindingOptionsCurrentView,
    exportOnlyYearBeingViewed?: boolean;
    year?: number;
    view?: string;
    exportType?: string;
    useLocalStorageForData?: boolean;
    allowFileImports?: boolean;
    yearsToHide?: number[];
    dataFetchDelay?: number;
    showOnlyDataForYearsAvailable?: boolean;
    showHolidaysInDayToolTips?: boolean;
    colorRanges?: ColorRange[];
    holidays?: Holiday[];
    title?: Title;
    description?: Description;
    guide?: Guide;
    tooltip?: Tooltip;
    events?: Events;
    views?: {
        map?: Map;
        chart?: Chart;
        days?: Days;
        statistics?: Statistics;
    }
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
    dayCheckBoxes: any[];
    monthCheckBoxes: any[];
    configurationDialog: HTMLElement;
    disabledBackground: HTMLElement
};

export type Title = {
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
};

export type Description = {
    text?: string;
    url?: string;
    urlTarget?: string;
};

export type Guide = {
    enabled?: boolean;
    colorRangeTogglesEnabled?: boolean;
    showLessAndMoreLabels?: boolean;
    showNumbersInGuide?: boolean;
};

export type Tooltip = {
    delay?: number;
    dayText?: string;
};

export type Map = {
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
};

export type Chart = {
    enabled?: boolean;
    showChartYLabels?: boolean;
    showMonthNames?: boolean;
    showLineNumbers?: boolean;
    showInReverseOrder?: boolean;
    keepScrollPositions?: boolean;
    monthsToShow?: number[];
    daysToShow?: number[];
};

export type Days = {
    enabled?: boolean;
    showChartYLabels?: boolean;
    showDayNames?: boolean;
    showInReverseOrder?: boolean;
    showDayNumbers?: boolean;
    keepScrollPositions?: boolean;
    monthsToShow?: number[];
    daysToShow?: number[];
};

export type Statistics = {
    enabled?: boolean;
    showChartYLabels?: boolean;
    showColorRangeLabels?: boolean;
    useColorRangeNamesForLabels?: boolean;
    showRangeNumbers?: boolean;
    showInReverseOrder?: boolean;
    keepScrollPositions?: boolean;
    monthsToShow?: number[];
    daysToShow?: number[];
};

export type Events = {
    onDayClick?: ( date: Date, count: number ) => void;
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
    onStatisticClick?: ( colorRange: ColorRange ) => void;
    onDataFetch?: ( element: HTMLElement ) => any;
    onClear?: ( element: HTMLElement ) => void;
    onUpdate?: ( element: HTMLElement ) => void;
    onOptionsUpdate?: ( element: HTMLElement , options: BindingOptions ) => void;
    onWeekDayClick?: ( dayNumber: number, count: number ) => void;
};

export type ColorRange = {
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

export type Holiday = {
    date?: string;
    name?: string;
    showInViews?: boolean;
};