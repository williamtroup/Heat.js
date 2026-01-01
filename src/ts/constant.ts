/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        constant.ts
 * @version     v5.0.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2025
 */


export namespace Constant {
    export namespace Attribute {
        export const HEAT_JS: string = "data-heat-js";
        export const HEAT_JS_MAP_DATE: string = "data-heat-js-map-date";
        export const HEAT_JS_MAP_MINIMUM: string = "data-heat-js-map-minimum";
        export const HEAT_JS_MAP_MONTH_NUMBER: string = "data-heat-js-map-month-number";
        export const HEAT_JS_CHART_DATE: string = "data-heat-js-chart-date";
        export const HEAT_JS_CHART_MINIMUM: string = "data-heat-js-chart-minimum";
        export const HEAT_JS_LINE_DATE: string = "data-heat-js-line-date";
        export const HEAT_JS_LINE_MINIMUM: string = "data-heat-js-line-minimum";
        export const HEAT_JS_DAY_NUMBER: string = "data-heat-js-day-number";
        export const HEAT_JS_MONTH_NUMBER: string = "data-heat-js-month-number";
        export const HEAT_JS_STATISTICS_COLOR_RANGE_NAME: string = "data-heat-js-statistics-color-range-name";
        export const HEAT_JS_STATISTICS_MINIMUM: string = "data-heat-js-statistics-minimum";
        export const HEAT_JS_COLOR_RANGE_MINIMUM: string = "data-heat-js-color-range-minimum";
    }

    export const LOCAL_STORAGE_START_ID: string = "HJS_";
    export const COLOR_RANGE_HOLIDAY_ID: string = "HOLIDAY";
    export const DEFAULT_MINIMUM_HEIGHT: number = 213;
    export const MAXIMUM_FILE_IMPORTS: number = 5;
}