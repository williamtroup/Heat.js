/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        convert.ts
 * @version     v5.0.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2025
 */


import { Char, Value } from "./enum";


export namespace Convert {
    export function toRgbOpacityColor( color: string, opacity: number ) : string {
        const newColor: string = color.indexOf( ") " ) > Value.notFound ? `${color.split( ") " )[ 0 ]})` : color;

        let colorParts: string[] = newColor
            .replace( "rgba(", Char.empty )
            .replace( "rgb(", Char.empty )
            .replace( ")", Char.empty )
            .split(",");

        if ( newColor.startsWith( "rgba" ) ) {
            colorParts[ colorParts.length - 1 ] = opacity.toString();
        } else {
            colorParts.push( opacity.toString() );
        }

        return `rgba(${colorParts.join()})`;
    }

    export function hexToRgba( color: string ) : string {
        const newColor: string = color.trim().replace( Char.hash, Char.empty );
        let newAlpha: number = 1;

        const red: number = parseInt( newColor.substring( 0, 2 ), 16 );
        const green: number = parseInt( newColor.substring( 2, 4 ), 16 );
        const blue: number = parseInt( newColor.substring( 4, 6 ), 16 );

        if ( color.length === 8 ) {
            newAlpha = parseInt( newColor.substring( 6, 8 ), 16 );
        }

        return `rgba(${red}, ${green}, ${blue}, ${newAlpha})`;
    }
}