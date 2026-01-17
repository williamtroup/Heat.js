/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        disabled.ts
 * @version     v5.0.0 - Beta 2
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2025
 */


import { type BindingOptions } from "../type";
import { Is } from "../data/is";
import { DomElement } from "../dom/dom";


export namespace Disabled {
    export namespace Background {
        export function render( bindingOptions: BindingOptions ) : void {
            if ( !Is.definedParentElement( bindingOptions._currentView!.disabledBackground ) ) {
                bindingOptions._currentView!.disabledBackground = DomElement.create( bindingOptions._currentView!.element, "div", "disabled" );

                if ( bindingOptions.showSideMenu ) {
                    DomElement.addClass( bindingOptions._currentView!.disabledBackground, "full-view" );
                }
            }
        }
    
        export function show( bindingOptions: BindingOptions ) : void {
            if ( Is.defined( bindingOptions._currentView!.disabledBackground ) && bindingOptions._currentView!.disabledBackground.style.display !== "block" ) {
                bindingOptions._currentView!.disabledBackground.style.display = "block";
            }
        }
    
        export function hide( bindingOptions: BindingOptions ) : void {
            if ( Is.defined( bindingOptions._currentView!.disabledBackground ) && bindingOptions._currentView!.disabledBackground.style.display !== "none" ) {
                bindingOptions._currentView!.disabledBackground.style.display = "none";
            }
        }
    }
}