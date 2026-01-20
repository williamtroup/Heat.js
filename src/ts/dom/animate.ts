/**
 * Heat.js
 * 
 * A highly customizable JavaScript library for generating interactive heatmaps. It transforms data into smooth, visually intuitive heat layers, making patterns and intensity easy to spot at a glance. 
 * 
 * @file        animate.ts
 * @version     v5.0.0 - Beta 5
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