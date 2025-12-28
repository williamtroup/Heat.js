/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        trigger.ts
 * @version     v5.0.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2025
 */


import { Is } from "../data/is";


export namespace Trigger {
    export function customEvent<Type>( triggerFunction: Function, ...args : any[] ) : Type {
        let result: any = null;

        if ( Is.definedFunction( triggerFunction ) ) {
            result = triggerFunction.apply( null, [].slice.call( args, 0 ) );
        }

        return result;
    }
}