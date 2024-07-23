/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        str.ts
 * @version     v4.2.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2024
 */


import { Char } from "./enum";


export namespace Str {
    export function newGuid() : string {
        const result: string[] = [];

        for ( let charIndex: number = 0; charIndex < 32; charIndex++ ) {
            if ( charIndex === 8 || charIndex === 12 || charIndex === 16 || charIndex === 20 ) {
                result.push( Char.dash );
            }

            const character: string = Math.floor( Math.random() * 16 ).toString( 16 );
            result.push( character );
        }

        return result.join( Char.empty );
    }

    export function padNumber( number: number ) : string {
        const numberString: string = number.toString();

        return numberString.length === 1 ? Char.zero + numberString : numberString;
    }

    export function startsWithAnyCase( data: string, start: string ) : boolean {
        return data.substring( 0, start.length ).toLowerCase() === start.toLowerCase();
    }
}