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
    type BindingOptionsColorRange, 
    type RgbaColor } from "../type";
    
import { Constant } from "../constant";
import { Default } from "../data/default";
import { Is } from "../data/is";
import { Convert } from "../data/convert";
import { Char, ViewId } from "../data/enum";
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
        const result: BindingOptionsColorRange[] = [];
        const rgbaColor: RgbaColor = Convert.hexToRgbaValues( dynamicColorRange!.color! );
        const incrementPercentage: number = 100 / dynamicColorRange!.totalColors!;
        const incrementAlpha: number = 1.0 / dynamicColorRange!.totalColors!;
        const incrementMinimum: number = ( dynamicColorRange!.maximumMinimum! - dynamicColorRange!.startMinimum! ) / ( dynamicColorRange!.totalColors! - 1 );
        const cssLines: string[] = [];

        let red: number = rgbaColor.red;
        let green: number = rgbaColor.green;
        let blue: number = rgbaColor.blue;
        let alpha: number = incrementAlpha;
        let colorRed: number = rgbaColor.red;
        let colorGreen: number = rgbaColor.green;
        let colorBlue: number = rgbaColor.blue;
        let currentMinimum: number = dynamicColorRange!.startMinimum!;

        for ( let colorIndex: number = 0; colorIndex < dynamicColorRange!.totalColors!; colorIndex++ ){
            const actualColorIndex: number = colorIndex + 1;
            const borderAlpha: number = alpha + incrementAlpha > 1.0 ? 1.0 : alpha + incrementAlpha;
            const rgba: string = `rgba(${red}, ${green}, ${blue}, ${alpha.toFixed( 2 )})`;
            const rgbaBorder: string = `rgba(${red}, ${green}, ${blue}, ${borderAlpha.toFixed( 2 )})`;
            const colorRgb: string = `rgb(${colorRed}, ${colorGreen}, ${colorBlue})`;
            const cssName: string = `day-color-${crypto.randomUUID().replace( /-/g, Char.empty )}`;
            
            cssLines.push( `div.${cssName} {` );
            cssLines.push( `${Char.tab}background-color: ${rgba} !important;` );
            cssLines.push( `${Char.tab}border-color: ${rgbaBorder} !important;` );
            cssLines.push( `${Char.tab}color: ${colorRgb} !important;` );
            cssLines.push( "}" );
            cssLines.push( `div.${cssName}:not(.no-hover):hover {` );
            cssLines.push( `${Char.tab}opacity: 0.7 !important;` );
            cssLines.push( "}" );

            const colorRange: BindingOptionsColorRange = {
                id: cssName,
                name: `Day Color ${actualColorIndex}`,
                minimum: Math.round( currentMinimum ),
                cssClassName: cssName,
                tooltipText: `Day Color ${actualColorIndex}`,
                visible: true,
            } as BindingOptionsColorRange;

            const redPercentage = Math.round( rgbaColor.red / 100 * ( actualColorIndex * incrementPercentage ) );
            const greenPercentage = Math.round( rgbaColor.green / 100 * ( actualColorIndex * incrementPercentage ) );
            const bluePercentage = Math.round( rgbaColor.blue / 100 * ( actualColorIndex * incrementPercentage ) );

            if ( colorIndex === dynamicColorRange!.totalColors! - 1 ) {
                cssLines.push( `:root {` );
                cssLines.push( `${Char.tab}${Css.Variables.CheckBoxCheckedColor}: ${rgba};` );
                cssLines.push( `${Char.tab}${Css.Variables.YearMenuCurrent}: ${rgba};` );
                cssLines.push( "}" );

            } else {
                red = rgbaColor.red + redPercentage;
                green = rgbaColor.green + greenPercentage;
                blue = rgbaColor.blue + bluePercentage;
                alpha += incrementAlpha;
                colorRed = rgbaColor.red - redPercentage;
                colorGreen = rgbaColor.green - greenPercentage;
                colorBlue = rgbaColor.blue - bluePercentage;
                currentMinimum += incrementMinimum;

                if ( currentMinimum > dynamicColorRange!.maximumMinimum! ) {
                    currentMinimum = dynamicColorRange!.maximumMinimum!;
                }
            }

            result.push( colorRange );
        }

        const head: HTMLElement = document.getElementsByTagName( "head" )[ 0 ];
        const style: HTMLStyleElement = DomElement.create( head, "style" ) as HTMLStyleElement;
        
        style.appendChild( document.createTextNode( cssLines.join( Char.newLine ) ) );

        return result;
    }

    export function getGuideCssClassName( bindingOptions: BindingOptions, colorRange: BindingOptionsColorRange ) : string {
        let result: string = colorRange.cssClassName!;

        if ( bindingOptions.views!.map!.enabled && bindingOptions._currentView!.view === ViewId.map && Is.definedString( colorRange.mapCssClassName ) ) {
            result = colorRange.mapCssClassName!;
        } else if ( bindingOptions.views!.line!.enabled && bindingOptions._currentView!.view === ViewId.line && Is.definedString( colorRange.lineCssClassName ) ) {
            result = colorRange.lineCssClassName!;
        } else if ( bindingOptions.views!.chart!.enabled && bindingOptions._currentView!.view === ViewId.chart && Is.definedString( colorRange.chartCssClassName ) ) {
            result = colorRange.chartCssClassName!;
        } else if ( bindingOptions.views!.days!.enabled && bindingOptions._currentView!.view === ViewId.days && Is.definedString( colorRange.daysCssClassName ) ) {
            result = colorRange.daysCssClassName!;
        } else if ( bindingOptions.views!.months!.enabled && bindingOptions._currentView!.view === ViewId.months && Is.definedString( colorRange.monthsCssClassName ) ) {
            result = colorRange.monthsCssClassName!;
        } else if ( bindingOptions.views!.statistics!.enabled && bindingOptions._currentView!.view === ViewId.statistics && Is.definedString( colorRange.statisticsCssClassName ) ) {
            result = colorRange.statisticsCssClassName!;
        }

        return result;
    }
}