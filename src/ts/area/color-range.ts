/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        color-range.ts
 * @version     v5.0.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2025
 */


import { 
    type BindingOptionsDynamicColorRange,
    type BindingOptions,
    type BindingOptionsColorRange } from "../type";
    
import { Constant } from "../constant";
import { Default } from "../data/default";
import { Is } from "../data/is";
import { Convert } from "../data/convert";
import { Char } from "../data/enum";
import { DomElement } from "../dom/dom";
import { Css } from "../css";


export namespace ColorRange {
    export function isVisible( bindingOptions: BindingOptions, id: string ) : boolean {
        let result: boolean = false;
        
        if ( id === Constant.COLOR_RANGE_HOLIDAY_ID ) {
            result = true;

        } else {
            const colorRangesLength : number = bindingOptions.colorRanges!.length;

            for ( let colorRangesIndex: number = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++ ) {
                const colorRange: BindingOptionsColorRange = bindingOptions.colorRanges![ colorRangesIndex ];
    
                if ( colorRange.id === id && Default.getBoolean( colorRange.visible, true ) ) {
                    result = true;
                    break;
                }
            }
        }

        return result;
    }

    export function get( bindingOptions: BindingOptions, colorRanges: BindingOptionsColorRange[], dateCount: number, date: Date = null! ) : BindingOptionsColorRange {
        let useColorRange: BindingOptionsColorRange = null!;

        if ( Is.defined( date ) && Is.holiday( bindingOptions, date ).matched ) {
            useColorRange = {
                cssClassName: "holiday",
                id: Constant.COLOR_RANGE_HOLIDAY_ID,
                visible: true,
                minimum: 0,
            } as BindingOptionsColorRange;
        }

        if ( !Is.defined( useColorRange ) ) {
            const colorRangesLength: number = colorRanges.length;

            for ( let colorRangesIndex: number = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++ ) {
                const colorRange: BindingOptionsColorRange = colorRanges[ colorRangesIndex ];
    
                if ( dateCount >= colorRange.minimum! ) {
                    useColorRange = colorRange;
                } else {
                    break;
                }
            }
        }

        return useColorRange;
    }

    export function getByMinimum( colorRanges: BindingOptionsColorRange[], minimum: number ) : BindingOptionsColorRange {
        const colorRangesLength: number = colorRanges.length;
        let useColorRange: BindingOptionsColorRange = null!;

        for ( let colorRangesIndex: number = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++ ) {
            const colorRange: BindingOptionsColorRange = colorRanges[ colorRangesIndex ];

            if ( minimum.toString() === colorRange.minimum!.toString() ) {
                useColorRange = colorRange;
                break;
            }
        }

        return useColorRange;
    }

    export function getAllSorted( bindingOptions: BindingOptions ) : BindingOptionsColorRange[] {
        return bindingOptions.colorRanges!.sort( ( colorRangeA: BindingOptionsColorRange, colorRangeB: BindingOptionsColorRange ) => {
            return colorRangeA.minimum! - colorRangeB.minimum!;
        } );
    }

    export function buildDynamics( dynamicColorRange: BindingOptionsDynamicColorRange ) : BindingOptionsColorRange[] {
        let result: BindingOptionsColorRange[] = [];

        const rgbaValues: number[] = Convert.hexToRgbaValues( dynamicColorRange!.color! );
        const incrementPercentage: number = 100 / dynamicColorRange!.totalColors!;
        const incrementAlpha: number = 1.0 / dynamicColorRange!.totalColors!;
        const incrementMinimum: number = Math.floor( dynamicColorRange!.maximumMinimum! / dynamicColorRange!.totalColors! );
        const cssLines: string[] = [];

        let red: number = rgbaValues[ 0 ];
        let green: number = rgbaValues[ 1 ];
        let blue: number = rgbaValues[ 2 ];
        let alpha: number = incrementAlpha;
        let colorRed: number = rgbaValues[ 0 ];
        let colorGreen: number = rgbaValues[ 1 ];
        let colorBlue: number = rgbaValues[ 2 ];
        let currentMinimum: number = 0;

        for ( let colorIndex: number = 0; colorIndex < dynamicColorRange!.totalColors!; colorIndex++ ){
            const borderAlpha: number = alpha + incrementAlpha > 1.0 ? 1.0 : alpha + incrementAlpha;
            const rgba: string = `rgba(${red}, ${green}, ${blue}, ${alpha.toFixed( 2 )})`;
            const rgbaBorder: string = `rgba(${red}, ${green}, ${blue}, ${borderAlpha.toFixed( 2 )})`;
            const colorRgb: string = `rgb(${colorRed}, ${colorGreen}, ${colorBlue})`;
            const cssName: string = `day-color-${crypto.randomUUID().replace( /-/g, Char.empty )}`;
            
            cssLines.push( `div.${cssName}${Char.space}{` );
            cssLines.push( `${Char.tab}background-color:${Char.space}${rgba} !important;` );
            cssLines.push( `${Char.tab}border-color:${Char.space}${rgbaBorder} !important;` );
            cssLines.push( `${Char.tab}color:${Char.space}${colorRgb} !important;` );
            cssLines.push( "}" );
            cssLines.push( `div.${cssName}:hover${Char.space}{` );
            cssLines.push( `${Char.tab}opacity:${Char.space}0.7 !important;` );
            cssLines.push( "}" );

            const colorRange: BindingOptionsColorRange = {
                id: cssName,
                name: `Day Color ${colorIndex + 1}`,
                minimum: currentMinimum,
                cssClassName: cssName,
                tooltipText: `Day Color ${colorIndex + 1}`,
                visible: true,
            } as BindingOptionsColorRange;

            const redPercentage = Math.round( rgbaValues[ 0 ] / 100 * ( ( colorIndex + 1 ) * incrementPercentage ) );
            const greenPercentage = Math.round( rgbaValues[ 1 ] / 100 * ( ( colorIndex + 1 ) * incrementPercentage ) );
            const bluePercentage = Math.round( rgbaValues[ 2 ] / 100 * ( ( colorIndex + 1 ) * incrementPercentage ) );

            if ( colorIndex === dynamicColorRange!.totalColors! - 1 ) {
                cssLines.push( `:root${Char.space}{` );
                cssLines.push( `${Char.tab}${Css.Variables.CheckBoxCheckedColor}:${Char.space}${rgba};` );
                cssLines.push( `${Char.tab}${Css.Variables.YearMenuCurrent}:${Char.space}${rgba};` );
                cssLines.push( "}" );

            } else {
                red = rgbaValues[ 0 ] + redPercentage;
                green = rgbaValues[ 1 ] + greenPercentage;
                blue = rgbaValues[ 2 ] + bluePercentage;
                alpha += incrementAlpha;
                colorRed = rgbaValues[ 0 ] - redPercentage;
                colorGreen = rgbaValues[ 1 ] - greenPercentage;
                colorBlue = rgbaValues[ 2 ] - bluePercentage;
                currentMinimum += incrementMinimum;
            }

            result.push( colorRange );
        }

        const head: HTMLElement = document.getElementsByTagName( "head" )[ 0 ];
        const style: HTMLStyleElement = DomElement.create( head, "style" ) as HTMLStyleElement;
        
        style.appendChild( document.createTextNode( cssLines.join( Char.newLine ) ) );

        return result;
    }
}