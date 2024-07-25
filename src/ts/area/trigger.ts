/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        trigger.ts
 * @version     v4.1.1
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2024
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