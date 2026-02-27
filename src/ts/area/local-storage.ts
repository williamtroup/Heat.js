/**
 * Heat.js
 * 
 * A highly customizable JavaScript library for generating interactive heatmaps. It transforms data into smooth, visually intuitive heat layers, making patterns and intensity easy to spot at a glance.
 * 
 * @file        local-storage.ts
 * @version     v5.0.1
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2026
 */


import {
    type InstanceTypeData,
    type InstanceTypeDateCount,
    type BindingOptions,
    type ConfigurationOptions,
    type StringToJson } from "../type";

import { Constant } from "../constant";
import { Default } from "../data/default";
import { Str } from "../data/str";


export namespace LocalStorage {
    export function load( configurationOptions: ConfigurationOptions, bindingOptions: BindingOptions, instanceTypeData: InstanceTypeData ) : void {
        if ( bindingOptions.useLocalStorageForData && window.localStorage ) {
            const keysLength: number = window.localStorage.length;
            const elementId: string = bindingOptions._currentView!.element.id;

            for ( let keyIndex: number = 0; keyIndex < keysLength; keyIndex++ ) {
                const key : string = window.localStorage.key( keyIndex )!;

                if ( Str.startsWithAnyCase( key, `${Constant.LOCAL_STORAGE_START_ID}${elementId}` ) ) {
                    const typesJson: string = window.localStorage.getItem( key )!;
                    const typesObject: StringToJson = Default.getObjectFromString( typesJson, configurationOptions );

                    if ( typesObject.parsed ) {
                        instanceTypeData.typeData = typesObject.object as Record<string, InstanceTypeDateCount>;
                        instanceTypeData.totalTypes = 0;

                        for ( const type in instanceTypeData.typeData ) {
                            if ( Object.prototype.hasOwnProperty.call( instanceTypeData.typeData, type ) ) {
                                instanceTypeData.totalTypes++;
                            }
                        }
                    }

                    break;
                }
            }
        }
    }

    export function store( bindingOptions: BindingOptions, instanceTypeData: InstanceTypeData ) : void {
        if ( bindingOptions.useLocalStorageForData && window.localStorage ) {
            const elementId: string = bindingOptions._currentView!.element.id;
            const jsonData: string = JSON.stringify( instanceTypeData.typeData );

            clear( bindingOptions );

            window.localStorage.setItem( `${Constant.LOCAL_STORAGE_START_ID}${elementId}`, jsonData );
        }
    }

    export function clear( bindingOptions: BindingOptions ) : void {
        if ( bindingOptions.useLocalStorageForData && window.localStorage ) {
            const keysLength: number = window.localStorage.length;
            const keysToRemove: string[] = [];
            const elementId: string = bindingOptions._currentView!.element.id;

            for ( let keyIndex: number = 0; keyIndex < keysLength; keyIndex++ ) {
                const key : string = window.localStorage.key( keyIndex )!;
                
                if ( Str.startsWithAnyCase( key, `${Constant.LOCAL_STORAGE_START_ID}${elementId}` ) ) {
                    keysToRemove.push( key );
                }
            }

            const keysToRemoveLength: number = keysToRemove.length;

            for ( let keyToRemoveIndex: number = 0; keyToRemoveIndex < keysToRemoveLength; keyToRemoveIndex++ ) {
                window.localStorage.removeItem( keysToRemove[ keyToRemoveIndex ] );
            }
        }
    }
}