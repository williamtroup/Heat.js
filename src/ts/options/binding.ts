/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        binding.ts
 * @version     v4.3.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2024
 */


import {
    type BindingOptions,
    type BindingOptionsColorRange,
    type BindingOptionsDescription,
    type BindingOptionsGuide,
    type BindingOptionsTitle,
    type BindingOptionsTooltip,
    type BindingOptionsViewsMap,
    type BindingOptionsHoliday,
    type BindingOptionsViewsChart,
    type BindingOptionsViewsDays,
    type BindingOptionsViewsStatistics,
    type BindingOptionsEvents, 
    type BindingOptionsCurrentView,
    type Configuration } from "../type";

import { Default } from "../data/default";
import { Char, ExportType, ViewId, ViewName } from "../data/enum";
import { Is } from "../data/is";
import { Str } from "../data/str";


export namespace Binding {
    export namespace Options {
        const _default_MonthsToShow: number[] = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
        const _default_DaysToShow: number[] = [ 1, 2, 3, 4, 5, 6, 7 ];

        export function getForNewInstance( configuration: Configuration, data: any, element: HTMLElement ) : BindingOptions {
            const bindingOptions: BindingOptions = get( data );
            const view: string = Default.getString( bindingOptions.view, Char.empty ).toLowerCase();
    
            bindingOptions._currentView = {} as BindingOptionsCurrentView;
            bindingOptions._currentView.element = element;
            bindingOptions._currentView.disabledBackground = null!;
            bindingOptions._currentView.configurationDialog = null!;
            bindingOptions._currentView.dayCheckBoxes = [];
            bindingOptions._currentView.monthCheckBoxes = [];
            bindingOptions._currentView.tooltip = null!;
            bindingOptions._currentView.tooltipTimer = 0;
            bindingOptions._currentView.mapContents = null!;
            bindingOptions._currentView.mapContentsScrollLeft = 0;
            bindingOptions._currentView.year = bindingOptions.year!;
            bindingOptions._currentView.type = configuration.text!.unknownTrendText!;
            bindingOptions._currentView.isInFetchMode = Is.definedFunction( bindingOptions.events!.onDataFetch );
            bindingOptions._currentView.isInFetchModeTimer = 0;
            bindingOptions._currentView.yearsAvailable = [];
            bindingOptions._currentView.dayWidth = 0;
    
            if ( bindingOptions.views!.chart!.enabled ) {
                bindingOptions._currentView.chartContents = null!;
                bindingOptions._currentView.chartContentsScrollLeft = 0;
            }
    
            if ( bindingOptions.views!.days!.enabled ) {
                bindingOptions._currentView.daysContents = null!;
                bindingOptions._currentView.daysContentsScrollLeft = 0;
            }
            
            if ( bindingOptions.views!.statistics!.enabled ) {
                bindingOptions._currentView.statisticsContents = null!;
                bindingOptions._currentView.statisticsContentsScrollLeft = 0;
            }
    
            if ( view === ViewName.map ) {
                bindingOptions._currentView.view = ViewId.map;
            } else if ( view === ViewName.chart ) {
                bindingOptions._currentView.view = ViewId.chart;
            } else if ( view === ViewName.days ) {
                bindingOptions._currentView.view = ViewId.days;
            } else if ( view === ViewName.statistics ) {
                bindingOptions._currentView.view = ViewId.statistics;
            } else {
                bindingOptions._currentView.view = ViewId.map;
            }
    
            return bindingOptions;
        }

        export function get( newOptions: any ) : BindingOptions {
            let options: BindingOptions = Default.getObject( newOptions, {} as BindingOptions );
            options.views = Default.getObject( options.views, {} );
            options.exportOnlyYearBeingViewed = Default.getBoolean( options.exportOnlyYearBeingViewed, true );
            options.year = Default.getNumber( options.year, new Date().getFullYear() );
            options.view = Default.getString( options.view, ViewName.map );
            options.exportType = Default.getString( options.exportType, ExportType.csv );
            options.useLocalStorageForData = Default.getBoolean( options.useLocalStorageForData, false );
            options.allowFileImports = Default.getBoolean( options.allowFileImports, true );
            options.yearsToHide = Default.getArray( options.yearsToHide, [] );
            options.dataFetchDelay = Default.getNumber( options.dataFetchDelay, 60000 );
            options.showOnlyDataForYearsAvailable = Default.getBoolean( options.showOnlyDataForYearsAvailable, false );
            options.showHolidaysInDayToolTips = Default.getBoolean( options.showHolidaysInDayToolTips, false );
            
            options = getColorRanges( options );
            options = getHolidays( options );
            options = getTitle( options );
            options = getDescription( options );
            options = getGuide( options );
            options = getToolTip( options );
            options = getMapView( options );
            options = getChartView( options );
            options = getDaysView( options );
            options = getStatisticsView( options );
            options = getCustomTriggers( options );
            
            return options;
        }
    
        function getColorRanges( options: BindingOptions ) : BindingOptions {
            if ( Is.definedArray( options.colorRanges ) ) {
                const colorRangesLength: number = options.colorRanges!.length;
    
                for ( let colorRangeIndex: number = 0; colorRangeIndex < colorRangesLength; colorRangeIndex++ ) {
                    const colorRange: BindingOptionsColorRange = options.colorRanges![ colorRangeIndex ];
    
                    colorRange.id = Default.getString( colorRange.id, crypto.randomUUID() );
                    colorRange.name = Default.getString( colorRange.name, Char.empty );
                    colorRange.minimum = Default.getNumber( colorRange.minimum, 0 );
                    colorRange.cssClassName = Default.getString( colorRange.cssClassName, Char.empty );
                    colorRange.mapCssClassName = Default.getString( colorRange.mapCssClassName, Char.empty );
                    colorRange.chartCssClassName = Default.getString( colorRange.chartCssClassName, Char.empty );
                    colorRange.statisticsCssClassName = Default.getString( colorRange.statisticsCssClassName, Char.empty );
                    colorRange.tooltipText = Default.getString( colorRange.tooltipText, Char.empty );
                    colorRange.visible = Default.getBoolean( colorRange.visible, true );
                }
    
            } else {
                options.colorRanges = [
                    {
                        id: crypto.randomUUID(),
                        name: "Day Color 1",
                        minimum: 10,
                        cssClassName: "day-color-1",
                        tooltipText: "Day Color 1",
                        visible: true
                    },
                    {
                        id: crypto.randomUUID(),
                        name: "Day Color 2",
                        minimum: 15,
                        cssClassName: "day-color-2",
                        tooltipText: "Day Color 2",
                        visible: true
                    },
                    {
                        id: crypto.randomUUID(),
                        name: "Day Color 3",
                        minimum: 20,
                        cssClassName: "day-color-3",
                        tooltipText: "Day Color 3",
                        visible: true
                    },
                    {
                        id: crypto.randomUUID(),
                        name: "Day Color 4",
                        minimum: 25,
                        cssClassName: "day-color-4",
                        tooltipText: "Day Color 4",
                        visible: true
                    }
                ];
            }
    
            return options;
        }
    
        function getHolidays( options: BindingOptions ) : BindingOptions {
            if ( Is.definedArray( options.holidays ) ) {
                const holidaysLength: number = options.holidays!.length;
    
                for ( let holidayIndex: number = 0; holidayIndex < holidaysLength; holidayIndex++ ) {
                    const holiday: BindingOptionsHoliday = options.holidays![ holidayIndex ];
                    
                    holiday.date = Default.getString( holiday.date, Char.empty );
                    holiday.name = Default.getString( holiday.name, Char.empty );
                    holiday.showInViews = Default.getBoolean( holiday.showInViews, true );
                }
    
            } else {
                options.holidays = [];
            }
    
            return options;
        }
    
        function getTitle( options: BindingOptions ) : BindingOptions {
            options.title = Default.getObject( options.title, {} as BindingOptionsTitle );
            options.title!.text = Default.getString( options.title!.text, "Heat.js" );
            options.title!.showText = Default.getBoolean( options.title!.showText, true );
            options.title!.showYearSelector = Default.getBoolean( options.title!.showYearSelector, true );
            options.title!.showRefreshButton = Default.getBoolean( options.title!.showRefreshButton, false );
            options.title!.showExportButton = Default.getBoolean( options.title!.showExportButton, false );
            options.title!.extraSelectionYears = Default.getNumber( options.title!.extraSelectionYears, 50 );
            options.title!.showYearSelectionDropDown = Default.getBoolean( options.title!.showYearSelectionDropDown, true );
            options.title!.showImportButton = Default.getBoolean( options.title!.showImportButton, false );
            options.title!.showConfigurationButton = Default.getBoolean( options.title!.showConfigurationButton, true );
            options.title!.showTitleDropDownButton = Default.getBoolean( options.title!.showTitleDropDownButton, true );
            options.title!.showTitleDropDownHeaders = Default.getBoolean( options.title!.showTitleDropDownHeaders, true );
            options.title!.showCurrentYearButton = Default.getBoolean( options.title!.showCurrentYearButton, true );

            return options;
        }
    
        function getDescription( options: BindingOptions ) : BindingOptions {
            options.description = Default.getObject( options.description, {} as BindingOptionsDescription );
            options.description!.text = Default.getString( options.description!.text, Char.empty );
            options.description!.url = Default.getString( options.description!.url, Char.empty );
            options.description!.urlTarget = Default.getString( options.description!.urlTarget, "_blank" );
    
            return options;
        }
    
        function getGuide( options: BindingOptions ) : BindingOptions {
            options.guide = Default.getObject( options.guide, {} as BindingOptionsGuide );
            options.guide!.enabled = Default.getBoolean( options.guide!.enabled, true );
            options.guide!.colorRangeTogglesEnabled = Default.getBoolean( options.guide!.colorRangeTogglesEnabled, true );
            options.guide!.showLessAndMoreLabels = Default.getBoolean( options.guide!.showLessAndMoreLabels, true );
            options.guide!.showNumbersInGuide = Default.getBoolean( options.guide!.showNumbersInGuide, false );
    
            return options;
        }
    
        function getToolTip( options: BindingOptions ) : BindingOptions {
            options.tooltip = Default.getObject( options.tooltip, {} as BindingOptionsTooltip );
            options.tooltip!.delay = Default.getNumber( options.tooltip!.delay, 750 );
            options.tooltip!.dayText = Default.getString( options.tooltip!.dayText, "{d}{o} {mmmm} {yyyy}" );
    
            return options;
        }
    
        function getMapView( options: BindingOptions ) : BindingOptions {
            options.views!.map = Default.getObject( options.views!.map, {} as BindingOptionsViewsMap );
            options.views!.map!.showMonthDayGaps = Default.getBoolean( options.views!.map!.showMonthDayGaps, true );
            options.views!.map!.showDayNames = Default.getBoolean( options.views!.map!.showDayNames, true );
            options.views!.map!.placeMonthNamesOnTheBottom = Default.getBoolean( options.views!.map!.placeMonthNamesOnTheBottom, false );
            options.views!.map!.showDayNumbers = Default.getBoolean( options.views!.map!.showDayNumbers, false );
            options.views!.map!.showMonthNames = Default.getBoolean( options.views!.map!.showMonthNames, true );
            options.views!.map!.showDaysInReverseOrder = Default.getBoolean( options.views!.map!.showDaysInReverseOrder, false );
            options.views!.map!.showNoDataMessageWhenDataIsNotAvailable = Default.getBoolean( options.views!.map!.showNoDataMessageWhenDataIsNotAvailable, false );
            options.views!.map!.showMinimalDayNames = Default.getBoolean( options.views!.map!.showMinimalDayNames, false );
            options.views!.map!.showMonthsInReverseOrder = Default.getBoolean( options.views!.map!.showMonthsInReverseOrder, false );
            options.views!.map!.keepScrollPositions = Default.getBoolean( options.views!.map!.keepScrollPositions, false );
    
            if ( Is.invalidOptionArray( options.views!.map!.monthsToShow ) ) {
                options.views!.map!.monthsToShow = _default_MonthsToShow;
            }
    
            if ( Is.invalidOptionArray( options.views!.map!.daysToShow ) ) {
                options.views!.map!.daysToShow = _default_DaysToShow;
            }
    
            return options;
        }
    
        function getChartView( options: BindingOptions ) : BindingOptions {
            options.views!.chart = Default.getObject( options.views!.chart, {} as BindingOptionsViewsChart );
            options.views!.chart!.enabled = Default.getBoolean( options.views!.chart!.enabled, true );
            options.views!.chart!.showChartYLabels = Default.getBoolean( options.views!.chart!.showChartYLabels, true );
            options.views!.chart!.showMonthNames = Default.getBoolean( options.views!.chart!.showMonthNames, true );
            options.views!.chart!.showLineNumbers = Default.getBoolean( options.views!.chart!.showLineNumbers, false );
            options.views!.chart!.showInReverseOrder = Default.getBoolean( options.views!.chart!.showInReverseOrder, false );
            options.views!.chart!.keepScrollPositions = Default.getBoolean( options.views!.chart!.keepScrollPositions, false );
    
            if ( Is.invalidOptionArray( options.views!.chart!.monthsToShow ) ) {
                options.views!.chart!.monthsToShow = _default_MonthsToShow;
            }
    
            if ( Is.invalidOptionArray( options.views!.chart!.daysToShow ) ) {
                options.views!.chart!.daysToShow = _default_DaysToShow;
            }
    
            return options;
        }
    
        function getDaysView( options: BindingOptions ) : BindingOptions {
            options.views!.days = Default.getObject( options.views!.days, {} as BindingOptionsViewsDays );
            options.views!.days!.enabled = Default.getBoolean( options.views!.days!.enabled, true );
            options.views!.days!.showChartYLabels = Default.getBoolean( options.views!.days!.showChartYLabels, true );
            options.views!.days!.showDayNames = Default.getBoolean( options.views!.days!.showDayNames, true );
            options.views!.days!.showInReverseOrder = Default.getBoolean( options.views!.days!.showInReverseOrder, false );
            options.views!.days!.showDayNumbers = Default.getBoolean( options.views!.days!.showDayNumbers, false );
            options.views!.days!.keepScrollPositions = Default.getBoolean( options.views!.days!.keepScrollPositions, false );
    
            if ( Is.invalidOptionArray( options.views!.days!.monthsToShow ) ) {
                options.views!.days!.monthsToShow = _default_MonthsToShow;
            }
    
            if ( Is.invalidOptionArray( options.views!.days!.daysToShow ) ) {
                options.views!.days!.daysToShow = _default_DaysToShow;
            }
    
            return options;
        }
    
        function getStatisticsView( options: BindingOptions ) : BindingOptions {
            options.views!.statistics = Default.getObject( options.views!.statistics, {} as BindingOptionsViewsStatistics );
            options.views!.statistics!.enabled = Default.getBoolean( options.views!.statistics!.enabled, true );
            options.views!.statistics!.showChartYLabels = Default.getBoolean( options.views!.statistics!.showChartYLabels, true );
            options.views!.statistics!.showColorRangeLabels = Default.getBoolean( options.views!.statistics!.showColorRangeLabels, true );
            options.views!.statistics!.useColorRangeNamesForLabels = Default.getBoolean( options.views!.statistics!.useColorRangeNamesForLabels, false );
            options.views!.statistics!.showRangeNumbers = Default.getBoolean( options.views!.statistics!.showRangeNumbers, false );
            options.views!.statistics!.showInReverseOrder = Default.getBoolean( options.views!.statistics!.showInReverseOrder, false );
            options.views!.statistics!.keepScrollPositions = Default.getBoolean( options.views!.statistics!.keepScrollPositions, false );
    
            if ( Is.invalidOptionArray( options.views!.statistics!.monthsToShow ) ) {
                options.views!.statistics!.monthsToShow = _default_MonthsToShow;
            }
    
            if ( Is.invalidOptionArray( options.views!.statistics!.daysToShow ) ) {
                options.views!.statistics!.daysToShow = _default_DaysToShow;
            }
    
            return options;
        }
    
        function getCustomTriggers( options : BindingOptions ) : BindingOptions {
            options.events = Default.getObject( options.events, {} as BindingOptionsEvents );
            options.events!.onDayClick = Default.getFunction( options.events!.onDayClick, null! );
            options.events!.onBackYear = Default.getFunction( options.events!.onBackYear, null! );
            options.events!.onNextYear = Default.getFunction( options.events!.onNextYear, null! );
            options.events!.onRefresh = Default.getFunction( options.events!.onRefresh, null! );
            options.events!.onBeforeRender = Default.getFunction( options.events!.onBeforeRender, null! );
            options.events!.onRenderComplete = Default.getFunction( options.events!.onRenderComplete, null! );
            options.events!.onDestroy = Default.getFunction( options.events!.onDestroy, null! );
            options.events!.onExport = Default.getFunction( options.events!.onExport, null! );
            options.events!.onSetYear = Default.getFunction( options.events!.onSetYear, null! );
            options.events!.onTypeSwitch = Default.getFunction( options.events!.onTypeSwitch, null! );
            options.events!.onDayToolTipRender = Default.getFunction( options.events!.onDayToolTipRender, null! );
            options.events!.onAdd = Default.getFunction( options.events!.onAdd, null! );
            options.events!.onRemove = Default.getFunction( options.events!.onRemove, null! );
            options.events!.onReset = Default.getFunction( options.events!.onReset, null! );
            options.events!.onViewSwitch = Default.getFunction( options.events!.onViewSwitch, null! );
            options.events!.onColorRangeTypeToggle = Default.getFunction( options.events!.onColorRangeTypeToggle, null! );
            options.events!.onImport = Default.getFunction( options.events!.onImport, null! );
            options.events!.onStatisticClick = Default.getFunction( options.events!.onStatisticClick, null! );
            options.events!.onDataFetch = Default.getFunction( options.events!.onDataFetch, null! );
            options.events!.onClear = Default.getFunction( options.events!.onClear, null! );
            options.events!.onUpdate = Default.getFunction( options.events!.onUpdate, null! );
            options.events!.onOptionsUpdate = Default.getFunction( options.events!.onOptionsUpdate, null! );
            options.events!.onWeekDayClick = Default.getFunction( options.events!.onWeekDayClick, null! );
    
            return options;
        }
    }
}