/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        datetime.ts
 * @version     v4.0.6
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2024
 */


import { type Configuration } from "./type";
import { Data } from "./data";
import { Char } from "./enum";


export namespace DateTime {
    export function getTotalDaysInMonth( year: number, month: number ) : number {
        return new Date( year, month + 1, 0 ).getDate();
    }

    export function getWeekdayNumber( date: Date ) : number {
        return date.getDay() - 1 < 0 ? 6 : date.getDay() - 1;
    }

    export function getDayOrdinal( configuration: Configuration, value: number ) : string {
        let result: string = configuration.thText!;

        if ( value === 31 || value === 21 || value === 1 ) {
            result = configuration.stText!;
        } else if ( value === 22 || value === 2 ) {
            result = configuration.ndText!;
        } else if ( value === 23 || value === 3 ) {
            result = configuration.rdText!;
        }

        return result;
    }

    export function getCustomFormattedDateText( configuration: Configuration, dateFormat: string, date: Date ) : string {
        let result: string = dateFormat;
        const weekDayNumber: number = getWeekdayNumber( date );

        result = result.replace( "{dddd}", configuration.dayNames![ weekDayNumber ] );
        result = result.replace( "{dd}", Data.String.padNumber( date.getDate() ) );
        result = result.replace( "{d}", date.getDate().toString() );

        result = result.replace( "{o}", getDayOrdinal( configuration, date.getDate() ) );

        result = result.replace( "{mmmm}", configuration.monthNames![ date.getMonth() ] );
        result = result.replace( "{mm}", Data.String.padNumber( date.getMonth() + 1 ) );
        result = result.replace( "{m}", ( date.getMonth() + 1 ).toString() );

        result = result.replace( "{yyyy}", date.getFullYear().toString() );
        result = result.replace( "{yyy}", date.getFullYear().toString().substring( 1 ) );
        result = result.replace( "{yy}", date.getFullYear().toString().substring( 2 ) );
        result = result.replace( "{y}", parseInt( date.getFullYear().toString().substring( 2 ) ).toString() );

        return result;
    }

    export function toStorageDate( date: Date ) : string {
        return date.getFullYear() + Char.dash + Data.String.padNumber( date.getMonth() + 1 ) + Char.dash + Data.String.padNumber( date.getDate() );
    }

    export function getStorageDate( data: string ) : string[] {
        return data.split( Char.dash );
    }

    export function getStorageDateYear( data: string ) : string {
        return data.split( Char.dash )[ 0 ];
    }
}