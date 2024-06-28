import { type Configuration, type Holiday, type ColorRange, type BindingOptions } from "./types";
import { STRING, VALUE, VIEW, VIEW_NAME, EXPORT_TYPE } from "./enums";
import { type PublicApi } from "./api";

( ( documentObject, windowObject, mathObject, jsonObject ) => {

    // Variables: Configuration
    let _configuration: Configuration = {} as Configuration;

    // Variables: Elements
    let _elements_Day_Width: number = null;

    // Variables: Date Counts
    let _elements_DateCounts: object = {};

        // Variables: Internal Names
    const _internal_Name_Holiday: string = "HOLIDAY";

    // Variables: Local Storage
    const _local_Storage_Start_ID: string = "HJS_";

    // Variables: Defaults
    const _default_MonthsToShow: number[] = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
    const _default_DaysToShow: number[] = [ 1, 2, 3, 4, 5, 6, 7 ];

    // Variables: Attribute Names
    const _attribute_Name_Options: string = "data-heat-js";

    
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Initialize Heat.js
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    ( () => {


    } )();

} )( document, window, Math, JSON );