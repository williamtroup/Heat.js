/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps and charts to visualize date-based activity and trends.
 * 
 * @file        observe.js
 * @version     v1.7.0
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
            dash: "-",
            underscore: "_"
        },

        // Variables: Elements
        _elements_Type = {},
        _elements_Day_Width = null,

        // Variables: Date Counts
        _elements_DateCounts = {},
        _elements_DateCounts_DefaultType = "None",

        // Variables: View
        _elements_View_Map = 1,
        _elements_View_Chart = 2,

        // Variables: Attribute Names
        _attribute_Name_Options = "data-heat-options";

    
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render
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
                    renderControl( renderBindingOptions( bindingOptions.result, element ) );

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

    function renderBindingOptions( data, element ) {
        var bindingOptions = buildAttributeOptions( data );
        bindingOptions.currentView = {};
        bindingOptions.currentView.element = element;
        bindingOptions.currentView.tooltip = null;
        bindingOptions.currentView.tooltipTimer = null;
        bindingOptions.currentView.mapContents = null;
        bindingOptions.currentView.mapContentsScrollLeft = 0;
        bindingOptions.currentView.chartContents = null;
        bindingOptions.currentView.chartContentsScrollLeft = 0;
        bindingOptions.currentView.colorsVisible = {};
        bindingOptions.currentView.year = bindingOptions.year;
        bindingOptions.currentView.type = _elements_DateCounts_DefaultType;

        if ( !isDefinedString( bindingOptions.view ) || bindingOptions.view.toLowerCase() === "map" ) {
            bindingOptions.currentView.view = _elements_View_Map;
        } else if ( bindingOptions.view.toLowerCase() === "chart" ) {
            bindingOptions.currentView.view = _elements_View_Chart;
        } else {
            bindingOptions.currentView.view = _elements_View_Map;
        }

        return bindingOptions;
    }

    function renderControl( bindingOptions ) {
        fireCustomTrigger( bindingOptions.onBeforeRender, bindingOptions.currentView.element );

        if ( !isDefinedString( bindingOptions.currentView.element.id ) ) {
            bindingOptions.currentView.element.id = newGuid();
        }

        bindingOptions.currentView.element.removeAttribute( _attribute_Name_Options );

        createDateStorageForElement( bindingOptions.currentView.element.id, bindingOptions );
        renderControlContainer( bindingOptions );
        fireCustomTrigger( bindingOptions.onRenderComplete, bindingOptions.currentView.element );
    }

    function renderControlContainer( bindingOptions ) {
        if ( isDefined( bindingOptions.currentView.mapContents ) ) {
            bindingOptions.currentView.mapContentsScrollLeft = bindingOptions.currentView.mapContents.scrollLeft;
        }

        if ( isDefined( bindingOptions.currentView.chartContents ) ) {
            bindingOptions.currentView.chartContentsScrollLeft = bindingOptions.currentView.chartContents.scrollLeft;
        }

        bindingOptions.currentView.element.className = "heat-js";
        bindingOptions.currentView.element.innerHTML = _string.empty;

        renderControlToolTip( bindingOptions );
        renderControlTitleBar( bindingOptions );
        renderControlMap( bindingOptions );
        renderControlChart( bindingOptions );

        if ( bindingOptions.currentView.view === _elements_View_Map ) {
            bindingOptions.currentView.mapContents.style.display = "block";
            bindingOptions.currentView.chartContents.style.display = "none";
        } else {
            bindingOptions.currentView.mapContents.style.display = "none";
            bindingOptions.currentView.chartContents.style.display = "block";
        }
    }

    function isHeatMapColorVisible( bindingOptions, id ) {
        return !bindingOptions.currentView.colorsVisible.hasOwnProperty( id ) || bindingOptions.currentView.colorsVisible[ id ];
    }

    function createDateStorageForElement( elementId, bindingOptions ) {
        _elements_DateCounts[ elementId ] = {
            options: bindingOptions,
            type: {},
            types: 1
        };

        _elements_DateCounts[ elementId ].type[ _elements_DateCounts_DefaultType ] = {};
    }

    function updateMapRangeColorToggles( bindingOptions, flag ) {
        var mapRangeColorsLength = bindingOptions.mapRangeColors.length;

        for ( var mapRangeColorsIndex = 0; mapRangeColorsIndex < mapRangeColorsLength; mapRangeColorsIndex++ ) {
            bindingOptions.currentView.colorsVisible[ bindingOptions.mapRangeColors[ mapRangeColorsIndex ].id ] = flag;
        }

        renderControlContainer( bindingOptions );
    }

    function getLargestValueForYear( bindingOptions ) {
        var result = 0,
            data = getCurrentViewData( bindingOptions );

        for ( var monthIndex = 0; monthIndex < 12; monthIndex++ ) {
            var totalDaysInMonth = getTotalDaysInMonth( bindingOptions.currentView.year, monthIndex );
    
            for ( var dayIndex = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
                var storageDate = toStorageDate( new Date( bindingOptions.currentView.year, monthIndex, dayIndex + 1 ) );

                if ( data.hasOwnProperty( storageDate ) ) {
                    result = Math.max( result, parseInt( data[ storageDate ] ) );
                }
            }
        }

        return result;
    }

    function getMapRangeColor( mapRangeColors, dateCount ) {
        var mapRangeColorsLength = mapRangeColors.length,
            useMapRangeColor = null;

        for ( var mapRangeColorsIndex = 0; mapRangeColorsIndex < mapRangeColorsLength; mapRangeColorsIndex++ ) {
            var mapRangeColor = mapRangeColors[ mapRangeColorsIndex ];

            if ( dateCount >= mapRangeColor.minimum ) {
                useMapRangeColor = mapRangeColor;
            } else {
                break;
            }
        }

        return useMapRangeColor;
    }

    function getCurrentViewData( bindingOptions ) {
        return _elements_DateCounts[ bindingOptions.currentView.element.id ].type[ bindingOptions.currentView.type ];
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  ToolTip
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderControlToolTip( bindingOptions ) {
        if ( !isDefined( bindingOptions.currentView.tooltip ) ) {
            bindingOptions.currentView.tooltip = createElement( _parameter_Document.body, "div", "heat-js-tooltip" );
            bindingOptions.currentView.tooltip.style.display = "none";
    
            _parameter_Document.body.addEventListener( "mousemove", function() {
                hideToolTip( bindingOptions );
            } );
    
            _parameter_Document.addEventListener( "scroll", function() {
                hideToolTip( bindingOptions );
            } );
        }
    }

    function addToolTip( element, bindingOptions, text ) {
        if ( element !== null ) {
            element.onmousemove = function( e ) {
                showToolTip( e, bindingOptions, text );
            };
        }
    }

    function showToolTip( e, bindingOptions, text ) {
        cancelBubble( e );
        hideToolTip( bindingOptions );

        bindingOptions.currentView.tooltipTimer = setTimeout( function() {
            bindingOptions.currentView.tooltip.innerHTML = text;
            bindingOptions.currentView.tooltip.style.display = "block";

            showElementAtMousePosition( e, bindingOptions.currentView.tooltip );
        }, bindingOptions.tooltipDelay );
    }

    function hideToolTip( bindingOptions ) {
        if ( isDefined( bindingOptions.currentView.tooltip ) ) {
            if ( isDefined( bindingOptions.currentView.tooltipTimer ) ) {
                clearTimeout( bindingOptions.currentView.tooltipTimer );
                bindingOptions.currentView.tooltipTimer = null;
            }
    
            if ( bindingOptions.currentView.tooltip.style.display === "block" ) {
                bindingOptions.currentView.tooltip.style.display = "none";
            }
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Title Bar
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderControlTitleBar( bindingOptions ) {
        if ( bindingOptions.showTitle || bindingOptions.showYearSelector || bindingOptions.showRefreshButton || bindingOptions.showExportButton ) {
            var titleBar = createElement( bindingOptions.currentView.element, "div", "title-bar" ),
                title = createElement( titleBar, "div", "title" );

            createElement( title, "div", "down-arrow" );

            if ( bindingOptions.showTitle ) {
                title.innerHTML += bindingOptions.titleText;
            }

            var titlesList = createElement( title, "div", "titles-list" ),
                titles = createElement( titlesList, "div", "titles" ),
                optionMap = createElementWithHTML( titles, "div", "title", _configuration.mapText ),
                optionChart = createElementWithHTML( titles, "div", "title", _configuration.chartText );

            if ( bindingOptions.currentView.view === _elements_View_Map ) {
                addClass( optionMap, "title-active" );
                
            } else {
                optionMap.onclick = function() {
                    bindingOptions.currentView.view = _elements_View_Map;

                    renderControlContainer( bindingOptions );
                };
            }

            if ( bindingOptions.currentView.view === _elements_View_Chart ) {
                addClass( optionChart, "title-active" );

            } else {
                optionChart.onclick = function() {
                    bindingOptions.currentView.view = _elements_View_Chart;

                    renderControlContainer( bindingOptions );
                };
            }

            if ( bindingOptions.showExportButton ) {
                var exportData = createElementWithHTML( titleBar, "button", "export", _configuration.exportButtonText );
        
                exportData.onclick = function() {
                    exportAllData( bindingOptions );
                    fireCustomTrigger( bindingOptions.onExport, bindingOptions.currentView.element );
                };
            }

            if ( bindingOptions.showRefreshButton ) {
                var refresh = createElementWithHTML( titleBar, "button", "refresh", _configuration.refreshButtonText );
        
                refresh.onclick = function() {
                    renderControlContainer( bindingOptions );
                    fireCustomTrigger( bindingOptions.onRefresh, bindingOptions.currentView.element );
                };
            }
    
            if ( bindingOptions.showYearSelector ) {
                var back = createElementWithHTML( titleBar, "button", "back", _configuration.backButtonText );
        
                back.onclick = function() {
                    bindingOptions.currentView.year--;
        
                    renderControlContainer( bindingOptions );
                    fireCustomTrigger( bindingOptions.onBackYear, bindingOptions.currentView.year );
                };

                bindingOptions.currentView.yearText = createElementWithHTML( titleBar, "div", "year-text", bindingOptions.currentView.year );

                createElement( bindingOptions.currentView.yearText, "div", "down-arrow" );

                if ( bindingOptions.showYearSelectionDropDown ) {
                    var yearList = createElement( bindingOptions.currentView.yearText, "div", "years-list" ),
                        years = createElement( yearList, "div", "years" ),
                        thisYear = new Date().getFullYear();

                    for ( var currentYear = thisYear - bindingOptions.extraSelectionYears; currentYear < thisYear + bindingOptions.extraSelectionYears; currentYear++ ) {
                        renderControlTitleBarYear( bindingOptions, years, currentYear );
                    }
                }

                var next = createElementWithHTML( titleBar, "button", "next", _configuration.nextButtonText );

                next.onclick = function() {
                    bindingOptions.currentView.year++;
        
                    renderControlContainer( bindingOptions );
                    fireCustomTrigger( bindingOptions.onNextYear, bindingOptions.currentView.year );
                };
            }
        }
    }

    function renderControlTitleBarYear( bindingOptions, years, currentYear ) {
        var year = createElementWithHTML( years, "div", "year", currentYear );

        if ( bindingOptions.currentView.year !== currentYear ) {
            year.onclick = function() {
                bindingOptions.currentView.year = currentYear;
    
                renderControlContainer( bindingOptions );
                fireCustomTrigger( bindingOptions.onNextYear, bindingOptions.currentView.year );
            };

        } else {
            addClass( year, "year-active" );
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Map
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderControlMap( bindingOptions ) {
        bindingOptions.currentView.mapContents = createElement( bindingOptions.currentView.element, "div", "map-contents" );

        var map = createElement( bindingOptions.currentView.mapContents, "div", "map" ),
            currentYear = bindingOptions.currentView.year,
            monthAdded = false;

        renderControlChartContents( bindingOptions );
        renderControlViewGuide( bindingOptions );

        if ( bindingOptions.showDayNames ) {
            var days = createElement( map, "div", "days" );

            if ( !bindingOptions.showMonthNames || bindingOptions.placeMonthNamesOnTheBottom ) {
                days.className = "days-months-bottom";
            }
    
            for ( var dayNameIndex = 0; dayNameIndex < 7; dayNameIndex++ ) {
                if ( bindingOptions.daysToShow.indexOf( dayNameIndex + 1 ) > -1 ) {
                    createElementWithHTML( days, "div", "day-name", _configuration.dayNames[ dayNameIndex ] );
                }
            }
        }

        var months = createElement( map, "div", "months" ),
            mapRangeColors = bindingOptions.mapRangeColors.sort( function( a, b ) {
                return b.range - a.range;
            } );

        for ( var monthIndex = 0; monthIndex < 12; monthIndex++ ) {
            if ( bindingOptions.monthsToShow.indexOf( monthIndex + 1 ) > -1 ) {
                var month = createElement( months, "div", "month" );
    
                if ( bindingOptions.showMonthNames && !bindingOptions.placeMonthNamesOnTheBottom ) {
                    createElementWithHTML( month, "div", "month-name", _configuration.monthNames[ monthIndex ] );
                }
    
                var dayColumns = createElement( month, "div", "day-columns" ),
                    totalDaysInMonth = getTotalDaysInMonth( currentYear, monthIndex ),
                    currentDayColumn = createElement( dayColumns, "div", "day-column" ),
                    startFillingDays = false,
                    firstDayInMonth = new Date( currentYear, monthIndex, 1 ),
                    firstDayNumberInMonth = getWeekdayNumber( firstDayInMonth ),
                    actualDay = 1;
    
                totalDaysInMonth += firstDayNumberInMonth;
    
                for ( var dayIndex = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
                    if ( dayIndex >= firstDayNumberInMonth ) {
                        startFillingDays = true;
    
                    } else {
                        createElement( currentDayColumn, "div", "day-disabled" );
                    }
    
                    if ( startFillingDays ) {
                        var day = null;

                        if ( bindingOptions.daysToShow.indexOf( actualDay ) > -1 ) {
                            day = renderControlMapMonthDay( bindingOptions, currentDayColumn, dayIndex - firstDayNumberInMonth, monthIndex, currentYear, mapRangeColors );
                        }
        
                        if ( ( dayIndex + 1 ) % 7 === 0 ) {
                            currentDayColumn = createElement( dayColumns, "div", "day-column" );
                            actualDay = 0;

                            if ( !isDefined( _elements_Day_Width ) && isDefined( day ) ) {
                                var marginLeft = getStyleValueByName( day, "margin-left", true ),
                                    marginRight = getStyleValueByName( day, "margin-right", true );
                                
                                _elements_Day_Width = day.offsetWidth + marginLeft + marginRight;
                            }
                        }
                    }

                    actualDay++;
                }

                if ( bindingOptions.showMonthNames && bindingOptions.placeMonthNamesOnTheBottom ) {
                    createElementWithHTML( month, "div", "month-name-bottom", _configuration.monthNames[ monthIndex ] );
                }

                if ( monthAdded && isDefined( _elements_Day_Width ) ) {
                    if ( firstDayNumberInMonth > 0 && !bindingOptions.showMonthDayGaps ) {
                        month.style.marginLeft = -_elements_Day_Width + "px";
                    } else if ( firstDayNumberInMonth === 0 && bindingOptions.showMonthDayGaps ) {
                        month.style.marginLeft = _elements_Day_Width + "px";
                    }
                }

                monthAdded = true;
            }
        }
        
        if ( bindingOptions.keepScrollPositions ) {
            bindingOptions.currentView.mapContents.scrollLeft = bindingOptions.currentView.mapContentsScrollLeft;
        }
    }

    function renderControlMapMonthDay( bindingOptions, currentDayColumn, dayNumber, month, year, mapRangeColors ) {
        var actualDay = dayNumber + 1,
            day = createElement( currentDayColumn, "div", "day" ),
            date = new Date( year, month, actualDay ),
            dateCount = _elements_DateCounts[ bindingOptions.currentView.element.id ].type[ bindingOptions.currentView.type ][ toStorageDate( date ) ];

        dateCount = isDefinedNumber( dateCount ) ? dateCount : 0;

        if ( isDefinedFunction( bindingOptions.onDayToolTipRender ) ) {
            addToolTip( day, bindingOptions, fireCustomTrigger( bindingOptions.onDayToolTipRender, date, dateCount ) );
        } else {
            addToolTip( day, bindingOptions, getCustomFormattedDateText( bindingOptions.dayToolTipText, date ) );
        }

        if ( bindingOptions.showDayNumbers && dateCount > 0 ) {
            day.innerHTML = dateCount.toString();
        }

        if ( isDefinedFunction( bindingOptions.onDayClick ) ) {
            day.onclick = function() {
                fireCustomTrigger( bindingOptions.onDayClick, date, dateCount );
            };

        } else {
            addClass( day, "no-hover" );
        }

        var useMapRangeColor = getMapRangeColor( mapRangeColors, dateCount );

        if ( isDefined( useMapRangeColor ) && isHeatMapColorVisible( bindingOptions, useMapRangeColor.id ) ) {
            addClass( day, useMapRangeColor.cssClassName );
        }

        return day;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Chart
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderControlChartContents( bindingOptions ) {
        bindingOptions.currentView.chartContents = createElement( bindingOptions.currentView.element, "div", "chart-contents" );
    }

    function renderControlChart( bindingOptions ) {
        var chart = createElement( bindingOptions.currentView.chartContents, "div", "chart" ),
            labels = createElement( chart, "div", "labels" ),
            dayLines = createElement( chart, "div", "day-lines" ),
            mapRangeColors = bindingOptions.mapRangeColors.sort( function( a, b ) {
                return b.range - a.range;
            } ),
            largestValueForCurrentYear = getLargestValueForYear( bindingOptions ),
            pixelsPerNumbers = bindingOptions.currentView.mapContents.offsetHeight / largestValueForCurrentYear,
            currentYear = bindingOptions.currentView.year,
            totalDays = 0,
            labelsWidth = 0;

        if ( largestValueForCurrentYear > 0 && bindingOptions.showChartYLabels ) {
            createElementWithHTML( labels, "div", "label-0", largestValueForCurrentYear.toString() );
            createElementWithHTML( labels, "div", "label-25", ( Math.floor( largestValueForCurrentYear / 4 ) * 3 ).toString() );
            createElementWithHTML( labels, "div", "label-50", Math.floor( largestValueForCurrentYear / 2 ).toString() );
            createElementWithHTML( labels, "div", "label-75", Math.floor( largestValueForCurrentYear / 4 ).toString() );
            createElementWithHTML( labels, "div", "label-100", "0" );

            labelsWidth = labels.offsetWidth + getStyleValueByName( labels, "margin-right", true );

        } else {
            labels.parentNode.removeChild( labels );
            labels = null;
        }

        if ( largestValueForCurrentYear === 0 ) {
            chart.style.minHeight = bindingOptions.currentView.mapContents.offsetHeight + "px";

            if ( isDefined( labels ) ) {
                labels.style.display = "none";
            }

        } else {
            var totalMonths = 0;

            for ( var monthIndex1 = 0; monthIndex1 < 12; monthIndex1++ ) {
                if ( bindingOptions.monthsToShow.indexOf( monthIndex1 + 1 ) > -1 ) {
                    var totalDaysInMonth = getTotalDaysInMonth( currentYear, monthIndex1 ),
                        actualDay = 1;
                    
                    totalMonths++;

                    for ( var dayIndex = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
                        if ( bindingOptions.daysToShow.indexOf( actualDay ) > -1 ) {
                            renderControlChartDay( dayLines, bindingOptions, dayIndex + 1, monthIndex1, currentYear, mapRangeColors, pixelsPerNumbers );
                        }
        
                        if ( ( dayIndex + 1 ) % 7 === 0 ) {
                            actualDay = 0;
                        }
    
                        actualDay++;
                        totalDays++;
                    }
                }
            }

            if ( bindingOptions.showMonthNames ) {
                var chartMonths = createElement( bindingOptions.currentView.chartContents, "div", "chart-months " ),
                    linesWidth = dayLines.offsetWidth / totalMonths;

                for ( var monthIndex2 = 0; monthIndex2 < 12; monthIndex2++ ) {
                    if ( bindingOptions.monthsToShow.indexOf( monthIndex2 + 1 ) > -1 ) {
                        var monthName = createElementWithHTML( chartMonths, "div", "month-name", _configuration.monthNames[ monthIndex2 ] );
                        monthName.style.marginLeft = labelsWidth + ( linesWidth * monthIndex2 ) + "px";
                    }
                }

                chartMonths.style.width = dayLines.offsetWidth + "px";

                var monthNameSpace = createElement( chartMonths, "div", "month-name-space" );
                monthNameSpace.style.height = chartMonths.offsetHeight + "px";
                monthNameSpace.style.width = labelsWidth + "px";
            }
    
            if ( bindingOptions.keepScrollPositions ) {
                bindingOptions.currentView.chartContents.scrollLeft = bindingOptions.currentView.chartContentsScrollLeft;
            }
        }
    }

    function renderControlChartDay( dayLines, bindingOptions, day, month, year, mapRangeColors, pixelsPerNumbers ) {
        var date = new Date( year, month, day ),
            dayLine = createElement( dayLines, "div", "day-line" ),
            dateCount = getCurrentViewData( bindingOptions )[ toStorageDate( date ) ];

        dateCount = isDefinedNumber( dateCount ) ? dateCount : 0;

        if ( isDefinedFunction( bindingOptions.onDayToolTipRender ) ) {
            addToolTip( dayLine, bindingOptions, fireCustomTrigger( bindingOptions.onDayToolTipRender, date, dateCount ) );
        } else {
            addToolTip( dayLine, bindingOptions, getCustomFormattedDateText( bindingOptions.dayToolTipText, date ) );
        }

        dayLine.style.height = ( dateCount * pixelsPerNumbers ) + "px";
        dayLine.style.setProperty( "border-bottom-width", "0", "important" );

        if ( isDefinedFunction( bindingOptions.onDayClick ) ) {
            dayLine.onclick = function() {
                fireCustomTrigger( bindingOptions.onDayClick, date, dateCount );
            };

        } else {
            addClass( dayLine, "no-hover" );
        }

        var useMapRangeColor = getMapRangeColor( mapRangeColors, dateCount );

        if ( isDefined( useMapRangeColor ) && isHeatMapColorVisible( bindingOptions, useMapRangeColor.id ) ) {
            addClass( dayLine, useMapRangeColor.cssClassName );
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Guide
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderControlViewGuide( bindingOptions ) {
        var guide = createElement( bindingOptions.currentView.element, "div", "guide" ),
            mapTypes = createElement( guide, "div", "map-types" ),
            noneTypeCount = 0;

        for ( var storageDate in _elements_DateCounts[ bindingOptions.currentView.element.id ].type[ _elements_DateCounts_DefaultType ] ) {
            if ( _elements_DateCounts[ bindingOptions.currentView.element.id ].type[ _elements_DateCounts_DefaultType ].hasOwnProperty( storageDate ) ) {
                noneTypeCount++;
                break;
            }
        }

        if ( _elements_DateCounts[ bindingOptions.currentView.element.id ].types > 1 ) {
            for ( var type in _elements_DateCounts[ bindingOptions.currentView.element.id ].type ) {
                if ( type !== _elements_DateCounts_DefaultType || noneTypeCount > 0 ) {
                    if ( noneTypeCount === 0 && bindingOptions.currentView.type === _elements_DateCounts_DefaultType ) {
                        bindingOptions.currentView.type = type;
                    }

                    renderControlViewGuideTypeButton( bindingOptions, mapTypes, type );
                }
            }
        }

        if ( bindingOptions.showGuide ) {
            var mapToggles = createElement( guide, "div", "map-toggles" ),
                lessText = createElementWithHTML( mapToggles, "div", "less-text", _configuration.lessText );
    
            if ( bindingOptions.mapTogglesEnabled ) {
                lessText.onclick = function() {
                    updateMapRangeColorToggles( bindingOptions, false );
                };
    
            } else {
                addClass( lessText, "no-click" );
            }
    
            var days = createElement( mapToggles, "div", "days" ),
                mapRangeColors = bindingOptions.mapRangeColors.sort( function( a, b ) {
                    return b.range - a.range;
                } ),
                mapRangeColorsLength = mapRangeColors.length;
    
            for ( var mapRangeColorsIndex = 0; mapRangeColorsIndex < mapRangeColorsLength; mapRangeColorsIndex++ ) {
                renderControlViewGuideDay( bindingOptions, days, mapRangeColors[ mapRangeColorsIndex ] );
            }
    
            var moreText = createElementWithHTML( mapToggles, "div", "more-text", _configuration.moreText );
    
            if ( bindingOptions.mapTogglesEnabled ) {
                moreText.onclick = function() {
                    updateMapRangeColorToggles( bindingOptions, true );
                };
    
            } else {
                addClass( moreText, "no-click" );
            }
        }
    }

    function renderControlViewGuideTypeButton( bindingOptions, mapTypes, type ) {
        var typeButton = createElementWithHTML( mapTypes, "button", "type", type );

        if ( bindingOptions.currentView.type === type ) {
            addClass( typeButton, "active" );
        }

        typeButton.onclick = function() {
            if ( bindingOptions.currentView.type !== type ) {
                bindingOptions.currentView.type = type;

                fireCustomTrigger( bindingOptions.onTypeSwitch, type );
                renderControlContainer( bindingOptions );
            }
        };
    }

    function renderControlViewGuideDay( bindingOptions, days, mapRangeColor ) {
        var day = createElement( days, "div" );

        addToolTip( day, bindingOptions, mapRangeColor.tooltipText );

        if ( isHeatMapColorVisible( bindingOptions, mapRangeColor.id ) ) {
            day.className = "day " + mapRangeColor.cssClassName;
        } else {
            day.className = "day";
        }

        if ( bindingOptions.mapTogglesEnabled ) {
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
    
                renderControlContainer( bindingOptions );
            };

        } else {
            addClass( day, "no-hover" );
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Export
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function exportAllData( bindingOptions ) {
        var contents = null,
            contentsMimeType = getExportMimeType( bindingOptions );

        if ( bindingOptions.exportType.toLowerCase() === "csv" ) {
            contents = getCsvContent( bindingOptions );
        } else if ( bindingOptions.exportType.toLowerCase() === "json" ) {
            contents = getJsonContent( bindingOptions );
        }

        if ( contents !== _string.empty ) {
            var tempLink = createElement( _parameter_Document.body, "a" );
            tempLink.style.display = "none";
            tempLink.setAttribute( "target", "_blank" );
            tempLink.setAttribute( "href", "data:" + contentsMimeType + ";charset=utf-8," + encodeURIComponent( contents ) );
            tempLink.setAttribute( "download", getExportFilename( bindingOptions ) );
            tempLink.click();
            
            _parameter_Document.body.removeChild( tempLink );
        }
    }

    function getCsvContent( bindingOptions ) {
        var csvData = getCurrentViewData( bindingOptions ),
            csvContents = [],
            csvStorageDates = [];

        csvContents.push( getCsvValueLine( [ getCsvValue( _configuration.dateText ), getCsvValue( _configuration.countText ) ] ) );

        for ( var storageDate1 in csvData ) {
            if ( csvData.hasOwnProperty( storageDate1 ) ) {
                csvStorageDates.push( storageDate1 );
            }
        }

        csvStorageDates.sort();

        if ( bindingOptions.exportOnlyYearBeingViewed ) {
            for ( var monthIndex = 0; monthIndex < 12; monthIndex++ ) {
                var totalDaysInMonth = getTotalDaysInMonth( bindingOptions.currentView.year, monthIndex );
        
                for ( var dayIndex = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
                    var storageDate2 = toStorageDate( new Date( bindingOptions.currentView.year, monthIndex, dayIndex + 1 ) );

                    if ( csvData.hasOwnProperty( storageDate2 ) ) {
                        csvContents.push( getCsvValueLine( [ getCsvValue( storageDate2 ), getCsvValue( csvData[ storageDate2 ] ) ] ) );
                    }
                }
            }

        } else {
            var csvStorageDatesLength = csvStorageDates.length;

            for ( var csvStorageDateIndex = 0; csvStorageDateIndex < csvStorageDatesLength; csvStorageDateIndex++ ) {
                var storageDate3 = csvStorageDates[ csvStorageDateIndex ];
    
                if ( csvData.hasOwnProperty( storageDate3 ) ) {
                    csvContents.push( getCsvValueLine( [ getCsvValue( storageDate3 ), getCsvValue( csvData[ storageDate3 ] ) ] ) );
                }
            }
        }
        
        return csvContents.join( _string.newLine );
    }

    function getJsonContent( bindingOptions ) {
        return JSON.stringify( getCurrentViewData( bindingOptions ) );
    }

    function getExportMimeType( bindingOptions ) {
        var result = null;

        if ( bindingOptions.exportType.toLowerCase() === "csv" ) {
            result = "text/csv";
        } else if ( bindingOptions.exportType.toLowerCase() === "json" ) {
            result = "application/json";
        }

        return result;
    }

    function getExportFilename( bindingOptions ) {
        var date = new Date(),
            datePart = padNumber( date.getDate() ) + _string.dash + padNumber( date.getMonth() + 1 ) + _string.dash + date.getFullYear(),
            timePart = padNumber( date.getHours() ) + _string.dash + padNumber( date.getMinutes() ),
            filenameStart = _string.empty;

        if ( bindingOptions.currentView.type !== _elements_DateCounts_DefaultType ) {
            filenameStart = bindingOptions.currentView.type.toLowerCase().replace( _string.space, _string.underscore ) + _string.underscore;
        }

        return filenameStart + datePart + _string.underscore + timePart + "." + bindingOptions.exportType.toLowerCase();
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
        options.mapTogglesEnabled = getDefaultBoolean( options.mapTogglesEnabled, true );
        options.placeMonthNamesOnTheBottom = getDefaultBoolean( options.placeMonthNamesOnTheBottom, false );
        options.exportOnlyYearBeingViewed = getDefaultBoolean( options.exportOnlyYearBeingViewed, true );
        options.year = getDefaultNumber( options.year, new Date().getFullYear() );
        options.showDayNumbers = getDefaultBoolean( options.showDayNumbers, false );
        options.keepScrollPositions = getDefaultBoolean( options.keepScrollPositions, false );
        options.extraSelectionYears = getDefaultNumber( options.extraSelectionYears, 50 );
        options.showYearSelectionDropDown = getDefaultBoolean( options.showYearSelectionDropDown, true );
        options.view = getDefaultString( options.view, null );
        options.showChartYLabels = getDefaultBoolean( options.showChartYLabels, true );
        options.tooltipDelay = getDefaultNumber( options.tooltipDelay, 1000 );
        options.exportType = getDefaultString( options.exportType, "csv" );

        if ( isInvalidOptionArray( options.monthsToShow ) ) {
            options.monthsToShow = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
        }

        if ( isInvalidOptionArray( options.daysToShow ) ) {
            options.daysToShow = [ 1, 2, 3, 4, 5, 6, 7 ];
        }

        options = buildAttributeOptionMapRanges( options );
        options = buildAttributeOptionStrings( options );

        return buildAttributeOptionCustomTriggers( options );
    }

    function buildAttributeOptionMapRanges( options ) {
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

        return options;
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
        options.onSetYear = getDefaultFunction( options.onSetYear, null );
        options.onTypeSwitch = getDefaultFunction( options.onTypeSwitch, null );
        options.onDayToolTipRender = getDefaultFunction( options.onDayToolTipRender, null );
        options.onAdd = getDefaultFunction( options.onAdd, null );
        options.onRemove = getDefaultFunction( options.onRemove, null );
        options.onReset = getDefaultFunction( options.onReset, null );

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

    function createElement( container, type, className ) {
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

        container.appendChild( result );

        return result;
    }

    function createElementWithHTML( container, type, className, html ) {
        var element = createElement( container, type, className );
        element.innerHTML = html;

        return element;
    }

    function getStyleValueByName( element, stylePropertyName, toNumber ) {
        var value = null;

        toNumber = isDefined( toNumber ) ? toNumber : false;

        if ( _parameter_Window.getComputedStyle ) {
            value = _parameter_Document.defaultView.getComputedStyle( element, null ).getPropertyValue( stylePropertyName ); 
        }  
        else if ( element.currentStyle ) {
            value = element.currentStyle[ stylePropertyName ];
        }   
        
        if ( toNumber ) {
            value = parseFloat( value, 10 );
        }

        return value;
    }

    function addClass( element, className ) {
        element.className += _string.space + className;
    }

    function cancelBubble( e ) {
        e.preventDefault();
        e.cancelBubble = true;
    }

    function getScrollPosition() {
        var doc = _parameter_Document.documentElement,
            left = ( _parameter_Window.pageXOffset || doc.scrollLeft )  - ( doc.clientLeft || 0 ),
            top = ( _parameter_Window.pageYOffset || doc.scrollTop ) - ( doc.clientTop || 0 );

        return {
            left: left,
            top: top
        };
    }

    function showElementAtMousePosition( e, element ) {
        var left = e.pageX,
            top = e.pageY,
            scrollPosition = getScrollPosition();

        element.style.display = "block";

        if ( left + element.offsetWidth > _parameter_Window.innerWidth ) {
            left -= element.offsetWidth;
        } else {
            left++;
        }

        if ( top + element.offsetHeight > _parameter_Window.innerHeight ) {
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


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Triggering Custom Events
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function fireCustomTrigger( triggerFunction ) {
        var result = null;

        if ( isDefinedFunction( triggerFunction ) ) {
            result = triggerFunction.apply( null, [].slice.call( arguments, 1 ) );
        }

        return result;
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
     * String Handling
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function newGuid() {
        var result = [];

        for ( var charIndex = 0; charIndex < 32; charIndex++ ) {
            if ( charIndex === 8 || charIndex === 12 || charIndex === 16 || charIndex === 20 ) {
                result.push( _string.dash );
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
     * addDates().
     * 
     * Adds an array of dates for a specific element ID, and refreshes the UI (if specified). If the dates already exist, their values are increased by one.
     * 
     * @public
     * @fires       onAdd
     * 
     * @param       {string}    elementId                                   The Heat.js element ID that should show the new date.
     * @param       {Date[]}    dates                                       The dates to add.
     * @param       {string}    [type]                                      The trend type (defaults to "None").
     * @param       {boolean}   [triggerRefresh]                            States if the UI for the element ID should be refreshed (defaults to true).
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    this.addDates = function( elementId, dates, type, triggerRefresh ) {
        if ( _elements_DateCounts.hasOwnProperty( elementId ) ) {
            triggerRefresh = !isDefinedBoolean( triggerRefresh ) ? true : triggerRefresh;
            type = !isDefinedString( type ) ? _elements_DateCounts_DefaultType : type;

            var datesLength = dates.length,
                bindingOptions = _elements_DateCounts[ elementId ].options;

            for ( var dateIndex = 0; dateIndex < datesLength; dateIndex++ ) {
                this.addDate( elementId, dates[ dateIndex ], type, false );
            }

            fireCustomTrigger( bindingOptions.onAdd, bindingOptions.currentView.element );

            if ( triggerRefresh ) {
                renderControlContainer( _elements_DateCounts[ elementId ].options );
            }
        }

        return this;
    };

    /**
     * addDate().
     * 
     * Adds a date for a specific element ID, and refreshes the UI (if specified). If the date already exists, its value is increased by one.
     * 
     * @public
     * @fires       onAdd
     * 
     * @param       {string}    elementId                                   The Heat.js element ID that should show the new date.
     * @param       {Date}      date                                        The date to add.
     * @param       {string}    [type]                                      The trend type (defaults to "None").
     * @param       {boolean}   [triggerRefresh]                            States if the UI for the element ID should be refreshed (defaults to true).
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    this.addDate = function( elementId, date, type, triggerRefresh ) {
        if ( _elements_DateCounts.hasOwnProperty( elementId ) ) {
            triggerRefresh = !isDefinedBoolean( triggerRefresh ) ? true : triggerRefresh;
            type = !isDefinedString( type ) ? _elements_DateCounts_DefaultType : type;

            var storageDate = toStorageDate( date );

            if ( !_elements_DateCounts[ elementId ].type.hasOwnProperty( type ) ) {
                _elements_DateCounts[ elementId ].type[ type ] = {};
                _elements_DateCounts[ elementId ].types++;
            }

            if ( !_elements_DateCounts[ elementId ].type[ type ].hasOwnProperty( storageDate ) ) {
                _elements_DateCounts[ elementId ].type[ type ][ storageDate ] = 0;
            }
    
            _elements_DateCounts[ elementId ].type[ type ][ storageDate ]++;

            var bindingOptions = _elements_DateCounts[ elementId ].options;

            fireCustomTrigger( bindingOptions.onAdd, bindingOptions.currentView.element );

            if ( triggerRefresh ) {
                renderControlContainer( _elements_DateCounts[ elementId ].options );
            }
        }

        return this;
    };

    /**
     * removeDates().
     * 
     * Removes an array of dates for a specific element ID, and refreshes the UI (if specified). If the dates already exist, their values are decreased by one.
     * 
     * @public
     * @fires       onRemove
     * 
     * @param       {string}    elementId                                   The Heat.js element ID that should show the updated date.
     * @param       {Date[]}    dates                                       The dates to removed.
     * @param       {string}    [type]                                      The trend type (defaults to "None").
     * @param       {boolean}   [triggerRefresh]                            States if the UI for the element ID should be refreshed (defaults to true).
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    this.removeDates = function( elementId, dates, type, triggerRefresh ) {
        if ( _elements_DateCounts.hasOwnProperty( elementId ) ) {
            type = !isDefinedString( type ) ? _elements_DateCounts_DefaultType : type;
            triggerRefresh = !isDefinedBoolean( triggerRefresh ) ? true : triggerRefresh;

            var datesLength = dates.length,
            bindingOptions = _elements_DateCounts[ elementId ].options;

            for ( var dateIndex = 0; dateIndex < datesLength; dateIndex++ ) {
                this.removeDate( elementId, dates[ dateIndex ], type, false );
            }

            fireCustomTrigger( bindingOptions.onRemove, bindingOptions.currentView.element );

            if ( triggerRefresh ) {
                renderControlContainer( _elements_DateCounts[ elementId ].options );
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
     * @fires       onRemove
     * 
     * @param       {string}    elementId                                   The Heat.js element ID that should show the updated date.
     * @param       {Date}      date                                        The date to removed.
     * @param       {string}    [type]                                      The trend type (defaults to "None").
     * @param       {boolean}   [triggerRefresh]                            States if the UI for the element ID should be refreshed (defaults to true).
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    this.removeDate = function( elementId, date, type, triggerRefresh ) {
        if ( _elements_DateCounts.hasOwnProperty( elementId ) ) {
            type = !isDefinedString( type ) ? _elements_DateCounts_DefaultType : type;

            var storageDate = toStorageDate( date );

            if ( _elements_DateCounts[ elementId ].type.hasOwnProperty( type ) && _elements_DateCounts[ elementId ].type[ type ].hasOwnProperty( storageDate ) ) {
                triggerRefresh = !isDefinedBoolean( triggerRefresh ) ? true : triggerRefresh;

                if ( _elements_DateCounts[ elementId ].type[ type ][ storageDate ] > 0 ) {
                    _elements_DateCounts[ elementId ].type[ type ][ storageDate ]--;
                }

                var bindingOptions = _elements_DateCounts[ elementId ].options;

                fireCustomTrigger( bindingOptions.onRemove, bindingOptions.currentView.element );

                if ( triggerRefresh ) {
                    renderControlContainer( _elements_DateCounts[ elementId ].options );
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
     * @fires       onReset
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
            bindingOptions.currentView.type = _elements_DateCounts_DefaultType;

            createDateStorageForElement( elementId, bindingOptions );

            fireCustomTrigger( bindingOptions.onReset, bindingOptions.currentView.element );

            if ( triggerRefresh ) {
                renderControlContainer( _elements_DateCounts[ elementId ].options );
            }
        }

        return this;
    };

    function toStorageDate( date ) {
        return date.getFullYear() + _string.dash + padNumber( date.getMonth() + 1 ) + _string.dash + padNumber( date.getDate() );
    }

    function getStorageDateYear( data ) {
        return data.split( _string.dash )[ 0 ];
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
     * @fires       onRefresh
     * 
     * @param       {string}    elementId                                   The Heat.js element ID that should be refreshed.
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    this.refresh = function( elementId ) {
        if ( _elements_DateCounts.hasOwnProperty( elementId ) ) {
            var bindingOptions = _elements_DateCounts[ elementId ].options;

            renderControlContainer( bindingOptions );
            fireCustomTrigger( bindingOptions.onRefresh, bindingOptions.currentView.element );
        }

        return this;
    };

    /**
     * refreshAll().
     * 
     * Refreshes all of the rendered Heat.js instances.
     * 
     * @public
     * @fires       onRefresh
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    this.refreshAll = function() {
        for ( var elementId in _elements_DateCounts ) {
            if ( _elements_DateCounts.hasOwnProperty( elementId ) ) {
                var bindingOptions = _elements_DateCounts[ elementId ].options;

                renderControlContainer( bindingOptions );
                fireCustomTrigger( bindingOptions.onRefresh, bindingOptions.currentView.element );
            }
        }

        return this;
    };

    /**
     * setYear().
     * 
     * Sets the year to be displayed.
     * 
     * @public
     * @fires       onSetYear
     * 
     * @param       {string}    elementId                                   The Heat.js element ID that should be updated.
     * @param       {number}    year                                        The year that should be shown.
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    this.setYear = function( elementId, year ) {
        if ( _elements_DateCounts.hasOwnProperty( elementId ) ) {
            var bindingOptions = _elements_DateCounts[ elementId ].options;
            bindingOptions.currentView.year = year;

            renderControlContainer( bindingOptions );
            fireCustomTrigger( bindingOptions.onSetYear, bindingOptions.currentView.year );
        }

        return this;
    };

    /**
     * setYearToHighest().
     * 
     * Sets the year to to the highest year available.
     * 
     * @public
     * @fires       onSetYear
     * 
     * @param       {string}    elementId                                   The Heat.js element ID that should be updated.
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    this.setYearToHighest = function( elementId ) {
        if ( _elements_DateCounts.hasOwnProperty( elementId ) ) {
            var bindingOptions = _elements_DateCounts[ elementId ].options,
                data = getCurrentViewData( bindingOptions ),
                maximumYear = 0;

            for ( var storageDate in data ) {
                if ( data.hasOwnProperty( storageDate ) ) {
                    maximumYear = Math.max( maximumYear, parseInt( getStorageDateYear( storageDate ) ) );
                }
            }

            if ( maximumYear > 0 ) {
                bindingOptions.currentView.year = maximumYear;

                renderControlContainer( bindingOptions );
                fireCustomTrigger( bindingOptions.onSetYear, bindingOptions.currentView.year );
            }
        }

        return this;
    };

    /**
     * setYearToLowest().
     * 
     * Sets the year to to the lowest year available.
     * 
     * @public
     * @fires       onSetYear
     * 
     * @param       {string}    elementId                                   The Heat.js element ID that should be updated.
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    this.setYearToLowest = function( elementId ) {
        if ( _elements_DateCounts.hasOwnProperty( elementId ) ) {
            var bindingOptions = _elements_DateCounts[ elementId ].options,
                data = getCurrentViewData( bindingOptions ),
                minimumYear = 9999;

            for ( var storageDate in data ) {
                if ( data.hasOwnProperty( storageDate ) ) {
                    minimumYear = Math.min( minimumYear, parseInt( getStorageDateYear( storageDate ) ) );
                }
            }

            if ( minimumYear < 9999 ) {
                bindingOptions.currentView.year = minimumYear;

                renderControlContainer( bindingOptions );
                fireCustomTrigger( bindingOptions.onSetYear, bindingOptions.currentView.year );
            }
        }

        return this;
    };

    /**
     * getYear().
     * 
     * Gets the year being displayed.
     * 
     * @public
     * 
     * @param       {string}    elementId                                   The Heat.js element ID.
     * 
     * @returns     {Object}                                                The year being displayed (or null).
     */
    this.getYear = function( elementId ) {
        var result = null;

        if ( _elements_DateCounts.hasOwnProperty( elementId ) ) {
            var bindingOptions = _elements_DateCounts[ elementId ].options;

            result = bindingOptions.currentView.year;
        }

        return result;
    };

    /**
     * render().
     * 
     * Renders a new map on a element using the options specified.
     * 
     * @public
     * 
     * @param       {Object}    element                                     The element to convert to a heat map.
     * @param       {Object}    options                                     The options to use (refer to "Binding Options" documentation for properties).
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    this.render = function( element, options ) {
        renderControl( renderBindingOptions( options, element ) );

        return this;
    };

    /**
     * renderAll().
     * 
     * Finds all new map elements and renders them.
     * 
     * @public
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    this.renderAll = function() {
        render();

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
     * @fires       onDestroy
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    this.destroyAll = function() {
        for ( var elementId in _elements_DateCounts ) {
            if ( _elements_DateCounts.hasOwnProperty( elementId ) ) {
                var bindingOptions = _elements_DateCounts[ elementId ].options;

                bindingOptions.currentView.element.innerHTML = _string.empty;
                bindingOptions.currentView.element.className = _string.empty;

                _parameter_Document.body.removeChild( bindingOptions.currentView.tooltip );

                fireCustomTrigger( bindingOptions.onDestroy, bindingOptions.currentView.element );
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
     * @fires       onDestroy
     * 
     * @param       {string}    elementId                                   The Heat.js element ID to destroy.
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    this.destroy = function( elementId ) {
        if ( _elements_DateCounts.hasOwnProperty( elementId ) ) {
            var bindingOptions = _elements_DateCounts[ elementId ].options;

            bindingOptions.currentView.element.innerHTML = _string.empty;
            bindingOptions.currentView.element.className = _string.empty;

            _parameter_Document.body.removeChild( bindingOptions.currentView.tooltip );

            fireCustomTrigger( bindingOptions.onDestroy, bindingOptions.currentView.element );

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
     * @param       {Object}   newConfiguration                             All the configuration options that should be set (refer to "Configuration Options" documentation for properties).
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
        _configuration.mapText = getDefaultString( _configuration.mapText, "Map" );
        _configuration.chartText = getDefaultString( _configuration.chartText, "Chart" );
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
        return "1.7.0";
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