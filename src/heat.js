/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps to visualize date-based activity and trends.
 * 
 * @file        observe.js
 * @version     v0.6.0
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
            space: " ",
            newLine: "\n",
        },

        // Variables: Elements
        _elements_Type = {},
        _elements_Day_Width = null,

        // Variables: Date Counts
        _elements_DateCounts = {},

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
                    bindingOptions.currentView.colorsVisible = {};

                    fireCustomTrigger( bindingOptions.onBeforeRender, element );

                    if ( !isDefinedString( element.id ) ) {
                        element.id = newGuid();
                    }

                    element.removeAttribute( _attribute_Name_Options );

                    _elements_DateCounts[ element.id ] = {
                        options: bindingOptions
                    };

                    renderControl( bindingOptions );
                    fireCustomTrigger( bindingOptions.onRenderComplete, element );

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
        bindingOptions.element.innerHTML = _string.empty;

        renderControlYear( bindingOptions );
        renderControlMap( bindingOptions );
        renderControlViewGuide( bindingOptions );
    }

    function renderControlYear( bindingOptions ) {
        if ( !isDefinedNumber( bindingOptions.currentView.year ) ) {
            bindingOptions.currentView.year = new Date().getFullYear();
        }

        if ( bindingOptions.showTitle || bindingOptions.showYearSelector || bindingOptions.showRefreshButton || bindingOptions.showExportButton ) {
            var year = createElement( "div", "year" );
            bindingOptions.element.appendChild( year );
    
            if ( bindingOptions.showTitle ) {
                var title = createElement( "div", "title" );
                title.innerHTML = bindingOptions.titleText;
                year.appendChild( title );
            }

            if ( bindingOptions.showExportButton ) {
                var exportData = createElement( "button", "export" );
                exportData.innerHTML = _configuration.exportButtonText;
                year.appendChild( exportData );
        
                exportData.onclick = function() {
                    exportAllData( bindingOptions );
                    fireCustomTrigger( bindingOptions.onExport, bindingOptions.element );
                };
            }

            if ( bindingOptions.showRefreshButton ) {
                var refresh = createElement( "button", "refresh" );
                refresh.innerHTML = _configuration.refreshButtonText;
                year.appendChild( refresh );
        
                refresh.onclick = function() {
                    renderControl( bindingOptions );
                    fireCustomTrigger( bindingOptions.onRefresh, bindingOptions.element );
                };
            }
    
            if ( bindingOptions.showYearSelector ) {
                var back = createElement( "button", "back" );
                back.innerHTML = _configuration.backButtonText;
                year.appendChild( back );
        
                back.onclick = function() {
                    bindingOptions.currentView.year--;
        
                    renderControl( bindingOptions );
                    fireCustomTrigger( bindingOptions.onBackYear, bindingOptions.currentView.year );
                };
        
                bindingOptions.currentView.yearText = createElement( "div", "year-text" );
                bindingOptions.currentView.yearText.innerHTML = bindingOptions.currentView.year;
                year.appendChild( bindingOptions.currentView.yearText );
        
                var next = createElement( "button", "next" );
                next.innerHTML = _configuration.nextButtonText;
                year.appendChild( next );
        
                next.onclick = function() {
                    bindingOptions.currentView.year++;
        
                    renderControl( bindingOptions );
                    fireCustomTrigger( bindingOptions.onNextYear, bindingOptions.currentView.year );
                };
            }
        }
    }

    function renderControlMap( bindingOptions ) {
        var map = createElement( "div", "map" );
        bindingOptions.element.appendChild( map );

        var currentYear = bindingOptions.currentView.year,
            monthAdded = false;

        if ( bindingOptions.showDayNames ) {
            var days = createElement( "div", "days" );
            map.appendChild( days );

            if ( !bindingOptions.showMonthNames ) {
                days.style.paddingTop = "0px";
                days.style.marginTop = "-5px";
            }
    
            for ( var dayNameIndex = 0; dayNameIndex < 7; dayNameIndex++ ) {
                if ( bindingOptions.daysToShow.indexOf( dayNameIndex + 1 ) > -1 ) {
                    var dayName = createElement( "div", "day-name" );
                    dayName.innerHTML = _configuration.dayNames[ dayNameIndex ];
                    days.appendChild( dayName );
                }
            }
        }

        var months = createElement( "div", "months" );
        map.appendChild( months );

        var mapRangeColors = bindingOptions.mapRangeColors.sort( function( a, b ) {
            return b.range - a.range;
        } );

        for ( var monthIndex = 0; monthIndex < 12; monthIndex++ ) {
            if ( bindingOptions.monthsToShow.indexOf( monthIndex + 1 ) > -1 ) {
                var month = createElement( "div", "month" );
                months.appendChild( month );
    
                if ( bindingOptions.showMonthNames ) {
                    var monthName = createElement( "div", "month-name" );
                    monthName.innerHTML = _configuration.monthNames[ monthIndex ];
                    month.appendChild( monthName );
                }
    
                var dayColumns = createElement( "div", "day-columns" );
                month.appendChild( dayColumns );
    
                var totalDaysInMonth = getTotalDaysInMonth( currentYear, monthIndex ),
                    currentDayColumn = createElement( "div", "day-column" ),
                    startFillingDays = false;
    
                dayColumns.appendChild( currentDayColumn );
    
                var firstDayInMonth = new Date( currentYear, monthIndex, 1 ),
                    firstDayNumberInMonth = getWeekdayNumber( firstDayInMonth ),
                    actualDay = 1;
    
                totalDaysInMonth += firstDayNumberInMonth;
    
                for ( var dayIndex = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
                    if ( dayIndex >= firstDayNumberInMonth ) {
                        startFillingDays = true;
    
                    } else {
                        var day = createElement( "div", "day-disabled" );
                        currentDayColumn.appendChild( day );
                    }
    
                    if ( startFillingDays ) {
                        if ( bindingOptions.daysToShow.indexOf( actualDay ) > -1 ) {
                            renderControlViewMonthDay( bindingOptions, currentDayColumn, dayIndex - firstDayNumberInMonth, monthIndex, currentYear, mapRangeColors );
                        }
        
                        if ( ( dayIndex + 1 ) % 7 === 0 ) {
                            currentDayColumn = createElement( "div", "day-column" );
                            dayColumns.appendChild( currentDayColumn );
                            actualDay = 0;
                        }
                    }

                    actualDay++;
                }

                if ( firstDayNumberInMonth > 0 && isDefined( _elements_Day_Width ) && !bindingOptions.showMonthDayGaps && monthAdded ) {
                    month.style.marginLeft = -_elements_Day_Width + "px";
                }

                monthAdded = true;
            }
        }
    }

    function renderControlViewMonthDay( bindingOptions, currentDayColumn, dayNumber, month, year, mapRangeColors ) {
        var actualDay = dayNumber + 1,
            day = createElement( "div", "day" ),
            date = new Date( year, month, actualDay ),
            dateCount = _elements_DateCounts[ bindingOptions.element.id ][ toStorageDate( date ) ];

        day.title = getCustomFormattedDateText( bindingOptions.dayToolTipText, date );
        currentDayColumn.appendChild( day );

        day.onclick = function() {
            fireCustomTrigger( bindingOptions.onDayClick, date, dateCount );
        };

        var mapRangeColorsLength = bindingOptions.mapRangeColors.length,
            useMapRangeColor = null;
    
        for ( var mapRangeColorsIndex = 0; mapRangeColorsIndex < mapRangeColorsLength; mapRangeColorsIndex++ ) {
            var mapRangeColor = mapRangeColors[ mapRangeColorsIndex ];

            if ( dateCount >= mapRangeColor.minimum ) {
                useMapRangeColor = mapRangeColor;
            } else {
                break;
            }
        }

        if ( isDefined( useMapRangeColor ) && isHeatMapColorVisible( bindingOptions, useMapRangeColor.id ) ) {
            day.className += _string.space + useMapRangeColor.cssClassName;
        }

        if ( !isDefined( _elements_Day_Width ) && !bindingOptions.showMonthDayGaps ) {
            var marginLeft = getStyleValueByName( day, "margin-left" ),
                marginRight = getStyleValueByName( day, "margin-right" );
            
            _elements_Day_Width = day.offsetWidth + parseInt( marginLeft, 10 ) + parseInt( marginRight, 10 );
        }
    }

    function renderControlViewGuide( bindingOptions ) {
        if ( bindingOptions.showGuide ) {
            var guide = createElement( "div", "guide" );
            bindingOptions.element.appendChild( guide );
    
            var lessText = createElement( "div", "less-text" );
            lessText.innerHTML = _configuration.lessText;
            guide.appendChild( lessText );
    
            var days = createElement( "div", "days" );
            guide.appendChild( days );

            var mapRangeColors = bindingOptions.mapRangeColors.sort( function( a, b ) {
                return b.range - a.range;
            } );

            var mapRangeColorsLength = mapRangeColors.length;
    
            for ( var mapRangeColorsIndex = 0; mapRangeColorsIndex < mapRangeColorsLength; mapRangeColorsIndex++ ) {
                renderControlViewGuideDay( bindingOptions, days, mapRangeColors[ mapRangeColorsIndex ] );
            }
    
            var moreText = createElement( "div", "more-text" );
            moreText.innerHTML = _configuration.moreText;
            guide.appendChild( moreText );
        }
    }

    function renderControlViewGuideDay( bindingOptions, days, mapRangeColor ) {
        var day = createElement( "div" );
        day.title = mapRangeColor.tooltipText;
        days.appendChild( day );

        if ( isHeatMapColorVisible( bindingOptions, mapRangeColor.id ) ) {
            day.className = "day " + mapRangeColor.cssClassName;
        } else {
            day.className = "day";
        }

        day.onclick = function() {
            if ( !bindingOptions.currentView.colorsVisible.hasOwnProperty( mapRangeColor.id ) ) {
                bindingOptions.currentView.colorsVisible[ mapRangeColor.id ] = true;
            }

            if ( bindingOptions.currentView.colorsVisible[ mapRangeColor.id ] ) {
                day.className = "day";
            } else {
                day.className = "day " + mapRangeColor.cssClassName;
            }

            bindingOptions.currentView.colorsVisible[ mapRangeColor.id ] = !bindingOptions.currentView.colorsVisible[ mapRangeColor.id ];

            renderControl( bindingOptions );
        };
    }

    function isHeatMapColorVisible( bindingOptions, id ) {
        return !bindingOptions.currentView.colorsVisible.hasOwnProperty( id ) || bindingOptions.currentView.colorsVisible[ id ];
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Export
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function exportAllData( bindingOptions ) {
        var csvContents = getCsvContent( bindingOptions );

        if ( csvContents !== _string.empty ) {
            var tempLink = createElement( "a" );
            tempLink.style.display = "none";
            tempLink.setAttribute( "target", "_blank" );
            tempLink.setAttribute( "href", "data:text/csv;charset=utf-8," + encodeURIComponent( csvContents ) );
            tempLink.setAttribute( "download", getCsvFilename() );
    
            _parameter_Document.body.appendChild( tempLink );
            tempLink.click();
            _parameter_Document.body.removeChild( tempLink );
        }
    }

    function getCsvContent( bindingOptions ) {
        var csvData = _elements_DateCounts[ bindingOptions.element.id ],
            csvContents = [],
            csvStorageDates = [];

        csvContents.push( getCsvValueLine( [ getCsvValue( _configuration.dateText ), getCsvValue( _configuration.countText ) ] ) );

        for ( var storageDate1 in csvData ) {
            if ( csvData.hasOwnProperty( storageDate1 ) && storageDate1 !== "options" ) {
                csvStorageDates.push( storageDate1 );
            }
        }

        csvStorageDates.sort();

        var csvStorageDatesLength = csvStorageDates.length;

        for ( var csvStorageDateIndex = 0; csvStorageDateIndex < csvStorageDatesLength; csvStorageDateIndex++ ) {
            var storageDate2 = csvStorageDates[ csvStorageDateIndex ];

            if ( csvData.hasOwnProperty( storageDate2 ) && storageDate2 !== "options" ) {
                csvContents.push( getCsvValueLine( [ getCsvValue( storageDate2 ), getCsvValue( csvData[ storageDate2 ] ) ] ) );
            }
        }
        
        return csvContents.join( _string.newLine );
    }

    function getCsvFilename() {
        var date = new Date(),
            datePart = padNumber( date.getDate() ) + "-" + padNumber( date.getMonth() + 1 ) + "-" + date.getFullYear(),
            timePart = padNumber( date.getHours() ) + "-" + padNumber( date.getMinutes() );

        return datePart + "_" + timePart + ".csv";
    }

    function getCsvValue( text ) {
        text = text.toString().replace( /(\r\n|\n|\r)/gm, _string.empty ).replace( /(\s\s)/gm, _string.space );
        text = text.replace( /"/g, '""' );
        text = '"' + text + '"';

        return text;
    }

    function getCsvValueLine( csvValues ) {
        return csvValues.join( "," );
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Options
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function buildAttributeOptions( newOptions ) {
        var options = !isDefinedObject( newOptions ) ? {} : newOptions;
        options.showDayNames = getDefaultBoolean( options.showDayNames, true );
        options.showGuide = getDefaultBoolean( options.showGuide, true );
        options.showTitle = getDefaultBoolean( options.showTitle, true );
        options.showYearSelector = getDefaultBoolean( options.showYearSelector, true );
        options.showMonthDayGaps = getDefaultBoolean( options.showMonthDayGaps, true );
        options.showRefreshButton = getDefaultBoolean( options.showRefreshButton, false );
        options.showMonthNames = getDefaultBoolean( options.showMonthNames, true );
        options.showExportButton = getDefaultBoolean( options.showExportButton, false );

        if ( isInvalidOptionArray( options.monthsToShow ) ) {
            options.monthsToShow = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
        }

        if ( isInvalidOptionArray( options.daysToShow ) ) {
            options.daysToShow = [ 1, 2, 3, 4, 5, 6, 7 ];
        }

        options.mapRangeColors = getDefaultArray( options.mapRangeColors, [
            {
                minimum: 10,
                cssClassName: "day-color-1",
                tooltipText: "Day Color 1"
            },
            {
                minimum: 15,
                cssClassName: "day-color-2",
                tooltipText: "Day Color 2"
            },
            {
                minimum: 20,
                cssClassName: "day-color-3",
                tooltipText: "Day Color 3"
            },
            {
                minimum: 25,
                cssClassName: "day-color-4",
                tooltipText: "Day Color 4"
            }
        ] );

        var mapRangeColorsLength = options.mapRangeColors.length;

        for ( var mapRangeColorsIndex = 0; mapRangeColorsIndex < mapRangeColorsLength; mapRangeColorsIndex++ ) {
            if ( !isDefinedString( options.mapRangeColors[ mapRangeColorsIndex ].id ) ) {
                options.mapRangeColors[ mapRangeColorsIndex ].id = newGuid();
            }
        }

        options = buildAttributeOptionStrings( options );

        return buildAttributeOptionCustomTriggers( options );
    }

    function buildAttributeOptionStrings( options ) {
        options.titleText = getDefaultString( options.titleText, "Heat.js" );
        options.dayToolTipText = getDefaultString( options.dayToolTipText, "{d}{o} {mmmm} {yyyy}" );

        return options;
    }

    function buildAttributeOptionCustomTriggers( options ) {
        options.onDayClick = getDefaultFunction( options.onDayClick, null );
        options.onBackYear = getDefaultFunction( options.onBackYear, null );
        options.onNextYear = getDefaultFunction( options.onNextYear, null );
        options.onRefresh = getDefaultFunction( options.onRefresh, null );
        options.onBeforeRender = getDefaultFunction( options.onBeforeRender, null );
        options.onRenderComplete = getDefaultFunction( options.onRenderComplete, null );
        options.onDestroy = getDefaultFunction( options.onDestroy, null );
        options.onExport = getDefaultFunction( options.onExport, null );

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

    function getDayOrdinal( value ) {
        var result = _configuration.thText;

        if ( value === 31 || value === 21 || value === 1 ) {
            result = _configuration.stText;
        } else if ( value === 22 || value === 2 ) {
            result = _configuration.ndText;
        } else if ( value === 23 || value === 3 ) {
            result = _configuration.rdText;
        }

        return result;
    }

    function getCustomFormattedDateText( dateFormat, date ) {
        var result = dateFormat,
            weekDayNumber = getWeekdayNumber( date );

        result = result.replace( "{dddd}", _configuration.dayNames[ weekDayNumber ] );
        result = result.replace( "{dd}", padNumber( date.getDate() ) );
        result = result.replace( "{d}", date.getDate() );

        result = result.replace( "{o}", getDayOrdinal( date.getDate() ) );

        result = result.replace( "{mmmm}", _configuration.monthNames[ date.getMonth() ] );
        result = result.replace( "{mm}", padNumber( date.getMonth() + 1 ) );
        result = result.replace( "{m}", date.getMonth() + 1 );

        result = result.replace( "{yyyy}", date.getFullYear() );
        result = result.replace( "{yyy}", date.getFullYear().toString().substring( 1 ) );
        result = result.replace( "{yy}", date.getFullYear().toString().substring( 2 ) );
        result = result.replace( "{y}", parseInt( date.getFullYear().toString().substring( 2 ) ).toString() );

        return result;
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

    function getStyleValueByName( element, stylePropertyName ) {
        var value = null;

        if ( _parameter_Window.getComputedStyle ) {
            value = document.defaultView.getComputedStyle( element, null ).getPropertyValue( stylePropertyName ); 
        }  
        else if ( element.currentStyle ) {
            value = element.currentStyle[ stylePropertyName ];
        }                     

        return value;
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
     * String Handling
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function newGuid() {
        var result = [];

        for ( var charIndex = 0; charIndex < 32; charIndex++ ) {
            if ( charIndex === 8 || charIndex === 12 || charIndex === 16 || charIndex === 20 ) {
                result.push( "-" );
            }

            var character = Math.floor( Math.random() * 16 ).toString( 16 );
            result.push( character );
        }

        return result.join( _string.empty );
    }

    function padNumber( number ) {
        var numberString = number.toString();

        return numberString.length === 1 ? "0" + numberString : numberString;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public Functions:  Manage Dates
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    /**
     * addDate().
     * 
     * Adds a date for a specific element ID, and refreshes the UI (if specified). If the date already exists, its value is increased by one.
     * 
     * @public
     * 
     * @param       {string}    elementId                                   The Heat.js element ID that should show the new date.
     * @param       {Date}      date                                        The date to add.
     * @param       {boolean}   [triggerRefresh]                            States if the UI for the element ID should be refreshed (defaults to true).
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    this.addDate = function( elementId, date, triggerRefresh ) {
        if ( _elements_DateCounts.hasOwnProperty( elementId ) ) {
            triggerRefresh = !isDefinedBoolean( triggerRefresh ) ? true : triggerRefresh;

            var storageDate = toStorageDate( date );

            if ( !_elements_DateCounts[ elementId ].hasOwnProperty( storageDate ) ) {
                _elements_DateCounts[ elementId ][ storageDate ] = 0;
            }
    
            _elements_DateCounts[ elementId ][ storageDate ]++;

            if ( triggerRefresh ) {
                renderControl( _elements_DateCounts[ elementId ].options );
            }
        }

        return this;
    };

    /**
     * removeDate().
     * 
     * Removes a date for a specific element ID, and refreshes the UI (if specified). If the date already exists, its value is decreased by one.
     * 
     * @public
     * 
     * @param       {string}    elementId                                   The Heat.js element ID that should show the updated date.
     * @param       {Date}      date                                        The date to removed.
     * @param       {boolean}   [triggerRefresh]                            States if the UI for the element ID should be refreshed (defaults to true).
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    this.removeDate = function( elementId, date, triggerRefresh ) {
        if ( _elements_DateCounts.hasOwnProperty( elementId ) ) {
            var storageDate = toStorageDate( date );

            if ( _elements_DateCounts[ elementId ].hasOwnProperty( storageDate ) ) {
                triggerRefresh = !isDefinedBoolean( triggerRefresh ) ? true : triggerRefresh;

                _elements_DateCounts[ elementId ][ storageDate ]--;

                if ( triggerRefresh ) {
                    renderControl( _elements_DateCounts[ elementId ].options );
                }
            }
        }

        return this;
    };

    /**
     * reset().
     * 
     * Removes all the dates for a specific element ID, and refreshes the UI (if specified).
     * 
     * @public
     * 
     * @param       {string}    elementId                                   The Heat.js element ID that should be updated.
     * @param       {boolean}   [triggerRefresh]                            States if the UI for the element ID should be refreshed (defaults to true).
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    this.reset = function( elementId, triggerRefresh ) {
        if ( _elements_DateCounts.hasOwnProperty( elementId ) ) {
            triggerRefresh = !isDefinedBoolean( triggerRefresh ) ? true : triggerRefresh;
            
            var bindingOptions = _elements_DateCounts[ elementId ].options;

            _elements_DateCounts[ elementId ] = {};
            _elements_DateCounts[ elementId ].options = bindingOptions;

            if ( triggerRefresh ) {
                renderControl( _elements_DateCounts[ elementId ].options );
            }
        }

        return this;
    };

    function toStorageDate( date ) {
        return date.getFullYear() + "-" + padNumber( date.getMonth() + 1 ) + "-" + padNumber( date.getDate() );
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public Functions:  Manage Instances
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    /**
     * refresh().
     * 
     * Refreshes a Heat.js instance.
     * 
     * @public
     * 
     * @param       {string}    elementId                                   The Heat.js element ID that should be refreshed.
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    this.refresh = function( elementId ) {
        if ( _elements_DateCounts.hasOwnProperty( elementId ) ) {
            var bindingOptions = _elements_DateCounts[ elementId ].options;

            renderControl( bindingOptions );
            fireCustomTrigger( bindingOptions.onRefresh, bindingOptions.element );
        }

        return this;
    };

    /**
     * refreshAll().
     * 
     * Refreshes all of the rendered Heat.js instances.
     * 
     * @public
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    this.refreshAll = function() {
        for ( var elementId in _elements_DateCounts ) {
            if ( _elements_DateCounts.hasOwnProperty( elementId ) ) {
                var bindingOptions = _elements_DateCounts[ elementId ].options;

                renderControl( bindingOptions );
                fireCustomTrigger( bindingOptions.onRefresh, bindingOptions.element );
            }
        }

        return this;
    };


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public Functions:  Destroying
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    /**
     * destroyAll().
     * 
     * Reverts all rendered elements back to their original state (without render attributes).
     * 
     * @public
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    this.destroyAll = function() {
        for ( var elementId in _elements_DateCounts ) {
            if ( _elements_DateCounts.hasOwnProperty( elementId ) ) {
                var bindingOptions = _elements_DateCounts[ elementId ].options;

                bindingOptions.element.innerHTML = _string.empty;
                bindingOptions.element.className = _string.empty;

                fireCustomTrigger( bindingOptions.onDestroy, bindingOptions.element );
            }
        }

        _elements_DateCounts = {};

        return this;
    };

    /**
     * destroy().
     * 
     * Reverts an element back to its original state (without render attributes).
     * 
     * @public
     * 
     * @param       {string}    elementId                                   The Heat.js element ID to destroy.
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    this.destroy = function( elementId ) {
        if ( _elements_DateCounts.hasOwnProperty( elementId ) ) {
            var bindingOptions = _elements_DateCounts[ elementId ].options;

            bindingOptions.element.innerHTML = _string.empty;
            bindingOptions.element.className = _string.empty;

            fireCustomTrigger( bindingOptions.onDestroy, bindingOptions.element );

            delete _elements_DateCounts[ elementId ];
        }

        return this;
    };


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
     * @param       {Object}   newConfiguration                             All the configuration options that should be set (refer to "Options" documentation for properties).
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

        buildDefaultConfigurationStrings();
        buildDefaultConfigurationArrays();
    }

    function buildDefaultConfigurationStrings() {
        _configuration.stText = getDefaultString( _configuration.stText, "st" );
        _configuration.ndText = getDefaultString( _configuration.ndText, "nd" );
        _configuration.rdText = getDefaultString( _configuration.rdText, "rd" );
        _configuration.thText = getDefaultString( _configuration.thText, "th" );
        _configuration.backButtonText = getDefaultString( _configuration.backButtonText, "Back" );
        _configuration.nextButtonText = getDefaultString( _configuration.nextButtonText, "Next" );
        _configuration.refreshButtonText = getDefaultString( _configuration.refreshButtonText, "Refresh" );
        _configuration.exportButtonText = getDefaultString( _configuration.exportButtonText, "Export" );
        _configuration.lessText = getDefaultString( _configuration.lessText, "Less" );
        _configuration.moreText = getDefaultString( _configuration.moreText, "More" );
        _configuration.dateText = getDefaultString( _configuration.dateText, "Date" );
        _configuration.countText = getDefaultString( _configuration.countText, "Count" );
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
        return "0.6.0";
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