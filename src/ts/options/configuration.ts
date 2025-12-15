/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        configuration.ts
 * @version     v5.0.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2025
 */


import { type ConfigurationOptions, type ConfigurationOptionsText } from "../type";
import { Default } from "../data/default";
import { Is } from "../data/is";


export namespace Configuration {
    export namespace Options {
        export function get( configurationOptions: ConfigurationOptions = null! ) : ConfigurationOptions {
            const configuration = Default.getObject( configurationOptions, {} as ConfigurationOptions );
            configuration.safeMode = Default.getBoolean( configuration.safeMode, true );
            configuration.observationMode = Default.getBoolean( configuration.observationMode, true );
            configuration.domElementTypes = Default.getStringOrArray( configuration.domElementTypes, [ "*" ] );
    
            configuration.text = getText( configuration );
            configuration.text = getTextArrays( configuration.text );

            return configuration;
        }
    
        function getText( configurationOptions: ConfigurationOptions ) : ConfigurationOptionsText {
            configurationOptions.text = Default.getObject( configurationOptions.text, {} as ConfigurationOptionsText );
            configurationOptions.text!.stText = Default.getAnyString( configurationOptions.text!.stText, "st" );
            configurationOptions.text!.ndText = Default.getAnyString( configurationOptions.text!.ndText, "nd" );
            configurationOptions.text!.rdText = Default.getAnyString( configurationOptions.text!.rdText, "rd" );
            configurationOptions.text!.thText = Default.getAnyString( configurationOptions.text!.thText, "th" );
            configurationOptions.text!.backButtonText = Default.getAnyString( configurationOptions.text!.backButtonText, "Back" );
            configurationOptions.text!.nextButtonText = Default.getAnyString( configurationOptions.text!.nextButtonText, "Next" );
            configurationOptions.text!.refreshButtonText = Default.getAnyString( configurationOptions.text!.refreshButtonText, "Refresh" );
            configurationOptions.text!.exportButtonText = Default.getAnyString( configurationOptions.text!.exportButtonText, "Export" );
            configurationOptions.text!.lessText = Default.getAnyString( configurationOptions.text!.lessText, "Less" );
            configurationOptions.text!.moreText = Default.getAnyString( configurationOptions.text!.moreText, "More" );
            configurationOptions.text!.dateText = Default.getAnyString( configurationOptions.text!.dateText, "Date" );
            configurationOptions.text!.countText = Default.getAnyString( configurationOptions.text!.countText, "Count" );
            configurationOptions.text!.mapText = Default.getAnyString( configurationOptions.text!.mapText, "Map" );
            configurationOptions.text!.chartText = Default.getAnyString( configurationOptions.text!.chartText, "Chart" );
            configurationOptions.text!.noChartDataMessage = Default.getAnyString( configurationOptions.text!.noChartDataMessage, "There is currently no data to view." );
            configurationOptions.text!.statisticsText = Default.getAnyString( configurationOptions.text!.statisticsText, "Statistics" );
            configurationOptions.text!.noStatisticsDataMessage = Default.getAnyString( configurationOptions.text!.noStatisticsDataMessage, "There are currently no statistics to view." );
            configurationOptions.text!.unknownTrendText = Default.getAnyString( configurationOptions.text!.unknownTrendText, "Unknown" );
            configurationOptions.text!.importButtonText = Default.getAnyString( configurationOptions.text!.importButtonText, "Import" );
            configurationOptions.text!.noMapDataMessage = Default.getAnyString( configurationOptions.text!.noMapDataMessage, "There is currently no data to view." );
            configurationOptions.text!.objectErrorText = Default.getAnyString( configurationOptions.text!.objectErrorText, "Errors in object: {{error_1}}, {{error_2}}" );
            configurationOptions.text!.attributeNotValidErrorText = Default.getAnyString( configurationOptions.text!.attributeNotValidErrorText, "The attribute '{{attribute_name}}' is not a valid object." );
            configurationOptions.text!.attributeNotSetErrorText = Default.getAnyString( configurationOptions.text!.attributeNotSetErrorText, "The attribute '{{attribute_name}}' has not been set correctly." );
            configurationOptions.text!.closeButtonText = Default.getAnyString( configurationOptions.text!.closeButtonText, "Close" );
            configurationOptions.text!.configurationButtonText = Default.getAnyString( configurationOptions.text!.configurationButtonText, "Configuration" );
            configurationOptions.text!.configurationTitleText = Default.getAnyString( configurationOptions.text!.configurationTitleText, "Configuration" );
            configurationOptions.text!.visibleMonthsText = Default.getAnyString( configurationOptions.text!.visibleMonthsText, "Visible Months" );
            configurationOptions.text!.visibleDaysText = Default.getAnyString( configurationOptions.text!.visibleDaysText, "Visible Days" );
            configurationOptions.text!.dataText = Default.getAnyString( configurationOptions.text!.dataText, "Data" );
            configurationOptions.text!.colorRangesText = Default.getAnyString( configurationOptions.text!.colorRangesText, "Color Ranges" );
            configurationOptions.text!.yearText = Default.getAnyString( configurationOptions.text!.yearText, "Year" );
            configurationOptions.text!.daysText = Default.getAnyString( configurationOptions.text!.daysText, "Days" );
            configurationOptions.text!.noDaysDataMessage = Default.getAnyString( configurationOptions.text!.noDaysDataMessage, "There are currently no days to view." );
            configurationOptions.text!.currentYearText = Default.getAnyString( configurationOptions.text!.currentYearText, "Current Year" );
            configurationOptions.text!.todayText = Default.getAnyString( configurationOptions.text!.todayText, "Today" );
            configurationOptions.text!.thisWeekText = Default.getAnyString( configurationOptions.text!.thisWeekText, "This Week" );
            configurationOptions.text!.thisMonthText = Default.getAnyString( configurationOptions.text!.thisMonthText, "This Month" );
            configurationOptions.text!.thisYearText = Default.getAnyString( configurationOptions.text!.thisYearText, "This Year" );
            configurationOptions.text!.unavailableText = Default.getAnyString( configurationOptions.text!.unavailableText, "Unavailable" );
            configurationOptions.text!.monthsText = Default.getAnyString( configurationOptions.text!.monthsText, "Months" );
            configurationOptions.text!.noMonthsDataMessage = Default.getAnyString( configurationOptions.text!.noMonthsDataMessage, "There are currently no months to view." );
            configurationOptions.text!.selectTypeText = Default.getAnyString( configurationOptions.text!.selectTypeText, "Select Type" );
            configurationOptions.text!.filenamePlaceholderText = Default.getAnyString( configurationOptions.text!.filenamePlaceholderText, "Filename (optional)" );
            configurationOptions.text!.onlyDataBeingViewedText = Default.getAnyString( configurationOptions.text!.onlyDataBeingViewedText, "Only data being viewed" );
            configurationOptions.text!.zoomInText = Default.getAnyString( configurationOptions.text!.zoomInText, "Zoom In" );
            configurationOptions.text!.zoomOutText = Default.getAnyString( configurationOptions.text!.zoomOutText, "Zoom Out" );
            configurationOptions.text!.clearButtonText = Default.getAnyString( configurationOptions.text!.clearButtonText, "Clear" );
            configurationOptions.text!.selectFilesText = Default.getAnyString( configurationOptions.text!.selectFilesText, "Select File(s)" );
            configurationOptions.text!.dragAndDropFilesText = Default.getAnyString( configurationOptions.text!.dragAndDropFilesText, "Drag and drop your file(s) here..." );

            return configurationOptions.text!;
        }
    
        function getTextArrays( configurationOptionsText: ConfigurationOptionsText ) : ConfigurationOptionsText {
            if ( Is.invalidOptionArray( configurationOptionsText.monthNames, 12 ) ) {
                configurationOptionsText.monthNames = [
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
    
            if ( Is.invalidOptionArray( configurationOptionsText.dayNames, 7 ) ) {
                configurationOptionsText.dayNames = [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ];
            }

            return configurationOptionsText;
        }
    }
}