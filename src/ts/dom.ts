/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        heat.ts
 * @version     v4.0.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2024
 */


import { Char } from "./enum";
import { Is } from "./is";


export namespace DomElement {
    export function createWithNoContainer( type: string ) : HTMLElement {
        const nodeType: string = type.toLowerCase();
        const isText: boolean = nodeType === "text";

        let result: any = isText ? document.createTextNode( Char.empty ) : document.createElement( nodeType );

        return result;
    }

    export function create( container: HTMLElement, type: string, className: string = Char.empty, beforeNode: HTMLElement = null ) : HTMLElement {
        const nodeType: string = type.toLowerCase();
        const isText: boolean = nodeType === "text";

        let result: any = isText ? document.createTextNode( Char.empty ) : document.createElement( nodeType );

        if ( Is.defined( className ) ) {
            result.className = className;
        }

        if ( Is.defined( beforeNode ) ) {
            container.insertBefore( result, beforeNode );
        } else {
            container.appendChild( result );
        }

        return result;
    }

    export function createWithHTML( container: HTMLElement, type: string, className: string, html: string, beforeNode: HTMLElement = null ) : HTMLElement {
        const element: HTMLElement = create( container, type, className, beforeNode );
        element.innerHTML = html;

        return element;
    }

    export function getStyleValueByName( element: any, stylePropertyName: string, toNumber: boolean = false ) : any {
        let value: any = null;
        
        if ( document.defaultView.getComputedStyle ) {
            value = document.defaultView.getComputedStyle( element, null ).getPropertyValue( stylePropertyName ); 
        } else if ( element.currentStyle ) {
            value = element.currentStyle[ stylePropertyName ];
        }   
        
        if ( toNumber ) {
            value = parseFloat( value );
        }

        return value;
    }

    export function addClass( element: HTMLElement, className: string ) {
        element.className += Char.space + className;
        element.className = element.className.trim();
    }

    export function removeClass( element: HTMLElement, className: string ) {
        element.className = element.className.replace( className, Char.empty );
        element.className = element.className.trim();
    }

    export function cancelBubble( e: Event ) {
        e.preventDefault();
        e.cancelBubble = true;
    }

    export function getScrollPosition() : object {
        const doc: HTMLElement = document.documentElement;
        const left: number = ( window.pageXOffset || doc.scrollLeft )  - ( doc.clientLeft || 0 );
        const top: number = ( window.pageYOffset || doc.scrollTop ) - ( doc.clientTop || 0 );

        return {
            left: left,
            top: top
        };
    }

    export function showElementAtMousePosition( e: any, element: HTMLElement ) {
        let left: number = e.pageX;
        let top: number = e.pageY;
        const scrollPosition: any = getScrollPosition();

        element.style.display = "block";

        if ( left + element.offsetWidth > window.innerWidth ) {
            left -= element.offsetWidth;
        } else {
            left++;
        }

        if ( top + element.offsetHeight > window.innerHeight ) {
            top -= element.offsetHeight;
        } else {
            top++;
        }

        if ( left < scrollPosition.left ) {
            left = e.pageX + 1;
        }

        if ( top < scrollPosition.top ) {
            top = e.pageY + 1;
        }
        
        element.style.left = left + "px";
        element.style.top = top + "px";
    }

    export function reverseChildrenOrder( parent: HTMLElement ) {
        const children: HTMLCollection = parent.children;
        let childrenLength: number = children.length - 1;

        for ( ; childrenLength--; ) {
            parent.appendChild( children[ childrenLength ] );
        }
    }

    export function createCheckBox( container: HTMLElement, labelText: string, checked: boolean = null, onClick: Function = null ) : any {
        const lineContainer: HTMLElement = create( container, "div" );
        const label: HTMLElement = create( lineContainer, "label", "checkbox" );
        const input: any = create( label, "input" );

        input.type = "checkbox";

        if ( Is.defined( onClick ) ) {
            input.onclick = onClick;
        }

        if ( Is.defined( checked ) ) {
            input.checked = checked;
        }

        create( label, "span", "check-mark" );
        createWithHTML( label, "span", "text", labelText );
        
        return {
            input: input,
            label: label
        };
    }
}