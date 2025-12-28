/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        is.ts
 * @version     v5.0.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2025
 */


import { 
    type BindingOptions,
    type BindingOptionsHoliday,
    type IsHoliday } from "../type";
    
import { Char, Value } from "./enum";


export namespace Is {
    export function defined( value: unknown ) : boolean {
        return value !== null && value !== undefined && value.toString() !== Char.empty;
    }

    export function definedObject( object: unknown ) : boolean {
        return defined( object ) && typeof object === "object";
    }

    export function definedBoolean( object: unknown ) : boolean {
        return defined( object ) && typeof object === "boolean";
    }

    export function definedString( object: unknown ) : boolean {
        return defined( object ) && typeof object === "string";
    }

    export function definedFunction( object: unknown ) : boolean {
        return defined( object ) && typeof object === "function";
    }

    export function definedNumber( object: unknown ) : boolean {
        return defined( object ) && typeof object === "number";
    }

    export function definedArray( object: unknown ) : boolean {
        return definedObject( object ) && object instanceof Array;
    }

    export function definedDate( object: unknown ) : boolean {
        return definedObject( object ) && object instanceof Date;
    }

    export function invalidOptionArray( array: Array<unknown>, minimumLength: number = 1 ) : boolean {
        return !definedArray( array ) || array.length < minimumLength;
    }

    export function definedParentElement( value: HTMLElement ) : boolean {
        return defined( value ) && document.contains( value );
    }

    export function holiday( bindingOptions: BindingOptions, date: Date ) : IsHoliday {
        const result: IsHoliday = {
            matched: false,
            name: null!
        } as IsHoliday;

        const holidaysLength: number = bindingOptions.holidays!.length;
        const day: number = date.getDate();
        const month: number = date.getMonth() + 1;
        const year: number = date.getFullYear();
        
        for ( let holidayIndex: number = 0; holidayIndex < holidaysLength; holidayIndex++ ) {
            const holiday: BindingOptionsHoliday = bindingOptions.holidays![ holidayIndex ];

            if ( Is.definedString( holiday.date ) && holiday.showInViews ) {
                const dateParts: string[] = holiday.date!.split( "/" );

                if ( dateParts.length === 2 ) {
                    result.matched = day === parseInt( dateParts[ 0 ] ) && month === parseInt( dateParts[ 1 ] );
                } else if ( dateParts.length === 3 ) {
                    result.matched = day === parseInt( dateParts[ 0 ] ) && month === parseInt( dateParts[ 1 ] ) && year === parseInt( dateParts[ 2 ] );
                }

                if ( result.matched ) {
                    result.name = holiday.name!;
                    break;
                }
            }
        }

        return result;
    }

    export function monthVisible( monthsToShow: number[], month: number ) : boolean {
        return monthsToShow.indexOf( month + 1 ) > Value.notFound;
    }

    export function dayVisible( daysToShow: number[], day: number ) : boolean {
        return daysToShow.indexOf( day ) > Value.notFound;
    }

    export function yearVisible( bindingOptions: BindingOptions, year: number ) : boolean {
        return bindingOptions.yearsToHide!.indexOf( year ) === Value.notFound && ( bindingOptions._currentView!.yearsAvailable.length === 0 || bindingOptions._currentView!.yearsAvailable.indexOf( year ) > Value.notFound );
    }

    export function firstVisibleYear( bindingOptions: BindingOptions, year: number ) : boolean {
        return bindingOptions._currentView!.yearsAvailable.length > 0 && year <= bindingOptions._currentView!.yearsAvailable[ 0 ];
    }

    export function lastVisibleYear( bindingOptions: BindingOptions, year: number ) : boolean {
        return bindingOptions._currentView!.yearsAvailable.length > 0 && year >= bindingOptions._currentView!.yearsAvailable[ bindingOptions._currentView!.yearsAvailable.length - 1 ];
    }

    export function rgbColor( color: string ) : boolean {
        return color.startsWith( "rgba" ) || color.startsWith( "rgb" );
    }

    export function hexColor( color: string ) : boolean {
        return color.startsWith( "#" ) && ( color.length === 7 || color.length === 9 );
    }
}