/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        disabled.ts
 * @version     v4.3.1
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2024
 */


import { type BindingOptions } from "../type";
import { Is } from "../data/is";
import { DomElement } from "../dom/dom";


export namespace Disabled {
    export namespace Background {
        export function render( bindingOptions: BindingOptions ) : void {
            bindingOptions._currentView.disabledBackground = DomElement.create( bindingOptions._currentView.element, "div", "disabled" );
        }
    
        export function show( bindingOptions: BindingOptions ) : void {
            if ( Is.defined( bindingOptions._currentView.disabledBackground ) && bindingOptions._currentView.disabledBackground.style.display !== "block" ) {
                bindingOptions._currentView.disabledBackground.style.display = "block";
            }
        }
    
        export function hide( bindingOptions: BindingOptions ) : void {
            if ( Is.defined( bindingOptions._currentView.disabledBackground ) && bindingOptions._currentView.disabledBackground.style.display !== "none" ) {
                bindingOptions._currentView.disabledBackground.style.display = "none";
            }
        }
    }
}