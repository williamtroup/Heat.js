/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        datetime.ts
 * @version     v5.0.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2025
 */


import { type ConfigurationOptions } from "../type";
import { Char } from "./enum";
import { Str } from "./str";


export namespace DateTime {
    export function getTotalDaysInMonth( year: number, month: number ) : number {
        return new Date( year, month + 1, 0 ).getDate();
    }

    export function getWeekdayNumber( date: Date ) : number {
        return date.getDay() - 1 < 0 ? 6 : date.getDay() - 1;
    }

    export function getDayOrdinal( configurationOptions: ConfigurationOptions, value: number ) : string {
        let result: string = configurationOptions.text!.thText!;

        if ( value === 31 || value === 21 || value === 1 ) {
            result = configurationOptions.text!.stText!;
        } else if ( value === 22 || value === 2 ) {
            result = configurationOptions.text!.ndText!;
        } else if ( value === 23 || value === 3 ) {
            result = configurationOptions.text!.rdText!;
        }

        return result;
    }

    export function getCustomFormattedDateText( configurationOptions: ConfigurationOptions, dateFormat: string, date: Date ) : string {
        let result: string = dateFormat;
        const weekDayNumber: number = getWeekdayNumber( date );

        result = result.replace( "{dddd}", configurationOptions.text!.dayNames![ weekDayNumber ] );
        result = result.replace( "{dd}", Str.padNumber( date.getDate() ) );
        result = result.replace( "{d}", date.getDate().toString() );

        result = result.replace( "{o}", getDayOrdinal( configurationOptions, date.getDate() ) );

        result = result.replace( "{mmmm}", configurationOptions.text!.monthNames![ date.getMonth() ] );
        result = result.replace( "{mm}", Str.padNumber( date.getMonth() + 1 ) );
        result = result.replace( "{m}", ( date.getMonth() + 1 ).toString() );

        result = result.replace( "{yyyy}", date.getFullYear().toString() );
        result = result.replace( "{yyy}", date.getFullYear().toString().substring( 1 ) );
        result = result.replace( "{yy}", date.getFullYear().toString().substring( 2 ) );
        result = result.replace( "{y}", parseInt( date.getFullYear().toString().substring( 2 ) ).toString() );

        return result;
    }

    export function toStorageDate( date: Date ) : string {
        return date.getFullYear() + Char.dash + Str.padNumber( date.getMonth() + 1 ) + Char.dash + Str.padNumber( date.getDate() );
    }

    export function getStorageDateYear( data: string ) : string {
        return data.split( Char.dash )[ 0 ];
    }

    export function getDateForMondayOfCurrentWeek() : Date {
        const today: Date = new Date();
        const dayOfWeek: number = today.getDay();
        const differenceToMonday: number = ( dayOfWeek === 0 ? -6 : 1 ) - dayOfWeek;

        const monday: Date = new Date( today );
        monday.setDate( today.getDate() + differenceToMonday );

        return monday;
    }

    export function isTodaysDate( date: Date ) : boolean {
        const today: Date = new Date();

        return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    }
}