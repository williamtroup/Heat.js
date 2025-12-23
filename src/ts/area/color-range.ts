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
        const incrementColor: number = Math.floor( dynamicColorRange!.maximumRgbRange! / dynamicColorRange!.totalColors! );
        const incrementMinimum: number = Math.floor( dynamicColorRange!.maximumMinimum! / dynamicColorRange!.totalColors! );
        const cssLines: string[] = [];

        let red: number = rgbaValues[ 0 ] % dynamicColorRange!.maximumRgbRange!;
        let green: number = rgbaValues[ 1 ] % dynamicColorRange!.maximumRgbRange!;
        let blue: number = rgbaValues[ 2 ] % dynamicColorRange!.maximumRgbRange!;
        let currentValue: number = 0;

        for ( let colorIndex: number = 0; colorIndex < dynamicColorRange!.totalColors!; colorIndex++ ){
            red += incrementColor;
            green += incrementColor;
            blue += incrementColor;
            currentValue += incrementMinimum;

            const rgba: string = `rgb(${red}, ${green}, ${blue})`;
            const cssName: string = `day-color-${crypto.randomUUID().replace( /-/g, Char.empty )}`;
            
            cssLines.push( `div.${cssName}${Char.space}{` );
            cssLines.push( `background-color:${Char.space}${rgba} !important;` );
            cssLines.push( `border-color:${Char.space}${rgba} !important;` );
            cssLines.push( `color:${Char.space}${rgba} !important;` );
            cssLines.push( "}" );

            const colorRange: BindingOptionsColorRange = {
                id: cssName,
                name: `Day Color ${colorIndex + 1}`,
                minimum: currentValue,
                cssClassName: cssName,
                tooltipText: `Day Color ${colorIndex + 1}`,
                visible: true,
            } as BindingOptionsColorRange;

            result.push( colorRange );
        }

        const head: HTMLElement = document.getElementsByTagName( "head" )[ 0 ];
        const style: HTMLStyleElement = DomElement.create( head, "style" ) as HTMLStyleElement;
        style.appendChild( document.createTextNode( cssLines.join( Char.newLine ) ) );

        return result;
    }
}