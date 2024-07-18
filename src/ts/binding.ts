/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        options.ts
 * @version     v4.1.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2024
 */


import {
    type BindingOptions,
    type ColorRange,
    type Description,
    type Guide,
    type Title,
    type Tooltip,
    type Map,
    type Holiday,
    type Chart,
    type Days,
    type Statistics,
    type Events } from "./type";

import { Data } from "./data";
import { Char, ExportType, ViewName } from "./enum";
import { Is } from "./is";


export namespace binding {
    export namespace options {
        const _default_MonthsToShow: number[] = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
        const _default_DaysToShow: number[] = [ 1, 2, 3, 4, 5, 6, 7 ];

        export function get( newOptions: any ) : BindingOptions {
            let options: BindingOptions = Data.getDefaultObject( newOptions, {} as BindingOptions );
            options.views = Data.getDefaultObject( options.views, {} );
            options.exportOnlyYearBeingViewed = Data.getDefaultBoolean( options.exportOnlyYearBeingViewed, true );
            options.year = Data.getDefaultNumber( options.year, new Date().getFullYear() );
            options.view = Data.getDefaultString( options.view, ViewName.map );
            options.exportType = Data.getDefaultString( options.exportType, ExportType.csv );
            options.useLocalStorageForData = Data.getDefaultBoolean( options.useLocalStorageForData, false );
            options.allowFileImports = Data.getDefaultBoolean( options.allowFileImports, true );
            options.yearsToHide = Data.getDefaultArray( options.yearsToHide, [] );
            options.dataFetchDelay = Data.getDefaultNumber( options.dataFetchDelay, 60000 );
            options.showOnlyDataForYearsAvailable = Data.getDefaultBoolean( options.showOnlyDataForYearsAvailable, false );
            options.showHolidaysInDayToolTips = Data.getDefaultBoolean( options.showHolidaysInDayToolTips, false );
            
            options = buildAttributeOptionColorRanges( options );
            options = buildAttributeOptionHolidays( options );
            options = buildAttributeOptionTitle( options );
            options = buildAttributeOptionDescription( options );
            options = buildAttributeOptionGuide( options );
            options = buildAttributeOptionToolTip( options );
            options = buildAttributeOptionMapView( options );
            options = buildAttributeOptionChartView( options );
            options = buildAttributeOptionDaysView( options );
            options = buildAttributeOptionStatisticsView( options );
            options = buildAttributeOptionCustomTriggers( options );
            
            return options;
        }
    
        function buildAttributeOptionColorRanges( options: BindingOptions ) : BindingOptions {
            if ( Is.definedArray( options.colorRanges ) ) {
                const colorRangesLength: number = options.colorRanges!.length;
    
                for ( let colorRangeIndex: number = 0; colorRangeIndex < colorRangesLength; colorRangeIndex++ ) {
                    const colorRange: ColorRange = options.colorRanges![ colorRangeIndex ];
    
                    colorRange.id = Data.getDefaultString( colorRange.id, Data.String.newGuid() );
                    colorRange.name = Data.getDefaultString( colorRange.name, Char.empty );
                    colorRange.minimum = Data.getDefaultNumber( colorRange.minimum, 0 );
                    colorRange.cssClassName = Data.getDefaultString( colorRange.cssClassName, Char.empty );
                    colorRange.mapCssClassName = Data.getDefaultString( colorRange.mapCssClassName, Char.empty );
                    colorRange.chartCssClassName = Data.getDefaultString( colorRange.chartCssClassName, Char.empty );
                    colorRange.statisticsCssClassName = Data.getDefaultString( colorRange.statisticsCssClassName, Char.empty );
                    colorRange.tooltipText = Data.getDefaultString( colorRange.tooltipText, Char.empty );
                    colorRange.visible = Data.getDefaultBoolean( colorRange.visible, true );
                }
    
            } else {
                options.colorRanges = [
                    {
                        id: Data.String.newGuid(),
                        name: "Day Color 1",
                        minimum: 10,
                        cssClassName: "day-color-1",
                        tooltipText: "Day Color 1",
                        visible: true
                    },
                    {
                        id: Data.String.newGuid(),
                        name: "Day Color 2",
                        minimum: 15,
                        cssClassName: "day-color-2",
                        tooltipText: "Day Color 2",
                        visible: true
                    },
                    {
                        id: Data.String.newGuid(),
                        name: "Day Color 3",
                        minimum: 20,
                        cssClassName: "day-color-3",
                        tooltipText: "Day Color 3",
                        visible: true
                    },
                    {
                        id: Data.String.newGuid(),
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
    
        function buildAttributeOptionHolidays( options: BindingOptions ) : BindingOptions {
            if ( Is.definedArray( options.holidays ) ) {
                const holidaysLength: number = options.holidays!.length;
    
                for ( let holidayIndex: number = 0; holidayIndex < holidaysLength; holidayIndex++ ) {
                    const holiday: Holiday = options.holidays![ holidayIndex ];
                    
                    holiday.date = Data.getDefaultString( holiday.date, Char.empty );
                    holiday.name = Data.getDefaultString( holiday.name, Char.empty );
                    holiday.showInViews = Data.getDefaultBoolean( holiday.showInViews, true );
                }
    
            } else {
                options.holidays = [];
            }
    
            return options;
        }
    
        function buildAttributeOptionTitle( options: BindingOptions ) : BindingOptions {
            options.title = Data.getDefaultObject( options.title, {} as Title );
            options.title!.text = Data.getDefaultString( options.title!.text, "Heat.js" );
            options.title!.showText = Data.getDefaultBoolean( options.title!.showText, true );
            options.title!.showYearSelector = Data.getDefaultBoolean( options.title!.showYearSelector, true );
            options.title!.showRefreshButton = Data.getDefaultBoolean( options.title!.showRefreshButton, false );
            options.title!.showExportButton = Data.getDefaultBoolean( options.title!.showExportButton, false );
            options.title!.extraSelectionYears = Data.getDefaultNumber( options.title!.extraSelectionYears, 50 );
            options.title!.showYearSelectionDropDown = Data.getDefaultBoolean( options.title!.showYearSelectionDropDown, true );
            options.title!.showImportButton = Data.getDefaultBoolean( options.title!.showImportButton, false );
            options.title!.showConfigurationButton = Data.getDefaultBoolean( options.title!.showConfigurationButton, true );
            options.title!.showTitleDropDownButton = Data.getDefaultBoolean( options.title!.showTitleDropDownButton, true );
            options.title!.showTitleDropDownHeaders = Data.getDefaultBoolean( options.title!.showTitleDropDownHeaders, true );
    
            return options;
        }
    
        function buildAttributeOptionDescription( options: BindingOptions ) : BindingOptions {
            options.description = Data.getDefaultObject( options.description, {} as Description );
            options.description!.text = Data.getDefaultString( options.description!.text, Char.empty );
            options.description!.url = Data.getDefaultString( options.description!.url, Char.empty );
            options.description!.urlTarget = Data.getDefaultString( options.description!.urlTarget, "_blank" );
    
            return options;
        }
    
        function buildAttributeOptionGuide( options: BindingOptions ) : BindingOptions {
            options.guide = Data.getDefaultObject( options.guide, {} as Guide );
            options.guide!.enabled = Data.getDefaultBoolean( options.guide!.enabled, true );
            options.guide!.colorRangeTogglesEnabled = Data.getDefaultBoolean( options.guide!.colorRangeTogglesEnabled, true );
            options.guide!.showLessAndMoreLabels = Data.getDefaultBoolean( options.guide!.showLessAndMoreLabels, true );
            options.guide!.showNumbersInGuide = Data.getDefaultBoolean( options.guide!.showNumbersInGuide, false );
    
            return options;
        }
    
        function buildAttributeOptionToolTip( options: BindingOptions ) : BindingOptions {
            options.tooltip = Data.getDefaultObject( options.tooltip, {} as Tooltip );
            options.tooltip!.delay = Data.getDefaultNumber( options.tooltip!.delay, 750 );
            options.tooltip!.dayText = Data.getDefaultString( options.tooltip!.dayText, "{d}{o} {mmmm} {yyyy}" );
    
            return options;
        }
    
        function buildAttributeOptionMapView( options: BindingOptions ) : BindingOptions {
            options.views!.map = Data.getDefaultObject( options.views!.map, {} as Map );
            options.views!.map!.showMonthDayGaps = Data.getDefaultBoolean( options.views!.map!.showMonthDayGaps, true );
            options.views!.map!.showDayNames = Data.getDefaultBoolean( options.views!.map!.showDayNames, true );
            options.views!.map!.placeMonthNamesOnTheBottom = Data.getDefaultBoolean( options.views!.map!.placeMonthNamesOnTheBottom, false );
            options.views!.map!.showDayNumbers = Data.getDefaultBoolean( options.views!.map!.showDayNumbers, false );
            options.views!.map!.showMonthNames = Data.getDefaultBoolean( options.views!.map!.showMonthNames, true );
            options.views!.map!.showDaysInReverseOrder = Data.getDefaultBoolean( options.views!.map!.showDaysInReverseOrder, false );
            options.views!.map!.showNoDataMessageWhenDataIsNotAvailable = Data.getDefaultBoolean( options.views!.map!.showNoDataMessageWhenDataIsNotAvailable, false );
            options.views!.map!.showMinimalDayNames = Data.getDefaultBoolean( options.views!.map!.showMinimalDayNames, false );
            options.views!.map!.showMonthsInReverseOrder = Data.getDefaultBoolean( options.views!.map!.showMonthsInReverseOrder, false );
            options.views!.map!.keepScrollPositions = Data.getDefaultBoolean( options.views!.map!.keepScrollPositions, false );
    
            if ( Is.invalidOptionArray( options.views!.map!.monthsToShow ) ) {
                options.views!.map!.monthsToShow = _default_MonthsToShow;
            }
    
            if ( Is.invalidOptionArray( options.views!.map!.daysToShow ) ) {
                options.views!.map!.daysToShow = _default_DaysToShow;
            }
    
            return options;
        }
    
        function buildAttributeOptionChartView( options: BindingOptions ) : BindingOptions {
            options.views!.chart = Data.getDefaultObject( options.views!.chart, {} as Chart );
            options.views!.chart!.enabled = Data.getDefaultBoolean( options.views!.chart!.enabled, true );
            options.views!.chart!.showChartYLabels = Data.getDefaultBoolean( options.views!.chart!.showChartYLabels, true );
            options.views!.chart!.showMonthNames = Data.getDefaultBoolean( options.views!.chart!.showMonthNames, true );
            options.views!.chart!.showLineNumbers = Data.getDefaultBoolean( options.views!.chart!.showLineNumbers, false );
            options.views!.chart!.showInReverseOrder = Data.getDefaultBoolean( options.views!.chart!.showInReverseOrder, false );
            options.views!.chart!.keepScrollPositions = Data.getDefaultBoolean( options.views!.chart!.keepScrollPositions, false );
    
            if ( Is.invalidOptionArray( options.views!.chart!.monthsToShow ) ) {
                options.views!.chart!.monthsToShow = _default_MonthsToShow;
            }
    
            if ( Is.invalidOptionArray( options.views!.chart!.daysToShow ) ) {
                options.views!.chart!.daysToShow = _default_DaysToShow;
            }
    
            return options;
        }
    
        function buildAttributeOptionDaysView( options: BindingOptions ) : BindingOptions {
            options.views!.days = Data.getDefaultObject( options.views!.days, {} as Days );
            options.views!.days!.enabled = Data.getDefaultBoolean( options.views!.days!.enabled, true );
            options.views!.days!.showChartYLabels = Data.getDefaultBoolean( options.views!.days!.showChartYLabels, true );
            options.views!.days!.showDayNames = Data.getDefaultBoolean( options.views!.days!.showDayNames, true );
            options.views!.days!.showInReverseOrder = Data.getDefaultBoolean( options.views!.days!.showInReverseOrder, false );
            options.views!.days!.showDayNumbers = Data.getDefaultBoolean( options.views!.days!.showDayNumbers, false );
            options.views!.days!.keepScrollPositions = Data.getDefaultBoolean( options.views!.days!.keepScrollPositions, false );
    
            if ( Is.invalidOptionArray( options.views!.days!.monthsToShow ) ) {
                options.views!.days!.monthsToShow = _default_MonthsToShow;
            }
    
            if ( Is.invalidOptionArray( options.views!.days!.daysToShow ) ) {
                options.views!.days!.daysToShow = _default_DaysToShow;
            }
    
            return options;
        }
    
        function buildAttributeOptionStatisticsView( options: BindingOptions ) : BindingOptions {
            options.views!.statistics = Data.getDefaultObject( options.views!.statistics, {} as Statistics );
            options.views!.statistics!.enabled = Data.getDefaultBoolean( options.views!.statistics!.enabled, true );
            options.views!.statistics!.showChartYLabels = Data.getDefaultBoolean( options.views!.statistics!.showChartYLabels, true );
            options.views!.statistics!.showColorRangeLabels = Data.getDefaultBoolean( options.views!.statistics!.showColorRangeLabels, true );
            options.views!.statistics!.useColorRangeNamesForLabels = Data.getDefaultBoolean( options.views!.statistics!.useColorRangeNamesForLabels, false );
            options.views!.statistics!.showRangeNumbers = Data.getDefaultBoolean( options.views!.statistics!.showRangeNumbers, false );
            options.views!.statistics!.showInReverseOrder = Data.getDefaultBoolean( options.views!.statistics!.showInReverseOrder, false );
            options.views!.statistics!.keepScrollPositions = Data.getDefaultBoolean( options.views!.statistics!.keepScrollPositions, false );
    
            if ( Is.invalidOptionArray( options.views!.statistics!.monthsToShow ) ) {
                options.views!.statistics!.monthsToShow = _default_MonthsToShow;
            }
    
            if ( Is.invalidOptionArray( options.views!.statistics!.daysToShow ) ) {
                options.views!.statistics!.daysToShow = _default_DaysToShow;
            }
    
            return options;
        }
    
        function buildAttributeOptionCustomTriggers( options : BindingOptions ) : BindingOptions {
            options.events = Data.getDefaultObject( options.events, {} as Events );
            options.events!.onDayClick = Data.getDefaultFunction( options.events!.onDayClick, null! );
            options.events!.onBackYear = Data.getDefaultFunction( options.events!.onBackYear, null! );
            options.events!.onNextYear = Data.getDefaultFunction( options.events!.onNextYear, null! );
            options.events!.onRefresh = Data.getDefaultFunction( options.events!.onRefresh, null! );
            options.events!.onBeforeRender = Data.getDefaultFunction( options.events!.onBeforeRender, null! );
            options.events!.onRenderComplete = Data.getDefaultFunction( options.events!.onRenderComplete, null! );
            options.events!.onDestroy = Data.getDefaultFunction( options.events!.onDestroy, null! );
            options.events!.onExport = Data.getDefaultFunction( options.events!.onExport, null! );
            options.events!.onSetYear = Data.getDefaultFunction( options.events!.onSetYear, null! );
            options.events!.onTypeSwitch = Data.getDefaultFunction( options.events!.onTypeSwitch, null! );
            options.events!.onDayToolTipRender = Data.getDefaultFunction( options.events!.onDayToolTipRender, null! );
            options.events!.onAdd = Data.getDefaultFunction( options.events!.onAdd, null! );
            options.events!.onRemove = Data.getDefaultFunction( options.events!.onRemove, null! );
            options.events!.onReset = Data.getDefaultFunction( options.events!.onReset, null! );
            options.events!.onViewSwitch = Data.getDefaultFunction( options.events!.onViewSwitch, null! );
            options.events!.onColorRangeTypeToggle = Data.getDefaultFunction( options.events!.onColorRangeTypeToggle, null! );
            options.events!.onImport = Data.getDefaultFunction( options.events!.onImport, null! );
            options.events!.onStatisticClick = Data.getDefaultFunction( options.events!.onStatisticClick, null! );
            options.events!.onDataFetch = Data.getDefaultFunction( options.events!.onDataFetch, null! );
            options.events!.onClear = Data.getDefaultFunction( options.events!.onClear, null! );
            options.events!.onUpdate = Data.getDefaultFunction( options.events!.onUpdate, null! );
            options.events!.onOptionsUpdate = Data.getDefaultFunction( options.events!.onOptionsUpdate, null! );
            options.events!.onWeekDayClick = Data.getDefaultFunction( options.events!.onWeekDayClick, null! );
    
            return options;
        }
    }
}