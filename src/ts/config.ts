/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        config.ts
 * @version     v4.1.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2024
 */


import { type Configuration, type ConfigurationText } from "./type";
import { Data } from "./data";
import { Is } from "./is";


export namespace Config {
    export namespace Options {
        export function get( newConfiguration: Configuration = null! ) : Configuration {
            let configuration = Data.getDefaultObject( newConfiguration, {} as Configuration );
            configuration.safeMode = Data.getDefaultBoolean( configuration.safeMode, true );
            configuration.domElementTypes = Data.getDefaultStringOrArray( configuration.domElementTypes, [ "*" ] );
    
            configuration = buildDefaultConfigurationStrings( configuration );
            configuration = buildDefaultConfigurationArrays( configuration );

            return configuration;
        }
    
        function buildDefaultConfigurationStrings( configuration: Configuration ) : Configuration {
            configuration.text = Data.getDefaultObject( configuration.text, {} as ConfigurationText );
            configuration.text!.stText = Data.getDefaultAnyString( configuration.text!.stText, "st" );
            configuration.text!.ndText = Data.getDefaultAnyString( configuration.text!.ndText, "nd" );
            configuration.text!.rdText = Data.getDefaultAnyString( configuration.text!.rdText, "rd" );
            configuration.text!.thText = Data.getDefaultAnyString( configuration.text!.thText, "th" );
            configuration.text!.backButtonText = Data.getDefaultAnyString( configuration.text!.backButtonText, "Back" );
            configuration.text!.nextButtonText = Data.getDefaultAnyString( configuration.text!.nextButtonText, "Next" );
            configuration.text!.refreshButtonText = Data.getDefaultAnyString( configuration.text!.refreshButtonText, "Refresh" );
            configuration.text!.exportButtonText = Data.getDefaultAnyString( configuration.text!.exportButtonText, "Export" );
            configuration.text!.lessText = Data.getDefaultAnyString( configuration.text!.lessText, "Less" );
            configuration.text!.moreText = Data.getDefaultAnyString( configuration.text!.moreText, "More" );
            configuration.text!.dateText = Data.getDefaultAnyString( configuration.text!.dateText, "Date" );
            configuration.text!.countText = Data.getDefaultAnyString( configuration.text!.countText, "Count" );
            configuration.text!.mapText = Data.getDefaultAnyString( configuration.text!.mapText, "Map" );
            configuration.text!.chartText = Data.getDefaultAnyString( configuration.text!.chartText, "Chart" );
            configuration.text!.noChartDataMessage = Data.getDefaultAnyString( configuration.text!.noChartDataMessage, "There is currently no data to view." );
            configuration.text!.statisticsText = Data.getDefaultAnyString( configuration.text!.statisticsText, "Statistics" );
            configuration.text!.noStatisticsDataMessage = Data.getDefaultAnyString( configuration.text!.noStatisticsDataMessage, "There are currently no statistics to view." );
            configuration.text!.unknownTrendText = Data.getDefaultAnyString( configuration.text!.unknownTrendText, "Unknown" );
            configuration.text!.importButtonText = Data.getDefaultAnyString( configuration.text!.importButtonText, "Import" );
            configuration.text!.noMapDataMessage = Data.getDefaultAnyString( configuration.text!.noMapDataMessage, "There is currently no data to view." );
            configuration.text!.objectErrorText = Data.getDefaultAnyString( configuration.text!.objectErrorText, "Errors in object: {{error_1}}, {{error_2}}" );
            configuration.text!.attributeNotValidErrorText = Data.getDefaultAnyString( configuration.text!.attributeNotValidErrorText, "The attribute '{{attribute_name}}' is not a valid object." );
            configuration.text!.attributeNotSetErrorText = Data.getDefaultAnyString( configuration.text!.attributeNotSetErrorText, "The attribute '{{attribute_name}}' has not been set correctly." );
            configuration.text!.closeToolTipText = Data.getDefaultAnyString( configuration.text!.closeToolTipText, "Close" );
            configuration.text!.configurationToolTipText = Data.getDefaultAnyString( configuration.text!.configurationToolTipText, "Configuration" );
            configuration.text!.configurationTitleText = Data.getDefaultAnyString( configuration.text!.configurationTitleText, "Configuration" );
            configuration.text!.visibleMonthsText = Data.getDefaultAnyString( configuration.text!.visibleMonthsText, "Visible Months" );
            configuration.text!.visibleDaysText = Data.getDefaultAnyString( configuration.text!.visibleDaysText, "Visible Days" );
            configuration.text!.dataText = Data.getDefaultAnyString( configuration.text!.dataText, "Data" );
            configuration.text!.colorRangesText = Data.getDefaultAnyString( configuration.text!.colorRangesText, "Color Ranges" );
            configuration.text!.yearText = Data.getDefaultAnyString( configuration.text!.yearText, "Year" );
            configuration.text!.daysText = Data.getDefaultAnyString( configuration.text!.daysText, "Days" );
            configuration.text!.noDaysDataMessage = Data.getDefaultAnyString( configuration.text!.noDaysDataMessage, "There are currently no days to view." );
            configuration.text!.backButtonSymbolText = Data.getDefaultAnyString( configuration.text!.backButtonSymbolText, "←" );
            configuration.text!.nextButtonSymbolText = Data.getDefaultAnyString( configuration.text!.nextButtonSymbolText, "→" );
            configuration.text!.refreshButtonSymbolText = Data.getDefaultAnyString( configuration.text!.refreshButtonSymbolText, "↻" );
            configuration.text!.exportButtonSymbolText = Data.getDefaultAnyString( configuration.text!.exportButtonSymbolText, "↓" );
            configuration.text!.importButtonSymbolText = Data.getDefaultAnyString( configuration.text!.importButtonSymbolText, "↑" );

            return configuration;
        }
    
        function buildDefaultConfigurationArrays( configuration: Configuration ) : Configuration {
            if ( Is.invalidOptionArray( configuration.text!.monthNames, 12 ) ) {
                configuration.text!.monthNames = [
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
    
            if ( Is.invalidOptionArray( configuration.text!.dayNames, 7 ) ) {
                configuration.text!.dayNames = [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ];
            }

            return configuration;
        }
    }
}