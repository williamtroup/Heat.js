/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        document-element.ts
 * @version     v5.0.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2025
 */


import { KeyCode } from "../data/enum";


export namespace DocumentElement {
    export namespace Dialog {
        let _BINDING_KEYDOWN_FUNC: Function = null!;

        export function bind( hideFunc: Function ) : void {
            _BINDING_KEYDOWN_FUNC = hideFunc;

            document.addEventListener( "keydown", ( event: KeyboardEvent ) => onKeyDown( event ) );
        }

        export function unbind() : void {
            document.removeEventListener( "keydown", onKeyDown );
        }

        function onKeyDown( event: KeyboardEvent ) : void {
            if ( event.key === KeyCode.escape ) {
                _BINDING_KEYDOWN_FUNC();
            }
        }
    }
}