/**
 * Heat.js
 * 
 * A highly customizable JavaScript library for generating interactive heatmaps. It transforms data into smooth, visually intuitive heat layers, making patterns and intensity easy to spot at a glance.
 * 
 * @file        constant.ts
 * @version     v5.0.0 - Beta 8
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2026
 */


export namespace Constant {
    export const LOCAL_STORAGE_START_ID: string = "HJS_";
    export const COLOR_RANGE_HOLIDAY_ID: string = "HOLIDAY";
    export const DEFAULT_MINIMUM_HEIGHT: number = 213;
    export const MAXIMUM_FILE_IMPORTS: number = 5;

    export namespace Attribute {
        export const HEAT_JS: string = "data-heat-js";

        export namespace View {
            export namespace Map {
                export const HEAT_JS_DATE: string = "data-heat-js-map-date";
                export const HEAT_JS_MINIMUM: string = "data-heat-js-map-minimum";
                export const HEAT_JS_MONTH_NUMBER: string = "data-heat-js-map-month-number";
            }

            export namespace Line {
                export const HEAT_JS_DATE: string = "data-heat-js-line-date";
                export const HEAT_JS_MINIMUM: string = "data-heat-js-line-minimum";
            }

            export namespace Chart {
                export const HEAT_JS_DATE: string = "data-heat-js-chart-date";
                export const HEAT_JS_MINIMUM: string = "data-heat-js-chart-minimum";
            }

            export namespace Days {
                export const HEAT_JS_NUMBER: string = "data-heat-js-day-number";
            }

            export namespace Month {
                export const HEAT_JS_NUMBER: string = "data-heat-js-month-number";
            }

            export namespace ColorRanges {
                export const HEAT_JS_COLOR_RANGE_NAME: string = "data-heat-js-color-range-name";
                export const HEAT_JS_MINIMUM: string = "data-heat-js-color-range-minimum";
            }
        }

        export namespace Area {
            export namespace ColorRangeToggle {
                export const HEAT_JS_MINIMUM: string = "data-heat-js-color-range-toggle-minimum";
            }
        }
    }
}