/**
 * Heat.js
 * 
 * A lightweight JavaScript library.
 * 
 * @file        observe.js
 * @version     v0.1.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2024
 */


( function() {
    var // Variables: Constructor Parameters
        _parameter_Document = null,
        _parameter_Window = null,

        // Variables: Configuration
        _configuration = {},

        // Variables: Strings
        _string = {
            empty: "",
            space: " "
        },

        // Variables: Elements
        _elements_Type = {},

        // Variables: Attribute Names
        _attribute_Name_Options = "data-heat-options";

    
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Rendering
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function render() {
        var tagTypes = _configuration.domElementTypes,
            tagTypesLength = tagTypes.length;

        for ( var tagTypeIndex = 0; tagTypeIndex < tagTypesLength; tagTypeIndex++ ) {
            var domElements = _parameter_Document.getElementsByTagName( tagTypes[ tagTypeIndex ] ),
                elements = [].slice.call( domElements ),
                elementsLength = elements.length;

            for ( var elementIndex = 0; elementIndex < elementsLength; elementIndex++ ) {
                if ( !renderElement( elements[ elementIndex ] ) ) {
                    break;
                }
            }
        }
    }

    function renderElement( element ) {
        var result = true;

        if ( isDefined( element ) && element.hasAttribute( _attribute_Name_Options ) ) {
            var bindingOptionsData = element.getAttribute( _attribute_Name_Options );

            if ( isDefinedString( bindingOptionsData ) ) {
                var bindingOptions = getObjectFromString( bindingOptionsData );

                if ( bindingOptions.parsed && isDefinedObject( bindingOptions.result ) ) {
                    bindingOptions = buildAttributeOptions( bindingOptions.result );
                    bindingOptions.element = element;
                    bindingOptions.currentView = {};

                    element.removeAttribute( _attribute_Name_Options );

                    renderControl( bindingOptions );

                } else {
                    if ( !_configuration.safeMode ) {
                        console.error( "The attribute '" + _attribute_Name_Options + "' is not a valid object." );
                        result = false;
                    }
                }

            } else {
                if ( !_configuration.safeMode ) {
                    console.error( "The attribute '" + _attribute_Name_Options + "' has not been set correctly." );
                    result = false;
                }
            }
        }

        return result;
    }

    function renderControl( bindingOptions ) {
        bindingOptions.element.className = "heat-js";

        renderControlView( bindingOptions );
    }

    function renderControlView( bindingOptions ) {
        if ( !isDefinedNumber( bindingOptions.currentView.year ) ) {
            bindingOptions.currentView.year = new Date().getFullYear();
        }

        var days = createElement( "div", "days" );
        bindingOptions.element.appendChild( days );

        for ( var dayIndex = 0; dayIndex < 7; dayIndex++ ) {
            var dayName = createElement( "div", "day-name" );
            dayName.innerHTML = _configuration.dayNames[ dayIndex ];
            days.appendChild( dayName );
        }

        var months = createElement( "div", "months" );
        bindingOptions.element.appendChild( months );

        for ( var monthIndex = 0; monthIndex < 12; monthIndex++ ) {
            var month = createElement( "div", "month" );
            months.appendChild( month );

            var monthName = createElement( "div", "month-name" );
            monthName.innerHTML = _configuration.monthNames[ monthIndex ];
            month.appendChild( monthName );

            var dayColumns = createElement( "div", "day-columns" );
            month.appendChild( dayColumns );

            var totalDaysInMonth = getTotalDaysInMonth( bindingOptions.currentView.year, monthIndex ),
                currentDayColumn = createElement( "div", "day-column" ),
                startFillingDays = false;

            dayColumns.appendChild( currentDayColumn );

            var firstDayInMonth = new Date( bindingOptions.currentView.year, monthIndex, 1 ),
                firstDayNumberInMonth = getWeekdayNumber( firstDayInMonth );

            totalDaysInMonth += firstDayNumberInMonth;

            for ( var dayIndex = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
                if ( dayIndex >= firstDayNumberInMonth ) {
                    startFillingDays = true;
                    
                } else {
                    var day = createElement( "div", "day-disabled" );
                    currentDayColumn.appendChild( day );
                }

                if ( startFillingDays ) {
                    var day = createElement( "div", "day" );
                    currentDayColumn.appendChild( day );
    
                    if ( ( dayIndex + 1 ) % 7 === 0 ) {
                        currentDayColumn = createElement( "div", "day-column" );
                        dayColumns.appendChild( currentDayColumn );
                    }
                }
            }
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Options
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function buildAttributeOptions( newOptions ) {
        var options = !isDefinedObject( newOptions ) ? {} : newOptions;
        options.render = getDefaultBoolean( options.render, true );

        options = buildAttributeOptionStrings( options );

        return buildAttributeOptionCustomTriggers( options );
    }

    function buildAttributeOptionStrings( options ) {
        options.removeText = getDefaultString( options.removeText, "X" );

        return options;
    }

    function buildAttributeOptionCustomTriggers( options ) {
        options.onRenderComplete = getDefaultFunction( options.onRenderComplete, null );

        return options;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Date/Time
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function getTotalDaysInMonth( year, month ) {
        return new Date( year, month + 1, 0 ).getDate();
    }

    function getWeekdayNumber( date ) {
        return date.getDay() - 1 < 0 ? 6 : date.getDay() - 1;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Validation
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function isDefined( value ) {
        return value !== null && value !== undefined && value !== _string.empty;
    }

    function isDefinedObject( object ) {
        return isDefined( object ) && typeof object === "object";
    }

    function isDefinedBoolean( object ) {
        return isDefined( object ) && typeof object === "boolean";
    }

    function isDefinedString( object ) {
        return isDefined( object ) && typeof object === "string";
    }

    function isDefinedFunction( object ) {
        return isDefined( object ) && typeof object === "function";
    }

    function isDefinedNumber( object ) {
        return isDefined( object ) && typeof object === "number";
    }

    function isDefinedArray( object ) {
        return isDefinedObject( object ) && object instanceof Array;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Element Handling
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function createElement( type, className ) {
        var result = null,
            nodeType = type.toLowerCase(),
            isText = nodeType === "text";

        if ( !_elements_Type.hasOwnProperty( nodeType ) ) {
            _elements_Type[ nodeType ] = isText ? _parameter_Document.createTextNode( _string.empty ) : _parameter_Document.createElement( nodeType );
        }

        result = _elements_Type[ nodeType ].cloneNode( false );

        if ( isDefined( className ) ) {
            result.className = className;
        }

        return result;
    }

    function cancelBubble( e ) {
        if ( e !== null ) {
            e.preventDefault();
            e.cancelBubble = true;
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Triggering Custom Events
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function fireCustomTrigger( triggerFunction ) {
        if ( isDefinedFunction( triggerFunction ) ) {
            triggerFunction.apply( null, [].slice.call( arguments, 1 ) );
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Default Parameter/Option Handling
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function getDefaultString( value, defaultValue ) {
        return isDefinedString( value ) ? value : defaultValue;
    }

    function getDefaultBoolean( value, defaultValue ) {
        return isDefinedBoolean( value ) ? value : defaultValue;
    }

    function getDefaultFunction( value, defaultValue ) {
        return isDefinedFunction( value ) ? value : defaultValue;
    }

    function getDefaultArray( value, defaultValue ) {
        return isDefinedArray( value ) ? value : defaultValue;
    }

    function getDefaultNumber( value, defaultValue ) {
        return isDefinedNumber( value ) ? value : defaultValue;
    }

    function getDefaultStringOrArray( value, defaultValue ) {
        if ( isDefinedString( value ) ) {
            value = value.split( _string.space );

            if ( value.length === 0 ) {
                value = defaultValue;
            }

        } else {
            value = getDefaultArray( value, defaultValue );
        }

        return value;
    }

    function getObjectFromString( objectString ) {
        var parsed = true,
            result = null;

        try {
            if ( isDefinedString( objectString ) ) {
                result = JSON.parse( objectString );
            }

        } catch ( e1 ) {

            try {
                result = eval( "(" + objectString + ")" );

                if ( isDefinedFunction( result ) ) {
                    result = result();
                }
                
            } catch ( e2 ) {
                if ( !_configuration.safeMode ) {
                    console.error( "Errors in object: " + e1.message + ", " + e2.message );
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
     * Public Functions:  Configuration
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    /**
     * setConfiguration().
     * 
     * Sets the specific configuration options that should be used.
     * 
     * @public
     * 
     * @param       {Options}   newConfiguration                            All the configuration options that should be set (refer to "Options" documentation for properties).
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    this.setConfiguration = function( newOptions ) {
        _configuration = !isDefinedObject( newOptions ) ? {} : newOptions;
        
        buildDefaultConfiguration();

        return this;
    };

    function buildDefaultConfiguration() {
        _configuration.safeMode = getDefaultBoolean( _configuration.safeMode, true );
        _configuration.domElementTypes = getDefaultStringOrArray( _configuration.domElementTypes, [ "*" ] );

        buildDefaultConfigurationArrays();
    }

    function buildDefaultConfigurationArrays() {
        if ( isInvalidOptionArray( _configuration.monthNames, 12 ) ) {
            _configuration.monthNames = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
            ];
        }

        if ( isInvalidOptionArray( _configuration.dayNames, 7 ) ) {
            _configuration.dayNames = [
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun"
            ];
        }
    }

    function isInvalidOptionArray( array, minimumLength ) {
        minimumLength = isDefinedNumber( minimumLength ) ? minimumLength : 1;

        return !isDefinedArray( array ) || array.length < minimumLength;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public Functions:  Additional Data
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    /**
     * getVersion().
     * 
     * Returns the version of Heat.js.
     * 
     * @public
     * 
     * @returns     {string}                                                The version number.
     */
    this.getVersion = function() {
        return "0.1.0";
    };


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Initialize Heat.js
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    ( function ( documentObject, windowObject ) {
        _parameter_Document = documentObject;
        _parameter_Window = windowObject;

        buildDefaultConfiguration();

        _parameter_Document.addEventListener( "DOMContentLoaded", function() {
            render();
        } );

        if ( !isDefined( _parameter_Window.$heat ) ) {
            _parameter_Window.$heat = this;
        }

    } ) ( document, window );
} )();