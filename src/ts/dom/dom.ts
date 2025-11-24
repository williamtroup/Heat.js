/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        dom.ts
 * @version     v4.4.1
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2025
 */


import { type Position } from "../type";
import { Char } from "../data/enum";
import { Is } from "../data/is";


export namespace DomElement {
    export function createWithNoContainer( type: string ) : HTMLElement {
        const nodeType: string = type.toLowerCase();
        const isText: boolean = nodeType === "text";

        let result: any = isText ? document.createTextNode( Char.empty ) : document.createElement( nodeType );

        return result;
    }

    export function create( container: HTMLElement, type: string, className: string = Char.empty, beforeNode: HTMLElement = null! ) : HTMLElement {
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

    export function createWithHTML( container: HTMLElement, type: string, className: string, html: string, beforeNode: HTMLElement = null! ) : HTMLElement {
        const element: HTMLElement = create( container, type, className, beforeNode );
        element.innerHTML = html;

        return element;
    }

    export function getStyleValueByName( element: any, stylePropertyName: string, toNumber: boolean = false ) : any {
        const styles: CSSStyleDeclaration = getComputedStyle( element );
        let style: any = styles.getPropertyValue( stylePropertyName );
        
        if ( toNumber ) {
            style = parseFloat( style );
        }

        return style;
    }

    export function addClass( element: HTMLElement, className: string ) : void {
        element.classList.add( className );
    }

    export function removeClass( element: HTMLElement, className: string ) : void {
        element.classList.remove( className );
    }

    export function cancelBubble( ev: Event ) : void {
        ev.preventDefault();
        ev.stopPropagation();
    }

    export function getScrollPosition() : Position {
        const documentElement: HTMLElement = document.documentElement;

        const result: Position = {
            left: documentElement.scrollLeft  - ( documentElement.clientLeft || 0 ),
            top: documentElement.scrollTop - ( documentElement.clientTop || 0 )
        } as Position;

        return result;
    }

    export function showElementAtMousePosition( ev: MouseEvent, element: HTMLElement ) : void {
        let left: number = ev.pageX;
        let top: number = ev.pageY;
        const scrollPosition: Position = getScrollPosition();

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
            left = ev.pageX + 1;
        }

        if ( top < scrollPosition.top ) {
            top = ev.pageY + 1;
        }
        
        element.style.left = `${left}px`;
        element.style.top = `${top}px`;
    }

    export function reverseChildrenOrder( parent: HTMLElement ) : void {
        const children: HTMLCollection = parent.children;
        let childrenLength: number = children.length - 1;

        for ( ; childrenLength--; ) {
            parent.appendChild( children[ childrenLength ] );
        }
    }

    export function createCheckBox( container: HTMLElement, labelText: string, name: string ) : HTMLInputElement {
        const lineContainer: HTMLElement = create( container, "div" );
        const label: HTMLElement = create( lineContainer, "label", "checkbox" );
        const input: HTMLInputElement = create( label, "input" ) as HTMLInputElement;

        input.type = "checkbox";
        input.name = name;

        create( label, "span", "check-mark" );
        createWithHTML( label, "span", "text", labelText );
        
        return input;
    }
}