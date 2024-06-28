import { type Configuration, type Holiday, type ColorRange, type BindingOptions } from "./types";
import { STRING, VALUE, VIEW, VIEW_NAME, EXPORT_TYPE } from "./enums";
import { type PublicApi } from "./api";

( ( documentObject, windowObject, mathObject, jsonObject ) => {

    // Variables: Configuration
    let _configuration: Configuration = {} as Configuration;

    // Variables: Elements
    let _elements_Type: object = {};
    let _elements_Day_Width: number = null;

    // Variables: Date Counts
    let _elements_DateCounts: object = {};

    // Variables: Internal Names
    const _internal_Name_Holiday: string = "HOLIDAY";

    // Variables: Local Storage
    const _local_Storage_Start_ID: string = "HJS_";

    // Variables: Defaults
    const _default_MonthsToShow: number[] = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
    const _default_DaysToShow: number[] = [ 1, 2, 3, 4, 5, 6, 7 ];

    // Variables: Attribute Names
    const _attribute_Name_Options: string = "data-heat-js";


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Date/Time
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function getTotalDaysInMonth( year: number, month: number ) : number {
        return new Date( year, month + 1, 0 ).getDate();
    }

    function getWeekdayNumber( date: Date ) : number {
        return date.getDay() - 1 < 0 ? 6 : date.getDay() - 1;
    }

    function getDayOrdinal( value: number ) : string {
        let result: string = _configuration.thText;

        if ( value === 31 || value === 21 || value === 1 ) {
            result = _configuration.stText;
        } else if ( value === 22 || value === 2 ) {
            result = _configuration.ndText;
        } else if ( value === 23 || value === 3 ) {
            result = _configuration.rdText;
        }

        return result;
    }

    function getCustomFormattedDateText( dateFormat: string, date: Date ) : string {
        let result: string = dateFormat;
        let weekDayNumber: number = getWeekdayNumber( date );

        result = result.replace( "{dddd}", _configuration.dayNames[ weekDayNumber ] );
        result = result.replace( "{dd}", padNumber( date.getDate() ) );
        result = result.replace( "{d}", date.getDate().toString() );

        result = result.replace( "{o}", getDayOrdinal( date.getDate() ) );

        result = result.replace( "{mmmm}", _configuration.monthNames[ date.getMonth() ] );
        result = result.replace( "{mm}", padNumber( date.getMonth() + 1 ) );
        result = result.replace( "{m}", ( date.getMonth() + 1 ).toString() );

        result = result.replace( "{yyyy}", date.getFullYear().toString() );
        result = result.replace( "{yyy}", date.getFullYear().toString().substring( 1 ) );
        result = result.replace( "{yy}", date.getFullYear().toString().substring( 2 ) );
        result = result.replace( "{y}", parseInt( date.getFullYear().toString().substring( 2 ) ).toString() );

        return result;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Element Handling
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function createElementWithNoContainer( type: string ) : HTMLElement {
        let result: HTMLElement = null;
        let nodeType: string = type.toLowerCase();
        let isText: boolean = nodeType === "text";

        if ( !_elements_Type.hasOwnProperty( nodeType ) ) {
            _elements_Type[ nodeType ] = isText ? documentObject.createTextNode( STRING.empty ) : documentObject.createElement( nodeType );
        }

        result = _elements_Type[ nodeType ].cloneNode( false );

        return result;
    }

    function createElement( container: HTMLElement, type: string, className: string = STRING.empty, beforeNode: HTMLElement | null = null ) : HTMLElement {
        let result: HTMLElement = null;
        let nodeType: string = type.toLowerCase();
        let isText: boolean = nodeType === "text";

        if ( !_elements_Type.hasOwnProperty( nodeType ) ) {
            _elements_Type[ nodeType ] = isText ? documentObject.createTextNode( STRING.empty ) : documentObject.createElement( nodeType );
        }

        result = _elements_Type[ nodeType ].cloneNode( false );

        if ( isDefined( className ) ) {
            result.className = className;
        }

        if ( isDefined( beforeNode ) ) {
            container.insertBefore( result, beforeNode );
        } else {
            container.appendChild( result );
        }

        return result;
    }

    function createElementWithHTML( container: HTMLElement, type: string, className: string, html: string, beforeNode: HTMLElement = null ) : HTMLElement {
        let element: HTMLElement = createElement( container, type, className, beforeNode );
        element.innerHTML = html;

        return element;
    }

    function getStyleValueByName( element: any, stylePropertyName: string, toNumber: boolean = false ) : any {
        let value: any = null;
        
        if ( documentObject.defaultView.getComputedStyle ) {
            value = documentObject.defaultView.getComputedStyle( element, null ).getPropertyValue( stylePropertyName ); 
        } else if ( element.currentStyle ) {
            value = element.currentStyle[ stylePropertyName ];
        }   
        
        if ( toNumber ) {
            value = parseFloat( value );
        }

        return value;
    }

    function addClass( element: HTMLElement, className: string ) {
        element.className += STRING.space + className;
        element.className = element.className.trim();
    }

    function removeClass( element: HTMLElement, className: string ) {
        element.className = element.className.replace( className, STRING.empty );
        element.className = element.className.trim();
    }

    function cancelBubble( e: any ) {
        e.preventDefault();
        e.cancelBubble = true;
    }

    function getScrollPosition() : object {
        let doc: HTMLElement = documentObject.documentElement;
        let left: number = ( windowObject.pageXOffset || doc.scrollLeft )  - ( doc.clientLeft || 0 );
        let top: number = ( windowObject.pageYOffset || doc.scrollTop ) - ( doc.clientTop || 0 );

        return {
            left: left,
            top: top
        };
    }

    function showElementAtMousePosition( e: any, element: HTMLElement ) {
        let left: number = e.pageX;
        let top: number = e.pageY;
        let scrollPosition: any = getScrollPosition();

        element.style.display = "block";

        if ( left + element.offsetWidth > windowObject.innerWidth ) {
            left -= element.offsetWidth;
        } else {
            left++;
        }

        if ( top + element.offsetHeight > windowObject.innerHeight ) {
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

    function reverseElementsOrder( parent: HTMLElement ) {
        let children: HTMLCollection = parent.children;
        let childrenLength: number = children.length - 1;

        for ( ; childrenLength--; ) {
            parent.appendChild( children[ childrenLength ] );
        }
    }

    function buildCheckBox( container: HTMLElement, labelText: string, checked: boolean | null, onClick: Function | null ) : object {
        let lineContainer: HTMLElement = createElement( container, "div" );
        let label: HTMLElement = createElement( lineContainer, "label", "checkbox" );
        let input: any = createElement( label, "input" );

        input.type = "checkbox";

        if ( isDefined( onClick ) ) {
            input.onclick = onClick;
        }

        if ( isDefined( checked ) ) {
            input.checked = checked;
        }

        createElement( label, "span", "check-mark" );
        createElementWithHTML( label, "span", "text", labelText );
        
        return {
            input: input,
            label: label
        };
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Triggering Custom Events
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function fireCustomTrigger( triggerFunction: Function ) : any {
        let result: any = null;

        if ( isDefinedFunction( triggerFunction ) ) {
            result = triggerFunction.apply( null, [].slice.call( arguments, 1 ) );
        }

        return result;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Validation
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function isDefined( value: any ) : boolean  {
        return value !== null && value !== undefined && value.toString() !== STRING.empty;
    }

    function isDefinedObject( object: any ) : boolean {
        return isDefined( object ) && typeof object === "object";
    }

    function isDefinedBoolean( object: any ) : boolean  {
        return isDefined( object ) && typeof object === "boolean";
    }

    function isDefinedString( object: any ) : boolean  {
        return isDefined( object ) && typeof object === "string";
    }

    function isDefinedFunction( object: any ) : boolean  {
        return isDefined( object ) && typeof object === "function";
    }

    function isDefinedNumber( object: any ) : boolean  {
        return isDefined( object ) && typeof object === "number";
    }

    function isDefinedArray( object: any ) : boolean  {
        return isDefinedObject( object ) && object instanceof Array;
    }

    function isDefinedDate( object: any ) : boolean  {
        return isDefinedObject( object ) && object instanceof Date;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Default Parameter/Option Handling
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function getDefaultAnyString( value: any, defaultValue: string ) : string  {
        return typeof value === "string" ? value : defaultValue;
    }

    function getDefaultString( value: any, defaultValue: string ) : string {
        return isDefinedString( value ) ? value : defaultValue;
    }

    function getDefaultBoolean( value: any, defaultValue: boolean ) : boolean {
        return isDefinedBoolean( value ) ? value : defaultValue;
    }

    function getDefaultNumber( value: any, defaultValue: number ) : number {
        return isDefinedNumber( value ) ? value : defaultValue;
    }

    function getDefaultFunction( value: any, defaultValue: object ) : Function {
        return isDefinedFunction( value ) ? value : defaultValue;
    }

    function getDefaultArray( value: any, defaultValue: any[] ) : any[] {
        return isDefinedArray( value ) ? value : defaultValue;
    }

    function getDefaultObject( value: any, defaultValue: object ) : object {
        return isDefinedObject( value ) ? value : defaultValue;
    }

    function getDefaultStringOrArray( value: any, defaultValue: any[] ) : any[] {
        let result: object = defaultValue;

        if ( isDefinedString( value ) ) {
            var values: string[] = value.toString().split( STRING.space );

            if ( values.length === 0 ) {
                value = defaultValue;
            } else {
                result = values;
            }

        } else {
            value = getDefaultArray( value, defaultValue );
        }

        return value;
    }

    function getObjectFromString( objectString: any ) : object {
        let parsed: boolean = true,
            result: object = null;

        try {
            if ( isDefinedString( objectString ) ) {
                result = jsonObject.parse( objectString );
            }

        } catch ( e1 ) {

            try {
                let evalResult: Function = result = eval( "(" + objectString + ")" );

                if ( isDefinedFunction( result ) ) {
                    result = evalResult();
                }
                
            } catch ( e2 ) {
                if ( !_configuration.safeMode ) {
                    console.error( _configuration.objectErrorText.replace( "{{error_1}}",  e1.message ).replace( "{{error_2}}",  e2.message ) );
                    parsed = false;
                }
                
                result = null;
            }
        }

        return {
            parsed: parsed,
            result: result
        };
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * String Handling
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function newGuid() : string {
        let result: string[] = [];

        for ( let charIndex: number = 0; charIndex < 32; charIndex++ ) {
            if ( charIndex === 8 || charIndex === 12 || charIndex === 16 || charIndex === 20 ) {
                result.push( STRING.dash );
            }

            let character: string = mathObject.floor( mathObject.random() * 16 ).toString( 16 );
            result.push( character );
        }

        return result.join( STRING.empty );
    }

    function padNumber( number: number ) : string {
        let numberString: string = number.toString();

        return numberString.length === 1 ? STRING.zero + numberString : numberString;
    }

    function startsWithAnyCase( data: string, start: string ) : boolean {
        return data.substring( 0, start.length ).toLowerCase() === start.toLowerCase();
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Storage Dates
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function toStorageDate( date: Date ) : string {
        return date.getFullYear() + STRING.dash + padNumber( date.getMonth() + 1 ) + STRING.dash + padNumber( date.getDate() );
    }

    function getStorageDate( data: string ) : string[] {
        return data.split( STRING.dash );
    }

    function getStorageDateYear( data: string ) : string {
        return data.split( STRING.dash )[ 0 ];
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Initialize Heat.js
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    ( () => {


    } )();

} )( document, window, Math, JSON );