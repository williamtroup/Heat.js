/**
 * Heat.js
 * 
 * A highly customizable JavaScript library for generating interactive heatmaps. It transforms data into smooth, visually intuitive heat layers, making patterns and intensity easy to spot at a glance.
 * 
 * @file        color-range.ts
 * @version     v5.0.0 - Beta 9
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2026
 */


import { 
    type BindingOptionsDynamicColorRange,
    type BindingOptions,
    type BindingOptionsColorRange, 
    type RgbaColor } from "../type";
    
import { Char, ViewId } from "../data/enum";
import { Constant } from "../constant";
import { Default } from "../data/default";
import { Is } from "../data/is";
import { Convert } from "../data/convert";
import { DomElement } from "../dom/dom";
import { Css } from "../css";
import { Str } from "../data/str";
import { Trigger } from "./trigger";


export namespace ColorRange {
    export function toggleVisibleState( bindingOptions: BindingOptions, id: string ) : boolean {
        const colorRangesLength: number = bindingOptions.colorRanges!.length;
        let renderRequired: boolean = false;

        for ( let colorRangesIndex: number = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++ ) {
            const colorRange: BindingOptionsColorRange = bindingOptions.colorRanges![ colorRangesIndex ];

            if ( colorRange.id === id ) {
                colorRange.visible = !Default.getBoolean( colorRange.visible, true );

                if ( toggleForActiveView( bindingOptions, colorRange ) ) {
                    renderRequired = true;
                }

                Trigger.customEvent( bindingOptions.events!.onColorRangeTypeToggle!, bindingOptions._currentView!.element, colorRange.id, colorRange.visible );
                break;
            }
        }

        return renderRequired;
    }

    export function invertVisibleStates( bindingOptions: BindingOptions ) : boolean {
        const colorRangesLength: number = bindingOptions.colorRanges!.length;
        let renderRequired: boolean = false;

        for ( let colorRangesIndex: number = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++ ) {
            const colorRange: BindingOptionsColorRange = bindingOptions.colorRanges![ colorRangesIndex ];
            colorRange.visible = !colorRange.visible;

            renderRequired = toggleForActiveView( bindingOptions, colorRange );

            Trigger.customEvent( bindingOptions.events!.onColorRangeTypeToggle!, bindingOptions._currentView!.element, bindingOptions.colorRanges![ colorRangesIndex ].id, bindingOptions.colorRanges![ colorRangesIndex ].visible );
        }

        return renderRequired;
    }

    export function updateAllVisibleStates( bindingOptions: BindingOptions, flag: boolean ) : boolean {
        let renderRequired: boolean = false;

        if ( bindingOptions.guide!.useIncrementToggles ) {
            const colorRanges: BindingOptionsColorRange[] = getAllSorted( bindingOptions );
            const colorRangesLength: number = colorRanges.length;

            if ( flag ) {
                for ( let colorRangeIndex: number = 0; colorRangeIndex < colorRangesLength; colorRangeIndex++ ) {
                    const colorRange: BindingOptionsColorRange = colorRanges[ colorRangeIndex ];

                    if ( !colorRange.visible ) {
                        colorRange.visible = true;
                        renderRequired = toggleForActiveView( bindingOptions, colorRange );

                        Trigger.customEvent( bindingOptions.events!.onColorRangeTypeToggle!, bindingOptions._currentView!.element, colorRange.id, flag );
                        break;
                    }
                }

            } else {
                for ( let colorRangeIndex: number = colorRangesLength; colorRangeIndex--; ) {
                    const colorRange: BindingOptionsColorRange = colorRanges[ colorRangeIndex ];

                    if ( colorRange.visible ) {
                        colorRange.visible = false;
                        renderRequired = toggleForActiveView( bindingOptions, colorRange );

                        Trigger.customEvent( bindingOptions.events!.onColorRangeTypeToggle!, bindingOptions._currentView!.element, colorRange.id, flag );
                        break;
                    }
                }
            }

        } else {
            const colorRangesLength: number = bindingOptions.colorRanges!.length;

            for ( let colorRangesIndex: number = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++ ) {
                const colorRange: BindingOptionsColorRange = bindingOptions.colorRanges![ colorRangesIndex ];
                colorRange.visible = flag;

                renderRequired = toggleForActiveView( bindingOptions, colorRange );

                Trigger.customEvent( bindingOptions.events!.onColorRangeTypeToggle!, bindingOptions._currentView!.element, colorRange.id, flag );
            }
        }

        return renderRequired;
    }

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
        return bindingOptions.colorRanges!.sort( ( colorRangeA: BindingOptionsColorRange, colorRangeB: BindingOptionsColorRange ) : number => {
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
            const cssName: string = `day-color-${Str.padNumber( actualColorIndex )}`;
            
            cssLines.push( `div.${cssName} {` );
            cssLines.push( `${Char.tab}background-color: ${rgba} !important;` );
            cssLines.push( `${Char.tab}border-color: ${rgbaBorder} !important;` );
            cssLines.push( `${Char.tab}color: ${colorRgb} !important;` );
            cssLines.push( "}" );
            cssLines.push( `div.${cssName}:not(.no-hover):hover {` );
            cssLines.push( `${Char.tab}opacity: 0.7 !important;` );
            cssLines.push( "}" );

            const colorRange: BindingOptionsColorRange = {
                id: Str.padNumber( actualColorIndex ),
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

        if ( bindingOptions.views!.map!.enabled && bindingOptions._currentView!.activeView === ViewId.map && Is.definedString( colorRange.mapCssClassName ) ) {
            result = colorRange.mapCssClassName!;
        } else if ( bindingOptions.views!.line!.enabled && bindingOptions._currentView!.activeView === ViewId.line && Is.definedString( colorRange.lineCssClassName ) ) {
            result = colorRange.lineCssClassName!;
        } else if ( bindingOptions.views!.chart!.enabled && bindingOptions._currentView!.activeView === ViewId.chart && Is.definedString( colorRange.chartCssClassName ) ) {
            result = colorRange.chartCssClassName!;
        } else if ( bindingOptions.views!.days!.enabled && bindingOptions._currentView!.activeView === ViewId.days && Is.definedString( colorRange.daysCssClassName ) ) {
            result = colorRange.daysCssClassName!;
        } else if ( bindingOptions.views!.months!.enabled && bindingOptions._currentView!.activeView === ViewId.months && Is.definedString( colorRange.monthsCssClassName ) ) {
            result = colorRange.monthsCssClassName!;
        } else if ( bindingOptions.views!.colorRanges!.enabled && bindingOptions._currentView!.activeView === ViewId.colorRanges && Is.definedString( colorRange.colorRangeCssClassName ) ) {
            result = colorRange.colorRangeCssClassName!;
        }

        return result;
    }

    export function toggleForActiveView( bindingOptions: BindingOptions, colorRange: BindingOptionsColorRange ) : boolean {
        let result: boolean = false;

        if ( bindingOptions._currentView!.activeView === ViewId.map ) {
            toggleActiveViewColorRangeCssClasses( bindingOptions, colorRange, colorRange.mapCssClassName!, Constant.Attribute.View.Map.HEAT_JS_MINIMUM );
        } else if ( bindingOptions._currentView!.activeView === ViewId.line ) {
            toggleActiveViewColorRangeCssClasses( bindingOptions, colorRange, colorRange.lineCssClassName!, Constant.Attribute.View.Line.HEAT_JS_MINIMUM );
        } else if ( bindingOptions._currentView!.activeView === ViewId.chart ) {
            toggleActiveViewColorRangeCssClasses( bindingOptions, colorRange, colorRange.chartCssClassName!, Constant.Attribute.View.Chart.HEAT_JS_MINIMUM );
        } else if ( bindingOptions._currentView!.activeView === ViewId.colorRanges ) {
            toggleActiveViewColorRangeCssClasses( bindingOptions, colorRange, colorRange.colorRangeCssClassName!, Constant.Attribute.View.ColorRanges.HEAT_JS_MINIMUM );
        } else {
            result = true;
        }

        return result;
    }

    function toggleActiveViewColorRangeCssClasses( bindingOptions: BindingOptions, colorRange: BindingOptionsColorRange, colorRangeCssClassName: string, attributeName: string ) : void {
        const cssName: string = Is.definedString( colorRangeCssClassName ) ? colorRangeCssClassName! : colorRange.cssClassName!;
        const dayElements: HTMLCollectionOf<Element> = bindingOptions._currentView!.element!.getElementsByTagName( "div" );
        const days: HTMLElement[] = [].slice.call( dayElements );
        const daysLength: number = days.length;

        for ( let daysIndex: number = 0; daysIndex < daysLength; daysIndex++ ) {
            const element: HTMLElement = days[ daysIndex ];
            const attributeValue: string = element.getAttribute( attributeName )!;
            const colorRangeAttributeValue: string = element.getAttribute( Constant.Attribute.Area.ColorRangeToggle.HEAT_JS_MINIMUM )!;
            const updateCssClass: boolean = Is.definedString( attributeValue ) && attributeValue === colorRange.minimum!.toString();

            if ( updateCssClass || colorRangeAttributeValue === colorRange.minimum!.toString() ) {
                if ( colorRange.visible ) {
                    DomElement.addClass( element, cssName );
                } else {
                    DomElement.removeClass( element, cssName );
                }
            }
        }
    }
}