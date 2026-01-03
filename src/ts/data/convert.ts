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


import {
    type RgbaColor,
    type LargestValueForView,
    type LargestValueForViewValue } from "../type";
    
import { Char, Value } from "./enum";


export namespace Convert {
    export function toRgbOpacityColor( color: string, opacity: number ) : string {
        const newColor: string = color.indexOf( ") " ) > Value.notFound ? `${color.split( ") " )[ 0 ]})` : color;

        const colorParts: string[] = newColor
            .replace( "rgba(", Char.empty )
            .replace( "rgb(", Char.empty )
            .replace( ")", Char.empty )
            .split( "," );

        if ( newColor.startsWith( "rgba" ) ) {
            colorParts[ colorParts.length - 1 ] = opacity.toString();
        } else {
            colorParts.push( opacity.toString() );
        }

        return `rgba(${colorParts.join()})`;
    }

    export function hexToRgba( color: string ) : string {
        const rgbaColor: RgbaColor = hexToRgbaValues( color );

        return `rgba(${rgbaColor.red}, ${rgbaColor.green}, ${rgbaColor.blue}, ${rgbaColor.alpha})`;
    }

    export function hexToRgbaValues( color: string ) : RgbaColor {
        const newColor: string = color.trim().replace( Char.hash, Char.empty );
        const red: number = parseInt( newColor.substring( 0, 2 ), 16 );
        const green: number = parseInt( newColor.substring( 2, 4 ), 16 );
        const blue: number = parseInt( newColor.substring( 4, 6 ), 16 );
        let alpha: number = 1;

        if ( color.length === 8 ) {
            alpha = parseInt( newColor.substring( 6, 8 ), 16 );
        }

        return {
            red: red,
            green: green,
            blue: blue,
            alpha: alpha,
        } as RgbaColor;
    }

    export function valuesToOpacitiesOrder( viewValues: LargestValueForView ) : void {
        const orderedValues: LargestValueForViewValue[] = Object
            .values( viewValues.values )
            .sort( ( valueA: LargestValueForViewValue, valueB: LargestValueForViewValue ) => valueA.total - valueB.total );

        const orderedValuesLength: number = orderedValues.length;
        const increment: number = 1 / orderedValuesLength;

        for ( let valueIndex: number = 0; valueIndex < orderedValuesLength; valueIndex++ ) {
            viewValues.valueOpacities[ orderedValues[ valueIndex ].total ] = parseFloat( ( increment * ( valueIndex + 1 ) ).toFixed( 2 ) );
        }
    }
}