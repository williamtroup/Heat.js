/**
 * Heat.js
 * 
 * A highly customizable JavaScript library for generating interactive heatmaps. It transforms data into smooth, visually intuitive heat layers, making patterns and intensity easy to spot at a glance.
 * 
 * @file        str.ts
 * @version     v5.0.0 - Beta 9
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2026
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