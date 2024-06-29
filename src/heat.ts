import {
    type Configuration,
    type Holiday,
    type ColorRange,
    type BindingOptions,
    type BindingOptionsCurrentView,
    type Title,
    type Description,
    type Guide,
    type Tooltip,
    type Map, 
    type Chart,
    type Days,
    type Statistics,
    type Events } from "./ts/types";

import { type PublicApi } from "./ts/api";

( ( documentObject, windowObject, mathObject, jsonObject ) => {

    // Variables: Configuration
    let _configuration: Configuration = {} as Configuration;

    // Variables: Elements
    const _elements_Type: object = {};
    let _elements_Day_Width: number = null;

    // Enum: Strings
    const enum _string {
        empty = "",
        space = " ",
        newLine = "\n",
        dash = "-",
        underscore = "_",
        plus = "+",
        zero = "0",
        colon = ":",
        comma = ","
    };
    
    // Enum: Values
    const enum _value {
        notFound = -1
    };
    
    // Enum: View
    const enum _view {
        map = 1,
        chart = 2,
        days = 3,
        statistics = 4
    };
    
    // Enum: View (names)
    const enum _viewName {
        map = "map",
        chart = "chart",
        days = "days",
        statistics = "statistics"
    };
    
    // Enum: Export Types
    const enum _exportType {
        csv = "csv",
        json = "json",
        xml = "xml",
        txt = "txt"
    };

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
     * Render:  Disabled Background
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderDisabledBackground( bindingOptions: BindingOptions ) : void {
        bindingOptions._currentView.disabledBackground = createElement( bindingOptions._currentView.element, "div", "disabled" );
    }

    function showDisabledBackground( bindingOptions: BindingOptions ) : void {
        if ( isDefined( bindingOptions._currentView.disabledBackground ) && bindingOptions._currentView.disabledBackground.style.display !== "block" ) {
            bindingOptions._currentView.disabledBackground.style.display = "block";
        }
    }

    function hideDisabledBackground( bindingOptions: BindingOptions ) : void {
        if ( isDefined( bindingOptions._currentView.disabledBackground ) && bindingOptions._currentView.disabledBackground.style.display !== "none" ) {
            bindingOptions._currentView.disabledBackground.style.display = "none";
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function render() : void {
        const tagTypes: string[] = _configuration.domElementTypes;
        const tagTypesLength: number = tagTypes.length;

        for ( let tagTypeIndex: number = 0; tagTypeIndex < tagTypesLength; tagTypeIndex++ ) {
            const domElements: HTMLCollectionOf<Element> = documentObject.getElementsByTagName( tagTypes[ tagTypeIndex ] );
            const elements: HTMLElement[] = [].slice.call( domElements );
            const elementsLength: number = elements.length;

            for ( let elementIndex: number = 0; elementIndex < elementsLength; elementIndex++ ) {
                if ( !renderElement( elements[ elementIndex ] ) ) {
                    break;
                }
            }
        }
    }

    function renderElement( element: HTMLElement ) : boolean {
        let result: boolean = true;

        if ( isDefined( element ) && element.hasAttribute( _attribute_Name_Options ) ) {
            const bindingOptionsData: string = element.getAttribute( _attribute_Name_Options );

            if ( isDefinedString( bindingOptionsData ) ) {
                const bindingOptions: any = getObjectFromString( bindingOptionsData );

                if ( bindingOptions.parsed && isDefinedObject( bindingOptions.result ) ) {
                    renderControl( renderBindingOptions( bindingOptions.result, element ) );

                } else {
                    if ( !_configuration.safeMode ) {
                        console.error( _configuration.attributeNotValidErrorText.replace( "{{attribute_name}}", _attribute_Name_Options ) );
                        result = false;
                    }
                }

            } else {
                if ( !_configuration.safeMode ) {
                    console.error( _configuration.attributeNotSetErrorText.replace( "{{attribute_name}}", _attribute_Name_Options ) );
                    result = false;
                }
            }
        }

        return result;
    }

    function renderBindingOptions( data: any, element: HTMLElement ) : BindingOptions {
        const bindingOptions: BindingOptions = buildAttributeOptions( data );
        const view: string = !isDefinedString( bindingOptions.view ) ? _string.empty : bindingOptions.view.toLowerCase();

        let currentView: BindingOptionsCurrentView = {} as BindingOptionsCurrentView;
        currentView.element = element;
        currentView.disabledBackground = null;
        currentView.configurationDialog = null;
        currentView.dayCheckBoxes = [];
        currentView.monthCheckBoxes = [];
        currentView.tooltip = null;
        currentView.tooltipTimer = null;
        currentView.mapContents = null;
        currentView.mapContentsScrollLeft = 0;
        currentView.year = bindingOptions.year;
        currentView.type = _configuration.unknownTrendText;
        currentView.isInFetchMode = isDefinedFunction( bindingOptions.events.onDataFetch );
        currentView.isInFetchModeTimer = null;
        currentView.yearsAvailable = [];

        if ( bindingOptions.views.chart.enabled ) {
            currentView.chartContents = null;
            currentView.chartContentsScrollLeft = 0;
        }

        if ( bindingOptions.views.days.enabled ) {
            currentView.daysContents = null;
            currentView.daysContentsScrollLeft = 0;
        }
        
        if ( bindingOptions.views.statistics.enabled ) {
            currentView.statisticsContents = null;
            currentView.statisticsContentsScrollLeft = 0;
        }

        if ( view === _viewName.map ) {
            currentView.view = _view.map;
        } else if ( view === _viewName.chart ) {
            currentView.view = _view.chart;
        } else if ( view === _viewName.days ) {
            currentView.view = _view.days;
        } else if ( view === _viewName.statistics ) {
            currentView.view = _view.statistics;
        } else {
            currentView.view = _view.map;
        }

        bindingOptions._currentView = currentView;

        return bindingOptions;
    }

    function renderControl( bindingOptions: BindingOptions ) : void {
        fireCustomTrigger( bindingOptions.events.onBeforeRender, bindingOptions._currentView.element );

        if ( !isDefinedString( bindingOptions._currentView.element.id ) ) {
            bindingOptions._currentView.element.id = newGuid();
        }

        if ( bindingOptions._currentView.element.className.trim() === _string.empty ) {
            bindingOptions._currentView.element.className = "heat-js";
        } else {
            addClass( bindingOptions._currentView.element, "heat-js" );
        }

        bindingOptions._currentView.element.removeAttribute( _attribute_Name_Options );

        createDateStorageForElement( bindingOptions._currentView.element.id, bindingOptions );
        renderControlContainer( bindingOptions );
        fireCustomTrigger( bindingOptions.events.onRenderComplete, bindingOptions._currentView.element );
    }

    function renderControlContainer( bindingOptions: BindingOptions, isForDataRefresh: boolean = false, isForViewSwitch: boolean = false ) : void {
        if ( isForDataRefresh ) {
            storeDataInLocalStorage( bindingOptions );
        }

        if ( isDefined( bindingOptions._currentView.mapContents ) ) {
            bindingOptions._currentView.mapContentsScrollLeft = bindingOptions._currentView.mapContents.scrollLeft;
        }

        if ( bindingOptions.views.chart.enabled && isDefined( bindingOptions._currentView.chartContents ) ) {
            bindingOptions._currentView.chartContentsScrollLeft = bindingOptions._currentView.chartContents.scrollLeft;
        }

        if ( bindingOptions.views.days.enabled && isDefined( bindingOptions._currentView.daysContents ) ) {
            bindingOptions._currentView.daysContentsScrollLeft = bindingOptions._currentView.daysContents.scrollLeft;
        }

        if ( bindingOptions.views.statistics.enabled && isDefined( bindingOptions._currentView.statisticsContents ) ) {
            bindingOptions._currentView.statisticsContentsScrollLeft = bindingOptions._currentView.statisticsContents.scrollLeft;
        }
        
        bindingOptions._currentView.element.innerHTML = _string.empty;
        bindingOptions._currentView.yearsAvailable = getYearsAvailableInData( bindingOptions );
        
        hideToolTip( bindingOptions );

        startDataPullTimer( bindingOptions );

        if ( bindingOptions.title.showConfigurationButton ) {
            renderDisabledBackground( bindingOptions );
            renderConfigurationDialog( bindingOptions );
        }

        renderControlToolTip( bindingOptions );
        renderControlTitleBar( bindingOptions );
        renderControlMap( bindingOptions, isForViewSwitch );

        if ( bindingOptions.views.chart.enabled ) {
            renderControlChart( bindingOptions, isForViewSwitch );

            bindingOptions._currentView.chartContents.style.display = "none";
        }

        if ( bindingOptions.views.days.enabled ) {
            renderControlDays( bindingOptions, isForViewSwitch );

            bindingOptions._currentView.daysContents.style.display = "none";
        }

        if ( bindingOptions.views.statistics.enabled ) {
            renderControlStatistics( bindingOptions, isForViewSwitch );

            bindingOptions._currentView.statisticsContents.style.display = "none";
        }

        bindingOptions._currentView.mapContents.style.display = "none";

        if ( bindingOptions._currentView.view === _view.map ) {
            bindingOptions._currentView.mapContents.style.display = "block";
        } else if ( bindingOptions.views.chart.enabled && bindingOptions._currentView.view === _view.chart ) {
            bindingOptions._currentView.chartContents.style.display = "block";
        } else if ( bindingOptions.views.days.enabled && bindingOptions._currentView.view === _view.days ) {
            bindingOptions._currentView.daysContents.style.display = "block";
        } else if ( bindingOptions.views.statistics.enabled && bindingOptions._currentView.view === _view.statistics ) {
            bindingOptions._currentView.statisticsContents.style.display = "block";
        } else {
            bindingOptions._currentView.view = _view.map;
            bindingOptions._currentView.mapContents.style.display = "block";
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Configuration Dialog
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderConfigurationDialog( bindingOptions: BindingOptions ) : void {
        bindingOptions._currentView.configurationDialog = createElement( bindingOptions._currentView.disabledBackground, "div", "dialog configuration" );

        const titleBar: HTMLElement = createElement( bindingOptions._currentView.configurationDialog, "div", "dialog-title-bar" );
        const contents: HTMLElement = createElement( bindingOptions._currentView.configurationDialog, "div", "dialog-contents" );
        const closeButton: HTMLElement = createElement( titleBar, "div", "dialog-close" );
        const daysContainer: HTMLElement = createElement( contents, "div", "side-container panel" );
        const monthsContainer: HTMLElement = createElement( contents, "div", "side-container panel" );

        createElementWithHTML( titleBar, "span", "dialog-title-bar-text", _configuration.configurationTitleText );
        createElementWithHTML( daysContainer, "div", "side-container-title-text", _configuration.visibleDaysText + _string.colon );
        createElementWithHTML( monthsContainer, "div", "side-container-title-text", _configuration.visibleMonthsText + _string.colon );

        const months1Container: HTMLElement = createElement( monthsContainer, "div", "side-container" );
        const months2Container: HTMLElement = createElement( monthsContainer, "div", "side-container" );

        closeButton.onclick = function() {
            hideConfigurationDialog( bindingOptions );
        };

        for ( let dayIndex: number = 0; dayIndex < 7; dayIndex++ ) {
            bindingOptions._currentView.dayCheckBoxes[ dayIndex ] = buildCheckBox( daysContainer, _configuration.dayNames[ dayIndex ] ).input;
        }

        for ( let monthIndex1: number = 0; monthIndex1 < 7; monthIndex1++ ) {
            bindingOptions._currentView.monthCheckBoxes[ monthIndex1 ] = buildCheckBox( months1Container, _configuration.monthNames[ monthIndex1 ] ).input;
        }

        for ( let monthIndex2: number = 7; monthIndex2 < 12; monthIndex2++ ) {
            bindingOptions._currentView.monthCheckBoxes[ monthIndex2 ] = buildCheckBox( months2Container, _configuration.monthNames[ monthIndex2 ] ).input;
        }

        addToolTip( closeButton, bindingOptions, _configuration.closeToolTipText );
    }

    function showConfigurationDialog( bindingOptions: BindingOptions ) : void {
        showDisabledBackground( bindingOptions );

        if ( isDefined( bindingOptions._currentView.configurationDialog ) && bindingOptions._currentView.configurationDialog.style.display !== "block" ) {
            bindingOptions._currentView.configurationDialog.style.display = "block";
        }

        let daysToShow: number[] = [];
        let monthsToShow: number[] = [];

        if ( bindingOptions._currentView.view === _view.map ) {
            daysToShow = bindingOptions.views.map.daysToShow;
            monthsToShow = bindingOptions.views.map.monthsToShow;
        } else if ( bindingOptions.views.chart.enabled && bindingOptions._currentView.view === _view.chart ) {
            daysToShow = bindingOptions.views.chart.daysToShow;
            monthsToShow = bindingOptions.views.chart.monthsToShow;
        } else if ( bindingOptions.views.days.enabled && bindingOptions._currentView.view === _view.days ) {
            daysToShow = bindingOptions.views.days.daysToShow;
            monthsToShow = bindingOptions.views.days.monthsToShow;
        } else if ( bindingOptions.views.statistics.enabled && bindingOptions._currentView.view === _view.statistics ) {
            daysToShow = bindingOptions.views.statistics.daysToShow;
            monthsToShow = bindingOptions.views.statistics.monthsToShow;
        } else {
            daysToShow = bindingOptions.views.map.daysToShow;
            monthsToShow = bindingOptions.views.map.monthsToShow;
        }

        for ( let dayIndex: number = 0; dayIndex < 7; dayIndex++ ) {
            bindingOptions._currentView.dayCheckBoxes[ dayIndex ].checked = isDayVisible( daysToShow, dayIndex + 1 );
        }

        for ( let monthIndex: number = 0; monthIndex < 12; monthIndex++ ) {
            bindingOptions._currentView.monthCheckBoxes[ monthIndex ].checked = isMonthVisible( monthsToShow, monthIndex );
        }

        hideToolTip( bindingOptions );
    }

    function hideConfigurationDialog( bindingOptions: BindingOptions ) : void {
        hideDisabledBackground( bindingOptions );

        if ( isDefined( bindingOptions._currentView.configurationDialog ) && bindingOptions._currentView.configurationDialog.style.display !== "none" ) {
            bindingOptions._currentView.configurationDialog.style.display = "none";
        }

        const daysChecked: number[] = [];
        const monthsChecked: number[] = [];
        let render: boolean = false;

        for ( let dayIndex: number = 0; dayIndex < 7; dayIndex++ ) {
            if ( bindingOptions._currentView.dayCheckBoxes[ dayIndex ].checked ) {
                daysChecked.push( dayIndex + 1 );
            }
        }

        for ( let monthIndex: number = 0; monthIndex < 12; monthIndex++ ) {
            if ( bindingOptions._currentView.monthCheckBoxes[ monthIndex ].checked ) {
                monthsChecked.push( monthIndex + 1 );
            }
        }

        if ( daysChecked.length >= 1 ) {
            if ( bindingOptions._currentView.view === _view.map ) {
                bindingOptions.views.map.daysToShow = daysChecked;
            } else if ( bindingOptions.views.chart.enabled && bindingOptions._currentView.view === _view.chart ) {
                bindingOptions.views.chart.daysToShow = daysChecked;
            } else if ( bindingOptions.views.days.enabled && bindingOptions._currentView.view === _view.days ) {
                bindingOptions.views.days.daysToShow = daysChecked;
            } else if ( bindingOptions.views.statistics.enabled && bindingOptions._currentView.view === _view.statistics ) {
                bindingOptions.views.statistics.daysToShow = daysChecked;
            } else {
                bindingOptions.views.map.daysToShow = daysChecked;
            }

            render = true;
        }

        if ( monthsChecked.length >= 1 ) {
            if ( bindingOptions._currentView.view === _view.map ) {
                bindingOptions.views.map.monthsToShow = monthsChecked;
            } else if ( bindingOptions.views.chart.enabled && bindingOptions._currentView.view === _view.chart ) {
                bindingOptions.views.chart.monthsToShow = monthsChecked;
            } else if ( bindingOptions.views.days.enabled && bindingOptions._currentView.view === _view.days ) {
                bindingOptions.views.days.monthsToShow = monthsChecked;
            } else if ( bindingOptions.views.statistics.enabled && bindingOptions._currentView.view === _view.statistics ) {
                bindingOptions.views.statistics.monthsToShow = monthsChecked;
            } else {
                bindingOptions.views.map.monthsToShow = monthsChecked;
            }

            render = true;
        }

        if ( render ) {
            renderControlContainer( bindingOptions );
            fireCustomTrigger( bindingOptions.events.onOptionsUpdate, bindingOptions._currentView.element, bindingOptions );
            
        } else {
            hideToolTip( bindingOptions );
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  ToolTip
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderControlToolTip( bindingOptions: BindingOptions ) : void {
        if ( !isDefined( bindingOptions._currentView.tooltip ) ) {
            bindingOptions._currentView.tooltip = createElement( documentObject.body, "div", "heat-js-tooltip" );
            bindingOptions._currentView.tooltip.style.display = "none";
    
            assignToolTipEvents( bindingOptions );
        }
    }

    function assignToolTipEvents( bindingOptions: BindingOptions, add: boolean = true ) : void {
        let addEventListener_Window: Function = add ? windowObject.addEventListener : windowObject.removeEventListener;
        let addEventListener_Document: Function = add ? documentObject.addEventListener : documentObject.removeEventListener;

        addEventListener_Window( "mousemove", function() {
            hideToolTip( bindingOptions );
        } );

        addEventListener_Document( "scroll", function() {
            hideToolTip( bindingOptions );
        } );
    }

    function addToolTip( element: HTMLElement, bindingOptions: BindingOptions, text: string ) : void {
        if ( element !== null ) {
            element.onmousemove = function( e ) {
                showToolTip( e, bindingOptions, text );
            };
        }
    }

    function showToolTip( e: any, bindingOptions: BindingOptions, text: string ) : void {
        cancelBubble( e );
        hideToolTip( bindingOptions );

        bindingOptions._currentView.tooltipTimer = setTimeout( function() {
            bindingOptions._currentView.tooltip.innerHTML = text;
            bindingOptions._currentView.tooltip.style.display = "block";

            showElementAtMousePosition( e, bindingOptions._currentView.tooltip );
        }, bindingOptions.tooltip.delay );
    }

    function hideToolTip( bindingOptions: BindingOptions ) : void {
        if ( isDefined( bindingOptions._currentView.tooltip ) ) {
            if ( isDefined( bindingOptions._currentView.tooltipTimer ) ) {
                clearTimeout( bindingOptions._currentView.tooltipTimer );
                bindingOptions._currentView.tooltipTimer = null;
            }
    
            if ( bindingOptions._currentView.tooltip.style.display !== "none" ) {
                bindingOptions._currentView.tooltip.style.display = "none";
            }
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Title Bar
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderControlTitleBar( bindingOptions: BindingOptions ) : void {
        if ( bindingOptions.title.showText || bindingOptions.title.showYearSelector || bindingOptions.title.showRefreshButton || bindingOptions.title.showExportButton || bindingOptions.title.showImportButton ) {
            const titleBar: HTMLElement = createElement( bindingOptions._currentView.element, "div", "title-bar" );
            const title: HTMLElement = createElement( titleBar, "div", "title" );

            if ( bindingOptions.views.chart.enabled || bindingOptions.views.days.enabled || bindingOptions.views.statistics.enabled ) {
                if ( bindingOptions.title.showTitleDropDownButton ) {
                    createElement( title, "div", "down-arrow" );
                }
                
            } else {
                addClass( title, "no-click" );
            }

            if ( bindingOptions.title.showText ) {
                title.innerHTML += bindingOptions.title.text;
            }

            if ( bindingOptions.views.chart.enabled || bindingOptions.views.days.enabled || bindingOptions.views.statistics.enabled ) {
                renderTitleDropDownMenu( bindingOptions, title );
            }

            if ( bindingOptions.title.showImportButton && !bindingOptions._currentView.isInFetchMode ) {
                const importData: HTMLElement = createElementWithHTML( titleBar, "button", "import", _configuration.importButtonText );
        
                importData.onclick = function() {
                    importFromFilesSelected( bindingOptions );
                };
            }

            if ( bindingOptions.title.showExportButton ) {
                const exportData: HTMLElement = createElementWithHTML( titleBar, "button", "export", _configuration.exportButtonText );
        
                exportData.onclick = function() {
                    exportAllData( bindingOptions );
                };
            }

            if ( bindingOptions.title.showRefreshButton ) {
                const refresh: HTMLElement = createElementWithHTML( titleBar, "button", "refresh", _configuration.refreshButtonText );
        
                refresh.onclick = function() {
                    renderControlContainer( bindingOptions );
                    fireCustomTrigger( bindingOptions.events.onRefresh, bindingOptions._currentView.element );
                };
            }
    
            if ( bindingOptions.title.showYearSelector ) {
                const back: any = createElementWithHTML( titleBar, "button", "back", _configuration.backButtonText );
        
                back.onclick = function() {
                    moveToPreviousYear( bindingOptions );
                };

                if ( isFirstVisibleYear( bindingOptions, bindingOptions._currentView.year ) ) {
                    back.disabled = true;
                }

                bindingOptions._currentView.yearText = createElementWithHTML( titleBar, "div", "year-text", bindingOptions._currentView.year.toString() );

                if ( bindingOptions.title.showYearSelectionDropDown ) {
                    renderYearDropDownMenu( bindingOptions );
                } else {
                    addClass( bindingOptions._currentView.yearText, "no-click" );
                }

                if ( bindingOptions.title.showConfigurationButton ) {
                    let configureButton: HTMLElement = createElement( titleBar, "div", "configure" );

                    addToolTip( configureButton, bindingOptions, _configuration.configurationToolTipText );

                    configureButton.onclick = function() {
                        showConfigurationDialog( bindingOptions );
                    };
                }

                const next: any = createElementWithHTML( titleBar, "button", "next", _configuration.nextButtonText );

                next.onclick = function() {
                    moveToNextYear( bindingOptions );
                };

                if ( isLastVisibleYear( bindingOptions, bindingOptions._currentView.year ) ) {
                    next.disabled = true;
                }
            }
        }
    }

    function renderTitleDropDownMenu( bindingOptions: BindingOptions, title: HTMLElement ) : void {
        const titlesMenuContainer: HTMLElement = createElement( title, "div", "titles-menu-container" );
        const titlesMenu: HTMLElement = createElement( titlesMenuContainer, "div", "titles-menu" );
        
        if ( bindingOptions.title.showTitleDropDownHeaders ) {
            createElementWithHTML( titlesMenu, "div", "title-menu-header", _configuration.dataText + _string.colon );
        }

        const menuItemMap: HTMLElement = createElementWithHTML( titlesMenu, "div", "title-menu-item", _configuration.mapText );
            
        renderTitleDropDownMenuItemClickEvent( bindingOptions, menuItemMap, _view.map, _viewName.map );

        if ( bindingOptions.views.chart.enabled ) {
            const menuItemChart = createElementWithHTML( titlesMenu, "div", "title-menu-item", _configuration.chartText );

            renderTitleDropDownMenuItemClickEvent( bindingOptions, menuItemChart, _view.chart, _viewName.chart );
        }

        if ( bindingOptions.views.days.enabled ) {
            if ( bindingOptions.title.showTitleDropDownHeaders ) {
                createElementWithHTML( titlesMenu, "div", "title-menu-header", _configuration.yearText + _string.colon );
            }

            const menuItemDays: HTMLElement = createElementWithHTML( titlesMenu, "div", "title-menu-item", _configuration.daysText );

            renderTitleDropDownMenuItemClickEvent( bindingOptions, menuItemDays, _view.days, _viewName.days );
        }

        if ( bindingOptions.views.statistics.enabled ) {
            if ( bindingOptions.title.showTitleDropDownHeaders ) {
                createElementWithHTML( titlesMenu, "div", "title-menu-header", _configuration.statisticsText + _string.colon );
            }

            const menuItemStatistics: HTMLElement = createElementWithHTML( titlesMenu, "div", "title-menu-item", _configuration.colorRangesText );

            renderTitleDropDownMenuItemClickEvent( bindingOptions, menuItemStatistics, _view.statistics, _viewName.statistics );
        }
    }

    function renderTitleDropDownMenuItemClickEvent( bindingOptions: BindingOptions, option: HTMLElement, view: number, viewName: string ) : void {
        if ( bindingOptions._currentView.view === view ) {
            addClass( option, "title-menu-item-active" );
            
        } else {
            option.onclick = function() {
                bindingOptions._currentView.view = view;

                fireCustomTrigger( bindingOptions.events.onViewSwitch, viewName );
                renderControlContainer( bindingOptions, false, true );
            };
        }
    }

    function renderYearDropDownMenu( bindingOptions: BindingOptions ) : void {
        createElement( bindingOptions._currentView.yearText, "div", "down-arrow" );

        const yearsMenuContainer: HTMLElement = createElement( bindingOptions._currentView.yearText, "div", "years-menu-container" );
        const yearsMenu: HTMLElement = createElement( yearsMenuContainer, "div", "years-menu" );
        const thisYear: number = new Date().getFullYear();
        let activeYearMenuItem: HTMLElement = null;

        yearsMenuContainer.style.display = "block";
        yearsMenuContainer.style.visibility = "hidden";

        for ( let currentYear: number = thisYear - bindingOptions.title.extraSelectionYears; currentYear < thisYear + bindingOptions.title.extraSelectionYears; currentYear++ ) {
            if ( isYearVisible( bindingOptions, currentYear ) ) {
                let yearMenuItem: HTMLElement = renderYearDropDownMenuItem( bindingOptions, yearsMenu, currentYear, thisYear );

                if ( !isDefined( activeYearMenuItem ) ) {
                    activeYearMenuItem = yearMenuItem;
                }
            }
        }

        if ( isDefined( activeYearMenuItem ) ) {
            yearsMenu.scrollTop = activeYearMenuItem.offsetTop - ( yearsMenu.offsetHeight / 2 );
        }

        yearsMenuContainer.style.display = "none";
        yearsMenuContainer.style.visibility = "visible";
    }

    function renderYearDropDownMenuItem( bindingOptions: BindingOptions, years: HTMLElement, currentYear: number, actualYear: number ) : HTMLElement {
        let result: HTMLElement = null;
        const year: HTMLElement = createElementWithHTML( years, "div", "year-menu-item", currentYear.toString() );

        if ( bindingOptions._currentView.year !== currentYear ) {
            year.onclick = function() {
                bindingOptions._currentView.year = currentYear;
    
                renderControlContainer( bindingOptions );
                fireCustomTrigger( bindingOptions.events.onSetYear, bindingOptions._currentView.year );
            };

            if ( currentYear === actualYear ) {
                addClass( year, "year-menu-item-current" );
            }

        } else {
            addClass( year, "year-menu-item-active" );
            result = year;
        }

        return result;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  View:  Map
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderControlMap( bindingOptions: BindingOptions, isForViewSwitch: boolean ) : void {
        bindingOptions._currentView.mapContents = createElement( bindingOptions._currentView.element, "div", "map-contents" );

        if ( bindingOptions.views.chart.enabled ) {
            renderControlChartContents( bindingOptions );
        }

        if ( bindingOptions.views.days.enabled ) {
            renderControlDaysContents( bindingOptions );
        }
        
        if ( bindingOptions.views.statistics.enabled ) {
            renderControlStatisticsContents( bindingOptions );
        }

        renderControlViewGuide( bindingOptions );

        if ( bindingOptions.views.map.showNoDataMessageWhenDataIsNotAvailable && !isDataAvailableForYear( bindingOptions ) ) {
            const noDataMessage: HTMLElement = createElementWithHTML( bindingOptions._currentView.mapContents, "div", "no-data-message", _configuration.noMapDataMessage );

            if ( isForViewSwitch ) {
                addClass( noDataMessage, "view-switch" );
            }

        } else {
            bindingOptions._currentView.mapContents.style.minHeight = "unset";

            makeAreaDroppable( bindingOptions._currentView.mapContents, bindingOptions );

            const map: HTMLElement = createElement( bindingOptions._currentView.mapContents, "div", "map" );
            const currentYear: number = bindingOptions._currentView.year;
            let monthAdded: boolean = false;
    
            if ( isForViewSwitch ) {
                addClass( map, "view-switch" );
            }
    
            if ( bindingOptions.views.map.showDayNames ) {
                const days: HTMLElement = createElement( map, "div", "days" );
                const showMinimalDays: boolean = bindingOptions.views.map.showMinimalDayNames && bindingOptions.views.map.daysToShow.length === 7;
    
                if ( !bindingOptions.views.map.showMonthNames || bindingOptions.views.map.placeMonthNamesOnTheBottom ) {
                    days.className = "days-months-bottom";
                }
        
                for ( let dayNameIndex: number = 0; dayNameIndex < 7; dayNameIndex++ ) {
                    if ( isDayVisible( bindingOptions.views.map.daysToShow, dayNameIndex + 1 ) ) {
                        const dayText: string = !showMinimalDays || dayNameIndex % 3 === 0 ? _configuration.dayNames[ dayNameIndex ] : _string.space;

                        createElementWithHTML( days, "div", "day-name", dayText );
                    }
                }
    
                if ( bindingOptions.views.map.showDaysInReverseOrder ) {
                    reverseElementsOrder( days );
                }
            }
    
            const months: HTMLElement = createElement( map, "div", "months" );
            const colorRanges: ColorRange[] = getSortedColorRanges( bindingOptions );
    
            for ( let monthIndex: number = 0; monthIndex < 12; monthIndex++ ) {
                if ( isMonthVisible( bindingOptions.views.map.monthsToShow, monthIndex ) ) {
                    const month: HTMLElement = createElement( months, "div", "month" );
                    const dayColumns: HTMLElement = createElement( month, "div", "day-columns" );
                    let totalDaysInMonth: number = getTotalDaysInMonth( currentYear, monthIndex );
                    let currentDayColumn: HTMLElement = createElement( dayColumns, "div", "day-column" );
                    let startFillingDays: boolean = false;
                    const firstDayInMonth: Date = new Date( currentYear, monthIndex, 1 );
                    const firstDayNumberInMonth: number = getWeekdayNumber( firstDayInMonth );
                    let actualDay: number = 1;
        
                    totalDaysInMonth += firstDayNumberInMonth;
        
                    for ( let dayIndex: number = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
                        if ( dayIndex >= firstDayNumberInMonth ) {
                            startFillingDays = true;
        
                        } else {
                            if ( isDayVisible( bindingOptions.views.map.daysToShow, actualDay ) ) {
                                createElement( currentDayColumn, "div", "day-disabled" );
                            }
                        }
        
                        if ( startFillingDays ) {
                            let day: HTMLElement = null;
    
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
                                    let marginLeft: number = getStyleValueByName( day, "margin-left", true );
                                    let marginRight: number = getStyleValueByName( day, "margin-right", true );
                                    
                                    _elements_Day_Width = day.offsetWidth + marginLeft + marginRight;
                                }
                            }
                        }
    
                        actualDay++;
                    }
    
                    if ( bindingOptions.views.map.showMonthNames ) {
                        let monthName: HTMLElement = null;
                        const monthWidth: number = month.offsetWidth;
    
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

                    if ( bindingOptions.views.map.showMonthsInReverseOrder ) {
                        reverseElementsOrder( dayColumns );
                    }
    
                    monthAdded = true;
                }
            }

            if ( bindingOptions.views.map.showMonthsInReverseOrder ) {
                reverseElementsOrder( months );
            }
            
            if ( bindingOptions.views.map.keepScrollPositions ) {
                bindingOptions._currentView.mapContents.scrollLeft = bindingOptions._currentView.mapContentsScrollLeft;
            }
        }
    }

    function renderControlMapMonthDay( bindingOptions: BindingOptions, currentDayColumn: HTMLElement, dayNumber: number, month: number, year: number, colorRanges: ColorRange[] ) : HTMLElement {
        const actualDay: number = dayNumber + 1;
        const day: HTMLElement = createElement( currentDayColumn, "div", "day" );
        const date: Date = new Date( year, month, actualDay );
        let dateCount: number = _elements_DateCounts[ bindingOptions._currentView.element.id ].type[ bindingOptions._currentView.type ][ toStorageDate( date ) ];

        dateCount = getDefaultNumber( dateCount, 0 );

        renderDayToolTip( bindingOptions, day, date, dateCount );

        if ( bindingOptions.views.map.showDayNumbers && dateCount > 0 ) {
            day.innerHTML = dateCount.toString();
        }

        if ( isDefinedFunction( bindingOptions.events.onDayClick ) ) {
            day.onclick = function() {
                fireCustomTrigger( bindingOptions.events.onDayClick, date, dateCount );
            };

        } else {
            addClass( day, "no-hover" );
        }

        const useColorRange: ColorRange = getColorRange( bindingOptions, colorRanges, dateCount, date );

        if ( isDefined( useColorRange ) && isColorRangeVisible( bindingOptions, useColorRange.id ) ) {
            if ( isDefinedString( useColorRange.mapCssClassName ) ) {
                addClass( day, useColorRange.mapCssClassName );
            } else {
                addClass( day, useColorRange.cssClassName );
            }
        }

        return day;
    }

    function isDataAvailableForYear( bindingOptions: BindingOptions ) : boolean {
        let result: boolean = false;
        const data: any = getCurrentViewData( bindingOptions );
        const checkDate: string = bindingOptions._currentView.year.toString();

        for ( let storageDate in data ) {
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
     * Render:  View:  Chart
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderControlChartContents( bindingOptions: BindingOptions ) {
        bindingOptions._currentView.chartContents = createElement( bindingOptions._currentView.element, "div", "chart-contents" );

        makeAreaDroppable( bindingOptions._currentView.chartContents, bindingOptions );
    }

    function renderControlChart( bindingOptions: BindingOptions, isForViewSwitch: boolean) : void {
        const chart: HTMLElement = createElement( bindingOptions._currentView.chartContents, "div", "chart" );
        let labels: HTMLElement = createElement( chart, "div", "y-labels" );
        const dayLines: HTMLElement = createElement( chart, "div", "day-lines" );
        const colorRanges: ColorRange[] = getSortedColorRanges( bindingOptions );
        const largestValueForCurrentYear: number = getLargestValueForChartYear( bindingOptions );
        const currentYear: number = bindingOptions._currentView.year;
        let labelsWidth: number = 0;

        if ( isForViewSwitch ) {
            addClass( chart, "view-switch" );
        }

        if ( largestValueForCurrentYear > 0 && bindingOptions.views.chart.showChartYLabels ) {
            const topLabel: HTMLElement = createElementWithHTML( labels, "div", "label-0", largestValueForCurrentYear.toString() );

            createElementWithHTML( labels, "div", "label-25", ( mathObject.floor( largestValueForCurrentYear / 4 ) * 3 ).toString() );
            createElementWithHTML( labels, "div", "label-50", mathObject.floor( largestValueForCurrentYear / 2 ).toString() );
            createElementWithHTML( labels, "div", "label-75", mathObject.floor( largestValueForCurrentYear / 4 ).toString() );
            createElementWithHTML( labels, "div", "label-100", _string.zero );

            labels.style.width = topLabel.offsetWidth + "px";
            labelsWidth = labels.offsetWidth + getStyleValueByName( labels, "margin-right", true );

        } else {
            labels.parentNode.removeChild( labels );
            labels = null;
        }

        if ( largestValueForCurrentYear === 0 ) {
            bindingOptions._currentView.chartContents.style.minHeight = bindingOptions._currentView.mapContents.offsetHeight + "px";
            chart.parentNode.removeChild( chart );

            const noDataMessage: HTMLElement = createElementWithHTML( bindingOptions._currentView.chartContents, "div", "no-data-message", _configuration.noChartDataMessage );

            if ( isForViewSwitch ) {
                addClass( noDataMessage, "view-switch" );
            }

        } else {
            const pixelsPerNumbers: number = bindingOptions._currentView.mapContents.offsetHeight / largestValueForCurrentYear;
            let totalMonths: number = 0;
            let totalDays: number = 0;

            for ( let monthIndex1: number = 0; monthIndex1 < 12; monthIndex1++ ) {
                if ( isMonthVisible( bindingOptions.views.chart.monthsToShow, monthIndex1 ) ) {
                    const totalDaysInMonth: number = getTotalDaysInMonth( currentYear, monthIndex1 );
                    let actualDay: number = 1;
                    
                    totalMonths++;

                    for ( let dayIndex: number = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
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

            if ( bindingOptions.views.chart.showInReverseOrder ) {
                reverseElementsOrder( dayLines );
            }

            if ( bindingOptions.views.chart.showMonthNames ) {
                const chartMonths: HTMLElement = createElement( bindingOptions._currentView.chartContents, "div", "chart-months" );
                const linesWidth: number = dayLines.offsetWidth / totalMonths;
                let monthTimesValue: number = 0;

                const addMonthName: Function = function( addMonthNameIndex: number ) {
                    if ( isMonthVisible( bindingOptions.views.chart.monthsToShow, addMonthNameIndex ) ) {
                        let monthName: HTMLElement = createElementWithHTML( chartMonths, "div", "month-name", _configuration.monthNames[ addMonthNameIndex ] );
                        monthName.style.left = labelsWidth + ( linesWidth * monthTimesValue ) + "px";

                        monthTimesValue++;
                    }
                };

                if ( bindingOptions.views.chart.showInReverseOrder ) {
                    for ( let monthIndex2: number = 12; monthIndex2--; ) {
                        addMonthName( monthIndex2 );
                    }
                } else {
                    for ( let monthIndex3: number = 0; monthIndex3 < 12; monthIndex3++ ) {
                        addMonthName( monthIndex3 );
                    }
                }

                chartMonths.style.width = dayLines.offsetWidth + "px";

                const monthNameSpace: HTMLElement = createElement( chartMonths, "div", "month-name-space" );
                monthNameSpace.style.height = chartMonths.offsetHeight + "px";
                monthNameSpace.style.width = labelsWidth + "px";
            }
    
            if ( bindingOptions.views.chart.keepScrollPositions ) {
                bindingOptions._currentView.chartContents.scrollLeft = bindingOptions._currentView.chartContentsScrollLeft;
            }
        }
    }

    function renderControlChartDay( dayLines: HTMLElement, bindingOptions: BindingOptions, day: number, month: number, year: number, colorRanges: ColorRange[], pixelsPerNumbers: number ) : void {
        const date: Date = new Date( year, month, day );
        const dayLine: HTMLElement = createElement( dayLines, "div", "day-line" );
        let dateCount: number = getCurrentViewData( bindingOptions )[ toStorageDate( date ) ];

        dateCount = getDefaultNumber( dateCount, 0 );

        renderDayToolTip( bindingOptions, dayLine, date, dateCount );

        if ( bindingOptions.views.chart.showLineNumbers && dateCount > 0 ) {
            addClass( dayLine, "day-line-number" );

            dayLine.innerHTML = dateCount.toString();
        }

        const dayLineHeight: number = dateCount * pixelsPerNumbers;
        dayLine.style.height = dayLineHeight + "px";

        if ( dayLineHeight <= 0 ) {
            dayLine.style.visibility = "hidden";
        }

        if ( isDefinedFunction( bindingOptions.events.onDayClick ) ) {
            dayLine.onclick = function() {
                fireCustomTrigger( bindingOptions.events.onDayClick, date, dateCount );
            };

        } else {
            addClass( dayLine, "no-hover" );
        }

        const useColorRange: ColorRange = getColorRange( bindingOptions, colorRanges, dateCount, date );

        if ( isDefined( useColorRange ) && isColorRangeVisible( bindingOptions, useColorRange.id ) ) {
            if ( isDefinedString( useColorRange.chartCssClassName ) ) {
                addClass( dayLine, useColorRange.chartCssClassName );
            } else {
                addClass( dayLine, useColorRange.cssClassName );
            }
        }
    }

    function getLargestValueForChartYear( bindingOptions: BindingOptions ) : number {
        let result: number = 0;
        const data: any = getCurrentViewData( bindingOptions );

        for ( let monthIndex: number = 0; monthIndex < 12; monthIndex++ ) {
            const totalDaysInMonth: number = getTotalDaysInMonth( bindingOptions._currentView.year, monthIndex );
    
            for ( let dayIndex: number = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
                const storageDate: string = toStorageDate( new Date( bindingOptions._currentView.year, monthIndex, dayIndex + 1 ) );

                if ( data.hasOwnProperty( storageDate ) ) {
                    if ( isMonthVisible( bindingOptions.views.chart.monthsToShow, monthIndex ) && isDayVisible( bindingOptions.views.chart.daysToShow, dayIndex + 1 ) ) {
                        result = mathObject.max( result, parseInt( data[ storageDate ] ) );
                    }
                }
            }
        }

        return result;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  View:  Days
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderControlDaysContents( bindingOptions: BindingOptions ) : void {
        bindingOptions._currentView.daysContents = createElement( bindingOptions._currentView.element, "div", "days-contents" );

        makeAreaDroppable( bindingOptions._currentView.daysContents, bindingOptions );
    }

    function renderControlDays( bindingOptions: BindingOptions, isForViewSwitch: boolean ) : void {
        const days: HTMLElement = createElement( bindingOptions._currentView.daysContents, "div", "days" );
        const dayNames: HTMLElement = createElement( bindingOptions._currentView.daysContents, "div", "day-names" );
        let labels: HTMLElement = createElement( days, "div", "y-labels" );
        const dayLines: HTMLElement = createElement( days, "div", "day-lines" );
        const dayValuesForCurrentYear: any = getLargestValuesForEachDay( bindingOptions );

        if ( isForViewSwitch ) {
            addClass( days, "view-switch" );
        }

        if ( dayValuesForCurrentYear.largestValue > 0 && bindingOptions.views.days.showChartYLabels ) {
            const topLabel: HTMLElement = createElementWithHTML( labels, "div", "label-0", dayValuesForCurrentYear.largestValue.toString() );

            createElementWithHTML( labels, "div", "label-25", ( mathObject.floor( dayValuesForCurrentYear.largestValue / 4 ) * 3 ).toString() );
            createElementWithHTML( labels, "div", "label-50", mathObject.floor( dayValuesForCurrentYear.largestValue / 2 ).toString() );
            createElementWithHTML( labels, "div", "label-75", mathObject.floor( dayValuesForCurrentYear.largestValue / 4 ).toString() );
            createElementWithHTML( labels, "div", "label-100", _string.zero );

            labels.style.width = topLabel.offsetWidth + "px";
            dayNames.style.paddingLeft = labels.offsetWidth + getStyleValueByName( labels, "margin-right", true ) + "px";

        } else {
            labels.parentNode.removeChild( labels );
            labels = null;
        }

        if ( dayValuesForCurrentYear.largestValue === 0 ) {
            bindingOptions._currentView.daysContents.style.minHeight = bindingOptions._currentView.mapContents.offsetHeight + "px";
            days.parentNode.removeChild( days );
            dayNames.parentNode.removeChild( dayNames );

            const noDataMessage: HTMLElement = createElementWithHTML( bindingOptions._currentView.daysContents, "div", "no-days-message", _configuration.noDaysDataMessage );

            if ( isForViewSwitch ) {
                addClass( noDataMessage, "view-switch" );
            }

        } else {
            const pixelsPerNumbers: number = bindingOptions._currentView.mapContents.offsetHeight / dayValuesForCurrentYear.largestValue;

            for ( let day in dayValuesForCurrentYear.days ) {
                if ( dayValuesForCurrentYear.days.hasOwnProperty( day ) && isDayVisible( bindingOptions.views.days.daysToShow, parseInt( day ) ) ) {
                    renderControlDaysDayLine( dayLines, parseInt( day ), dayValuesForCurrentYear.days[ day ], bindingOptions, pixelsPerNumbers );

                    if ( bindingOptions.views.days.showDayNames ) {
                        createElementWithHTML( dayNames, "div", "day-name", _configuration.dayNames[ parseInt( day ) - 1 ] );
                    }
                }
            }

            if ( bindingOptions.views.days.showInReverseOrder ) {
                reverseElementsOrder( dayLines );
                reverseElementsOrder( dayNames );
            }

            if ( bindingOptions.views.days.keepScrollPositions ) {
                bindingOptions._currentView.daysContents.scrollLeft = bindingOptions._currentView.daysContentsScrollLeft;
            }
        }
    }

    function renderControlDaysDayLine( dayLines: HTMLElement, dayNumber: number, dayCount: number, bindingOptions: BindingOptions, pixelsPerNumbers: number ) : void {
        const dayLine: HTMLElement = createElement( dayLines, "div", "day-line" );
        const dayLineHeight: number = dayCount * pixelsPerNumbers;

        dayLine.style.height = dayLineHeight + "px";

        if ( dayLineHeight <= 0 ) {
            dayLine.style.visibility = "hidden";
        }
        
        addToolTip( dayLine, bindingOptions, dayCount.toString() );

        if ( isDefinedFunction( bindingOptions.events.onWeekDayClick ) ) {
            dayLine.onclick = function() {
                fireCustomTrigger( bindingOptions.events.onWeekDayClick, dayNumber, dayCount );
            };

        } else {
            addClass( dayLine, "no-hover" );
        }

        if ( bindingOptions.views.days.showDayNumbers && dayCount > 0 ) {
            addClass( dayLine, "day-line-number" );

            createElementWithHTML( dayLine, "div", "count", dayCount.toString() );
        }
    }

    function getLargestValuesForEachDay( bindingOptions: BindingOptions ) : any {
        let largestValue: number = 0;
        const data: any = getCurrentViewData( bindingOptions );

        const days : object = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
        };

        for ( let monthIndex: number = 0; monthIndex < 12; monthIndex++ ) {
            const totalDaysInMonth: number = getTotalDaysInMonth( bindingOptions._currentView.year, monthIndex );
    
            for ( let dayIndex: number = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
                const storageDate: string = toStorageDate( new Date( bindingOptions._currentView.year, monthIndex, dayIndex + 1 ) );

                if ( data.hasOwnProperty( storageDate ) ) {
                    const storageDateParts: string[] = getStorageDate( storageDate );
                    const storageDateObject: Date = new Date( parseInt( storageDateParts[ 2 ] ), parseInt( storageDateParts[ 1 ] ), parseInt( storageDateParts[ 0 ] ) );
                    const weekDayNumber: number = getWeekdayNumber( storageDateObject ) + 1;

                    if ( !isHoliday( bindingOptions, storageDateObject ).matched && isMonthVisible( bindingOptions.views.days.monthsToShow, storageDateObject.getMonth() ) && isDayVisible( bindingOptions.views.days.daysToShow, weekDayNumber ) ) {
                        days[ weekDayNumber ] += data[ storageDate ];

                        largestValue = mathObject.max( largestValue, days[ weekDayNumber ] );
                    }
                }
            }
        }

        return {
            days: days,
            largestValue: largestValue
        };
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  View:  Statistics
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderControlStatisticsContents( bindingOptions: BindingOptions ) : void {
        bindingOptions._currentView.statisticsContents = createElement( bindingOptions._currentView.element, "div", "statistics-contents" );

        makeAreaDroppable( bindingOptions._currentView.statisticsContents, bindingOptions );
    }

    function renderControlStatistics( bindingOptions: BindingOptions, isForViewSwitch: boolean ) : void {
        const statistics: HTMLElement = createElement( bindingOptions._currentView.statisticsContents, "div", "statistics" );
        const statisticsRanges: HTMLElement = createElement( bindingOptions._currentView.statisticsContents, "div", "statistics-ranges" );
        let labels: HTMLElement = createElement( statistics, "div", "y-labels" );
        const rangeLines: HTMLElement = createElement( statistics, "div", "range-lines" );
        const colorRanges: ColorRange[] = getSortedColorRanges( bindingOptions );
        const colorRangeValuesForCurrentYear = getLargestValuesForEachRangeType( bindingOptions, colorRanges );

        if ( isForViewSwitch ) {
            addClass( statistics, "view-switch" );
        }

        if ( colorRangeValuesForCurrentYear.largestValue > 0 && bindingOptions.views.statistics.showChartYLabels ) {
            const topLabel: HTMLElement = createElementWithHTML( labels, "div", "label-0", colorRangeValuesForCurrentYear.largestValue.toString() );

            createElementWithHTML( labels, "div", "label-25", ( mathObject.floor( colorRangeValuesForCurrentYear.largestValue / 4 ) * 3 ).toString() );
            createElementWithHTML( labels, "div", "label-50", mathObject.floor( colorRangeValuesForCurrentYear.largestValue / 2 ).toString() );
            createElementWithHTML( labels, "div", "label-75", mathObject.floor( colorRangeValuesForCurrentYear.largestValue / 4 ).toString() );
            createElementWithHTML( labels, "div", "label-100", _string.zero );

            labels.style.width = topLabel.offsetWidth + "px";
            statisticsRanges.style.paddingLeft = labels.offsetWidth + getStyleValueByName( labels, "margin-right", true ) + "px";

        } else {
            labels.parentNode.removeChild( labels );
            labels = null;
        }

        if ( colorRangeValuesForCurrentYear.largestValue === 0 ) {
            bindingOptions._currentView.statisticsContents.style.minHeight = bindingOptions._currentView.mapContents.offsetHeight + "px";
            statistics.parentNode.removeChild( statistics );
            statisticsRanges.parentNode.removeChild( statisticsRanges );

            const noDataMessage: HTMLElement = createElementWithHTML( bindingOptions._currentView.statisticsContents, "div", "no-statistics-message", _configuration.noStatisticsDataMessage );

            if ( isForViewSwitch ) {
                addClass( noDataMessage, "view-switch" );
            }

        } else {
            const pixelsPerNumbers: number = bindingOptions._currentView.mapContents.offsetHeight / colorRangeValuesForCurrentYear.largestValue;

            if ( !bindingOptions.views.statistics.showColorRangeLabels ) {
                statisticsRanges.parentNode.removeChild( statisticsRanges );
            }

            for ( let type in colorRangeValuesForCurrentYear.types ) {
                if ( colorRangeValuesForCurrentYear.types.hasOwnProperty( type ) ) {
                    renderControlStatisticsRangeLine( parseInt( type ), rangeLines, colorRangeValuesForCurrentYear.types[ type ], bindingOptions, colorRanges, pixelsPerNumbers );

                    const useColorRange: ColorRange = getColorRangeByMinimum( colorRanges, parseInt( type ) );

                    if ( bindingOptions.views.statistics.showColorRangeLabels ) {
                        if ( !bindingOptions.views.statistics.useColorRangeNamesForLabels || !isDefined( useColorRange ) || !isDefinedString( useColorRange.name ) ) {
                            createElementWithHTML( statisticsRanges, "div", "range-name", type + _string.plus );
                        } else {
                            createElementWithHTML( statisticsRanges, "div", "range-name", useColorRange.name );
                        }
                    }
                }
            }

            if ( bindingOptions.views.statistics.showInReverseOrder ) {
                reverseElementsOrder( rangeLines );
                reverseElementsOrder( statisticsRanges );
            }
    
            if ( bindingOptions.views.statistics.keepScrollPositions ) {
                bindingOptions._currentView.statisticsContents.scrollLeft = bindingOptions._currentView.statisticsContentsScrollLeft;
            }
        }
    }

    function renderControlStatisticsRangeLine( colorRangeMinimum: number, dayLines: HTMLElement, rangeCount: number, bindingOptions: BindingOptions, colorRanges: ColorRange[], pixelsPerNumbers: number ) : void {
        const rangeLine: HTMLElement = createElement( dayLines, "div", "range-line" );
        const useColorRange: ColorRange = getColorRangeByMinimum( colorRanges, colorRangeMinimum );
        const rangeLineHeight: number = rangeCount * pixelsPerNumbers;

        rangeLine.style.height = rangeLineHeight + "px";

        if ( rangeLineHeight <= 0 ) {
            rangeLine.style.visibility = "hidden";
        }
        
        addToolTip( rangeLine, bindingOptions, rangeCount.toString() );

        if ( bindingOptions.views.statistics.showRangeNumbers && rangeCount > 0 ) {
            addClass( rangeLine, "range-line-number" );

            createElementWithHTML( rangeLine, "div", "count", rangeCount.toString() );
        }

        if ( isDefinedFunction( bindingOptions.events.onStatisticClick ) ) {
            rangeLine.onclick = function() {
                fireCustomTrigger( bindingOptions.events.onStatisticClick, useColorRange );
            };

        } else {
            addClass( rangeLine, "no-hover" );
        }

        if ( isDefined( useColorRange ) && isColorRangeVisible( bindingOptions, useColorRange.id ) ) {
            if ( isDefinedString( useColorRange.statisticsCssClassName ) ) {
                addClass( rangeLine, useColorRange.statisticsCssClassName );
            } else {
                addClass( rangeLine, useColorRange.cssClassName );
            }
        }
    }

    function getLargestValuesForEachRangeType( bindingOptions: BindingOptions, colorRanges: ColorRange[] ) : any {
        const types: object = {};
        const data: any = getCurrentViewData( bindingOptions );
        let largestValue: number = 0;

        types[ _string.zero ] = 0;

        for ( let monthIndex: number = 0; monthIndex < 12; monthIndex++ ) {
            const totalDaysInMonth: number = getTotalDaysInMonth( bindingOptions._currentView.year, monthIndex );
    
            for ( let dayIndex: number = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
                const storageDate: string = toStorageDate( new Date( bindingOptions._currentView.year, monthIndex, dayIndex + 1 ) );

                if ( data.hasOwnProperty( storageDate ) ) {
                    const storageDateParts: string[] = getStorageDate( storageDate );
                    const storageDateObject: Date = new Date( parseInt( storageDateParts[ 2 ] ), parseInt( storageDateParts[ 1 ] ), parseInt( storageDateParts[ 0 ] ) );
                    const weekDayNumber: number = getWeekdayNumber( storageDateObject ) + 1;

                    if ( !isHoliday( bindingOptions, storageDateObject ).matched && isMonthVisible( bindingOptions.views.statistics.monthsToShow, storageDateObject.getMonth() ) && isDayVisible( bindingOptions.views.statistics.daysToShow, weekDayNumber ) ) {
                        const useColorRange: ColorRange = getColorRange( bindingOptions, colorRanges, data[ storageDate ] );

                        if ( !isDefined( useColorRange ) ) {
                            types[ _string.zero ]++;
    
                        } else {
                            if ( !types.hasOwnProperty( useColorRange.minimum.toString() ) ) {
                                types[ useColorRange.minimum.toString() ] = 0;
                            }
    
                            types[ useColorRange.minimum ]++;
                            
                            largestValue = mathObject.max( largestValue, types[ useColorRange.minimum ] );
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

    function renderControlViewGuide( bindingOptions: BindingOptions ) : void {
        const guide: HTMLElement = createElement( bindingOptions._currentView.element, "div", "guide" )
        const mapTypes: HTMLElement = createElement( guide, "div", "map-types" );
        let noneTypeCount: number = 0;

        for ( let storageDate in _elements_DateCounts[ bindingOptions._currentView.element.id ].type[ _configuration.unknownTrendText ] ) {
            if ( _elements_DateCounts[ bindingOptions._currentView.element.id ].type[ _configuration.unknownTrendText ].hasOwnProperty( storageDate ) ) {
                noneTypeCount++;
                break;
            }
        }

        if ( _elements_DateCounts[ bindingOptions._currentView.element.id ].types > 1 ) {
            if ( isDefinedString( bindingOptions.description.text ) ) {
                const description: HTMLElement = createElement( bindingOptions._currentView.element, "div", "description", guide );
    
                renderDescription( bindingOptions, description );
            }

            for ( let type in _elements_DateCounts[ bindingOptions._currentView.element.id ].type ) {
                if ( type !== _configuration.unknownTrendText || noneTypeCount > 0 ) {
                    if ( noneTypeCount === 0 && bindingOptions._currentView.type === _configuration.unknownTrendText ) {
                        bindingOptions._currentView.type = type;
                    }

                    renderControlViewGuideTypeButton( bindingOptions, mapTypes, type );
                }
            }

        } else {
            renderDescription( bindingOptions, mapTypes );
        }

        if ( bindingOptions.guide.enabled ) {
            const mapToggles: HTMLElement = createElement( guide, "div", "map-toggles" );

            if ( bindingOptions.guide.showLessAndMoreLabels ) {
                let lessText: HTMLElement = createElementWithHTML( mapToggles, "div", "less-text", _configuration.lessText );
    
                if ( bindingOptions.guide.colorRangeTogglesEnabled ) {
                    lessText.onclick = function() {
                        updateColorRangeToggles( bindingOptions, false );
                    };
        
                } else {
                    addClass( lessText, "no-click" );
                }
            }
    
            const days: HTMLElement = createElement( mapToggles, "div", "days" );
            const colorRanges: ColorRange[] = getSortedColorRanges( bindingOptions );
            const colorRangesLength: number = colorRanges.length;
    
            for ( let colorRangesIndex: number = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++ ) {
                renderControlViewGuideDay( bindingOptions, days, colorRanges[ colorRangesIndex ] );
            }

            if ( bindingOptions.guide.showLessAndMoreLabels ) {
                const moreText: HTMLElement = createElementWithHTML( mapToggles, "div", "more-text", _configuration.moreText );
    
                if ( bindingOptions.guide.colorRangeTogglesEnabled ) {
                    moreText.onclick = function() {
                        updateColorRangeToggles( bindingOptions, true );
                    };
        
                } else {
                    addClass( moreText, "no-click" );
                }
            }
        }
    }

    function renderControlViewGuideTypeButton( bindingOptions: BindingOptions, mapTypes: HTMLElement, type: string ) : void {
        const typeButton: HTMLElement = createElementWithHTML( mapTypes, "button", "type", type );

        if ( bindingOptions._currentView.type === type ) {
            addClass( typeButton, "active" );
        }

        typeButton.onclick = function() {
            if ( bindingOptions._currentView.type !== type ) {
                bindingOptions._currentView.type = type;

                fireCustomTrigger( bindingOptions.events.onTypeSwitch, type );
                renderControlContainer( bindingOptions );
            }
        };
    }

    function renderControlViewGuideDay( bindingOptions: BindingOptions, days: HTMLElement, colorRange: ColorRange ) : void {
        const day: HTMLElement = createElement( days, "div" );
        day.className = "day";

        addToolTip( day, bindingOptions, colorRange.tooltipText );

        if ( isColorRangeVisible( bindingOptions, colorRange.id ) ) {
            if ( bindingOptions._currentView.view === _view.map && isDefinedString( colorRange.mapCssClassName ) ) {
                addClass( day, colorRange.mapCssClassName );
            } else if ( bindingOptions.views.chart.enabled && bindingOptions._currentView.view === _view.chart && isDefinedString( colorRange.chartCssClassName ) ) {
                addClass( day, colorRange.chartCssClassName );
            } else if ( bindingOptions.views.statistics.enabled && bindingOptions._currentView.view === _view.statistics && isDefinedString( colorRange.statisticsCssClassName ) ) {
                addClass( day, colorRange.statisticsCssClassName );
            } else {
                addClass( day, colorRange.cssClassName );
            }   
        }

        if ( bindingOptions.guide.showNumbersInGuide ) {
            addClass( day, "day-number" );

            day.innerHTML = colorRange.minimum + _string.plus;
        }

        if ( bindingOptions.guide.colorRangeTogglesEnabled ) {
            day.onclick = function() {
                toggleColorRangeVisibleState( bindingOptions, colorRange.id );
            };

        } else {
            addClass( day, "no-hover" );
        }
    }

    function renderDescription( bindingOptions: BindingOptions, container: HTMLElement ) : void {
        if ( isDefinedString( bindingOptions.description.text ) ) {
            if ( isDefinedString( bindingOptions.description.url ) ) {
                const link: any = createElementWithHTML( container, "a", "label", bindingOptions.description.text );
                link.href = bindingOptions.description.url;
                link.target = bindingOptions.description.urlTarget;                

            } else {
                createElementWithHTML( container, "span", "label", bindingOptions.description.text );
            }
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Shared
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderDayToolTip( bindingOptions: BindingOptions, day: HTMLElement, date: Date, dateCount: number ) : void {
        if ( isDefinedFunction( bindingOptions.events.onDayToolTipRender ) ) {
            addToolTip( day, bindingOptions, fireCustomTrigger( bindingOptions.events.onDayToolTipRender, date, dateCount ) );
        } else {

            let tooltip: string = getCustomFormattedDateText( bindingOptions.tooltip.dayText, date );

            if ( bindingOptions.showHolidaysInDayToolTips ) {
                let holiday: any = isHoliday( bindingOptions, date );

                if ( holiday.matched && isDefinedString( holiday.name ) ) {
                    tooltip += _string.colon + _string.space + holiday.name;
                }
            }

            addToolTip( day, bindingOptions, tooltip );
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Data
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function createDateStorageForElement( elementId: string, bindingOptions: BindingOptions, storeLocalData: boolean = true ) {
        _elements_DateCounts[ elementId ] = {
            options: bindingOptions,
            type: {},
            types: 1
        };

        _elements_DateCounts[ elementId ].type[ _configuration.unknownTrendText ] = {};

        if ( storeLocalData && !bindingOptions._currentView.isInFetchMode ) {
            loadDataFromLocalStorage( bindingOptions );
        }
    }

    function getCurrentViewData( bindingOptions: BindingOptions ) : any {
        return _elements_DateCounts[ bindingOptions._currentView.element.id ].type[ bindingOptions._currentView.type ];
    }

    function isMonthVisible( monthsToShow: number[], month: number ) : boolean {
        return monthsToShow.indexOf( month + 1 ) > _value.notFound;
    }

    function isDayVisible( daysToShow: number[], day: number ) : boolean {
        return daysToShow.indexOf( day ) > _value.notFound;
    }

    function getYearsAvailableInData( bindingOptions: BindingOptions ) : number[] {
        let years: number[] = [];

        if ( bindingOptions.showOnlyDataForYearsAvailable ) {
            let data: any = getCurrentViewData( bindingOptions );

            for ( let storageDate in data ) {
                if ( data.hasOwnProperty( storageDate ) ) {
                    let year: number = parseInt( getStorageDateYear( storageDate ) );
                    
                    if ( years.indexOf( year ) === _value.notFound ) {
                        years.push( year );
                    }
                }
            }
        }

        years = years.sort( function( a, b ) {
            return a - b;
        } );

        return years;
    }

    function isYearVisible( bindingOptions: BindingOptions, year: number ) : boolean {
        return bindingOptions.yearsToHide.indexOf( year ) === _value.notFound && ( bindingOptions._currentView.yearsAvailable.length === 0 || bindingOptions._currentView.yearsAvailable.indexOf( year ) > _value.notFound );
    }

    function isFirstVisibleYear( bindingOptions: BindingOptions, year: number ) : boolean {
        return bindingOptions._currentView.yearsAvailable.length > 0 && year <= bindingOptions._currentView.yearsAvailable[ 0 ];
    }

    function isLastVisibleYear( bindingOptions: BindingOptions, year: number ) : boolean {
        return bindingOptions._currentView.yearsAvailable.length > 0 && year >= bindingOptions._currentView.yearsAvailable[ bindingOptions._currentView.yearsAvailable.length - 1 ];
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Local Storage
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function loadDataFromLocalStorage( bindingOptions: BindingOptions ) : void {
        if ( bindingOptions.useLocalStorageForData && windowObject.localStorage ) {
            const keysLength: number = windowObject.localStorage.length;
            const elementId: string = bindingOptions._currentView.element.id;

            for ( let keyIndex: number = 0; keyIndex < keysLength; keyIndex++ ) {
                const key : string = windowObject.localStorage.key( keyIndex );

                if ( startsWithAnyCase( key, _local_Storage_Start_ID ) ) {
                    const typesJson: string = windowObject.localStorage.getItem( key );
                    const typesObject: any = getObjectFromString( typesJson );

                    if ( typesObject.parsed ) {
                        _elements_DateCounts[ elementId ].type = typesObject.result;
                        _elements_DateCounts[ elementId ].types = 0;

                        for ( let type in _elements_DateCounts[ elementId ].type ) {
                            if ( _elements_DateCounts[ elementId ].type.hasOwnProperty( type ) ) {
                                _elements_DateCounts[ elementId ].types++;
                            }
                        }
                    }
                }
            }
        }
    }

    function storeDataInLocalStorage( bindingOptions: BindingOptions ) : void {
        if ( bindingOptions.useLocalStorageForData && windowObject.localStorage ) {
            const elementId: string = bindingOptions._currentView.element.id;

            clearLocalStorageObjects( bindingOptions );

            const jsonData: string = jsonObject.stringify( _elements_DateCounts[ elementId ].type );

            windowObject.localStorage.setItem( _local_Storage_Start_ID + elementId, jsonData );
        }
    }

    function clearLocalStorageObjects( bindingOptions: BindingOptions ) : void {
        if ( bindingOptions.useLocalStorageForData && windowObject.localStorage ) {
            const keysLength: number = windowObject.localStorage.length;
            const keysToRemove: string[] = [];
            const elementId: string = bindingOptions._currentView.element.id;

            for ( let keyIndex: number = 0; keyIndex < keysLength; keyIndex++ ) {
                if ( startsWithAnyCase( windowObject.localStorage.key( keyIndex ), _local_Storage_Start_ID + elementId ) ) {
                    keysToRemove.push( windowObject.localStorage.key( keyIndex ) );
                }
            }

            const keysToRemoveLength: number = keysToRemove.length;

            for ( let keyToRemoveIndex: number = 0; keyToRemoveIndex < keysToRemoveLength; keyToRemoveIndex++ ) {
                windowObject.localStorage.removeItem( keysToRemove[ keyToRemoveIndex ] );
            }
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Data Pulling
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function startDataPullTimer( bindingOptions: BindingOptions ) : void {
        if ( bindingOptions._currentView.isInFetchMode ) {
            if ( !isDefined( bindingOptions._currentView.isInFetchModeTimer ) ) {
                pullDataFromCustomTrigger( bindingOptions );
            }

            if ( !isDefined( bindingOptions._currentView.isInFetchModeTimer ) ) {
                bindingOptions._currentView.isInFetchModeTimer = setInterval( function() {
                    pullDataFromCustomTrigger( bindingOptions );
                    renderControlContainer( bindingOptions );
                }, bindingOptions.dataFetchDelay );
            }
        }
    }

    function pullDataFromCustomTrigger( bindingOptions: BindingOptions ) : void {
        const elementId: string = bindingOptions._currentView.element.id;
        const data: any = fireCustomTrigger( bindingOptions.events.onDataFetch, elementId );

        if ( isDefinedObject( data ) ) {
            createDateStorageForElement( elementId, bindingOptions, false );

            for ( let storageDate in data ) {
                if ( data.hasOwnProperty( storageDate ) ) {
                    if ( !_elements_DateCounts[ elementId ].type[ _configuration.unknownTrendText ].hasOwnProperty( storageDate ) ) {
                        _elements_DateCounts[ elementId ].type[ _configuration.unknownTrendText ][ storageDate ] = 0;
                    }
            
                    _elements_DateCounts[ elementId ].type[ _configuration.unknownTrendText ][ storageDate ] += data[ storageDate ];
                }
            }
        }
    }

    function cancelAllPullDataTimers() : void {
        for ( let elementId in _elements_DateCounts ) {
            if ( _elements_DateCounts.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_DateCounts[ elementId ].options;

                if ( isDefined( bindingOptions._currentView.isInFetchModeTimer ) ) {
                    clearInterval( bindingOptions._currentView.isInFetchModeTimer );
                }
            }
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Color Ranges
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function isColorRangeVisible( bindingOptions: BindingOptions, id: string ) : boolean {
        let result: boolean = false;
        
        if ( id === _internal_Name_Holiday ) {
            result = true;

        } else {
            const colorRangesLength : number = bindingOptions.colorRanges.length;

            for ( let colorRangesIndex: number = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++ ) {
                const colorRange: ColorRange = bindingOptions.colorRanges[ colorRangesIndex ];
    
                if ( colorRange.id === id && getDefaultBoolean( colorRange.visible, true ) ) {
                    result = true;
                    break;
                }
            }
        }

        return result;
    }

    function updateColorRangeToggles( bindingOptions: BindingOptions, flag: boolean ) : void {
        const colorRangesLength: number = bindingOptions.colorRanges.length;

        for ( let colorRangesIndex: number = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++ ) {
            bindingOptions.colorRanges[ colorRangesIndex ].visible = flag;

            fireCustomTrigger( bindingOptions.events.onColorRangeTypeToggle, bindingOptions.colorRanges[ colorRangesIndex ].id, flag );
        }

        renderControlContainer( bindingOptions );
    }

    function toggleColorRangeVisibleState( bindingOptions: BindingOptions, id: string ) : void {
        const colorRangesLength: number = bindingOptions.colorRanges.length;

        for ( let colorRangesIndex: number = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++ ) {
            const colorRange: ColorRange = bindingOptions.colorRanges[ colorRangesIndex ];

            if ( colorRange.id === id ) {
                colorRange.visible = !getDefaultBoolean( colorRange.visible, true );

                fireCustomTrigger( bindingOptions.events.onColorRangeTypeToggle, colorRange.id, colorRange.visible );
                renderControlContainer( bindingOptions );
                break;
            }
        }
    }

    function getColorRange( bindingOptions: BindingOptions, colorRanges: ColorRange[], dateCount: number, date: Date = null ) : ColorRange {
        let useColorRange: ColorRange = null;

        if ( isDefined( date ) && isHoliday( bindingOptions, date ).matched ) {
            const newUseColorRange: ColorRange = {
                cssClassName: "holiday",
                id: _internal_Name_Holiday,
                visible: true,
                name: _string.empty,
                minimum: 0,
                mapCssClassName: _string.empty,
                chartCssClassName: _string.empty,
                statisticsCssClassName: _string.empty,
                tooltipText: _string.empty
            };

            useColorRange = newUseColorRange;
        }

        if ( !isDefined( useColorRange ) ) {
            const colorRangesLength: number = colorRanges.length;

            for ( let colorRangesIndex: number = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++ ) {
                const colorRange: ColorRange = colorRanges[ colorRangesIndex ];
    
                if ( dateCount >= colorRange.minimum ) {
                    useColorRange = colorRange;
                } else {
                    break;
                }
            }
        }

        return useColorRange;
    }

    function getColorRangeByMinimum( colorRanges: ColorRange[], minimum: number ) : ColorRange {
        const colorRangesLength: number = colorRanges.length;
        let useColorRange: ColorRange = null;

        for ( let colorRangesIndex: number = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++ ) {
            const colorRange: ColorRange = colorRanges[ colorRangesIndex ];

            if ( minimum.toString() === colorRange.minimum.toString() ) {
                useColorRange = colorRange;
                break;
            }
        }

        return useColorRange;
    }

    function getSortedColorRanges( bindingOptions: BindingOptions ) {
        return bindingOptions.colorRanges.sort( function( a, b ) {
            return a.minimum - b.minimum;
        } );
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Holiday
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function isHoliday( bindingOptions: BindingOptions, date: Date ) : any {
        const holidaysLength: number = bindingOptions.holidays.length;
        const day: number = date.getDate();
        const month: number = date.getMonth() + 1;
        const year: number = date.getFullYear();
        let holidayMatched: boolean = false;
        let holidayName: string = null;
        
        for ( let holidayIndex: number = 0; holidayIndex < holidaysLength; holidayIndex++ ) {
            let holiday: Holiday = bindingOptions.holidays[ holidayIndex ];

            if ( isDefinedString( holiday.date ) && holiday.showInViews ) {
                const dateParts: string[] = holiday.date.split( "/" );

                if ( dateParts.length === 2 ) {
                    holidayMatched = day === parseInt( dateParts[ 0 ] ) && month === parseInt( dateParts[ 1 ] );
                } else if ( dateParts.length === 3 ) {
                    holidayMatched = day === parseInt( dateParts[ 0 ] ) && month === parseInt( dateParts[ 1 ] ) && year === parseInt( dateParts[ 2 ] );
                }

                if ( holidayMatched ) {
                    holidayName = holiday.name;
                    break;
                }
            }
        }

        return {
            matched: holidayMatched,
            name: holidayName
        };
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Import
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function makeAreaDroppable( element: HTMLElement, bindingOptions: BindingOptions ) : void {
        if ( bindingOptions.allowFileImports && !bindingOptions._currentView.isInFetchMode ) {
            element.ondragover = cancelBubble;
            element.ondragenter = cancelBubble;
            element.ondragleave = cancelBubble;
    
            element.ondrop = function( e ) {
                cancelBubble( e );
    
                if ( isDefined( windowObject.FileReader ) && e.dataTransfer.files.length > 0 ) {
                    importFromFiles( e.dataTransfer.files, bindingOptions );
                }
            };
        }
    }

    function importFromFilesSelected( bindingOptions: BindingOptions ) : void {
        const input: any = createElementWithNoContainer( "input" );
        input.type = "file";
        input.accept = ".json, .txt, .csv";
        input.multiple = "multiple";

        input.onchange = function() {
            importFromFiles( input.files, bindingOptions );
        };

        input.click();
    }

    function importFromFiles( files: FileList, bindingOptions: BindingOptions ) : void {
        const filesLength: number = files.length;
        const filesCompleted: string[] = [];
        const data: any = getCurrentViewData( bindingOptions );

        const onLoadEnd = function( filename: string, readingObject: object ) {
            filesCompleted.push( filename );

            for ( let storageDate in readingObject ) {
                if ( readingObject.hasOwnProperty( storageDate ) ) {
                    if ( !data.hasOwnProperty( storageDate ) ) {
                        data[ storageDate ] = 0;
                    }

                    data[ storageDate ] += readingObject[ storageDate ];
                }
            }
            
            if ( filesCompleted.length === filesLength ) {
                fireCustomTrigger( bindingOptions.events.onImport, bindingOptions._currentView.element );
                renderControlContainer( bindingOptions );
            }
        };

        for ( let fileIndex: number = 0; fileIndex < filesLength; fileIndex++ ) {
            const file: File = files[ fileIndex ];
            const fileExtension: string = file.name.split( "." ).pop().toLowerCase();

            if ( fileExtension === _exportType.json ) {
                importFromJson( file, onLoadEnd );
            } else if ( fileExtension === _exportType.txt ) {
                importFromTxt( file, onLoadEnd );
            } else if ( fileExtension === _exportType.csv ) {
                importFromCsv( file, onLoadEnd );
            }
        }
    }

    function importFromJson( file: File, onLoadEnd: Function ) : void {
        const reader: FileReader = new FileReader();
        let readingObject: object = null;

        reader.readAsText( file );

        reader.onloadend = function() {
            onLoadEnd( file.name, readingObject );
        };
    
        reader.onload = function( e ) {
            const jsonObject: any = getObjectFromString( e.target.result );

            if ( jsonObject.parsed && isDefinedObject( jsonObject.result ) ) {
                readingObject = jsonObject.result;
            }
        };
    }

    function importFromTxt( file: File, onLoadEnd: Function ) : void {
        const reader: FileReader = new FileReader();
        const readingObject: object = null;

        reader.readAsText( file );

        reader.onloadend = function() {
            onLoadEnd( file.name, readingObject );
        };
    
        reader.onload = function( e ) {
            const lines: string[] = e.target.result.toString().split( _string.newLine );
            const linesLength: number = lines.length;

            for ( let lineIndex: number = 0; lineIndex < linesLength; lineIndex++ ) {
                const line: string[] = lines[ lineIndex ].split( _string.colon );

                readingObject[ line[ 0 ].trim() ] = parseInt( line[ 1 ].trim() );
            }
        };
    }

    function importFromCsv( file: File, onLoadEnd: Function ) : void {
        const reader: FileReader = new FileReader();
        const readingObject: object = null;

        reader.readAsText( file );

        reader.onloadend = function() {
            onLoadEnd( file.name, readingObject );
        };
    
        reader.onload = function( e ) {
            const data: string = e.target.result.toString().replace( new RegExp( "\"", "g" ), _string.empty );
            const lines: string[] = data.split( _string.newLine );
            
            lines.shift();

            const linesLength: number = lines.length;

            for ( let lineIndex: number = 0; lineIndex < linesLength; lineIndex++ ) {
                let line: string[] = lines[ lineIndex ].split( _string.comma );

                readingObject[ line[ 0 ].trim() ] = parseInt( line[ 1 ].trim() );
            }
        };
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Export
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function exportAllData( bindingOptions: BindingOptions, exportType: string = null ) : void {
        let contents: string = null;
        const contentsMimeType: string = getExportMimeType( bindingOptions );
        const contentExportType: string = getDefaultString( exportType, bindingOptions.exportType ).toLowerCase();

        if ( contentExportType === _exportType.csv ) {
            contents = getCsvContent( bindingOptions );
        } else if ( contentExportType === _exportType.json ) {
            contents = getJsonContent( bindingOptions );
        } else if ( contentExportType === _exportType.xml ) {
            contents = getXmlContents( bindingOptions );
        } else if ( contentExportType === _exportType.txt ) {
            contents = getTxtContents( bindingOptions );
        }

        if ( isDefinedString( contents ) ) {
            const tempLink: HTMLElement = createElement( documentObject.body, "a" );
            tempLink.style.display = "none";
            tempLink.setAttribute( "target", "_blank" );
            tempLink.setAttribute( "href", "data:" + contentsMimeType + ";charset=utf-8," + encodeURIComponent( contents ) );
            tempLink.setAttribute( "download", getExportFilename( bindingOptions ) );
            tempLink.click();
            
            documentObject.body.removeChild( tempLink );

            fireCustomTrigger( bindingOptions.events.onExport, bindingOptions._currentView.element );
        }
    }

    function getCsvContent( bindingOptions: BindingOptions ) : string {
        const data: object = getExportData( bindingOptions );
        const csvContents: string[] = [];

        for ( let storageDate in data ) {
            if ( data.hasOwnProperty( storageDate ) ) {
                csvContents.push( getCsvValueLine( [ getCsvValue( storageDate ), getCsvValue( data[ storageDate ] ) ] ) );
            }
        }

        if ( csvContents.length > 0 ) {
            csvContents.unshift( getCsvValueLine( [ getCsvValue( _configuration.dateText ), getCsvValue( _configuration.countText ) ] ) );
        }
        
        return csvContents.join( _string.newLine );
    }

    function getJsonContent( bindingOptions: BindingOptions ) : string {
        return jsonObject.stringify( getExportData( bindingOptions ) );
    }

    function getXmlContents( bindingOptions: BindingOptions ) : string {
        const data: object = getExportData( bindingOptions );
        const contents: string[] = [];

        contents.push( "<?xml version=\"1.0\" ?>" );
        contents.push( "<Dates>" );

        for ( let storageDate in data ) {
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

    function getTxtContents( bindingOptions: BindingOptions ) : string {
        const data: object = getExportData( bindingOptions );
        const contents: string[] = [];

        for ( let storageDate in data ) {
            if ( data.hasOwnProperty( storageDate ) ) {
                contents.push( storageDate + _string.colon + _string.space + data[ storageDate ].toString() );
            }
        }

        return contents.join( _string.newLine );
    }

    function getExportData( bindingOptions: BindingOptions ) : object {
        const contents: object = {};
        const data = getCurrentViewData( bindingOptions );

        if ( bindingOptions.exportOnlyYearBeingViewed ) {
            for ( let monthIndex: number = 0; monthIndex < 12; monthIndex++ ) {
                const totalDaysInMonth: number = getTotalDaysInMonth( bindingOptions._currentView.year, monthIndex );
        
                for ( let dayIndex: number = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
                    const storageDate2: string = toStorageDate( new Date( bindingOptions._currentView.year, monthIndex, dayIndex + 1 ) );

                    if ( data.hasOwnProperty( storageDate2 ) ) {
                        contents[ storageDate2 ] = data[ storageDate2 ];
                    }
                }
            }

        } else {
            const storageDates: string[] = [];

            for ( let storageDate1 in data ) {
                if ( data.hasOwnProperty( storageDate1 ) ) {
                    storageDates.push( storageDate1 );
                }
            }
    
            storageDates.sort();

            const storageDatesLength: number = storageDates.length;

            for ( let storageDateIndex: number = 0; storageDateIndex < storageDatesLength; storageDateIndex++ ) {
                const storageDate3: string = storageDates[ storageDateIndex ];
    
                if ( data.hasOwnProperty( storageDate3 ) ) {
                    contents[ storageDate3 ] = data[ storageDate3 ];
                }
            }
        }

        return contents;
    }

    function getExportMimeType( bindingOptions: BindingOptions ) : string {
        let result: string = null;

        if ( bindingOptions.exportType.toLowerCase() === _exportType.csv ) {
            result = "text/csv";
        } else if ( bindingOptions.exportType.toLowerCase() === _exportType.json ) {
            result = "application/json";
        } else if ( bindingOptions.exportType.toLowerCase() === _exportType.xml ) {
            result = "application/xml";
        } else if ( bindingOptions.exportType.toLowerCase() === _exportType.txt ) {
            result = "text/plain";
        }

        return result;
    }

    function getExportFilename( bindingOptions: BindingOptions ) : string {
        const date: Date = new Date();
        const datePart: string = padNumber( date.getDate() ) + _string.dash + padNumber( date.getMonth() + 1 ) + _string.dash + date.getFullYear();
        const timePart: string = padNumber( date.getHours() ) + _string.dash + padNumber( date.getMinutes() );
        let filenameStart: string = _string.empty;

        if ( bindingOptions._currentView.type !== _configuration.unknownTrendText ) {
            filenameStart = bindingOptions._currentView.type.toLowerCase().replace( _string.space, _string.underscore ) + _string.underscore;
        }

        return filenameStart + datePart + _string.underscore + timePart + "." + bindingOptions.exportType.toLowerCase();
    }

    function getCsvValue( text: string ) : string {
        let result: string = text.toString().replace( /(\r\n|\n|\r)/gm, _string.empty ).replace( /(\s\s)/gm, _string.space );
        result = result.replace( /"/g, '""' );
        result = '"' + result + '"';

        return result;
    }

    function getCsvValueLine( csvValues: string[] ) : string {
        return csvValues.join( "," );
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Attribute Options
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function buildAttributeOptions( newOptions: any ) : BindingOptions {
        let options: BindingOptions = getDefaultObject( newOptions, {} as BindingOptions );
        options.views = getDefaultObject( options.views, {} );
        options.exportOnlyYearBeingViewed = getDefaultBoolean( options.exportOnlyYearBeingViewed, true );
        options.year = getDefaultNumber( options.year, new Date().getFullYear() );
        options.view = getDefaultString( options.view, _viewName.map );
        options.exportType = getDefaultString( options.exportType, _exportType.csv );
        options.useLocalStorageForData = getDefaultBoolean( options.useLocalStorageForData, false );
        options.allowFileImports = getDefaultBoolean( options.allowFileImports, true );
        options.yearsToHide = getDefaultArray( options.yearsToHide, [] );
        options.dataFetchDelay = getDefaultNumber( options.dataFetchDelay, 60000 );
        options.showOnlyDataForYearsAvailable = getDefaultBoolean( options.showOnlyDataForYearsAvailable, false );
        options.showHolidaysInDayToolTips = getDefaultBoolean( options.showHolidaysInDayToolTips, false );
        
        options = buildAttributeOptionColorRanges( options );
        options = buildAttributeOptionHolidays( options );
        options = buildAttributeOptionTitle( options );
        options = buildAttributeOptionDescription( options );
        options = buildAttributeOptionGuide( options );
        options = buildAttributeOptionToolTip( options );
        options = buildAttributeOptionMapView( options );
        options = buildAttributeOptionChartView( options );
        options = buildAttributeOptionDaysView( options );
        options = buildAttributeOptionStatisticsView( options );
        options = buildAttributeOptionCustomTriggers( options );
        
        return options;
    }

    function buildAttributeOptionColorRanges( options: BindingOptions ) : BindingOptions {
        if ( isDefinedArray( options.colorRanges ) ) {
            const colorRangesLength: number = options.colorRanges.length;

            for ( let colorRangeIndex: number = 0; colorRangeIndex < colorRangesLength; colorRangeIndex++ ) {
                const colorRange: ColorRange = options.colorRanges[ colorRangeIndex ];

                colorRange.id = getDefaultString( colorRange.id, newGuid() );
                colorRange.name = getDefaultString( colorRange.name, null );
                colorRange.minimum = getDefaultNumber( colorRange.minimum, 0 );
                colorRange.cssClassName = getDefaultString( colorRange.cssClassName, null );
                colorRange.mapCssClassName = getDefaultString( colorRange.mapCssClassName, null );
                colorRange.chartCssClassName = getDefaultString( colorRange.chartCssClassName, null );
                colorRange.statisticsCssClassName = getDefaultString( colorRange.statisticsCssClassName, null );
                colorRange.tooltipText = getDefaultString( colorRange.tooltipText, null );
                colorRange.visible = getDefaultBoolean( colorRange.visible, true );
            }

        } else {
            options.colorRanges = [
                {
                    id: newGuid(),
                    name: "Day Color 1",
                    minimum: 10,
                    cssClassName: "day-color-1",
                    tooltipText: "Day Color 1",
                    visible: true,
                    mapCssClassName: _string.empty,
                    chartCssClassName: _string.empty,
                    statisticsCssClassName: _string.empty
                },
                {
                    id: newGuid(),
                    name: "Day Color 2",
                    minimum: 15,
                    cssClassName: "day-color-2",
                    tooltipText: "Day Color 2",
                    visible: true,
                    mapCssClassName: _string.empty,
                    chartCssClassName: _string.empty,
                    statisticsCssClassName: _string.empty
                },
                {
                    id: newGuid(),
                    name: "Day Color 3",
                    minimum: 20,
                    cssClassName: "day-color-3",
                    tooltipText: "Day Color 3",
                    visible: true,
                    mapCssClassName: _string.empty,
                    chartCssClassName: _string.empty,
                    statisticsCssClassName: _string.empty
                },
                {
                    id: newGuid(),
                    name: "Day Color 4",
                    minimum: 25,
                    cssClassName: "day-color-4",
                    tooltipText: "Day Color 4",
                    visible: true,
                    mapCssClassName: _string.empty,
                    chartCssClassName: _string.empty,
                    statisticsCssClassName: _string.empty
                }
            ];
        }

        return options;
    }

    function buildAttributeOptionHolidays( options: BindingOptions ) : BindingOptions {
        if ( isDefinedArray( options.holidays ) ) {
            const holidaysLength: number = options.holidays.length;

            for ( let holidayIndex: number = 0; holidayIndex < holidaysLength; holidayIndex++ ) {
                const holiday: Holiday = options.holidays[ holidayIndex ];
                
                holiday.date = getDefaultString( holiday.date, null );
                holiday.name = getDefaultString( holiday.name, null );
                holiday.showInViews = getDefaultBoolean( holiday.showInViews, true );
            }

        } else {
            options.holidays = [];
        }

        return options;
    }

    function buildAttributeOptionTitle( options: BindingOptions ) : BindingOptions {
        options.title = getDefaultObject( options.title, {} as Title );
        options.title.text = getDefaultString( options.title.text, "Heat.js" );
        options.title.showText = getDefaultBoolean( options.title.showText, true );
        options.title.showYearSelector = getDefaultBoolean( options.title.showYearSelector, true );
        options.title.showRefreshButton = getDefaultBoolean( options.title.showRefreshButton, false );
        options.title.showExportButton = getDefaultBoolean( options.title.showExportButton, false );
        options.title.extraSelectionYears = getDefaultNumber( options.title.extraSelectionYears, 50 );
        options.title.showYearSelectionDropDown = getDefaultBoolean( options.title.showYearSelectionDropDown, true );
        options.title.showImportButton = getDefaultBoolean( options.title.showImportButton, false );
        options.title.showConfigurationButton = getDefaultBoolean( options.title.showConfigurationButton, true );
        options.title.showTitleDropDownButton = getDefaultBoolean( options.title.showTitleDropDownButton, true );
        options.title.showTitleDropDownHeaders = getDefaultBoolean( options.title.showTitleDropDownHeaders, true );

        return options;
    }

    function buildAttributeOptionDescription( options: BindingOptions ) {
        options.description = getDefaultObject( options.description, {} as Description );
        options.description.text = getDefaultString( options.description.text, null );
        options.description.url = getDefaultString( options.description.url, null );
        options.description.urlTarget = getDefaultString( options.description.urlTarget, "_blank" );

        return options;
    }

    function buildAttributeOptionGuide( options: BindingOptions ) : BindingOptions {
        options.guide = getDefaultObject( options.guide, {} as Guide );
        options.guide.enabled = getDefaultBoolean( options.guide.enabled, true );
        options.guide.colorRangeTogglesEnabled = getDefaultBoolean( options.guide.colorRangeTogglesEnabled, true );
        options.guide.showLessAndMoreLabels = getDefaultBoolean( options.guide.showLessAndMoreLabels, true );
        options.guide.showNumbersInGuide = getDefaultBoolean( options.guide.showNumbersInGuide, false );

        return options;
    }

    function buildAttributeOptionToolTip( options: BindingOptions ) : BindingOptions {
        options.tooltip = getDefaultObject( options.tooltip, {} as Tooltip );
        options.tooltip.delay = getDefaultNumber( options.tooltip.delay, 750 );
        options.tooltip.dayText = getDefaultString( options.tooltip.dayText, "{d}{o} {mmmm} {yyyy}" );

        return options;
    }

    function buildAttributeOptionMapView( options: BindingOptions ) : BindingOptions {
        options.views.map = getDefaultObject( options.views.map, {} as Map );
        options.views.map.showMonthDayGaps = getDefaultBoolean( options.views.map.showMonthDayGaps, true );
        options.views.map.showDayNames = getDefaultBoolean( options.views.map.showDayNames, true );
        options.views.map.placeMonthNamesOnTheBottom = getDefaultBoolean( options.views.map.placeMonthNamesOnTheBottom, false );
        options.views.map.showDayNumbers = getDefaultBoolean( options.views.map.showDayNumbers, false );
        options.views.map.showMonthNames = getDefaultBoolean( options.views.map.showMonthNames, true );
        options.views.map.showDaysInReverseOrder = getDefaultBoolean( options.views.map.showDaysInReverseOrder, false );
        options.views.map.showNoDataMessageWhenDataIsNotAvailable = getDefaultBoolean( options.views.map.showNoDataMessageWhenDataIsNotAvailable, false );
        options.views.map.showMinimalDayNames = getDefaultBoolean( options.views.map.showMinimalDayNames, false );
        options.views.map.showMonthsInReverseOrder = getDefaultBoolean( options.views.map.showMonthsInReverseOrder, false );
        options.views.map.keepScrollPositions = getDefaultBoolean( options.views.map.keepScrollPositions, false );

        if ( isInvalidOptionArray( options.views.map.monthsToShow ) ) {
            options.views.map.monthsToShow = _default_MonthsToShow;
        }

        if ( isInvalidOptionArray( options.views.map.daysToShow ) ) {
            options.views.map.daysToShow = _default_DaysToShow;
        }

        return options;
    }

    function buildAttributeOptionChartView( options: BindingOptions ) : BindingOptions {
        options.views.chart = getDefaultObject( options.views.chart, {} as Chart );
        options.views.chart.enabled = getDefaultBoolean( options.views.chart.enabled, true );
        options.views.chart.showChartYLabels = getDefaultBoolean( options.views.chart.showChartYLabels, true );
        options.views.chart.showMonthNames = getDefaultBoolean( options.views.chart.showMonthNames, true );
        options.views.chart.showLineNumbers = getDefaultBoolean( options.views.chart.showLineNumbers, false );
        options.views.chart.showInReverseOrder = getDefaultBoolean( options.views.chart.showInReverseOrder, false );
        options.views.chart.keepScrollPositions = getDefaultBoolean( options.views.chart.keepScrollPositions, false );

        if ( isInvalidOptionArray( options.views.chart.monthsToShow ) ) {
            options.views.chart.monthsToShow = _default_MonthsToShow;
        }

        if ( isInvalidOptionArray( options.views.chart.daysToShow ) ) {
            options.views.chart.daysToShow = _default_DaysToShow;
        }

        return options;
    }

    function buildAttributeOptionDaysView( options: BindingOptions ) : BindingOptions {
        options.views.days = getDefaultObject( options.views.days, {} as Days );
        options.views.days.enabled = getDefaultBoolean( options.views.days.enabled, true );
        options.views.days.showChartYLabels = getDefaultBoolean( options.views.days.showChartYLabels, true );
        options.views.days.showDayNames = getDefaultBoolean( options.views.days.showDayNames, true );
        options.views.days.showInReverseOrder = getDefaultBoolean( options.views.days.showInReverseOrder, false );
        options.views.days.showDayNumbers = getDefaultBoolean( options.views.days.showDayNumbers, false );
        options.views.days.keepScrollPositions = getDefaultBoolean( options.views.days.keepScrollPositions, false );

        if ( isInvalidOptionArray( options.views.days.monthsToShow ) ) {
            options.views.days.monthsToShow = _default_MonthsToShow;
        }

        if ( isInvalidOptionArray( options.views.days.daysToShow ) ) {
            options.views.days.daysToShow = _default_DaysToShow;
        }

        return options;
    }

    function buildAttributeOptionStatisticsView( options: BindingOptions ) : BindingOptions {
        options.views.statistics = getDefaultObject( options.views.statistics, {} as Statistics );
        options.views.statistics.enabled = getDefaultBoolean( options.views.statistics.enabled, true );
        options.views.statistics.showChartYLabels = getDefaultBoolean( options.views.statistics.showChartYLabels, true );
        options.views.statistics.showColorRangeLabels = getDefaultBoolean( options.views.statistics.showColorRangeLabels, true );
        options.views.statistics.useColorRangeNamesForLabels = getDefaultBoolean( options.views.statistics.useColorRangeNamesForLabels, false );
        options.views.statistics.showRangeNumbers = getDefaultBoolean( options.views.statistics.showRangeNumbers, false );
        options.views.statistics.showInReverseOrder = getDefaultBoolean( options.views.statistics.showInReverseOrder, false );
        options.views.statistics.keepScrollPositions = getDefaultBoolean( options.views.statistics.keepScrollPositions, false );

        if ( isInvalidOptionArray( options.views.statistics.monthsToShow ) ) {
            options.views.statistics.monthsToShow = _default_MonthsToShow;
        }

        if ( isInvalidOptionArray( options.views.statistics.daysToShow ) ) {
            options.views.statistics.daysToShow = _default_DaysToShow;
        }

        return options;
    }

    function buildAttributeOptionCustomTriggers( options : BindingOptions ) : BindingOptions {
        options.events = getDefaultObject( options.events, {} as Events );
        options.events.onDayClick = getDefaultFunction( options.events.onDayClick, null );
        options.events.onBackYear = getDefaultFunction( options.events.onBackYear, null );
        options.events.onNextYear = getDefaultFunction( options.events.onNextYear, null );
        options.events.onRefresh = getDefaultFunction( options.events.onRefresh, null );
        options.events.onBeforeRender = getDefaultFunction( options.events.onBeforeRender, null );
        options.events.onRenderComplete = getDefaultFunction( options.events.onRenderComplete, null );
        options.events.onDestroy = getDefaultFunction( options.events.onDestroy, null );
        options.events.onExport = getDefaultFunction( options.events.onExport, null );
        options.events.onSetYear = getDefaultFunction( options.events.onSetYear, null );
        options.events.onTypeSwitch = getDefaultFunction( options.events.onTypeSwitch, null );
        options.events.onDayToolTipRender = getDefaultFunction( options.events.onDayToolTipRender, null );
        options.events.onAdd = getDefaultFunction( options.events.onAdd, null );
        options.events.onRemove = getDefaultFunction( options.events.onRemove, null );
        options.events.onReset = getDefaultFunction( options.events.onReset, null );
        options.events.onViewSwitch = getDefaultFunction( options.events.onViewSwitch, null );
        options.events.onColorRangeTypeToggle = getDefaultFunction( options.events.onColorRangeTypeToggle, null );
        options.events.onImport = getDefaultFunction( options.events.onImport, null );
        options.events.onStatisticClick = getDefaultFunction( options.events.onStatisticClick, null );
        options.events.onDataFetch = getDefaultFunction( options.events.onDataFetch, null );
        options.events.onClear = getDefaultFunction( options.events.onClear, null );
        options.events.onUpdate = getDefaultFunction( options.events.onUpdate, null );
        options.events.onOptionsUpdate = getDefaultFunction( options.events.onOptionsUpdate, null );
        options.events.onWeekDayClick = getDefaultFunction( options.events.onWeekDayClick, null );

        return options;
    }


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
        const weekDayNumber: number = getWeekdayNumber( date );

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
        const nodeType: string = type.toLowerCase();
        const isText: boolean = nodeType === "text";

        if ( !_elements_Type.hasOwnProperty( nodeType ) ) {
            _elements_Type[ nodeType ] = isText ? documentObject.createTextNode( _string.empty ) : documentObject.createElement( nodeType );
        }

        result = _elements_Type[ nodeType ].cloneNode( false );

        return result;
    }

    function createElement( container: HTMLElement, type: string, className: string = _string.empty, beforeNode: HTMLElement | null = null ) : HTMLElement {
        let result: HTMLElement = null;
        const nodeType: string = type.toLowerCase();
        const isText: boolean = nodeType === "text";

        if ( !_elements_Type.hasOwnProperty( nodeType ) ) {
            _elements_Type[ nodeType ] = isText ? documentObject.createTextNode( _string.empty ) : documentObject.createElement( nodeType );
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
        const element: HTMLElement = createElement( container, type, className, beforeNode );
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
        element.className += _string.space + className;
        element.className = element.className.trim();
    }

    function removeClass( element: HTMLElement, className: string ) {
        element.className = element.className.replace( className, _string.empty );
        element.className = element.className.trim();
    }

    function cancelBubble( e: any ) {
        e.preventDefault();
        e.cancelBubble = true;
    }

    function getScrollPosition() : object {
        const doc: HTMLElement = documentObject.documentElement;
        const left: number = ( windowObject.pageXOffset || doc.scrollLeft )  - ( doc.clientLeft || 0 );
        const top: number = ( windowObject.pageYOffset || doc.scrollTop ) - ( doc.clientTop || 0 );

        return {
            left: left,
            top: top
        };
    }

    function showElementAtMousePosition( e: any, element: HTMLElement ) {
        let left: number = e.pageX;
        let top: number = e.pageY;
        const scrollPosition: any = getScrollPosition();

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
        const children: HTMLCollection = parent.children;
        let childrenLength: number = children.length - 1;

        for ( ; childrenLength--; ) {
            parent.appendChild( children[ childrenLength ] );
        }
    }

    function buildCheckBox( container: HTMLElement, labelText: string, checked: boolean | null = null, onClick: Function | null = null ) : any {
        const lineContainer: HTMLElement = createElement( container, "div" );
        const label: HTMLElement = createElement( lineContainer, "label", "checkbox" );
        const input: any = createElement( label, "input" );

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

    function fireCustomTrigger( triggerFunction: Function, ...args : any[] ) : any {
        let result: any = null;

        if ( isDefinedFunction( triggerFunction ) ) {
            result = triggerFunction.apply( null, [].slice.call( args, 1 ) );
        }

        return result;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Validation
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function isDefined( value: any ) : boolean  {
        return value !== null && value !== undefined && value.toString() !== _string.empty;
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

    function isInvalidOptionArray( array: any, minimumLength: number = 1 ) : boolean {
        return !isDefinedArray( array ) || array.length < minimumLength;
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

    function getDefaultObject( value: any, defaultValue: object ) : any {
        return isDefinedObject( value ) ? value : defaultValue;
    }

    function getDefaultStringOrArray( value: any, defaultValue: any[] ) : any[] {
        let result: any[] = defaultValue;

        if ( isDefinedString( value ) ) {
            const values: string[] = value.toString().split( _string.space );

            if ( values.length === 0 ) {
                value = defaultValue;
            } else {
                result = values;
            }

        } else {
            result = getDefaultArray( value, defaultValue );
        }

        return result;
    }

    function getObjectFromString( objectString: any ) : any {
        let parsed: boolean = true,
            result: any = null;

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
        const result: string[] = [];

        for ( let charIndex: number = 0; charIndex < 32; charIndex++ ) {
            if ( charIndex === 8 || charIndex === 12 || charIndex === 16 || charIndex === 20 ) {
                result.push( _string.dash );
            }

            const character: string = mathObject.floor( mathObject.random() * 16 ).toString( 16 );
            result.push( character );
        }

        return result.join( _string.empty );
    }

    function padNumber( number: number ) : string {
        const numberString: string = number.toString();

        return numberString.length === 1 ? _string.zero + numberString : numberString;
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
        return date.getFullYear() + _string.dash + padNumber( date.getMonth() + 1 ) + _string.dash + padNumber( date.getDate() );
    }

    function getStorageDate( data: string ) : string[] {
        return data.split( _string.dash );
    }

    function getStorageDateYear( data: string ) : string {
        return data.split( _string.dash )[ 0 ];
    }


	/*
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 * Public API Functions:  Helpers:  Manage Instances
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 */

    function moveToPreviousYear( bindingOptions: BindingOptions, callCustomTrigger: boolean = true ) : void {
        let render: boolean = true;
        let year: number = bindingOptions._currentView.year;
            
        year--;

        while ( !isYearVisible( bindingOptions, year ) ) {
            if ( isFirstVisibleYear( bindingOptions, year ) ) {
                render = false;
                break;
            }

            year--;
        }

        if ( render ) {
            bindingOptions._currentView.year = year;

            renderControlContainer( bindingOptions );

            if ( callCustomTrigger ) {
                fireCustomTrigger( bindingOptions.events.onBackYear, bindingOptions._currentView.year );
            }
        }
    }

    function moveToNextYear( bindingOptions: BindingOptions, callCustomTrigger: boolean = true ) : void {
        let render: boolean = true;
        let year: number = bindingOptions._currentView.year;

        year++;

        while ( !isYearVisible( bindingOptions, year ) ) {
            if ( isLastVisibleYear( bindingOptions, year ) ) {
                render = false;
                break;
            }

            year++;
        }

        if ( render ) {
            bindingOptions._currentView.year = year;

            renderControlContainer( bindingOptions );

            if ( callCustomTrigger ) {
                fireCustomTrigger( bindingOptions.events.onBackYear, bindingOptions._currentView.year );
            }
        }
    }


	/*
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 * Public API Functions:  Helpers:  Destroy
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 */

    function destroyElement( bindingOptions: BindingOptions ) : void {
        bindingOptions._currentView.element.innerHTML = _string.empty;

        removeClass( bindingOptions._currentView.element, "heat-js" );
        assignToolTipEvents( bindingOptions, false );

        documentObject.body.removeChild( bindingOptions._currentView.tooltip );

        if ( bindingOptions._currentView.isInFetchMode && isDefined( bindingOptions._currentView.isInFetchModeTimer ) ) {
            clearInterval( bindingOptions._currentView.isInFetchModeTimer );
        }

        fireCustomTrigger( bindingOptions.events.onDestroy, bindingOptions._currentView.element );
    }

	/*
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 * Public API Functions:  Helpers:  Configuration
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 */

    function buildDefaultConfiguration( newConfiguration: Configuration = null ) : void {
        _configuration = !isDefinedObject( newConfiguration ) ? {} as Configuration : newConfiguration;
        _configuration.safeMode = getDefaultBoolean( _configuration.safeMode, true );
        _configuration.domElementTypes = getDefaultStringOrArray( _configuration.domElementTypes, [ "*" ] );

        buildDefaultConfigurationStrings();
        buildDefaultConfigurationArrays();
    }

    function buildDefaultConfigurationStrings() : void {
        _configuration.stText = getDefaultAnyString( _configuration.stText, "st" );
        _configuration.ndText = getDefaultAnyString( _configuration.ndText, "nd" );
        _configuration.rdText = getDefaultAnyString( _configuration.rdText, "rd" );
        _configuration.thText = getDefaultAnyString( _configuration.thText, "th" );
        _configuration.backButtonText = getDefaultAnyString( _configuration.backButtonText, "Back" );
        _configuration.nextButtonText = getDefaultAnyString( _configuration.nextButtonText, "Next" );
        _configuration.refreshButtonText = getDefaultAnyString( _configuration.refreshButtonText, "Refresh" );
        _configuration.exportButtonText = getDefaultAnyString( _configuration.exportButtonText, "Export" );
        _configuration.lessText = getDefaultAnyString( _configuration.lessText, "Less" );
        _configuration.moreText = getDefaultAnyString( _configuration.moreText, "More" );
        _configuration.dateText = getDefaultAnyString( _configuration.dateText, "Date" );
        _configuration.countText = getDefaultAnyString( _configuration.countText, "Count" );
        _configuration.mapText = getDefaultAnyString( _configuration.mapText, "Map" );
        _configuration.chartText = getDefaultAnyString( _configuration.chartText, "Chart" );
        _configuration.noChartDataMessage = getDefaultAnyString( _configuration.noChartDataMessage, "There is currently no data to view." );
        _configuration.statisticsText = getDefaultAnyString( _configuration.statisticsText, "Statistics" );
        _configuration.noStatisticsDataMessage = getDefaultAnyString( _configuration.noStatisticsDataMessage, "There are currently no statistics to view." );
        _configuration.unknownTrendText = getDefaultAnyString( _configuration.unknownTrendText, "Unknown" );
        _configuration.importButtonText = getDefaultAnyString( _configuration.importButtonText, "Import" );
        _configuration.noMapDataMessage = getDefaultAnyString( _configuration.noMapDataMessage, "There is currently no data to view." );
        _configuration.objectErrorText = getDefaultAnyString( _configuration.objectErrorText, "Errors in object: {{error_1}}, {{error_2}}" );
        _configuration.attributeNotValidErrorText = getDefaultAnyString( _configuration.attributeNotValidErrorText, "The attribute '{{attribute_name}}' is not a valid object." );
        _configuration.attributeNotSetErrorText = getDefaultAnyString( _configuration.attributeNotSetErrorText, "The attribute '{{attribute_name}}' has not been set correctly." );
        _configuration.closeToolTipText = getDefaultAnyString( _configuration.closeToolTipText, "Close" );
        _configuration.configurationToolTipText = getDefaultAnyString( _configuration.configurationToolTipText, "Configuration" );
        _configuration.configurationTitleText = getDefaultAnyString( _configuration.configurationTitleText, "Configuration" );
        _configuration.visibleMonthsText = getDefaultAnyString( _configuration.visibleMonthsText, "Visible Months" );
        _configuration.visibleDaysText = getDefaultAnyString( _configuration.visibleDaysText, "Visible Days" );
        _configuration.dataText = getDefaultAnyString( _configuration.dataText, "Data" );
        _configuration.colorRangesText = getDefaultAnyString( _configuration.colorRangesText, "Color Ranges" );
        _configuration.yearText = getDefaultAnyString( _configuration.yearText, "Year" );
        _configuration.daysText = getDefaultAnyString( _configuration.daysText, "Days" );
        _configuration.noDaysDataMessage = getDefaultAnyString( _configuration.noDaysDataMessage, "There are currently no days to view." );
    }

    function buildDefaultConfigurationArrays() : void {
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


	/*
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 * Public API Functions:
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 */

    const _public: PublicApi = {

        /*
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         * Public Functions:  Manage Dates
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         */

        addDates: function ( elementId: string, dates: Date[], type: string, triggerRefresh: boolean = true ) : PublicApi {
            if ( isDefinedString( elementId ) && isDefinedArray( dates ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_DateCounts[ elementId ].options;
                
                if ( !bindingOptions._currentView.isInFetchMode ) {
                    type = getDefaultString( type, _configuration.unknownTrendText );
        
                    const datesLength: number = dates.length;
        
                    for ( let dateIndex: number = 0; dateIndex < datesLength; dateIndex++ ) {
                        _public.addDate( elementId, dates[ dateIndex ], type, false );
                    }
        
                    if ( triggerRefresh ) {
                        renderControlContainer( bindingOptions, true );
                    }
                }
            }
    
            return _public;
        },

        addDate: function ( elementId: string, date: Date, type: string, triggerRefresh: boolean = true ) : PublicApi {
            if ( isDefinedString( elementId ) && isDefinedDate( date ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_DateCounts[ elementId ].options;
                
                if ( !bindingOptions._currentView.isInFetchMode ) {
                    type = getDefaultString( type, _configuration.unknownTrendText );
        
                    const storageDate: string = toStorageDate( date );
        
                    if ( !_elements_DateCounts[ elementId ].type.hasOwnProperty( type ) ) {
                        _elements_DateCounts[ elementId ].type[ type ] = {};
                        _elements_DateCounts[ elementId ].types++;
                    }
        
                    if ( !_elements_DateCounts[ elementId ].type[ type ].hasOwnProperty( storageDate ) ) {
                        _elements_DateCounts[ elementId ].type[ type ][ storageDate ] = 0;
                    }
            
                    _elements_DateCounts[ elementId ].type[ type ][ storageDate ]++;
        
                    fireCustomTrigger( bindingOptions.events.onAdd, bindingOptions._currentView.element );
        
                    if ( triggerRefresh ) {
                        renderControlContainer( bindingOptions, true );
                    }
                }
            }
    
            return _public;
        },

        updateDate: function ( elementId: string, date: Date, count: number, type: string, triggerRefresh: boolean = true ) : PublicApi {
            if ( isDefinedString( elementId ) && isDefinedDate( date ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_DateCounts[ elementId ].options;
                
                if ( !bindingOptions._currentView.isInFetchMode && count > 0 ) {
                    type = getDefaultString( type, _configuration.unknownTrendText );
    
                    const storageDate: string = toStorageDate( date );
        
                    if ( _elements_DateCounts[ elementId ].type.hasOwnProperty( type ) ) {        
                        _elements_DateCounts[ elementId ].type[ type ][ storageDate ] = count;
        
                        fireCustomTrigger( bindingOptions.events.onUpdate, bindingOptions._currentView.element );
        
                        if ( triggerRefresh ) {
                            renderControlContainer( bindingOptions, true );
                        }
                    }
                }
            }
    
            return _public;
        },

        removeDates: function ( elementId: string, dates: Date[], type: string, triggerRefresh: boolean = true ) : PublicApi {
            if ( isDefinedString( elementId ) && isDefinedArray( dates ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_DateCounts[ elementId ].options;
                
                if ( !bindingOptions._currentView.isInFetchMode ) {
                    type = getDefaultString( type, _configuration.unknownTrendText );
        
                    const datesLength: number = dates.length;
        
                    for ( let dateIndex: number = 0; dateIndex < datesLength; dateIndex++ ) {
                        _public.removeDate( elementId, dates[ dateIndex ], type, false );
                    }
        
                    if ( triggerRefresh ) {
                        renderControlContainer( bindingOptions, true );
                    }
                }
            }
    
            return _public;
        },

        removeDate: function ( elementId: string, date: Date, type: string, triggerRefresh: boolean = true ) : PublicApi {
            if ( isDefinedString( elementId ) && isDefinedDate( date ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_DateCounts[ elementId ].options;
                
                if ( !bindingOptions._currentView.isInFetchMode ) {
                    type = getDefaultString( type, _configuration.unknownTrendText );
    
                    const storageDate: string = toStorageDate( date );
        
                    if ( _elements_DateCounts[ elementId ].type.hasOwnProperty( type ) && _elements_DateCounts[ elementId ].type[ type ].hasOwnProperty( storageDate ) ) {
                        if ( _elements_DateCounts[ elementId ].type[ type ][ storageDate ] > 0 ) {
                            _elements_DateCounts[ elementId ].type[ type ][ storageDate ]--;
                        }
        
                        fireCustomTrigger( bindingOptions.events.onRemove, bindingOptions._currentView.element );
        
                        if ( triggerRefresh ) {
                            renderControlContainer( bindingOptions, true );
                        }
                    }
                }
            }
    
            return _public;
        },

        clearDate: function ( elementId: string, date: Date, type: string, triggerRefresh: boolean = true ) : PublicApi {
            if ( isDefinedString( elementId ) && isDefinedDate( date ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_DateCounts[ elementId ].options;
                
                if ( !bindingOptions._currentView.isInFetchMode ) {
                    type = getDefaultString( type, _configuration.unknownTrendText );
    
                    const storageDate: string = toStorageDate( date );
        
                    if ( _elements_DateCounts[ elementId ].type.hasOwnProperty( type ) && _elements_DateCounts[ elementId ].type[ type ].hasOwnProperty( storageDate ) ) {
                        delete _elements_DateCounts[ elementId ].type[ type ][ storageDate ];
        
                        fireCustomTrigger( bindingOptions.events.onClear, bindingOptions._currentView.element );
        
                        if ( triggerRefresh ) {
                            renderControlContainer( bindingOptions, true );
                        }
                    }
                }
            }
    
            return _public;
        },

        resetAll: function ( triggerRefresh: boolean = true ) : PublicApi {
            for ( let elementId in _elements_DateCounts ) {
                if ( _elements_DateCounts.hasOwnProperty( elementId ) ) {
                    _public.reset( elementId, triggerRefresh );
                }
            }
    
            return _public;
        },

        reset: function ( elementId: string, triggerRefresh: boolean = true ) : PublicApi {
            if ( isDefinedString( elementId ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_DateCounts[ elementId ].options;
                
                if ( !bindingOptions._currentView.isInFetchMode ) {
                    bindingOptions._currentView.type = _configuration.unknownTrendText;
        
                    createDateStorageForElement( elementId, bindingOptions, false );
                    fireCustomTrigger( bindingOptions.events.onReset, bindingOptions._currentView.element );
        
                    if ( triggerRefresh ) {
                        renderControlContainer( bindingOptions, true );
                    }
                }
            }
    
            return _public;
        },


        /*
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         * Public Functions:  Export/Import
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         */

        import: function ( elementId: string, files: FileList ) : PublicApi {
            if ( isDefinedString( elementId ) && _elements_DateCounts.hasOwnProperty( elementId ) && isDefinedArray( files ) ) {
                importFromFiles( files, _elements_DateCounts[ elementId ].options );
            }
    
            return _public;
        },

        export: function ( elementId: string, exportType: string ) : PublicApi {
            if ( isDefinedString( elementId ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
                exportAllData( _elements_DateCounts[ elementId ].options, exportType );
            }
    
            return _public;
        },


        /*
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         * Public Functions:  Manage Instances
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         */

        refresh: function ( elementId: string ) : PublicApi {
            if ( isDefinedString( elementId ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_DateCounts[ elementId ].options;
    
                renderControlContainer( bindingOptions, true );
                fireCustomTrigger( bindingOptions.events.onRefresh, bindingOptions._currentView.element );
            }
    
            return _public;
        },

        refreshAll: function () : PublicApi {
            for ( let elementId in _elements_DateCounts ) {
                if ( _elements_DateCounts.hasOwnProperty( elementId ) ) {
                    const bindingOptions: BindingOptions = _elements_DateCounts[ elementId ].options;
    
                    renderControlContainer( bindingOptions, true );
                    fireCustomTrigger( bindingOptions.events.onRefresh, bindingOptions._currentView.element );
                }
            }
    
            return _public;
        },

        setYear: function ( elementId: string, year: number ) : PublicApi {
            if ( isDefinedString( elementId ) && isDefinedNumber( year ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_DateCounts[ elementId ].options;
                bindingOptions._currentView.year = year;
    
                if ( !isYearVisible( bindingOptions, bindingOptions._currentView.year ) ) {
                    moveToNextYear( bindingOptions, false );
                } else {
                    renderControlContainer( bindingOptions );
                }
    
                fireCustomTrigger( bindingOptions.events.onSetYear, bindingOptions._currentView.year );
            }
    
            return _public;
        },

        setYearToHighest: function ( elementId: string ) : PublicApi {
            if ( isDefinedString( elementId ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_DateCounts[ elementId ].options;
                const data: any = getCurrentViewData( bindingOptions );
                let maximumYear: number = 0;
    
                for ( let storageDate in data ) {
                    if ( data.hasOwnProperty( storageDate ) ) {
                        maximumYear = mathObject.max( maximumYear, parseInt( getStorageDateYear( storageDate ) ) );
                    }
                }
    
                if ( maximumYear > 0 ) {
                    bindingOptions._currentView.year = maximumYear;
    
                    if ( !isYearVisible( bindingOptions, bindingOptions._currentView.year ) ) {
                        moveToNextYear( bindingOptions, false );
                    } else {
                        renderControlContainer( bindingOptions );
                    }
    
                    fireCustomTrigger( bindingOptions.events.onSetYear, bindingOptions._currentView.year );
                }
            }
    
            return _public;
        },

        setYearToLowest: function ( elementId: string ) : PublicApi {
            if ( isDefinedString( elementId ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_DateCounts[ elementId ].options;
                const data: any = getCurrentViewData( bindingOptions );
                let minimumYear: number = 9999;
    
                for ( let storageDate in data ) {
                    if ( data.hasOwnProperty( storageDate ) ) {
                        minimumYear = mathObject.min( minimumYear, parseInt( getStorageDateYear( storageDate ) ) );
                    }
                }
    
                if ( minimumYear < 9999 ) {
                    bindingOptions._currentView.year = minimumYear;
    
                    if ( !isYearVisible( bindingOptions, bindingOptions._currentView.year ) ) {
                        moveToPreviousYear( bindingOptions, false );
                    } else {
                        renderControlContainer( bindingOptions );
                    }
    
                    fireCustomTrigger( bindingOptions.events.onSetYear, bindingOptions._currentView.year );
                }
            }
    
            return _public;
        },

        moveToPreviousYear: function ( elementId: string ) : PublicApi {
            if ( isDefinedString( elementId ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
                moveToPreviousYear( _elements_DateCounts[ elementId ].options );
            }
    
            return _public;
        },

        moveToNextYear: function ( elementId: string ) : PublicApi {
            if ( isDefinedString( elementId ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
                moveToNextYear( _elements_DateCounts[ elementId ].options );
            }
    
            return _public;
        },

        moveToCurrentYear: function ( elementId: string ) : PublicApi {
            if ( isDefinedString( elementId ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_DateCounts[ elementId ].options;
                bindingOptions._currentView.year = new Date().getFullYear();
    
                if ( !isYearVisible( bindingOptions, bindingOptions._currentView.year ) ) {
                    moveToNextYear( bindingOptions, false );
                } else {
                    renderControlContainer( bindingOptions );
                }
    
                fireCustomTrigger( bindingOptions.events.onSetYear, bindingOptions._currentView.year );
            }
    
            return _public;
        },

        getYear: function ( elementId: string ) : number {
            let result: number = null;

            if ( isDefinedString( elementId ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_DateCounts[ elementId ].options;
    
                result = bindingOptions._currentView.year;
            }
    
            return result;
        },

        render: function ( element: HTMLElement, options: BindingOptions ) : PublicApi {
            if ( isDefinedObject( element ) && isDefinedObject( options ) ) {
                renderControl( renderBindingOptions( options, element ) );
            }
    
            return _public;
        },

        renderAll: function () : PublicApi {
            render();

            return _public;
        },

        switchView: function ( elementId: string, viewName: string ) : PublicApi {
            if ( isDefinedString( elementId ) && isDefinedString( viewName ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_DateCounts[ elementId ].options;
                let view: number = null;
    
                if ( viewName.toLowerCase() === _viewName.map ) {
                    view = _view.map;
                } else if ( viewName.toLowerCase() === _viewName.chart ) {
                    view = _view.chart;
                } else if ( viewName.toLowerCase() === _viewName.days ) {
                    view = _view.days;
                } else if ( viewName.toLowerCase() === _viewName.statistics ) {
                    view = _view.statistics;
                }
    
                if ( isDefinedNumber( view ) ) {
                    bindingOptions._currentView.view = view;
    
                    fireCustomTrigger( bindingOptions.events.onViewSwitch, viewName );
                    renderControlContainer( bindingOptions, false, true );
                }
            }
    
            return _public;
        },

        switchType: function ( elementId: string, type: string ) : PublicApi {
            if ( isDefinedString( elementId ) && isDefinedString( type ) && _elements_DateCounts.hasOwnProperty( elementId ) && _elements_DateCounts[ elementId ].type.hasOwnProperty( type ) ) {
                const bindingOptions: BindingOptions = _elements_DateCounts[ elementId ].options;
    
                if ( bindingOptions._currentView.type !== type ) {
                    bindingOptions._currentView.type = type;
                
                    fireCustomTrigger( bindingOptions.events.onTypeSwitch, type );
                    renderControlContainer( bindingOptions );
                }
            }
    
            return _public;
        },

        updateOptions: function ( elementId: string, newOptions: BindingOptions ) : PublicApi {
            if ( isDefinedString( elementId ) && isDefinedObject( newOptions ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_DateCounts[ elementId ].options;
                const newBindingOptions: BindingOptions = buildAttributeOptions( newOptions );
                let optionChanged: boolean = false;
    
                for ( let propertyName in newBindingOptions ) {
                    if ( newBindingOptions.hasOwnProperty( propertyName ) && bindingOptions.hasOwnProperty( propertyName ) && bindingOptions[ propertyName ] !== newBindingOptions[ propertyName ] ) {
                        bindingOptions[ propertyName ] = newBindingOptions[ propertyName ];
                        optionChanged = true;
                    }
                }
    
                if ( optionChanged ) {
                    renderControlContainer( bindingOptions, true );
                    fireCustomTrigger( bindingOptions.events.onRefresh, bindingOptions._currentView.element );
                    fireCustomTrigger( bindingOptions.events.onOptionsUpdate, bindingOptions._currentView.element, bindingOptions );
                }
            }
    
            return _public;
        },


        /*
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         * Public Functions:  Destroying
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         */

        destroyAll: function () : PublicApi {
            for ( let elementId in _elements_DateCounts ) {
                if ( _elements_DateCounts.hasOwnProperty( elementId ) ) {
                    destroyElement( _elements_DateCounts[ elementId ].options );
                }
            }
    
            _elements_DateCounts = {};
    
            return _public;
        },

        destroy: function ( elementId: string ) : PublicApi {
            if ( isDefinedString( elementId ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
                destroyElement( _elements_DateCounts[ elementId ].options );
    
                delete _elements_DateCounts[ elementId ];
            }
    
            return _public;
        },


        /*
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         * Public Functions:  Configuration
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         */

        setConfiguration: function ( newConfiguration: Configuration, triggerRefresh: boolean = true ) : PublicApi {
            if ( isDefinedObject( newConfiguration ) ) {
                let configurationHasChanged: boolean = false;
            
                for ( let propertyName in newConfiguration ) {
                    if ( newConfiguration.hasOwnProperty( propertyName ) && _configuration.hasOwnProperty( propertyName ) && _configuration[ propertyName ] !== newConfiguration[ propertyName ] ) {
                        _configuration[ propertyName ] = newConfiguration[ propertyName ];
                        configurationHasChanged = true;
                    }
                }
        
                if ( configurationHasChanged ) {
                    buildDefaultConfiguration( _configuration );
        
                    if ( triggerRefresh ) {
                        _public.refreshAll();
                    }
                }
            }
    
            return _public;
        },


        /*
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         * Public Functions:  Additional Data
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         */

        getIds: function () : string[] {
            const result: string[] = [];
        
            for ( let elementId in _elements_DateCounts ) {
                if ( _elements_DateCounts.hasOwnProperty( elementId ) ) {
                    result.push( elementId );
                }
            }
    
            return result;
        },

        getVersion: function () : string {
            return "4.0.0";
        }
    };


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Initialize Heat.js
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    ( () => {
        buildDefaultConfiguration();

        documentObject.addEventListener( "DOMContentLoaded", function() {
            render();
        } );

        windowObject.addEventListener( "pagehide", function() {
            cancelAllPullDataTimers();
        } );

        if ( !isDefined( windowObject.$heat ) ) {
            windowObject.$heat = _public;
        }
    } )();

} )( document, window, Math, JSON );