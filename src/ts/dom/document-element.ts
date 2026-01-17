/**
 * Heat.js
 * 
 * A powerful, and customizable, JavaScript library for generating interactive heatmaps. It transforms data points into smooth, visually intuitive heat layers, making patterns and intensity easy to spot at a glance. 
 * 
 * @file        document-element.ts
 * @version     v5.0.0 - Beta 2
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2025
 */


import { KeyCode } from "../data/enum";


export namespace DocumentElement {
    export namespace Dialog {
        let _BINDING_KEYDOWN_FUNC: Function = null!;

        export function bindEvents( hideFunc: Function ) : void {
            _BINDING_KEYDOWN_FUNC = hideFunc;

            document.addEventListener( "keydown", ( event: KeyboardEvent ) : void => onKeyDown( event ) );
        }

        export function unbindEvents() : void {
            document.removeEventListener( "keydown", onKeyDown );
        }

        function onKeyDown( event: KeyboardEvent ) : void {
            if ( event.key === KeyCode.escape ) {
                _BINDING_KEYDOWN_FUNC();
            }
        }
    }
}