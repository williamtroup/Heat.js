/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        observe.js
 * @version     v2.5.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2024
 */


( function() {
    var // Variables: Constructor Parameters
        _parameter_Document = null,
        _parameter_Window = null,
        _parameter_Math = null,
        _parameter_JSON = null,

        // Variables: Configuration
        _configuration = {},

        // Variables: Strings
        _string = {
            empty: "",
            space: " ",
            newLine: "\n",
            dash: "-",
            underscore: "_",
            plus: "+"
        },

        // Variables: Values
        _value = {
            notFound: -1
        },

        // Variables: Internal Names
        _internal_Name_Holiday = "HOLIDAY",

        // Variables: Local Storage
        _local_Storage_Start_ID = "HJS_",

        // Variables: Defaults
        _default_MonthsToShow = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ],
        _default_DaysToShow = [ 1, 2, 3, 4, 5, 6, 7 ],

        // Variables: Elements
        _elements_Type = {},
        _elements_Day_Width = null,

        // Variables: Date Counts
        _elements_DateCounts = {},

        // Variables: View (names)
        _elements_View_Name_Map = "map",
        _elements_View_Name_Chart = "chart",
        _elements_View_Name_Statistics = "statistics",

        // Variables: View
        _elements_View_Map = 1,
        _elements_View_Chart = 2,
        _elements_View_Statistics = 3,

        // Variables: Export Types
        _export_Type_Csv = "csv",
        _export_Type_Json = "json",
        _export_Type_Xml = "xml",
        _export_Type_Txt = "txt",

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
        var bindingOptions = buildAttributeOptions( data ),
            view = !isDefinedString( bindingOptions.view ) ? _string.empty : bindingOptions.view.toLowerCase();

        bindingOptions.currentView = {};
        bindingOptions.currentView.element = element;
        bindingOptions.currentView.tooltip = null;
        bindingOptions.currentView.tooltipTimer = null;
        bindingOptions.currentView.mapContents = null;
        bindingOptions.currentView.mapContentsScrollLeft = 0;
        bindingOptions.currentView.year = bindingOptions.year;
        bindingOptions.currentView.type = _configuration.unknownTrendText;
        bindingOptions.currentView.isInFetchMode = isDefinedFunction( bindingOptions.onDataFetch );
        bindingOptions.currentView.isInFetchModeTimer = null;

        if ( bindingOptions.views.chart.enabled ) {
            bindingOptions.currentView.chartContents = null;
            bindingOptions.currentView.chartContentsScrollLeft = 0;
        }
        
        if ( bindingOptions.views.statistics.enabled ) {
            bindingOptions.currentView.statisticsContents = null;
            bindingOptions.currentView.statisticsContentsScrollLeft = 0;
        }

        if ( view === _elements_View_Name_Map ) {
            bindingOptions.currentView.view = _elements_View_Map;
        } else if ( view === _elements_View_Name_Chart ) {
            bindingOptions.currentView.view = _elements_View_Chart;
        } else if ( view === _elements_View_Name_Statistics ) {
            bindingOptions.currentView.view = _elements_View_Statistics;
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

        bindingOptions.currentView.element.className = "heat-js";
        bindingOptions.currentView.element.removeAttribute( _attribute_Name_Options );

        createDateStorageForElement( bindingOptions.currentView.element.id, bindingOptions );
        renderControlContainer( bindingOptions );
        fireCustomTrigger( bindingOptions.onRenderComplete, bindingOptions.currentView.element );
    }

    function renderControlContainer( bindingOptions, isForDataRefresh, isForViewSwitch ) {
        isForDataRefresh = isDefined( isForDataRefresh ) ? isForDataRefresh : false;
        isForViewSwitch = isDefined( isForViewSwitch ) ? isForViewSwitch : false;

        if ( isForDataRefresh ) {
            storeDataInLocalStorage( bindingOptions );
        }

        if ( isDefined( bindingOptions.currentView.mapContents ) ) {
            bindingOptions.currentView.mapContentsScrollLeft = bindingOptions.currentView.mapContents.scrollLeft;
        }

        if ( bindingOptions.views.chart.enabled && isDefined( bindingOptions.currentView.chartContents ) ) {
            bindingOptions.currentView.chartContentsScrollLeft = bindingOptions.currentView.chartContents.scrollLeft;
        }

        if ( bindingOptions.views.statistics.enabled && isDefined( bindingOptions.currentView.statisticsContents ) ) {
            bindingOptions.currentView.statisticsContentsScrollLeft = bindingOptions.currentView.statisticsContents.scrollLeft;
        }
        
        bindingOptions.currentView.element.innerHTML = _string.empty;

        hideToolTip( bindingOptions );

        startDataPullTimer( bindingOptions );

        renderControlToolTip( bindingOptions );
        renderControlTitleBar( bindingOptions );
        renderControlMap( bindingOptions, isForViewSwitch );

        if ( bindingOptions.views.chart.enabled ) {
            renderControlChart( bindingOptions, isForViewSwitch );

            bindingOptions.currentView.chartContents.style.display = "none";
        }

        if ( bindingOptions.views.statistics.enabled ) {
            renderControlStatistics( bindingOptions, isForViewSwitch );

            bindingOptions.currentView.statisticsContents.style.display = "none";
        }

        bindingOptions.currentView.mapContents.style.display = "none";

        if ( bindingOptions.currentView.view === _elements_View_Map ) {
            bindingOptions.currentView.mapContents.style.display = "block";
        } else if ( bindingOptions.views.chart.enabled && bindingOptions.currentView.view === _elements_View_Chart ) {
            bindingOptions.currentView.chartContents.style.display = "block";
        } else if ( bindingOptions.views.statistics.enabled && bindingOptions.currentView.view === _elements_View_Statistics ) {
            bindingOptions.currentView.statisticsContents.style.display = "block";
        } else {
            bindingOptions.currentView.chartContents.style.display = "block";
        }
    }

    function createDateStorageForElement( elementId, bindingOptions, storeLocalData ) {
        storeLocalData = isDefined( storeLocalData ) ? storeLocalData : true;

        _elements_DateCounts[ elementId ] = {
            options: bindingOptions,
            type: {},
            types: 1
        };

        _elements_DateCounts[ elementId ].type[ _configuration.unknownTrendText ] = {};

        if ( storeLocalData && !bindingOptions.currentView.isInFetchMode ) {
            loadDataFromLocalStorage( bindingOptions );
        }
    }

    function getCurrentViewData( bindingOptions ) {
        return _elements_DateCounts[ bindingOptions.currentView.element.id ].type[ bindingOptions.currentView.type ];
    }

    function isMonthVisible( monthsToShow, month ) {
        return monthsToShow.indexOf( month + 1 ) > _value.notFound;
    }

    function isDayVisible( daysToShow, day ) {
        return daysToShow.indexOf( day ) > _value.notFound;
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
        if ( bindingOptions.showTitle || bindingOptions.showYearSelector || bindingOptions.showRefreshButton || bindingOptions.showExportButton || bindingOptions.showImportButton ) {
            var titleBar = createElement( bindingOptions.currentView.element, "div", "title-bar" ),
                title = createElement( titleBar, "div", "title" );

            if ( bindingOptions.views.chart.enabled || bindingOptions.views.statistics.enabled ) {
                createElement( title, "div", "down-arrow" );
            } else {
                addClass( title, "no-click" );
            }

            if ( bindingOptions.showTitle ) {
                title.innerHTML += bindingOptions.titleText;
            }

            if ( bindingOptions.views.chart.enabled || bindingOptions.views.statistics.enabled ) {
                var titlesList = createElement( title, "div", "titles-list" ),
                    titles = createElement( titlesList, "div", "titles" ),
                    optionMap = createElementWithHTML( titles, "div", "title", _configuration.mapText );
                    
                renderTitleDropDownClickEvent( bindingOptions, optionMap, _elements_View_Map, _elements_View_Name_Map );

                if ( bindingOptions.views.chart.enabled ) {
                    var optionChart = createElementWithHTML( titles, "div", "title", _configuration.chartText );

                    renderTitleDropDownClickEvent( bindingOptions, optionChart, _elements_View_Chart, _elements_View_Name_Chart );
                }

                if ( bindingOptions.views.statistics.enabled ) {
                    var statisticsChart = createElementWithHTML( titles, "div", "title", _configuration.statisticsText );

                    renderTitleDropDownClickEvent( bindingOptions, statisticsChart, _elements_View_Statistics, _elements_View_Name_Statistics );
                }
            }

            if ( bindingOptions.showImportButton && !bindingOptions.currentView.isInFetchMode ) {
                var importData = createElementWithHTML( titleBar, "button", "import", _configuration.importButtonText );
        
                importData.onclick = function() {
                    importFromFilesSelected( bindingOptions );
                };
            }

            if ( bindingOptions.showExportButton ) {
                var exportData = createElementWithHTML( titleBar, "button", "export", _configuration.exportButtonText );
        
                exportData.onclick = function() {
                    exportAllData( bindingOptions );
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

                    while ( bindingOptions.yearsToHide.indexOf( bindingOptions.currentView.year ) > _value.notFound ) {
                        bindingOptions.currentView.year--;
                    }
        
                    renderControlContainer( bindingOptions );
                    fireCustomTrigger( bindingOptions.onBackYear, bindingOptions.currentView.year );
                };

                bindingOptions.currentView.yearText = createElementWithHTML( titleBar, "div", "year-text", bindingOptions.currentView.year );

                if ( bindingOptions.showYearSelectionDropDown ) {
                    createElement( bindingOptions.currentView.yearText, "div", "down-arrow" );

                    var yearList = createElement( bindingOptions.currentView.yearText, "div", "years-list" ),
                        years = createElement( yearList, "div", "years" ),
                        thisYear = new Date().getFullYear(),
                        activeYear = null;

                    yearList.style.display = "block";
                    yearList.style.visibility = "hidden";

                    for ( var currentYear = thisYear - bindingOptions.extraSelectionYears; currentYear < thisYear + bindingOptions.extraSelectionYears; currentYear++ ) {
                        if ( bindingOptions.yearsToHide.indexOf( currentYear ) === _value.notFound ) {
                            var year = renderControlTitleBarYear( bindingOptions, years, currentYear );

                            if ( !isDefined( activeYear ) ) {
                                activeYear = year;
                            }
                        }
                    }

                    if ( isDefined( activeYear ) ) {
                        years.scrollTop = activeYear.offsetTop - ( years.offsetHeight / 2 );
                    }

                    yearList.style.display = "none";
                    yearList.style.visibility = "visible";

                } else {
                    addClass( bindingOptions.currentView.yearText, "no-click" );
                }

                var next = createElementWithHTML( titleBar, "button", "next", _configuration.nextButtonText );

                next.onclick = function() {
                    bindingOptions.currentView.year++;

                    while ( bindingOptions.yearsToHide.indexOf( bindingOptions.currentView.year ) > _value.notFound ) {
                        bindingOptions.currentView.year++;
                    }
        
                    renderControlContainer( bindingOptions );
                    fireCustomTrigger( bindingOptions.onNextYear, bindingOptions.currentView.year );
                };
            }
        }
    }

    function renderTitleDropDownClickEvent( bindingOptions, option, view, viewName ) {
        if ( bindingOptions.currentView.view === view ) {
            addClass( option, "title-active" );
            
        } else {
            option.onclick = function() {
                bindingOptions.currentView.view = view;

                fireCustomTrigger( bindingOptions.onViewSwitch, viewName );
                renderControlContainer( bindingOptions, false, true );
            };
        }
    }

    function renderControlTitleBarYear( bindingOptions, years, currentYear ) {
        var result = null,
            year = createElementWithHTML( years, "div", "year", currentYear );

        if ( bindingOptions.currentView.year !== currentYear ) {
            year.onclick = function() {
                bindingOptions.currentView.year = currentYear;
    
                renderControlContainer( bindingOptions );
                fireCustomTrigger( bindingOptions.onSetYear, bindingOptions.currentView.year );
            };

        } else {
            addClass( year, "year-active" );
            result = year;
        }

        return result;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Map
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderControlMap( bindingOptions, isForViewSwitch ) {
        bindingOptions.currentView.mapContents = createElement( bindingOptions.currentView.element, "div", "map-contents" );

        if ( bindingOptions.views.chart.enabled ) {
            renderControlChartContents( bindingOptions );
        }
        
        if ( bindingOptions.views.statistics.enabled ) {
            renderControlStatisticsContents( bindingOptions );
        }

        renderControlViewGuide( bindingOptions );

        if ( bindingOptions.views.map.showNoDataMessageWhenDataIsNotAvailable && !isDataAvailableForYear( bindingOptions ) ) {
            var noDataMessage = createElementWithHTML( bindingOptions.currentView.mapContents, "div", "no-data-message", _configuration.noMapDataMessage );

            if ( isForViewSwitch ) {
                addClass( noDataMessage, "view-switch" );
            }

        } else {
            bindingOptions.currentView.mapContents.style.minHeight = "unset";

            makeAreaDroppable( bindingOptions.currentView.mapContents, bindingOptions );

            var map = createElement( bindingOptions.currentView.mapContents, "div", "map" ),
                currentYear = bindingOptions.currentView.year,
                monthAdded = false;
    
            if ( isForViewSwitch ) {
                addClass( map, "view-switch" );
            }
    
            if ( bindingOptions.views.map.showDayNames ) {
                var days = createElement( map, "div", "days" );
    
                if ( !bindingOptions.views.map.showMonthNames || bindingOptions.views.map.placeMonthNamesOnTheBottom ) {
                    days.className = "days-months-bottom";
                }
        
                for ( var dayNameIndex = 0; dayNameIndex < 7; dayNameIndex++ ) {
                    if ( isDayVisible( bindingOptions.views.map.daysToShow, dayNameIndex + 1 ) ) {
                        createElementWithHTML( days, "div", "day-name", _configuration.dayNames[ dayNameIndex ] );
                    }
                }
    
                if ( bindingOptions.views.map.showDaysInReverseOrder ) {
                    reverseElementsOrder( days );
                }
            }
    
            var months = createElement( map, "div", "months" ),
                colorRanges = getSortedColorRanges( bindingOptions );
    
            for ( var monthIndex = 0; monthIndex < 12; monthIndex++ ) {
                if ( isMonthVisible( bindingOptions.views.map.monthsToShow, monthIndex ) ) {
                    var month = createElement( months, "div", "month" ),
                        dayColumns = createElement( month, "div", "day-columns" ),
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
                            if ( isDayVisible( bindingOptions.views.map.daysToShow, actualDay ) ) {
                                createElement( currentDayColumn, "div", "day-disabled" );
                            }
                        }
        
                        if ( startFillingDays ) {
                            var day = null;
    
                            if ( isDayVisible( bindingOptions.views.map.daysToShow, actualDay ) ) {
                                day = renderControlMapMonthDay( bindingOptions, currentDayColumn, dayIndex - firstDayNumberInMonth, monthIndex, currentYear, colorRanges );
                            }
            
                            if ( ( dayIndex + 1 ) % 7 === 0 ) {
                                if ( bindingOptions.views.map.showDaysInReverseOrder ) {
                                    reverseElementsOrder( currentDayColumn );
                                }
    
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
    
                    if ( bindingOptions.views.map.showMonthNames ) {
                        var monthName = null,
                            monthWidth = month.offsetWidth;
    
                        if ( !bindingOptions.views.map.placeMonthNamesOnTheBottom ) {
                            monthName = createElementWithHTML( month, "div", "month-name", _configuration.monthNames[ monthIndex ], dayColumns );
                        } else {
                            monthName = createElementWithHTML( month, "div", "month-name-bottom", _configuration.monthNames[ monthIndex ] );
                        }
    
                        if ( isDefined( monthName ) ) {
                            if ( bindingOptions.views.map.showMonthDayGaps ) {
                                monthName.style.width = monthWidth + "px";
                            } else {
                                monthName.style.width = ( monthWidth - _elements_Day_Width ) + "px";
                            }
                        }
                    }
    
                    if ( monthAdded && isDefined( _elements_Day_Width ) ) {
                        if ( firstDayNumberInMonth > 0 && !bindingOptions.views.map.showMonthDayGaps ) {
                            month.style.marginLeft = -_elements_Day_Width + "px";
                        } else if ( firstDayNumberInMonth === 0 && bindingOptions.views.map.showMonthDayGaps ) {
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
    }

    function renderControlMapMonthDay( bindingOptions, currentDayColumn, dayNumber, month, year, colorRanges ) {
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

        if ( bindingOptions.views.map.showDayNumbers && dateCount > 0 ) {
            day.innerHTML = dateCount.toString();
        }

        if ( isDefinedFunction( bindingOptions.onDayClick ) ) {
            day.onclick = function() {
                fireCustomTrigger( bindingOptions.onDayClick, date, dateCount );
            };

        } else {
            addClass( day, "no-hover" );
        }

        var useColorRange = getColorRange( bindingOptions, colorRanges, dateCount, date );

        if ( isDefined( useColorRange ) && isHeatMapColorVisible( bindingOptions, useColorRange.id ) ) {
            if ( isDefinedString( useColorRange.mapCssClassName ) ) {
                addClass( day, useColorRange.mapCssClassName );
            } else {
                addClass( day, useColorRange.cssClassName );
            }
        }

        return day;
    }

    function isDataAvailableForYear( bindingOptions ) {
        var result = false,
            data = getCurrentViewData( bindingOptions ),
            checkDate = bindingOptions.currentView.year.toString();

        for ( var storageDate in data ) {
            if ( data.hasOwnProperty( storageDate ) ) {
                if ( getStorageDateYear( storageDate ) === checkDate ) {
                    result = true;
                    break;
                }
            }
        }

        return result;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Chart
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderControlChartContents( bindingOptions ) {
        bindingOptions.currentView.chartContents = createElement( bindingOptions.currentView.element, "div", "chart-contents" );

        makeAreaDroppable( bindingOptions.currentView.chartContents, bindingOptions );
    }

    function renderControlChart( bindingOptions, isForViewSwitch ) {
        var chart = createElement( bindingOptions.currentView.chartContents, "div", "chart" ),
            labels = createElement( chart, "div", "y-labels" ),
            dayLines = createElement( chart, "div", "day-lines" ),
            colorRanges = getSortedColorRanges( bindingOptions ),
            largestValueForCurrentYear = getLargestValueForChartYear( bindingOptions ),
            currentYear = bindingOptions.currentView.year,
            labelsWidth = 0;

        if ( isForViewSwitch ) {
            addClass( chart, "view-switch" );
        }

        if ( largestValueForCurrentYear > 0 && bindingOptions.views.chart.showChartYLabels ) {
            var topLabel = createElementWithHTML( labels, "div", "label-0", largestValueForCurrentYear.toString() );
            createElementWithHTML( labels, "div", "label-25", ( _parameter_Math.floor( largestValueForCurrentYear / 4 ) * 3 ).toString() );
            createElementWithHTML( labels, "div", "label-50", _parameter_Math.floor( largestValueForCurrentYear / 2 ).toString() );
            createElementWithHTML( labels, "div", "label-75", _parameter_Math.floor( largestValueForCurrentYear / 4 ).toString() );
            createElementWithHTML( labels, "div", "label-100", "0" );

            labels.style.width = topLabel.offsetWidth + "px";
            labelsWidth = labels.offsetWidth + getStyleValueByName( labels, "margin-right", true );

        } else {
            labels.parentNode.removeChild( labels );
            labels = null;
        }

        if ( largestValueForCurrentYear === 0 ) {
            bindingOptions.currentView.chartContents.style.minHeight = bindingOptions.currentView.mapContents.offsetHeight + "px";
            chart.parentNode.removeChild( chart );

            var noDataMessage = createElementWithHTML( bindingOptions.currentView.chartContents, "div", "no-data-message", _configuration.noChartDataMessage );

            if ( isForViewSwitch ) {
                addClass( noDataMessage, "view-switch" );
            }

        } else {
            var pixelsPerNumbers = bindingOptions.currentView.mapContents.offsetHeight / largestValueForCurrentYear,
                totalMonths = 0,
                totalDays = 0;

            for ( var monthIndex1 = 0; monthIndex1 < 12; monthIndex1++ ) {
                if ( isMonthVisible( bindingOptions.views.chart.monthsToShow, monthIndex1 ) ) {
                    var totalDaysInMonth = getTotalDaysInMonth( currentYear, monthIndex1 ),
                        actualDay = 1;
                    
                    totalMonths++;

                    for ( var dayIndex = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
                        if ( isDayVisible( bindingOptions.views.chart.daysToShow, actualDay ) ) {
                            renderControlChartDay( dayLines, bindingOptions, dayIndex + 1, monthIndex1, currentYear, colorRanges, pixelsPerNumbers );
                        }
        
                        if ( ( dayIndex + 1 ) % 7 === 0 ) {
                            actualDay = 0;
                        }
    
                        actualDay++;
                        totalDays++;
                    }
                }
            }

            if ( bindingOptions.views.chart.showMonthNames ) {
                var chartMonths = createElement( bindingOptions.currentView.chartContents, "div", "chart-months" ),
                    linesWidth = dayLines.offsetWidth / totalMonths,
                    monthTimesValue = 0;

                for ( var monthIndex2 = 0; monthIndex2 < 12; monthIndex2++ ) {
                    if ( isMonthVisible( bindingOptions.views.chart.monthsToShow, monthIndex2 ) ) {
                        var monthName = createElementWithHTML( chartMonths, "div", "month-name", _configuration.monthNames[ monthIndex2 ] );
                        monthName.style.left = labelsWidth + ( linesWidth * monthTimesValue ) + "px";

                        monthTimesValue++;
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

    function renderControlChartDay( dayLines, bindingOptions, day, month, year, colorRanges, pixelsPerNumbers ) {
        var date = new Date( year, month, day ),
            dayLine = createElement( dayLines, "div", "day-line" ),
            dateCount = getCurrentViewData( bindingOptions )[ toStorageDate( date ) ];

        dateCount = isDefinedNumber( dateCount ) ? dateCount : 0;

        if ( isDefinedFunction( bindingOptions.onDayToolTipRender ) ) {
            addToolTip( dayLine, bindingOptions, fireCustomTrigger( bindingOptions.onDayToolTipRender, date, dateCount ) );
        } else {
            addToolTip( dayLine, bindingOptions, getCustomFormattedDateText( bindingOptions.dayToolTipText, date ) );
        }

        if ( bindingOptions.views.chart.showLineNumbers && dateCount > 0 ) {
            addClass( dayLine, "day-line-number" );

            dayLine.innerHTML = dateCount.toString();
        }

        var dayLineHeight = dateCount * pixelsPerNumbers;
        dayLine.style.height = dayLineHeight + "px";

        if ( dayLineHeight <= 0 ) {
            dayLine.style.visibility = "hidden";
        }

        if ( isDefinedFunction( bindingOptions.onDayClick ) ) {
            dayLine.onclick = function() {
                fireCustomTrigger( bindingOptions.onDayClick, date, dateCount );
            };

        } else {
            addClass( dayLine, "no-hover" );
        }

        var useColorRange = getColorRange( bindingOptions, colorRanges, dateCount, date );

        if ( isDefined( useColorRange ) && isHeatMapColorVisible( bindingOptions, useColorRange.id ) ) {
            if ( isDefinedString( useColorRange.chartCssClassName ) ) {
                addClass( dayLine, useColorRange.chartCssClassName );
            } else {
                addClass( dayLine, useColorRange.cssClassName );
            }
        }
    }

    function getLargestValueForChartYear( bindingOptions ) {
        var result = 0,
            data = getCurrentViewData( bindingOptions );

        for ( var monthIndex = 0; monthIndex < 12; monthIndex++ ) {
            var totalDaysInMonth = getTotalDaysInMonth( bindingOptions.currentView.year, monthIndex );
    
            for ( var dayIndex = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
                var storageDate = toStorageDate( new Date( bindingOptions.currentView.year, monthIndex, dayIndex + 1 ) );

                if ( data.hasOwnProperty( storageDate ) ) {
                    result = _parameter_Math.max( result, parseInt( data[ storageDate ] ) );
                }
            }
        }

        return result;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Statistics
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderControlStatisticsContents( bindingOptions ) {
        bindingOptions.currentView.statisticsContents = createElement( bindingOptions.currentView.element, "div", "statistics-contents" );

        makeAreaDroppable( bindingOptions.currentView.statisticsContents, bindingOptions );
    }

    function renderControlStatistics( bindingOptions, isForViewSwitch ) {
        var statistics = createElement( bindingOptions.currentView.statisticsContents, "div", "statistics" ),
            statisticsRanges = createElement( bindingOptions.currentView.statisticsContents, "div", "statistics-ranges" ),
            labels = createElement( statistics, "div", "y-labels" ),
            rangeLines = createElement( statistics, "div", "range-lines" ),
            colorRanges = getSortedColorRanges( bindingOptions ),
            colorRangeValuesForCurrentYear = getLargestValuesForEachRangeType( bindingOptions, colorRanges );

        if ( isForViewSwitch ) {
            addClass( statistics, "view-switch" );
        }

        if ( colorRangeValuesForCurrentYear.largestValue > 0 && bindingOptions.views.statistics.showChartYLabels ) {
            var topLabel = createElementWithHTML( labels, "div", "label-0", colorRangeValuesForCurrentYear.largestValue.toString() );
            createElementWithHTML( labels, "div", "label-25", ( _parameter_Math.floor( colorRangeValuesForCurrentYear.largestValue / 4 ) * 3 ).toString() );
            createElementWithHTML( labels, "div", "label-50", _parameter_Math.floor( colorRangeValuesForCurrentYear.largestValue / 2 ).toString() );
            createElementWithHTML( labels, "div", "label-75", _parameter_Math.floor( colorRangeValuesForCurrentYear.largestValue / 4 ).toString() );
            createElementWithHTML( labels, "div", "label-100", "0" );

            labels.style.width = topLabel.offsetWidth + "px";
            statisticsRanges.style.paddingLeft = labels.offsetWidth + getStyleValueByName( labels, "margin-right", true ) + "px";

        } else {
            labels.parentNode.removeChild( labels );
            labels = null;
        }

        if ( colorRangeValuesForCurrentYear.largestValue === 0 ) {
            bindingOptions.currentView.statisticsContents.style.minHeight = bindingOptions.currentView.mapContents.offsetHeight + "px";
            statistics.parentNode.removeChild( statistics );
            statisticsRanges.parentNode.removeChild( statisticsRanges );

            var noDataMessage = createElementWithHTML( bindingOptions.currentView.statisticsContents, "div", "no-statistics-message", _configuration.noStatisticsDataMessage );

            if ( isForViewSwitch ) {
                addClass( noDataMessage, "view-switch" );
            }

        } else {
            var pixelsPerNumbers = bindingOptions.currentView.mapContents.offsetHeight / colorRangeValuesForCurrentYear.largestValue;

            if ( !bindingOptions.views.statistics.showColorRangeLabels ) {
                statisticsRanges.parentNode.removeChild( statisticsRanges );
            }

            for ( var type in colorRangeValuesForCurrentYear.types ) {
                if ( colorRangeValuesForCurrentYear.types.hasOwnProperty( type ) ) {
                    renderControlStatisticsRangeLine( type, rangeLines, colorRangeValuesForCurrentYear.types[ type ], bindingOptions, colorRanges, pixelsPerNumbers );

                    var useColorRange = getColorRangeByMinimum( colorRanges, type );

                    if ( bindingOptions.views.statistics.showColorRangeLabels ) {
                        if ( !bindingOptions.views.statistics.useColorRangeNamesForLabels || !isDefined( useColorRange ) || !isDefinedString( useColorRange.name ) ) {
                            createElementWithHTML( statisticsRanges, "div", "range-name", type + _string.plus );
                        } else {
                            createElementWithHTML( statisticsRanges, "div", "range-name", useColorRange.name );
                        }
                    }
                }
            }
    
            if ( bindingOptions.keepScrollPositions ) {
                bindingOptions.currentView.statisticsContents.scrollLeft = bindingOptions.currentView.statisticsContentsScrollLeft;
            }
        }
    }

    function renderControlStatisticsRangeLine( colorRangeMinimum, dayLines, rangeCount, bindingOptions, colorRanges, pixelsPerNumbers ) {
        var rangeLine = createElement( dayLines, "div", "range-line" ),
            useColorRange = getColorRangeByMinimum( colorRanges, colorRangeMinimum ),
            rangeLineHeight = rangeCount * pixelsPerNumbers;

        rangeLine.style.height = rangeLineHeight + "px";

        if ( rangeLineHeight <= 0 ) {
            rangeLine.style.visibility = "hidden";
        }

        addToolTip( rangeLine, bindingOptions, rangeCount.toString() );

        if ( isDefinedFunction( bindingOptions.onStatisticClick ) ) {
            rangeLine.onclick = function() {
                fireCustomTrigger( bindingOptions.onStatisticClick, useColorRange );
            };

        } else {
            addClass( rangeLine, "no-hover" );
        }

        if ( isDefined( useColorRange ) && isHeatMapColorVisible( bindingOptions, useColorRange.id ) ) {
            if ( isDefinedString( useColorRange.statisticsCssClassName ) ) {
                addClass( rangeLine, useColorRange.statisticsCssClassName );
            } else {
                addClass( rangeLine, useColorRange.cssClassName );
            }
        }
    }

    function getLargestValuesForEachRangeType( bindingOptions, colorRanges ) {
        var types = {},
            largestValue = 0,
            data = getCurrentViewData( bindingOptions );

        types[ "0" ] = 0;

        for ( var monthIndex = 0; monthIndex < 12; monthIndex++ ) {
            var totalDaysInMonth = getTotalDaysInMonth( bindingOptions.currentView.year, monthIndex );
    
            for ( var dayIndex = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
                var storageDate = toStorageDate( new Date( bindingOptions.currentView.year, monthIndex, dayIndex + 1 ) );

                if ( data.hasOwnProperty( storageDate ) ) {
                    var storageDateParts = getStorageDate( storageDate ),
                        storageDateObject = new Date( storageDateParts[ 2 ], storageDateParts[ 1 ], storageDateParts[ 0 ] ),
                        weekDayNumber = getWeekdayNumber( storageDateObject );

                    if ( !isHoliday( bindingOptions, storageDateObject ) && isMonthVisible( bindingOptions.views.statistics.monthsToShow, storageDateObject.getMonth() ) && isDayVisible( bindingOptions.views.statistics.daysToShow, weekDayNumber ) ) {
                        var useColorRange = getColorRange( bindingOptions, colorRanges, data[ storageDate ] );

                        if ( !isDefined( useColorRange ) ) {
                            types[ "0" ]++;
    
                        } else {
                            if ( !types.hasOwnProperty( useColorRange.minimum.toString() ) ) {
                                types[ useColorRange.minimum.toString() ] = 0;
                            }
    
                            types[ useColorRange.minimum ]++;
                            
                            largestValue = _parameter_Math.max( largestValue, types[ useColorRange.minimum ] );
                        }
                    }
                }
            }
        }

        return {
            types: types,
            largestValue: largestValue
        };
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

        for ( var storageDate in _elements_DateCounts[ bindingOptions.currentView.element.id ].type[ _configuration.unknownTrendText ] ) {
            if ( _elements_DateCounts[ bindingOptions.currentView.element.id ].type[ _configuration.unknownTrendText ].hasOwnProperty( storageDate ) ) {
                noneTypeCount++;
                break;
            }
        }

        if ( _elements_DateCounts[ bindingOptions.currentView.element.id ].types > 1 ) {
            if ( isDefinedString( bindingOptions.descriptionText ) ) {
                var description = createElement( bindingOptions.currentView.element, "div", "description", guide );
    
                renderDescription( bindingOptions, description );
            }

            for ( var type in _elements_DateCounts[ bindingOptions.currentView.element.id ].type ) {
                if ( type !== _configuration.unknownTrendText || noneTypeCount > 0 ) {
                    if ( noneTypeCount === 0 && bindingOptions.currentView.type === _configuration.unknownTrendText ) {
                        bindingOptions.currentView.type = type;
                    }

                    renderControlViewGuideTypeButton( bindingOptions, mapTypes, type );
                }
            }

        } else {
            renderDescription( bindingOptions, mapTypes );
        }

        if ( bindingOptions.showGuide ) {
            var mapToggles = createElement( guide, "div", "map-toggles" );

            if ( bindingOptions.showLessAndMoreLabels ) {
                var lessText = createElementWithHTML( mapToggles, "div", "less-text", _configuration.lessText );
    
                if ( bindingOptions.mapTogglesEnabled ) {
                    lessText.onclick = function() {
                        updateColorRangeToggles( bindingOptions, false );
                    };
        
                } else {
                    addClass( lessText, "no-click" );
                }
            }
    
            var days = createElement( mapToggles, "div", "days" ),
                colorRanges = getSortedColorRanges( bindingOptions ),
                colorRangesLength = colorRanges.length;
    
            for ( var colorRangesIndex = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++ ) {
                renderControlViewGuideDay( bindingOptions, days, colorRanges[ colorRangesIndex ] );
            }

            if ( bindingOptions.showLessAndMoreLabels ) {
                var moreText = createElementWithHTML( mapToggles, "div", "more-text", _configuration.moreText );
    
                if ( bindingOptions.mapTogglesEnabled ) {
                    moreText.onclick = function() {
                        updateColorRangeToggles( bindingOptions, true );
                    };
        
                } else {
                    addClass( moreText, "no-click" );
                }
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

    function renderControlViewGuideDay( bindingOptions, days, colorRange ) {
        var day = createElement( days, "div" );
        day.className = "day";

        addToolTip( day, bindingOptions, colorRange.tooltipText );

        if ( isHeatMapColorVisible( bindingOptions, colorRange.id ) ) {
            if ( bindingOptions.currentView.view === _elements_View_Map && isDefinedString( colorRange.mapCssClassName ) ) {
                addClass( day, colorRange.mapCssClassName );
            } else if ( bindingOptions.views.chart.enabled && bindingOptions.currentView.view === _elements_View_Chart && isDefinedString( colorRange.chartCssClassName ) ) {
                addClass( day, colorRange.chartCssClassName );
            } else if ( bindingOptions.views.statistics.enabled && bindingOptions.currentView.view === _elements_View_Statistics && isDefinedString( colorRange.statisticsCssClassName ) ) {
                addClass( day, colorRange.statisticsCssClassName );
            } else {
                addClass( day, colorRange.cssClassName );
            }   
        }

        if ( bindingOptions.showNumbersInGuide ) {
            addClass( day, "day-number" );

            day.innerHTML = colorRange.minimum + _string.plus;
        }

        if ( bindingOptions.mapTogglesEnabled ) {
            day.onclick = function() {
                toggleColorRangeVisibleState( bindingOptions, colorRange.id );
            };

        } else {
            addClass( day, "no-hover" );
        }
    }

    function renderDescription( bindingOptions, container ) {
        if ( isDefinedString( bindingOptions.descriptionText ) ) {
            if ( isDefinedString( bindingOptions.descriptionTextLink ) ) {
                var link = createElementWithHTML( container, "a", "label", bindingOptions.descriptionText );
                link.href = bindingOptions.descriptionTextLink;
                link.target = "_blank";

            } else {
                createElementWithHTML( container, "span", "label", bindingOptions.descriptionText );
            }
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Local Storage
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function loadDataFromLocalStorage( bindingOptions ) {
        if ( bindingOptions.useLocalStorageForData && _parameter_Window.localStorage ) {
            var keysLength = _parameter_Window.localStorage.length,
                elementId = bindingOptions.currentView.element.id;

            for ( var keyIndex = 0; keyIndex < keysLength; keyIndex++ ) {
                var key = _parameter_Window.localStorage.key( keyIndex );

                if ( startsWithAnyCase( key, _local_Storage_Start_ID ) ) {
                    var typesJson = _parameter_Window.localStorage.getItem( key ),
                        typesObject = getObjectFromString( typesJson );

                    if ( typesObject.parsed ) {
                        _elements_DateCounts[ elementId ].type = typesObject.result;
                        _elements_DateCounts[ elementId ].types = 0;

                        for ( var type in _elements_DateCounts[ elementId ].type ) {
                            if ( _elements_DateCounts[ elementId ].type.hasOwnProperty( type ) ) {
                                _elements_DateCounts[ elementId ].types++;
                            }
                        }
                    }
                }
            }
        }
    }

    function storeDataInLocalStorage( bindingOptions ) {
        if ( bindingOptions.useLocalStorageForData && _parameter_Window.localStorage ) {
            var elementId = bindingOptions.currentView.element.id;

            clearLocalStorageObjects( bindingOptions );

            var jsonData = _parameter_JSON.stringify( _elements_DateCounts[ elementId ].type );

            _parameter_Window.localStorage.setItem( _local_Storage_Start_ID + elementId, jsonData );
        }
    }

    function clearLocalStorageObjects( bindingOptions ) {
        if ( bindingOptions.useLocalStorageForData && _parameter_Window.localStorage ) {
            var keysLength = _parameter_Window.localStorage.length,
                keysToRemove = [],
                elementId = bindingOptions.currentView.element.id;

            for ( var keyIndex = 0; keyIndex < keysLength; keyIndex++ ) {
                if ( startsWithAnyCase( _parameter_Window.localStorage.key( keyIndex ), _local_Storage_Start_ID + elementId ) ) {
                    keysToRemove.push( _parameter_Window.localStorage.key( keyIndex ) );
                }
            }

            var keysToRemoveLength = keysToRemove.length;

            for ( var keyToRemoveIndex = 0; keyToRemoveIndex < keysToRemoveLength; keyToRemoveIndex++ ) {
                _parameter_Window.localStorage.removeItem( keysToRemove[ keyToRemoveIndex ] );
            }
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Data Pulling
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function startDataPullTimer( bindingOptions ) {
        if ( bindingOptions.currentView.isInFetchMode ) {
            if ( !isDefined( bindingOptions.currentView.isInFetchModeTimer ) ) {
                pullDataFromCustomTrigger( bindingOptions );
            }

            if ( !isDefined( bindingOptions.currentView.isInFetchModeTimer ) ) {
                bindingOptions.currentView.isInFetchModeTimer = setInterval( function() {
                    pullDataFromCustomTrigger( bindingOptions );
                    renderControlContainer( bindingOptions );
                }, bindingOptions.dataFetchDelay );
            }
        }
    }

    function pullDataFromCustomTrigger( bindingOptions ) {
        var elementId = bindingOptions.currentView.element.id,
            data = fireCustomTrigger( bindingOptions.onDataFetch, elementId );

        if ( isDefinedObject( data ) ) {
            createDateStorageForElement( elementId, bindingOptions, false );

            for ( var storageDate in data ) {
                if ( data.hasOwnProperty( storageDate ) ) {
                    if ( !_elements_DateCounts[ elementId ].type[ _configuration.unknownTrendText ].hasOwnProperty( storageDate ) ) {
                        _elements_DateCounts[ elementId ].type[ _configuration.unknownTrendText ][ storageDate ] = 0;
                    }
            
                    _elements_DateCounts[ elementId ].type[ _configuration.unknownTrendText ][ storageDate ] += data[ storageDate ];
                }
            }
        }
    }

    function cancelAllPullDataTimers() {
        for ( var elementId in _elements_DateCounts ) {
            if ( _elements_DateCounts.hasOwnProperty( elementId ) ) {
                var bindingOptions = _elements_DateCounts[ elementId ].options;

                if ( isDefined( bindingOptions.currentView.isInFetchModeTimer ) ) {
                    clearInterval( bindingOptions.currentView.isInFetchModeTimer );
                }
            }
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Color Ranges
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function isHeatMapColorVisible( bindingOptions, id ) {
        var result = false;
        
        if ( id === _internal_Name_Holiday ) {
            result = true;

        } else {
            var colorRangesLength = bindingOptions.colorRanges.length;

            for ( var colorRangesIndex = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++ ) {
                var colorRange = bindingOptions.colorRanges[ colorRangesIndex ];
    
                if ( colorRange.id === id && ( !isDefinedBoolean( colorRange.visible ) || colorRange.visible ) ) {
                    result = true;
                    break;
                }
            }
        }

        return result;
    }

    function updateColorRangeToggles( bindingOptions, flag ) {
        var colorRangesLength = bindingOptions.colorRanges.length;

        for ( var colorRangesIndex = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++ ) {
            bindingOptions.colorRanges[ colorRangesIndex ].visible = flag;

            fireCustomTrigger( bindingOptions.onColorRangeTypeToggle, bindingOptions.colorRanges[ colorRangesIndex ].id, flag );
        }

        renderControlContainer( bindingOptions );
    }

    function toggleColorRangeVisibleState( bindingOptions, id ) {
        var colorRangesLength = bindingOptions.colorRanges.length;

        for ( var colorRangesIndex = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++ ) {
            var colorRange = bindingOptions.colorRanges[ colorRangesIndex ];

            if ( colorRange.id === id ) {
                colorRange.visible = !( isDefinedBoolean( colorRange.visible ) && colorRange.visible );

                fireCustomTrigger( bindingOptions.onColorRangeTypeToggle, colorRange.id, colorRange.visible );
                renderControlContainer( bindingOptions );
                break;
            }
        }
    }

    function getColorRange( bindingOptions, colorRanges, dateCount, date ) {
        var useColorRange = null;

        if ( isDefined( date ) && isHoliday( bindingOptions, date ) ) {
            useColorRange = {
                cssClassName: "holiday",
                id: _internal_Name_Holiday,
                visible: true
            };
        }

        if ( !isDefined( useColorRange ) ) {
            var colorRangesLength = colorRanges.length;

            for ( var colorRangesIndex = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++ ) {
                var colorRange = colorRanges[ colorRangesIndex ];
    
                if ( dateCount >= colorRange.minimum ) {
                    useColorRange = colorRange;
                } else {
                    break;
                }
            }
        }

        return useColorRange;
    }

    function getColorRangeByMinimum( colorRanges, minimum ) {
        var colorRangesLength = colorRanges.length,
            useColorRange = null;

        for ( var colorRangesIndex = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++ ) {
            var colorRange = colorRanges[ colorRangesIndex ];

            if ( minimum.toString() === colorRange.minimum.toString() ) {
                useColorRange = colorRange;
                break;
            }
        }

        return useColorRange;
    }

    function getSortedColorRanges( bindingOptions ) {
        return bindingOptions.colorRanges.sort( function( a, b ) {
            return a.minimum - b.minimum;
        } );
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Holiday
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function isHoliday( bindingOptions, date ) {
        var holidaysLength = bindingOptions.holidays.length,
            holidayMatched = false,
            day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear();

        for ( var holidayIndex = 0; holidayIndex < holidaysLength; holidayIndex++ ) {
            var holiday = bindingOptions.holidays[ holidayIndex ];

            if ( isDefinedString( holiday.date ) && holiday.showInViews ) {
                var dateParts = holiday.date.split( "/" );

                if ( dateParts.length === 2 ) {
                    holidayMatched = day === parseInt( dateParts[ 0 ] ) && month === parseInt( dateParts[ 1 ] );
                } else if ( dateParts.length === 3 ) {
                    holidayMatched = day === parseInt( dateParts[ 0 ] ) && month === parseInt( dateParts[ 1 ] ) && year === parseInt( dateParts[ 2 ] );
                }

                if ( holidayMatched ) {
                    break;
                }
            }
        }

        return holidayMatched;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Import
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function makeAreaDroppable( element, bindingOptions ) {
        if ( bindingOptions.allowFileImports && !bindingOptions.currentView.isInFetchMode ) {
            element.ondragover = cancelBubble;
            element.ondragenter = cancelBubble;
            element.ondragleave = cancelBubble;
    
            element.ondrop = function( e ) {
                cancelBubble( e );
    
                if ( isDefined( _parameter_Window.FileReader ) && e.dataTransfer.files.length > 0 ) {
                    importFromFiles( e.dataTransfer.files, bindingOptions );
                }
            };
        }
    }

    function importFromFilesSelected( bindingOptions ) {
        var input = createElementWithNoContainer( "input" );
        input.type = "file";
        input.accept = ".json, .txt";
        input.multiple = "multiple";

        input.onchange = function() {
            importFromFiles( input.files, bindingOptions );
        };

        input.click();
    }

    function importFromFiles( files, bindingOptions ) {
        var filesLength = files.length,
            filesCompleted = [],
            data = getCurrentViewData( bindingOptions );

        var onLoadEnd = function( filename, readingObject ) {
            filesCompleted.push( filename );

            for ( var storageDate in readingObject ) {
                if ( readingObject.hasOwnProperty( storageDate ) ) {
                    if ( !data.hasOwnProperty( storageDate ) ) {
                        data[ storageDate ] = 0;
                    }

                    data[ storageDate ] += readingObject[ storageDate ];
                }
            }
            
            if ( filesCompleted.length === filesLength ) {
                fireCustomTrigger( bindingOptions.onImport, bindingOptions.currentView.element );
                renderControlContainer( bindingOptions );
            }
        };

        for ( var fileIndex = 0; fileIndex < filesLength; fileIndex++ ) {
            var file = files[ fileIndex ],
                fileExtension = file.name.split( "." ).pop().toLowerCase();

            if ( fileExtension === _export_Type_Json ) {
                importFromJson( file, onLoadEnd );
            } else if ( fileExtension === _export_Type_Txt ) {
                importFromTxt( file, onLoadEnd );
            }
        }
    }

    function importFromJson( file, onLoadEnd ) {
        var reader = new FileReader(),
            readingObject = null;

        reader.readAsText( file );

        reader.onloadend = function() {
            onLoadEnd( file.name, readingObject );
        };
    
        reader.onload = function( e ) {
            var jsonObject = getObjectFromString( e.target.result );

            if ( jsonObject.parsed && isDefinedObject( jsonObject.result ) ) {
                readingObject = jsonObject.result;
            }
        };
    }

    function importFromTxt( file, onLoadEnd ) {
        var reader = new FileReader(),
            readingObject = {};

        reader.readAsText( file );

        reader.onloadend = function() {
            onLoadEnd( file.name, readingObject );
        };
    
        reader.onload = function( e ) {
            var lines = e.target.result.toString().split( _string.newLine ),
                linesLength = lines.length;

            for ( var lineIndex = 0; lineIndex < linesLength; lineIndex++ ) {
                var line = lines[ lineIndex ].split( ":" );

                readingObject[ line[ 0 ].trim() ] = parseInt( line[ 1 ].trim() );
            }
        };
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Export
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function exportAllData( bindingOptions ) {
        var contents = null,
            contentsMimeType = getExportMimeType( bindingOptions );

        if ( bindingOptions.exportType.toLowerCase() === _export_Type_Csv ) {
            contents = getCsvContent( bindingOptions );
        } else if ( bindingOptions.exportType.toLowerCase() === _export_Type_Json ) {
            contents = getJsonContent( bindingOptions );
        } else if ( bindingOptions.exportType.toLowerCase() === _export_Type_Xml ) {
            contents = getXmlContents( bindingOptions );
        } else if ( bindingOptions.exportType.toLowerCase() === _export_Type_Txt ) {
            contents = getTxtContents( bindingOptions );
        }

        if ( contents !== _string.empty ) {
            var tempLink = createElement( _parameter_Document.body, "a" );
            tempLink.style.display = "none";
            tempLink.setAttribute( "target", "_blank" );
            tempLink.setAttribute( "href", "data:" + contentsMimeType + ";charset=utf-8," + encodeURIComponent( contents ) );
            tempLink.setAttribute( "download", getExportFilename( bindingOptions ) );
            tempLink.click();
            
            _parameter_Document.body.removeChild( tempLink );

            fireCustomTrigger( bindingOptions.onExport, bindingOptions.currentView.element );
        }
    }

    function getCsvContent( bindingOptions ) {
        var data = getExportData( bindingOptions ),
            csvContents = [];

        for ( var storageDate in data ) {
            if ( data.hasOwnProperty( storageDate ) ) {
                csvContents.push( getCsvValueLine( [ getCsvValue( storageDate ), getCsvValue( data[ storageDate ] ) ] ) );
            }
        }

        if ( csvContents.length > 0 ) {
            csvContents.unshift( getCsvValueLine( [ getCsvValue( _configuration.dateText ), getCsvValue( _configuration.countText ) ] ) );
        }
        
        return csvContents.join( _string.newLine );
    }

    function getJsonContent( bindingOptions ) {
        return _parameter_JSON.stringify( getExportData( bindingOptions ) );
    }

    function getXmlContents( bindingOptions ) {
        var data = getExportData( bindingOptions ),
            contents = [];

        contents.push( "<?xml version=\"1.0\" ?>" );
        contents.push( "<Dates>" );

        for ( var storageDate in data ) {
            if ( data.hasOwnProperty( storageDate ) ) {
                contents.push( "<Date>" );
                contents.push( "<FullDate>" + storageDate + "</FullDate>" );
                contents.push( "<Count>" + data[ storageDate ] + "</Count>" );
                contents.push( "</Date>" );
            }
        }

        contents.push( "</Dates>" );

        return contents.join( _string.newLine );
    }

    function getTxtContents( bindingOptions ) {
        var data = getExportData( bindingOptions ),
            contents = [];

        for ( var storageDate in data ) {
            if ( data.hasOwnProperty( storageDate ) ) {
                contents.push( storageDate + ": " + data[ storageDate ].toString() );
            }
        }

        return contents.join( _string.newLine );
    }

    function getExportData( bindingOptions ) {
        var contents = {},
            data = getCurrentViewData( bindingOptions );

        if ( bindingOptions.exportOnlyYearBeingViewed ) {
            for ( var monthIndex = 0; monthIndex < 12; monthIndex++ ) {
                var totalDaysInMonth = getTotalDaysInMonth( bindingOptions.currentView.year, monthIndex );
        
                for ( var dayIndex = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
                    var storageDate2 = toStorageDate( new Date( bindingOptions.currentView.year, monthIndex, dayIndex + 1 ) );

                    if ( data.hasOwnProperty( storageDate2 ) ) {
                        contents[ storageDate2 ] = data[ storageDate2 ];
                    }
                }
            }

        } else {
            var storageDates = [];

            for ( var storageDate1 in data ) {
                if ( data.hasOwnProperty( storageDate1 ) ) {
                    storageDates.push( storageDate1 );
                }
            }
    
            storageDates.sort();

            var storageDatesLength = storageDates.length;

            for ( var storageDateIndex = 0; storageDateIndex < storageDatesLength; storageDateIndex++ ) {
                var storageDate3 = storageDates[ storageDateIndex ];
    
                if ( data.hasOwnProperty( storageDate3 ) ) {
                    contents[ storageDate3 ] = data[ storageDate3 ];
                }
            }
        }

        return contents;
    }

    function getExportMimeType( bindingOptions ) {
        var result = null;

        if ( bindingOptions.exportType.toLowerCase() === _export_Type_Csv ) {
            result = "text/csv";
        } else if ( bindingOptions.exportType.toLowerCase() === _export_Type_Json ) {
            result = "application/json";
        } else if ( bindingOptions.exportType.toLowerCase() === _export_Type_Xml ) {
            result = "application/xml";
        } else if ( bindingOptions.exportType.toLowerCase() === _export_Type_Txt ) {
            result = "text/plain";
        }

        return result;
    }

    function getExportFilename( bindingOptions ) {
        var date = new Date(),
            datePart = padNumber( date.getDate() ) + _string.dash + padNumber( date.getMonth() + 1 ) + _string.dash + date.getFullYear(),
            timePart = padNumber( date.getHours() ) + _string.dash + padNumber( date.getMinutes() ),
            filenameStart = _string.empty;

        if ( bindingOptions.currentView.type !== _configuration.unknownTrendText ) {
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
     * Attribute Options
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function buildAttributeOptions( newOptions ) {
        var options = !isDefinedObject( newOptions ) ? {} : newOptions;
        options.views = !isDefinedObject( options.views ) ? {} : options.views;
        options.showGuide = getDefaultBoolean( options.showGuide, true );
        options.showTitle = getDefaultBoolean( options.showTitle, true );
        options.showYearSelector = getDefaultBoolean( options.showYearSelector, true );
        options.showRefreshButton = getDefaultBoolean( options.showRefreshButton, false );
        options.showExportButton = getDefaultBoolean( options.showExportButton, false );
        options.mapTogglesEnabled = getDefaultBoolean( options.mapTogglesEnabled, true );
        options.exportOnlyYearBeingViewed = getDefaultBoolean( options.exportOnlyYearBeingViewed, true );
        options.year = getDefaultNumber( options.year, new Date().getFullYear() );
        options.keepScrollPositions = getDefaultBoolean( options.keepScrollPositions, false );
        options.extraSelectionYears = getDefaultNumber( options.extraSelectionYears, 50 );
        options.showYearSelectionDropDown = getDefaultBoolean( options.showYearSelectionDropDown, true );
        options.view = getDefaultString( options.view, _elements_View_Name_Map );
        options.tooltipDelay = getDefaultNumber( options.tooltipDelay, 750 );
        options.exportType = getDefaultString( options.exportType, _export_Type_Csv );
        options.descriptionText = getDefaultString( options.descriptionText, null );
        options.descriptionTextLink = getDefaultString( options.descriptionTextLink, null );
        options.useLocalStorageForData = getDefaultBoolean( options.useLocalStorageForData, false );
        options.allowFileImports = getDefaultBoolean( options.allowFileImports, true );
        options.yearsToHide = getDefaultArray( options.yearsToHide, [] );
        options.showLessAndMoreLabels = getDefaultBoolean( options.showLessAndMoreLabels, true );
        options.showNumbersInGuide = getDefaultBoolean( options.showNumbersInGuide, false );
        options.showImportButton = getDefaultBoolean( options.showImportButton, false );
        options.dataFetchDelay = getDefaultNumber( options.dataFetchDelay, 60000 );

        options = buildAttributeOptionColorRanges( options );
        options = buildAttributeOptionHolidays( options );
        options = buildAttributeOptionMapView( options );
        options = buildAttributeOptionChartView( options );
        options = buildAttributeOptionStatisticsView( options );
        options = buildAttributeOptionStrings( options );
        
        return buildAttributeOptionCustomTriggers( options );
    }

    function buildAttributeOptionColorRanges( options ) {
        if ( isDefinedArray( options.colorRanges ) ) {
            var colorRangesLength = options.colorRanges.length;

            for ( var colorRangeIndex = 0; colorRangeIndex < colorRangesLength; colorRangeIndex++ ) {
                options.colorRanges[ colorRangeIndex ].id = getDefaultString( options.colorRanges[ colorRangeIndex ].id, newGuid() );
                options.colorRanges[ colorRangeIndex ].name = getDefaultString( options.colorRanges[ colorRangeIndex ].name, null );
                options.colorRanges[ colorRangeIndex ].minimum = getDefaultNumber( options.colorRanges[ colorRangeIndex ].minimum, 0 );
                options.colorRanges[ colorRangeIndex ].cssClassName = getDefaultString( options.colorRanges[ colorRangeIndex ].cssClassName, null );
                options.colorRanges[ colorRangeIndex ].mapCssClassName = getDefaultString( options.colorRanges[ colorRangeIndex ].mapCssClassName, null );
                options.colorRanges[ colorRangeIndex ].chartCssClassName = getDefaultString( options.colorRanges[ colorRangeIndex ].chartCssClassName, null );
                options.colorRanges[ colorRangeIndex ].statisticsCssClassName = getDefaultString( options.colorRanges[ colorRangeIndex ].statisticsCssClassName, null );
                options.colorRanges[ colorRangeIndex ].tooltipText = getDefaultString( options.colorRanges[ colorRangeIndex ].tooltipText, null );
                options.colorRanges[ colorRangeIndex ].visible = getDefaultBoolean( options.colorRanges[ colorRangeIndex ].visible, true );
            }

        } else {
            options.colorRanges = [
                {
                    id: newGuid(),
                    name: "Day Color 1",
                    minimum: 10,
                    cssClassName: "day-color-1",
                    tooltipText: "Day Color 1",
                    visible: true
                },
                {
                    id: newGuid(),
                    name: "Day Color 2",
                    minimum: 15,
                    cssClassName: "day-color-2",
                    tooltipText: "Day Color 2",
                    visible: true
                },
                {
                    id: newGuid(),
                    name: "Day Color 3",
                    minimum: 20,
                    cssClassName: "day-color-3",
                    tooltipText: "Day Color 3",
                    visible: true
                },
                {
                    id: newGuid(),
                    name: "Day Color 4",
                    minimum: 25,
                    cssClassName: "day-color-4",
                    tooltipText: "Day Color 4",
                    visible: true
                }
            ];
        }

        return options;
    }

    function buildAttributeOptionHolidays( options ) {
        if ( isDefinedArray( options.holidays ) ) {
            var holidaysLength = options.holidays.length;

            for ( var holidayIndex = 0; holidayIndex < holidaysLength; holidayIndex++ ) {
                options.holidays[ holidayIndex ].date = getDefaultString( options.holidays[ holidayIndex ].date, null );
                options.holidays[ holidayIndex ].name = getDefaultString( options.holidays[ holidayIndex ].name, null );
                options.holidays[ holidayIndex ].showInViews = getDefaultBoolean( options.holidays[ holidayIndex ].showInViews, true );
            }

        } else {
            options.holidays = [];
        }

        return options;
    }

    function buildAttributeOptionMapView( options ) {
        options.views.map = !isDefinedObject( options.views.map ) ? {} : options.views.map;
        options.views.map.showMonthDayGaps = getDefaultBoolean( options.views.map.showMonthDayGaps, true );
        options.views.map.showDayNames = getDefaultBoolean( options.views.map.showDayNames, true );
        options.views.map.placeMonthNamesOnTheBottom = getDefaultBoolean( options.views.map.placeMonthNamesOnTheBottom, false );
        options.views.map.showDayNumbers = getDefaultBoolean( options.views.map.showDayNumbers, false );
        options.views.map.showMonthNames = getDefaultBoolean( options.views.map.showMonthNames, true );
        options.views.map.showDaysInReverseOrder = getDefaultBoolean( options.views.map.showDaysInReverseOrder, false );
        options.views.map.showNoDataMessageWhenDataIsNotAvailable = getDefaultBoolean( options.views.map.showNoDataMessageWhenDataIsNotAvailable, false );

        if ( isInvalidOptionArray( options.views.map.monthsToShow ) ) {
            options.views.map.monthsToShow = _default_MonthsToShow;
        }

        if ( isInvalidOptionArray( options.views.map.daysToShow ) ) {
            options.views.map.daysToShow = _default_DaysToShow;
        }

        return options;
    }

    function buildAttributeOptionChartView( options ) {
        options.views.chart = !isDefinedObject( options.views.chart ) ? {} : options.views.chart;
        options.views.chart.enabled = getDefaultBoolean( options.views.chart.enabled, true );
        options.views.chart.showChartYLabels = getDefaultBoolean( options.views.chart.showChartYLabels, true );
        options.views.chart.showMonthNames = getDefaultBoolean( options.views.chart.showMonthNames, true );
        options.views.chart.showLineNumbers = getDefaultBoolean( options.views.chart.showLineNumbers, false );

        if ( isInvalidOptionArray( options.views.chart.monthsToShow ) ) {
            options.views.chart.monthsToShow = _default_MonthsToShow;
        }

        if ( isInvalidOptionArray( options.views.chart.daysToShow ) ) {
            options.views.chart.daysToShow = _default_DaysToShow;
        }

        return options;
    }

    function buildAttributeOptionStatisticsView( options ) {
        options.views.statistics = !isDefinedObject( options.views.statistics ) ? {} : options.views.statistics;
        options.views.statistics.enabled = getDefaultBoolean( options.views.statistics.enabled, true );
        options.views.statistics.showChartYLabels = getDefaultBoolean( options.views.statistics.showChartYLabels, true );
        options.views.statistics.showColorRangeLabels = getDefaultBoolean( options.views.statistics.showColorRangeLabels, true );
        options.views.statistics.useColorRangeNamesForLabels = getDefaultBoolean( options.views.statistics.useColorRangeNamesForLabels, false );

        if ( isInvalidOptionArray( options.views.statistics.monthsToShow ) ) {
            options.views.statistics.monthsToShow = _default_MonthsToShow;
        }

        if ( isInvalidOptionArray( options.views.statistics.daysToShow ) ) {
            options.views.statistics.daysToShow = _default_DaysToShow;
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
        options.onViewSwitch = getDefaultFunction( options.onViewSwitch, null );
        options.onColorRangeTypeToggle = getDefaultFunction( options.onColorRangeTypeToggle, null );
        options.onImport = getDefaultFunction( options.onImport, null );
        options.onStatisticClick = getDefaultFunction( options.onStatisticClick, null );
        options.onDataFetch = getDefaultFunction( options.onDataFetch, null );

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

    function isDefinedDate( object ) {
        return isDefinedObject( object ) && object instanceof Date;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Element Handling
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function createElementWithNoContainer( type ) {
        var result = null,
            nodeType = type.toLowerCase(),
            isText = nodeType === "text";

        if ( !_elements_Type.hasOwnProperty( nodeType ) ) {
            _elements_Type[ nodeType ] = isText ? _parameter_Document.createTextNode( _string.empty ) : _parameter_Document.createElement( nodeType );
        }

        result = _elements_Type[ nodeType ].cloneNode( false );

        return result;
    }

    function createElement( container, type, className, beforeNode ) {
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

        if ( isDefined( beforeNode ) ) {
            container.insertBefore( result, beforeNode );
        } else {
            container.appendChild( result );
        }

        return result;
    }

    function createElementWithHTML( container, type, className, html, beforeNode ) {
        var element = createElement( container, type, className, beforeNode );
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

    function reverseElementsOrder( parent ) {
        var children = parent.children,
            childrenLength = children.length - 1;

        for ( ; childrenLength--; ) {
            parent.appendChild( children[ childrenLength ] );
        }
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
                result = _parameter_JSON.parse( objectString );
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

            var character = _parameter_Math.floor( _parameter_Math.random() * 16 ).toString( 16 );
            result.push( character );
        }

        return result.join( _string.empty );
    }

    function padNumber( number ) {
        var numberString = number.toString();

        return numberString.length === 1 ? "0" + numberString : numberString;
    }

    function startsWithAnyCase( data, start ) {
        return data.substring( 0, start.length ).toLowerCase() === start.toLowerCase();
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Storage Dates
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function toStorageDate( date ) {
        return date.getFullYear() + _string.dash + padNumber( date.getMonth() + 1 ) + _string.dash + padNumber( date.getDate() );
    }

    function getStorageDate( data ) {
        return data.split( _string.dash );
    }

    function getStorageDateYear( data ) {
        return data.split( _string.dash )[ 0 ];
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
        if ( isDefinedString( elementId ) && isDefinedArray( dates ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
            var bindingOptions = _elements_DateCounts[ elementId ].options;
            
            if ( !bindingOptions.currentView.isInFetchMode ) {
                triggerRefresh = !isDefinedBoolean( triggerRefresh ) ? true : triggerRefresh;
                type = !isDefinedString( type ) ? _configuration.unknownTrendText : type;
    
                var datesLength = dates.length;
    
                for ( var dateIndex = 0; dateIndex < datesLength; dateIndex++ ) {
                    this.addDate( elementId, dates[ dateIndex ], type, false );
                }
    
                if ( triggerRefresh ) {
                    renderControlContainer( bindingOptions, true );
                }
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
        if ( isDefinedString( elementId ) && isDefinedDate( date ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
            var bindingOptions = _elements_DateCounts[ elementId ].options;
            
            if ( !bindingOptions.currentView.isInFetchMode ) {
                triggerRefresh = !isDefinedBoolean( triggerRefresh ) ? true : triggerRefresh;
                type = !isDefinedString( type ) ? _configuration.unknownTrendText : type;
    
                var storageDate = toStorageDate( date );
    
                if ( !_elements_DateCounts[ elementId ].type.hasOwnProperty( type ) ) {
                    _elements_DateCounts[ elementId ].type[ type ] = {};
                    _elements_DateCounts[ elementId ].types++;
                }
    
                if ( !_elements_DateCounts[ elementId ].type[ type ].hasOwnProperty( storageDate ) ) {
                    _elements_DateCounts[ elementId ].type[ type ][ storageDate ] = 0;
                }
        
                _elements_DateCounts[ elementId ].type[ type ][ storageDate ]++;
    
                fireCustomTrigger( bindingOptions.onAdd, bindingOptions.currentView.element );
    
                if ( triggerRefresh ) {
                    renderControlContainer( bindingOptions, true );
                }
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
        if ( isDefinedString( elementId ) && isDefinedArray( dates ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
            var bindingOptions = _elements_DateCounts[ elementId ].options;
            
            if ( !bindingOptions.currentView.isInFetchMode ) {
                type = !isDefinedString( type ) ? _configuration.unknownTrendText : type;
                triggerRefresh = !isDefinedBoolean( triggerRefresh ) ? true : triggerRefresh;
    
                var datesLength = dates.length;
    
                for ( var dateIndex = 0; dateIndex < datesLength; dateIndex++ ) {
                    this.removeDate( elementId, dates[ dateIndex ], type, false );
                }
    
                if ( triggerRefresh ) {
                    renderControlContainer( bindingOptions, true );
                }
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
        if ( isDefinedString( elementId ) && isDefinedDate( date ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
            var bindingOptions = _elements_DateCounts[ elementId ].options;
            
            if ( !bindingOptions.currentView.isInFetchMode ) {
                type = !isDefinedString( type ) ? _configuration.unknownTrendText : type;

                var storageDate = toStorageDate( date );
    
                if ( _elements_DateCounts[ elementId ].type.hasOwnProperty( type ) && _elements_DateCounts[ elementId ].type[ type ].hasOwnProperty( storageDate ) ) {
                    triggerRefresh = !isDefinedBoolean( triggerRefresh ) ? true : triggerRefresh;
    
                    if ( _elements_DateCounts[ elementId ].type[ type ][ storageDate ] > 0 ) {
                        _elements_DateCounts[ elementId ].type[ type ][ storageDate ]--;
                    }
    
                    fireCustomTrigger( bindingOptions.onRemove, bindingOptions.currentView.element );
    
                    if ( triggerRefresh ) {
                        renderControlContainer( bindingOptions, true );
                    }
                }
            }
        }

        return this;
    };

    /**
     * resetAll().
     * 
     * Removes all the dates for all the elements, and refreshes the UI (if specified).
     * 
     * @public
     * @fires       onReset
     * 
     * @param       {boolean}   [triggerRefresh]                            States if the UI for each element should be refreshed (defaults to true).
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    this.resetAll = function( triggerRefresh ) {
        for ( var elementId in _elements_DateCounts ) {
            if ( _elements_DateCounts.hasOwnProperty( elementId ) ) {
                this.reset( elementId, triggerRefresh );
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
        if ( isDefinedString( elementId ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
            var bindingOptions = _elements_DateCounts[ elementId ].options;
            
            if ( !bindingOptions.currentView.isInFetchMode ) {
                triggerRefresh = !isDefinedBoolean( triggerRefresh ) ? true : triggerRefresh;
            
                bindingOptions.currentView.type = _configuration.unknownTrendText;
    
                createDateStorageForElement( elementId, bindingOptions, false );
                fireCustomTrigger( bindingOptions.onReset, bindingOptions.currentView.element );
    
                if ( triggerRefresh ) {
                    renderControlContainer( bindingOptions, true );
                }
            }
        }

        return this;
    };

    /**
     * export().
     * 
     * Exports all the data for a specific element ID.
     * 
     * @public
     * @fires       onExport
     * 
     * @param       {string}    elementId                                   The Heat.js element ID whose data should be exported.
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    this.export = function( elementId ) {
        if ( isDefinedString( elementId ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
            exportAllData( _elements_DateCounts[ elementId ].options );
        }

        return this;
    };


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
        if ( isDefinedString( elementId ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
            var bindingOptions = _elements_DateCounts[ elementId ].options;

            renderControlContainer( bindingOptions, true );
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

                renderControlContainer( bindingOptions, true );
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
        if ( isDefinedString( elementId ) && isDefinedNumber( year ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
            var bindingOptions = _elements_DateCounts[ elementId ].options;

            if ( bindingOptions.yearsToHide.indexOf( year ) === _value.notFound ) {
                bindingOptions.currentView.year = year;

                renderControlContainer( bindingOptions );
                fireCustomTrigger( bindingOptions.onSetYear, bindingOptions.currentView.year );
            }
        }

        return this;
    };

    /**
     * setYearToHighest().
     * 
     * Sets the year to the highest year available.
     * 
     * @public
     * @fires       onSetYear
     * 
     * @param       {string}    elementId                                   The Heat.js element ID that should be updated.
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    this.setYearToHighest = function( elementId ) {
        if ( isDefinedString( elementId ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
            var bindingOptions = _elements_DateCounts[ elementId ].options,
                data = getCurrentViewData( bindingOptions ),
                maximumYear = 0;

            for ( var storageDate in data ) {
                if ( data.hasOwnProperty( storageDate ) ) {
                    maximumYear = _parameter_Math.max( maximumYear, parseInt( getStorageDateYear( storageDate ) ) );
                }
            }

            if ( maximumYear > 0 && bindingOptions.yearsToHide.indexOf( maximumYear ) === _value.notFound ) {
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
     * Sets the year to the lowest year available.
     * 
     * @public
     * @fires       onSetYear
     * 
     * @param       {string}    elementId                                   The Heat.js element ID that should be updated.
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    this.setYearToLowest = function( elementId ) {
        if ( isDefinedString( elementId ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
            var bindingOptions = _elements_DateCounts[ elementId ].options,
                data = getCurrentViewData( bindingOptions ),
                minimumYear = 9999;

            for ( var storageDate in data ) {
                if ( data.hasOwnProperty( storageDate ) ) {
                    minimumYear = _parameter_Math.min( minimumYear, parseInt( getStorageDateYear( storageDate ) ) );
                }
            }

            if ( minimumYear < 9999 && bindingOptions.yearsToHide.indexOf( minimumYear ) === _value.notFound ) {
                bindingOptions.currentView.year = minimumYear;

                renderControlContainer( bindingOptions );
                fireCustomTrigger( bindingOptions.onSetYear, bindingOptions.currentView.year );
            }
        }

        return this;
    };

    /**
     * moveToPreviousYear().
     * 
     * Moves the year back one.
     * 
     * @public
     * @fires       onBackYear
     * 
     * @param       {string}    elementId                                   The Heat.js element ID that should be updated.
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    this.moveToPreviousYear = function( elementId ) {
        if ( isDefinedString( elementId ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
            var bindingOptions = _elements_DateCounts[ elementId ].options;

            bindingOptions.currentView.year--;

            while ( bindingOptions.yearsToHide.indexOf( bindingOptions.currentView.year ) > _value.notFound ) {
                bindingOptions.currentView.year--;
            }

            renderControlContainer( bindingOptions );
            fireCustomTrigger( bindingOptions.onBackYear, bindingOptions.currentView.year );
        }

        return this;
    };

    /**
     * moveToNextYear().
     * 
     * Moves the year forward one.
     * 
     * @public
     * @fires       onNextYear
     * 
     * @param       {string}    elementId                                   The Heat.js element ID that should be updated.
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    this.moveToNextYear = function( elementId ) {
        if ( isDefinedString( elementId ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
            var bindingOptions = _elements_DateCounts[ elementId ].options;

            bindingOptions.currentView.year++;

            while ( bindingOptions.yearsToHide.indexOf( bindingOptions.currentView.year ) > _value.notFound ) {
                bindingOptions.currentView.year++;
            }

            renderControlContainer( bindingOptions );
            fireCustomTrigger( bindingOptions.onNextYear, bindingOptions.currentView.year );
        }

        return this;
    };

    /**
     * moveToCurrentYear().
     * 
     * Moves to the current year.
     * 
     * @public
     * @fires       onSetYear
     * 
     * @param       {string}    elementId                                   The Heat.js element ID that should be updated.
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    this.moveToCurrentYear = function( elementId ) {
        if ( isDefinedString( elementId ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
            var bindingOptions = _elements_DateCounts[ elementId ].options;
            bindingOptions.currentView.year = new Date().getFullYear();

            renderControlContainer( bindingOptions );
            fireCustomTrigger( bindingOptions.onSetYear, bindingOptions.currentView.year );
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

        if ( isDefinedString( elementId ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
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
        if ( isDefinedObject( element ) && isDefinedObject( options ) ) {
            renderControl( renderBindingOptions( options, element ) );
        }

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

    /**
     * switchView().
     * 
     * Switches the view on an element to either Map, Chart, or Statistics.
     * 
     * @public
     * @fires       onViewSwitch
     * 
     * @param       {string}    elementId                                   The Heat.js element ID.
     * @param       {string}    viewName                                    The name of the view to switch to (either "map", "chart", or "statistics").
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    this.switchView = function( elementId, viewName ) {
        if ( isDefinedString( elementId ) && isDefinedString( viewName ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
            var bindingOptions = _elements_DateCounts[ elementId ].options,
                view = null;

            if ( viewName.toLowerCase() === _elements_View_Name_Map ) {
                view = _elements_View_Map;
            } else if ( viewName.toLowerCase() === _elements_View_Name_Chart ) {
                view = _elements_View_Chart;
            } else if ( viewName.toLowerCase() === _elements_View_Name_Statistics ) {
                view = _elements_View_Statistics;
            }

            if ( isDefinedNumber( view ) ) {
                bindingOptions.currentView.view = view;

                fireCustomTrigger( bindingOptions.onViewSwitch, viewName );
                renderControlContainer( bindingOptions, false, true );
            }
        }

        return this;
    };

    /**
     * switchType().
     * 
     * Switches the selected trend type on an element.
     * 
     * @public
     * @fires       onTypeSwitch
     * 
     * @param       {string}    elementId                                   The Heat.js element ID.
     * @param       {string}    type                                        The name of the type to switch to.
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    this.switchType = function( elementId, type ) {
        if ( isDefinedString( elementId ) && isDefinedString( type ) && _elements_DateCounts.hasOwnProperty( elementId ) && _elements_DateCounts[ elementId ].type.hasOwnProperty( type ) ) {
            var bindingOptions = _elements_DateCounts[ elementId ].options;

            if ( bindingOptions.currentView.type !== type ) {
                bindingOptions.currentView.type = type;
            
                fireCustomTrigger( bindingOptions.onTypeSwitch, type );
                renderControlContainer( bindingOptions );
            }
        }

        return this;
    };

    /**
     * updateOptions().
     * 
     * Updates the original binding options for an element and refreshes it.
     * 
     * @public
     * @fires       onRefresh
     * 
     * @param       {string}    elementId                                   The Heat.js element ID.
     * @param       {Object}    newOptions                                  The new options to want to apply to the element.
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    this.updateOptions = function( elementId, newOptions ) {
        if ( isDefinedString( elementId ) && isDefinedObject( newOptions ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
            var bindingOptions = _elements_DateCounts[ elementId ].options,
                newBindingOptions = buildAttributeOptions( newOptions ),
                optionChanged = false;

            for ( var propertyName in newBindingOptions ) {
                if ( newBindingOptions.hasOwnProperty( propertyName ) && bindingOptions.hasOwnProperty( propertyName ) && bindingOptions[ propertyName ] !== newBindingOptions[ propertyName ] ) {
                    bindingOptions[ propertyName ] = newBindingOptions[ propertyName ];
                    optionChanged = true;
                }
            }

            if ( optionChanged ) {
                renderControlContainer( bindingOptions, true );
                fireCustomTrigger( bindingOptions.onRefresh, bindingOptions.currentView.element );
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
     * Reverts all rendered elements to their original state (without render attributes).
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
     * Reverts an element to its original state (without render attributes).
     * 
     * @public
     * @fires       onDestroy
     * 
     * @param       {string}    elementId                                   The Heat.js element ID to destroy.
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    this.destroy = function( elementId ) {
        if ( isDefinedString( elementId ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
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
     * @fires       onRefresh
     * 
     * @param       {Object}    newConfiguration                            All the configuration options that should be set (refer to "Configuration Options" documentation for properties).
     * @param       {boolean}   [triggerRefresh]                            States if the UI for each element should be refreshed (defaults to true).
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    this.setConfiguration = function( newConfiguration, triggerRefresh ) {
        if ( isDefinedObject( newConfiguration ) ) {
            var configurationHasChanged = false;
        
            for ( var propertyName in newConfiguration ) {
                if ( newConfiguration.hasOwnProperty( propertyName ) && _configuration.hasOwnProperty( propertyName ) && _configuration[ propertyName ] !== newConfiguration[ propertyName ] ) {
                    _configuration[ propertyName ] = newConfiguration[ propertyName ];
                    configurationHasChanged = true;
                }
            }
    
            if ( configurationHasChanged ) {
                triggerRefresh = !isDefined( triggerRefresh ) ? true: triggerRefresh;
    
                buildDefaultConfiguration( _configuration );
    
                if ( triggerRefresh ) {
                    this.refreshAll();
                }
            }
        }

        return this;
    };

    function buildDefaultConfiguration( newConfiguration ) {
        _configuration = !isDefinedObject( newConfiguration ) ? {} : newConfiguration;
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
        _configuration.noChartDataMessage = getDefaultString( _configuration.noChartDataMessage, "There is currently no data to view." );
        _configuration.statisticsText = getDefaultString( _configuration.statisticsText, "Statistics" );
        _configuration.noStatisticsDataMessage = getDefaultString( _configuration.noStatisticsDataMessage, "There are currently no statistics to view." );
        _configuration.unknownTrendText = getDefaultString( _configuration.unknownTrendText, "Unknown" );
        _configuration.importButtonText = getDefaultString( _configuration.importButtonText, "Import" );
        _configuration.noMapDataMessage = getDefaultString( _configuration.noMapDataMessage, "There is currently no data to view." );
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
     * getIds().
     * 
     * Returns an array of element IDs that have been rendered.
     * 
     * @public
     * 
     * @returns     {string[]}                                              The element IDs that have been rendered.
     */
    this.getIds = function() {
        var result = [];
        
        for ( var elementId in _elements_DateCounts ) {
            if ( _elements_DateCounts.hasOwnProperty( elementId ) ) {
                result.push( elementId );
            }
        }

        return result;
    };

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
        return "2.5.0";
    };


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Initialize Heat.js
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    ( function ( documentObject, windowObject, mathObject, jsonObject ) {
        _parameter_Document = documentObject;
        _parameter_Window = windowObject;
        _parameter_Math = mathObject;
        _parameter_JSON = jsonObject;

        buildDefaultConfiguration();

        _parameter_Document.addEventListener( "DOMContentLoaded", function() {
            render();
        } );

        _parameter_Window.addEventListener( "unload", function() {
            cancelAllPullDataTimers();
        } );

        if ( !isDefined( _parameter_Window.$heat ) ) {
            _parameter_Window.$heat = this;
        }

    } ) ( document, window, Math, JSON );
} )();