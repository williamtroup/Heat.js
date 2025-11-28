/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        config.ts
 * @version     v4.5.1
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2025
 */


import { type Configuration, type ConfigurationText } from "../type";
import { Default } from "../data/default";
import { Is } from "../data/is";


export namespace Config {
    export namespace Options {
        export function get( newConfiguration: Configuration = null! ) : Configuration {
            const configuration = Default.getObject( newConfiguration, {} as Configuration );
            configuration.safeMode = Default.getBoolean( configuration.safeMode, true );
            configuration.observationMode = Default.getBoolean( configuration.observationMode, true );
            configuration.domElementTypes = Default.getStringOrArray( configuration.domElementTypes, [ "*" ] );
    
            configuration.text = getText( configuration );
            configuration.text = getTextArrays( configuration.text );

            return configuration;
        }
    
        function getText( configuration: Configuration ) : ConfigurationText {
            configuration.text = Default.getObject( configuration.text, {} as ConfigurationText );
            configuration.text!.stText = Default.getAnyString( configuration.text!.stText, "st" );
            configuration.text!.ndText = Default.getAnyString( configuration.text!.ndText, "nd" );
            configuration.text!.rdText = Default.getAnyString( configuration.text!.rdText, "rd" );
            configuration.text!.thText = Default.getAnyString( configuration.text!.thText, "th" );
            configuration.text!.backButtonText = Default.getAnyString( configuration.text!.backButtonText, "Back" );
            configuration.text!.nextButtonText = Default.getAnyString( configuration.text!.nextButtonText, "Next" );
            configuration.text!.refreshButtonText = Default.getAnyString( configuration.text!.refreshButtonText, "Refresh" );
            configuration.text!.exportButtonText = Default.getAnyString( configuration.text!.exportButtonText, "Export" );
            configuration.text!.lessText = Default.getAnyString( configuration.text!.lessText, "Less" );
            configuration.text!.moreText = Default.getAnyString( configuration.text!.moreText, "More" );
            configuration.text!.dateText = Default.getAnyString( configuration.text!.dateText, "Date" );
            configuration.text!.countText = Default.getAnyString( configuration.text!.countText, "Count" );
            configuration.text!.mapText = Default.getAnyString( configuration.text!.mapText, "Map" );
            configuration.text!.chartText = Default.getAnyString( configuration.text!.chartText, "Chart" );
            configuration.text!.noChartDataMessage = Default.getAnyString( configuration.text!.noChartDataMessage, "There is currently no data to view." );
            configuration.text!.statisticsText = Default.getAnyString( configuration.text!.statisticsText, "Statistics" );
            configuration.text!.noStatisticsDataMessage = Default.getAnyString( configuration.text!.noStatisticsDataMessage, "There are currently no statistics to view." );
            configuration.text!.unknownTrendText = Default.getAnyString( configuration.text!.unknownTrendText, "Unknown" );
            configuration.text!.importButtonText = Default.getAnyString( configuration.text!.importButtonText, "Import" );
            configuration.text!.noMapDataMessage = Default.getAnyString( configuration.text!.noMapDataMessage, "There is currently no data to view." );
            configuration.text!.objectErrorText = Default.getAnyString( configuration.text!.objectErrorText, "Errors in object: {{error_1}}, {{error_2}}" );
            configuration.text!.attributeNotValidErrorText = Default.getAnyString( configuration.text!.attributeNotValidErrorText, "The attribute '{{attribute_name}}' is not a valid object." );
            configuration.text!.attributeNotSetErrorText = Default.getAnyString( configuration.text!.attributeNotSetErrorText, "The attribute '{{attribute_name}}' has not been set correctly." );
            configuration.text!.closeToolTipText = Default.getAnyString( configuration.text!.closeToolTipText, "Close" );
            configuration.text!.configurationToolTipText = Default.getAnyString( configuration.text!.configurationToolTipText, "Configuration" );
            configuration.text!.configurationTitleText = Default.getAnyString( configuration.text!.configurationTitleText, "Configuration" );
            configuration.text!.visibleMonthsText = Default.getAnyString( configuration.text!.visibleMonthsText, "Visible Months" );
            configuration.text!.visibleDaysText = Default.getAnyString( configuration.text!.visibleDaysText, "Visible Days" );
            configuration.text!.dataText = Default.getAnyString( configuration.text!.dataText, "Data" );
            configuration.text!.colorRangesText = Default.getAnyString( configuration.text!.colorRangesText, "Color Ranges" );
            configuration.text!.yearText = Default.getAnyString( configuration.text!.yearText, "Year" );
            configuration.text!.daysText = Default.getAnyString( configuration.text!.daysText, "Days" );
            configuration.text!.noDaysDataMessage = Default.getAnyString( configuration.text!.noDaysDataMessage, "There are currently no days to view." );
            configuration.text!.backButtonSymbolText = Default.getAnyString( configuration.text!.backButtonSymbolText, "←" );
            configuration.text!.nextButtonSymbolText = Default.getAnyString( configuration.text!.nextButtonSymbolText, "→" );
            configuration.text!.refreshButtonSymbolText = Default.getAnyString( configuration.text!.refreshButtonSymbolText, "↻" );
            configuration.text!.exportButtonSymbolText = Default.getAnyString( configuration.text!.exportButtonSymbolText, "↓" );
            configuration.text!.importButtonSymbolText = Default.getAnyString( configuration.text!.importButtonSymbolText, "↑" );
            configuration.text!.currentYearText = Default.getAnyString( configuration.text!.currentYearText, "Current Year" );
            configuration.text!.currentYearSymbolText = Default.getAnyString( configuration.text!.currentYearSymbolText, "⏎" );

            return configuration.text!;
        }
    
        function getTextArrays( configurationText: ConfigurationText ) : ConfigurationText {
            if ( Is.invalidOptionArray( configurationText.monthNames, 12 ) ) {
                configurationText.monthNames = [
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
    
            if ( Is.invalidOptionArray( configurationText.dayNames, 7 ) ) {
                configurationText.dayNames = [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ];
            }

            return configurationText;
        }
    }
}