/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        local-storage.ts
 * @version     v5.0.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2025
 */


import {
    type BindingOptions,
    type ConfigurationOptions,
    type InstanceTypeData,
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

                if ( Str.startsWithAnyCase( key, Constant.LOCAL_STORAGE_START_ID ) ) {
                    const keyElementId: string = key.substring( Constant.LOCAL_STORAGE_START_ID.length );

                    if ( keyElementId === elementId ) {
                        const typesJson: string = window.localStorage.getItem( key )!;
                        const typesObject: StringToJson = Default.getObjectFromString( typesJson, configurationOptions );

                        if ( typesObject.parsed ) {
                            instanceTypeData.typeData = typesObject.object;
                            instanceTypeData.totalTypes = 0;

                            for ( const type in instanceTypeData.typeData ) {
                                if ( instanceTypeData.typeData.hasOwnProperty( type ) ) {
                                    instanceTypeData.totalTypes++;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    export function store( bindingOptions: BindingOptions, instanceTypeData: InstanceTypeData ) : void {
        if ( bindingOptions.useLocalStorageForData && window.localStorage ) {
            const elementId: string = bindingOptions._currentView!.element.id;

            clear( bindingOptions );

            const jsonData: string = JSON.stringify( instanceTypeData.typeData );

            window.localStorage.setItem( `${Constant.LOCAL_STORAGE_START_ID}${elementId}`, jsonData );
        }
    }

    export function clear( bindingOptions: BindingOptions ) : void {
        if ( bindingOptions.useLocalStorageForData && window.localStorage ) {
            const keysLength: number = window.localStorage.length;
            const keysToRemove: string[] = [];
            const elementId: string = bindingOptions._currentView!.element.id;

            for ( let keyIndex: number = 0; keyIndex < keysLength; keyIndex++ ) {
                if ( Str.startsWithAnyCase( window.localStorage.key( keyIndex )!, `${Constant.LOCAL_STORAGE_START_ID}${elementId}` ) ) {
                    keysToRemove.push( window.localStorage.key( keyIndex )! );
                }
            }

            const keysToRemoveLength: number = keysToRemove.length;

            for ( let keyToRemoveIndex: number = 0; keyToRemoveIndex < keysToRemoveLength; keyToRemoveIndex++ ) {
                window.localStorage.removeItem( keysToRemove[ keyToRemoveIndex ] );
            }
        }
    }
}