/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        tooltip.ts
 * @version     v5.0.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2025
 */


import { type BindingOptions } from "../type";
import { DomElement } from "../dom/dom";
import { Is } from "../data/is";


export namespace ToolTip {
    let _TOOLTIP_TIMER_ID: number = 0;

    export function render( bindingOptions: BindingOptions ) : void {
        if ( !Is.defined( bindingOptions._currentView!.tooltip ) ) {
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
        if ( element !== null ) {
            element.onmousemove = ( e: MouseEvent ) => show( e, bindingOptions, text );
        }
    }

    export function show( ev: MouseEvent, bindingOptions: BindingOptions, text: string ) : void {
        DomElement.cancelBubble( ev );
        hide( bindingOptions );

        _TOOLTIP_TIMER_ID = setTimeout( () => {
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
        if ( add ) {
            window.addEventListener( "mousemove", () => hide( bindingOptions ) );
            document.addEventListener ( "scroll", () => hide( bindingOptions ) );
        } else {
            window.removeEventListener( "mousemove", () => hide( bindingOptions ) );
            document.removeEventListener ( "scroll", () => hide( bindingOptions ) );
        }
    }
}