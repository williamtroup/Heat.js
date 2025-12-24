/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        build.ts
 * @version     v5.0.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2025
 */


import { type LargestValueForViewValue } from "../type";


export namespace Build {
    export function largestValueForViewValues( maximum: number ) : Record<number, LargestValueForViewValue> {
        const result: Record<number, LargestValueForViewValue> = {};

        for ( let value: number = 0; value <= maximum; value++ ) {
            result[ value + 1 ] = {
                total: 0,
                typeTotals: {},
            } as LargestValueForViewValue;
        }

        return result;
    }
}