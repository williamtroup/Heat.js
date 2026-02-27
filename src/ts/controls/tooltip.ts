/**
 * Heat.js
 * 
 * A highly customizable JavaScript library for generating interactive heatmaps. It transforms data into smooth, visually intuitive heat layers, making patterns and intensity easy to spot at a glance.
 * 
 * @file        tooltip.ts
 * @version     v5.0.1
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2026
 */


import {
    type ConfigurationOptions,
    type IsHoliday,
    type BindingOptions } from "../type";
    
import { DomElement } from "../dom/dom";
import { Is } from "../data/is";
import { Trigger } from "../area/trigger";
import { Char } from "../data/enum";
import { Str } from "../data/str";
import { DateTime } from "../data/datetime";


export namespace ToolTip {
    let _TOOLTIP_TIMER_ID: number = 0;

    export function render( bindingOptions: BindingOptions ) : void {
        if ( !Is.defined( bindingOptions._currentView!.tooltip ) && bindingOptions.tooltip!.overrideTitle ) {
            const tooltipElements: HTMLCollectionOf<Element> = document.getElementsByClassName( "heat-js-tooltip" );
            const tooltips: HTMLElement[] = [].slice.call( tooltipElements );

            if ( tooltips.length > 0 ) {
                bindingOptions._currentView!.tooltip = tooltips[ 0 ];

            } else {
                bindingOptions._currentView!.tooltip = DomElement.create( document.body, "div", "heat-js-tooltip" );

                assignToEvents( bindingOptions );
            }

            bindingOptions._currentView!.tooltip.style.display = "none";
        }
    }

    export function add( element: HTMLElement, bindingOptions: BindingOptions, text: string ) : void {
        if ( Is.defined( element ) ) {
            if ( bindingOptions.tooltip!.overrideTitle ) {
                element.onmousemove = ( e: MouseEvent ) => show( e, bindingOptions, text );

            } else {
                element.title = text.replace( /<\/?[^>]+(>|$)/g, Char.empty );

                if ( Is.definedString( bindingOptions.tooltip!.customAttributeName ) && Is.definedString( bindingOptions.tooltip!.customAttributeValue ) ) {
                    element.setAttribute( bindingOptions.tooltip!.customAttributeName!, bindingOptions.tooltip!.customAttributeValue! );
                }
            }
        }
    }

    export function addForDay( configurationOptions: ConfigurationOptions, bindingOptions: BindingOptions, day: HTMLElement, date: Date, dateCount: number, percentageDifferenceText: string, tooltipFormat: string, tooltipRenderFunc: Function, isHoliday: boolean, showCountsInTooltips: boolean, showDifferencesInToolTips: boolean ) : void {
        if ( Is.definedFunction( tooltipRenderFunc ) ) {
            add( day, bindingOptions, Trigger.customEvent( tooltipRenderFunc, bindingOptions._currentView!.element, date, dateCount, bindingOptions._currentView!.activeYear, isHoliday ) );
        } else {

            const tooltip: string[] = [ DateTime.getCustomFormattedDateText( bindingOptions, configurationOptions, tooltipFormat, date, true ) ];

            if ( bindingOptions.showHolidaysInDayToolTips ) {
                const holiday: IsHoliday = Is.holiday( bindingOptions, date );

                if ( holiday.matched && Is.definedString( holiday.name ) ) {
                    tooltip.push(`${Char.colon}${Char.space}${holiday.name}`);
                }
            }

            if ( showCountsInTooltips || ( showDifferencesInToolTips && Is.definedString( percentageDifferenceText ) ) ) {
                tooltip.push(`${Char.colon}${Char.space}`);
            }

            if ( showCountsInTooltips ) {
                tooltip.push(`<b class="tooltip-count">${Str.friendlyNumber( dateCount )}</b>`);
            }

            if ( showDifferencesInToolTips && Is.definedString( percentageDifferenceText ) ) {
                if ( showCountsInTooltips && !bindingOptions.tooltip!.overrideTitle ) {
                    tooltip.push(Char.space);
                }

                const differentClass = !percentageDifferenceText.startsWith( Char.dash ) ? "positive" : "negative";

                tooltip.push(`<b class="tooltip-difference ${differentClass}">${percentageDifferenceText}</b>`);
            }

            add( day, bindingOptions, tooltip.join( Char.empty ) );
        }
    }

    export function show( ev: MouseEvent, bindingOptions: BindingOptions, text: string ) : void {
        DomElement.cancelBubble( ev );
        hide( bindingOptions );

        _TOOLTIP_TIMER_ID = setTimeout( () : void => {
            bindingOptions._currentView!.tooltip.innerHTML = text;

            DomElement.showElementAtMousePosition( ev, bindingOptions._currentView!.tooltip, "flex" );
        }, bindingOptions.tooltip!.delay );
    }

    export function hide( bindingOptions: BindingOptions ) : void {
        if ( Is.defined( bindingOptions._currentView!.tooltip ) ) {
            if ( _TOOLTIP_TIMER_ID !== 0 ) {
                clearTimeout( _TOOLTIP_TIMER_ID );
                _TOOLTIP_TIMER_ID = 0;
            }
    
            if ( bindingOptions._currentView!.tooltip.style.display !== "none" ) {
                bindingOptions._currentView!.tooltip.style.display = "none";
            }
        }
    }

    export function remove( bindingOptions: BindingOptions ) : void {
        if ( Is.defined( bindingOptions._currentView!.tooltip ) ) {
            const heatJsElements: HTMLCollectionOf<Element> = document.getElementsByClassName( "heat-js" );
            const heatJsInstances: HTMLElement[] = [].slice.call( heatJsElements );

            if ( heatJsInstances.length === 0 ) {
                document.body.removeChild( bindingOptions._currentView!.tooltip );
            }
        }
    }

    function assignToEvents( bindingOptions: BindingOptions, add: boolean = true ) : void {
        const windowFunc: Function = add ? window.addEventListener : window.removeEventListener;
        const documentFunc: Function = add ? document.addEventListener : document.removeEventListener;

        windowFunc( "mousemove", () : void => hide( bindingOptions ) );
        windowFunc( "blur", () : void => hide( bindingOptions ) );
        documentFunc ( "scroll", () : void => hide( bindingOptions ) );
    }
}