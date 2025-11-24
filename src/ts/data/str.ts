/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        str.ts
 * @version     v4.4.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2025
 */


import { Char } from "./enum";


export namespace Str {
    export function padNumber( number: number ) : string {
        const numberString: string = number.toString();

        return numberString.length === 1 ? Char.zero + numberString : numberString;
    }

    export function startsWithAnyCase( data: string, start: string ) : boolean {
        return data.substring( 0, start.length ).toLowerCase() === start.toLowerCase();
    }
}