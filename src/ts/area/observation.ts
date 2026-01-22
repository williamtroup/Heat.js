/**
 * Heat.js
 * 
 * A highly customizable JavaScript library for generating interactive heatmaps. It transforms data into smooth, visually intuitive heat layers, making patterns and intensity easy to spot at a glance. 
 * 
 * @file        observation.ts
 * @version     v5.0.0 - Beta 6
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2026
 */


import { type ConfigurationOptions } from "../type";
import { Is } from "../data/is";


export namespace Observation {
    let _mutationObserver: MutationObserver = null! as MutationObserver;

    export function setup( configurationOptions: ConfigurationOptions, mutationFunc: Function ) {
        if ( configurationOptions.observationMode ) {
            if ( !Is.defined( _mutationObserver ) ) {
                _mutationObserver = new MutationObserver( () : void => mutationFunc() );

                const observeConfig: MutationObserverInit = {
                    attributes: true,
                    childList: true,
                    subtree: true,
                } as MutationObserverInit;

                _mutationObserver.observe( document.body, observeConfig );
            }
            
        } else {
            _mutationObserver.disconnect();
            _mutationObserver = null!;
        }
    }

    export function destroy( configurationOptions: ConfigurationOptions ) {
        if ( configurationOptions.observationMode && Is.defined( _mutationObserver ) ) {
            _mutationObserver.disconnect();
            _mutationObserver = null!;
        }
    }
}