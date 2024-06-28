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
     * Validation
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function isDefined( value: any ) {
        return value !== null && value !== undefined && value.toString() !== STRING.empty;
    }

    function isDefinedObject( object: any ) {
        return isDefined( object ) && typeof object === "object";
    }

    function isDefinedBoolean( object: any ) {
        return isDefined( object ) && typeof object === "boolean";
    }

    function isDefinedString( object: any ) {
        return isDefined( object ) && typeof object === "string";
    }

    function isDefinedFunction( object: any ) {
        return isDefined( object ) && typeof object === "function";
    }

    function isDefinedNumber( object: any ) {
        return isDefined( object ) && typeof object === "number";
    }

    function isDefinedArray( object: any ) {
        return isDefinedObject( object ) && object instanceof Array;
    }

    function isDefinedDate( object: any ) {
        return isDefinedObject( object ) && object instanceof Date;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Default Parameter/Option Handling
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function getDefaultAnyString( value: any, defaultValue: string ) {
        return typeof value === "string" ? value : defaultValue;
    }

    function getDefaultString( value: any, defaultValue: string ) {
        return isDefinedString( value ) ? value : defaultValue;
    }

    function getDefaultBoolean( value: any, defaultValue: boolean ) {
        return isDefinedBoolean( value ) ? value : defaultValue;
    }

    function getDefaultNumber( value: any, defaultValue: number ) {
        return isDefinedNumber( value ) ? value : defaultValue;
    }

    function getDefaultFunction( value: any, defaultValue: object ) {
        return isDefinedFunction( value ) ? value : defaultValue;
    }

    function getDefaultArray( value: any, defaultValue: object ) {
        return isDefinedArray( value ) ? value : defaultValue;
    }

    function getDefaultObject( value: any, defaultValue: object ) {
        return isDefinedObject( value ) ? value : defaultValue;
    }

    function getDefaultStringOrArray( value: any, defaultValue: object ) {
        let result: object = defaultValue;

        if ( isDefinedString( value ) ) {
            var values: string[] = value.toString().split( STRING.space );

            if ( values.length === 0 ) {
                value = defaultValue;
            } else {
                result = values;
            }

        } else {
            value = getDefaultArray( value, defaultValue );
        }

        return value;
    }

    function getObjectFromString( objectString: any ) {
        let parsed: boolean = true,
            result: object = null;

        try {
            if ( isDefinedString( objectString ) ) {
                result = jsonObject.parse( objectString );
            }

        } catch ( e1 ) {

            try {
                let evalResult: Function = result = eval( "(" + objectString + ")" );

                if ( isDefinedFunction( result ) ) {
                    result = evalResult();
                }
                
            } catch ( e2 ) {
                if ( !_configuration.safeMode ) {
                    console.error( _configuration.objectErrorText.replace( "{{error_1}}",  e1.message ).replace( "{{error_2}}",  e2.message ) );
                    parsed = false;
                }
                
                result = null;
            }
        }

        return {
            parsed: parsed,
            result: result
        };
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Initialize Heat.js
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    ( () => {


    } )();

} )( document, window, Math, JSON );