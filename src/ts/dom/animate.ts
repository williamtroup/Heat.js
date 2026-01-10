/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        animate.ts
 * @version     v5.0.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2025
 */


import { type BindingOptions } from "../type";


export namespace Animate {
    export function setHeight( bindingOptions: BindingOptions, element: HTMLElement, height: number, allow: boolean = true, usePercentage: boolean = false ) : void {
        if ( height > 0 ) {
            const heightCss: string = usePercentage ? `${height}%` : `${height}px`

            if ( allow && bindingOptions.chartsAnimationDelay! > 0 ) {
                setTimeout( () : void => {
                    element.style.height = heightCss;
                }, bindingOptions.chartsAnimationDelay );

            } else {
                element.style.height = heightCss;
            }
        }
    }
}