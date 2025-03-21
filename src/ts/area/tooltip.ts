/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        tooltip.ts
 * @version     v4.3.1
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2025
 */


import { type BindingOptions } from "../type";
import { DomElement } from "../dom/dom";
import { Is } from "../data/is";


export namespace ToolTip {
    export function renderControl( bindingOptions: BindingOptions ) : void {
        if ( !Is.defined( bindingOptions._currentView.tooltip ) ) {
            bindingOptions._currentView.tooltip = DomElement.create( document.body, "div", "heat-js-tooltip" );
            bindingOptions._currentView.tooltip.style.display = "none";
    
            assignToEvents( bindingOptions );
        }
    }

    export function assignToEvents( bindingOptions: BindingOptions, add: boolean = true ) : void {
        let addEventListener_Window: Function = add ? window.addEventListener : window.removeEventListener;
        let addEventListener_Document: Function = add ? document.addEventListener : document.removeEventListener;

        addEventListener_Window( "mousemove", () => hide( bindingOptions ) );
        addEventListener_Document( "scroll", () => hide( bindingOptions ) );
    }

    export function add( element: HTMLElement, bindingOptions: BindingOptions, text: string ) : void {
        if ( element !== null ) {
            element.onmousemove = ( e: MouseEvent ) => show( e, bindingOptions, text );
        }
    }

    export function show( ev: MouseEvent, bindingOptions: BindingOptions, text: string ) : void {
        DomElement.cancelBubble( ev );
        hide( bindingOptions );

        bindingOptions._currentView.tooltipTimer = setTimeout( () => {
            bindingOptions._currentView.tooltip.innerHTML = text;
            bindingOptions._currentView.tooltip.style.display = "block";

            DomElement.showElementAtMousePosition( ev, bindingOptions._currentView.tooltip );
        }, bindingOptions.tooltip!.delay );
    }

    export function hide( bindingOptions: BindingOptions ) : void {
        if ( Is.defined( bindingOptions._currentView.tooltip ) ) {
            if ( bindingOptions._currentView.tooltipTimer !== 0 ) {
                clearTimeout( bindingOptions._currentView.tooltipTimer );
                bindingOptions._currentView.tooltipTimer = 0;
            }
    
            if ( bindingOptions._currentView.tooltip.style.display !== "none" ) {
                bindingOptions._currentView.tooltip.style.display = "none";
            }
        }
    }
}