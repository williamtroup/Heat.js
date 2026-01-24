/**
 * Heat.js
 * 
 * A highly customizable JavaScript library for generating interactive heatmaps. It transforms data into smooth, visually intuitive heat layers, making patterns and intensity easy to spot at a glance. 
 * 
 * @file        configuration.ts
 * @version     v5.0.0 - Beta 7
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2026
 */


import { type ConfigurationOptions, type ConfigurationOptionsText } from "../type";
import { Default } from "../data/default";
import { Is } from "../data/is";


export namespace Configuration {
    export namespace Options {
        export function get( configurationOptions: ConfigurationOptions = null! ) : ConfigurationOptions {
            const configuration: ConfigurationOptions = Default.getObject( configurationOptions, {} as ConfigurationOptions );
            configuration.safeMode = Default.getBoolean( configuration.safeMode, true );
            configuration.observationMode = Default.getBoolean( configuration.observationMode, true );
            configuration.domElementTypes = Default.getStringOrArray( configuration.domElementTypes, [ "*" ] );
            configuration.allowEmptyBindings = Default.getBoolean( configuration.allowEmptyBindings, true );
            configuration.text = getText( configuration.text! );

            return configuration;
        }

        export function getText( configurationOptionsText: ConfigurationOptionsText ) : ConfigurationOptionsText {
            configurationOptionsText = Default.getObject( configurationOptionsText, {} as ConfigurationOptionsText );
            configurationOptionsText.stText = Default.getAnyString( configurationOptionsText.stText, "st" );
            configurationOptionsText.ndText = Default.getAnyString( configurationOptionsText.ndText, "nd" );
            configurationOptionsText.rdText = Default.getAnyString( configurationOptionsText.rdText, "rd" );
            configurationOptionsText.thText = Default.getAnyString( configurationOptionsText.thText, "th" );
            configurationOptionsText.backButtonText = Default.getAnyString( configurationOptionsText.backButtonText, "Back" );
            configurationOptionsText.nextButtonText = Default.getAnyString( configurationOptionsText.nextButtonText, "Next" );
            configurationOptionsText.refreshButtonText = Default.getAnyString( configurationOptionsText.refreshButtonText, "Refresh" );
            configurationOptionsText.exportButtonText = Default.getAnyString( configurationOptionsText.exportButtonText, "Export" );
            configurationOptionsText.lessText = Default.getAnyString( configurationOptionsText.lessText, "Less" );
            configurationOptionsText.moreText = Default.getAnyString( configurationOptionsText.moreText, "More" );
            configurationOptionsText.dateText = Default.getAnyString( configurationOptionsText.dateText, "Date" );
            configurationOptionsText.countText = Default.getAnyString( configurationOptionsText.countText, "Count" );
            configurationOptionsText.mapText = Default.getAnyString( configurationOptionsText.mapText, "Map" );
            configurationOptionsText.chartText = Default.getAnyString( configurationOptionsText.chartText, "Chart" );
            configurationOptionsText.noChartDataMessage = Default.getAnyString( configurationOptionsText.noChartDataMessage, "There is currently no data to view." );
            configurationOptionsText.statisticsText = Default.getAnyString( configurationOptionsText.statisticsText, "Statistics" );
            configurationOptionsText.noColorRangesDataMessage = Default.getAnyString( configurationOptionsText.noColorRangesDataMessage, "There are currently no color ranges to view." );
            configurationOptionsText.unknownTrendText = Default.getAnyString( configurationOptionsText.unknownTrendText, "Unknown" );
            configurationOptionsText.importButtonText = Default.getAnyString( configurationOptionsText.importButtonText, "Import" );
            configurationOptionsText.noMapDataMessage = Default.getAnyString( configurationOptionsText.noMapDataMessage, "There is currently no data to view." );
            configurationOptionsText.objectErrorText = Default.getAnyString( configurationOptionsText.objectErrorText, "Errors in object: {{error_1}}, {{error_2}}" );
            configurationOptionsText.attributeNotValidErrorText = Default.getAnyString( configurationOptionsText.attributeNotValidErrorText, "The attribute '{{attribute_name}}' is not a valid object." );
            configurationOptionsText.attributeNotSetErrorText = Default.getAnyString( configurationOptionsText.attributeNotSetErrorText, "The attribute '{{attribute_name}}' has not been set correctly." );
            configurationOptionsText.closeButtonText = Default.getAnyString( configurationOptionsText.closeButtonText, "Close" );
            configurationOptionsText.configurationButtonText = Default.getAnyString( configurationOptionsText.configurationButtonText, "Configuration" );
            configurationOptionsText.configurationTitleText = Default.getAnyString( configurationOptionsText.configurationTitleText, "Configuration" );
            configurationOptionsText.visibleMonthsText = Default.getAnyString( configurationOptionsText.visibleMonthsText, "Visible Months" );
            configurationOptionsText.visibleDaysText = Default.getAnyString( configurationOptionsText.visibleDaysText, "Visible Days" );
            configurationOptionsText.dataText = Default.getAnyString( configurationOptionsText.dataText, "Data" );
            configurationOptionsText.colorRangesText = Default.getAnyString( configurationOptionsText.colorRangesText, "Color Ranges" );
            configurationOptionsText.yearText = Default.getAnyString( configurationOptionsText.yearText, "Year" );
            configurationOptionsText.daysText = Default.getAnyString( configurationOptionsText.daysText, "Days" );
            configurationOptionsText.noDaysDataMessage = Default.getAnyString( configurationOptionsText.noDaysDataMessage, "There are currently no days to view." );
            configurationOptionsText.currentYearText = Default.getAnyString( configurationOptionsText.currentYearText, "Current Year" );
            configurationOptionsText.todayText = Default.getAnyString( configurationOptionsText.todayText, "Today" );
            configurationOptionsText.thisWeekText = Default.getAnyString( configurationOptionsText.thisWeekText, "This Week" );
            configurationOptionsText.thisMonthText = Default.getAnyString( configurationOptionsText.thisMonthText, "This Month" );
            configurationOptionsText.thisYearText = Default.getAnyString( configurationOptionsText.thisYearText, "This Year" );
            configurationOptionsText.unavailableText = Default.getAnyString( configurationOptionsText.unavailableText, "Unavailable" );
            configurationOptionsText.monthsText = Default.getAnyString( configurationOptionsText.monthsText, "Months" );
            configurationOptionsText.noMonthsDataMessage = Default.getAnyString( configurationOptionsText.noMonthsDataMessage, "There are currently no months to view." );
            configurationOptionsText.selectTypeText = Default.getAnyString( configurationOptionsText.selectTypeText, "Select Type" );
            configurationOptionsText.filenamePlaceholderText = Default.getAnyString( configurationOptionsText.filenamePlaceholderText, "Filename (optional)" );
            configurationOptionsText.onlyDataBeingViewedText = Default.getAnyString( configurationOptionsText.onlyDataBeingViewedText, "Only data being viewed" );
            configurationOptionsText.zoomInText = Default.getAnyString( configurationOptionsText.zoomInText, "Zoom In" );
            configurationOptionsText.zoomOutText = Default.getAnyString( configurationOptionsText.zoomOutText, "Zoom Out" );
            configurationOptionsText.clearButtonText = Default.getAnyString( configurationOptionsText.clearButtonText, "Clear" );
            configurationOptionsText.selectFilesText = Default.getAnyString( configurationOptionsText.selectFilesText, "Select File(s)" );
            configurationOptionsText.dragAndDropFilesText = Default.getAnyString( configurationOptionsText.dragAndDropFilesText, "Drag and drop your file(s) here ..." );
            configurationOptionsText.addTypeText = Default.getAnyString( configurationOptionsText.addTypeText, "Add Type" );
            configurationOptionsText.typePlaceholderText = Default.getAnyString( configurationOptionsText.typePlaceholderText, "Type" );
            configurationOptionsText.addButtonText = Default.getAnyString( configurationOptionsText.addButtonText, "Add" );
            configurationOptionsText.removeButtonText = Default.getAnyString( configurationOptionsText.removeButtonText, "Remove" );
            configurationOptionsText.invertText = Default.getAnyString( configurationOptionsText.invertText, "Invert" );
            configurationOptionsText.lineText = Default.getAnyString( configurationOptionsText.lineText, "Line" );
            configurationOptionsText.noLineDataMessage = Default.getAnyString( configurationOptionsText.noLineDataMessage, "There is currently no data to view." );
            configurationOptionsText.removeTypeText = Default.getAnyString( configurationOptionsText.removeTypeText, "Remove Type" );
            configurationOptionsText.openNewTypeText = Default.getAnyString( configurationOptionsText.openNewTypeText, "Open new type" );
            configurationOptionsText.clearExistingDataText = Default.getAnyString( configurationOptionsText.clearExistingDataText, "Clear existing data" );
            configurationOptionsText.browseButtonText = Default.getAnyString( configurationOptionsText.browseButtonText, "Browse" );
            configurationOptionsText.saveButtonText = Default.getAnyString( configurationOptionsText.saveButtonText, "Save" );
            configurationOptionsText.resetButtonText = Default.getAnyString( configurationOptionsText.resetButtonText, "Reset" );
            configurationOptionsText.copyButtonText = Default.getAnyString( configurationOptionsText.copyButtonText, "Copy" );
            configurationOptionsText.yesButtonText = Default.getAnyString( configurationOptionsText.yesButtonText, "Yes" );
            configurationOptionsText.noButtonText = Default.getAnyString( configurationOptionsText.noButtonText, "No" );
            configurationOptionsText.confirmText = Default.getAnyString( configurationOptionsText.confirmText, "Confirm" );
            configurationOptionsText.clearDataConfirmText = Default.getAnyString( configurationOptionsText.clearDataConfirmText, "Are you sure you want to clear the data?" );
            configurationOptionsText.removeTypeConfirmText = Default.getAnyString( configurationOptionsText.removeTypeConfirmText, "Are you sure you want to remove this type?" );
            configurationOptionsText = getTextArrays( configurationOptionsText );

            return configurationOptionsText;
        }
    
        function getTextArrays( configurationOptionsText: ConfigurationOptionsText ) : ConfigurationOptionsText {
            if ( Is.invalidOptionArray( configurationOptionsText.monthNames!, 12 ) ) {
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
    
            if ( Is.invalidOptionArray( configurationOptionsText.dayNames!, 7 ) ) {
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