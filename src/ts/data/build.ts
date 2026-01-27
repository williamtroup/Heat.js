/**
 * Heat.js
 * 
 * A highly customizable JavaScript library for generating interactive heatmaps. It transforms data into smooth, visually intuitive heat layers, making patterns and intensity easy to spot at a glance.
 * 
 * @file        build.ts
 * @version     v5.0.0 - Beta 8
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2026
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