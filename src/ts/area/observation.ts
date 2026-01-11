/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        observation.ts
 * @version     v5.0.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2025
 */


import { type ConfigurationOptions } from "../type";
import { Is } from "../data/is";


export namespace Observation {
    let _mutationObserver: MutationObserver = null! as MutationObserver;

    export function setup( configurationOptions: ConfigurationOptions, mutationFunc: Function ) {
        if ( configurationOptions.observationMode ) {
            if ( !Is.defined( _mutationObserver ) ) {
                _mutationObserver = new MutationObserver( () : void => {
                    mutationFunc();
                } );

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