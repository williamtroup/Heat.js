/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        str.ts
 * @version     v5.0.0 - Beta 1
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2025
 */


import { Char } from "./enum";


export namespace Str {
    export function padNumber( value: number ) : string {
        const valueString: string = value.toString();

        return valueString.length === 1 ? Char.zero + valueString : valueString;
    }

    export function startsWithAnyCase( data: string, start: string ) : boolean {
        return data.substring( 0, start.length ).toLowerCase() === start.toLowerCase();
    }

    export function friendlyNumber( value: number ) : string {
        return value.toString().replace( /\B(?=(\d{3})+(?!\d))/g, Char.comma );
    }
}