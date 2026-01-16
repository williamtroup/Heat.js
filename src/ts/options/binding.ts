/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        binding.ts
 * @version     v5.0.0 - Beta 1
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2025
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
    type BindingOptionsViews,
    type BindingOptionsYearlyStatistics,
    type BindingOptionsViewsMonths,
    type BindingOptionsViewsLine,
    type BindingOptionsZooming,
    type BindingOptionsDynamicColorRange,
    type ConfigurationOptions } from "../type";

import { Char, ExportType, Value, ViewId, ViewName } from "../data/enum";
import { Default } from "../data/default";
import { Is } from "../data/is";
import { ColorRange } from "../area/color-range";
import { Str } from "../data/str";
import { DomElement } from "../dom/dom";
import { Css } from "../css";


export namespace Binding {
    export namespace Options {
        const _default_MonthsToShow: number[] = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
        const _default_DaysToShow: number[] = [ 1, 2, 3, 4, 5, 6, 7 ];

        export function getForNewInstance( configurationOptions: ConfigurationOptions, data: unknown, element: HTMLElement ) : BindingOptions {
            const bindingOptions: BindingOptions = get( data );
    
            bindingOptions._currentView = {} as BindingOptionsCurrentView;
            bindingOptions._currentView.element = element;
            bindingOptions._currentView.activeYear = bindingOptions.defaultYear!;
            bindingOptions._currentView.activeType = configurationOptions.text!.unknownTrendText!;
            bindingOptions._currentView.activeView = ViewId.unknown;
            bindingOptions._currentView.configurationDialogDayCheckBoxes = [];
            bindingOptions._currentView.configurationDialogMonthCheckBoxes = [];
            bindingOptions._currentView.isInFetchMode = Is.definedFunction( bindingOptions.events!.onDataFetch );
            bindingOptions._currentView.isInFetchModeTimer = 0;
            bindingOptions._currentView.yearsAvailable = [];
            bindingOptions._currentView.dayWidth = 0;
            bindingOptions._currentView.zoomLevel = Value.notFound;
            bindingOptions._currentView.mapZoomIncrement = Value.notFound;
            bindingOptions._currentView.lineZoomIncrement = Value.notFound;
            bindingOptions._currentView.yearTextWidth = 0;
            bindingOptions._currentView.viewsEnabled = 0;

            if ( bindingOptions.views!.map!.enabled ) {
                bindingOptions._currentView.mapContentsScrollLeft = 0;
                bindingOptions._currentView.viewsEnabled++;
            }

            if ( bindingOptions.views!.line!.enabled ) {
                bindingOptions._currentView.lineContentsScrollLeft = 0;
                bindingOptions._currentView.viewsEnabled++;
            }
    
            if ( bindingOptions.views!.chart!.enabled ) {
                bindingOptions._currentView.chartContentsScrollLeft = 0;
                bindingOptions._currentView.viewsEnabled++;
            }
    
            if ( bindingOptions.views!.days!.enabled ) {
                bindingOptions._currentView.daysContentsScrollLeft = 0;
                bindingOptions._currentView.viewsEnabled++;
            }

            if ( bindingOptions.views!.months!.enabled ) {
                bindingOptions._currentView.monthsContentsScrollLeft = 0;
                bindingOptions._currentView.viewsEnabled++;
            }
            
            if ( bindingOptions.views!.colorRanges!.enabled ) {
                bindingOptions._currentView.colorRangesContentsScrollLeft = 0;
                bindingOptions._currentView.viewsEnabled++;
            }
    
            getDefaultView( bindingOptions );
    
            return bindingOptions;
        }

        export function get( newBindingOptions: unknown ) : BindingOptions {
            const bindingOptions: BindingOptions = Default.getObject( newBindingOptions, {} as BindingOptions );
            bindingOptions.views = Default.getObject( bindingOptions.views, {} as BindingOptionsViews );
            bindingOptions.exportOnlyDataBeingViewed = Default.getBoolean( bindingOptions.exportOnlyDataBeingViewed, true );
            bindingOptions.defaultYear = Default.getNumber( bindingOptions.defaultYear, new Date().getFullYear() );
            bindingOptions.defaultView = Default.getString( bindingOptions.defaultView, ViewName.map );
            bindingOptions.exportType = Default.getString( bindingOptions.exportType, ExportType.json );
            bindingOptions.useLocalStorageForData = Default.getBoolean( bindingOptions.useLocalStorageForData, false );
            bindingOptions.allowFileImports = Default.getBoolean( bindingOptions.allowFileImports, true );
            bindingOptions.yearsToHide = Default.getArray( bindingOptions.yearsToHide, [] );
            bindingOptions.dataFetchDelay = Default.getNumber( bindingOptions.dataFetchDelay, 60000 );
            bindingOptions.showOnlyDataForYearsAvailable = Default.getBoolean( bindingOptions.showOnlyDataForYearsAvailable, false );
            bindingOptions.showHolidaysInDayToolTips = Default.getBoolean( bindingOptions.showHolidaysInDayToolTips, false );
            bindingOptions.resizable = Default.getBoolean( bindingOptions.resizable, false );
            bindingOptions.startMonth = Default.getNumberInRange( bindingOptions.startMonth, 0, 11, 0 );
            bindingOptions.allowMultipleFileImports = Default.getBoolean( bindingOptions.allowMultipleFileImports, true );
            bindingOptions.percentageDecimalPoints = Default.getNumber( bindingOptions.percentageDecimalPoints, 2 );
            bindingOptions.chartsAnimationDelay = Default.getNumber( bindingOptions.chartsAnimationDelay, 50 );
            bindingOptions.exportDateTimeFormat = Default.getString( bindingOptions.exportDateTimeFormat, "{dddd}, {d}{o} {mmmm} {yyyy}" );
            bindingOptions.showSideMenu = Default.getBoolean( bindingOptions.showSideMenu, true );
            bindingOptions.title = getTitle( bindingOptions );
            bindingOptions.yearlyStatistics = getYearlyStatistics( bindingOptions );
            bindingOptions.views!.map = getMapView( bindingOptions );
            bindingOptions.views!.line = getLineView( bindingOptions );
            bindingOptions.views!.chart = getChartView( bindingOptions );
            bindingOptions.views!.days = getDaysView( bindingOptions );
            bindingOptions.views!.months = getMonthsView( bindingOptions );
            bindingOptions.views!.colorRanges = getColorRangesView( bindingOptions );
            bindingOptions.description = getDescription( bindingOptions );
            bindingOptions.guide = getGuide( bindingOptions );
            bindingOptions.tooltip = getToolTip( bindingOptions );
            bindingOptions.zooming = getZooming( bindingOptions );
            bindingOptions.dynamicColorRange = getDynamicColorRange( bindingOptions );
            bindingOptions.colorRanges = getColorRanges( bindingOptions );
            bindingOptions.holidays = getHolidays( bindingOptions );
            bindingOptions.events = getCustomTriggers( bindingOptions );

            if ( bindingOptions.startMonth > 0 ) {
                bindingOptions.yearsToHide = [];
            }
            
            return bindingOptions;
        }
    
        function getTitle( bindingOptions: BindingOptions ) : BindingOptionsTitle {
            bindingOptions.title = Default.getObject( bindingOptions.title, {} as BindingOptionsTitle );
            bindingOptions.title!.text = Default.getString( bindingOptions.title!.text, "Heat.js" );
            bindingOptions.title!.showText = Default.getBoolean( bindingOptions.title!.showText, true );
            bindingOptions.title!.showYearSelector = Default.getBoolean( bindingOptions.title!.showYearSelector, true );
            bindingOptions.title!.showRefreshButton = Default.getBoolean( bindingOptions.title!.showRefreshButton, false );
            bindingOptions.title!.showExportButton = Default.getBoolean( bindingOptions.title!.showExportButton, false );
            bindingOptions.title!.extraSelectionYears = Default.getNumber( bindingOptions.title!.extraSelectionYears, 50 );
            bindingOptions.title!.showYearSelectionDropDown = Default.getBoolean( bindingOptions.title!.showYearSelectionDropDown, true );
            bindingOptions.title!.showImportButton = Default.getBoolean( bindingOptions.title!.showImportButton, false );
            bindingOptions.title!.showConfigurationButton = Default.getBoolean( bindingOptions.title!.showConfigurationButton, true );
            bindingOptions.title!.showTitleDropDownButton = Default.getBoolean( bindingOptions.title!.showTitleDropDownButton, true );
            bindingOptions.title!.showTitleDropDownHeaders = Default.getBoolean( bindingOptions.title!.showTitleDropDownHeaders, true );
            bindingOptions.title!.showCurrentYearButton = Default.getBoolean( bindingOptions.title!.showCurrentYearButton, true );
            bindingOptions.title!.showSectionText = Default.getBoolean( bindingOptions.title!.showSectionText, true );
            bindingOptions.title!.showToolTips = Default.getBoolean( bindingOptions.title!.showToolTips, true );
            bindingOptions.title!.showClearButton = Default.getBoolean( bindingOptions.title!.showClearButton, false );

            return bindingOptions.title!;
        }

        function getYearlyStatistics( bindingOptions: BindingOptions ) : BindingOptionsYearlyStatistics {
            bindingOptions.yearlyStatistics = Default.getObject( bindingOptions.yearlyStatistics, {} as BindingOptionsYearlyStatistics );
            bindingOptions.yearlyStatistics!.enabled = Default.getBoolean( bindingOptions.yearlyStatistics!.enabled, false );
            bindingOptions.yearlyStatistics!.showToday = Default.getBoolean( bindingOptions.yearlyStatistics!.showToday, true );
            bindingOptions.yearlyStatistics!.showThisWeek = Default.getBoolean( bindingOptions.yearlyStatistics!.showThisWeek, true );
            bindingOptions.yearlyStatistics!.showThisMonth = Default.getBoolean( bindingOptions.yearlyStatistics!.showThisMonth, true );
            bindingOptions.yearlyStatistics!.showThisYear = Default.getBoolean( bindingOptions.yearlyStatistics!.showThisYear, true );
            bindingOptions.yearlyStatistics!.showOnlyForCurrentYear = Default.getBoolean( bindingOptions.yearlyStatistics!.showOnlyForCurrentYear, false );
            bindingOptions.yearlyStatistics!.showPercentages = Default.getBoolean( bindingOptions.yearlyStatistics!.showPercentages, true );

            return bindingOptions.yearlyStatistics!;
        }
    
        function getMapView( bindingOptions: BindingOptions ) : BindingOptionsViewsMap {
            bindingOptions.views!.map = Default.getObject( bindingOptions.views!.map, {} as BindingOptionsViewsMap );
            bindingOptions.views!.map!.enabled = Default.getBoolean( bindingOptions.views!.map!.enabled, true );
            bindingOptions.views!.map!.showMonthDayGaps = Default.getBoolean( bindingOptions.views!.map!.showMonthDayGaps, true );
            bindingOptions.views!.map!.showDayNames = Default.getBoolean( bindingOptions.views!.map!.showDayNames, true );
            bindingOptions.views!.map!.placeMonthNamesOnTheBottom = Default.getBoolean( bindingOptions.views!.map!.placeMonthNamesOnTheBottom, false );
            bindingOptions.views!.map!.showDayCounts = Default.getBoolean( bindingOptions.views!.map!.showDayCounts, false );
            bindingOptions.views!.map!.showMonthNames = Default.getBoolean( bindingOptions.views!.map!.showMonthNames, true );
            bindingOptions.views!.map!.showDaysInReverseOrder = Default.getBoolean( bindingOptions.views!.map!.showDaysInReverseOrder, false );
            bindingOptions.views!.map!.showMinimalDayNames = Default.getBoolean( bindingOptions.views!.map!.showMinimalDayNames, false );
            bindingOptions.views!.map!.showMonthsInReverseOrder = Default.getBoolean( bindingOptions.views!.map!.showMonthsInReverseOrder, false );
            bindingOptions.views!.map!.keepScrollPositions = Default.getBoolean( bindingOptions.views!.map!.keepScrollPositions, false );
            bindingOptions.views!.map!.showDayDateNumbers = Default.getBoolean( bindingOptions.views!.map!.showDayDateNumbers, false );
            bindingOptions.views!.map!.showToolTips = Default.getBoolean( bindingOptions.views!.map!.showToolTips, true );
            bindingOptions.views!.map!.highlightCurrentDay = Default.getBoolean( bindingOptions.views!.map!.highlightCurrentDay, false );
            bindingOptions.views!.map!.dayToolTipText = Default.getString( bindingOptions.views!.map!.dayToolTipText, "{dddd}, {d}{o} {mmmm} {yyyy}" );
            bindingOptions.views!.map!.showYearsInMonthNames = Default.getBoolean( bindingOptions.views!.map!.showYearsInMonthNames, true );
            bindingOptions.views!.map!.showCountsInToolTips = Default.getBoolean( bindingOptions.views!.map!.showCountsInToolTips, true );
            bindingOptions.views!.map!.showSpacing = Default.getBoolean( bindingOptions.views!.map!.showSpacing, true );
            bindingOptions.views!.map!.showDifferences = Default.getBoolean( bindingOptions.views!.map!.showDifferences, false );
            bindingOptions.views!.map!.showDifferencesInToolTips = Default.getBoolean( bindingOptions.views!.map!.showDifferencesInToolTips, true );

            if ( Is.invalidOptionArray( bindingOptions.views!.map!.monthsToShow! ) ) {
                bindingOptions.views!.map!.monthsToShow = _default_MonthsToShow;
            }
    
            if ( Is.invalidOptionArray( bindingOptions.views!.map!.daysToShow! ) ) {
                bindingOptions.views!.map!.daysToShow = _default_DaysToShow;
            }
    
            return bindingOptions.views!.map!;
        }

        function getLineView( bindingOptions: BindingOptions ) : BindingOptionsViewsLine {
            bindingOptions.views!.line = Default.getObject( bindingOptions.views!.line, {} as BindingOptionsViewsLine );
            bindingOptions.views!.line!.enabled = Default.getBoolean( bindingOptions.views!.line!.enabled, true );
            bindingOptions.views!.line!.showMonthNames = Default.getBoolean( bindingOptions.views!.line!.showMonthNames, true );
            bindingOptions.views!.line!.showInReverseOrder = Default.getBoolean( bindingOptions.views!.line!.showInReverseOrder, false );
            bindingOptions.views!.line!.keepScrollPositions = Default.getBoolean( bindingOptions.views!.line!.keepScrollPositions, false );
            bindingOptions.views!.line!.showYearsInMonthNames = Default.getBoolean( bindingOptions.views!.line!.showYearsInMonthNames, true );
            bindingOptions.views!.line!.showToolTips = Default.getBoolean( bindingOptions.views!.line!.showToolTips, true );
            bindingOptions.views!.line!.dayToolTipText = Default.getString( bindingOptions.views!.line!.dayToolTipText, "{dddd}, {d}{o} {mmmm} {yyyy}" );
            bindingOptions.views!.line!.showCountsInToolTips = Default.getBoolean( bindingOptions.views!.line!.showCountsInToolTips, true );
            bindingOptions.views!.line!.showDifferencesInToolTips = Default.getBoolean( bindingOptions.views!.line!.showDifferencesInToolTips, true );

            if ( Is.invalidOptionArray( bindingOptions.views!.line!.monthsToShow! ) ) {
                bindingOptions.views!.line!.monthsToShow = _default_MonthsToShow;
            }
    
            if ( Is.invalidOptionArray( bindingOptions.views!.line!.daysToShow! ) ) {
                bindingOptions.views!.line!.daysToShow = _default_DaysToShow;
            }
    
            return bindingOptions.views!.line!;
        }
    
        function getChartView( bindingOptions: BindingOptions ) : BindingOptionsViewsChart {
            bindingOptions.views!.chart = Default.getObject( bindingOptions.views!.chart, {} as BindingOptionsViewsChart );
            bindingOptions.views!.chart!.enabled = Default.getBoolean( bindingOptions.views!.chart!.enabled, true );
            bindingOptions.views!.chart!.showChartYLabels = Default.getBoolean( bindingOptions.views!.chart!.showChartYLabels, true );
            bindingOptions.views!.chart!.showMonthNames = Default.getBoolean( bindingOptions.views!.chart!.showMonthNames, true );
            bindingOptions.views!.chart!.showLineCounts = Default.getBoolean( bindingOptions.views!.chart!.showLineCounts, false );
            bindingOptions.views!.chart!.showInReverseOrder = Default.getBoolean( bindingOptions.views!.chart!.showInReverseOrder, false );
            bindingOptions.views!.chart!.keepScrollPositions = Default.getBoolean( bindingOptions.views!.chart!.keepScrollPositions, false );
            bindingOptions.views!.chart!.showLineDateNumbers = Default.getBoolean( bindingOptions.views!.chart!.showLineDateNumbers, false );
            bindingOptions.views!.chart!.showToolTips = Default.getBoolean( bindingOptions.views!.chart!.showToolTips, true );
            bindingOptions.views!.chart!.useGradients = Default.getBoolean( bindingOptions.views!.chart!.useGradients, false );
            bindingOptions.views!.chart!.highlightCurrentDay = Default.getBoolean( bindingOptions.views!.chart!.highlightCurrentDay, false );
            bindingOptions.views!.chart!.dayToolTipText = Default.getString( bindingOptions.views!.chart!.dayToolTipText, "{dddd}, {d}{o} {mmmm} {yyyy}" );
            bindingOptions.views!.chart!.showYearsInMonthNames = Default.getBoolean( bindingOptions.views!.chart!.showYearsInMonthNames, true );
            bindingOptions.views!.chart!.showCountsInToolTips = Default.getBoolean( bindingOptions.views!.chart!.showCountsInToolTips, true );
            bindingOptions.views!.chart!.addMonthSpacing = Default.getBoolean( bindingOptions.views!.chart!.addMonthSpacing, false );
            bindingOptions.views!.chart!.showDifferences = Default.getBoolean( bindingOptions.views!.chart!.showDifferences, false );
            bindingOptions.views!.chart!.showDifferencesInToolTips = Default.getBoolean( bindingOptions.views!.chart!.showDifferencesInToolTips, true );

            if ( Is.invalidOptionArray( bindingOptions.views!.chart!.monthsToShow! ) ) {
                bindingOptions.views!.chart!.monthsToShow = _default_MonthsToShow;
            }
    
            if ( Is.invalidOptionArray( bindingOptions.views!.chart!.daysToShow! ) ) {
                bindingOptions.views!.chart!.daysToShow = _default_DaysToShow;
            }
    
            return bindingOptions.views!.chart!;
        }
    
        function getDaysView( bindingOptions: BindingOptions ) : BindingOptionsViewsDays {
            bindingOptions.views!.days = Default.getObject( bindingOptions.views!.days, {} as BindingOptionsViewsDays );
            bindingOptions.views!.days!.enabled = Default.getBoolean( bindingOptions.views!.days!.enabled, true );
            bindingOptions.views!.days!.showChartYLabels = Default.getBoolean( bindingOptions.views!.days!.showChartYLabels, true );
            bindingOptions.views!.days!.showDayNames = Default.getBoolean( bindingOptions.views!.days!.showDayNames, true );
            bindingOptions.views!.days!.showInReverseOrder = Default.getBoolean( bindingOptions.views!.days!.showInReverseOrder, false );
            bindingOptions.views!.days!.showDayCounts = Default.getBoolean( bindingOptions.views!.days!.showDayCounts, false );
            bindingOptions.views!.days!.keepScrollPositions = Default.getBoolean( bindingOptions.views!.days!.keepScrollPositions, false );
            bindingOptions.views!.days!.showToolTips = Default.getBoolean( bindingOptions.views!.days!.showToolTips, true );
            bindingOptions.views!.days!.useGradients = Default.getBoolean( bindingOptions.views!.days!.useGradients, false );
            bindingOptions.views!.days!.useDifferentOpacities = Default.getBoolean( bindingOptions.views!.days!.useDifferentOpacities, false );
            bindingOptions.views!.days!.showDayCountPercentages = Default.getBoolean( bindingOptions.views!.days!.showDayCountPercentages, true );
            bindingOptions.views!.days!.showStackedColorRanges = Default.getBoolean( bindingOptions.views!.days!.showStackedColorRanges, true );
            bindingOptions.views!.days!.dayToolTipText = Default.getString( bindingOptions.views!.days!.dayToolTipText, "{dddd} {yyyy}" );
    
            if ( Is.invalidOptionArray( bindingOptions.views!.days!.monthsToShow! ) ) {
                bindingOptions.views!.days!.monthsToShow = _default_MonthsToShow;
            }
    
            if ( Is.invalidOptionArray( bindingOptions.views!.days!.daysToShow! ) ) {
                bindingOptions.views!.days!.daysToShow = _default_DaysToShow;
            }
    
            return bindingOptions.views!.days!;
        }

        function getMonthsView( bindingOptions: BindingOptions ) : BindingOptionsViewsMonths {
            bindingOptions.views!.months = Default.getObject( bindingOptions.views!.months, {} as BindingOptionsViewsMonths );
            bindingOptions.views!.months!.enabled = Default.getBoolean( bindingOptions.views!.months!.enabled, true );
            bindingOptions.views!.months!.showChartYLabels = Default.getBoolean( bindingOptions.views!.months!.showChartYLabels, true );
            bindingOptions.views!.months!.showMonthNames = Default.getBoolean( bindingOptions.views!.months!.showMonthNames, true );
            bindingOptions.views!.months!.showInReverseOrder = Default.getBoolean( bindingOptions.views!.months!.showInReverseOrder, false );
            bindingOptions.views!.months!.showMonthCounts = Default.getBoolean( bindingOptions.views!.months!.showMonthCounts, false );
            bindingOptions.views!.months!.keepScrollPositions = Default.getBoolean( bindingOptions.views!.months!.keepScrollPositions, false );
            bindingOptions.views!.months!.showToolTips = Default.getBoolean( bindingOptions.views!.months!.showToolTips, true );
            bindingOptions.views!.months!.useGradients = Default.getBoolean( bindingOptions.views!.months!.useGradients, false );
            bindingOptions.views!.months!.useDifferentOpacities = Default.getBoolean( bindingOptions.views!.months!.useDifferentOpacities, false );
            bindingOptions.views!.months!.highlightCurrentMonth = Default.getBoolean( bindingOptions.views!.months!.highlightCurrentMonth, false );
            bindingOptions.views!.months!.showMonthCountPercentages = Default.getBoolean( bindingOptions.views!.months!.showMonthCountPercentages, true );
            bindingOptions.views!.months!.showStackedColorRanges = Default.getBoolean( bindingOptions.views!.months!.showStackedColorRanges, true );
            bindingOptions.views!.months!.monthToolTipText = Default.getString( bindingOptions.views!.months!.monthToolTipText, "{mmmm} {yyyy}" );
    
            if ( Is.invalidOptionArray( bindingOptions.views!.months!.monthsToShow! ) ) {
                bindingOptions.views!.months!.monthsToShow = _default_MonthsToShow;
            }
    
            if ( Is.invalidOptionArray( bindingOptions.views!.months!.daysToShow! ) ) {
                bindingOptions.views!.months!.daysToShow = _default_DaysToShow;
            }
    
            return bindingOptions.views!.months!;
        }
    
        function getColorRangesView( bindingOptions: BindingOptions ) : BindingOptionsViewsStatistics {
            bindingOptions.views!.colorRanges = Default.getObject( bindingOptions.views!.colorRanges, {} as BindingOptionsViewsStatistics );
            bindingOptions.views!.colorRanges!.enabled = Default.getBoolean( bindingOptions.views!.colorRanges!.enabled, true );
            bindingOptions.views!.colorRanges!.showChartYLabels = Default.getBoolean( bindingOptions.views!.colorRanges!.showChartYLabels, true );
            bindingOptions.views!.colorRanges!.showColorRangeLabels = Default.getBoolean( bindingOptions.views!.colorRanges!.showColorRangeLabels, true );
            bindingOptions.views!.colorRanges!.useColorRangeNamesForLabels = Default.getBoolean( bindingOptions.views!.colorRanges!.useColorRangeNamesForLabels, false );
            bindingOptions.views!.colorRanges!.showRangeCounts = Default.getBoolean( bindingOptions.views!.colorRanges!.showRangeCounts, false );
            bindingOptions.views!.colorRanges!.showInReverseOrder = Default.getBoolean( bindingOptions.views!.colorRanges!.showInReverseOrder, false );
            bindingOptions.views!.colorRanges!.keepScrollPositions = Default.getBoolean( bindingOptions.views!.colorRanges!.keepScrollPositions, false );
            bindingOptions.views!.colorRanges!.showToolTips = Default.getBoolean( bindingOptions.views!.colorRanges!.showToolTips, true );
            bindingOptions.views!.colorRanges!.useGradients = Default.getBoolean( bindingOptions.views!.colorRanges!.useGradients, false );
            bindingOptions.views!.colorRanges!.showRangeCountPercentages = Default.getBoolean( bindingOptions.views!.colorRanges!.showRangeCountPercentages, true );
            bindingOptions.views!.colorRanges!.showRangeNamesInToolTips = Default.getBoolean( bindingOptions.views!.colorRanges!.showRangeNamesInToolTips, true );

            if ( Is.invalidOptionArray( bindingOptions.views!.colorRanges!.monthsToShow! ) ) {
                bindingOptions.views!.colorRanges!.monthsToShow = _default_MonthsToShow;
            }
    
            if ( Is.invalidOptionArray( bindingOptions.views!.colorRanges!.daysToShow! ) ) {
                bindingOptions.views!.colorRanges!.daysToShow = _default_DaysToShow;
            }
    
            return bindingOptions.views!.colorRanges!;
        }

        function getDescription( bindingOptions: BindingOptions ) : BindingOptionsDescription {
            bindingOptions.description = Default.getObject( bindingOptions.description, {} as BindingOptionsDescription );
            bindingOptions.description!.text = Default.getString( bindingOptions.description!.text, Char.empty );
            bindingOptions.description!.url = Default.getString( bindingOptions.description!.url, Char.empty );
            bindingOptions.description!.urlTarget = Default.getString( bindingOptions.description!.urlTarget, "_blank" );
    
            return bindingOptions.description!;
        }
    
        function getGuide( bindingOptions: BindingOptions ) : BindingOptionsGuide {
            bindingOptions.guide = Default.getObject( bindingOptions.guide, {} as BindingOptionsGuide );
            bindingOptions.guide!.enabled = Default.getBoolean( bindingOptions.guide!.enabled, true );
            bindingOptions.guide!.colorRangeTogglesEnabled = Default.getBoolean( bindingOptions.guide!.colorRangeTogglesEnabled, true );
            bindingOptions.guide!.showLessAndMoreLabels = Default.getBoolean( bindingOptions.guide!.showLessAndMoreLabels, true );
            bindingOptions.guide!.showNumbersInGuide = Default.getBoolean( bindingOptions.guide!.showNumbersInGuide, false );
            bindingOptions.guide!.showToolTips = Default.getBoolean( bindingOptions.guide!.showToolTips, true );
            bindingOptions.guide!.showInvertLabel = Default.getBoolean( bindingOptions.guide!.showInvertLabel, false );
            bindingOptions.guide!.useIncrementToggles = Default.getBoolean( bindingOptions.guide!.useIncrementToggles, false );
            bindingOptions.guide!.allowTypeAdding = Default.getBoolean( bindingOptions.guide!.allowTypeAdding, false );
            bindingOptions.guide!.allowTypeRemoving = Default.getBoolean( bindingOptions.guide!.allowTypeRemoving, false );

            return bindingOptions.guide!;
        }
    
        function getToolTip( bindingOptions: BindingOptions ) : BindingOptionsTooltip {
            bindingOptions.tooltip = Default.getObject( bindingOptions.tooltip, {} as BindingOptionsTooltip );
            bindingOptions.tooltip!.delay = Default.getNumber( bindingOptions.tooltip!.delay, 750 );
    
            return bindingOptions.tooltip!;
        }

        function getZooming( bindingOptions: BindingOptions ) : BindingOptionsZooming {
            bindingOptions.zooming = Default.getObject( bindingOptions.zooming, {} as BindingOptionsZooming );
            bindingOptions.zooming!.enabled = Default.getBoolean( bindingOptions.zooming!.enabled, false );
            bindingOptions.zooming!.defaultLevel = Default.getNumber( bindingOptions.zooming!.defaultLevel, 0 );
            bindingOptions.zooming!.maximumLevel = Default.getNumber( bindingOptions.zooming!.maximumLevel, 0 );
            bindingOptions.zooming!.showCloseButton = Default.getBoolean( bindingOptions.zooming!.showCloseButton, true );
            bindingOptions.zooming!.showResetButton = Default.getBoolean( bindingOptions.zooming!.showResetButton, false );
    
            return bindingOptions.zooming!;
        }

        function getDynamicColorRange( bindingOptions: BindingOptions ) : BindingOptionsDynamicColorRange {
            const defaultDynamicColor: string = DomElement.getStyleValueByName( document.documentElement, Css.Variables.DefaultDynamicColor ) as string;

            bindingOptions.dynamicColorRange = Default.getObject( bindingOptions.dynamicColorRange, {} as BindingOptionsDynamicColorRange );
            bindingOptions.dynamicColorRange!.enabled = Default.getBoolean( bindingOptions.dynamicColorRange!.enabled, false );
            bindingOptions.dynamicColorRange!.maximumMinimum = Default.getNumber( bindingOptions.dynamicColorRange!.maximumMinimum, 25 );
            bindingOptions.dynamicColorRange!.color = Default.getString( bindingOptions.dynamicColorRange!.color, defaultDynamicColor );
            bindingOptions.dynamicColorRange!.totalColors = Default.getNumber( bindingOptions.dynamicColorRange!.totalColors, 5 );
            bindingOptions.dynamicColorRange!.startMinimum = Default.getNumber( bindingOptions.dynamicColorRange!.startMinimum, 10 );
    
            return bindingOptions.dynamicColorRange!;
        }
    
        function getColorRanges( bindingOptions: BindingOptions ) : BindingOptionsColorRange[] {
            let result: BindingOptionsColorRange[] = [];
            
            if ( bindingOptions.dynamicColorRange!.enabled && Is.hexColor( bindingOptions.dynamicColorRange!.color! ) ) {
                result = ColorRange.buildDynamics( bindingOptions.dynamicColorRange! );

            } else {
                if ( Is.definedArray( bindingOptions.colorRanges ) ) {
                    const colorRangesLength: number = bindingOptions.colorRanges!.length;
        
                    for ( let colorRangeIndex: number = 0; colorRangeIndex < colorRangesLength; colorRangeIndex++ ) {
                        const colorRange: BindingOptionsColorRange = bindingOptions.colorRanges![ colorRangeIndex ];
        
                        colorRange.id = Default.getString( colorRange.id, crypto.randomUUID() );
                        colorRange.name = Default.getString( colorRange.name, Char.empty );
                        colorRange.minimum = Default.getNumber( colorRange.minimum, 0 );
                        colorRange.cssClassName = Default.getString( colorRange.cssClassName, Char.empty );
                        colorRange.mapCssClassName = Default.getString( colorRange.mapCssClassName, Char.empty );
                        colorRange.lineCssClassName = Default.getString( colorRange.lineCssClassName, Char.empty );
                        colorRange.chartCssClassName = Default.getString( colorRange.chartCssClassName, Char.empty );
                        colorRange.daysCssClassName = Default.getString( colorRange.daysCssClassName, Char.empty );
                        colorRange.monthsCssClassName = Default.getString( colorRange.monthsCssClassName, Char.empty );
                        colorRange.colorRangeCssClassName = Default.getString( colorRange.colorRangeCssClassName, Char.empty );
                        colorRange.tooltipText = Default.getString( colorRange.tooltipText, Char.empty );
                        colorRange.visible = Default.getBoolean( colorRange.visible, true );

                        result.push( colorRange );
                    }
        
                } else {
                    result = [
                        {
                            id: Str.padNumber( 1 ),
                            name: "Day Color 1",
                            minimum: 10,
                            cssClassName: "day-color-1",
                            tooltipText: "Day Color 1",
                            visible: true,
                        },
                        {
                            id: Str.padNumber( 2 ),
                            name: "Day Color 2",
                            minimum: 15,
                            cssClassName: "day-color-2",
                            tooltipText: "Day Color 2",
                            visible: true,
                        },
                        {
                            id: Str.padNumber( 3 ),
                            name: "Day Color 3",
                            minimum: 20,
                            cssClassName: "day-color-3",
                            tooltipText: "Day Color 3",
                            visible: true,
                        },
                        {
                            id: Str.padNumber( 4 ),
                            name: "Day Color 4",
                            minimum: 25,
                            cssClassName: "day-color-4",
                            tooltipText: "Day Color 4",
                            visible: true,
                        },
                    ];
                }
            }
    
            return result;
        }

        function getHolidays( bindingOptions: BindingOptions ) : BindingOptionsHoliday[] {
            const result: BindingOptionsHoliday[] = [];

            if ( Is.definedArray( bindingOptions.holidays ) ) {
                const holidaysLength: number = bindingOptions.holidays!.length;
    
                for ( let holidayIndex: number = 0; holidayIndex < holidaysLength; holidayIndex++ ) {
                    const holiday: BindingOptionsHoliday = bindingOptions.holidays![ holidayIndex ];
                    
                    holiday.date = Default.getString( holiday.date, Char.empty );
                    holiday.name = Default.getString( holiday.name, Char.empty );
                    holiday.showInViews = Default.getBoolean( holiday.showInViews, true );

                    result.push( holiday );
                }
            }
    
            return result;
        }
    
        function getCustomTriggers( bindingOptions : BindingOptions ) : BindingOptionsEvents {
            bindingOptions.events = Default.getObject( bindingOptions.events, {} as BindingOptionsEvents );
            bindingOptions.events!.onBackYear = Default.getFunction( bindingOptions.events!.onBackYear, null! );
            bindingOptions.events!.onNextYear = Default.getFunction( bindingOptions.events!.onNextYear, null! );
            bindingOptions.events!.onRefresh = Default.getFunction( bindingOptions.events!.onRefresh, null! );
            bindingOptions.events!.onBeforeRender = Default.getFunction( bindingOptions.events!.onBeforeRender, null! );
            bindingOptions.events!.onRenderComplete = Default.getFunction( bindingOptions.events!.onRenderComplete, null! );
            bindingOptions.events!.onDestroy = Default.getFunction( bindingOptions.events!.onDestroy, null! );
            bindingOptions.events!.onExport = Default.getFunction( bindingOptions.events!.onExport, null! );
            bindingOptions.events!.onSetYear = Default.getFunction( bindingOptions.events!.onSetYear, null! );
            bindingOptions.events!.onTypeSwitch = Default.getFunction( bindingOptions.events!.onTypeSwitch, null! );
            bindingOptions.events!.onMapDayToolTipRender = Default.getFunction( bindingOptions.events!.onMapDayToolTipRender, null! );
            bindingOptions.events!.onLineDayToolTipRender = Default.getFunction( bindingOptions.events!.onLineDayToolTipRender, bindingOptions.events!.onMapDayToolTipRender! );
            bindingOptions.events!.onChartDayToolTipRender = Default.getFunction( bindingOptions.events!.onChartDayToolTipRender, bindingOptions.events!.onMapDayToolTipRender! );
            bindingOptions.events!.onAddDate = Default.getFunction( bindingOptions.events!.onAddDate, null! );
            bindingOptions.events!.onRemoveDate = Default.getFunction( bindingOptions.events!.onRemoveDate, null! );
            bindingOptions.events!.onReset = Default.getFunction( bindingOptions.events!.onReset, null! );
            bindingOptions.events!.onViewSwitch = Default.getFunction( bindingOptions.events!.onViewSwitch, null! );
            bindingOptions.events!.onColorRangeTypeToggle = Default.getFunction( bindingOptions.events!.onColorRangeTypeToggle, null! );
            bindingOptions.events!.onImport = Default.getFunction( bindingOptions.events!.onImport, null! );
            bindingOptions.events!.onDataFetch = Default.getFunction( bindingOptions.events!.onDataFetch, null! );
            bindingOptions.events!.onClearDate = Default.getFunction( bindingOptions.events!.onClearDate, null! );
            bindingOptions.events!.onUpdateDate = Default.getFunction( bindingOptions.events!.onUpdateDate, null! );
            bindingOptions.events!.onBindingOptionsUpdate = Default.getFunction( bindingOptions.events!.onBindingOptionsUpdate, null! );
            bindingOptions.events!.onMapDayClick = Default.getFunction( bindingOptions.events!.onMapDayClick, null! );
            bindingOptions.events!.onMapDayDblClick = Default.getFunction( bindingOptions.events!.onMapDayDblClick, null! );
            bindingOptions.events!.onLineDayClick = Default.getFunction( bindingOptions.events!.onLineDayClick, bindingOptions.events!.onMapDayClick! );
            bindingOptions.events!.onLineDayDblClick = Default.getFunction( bindingOptions.events!.onLineDayDblClick, bindingOptions.events!.onMapDayDblClick! );
            bindingOptions.events!.onChartDayClick = Default.getFunction( bindingOptions.events!.onChartDayClick, bindingOptions.events!.onMapDayClick! );
            bindingOptions.events!.onChartDayDblClick = Default.getFunction( bindingOptions.events!.onChartDayDblClick, bindingOptions.events!.onMapDayDblClick! );
            bindingOptions.events!.onWeekDayClick = Default.getFunction( bindingOptions.events!.onWeekDayClick, null! );
            bindingOptions.events!.onWeekDayDblClick = Default.getFunction( bindingOptions.events!.onWeekDayDblClick, null! );
            bindingOptions.events!.onMonthClick = Default.getFunction( bindingOptions.events!.onMonthClick, null! );
            bindingOptions.events!.onMonthDblClick = Default.getFunction( bindingOptions.events!.onMonthDblClick, null! );
            bindingOptions.events!.onColorRangeClick = Default.getFunction( bindingOptions.events!.onColorRangeClick, null! );
            bindingOptions.events!.onColorRangeDblClick = Default.getFunction( bindingOptions.events!.onColorRangeDblClick, null! );
            bindingOptions.events!.onZoomLevelChange = Default.getFunction( bindingOptions.events!.onZoomLevelChange, null! );
            bindingOptions.events!.onClearViewableData = Default.getFunction( bindingOptions.events!.onClearViewableData, null! );
            bindingOptions.events!.onAddType = Default.getFunction( bindingOptions.events!.onAddType, null! );
            bindingOptions.events!.onRemoveType = Default.getFunction( bindingOptions.events!.onRemoveType, null! );

            return bindingOptions.events!;
        }

        function getDefaultView( bindingOptions: BindingOptions ) : void {
            if ( bindingOptions.views!.map!.enabled && bindingOptions.defaultView === ViewName.map ) {
                bindingOptions._currentView!.activeView = ViewId.map;
            } else if ( bindingOptions.views!.line!.enabled && bindingOptions.defaultView === ViewName.line ) {
                bindingOptions._currentView!.activeView = ViewId.line;
            } else if ( bindingOptions.views!.chart!.enabled && bindingOptions.defaultView === ViewName.chart ) {
                bindingOptions._currentView!.activeView = ViewId.chart;
            } else if ( bindingOptions.views!.days!.enabled && bindingOptions.defaultView === ViewName.days ) {
                bindingOptions._currentView!.activeView = ViewId.days;
            } else if ( bindingOptions.views!.months!.enabled && bindingOptions.defaultView === ViewName.months ) {
                bindingOptions._currentView!.activeView = ViewId.months;
            } else if ( bindingOptions.views!.colorRanges!.enabled && bindingOptions.defaultView === ViewName.colorRanges ) {
                bindingOptions._currentView!.activeView = ViewId.colorRanges;
            }

            if ( bindingOptions._currentView!.activeView === ViewId.unknown ) {
                if ( bindingOptions.views!.map!.enabled ) {
                    bindingOptions._currentView!.activeView = ViewId.map;
                } else if ( bindingOptions.views!.line!.enabled ) {
                    bindingOptions._currentView!.activeView = ViewId.line;
                } else if ( bindingOptions.views!.chart!.enabled ) {
                    bindingOptions._currentView!.activeView = ViewId.chart;
                } else if ( bindingOptions.views!.days!.enabled ) {
                    bindingOptions._currentView!.activeView = ViewId.days;
                } else if ( bindingOptions.views!.months!.enabled ) {
                    bindingOptions._currentView!.activeView = ViewId.months;
                } else if ( bindingOptions.views!.colorRanges!.enabled ) {
                    bindingOptions._currentView!.activeView = ViewId.colorRanges;
                }

                if ( bindingOptions._currentView!.activeView === ViewId.unknown ) {
                    bindingOptions.views!.map!.enabled = true;
                    bindingOptions._currentView!.activeView = ViewId.map;
                }
            }
        }
    }
}