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
    type Events } from "./ts/type";

import { ExportType, Char, Value, ViewId, ViewName } from "./ts/enum";
import { HEAT_JS_ATTRIBUTE_NAME } from "./ts/constant"
import { Is } from "./ts/is"
import { Data } from "./ts/data"
import { DomElement } from "./ts/dom"
import { DateTime } from "./ts/datetime"
import { type PublicApi } from "./ts/api";


( () => {
    // Variables: Configuration
    let _configuration: Configuration = {} as Configuration;

    // Variables: Elements
    let _elements_Day_Width: number = null;

    // Variables: Date Counts
    let _elements_DateCounts: Record<string, { options: BindingOptions; types: number; typeData: Record<string, Record<string, number>> }> = {};

    // Variables: Internal Names
    const _internal_Name_Holiday: string = "HOLIDAY";

    // Variables: Local Storage
    const _local_Storage_Start_ID: string = "HJS_";

    // Variables: Defaults
    const _default_MonthsToShow: number[] = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
    const _default_DaysToShow: number[] = [ 1, 2, 3, 4, 5, 6, 7 ];


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Disabled Background
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderDisabledBackground( bindingOptions: BindingOptions ) : void {
        bindingOptions._currentView.disabledBackground = DomElement.create( bindingOptions._currentView.element, "div", "disabled" );
    }

    function showDisabledBackground( bindingOptions: BindingOptions ) : void {
        if ( Is.defined( bindingOptions._currentView.disabledBackground ) && bindingOptions._currentView.disabledBackground.style.display !== "block" ) {
            bindingOptions._currentView.disabledBackground.style.display = "block";
        }
    }

    function hideDisabledBackground( bindingOptions: BindingOptions ) : void {
        if ( Is.defined( bindingOptions._currentView.disabledBackground ) && bindingOptions._currentView.disabledBackground.style.display !== "none" ) {
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
            const domElements: HTMLCollectionOf<Element> = document.getElementsByTagName( tagTypes[ tagTypeIndex ] );
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

        if ( Is.defined( element ) && element.hasAttribute( HEAT_JS_ATTRIBUTE_NAME ) ) {
            const bindingOptionsData: string = element.getAttribute( HEAT_JS_ATTRIBUTE_NAME );

            if ( Is.definedString( bindingOptionsData ) ) {
                const bindingOptions: any = getObjectFromString( bindingOptionsData );

                if ( bindingOptions.parsed && Is.definedObject( bindingOptions.result ) ) {
                    renderControl( renderBindingOptions( bindingOptions.result, element ) );

                } else {
                    if ( !_configuration.safeMode ) {
                        console.error( _configuration.attributeNotValidErrorText.replace( "{{attribute_name}}", HEAT_JS_ATTRIBUTE_NAME ) );
                        result = false;
                    }
                }

            } else {
                if ( !_configuration.safeMode ) {
                    console.error( _configuration.attributeNotSetErrorText.replace( "{{attribute_name}}", HEAT_JS_ATTRIBUTE_NAME ) );
                    result = false;
                }
            }
        }

        return result;
    }

    function renderBindingOptions( data: any, element: HTMLElement ) : BindingOptions {
        const bindingOptions: BindingOptions = buildAttributeOptions( data );
        const view: string = !Is.definedString( bindingOptions.view ) ? Char.empty : bindingOptions.view.toLowerCase();

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
        currentView.isInFetchMode = Is.definedFunction( bindingOptions.events.onDataFetch );
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

        if ( view === ViewName.map ) {
            currentView.view = ViewId.map;
        } else if ( view === ViewName.chart ) {
            currentView.view = ViewId.chart;
        } else if ( view === ViewName.days ) {
            currentView.view = ViewId.days;
        } else if ( view === ViewName.statistics ) {
            currentView.view = ViewId.statistics;
        } else {
            currentView.view = ViewId.map;
        }

        bindingOptions._currentView = currentView;

        return bindingOptions;
    }

    function renderControl( bindingOptions: BindingOptions ) : void {
        fireCustomTriggerEvent( bindingOptions.events.onBeforeRender, bindingOptions._currentView.element );

        if ( !Is.definedString( bindingOptions._currentView.element.id ) ) {
            bindingOptions._currentView.element.id = Data.String.newGuid();
        }

        if ( bindingOptions._currentView.element.className.trim() === Char.empty ) {
            bindingOptions._currentView.element.className = "heat-js";
        } else {
            DomElement.addClass( bindingOptions._currentView.element, "heat-js" );
        }

        bindingOptions._currentView.element.removeAttribute( HEAT_JS_ATTRIBUTE_NAME );

        createDateStorageForElement( bindingOptions._currentView.element.id, bindingOptions );
        renderControlContainer( bindingOptions );
        fireCustomTriggerEvent( bindingOptions.events.onRenderComplete, bindingOptions._currentView.element );
    }

    function renderControlContainer( bindingOptions: BindingOptions, isForDataRefresh: boolean = false, isForViewSwitch: boolean = false ) : void {
        if ( isForDataRefresh ) {
            storeDataInLocalStorage( bindingOptions );
        }

        if ( Is.defined( bindingOptions._currentView.mapContents ) ) {
            bindingOptions._currentView.mapContentsScrollLeft = bindingOptions._currentView.mapContents.scrollLeft;
        }

        if ( bindingOptions.views.chart.enabled && Is.defined( bindingOptions._currentView.chartContents ) ) {
            bindingOptions._currentView.chartContentsScrollLeft = bindingOptions._currentView.chartContents.scrollLeft;
        }

        if ( bindingOptions.views.days.enabled && Is.defined( bindingOptions._currentView.daysContents ) ) {
            bindingOptions._currentView.daysContentsScrollLeft = bindingOptions._currentView.daysContents.scrollLeft;
        }

        if ( bindingOptions.views.statistics.enabled && Is.defined( bindingOptions._currentView.statisticsContents ) ) {
            bindingOptions._currentView.statisticsContentsScrollLeft = bindingOptions._currentView.statisticsContents.scrollLeft;
        }
        
        bindingOptions._currentView.element.innerHTML = Char.empty;
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

        if ( bindingOptions._currentView.view === ViewId.map ) {
            bindingOptions._currentView.mapContents.style.display = "block";
        } else if ( bindingOptions.views.chart.enabled && bindingOptions._currentView.view === ViewId.chart ) {
            bindingOptions._currentView.chartContents.style.display = "block";
        } else if ( bindingOptions.views.days.enabled && bindingOptions._currentView.view === ViewId.days ) {
            bindingOptions._currentView.daysContents.style.display = "block";
        } else if ( bindingOptions.views.statistics.enabled && bindingOptions._currentView.view === ViewId.statistics ) {
            bindingOptions._currentView.statisticsContents.style.display = "block";
        } else {
            bindingOptions._currentView.view = ViewId.map;
            bindingOptions._currentView.mapContents.style.display = "block";
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Configuration Dialog
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderConfigurationDialog( bindingOptions: BindingOptions ) : void {
        bindingOptions._currentView.configurationDialog = DomElement.create( bindingOptions._currentView.disabledBackground, "div", "dialog configuration" );

        const titleBar: HTMLElement = DomElement.create( bindingOptions._currentView.configurationDialog, "div", "dialog-title-bar" );
        const contents: HTMLElement = DomElement.create( bindingOptions._currentView.configurationDialog, "div", "dialog-contents" );
        const closeButton: HTMLElement = DomElement.create( titleBar, "div", "dialog-close" );
        const daysContainer: HTMLElement = DomElement.create( contents, "div", "side-container panel" );
        const monthsContainer: HTMLElement = DomElement.create( contents, "div", "side-container panel" );

        DomElement.createWithHTML( titleBar, "span", "dialog-title-bar-text", _configuration.configurationTitleText );
        DomElement.createWithHTML( daysContainer, "div", "side-container-title-text", _configuration.visibleDaysText + Char.colon );
        DomElement.createWithHTML( monthsContainer, "div", "side-container-title-text", _configuration.visibleMonthsText + Char.colon );

        const months1Container: HTMLElement = DomElement.create( monthsContainer, "div", "side-container" );
        const months2Container: HTMLElement = DomElement.create( monthsContainer, "div", "side-container" );

        closeButton.onclick = function () {
            hideConfigurationDialog( bindingOptions );
        };

        for ( let dayIndex: number = 0; dayIndex < 7; dayIndex++ ) {
            bindingOptions._currentView.dayCheckBoxes[ dayIndex ] = DomElement.createCheckBox( daysContainer, _configuration.dayNames[ dayIndex ] ).input;
        }

        for ( let monthIndex1: number = 0; monthIndex1 < 7; monthIndex1++ ) {
            bindingOptions._currentView.monthCheckBoxes[ monthIndex1 ] = DomElement.createCheckBox( months1Container, _configuration.monthNames[ monthIndex1 ] ).input;
        }

        for ( let monthIndex2: number = 7; monthIndex2 < 12; monthIndex2++ ) {
            bindingOptions._currentView.monthCheckBoxes[ monthIndex2 ] = DomElement.createCheckBox( months2Container, _configuration.monthNames[ monthIndex2 ] ).input;
        }

        addToolTip( closeButton, bindingOptions, _configuration.closeToolTipText );
    }

    function showConfigurationDialog( bindingOptions: BindingOptions ) : void {
        showDisabledBackground( bindingOptions );

        if ( Is.defined( bindingOptions._currentView.configurationDialog ) && bindingOptions._currentView.configurationDialog.style.display !== "block" ) {
            bindingOptions._currentView.configurationDialog.style.display = "block";
        }

        let daysToShow: number[] = [];
        let monthsToShow: number[] = [];

        if ( bindingOptions._currentView.view === ViewId.map ) {
            daysToShow = bindingOptions.views.map.daysToShow;
            monthsToShow = bindingOptions.views.map.monthsToShow;
        } else if ( bindingOptions.views.chart.enabled && bindingOptions._currentView.view === ViewId.chart ) {
            daysToShow = bindingOptions.views.chart.daysToShow;
            monthsToShow = bindingOptions.views.chart.monthsToShow;
        } else if ( bindingOptions.views.days.enabled && bindingOptions._currentView.view === ViewId.days ) {
            daysToShow = bindingOptions.views.days.daysToShow;
            monthsToShow = bindingOptions.views.days.monthsToShow;
        } else if ( bindingOptions.views.statistics.enabled && bindingOptions._currentView.view === ViewId.statistics ) {
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

        if ( Is.defined( bindingOptions._currentView.configurationDialog ) && bindingOptions._currentView.configurationDialog.style.display !== "none" ) {
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
            if ( bindingOptions._currentView.view === ViewId.map ) {
                bindingOptions.views.map.daysToShow = daysChecked;
            } else if ( bindingOptions.views.chart.enabled && bindingOptions._currentView.view === ViewId.chart ) {
                bindingOptions.views.chart.daysToShow = daysChecked;
            } else if ( bindingOptions.views.days.enabled && bindingOptions._currentView.view === ViewId.days ) {
                bindingOptions.views.days.daysToShow = daysChecked;
            } else if ( bindingOptions.views.statistics.enabled && bindingOptions._currentView.view === ViewId.statistics ) {
                bindingOptions.views.statistics.daysToShow = daysChecked;
            } else {
                bindingOptions.views.map.daysToShow = daysChecked;
            }

            render = true;
        }

        if ( monthsChecked.length >= 1 ) {
            if ( bindingOptions._currentView.view === ViewId.map ) {
                bindingOptions.views.map.monthsToShow = monthsChecked;
            } else if ( bindingOptions.views.chart.enabled && bindingOptions._currentView.view === ViewId.chart ) {
                bindingOptions.views.chart.monthsToShow = monthsChecked;
            } else if ( bindingOptions.views.days.enabled && bindingOptions._currentView.view === ViewId.days ) {
                bindingOptions.views.days.monthsToShow = monthsChecked;
            } else if ( bindingOptions.views.statistics.enabled && bindingOptions._currentView.view === ViewId.statistics ) {
                bindingOptions.views.statistics.monthsToShow = monthsChecked;
            } else {
                bindingOptions.views.map.monthsToShow = monthsChecked;
            }

            render = true;
        }

        if ( render ) {
            renderControlContainer( bindingOptions );
            fireCustomTriggerEvent( bindingOptions.events.onOptionsUpdate, bindingOptions._currentView.element, bindingOptions );
            
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
        if ( !Is.defined( bindingOptions._currentView.tooltip ) ) {
            bindingOptions._currentView.tooltip = DomElement.create( document.body, "div", "heat-js-tooltip" );
            bindingOptions._currentView.tooltip.style.display = "none";
    
            assignToolTipEvents( bindingOptions );
        }
    }

    function assignToolTipEvents( bindingOptions: BindingOptions, add: boolean = true ) : void {
        let addEventListener_Window: Function = add ? window.addEventListener : window.removeEventListener;
        let addEventListener_Document: Function = add ? document.addEventListener : document.removeEventListener;

        addEventListener_Window( "mousemove", function() {
            hideToolTip( bindingOptions );
        } );

        addEventListener_Document( "scroll", function() {
            hideToolTip( bindingOptions );
        } );
    }

    function addToolTip( element: HTMLElement, bindingOptions: BindingOptions, text: string ) : void {
        if ( element !== null ) {
            element.onmousemove = function ( e ) {
                showToolTip( e, bindingOptions, text );
            };
        }
    }

    function showToolTip( e: any, bindingOptions: BindingOptions, text: string ) : void {
        DomElement.cancelBubble( e );
        hideToolTip( bindingOptions );

        bindingOptions._currentView.tooltipTimer = setTimeout( function() {
            bindingOptions._currentView.tooltip.innerHTML = text;
            bindingOptions._currentView.tooltip.style.display = "block";

            DomElement.showElementAtMousePosition( e, bindingOptions._currentView.tooltip );
        }, bindingOptions.tooltip.delay );
    }

    function hideToolTip( bindingOptions: BindingOptions ) : void {
        if ( Is.defined( bindingOptions._currentView.tooltip ) ) {
            if ( Is.defined( bindingOptions._currentView.tooltipTimer ) ) {
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
            const titleBar: HTMLElement = DomElement.create( bindingOptions._currentView.element, "div", "title-bar" );
            const title: HTMLElement = DomElement.create( titleBar, "div", "title" );

            if ( bindingOptions.views.chart.enabled || bindingOptions.views.days.enabled || bindingOptions.views.statistics.enabled ) {
                if ( bindingOptions.title.showTitleDropDownButton ) {
                    DomElement.create( title, "div", "down-arrow" );
                }
                
            } else {
                DomElement.addClass( title, "no-click" );
            }

            if ( bindingOptions.title.showText ) {
                title.innerHTML += bindingOptions.title.text;
            }

            if ( bindingOptions.views.chart.enabled || bindingOptions.views.days.enabled || bindingOptions.views.statistics.enabled ) {
                renderTitleDropDownMenu( bindingOptions, title );
            }

            if ( bindingOptions.title.showImportButton && !bindingOptions._currentView.isInFetchMode ) {
                const importData: HTMLElement = DomElement.createWithHTML( titleBar, "button", "import", _configuration.importButtonText );
        
                importData.onclick = function () {
                    importFromFilesSelected( bindingOptions );
                };
            }

            if ( bindingOptions.title.showExportButton ) {
                const exportData: HTMLElement = DomElement.createWithHTML( titleBar, "button", "export", _configuration.exportButtonText );
        
                exportData.onclick = function () {
                    exportAllData( bindingOptions );
                };
            }

            if ( bindingOptions.title.showRefreshButton ) {
                const refresh: HTMLElement = DomElement.createWithHTML( titleBar, "button", "refresh", _configuration.refreshButtonText );
        
                refresh.onclick = function () {
                    renderControlContainer( bindingOptions );
                    fireCustomTriggerEvent( bindingOptions.events.onRefresh, bindingOptions._currentView.element );
                };
            }
    
            if ( bindingOptions.title.showYearSelector ) {
                const back: any = DomElement.createWithHTML( titleBar, "button", "back", _configuration.backButtonText );
        
                back.onclick = function () {
                    moveToPreviousYear( bindingOptions );
                };

                if ( isFirstVisibleYear( bindingOptions, bindingOptions._currentView.year ) ) {
                    back.disabled = true;
                }

                bindingOptions._currentView.yearText = DomElement.createWithHTML( titleBar, "div", "year-text", bindingOptions._currentView.year.toString() );

                if ( bindingOptions.title.showYearSelectionDropDown ) {
                    renderYearDropDownMenu( bindingOptions );
                } else {
                    DomElement.addClass( bindingOptions._currentView.yearText, "no-click" );
                }

                if ( bindingOptions.title.showConfigurationButton ) {
                    let configureButton: HTMLElement = DomElement.create( titleBar, "div", "configure" );

                    addToolTip( configureButton, bindingOptions, _configuration.configurationToolTipText );

                    configureButton.onclick = function () {
                        showConfigurationDialog( bindingOptions );
                    };
                }

                const next: any = DomElement.createWithHTML( titleBar, "button", "next", _configuration.nextButtonText );

                next.onclick = function () {
                    moveToNextYear( bindingOptions );
                };

                if ( isLastVisibleYear( bindingOptions, bindingOptions._currentView.year ) ) {
                    next.disabled = true;
                }
            }
        }
    }

    function renderTitleDropDownMenu( bindingOptions: BindingOptions, title: HTMLElement ) : void {
        const titlesMenuContainer: HTMLElement = DomElement.create( title, "div", "titles-menu-container" );
        const titlesMenu: HTMLElement = DomElement.create( titlesMenuContainer, "div", "titles-menu" );
        
        if ( bindingOptions.title.showTitleDropDownHeaders ) {
            DomElement.createWithHTML( titlesMenu, "div", "title-menu-header", _configuration.dataText + Char.colon );
        }

        const menuItemMap: HTMLElement = DomElement.createWithHTML( titlesMenu, "div", "title-menu-item", _configuration.mapText );
            
        renderTitleDropDownMenuItemClickEvent( bindingOptions, menuItemMap, ViewId.map, ViewName.map );

        if ( bindingOptions.views.chart.enabled ) {
            const menuItemChart = DomElement.createWithHTML( titlesMenu, "div", "title-menu-item", _configuration.chartText );

            renderTitleDropDownMenuItemClickEvent( bindingOptions, menuItemChart, ViewId.chart, ViewName.chart );
        }

        if ( bindingOptions.views.days.enabled ) {
            if ( bindingOptions.title.showTitleDropDownHeaders ) {
                DomElement.createWithHTML( titlesMenu, "div", "title-menu-header", _configuration.yearText + Char.colon );
            }

            const menuItemDays: HTMLElement = DomElement.createWithHTML( titlesMenu, "div", "title-menu-item", _configuration.daysText );

            renderTitleDropDownMenuItemClickEvent( bindingOptions, menuItemDays, ViewId.days, ViewName.days );
        }

        if ( bindingOptions.views.statistics.enabled ) {
            if ( bindingOptions.title.showTitleDropDownHeaders ) {
                DomElement.createWithHTML( titlesMenu, "div", "title-menu-header", _configuration.statisticsText + Char.colon );
            }

            const menuItemStatistics: HTMLElement = DomElement.createWithHTML( titlesMenu, "div", "title-menu-item", _configuration.colorRangesText );

            renderTitleDropDownMenuItemClickEvent( bindingOptions, menuItemStatistics, ViewId.statistics, ViewName.statistics );
        }
    }

    function renderTitleDropDownMenuItemClickEvent( bindingOptions: BindingOptions, option: HTMLElement, view: number, viewName: string ) : void {
        if ( bindingOptions._currentView.view === view ) {
            DomElement.addClass( option, "title-menu-item-active" );
            
        } else {
            option.onclick = function () {
                bindingOptions._currentView.view = view;

                fireCustomTriggerEvent( bindingOptions.events.onViewSwitch, viewName );
                renderControlContainer( bindingOptions, false, true );
            };
        }
    }

    function renderYearDropDownMenu( bindingOptions: BindingOptions ) : void {
        DomElement.create( bindingOptions._currentView.yearText, "div", "down-arrow" );

        const yearsMenuContainer: HTMLElement = DomElement.create( bindingOptions._currentView.yearText, "div", "years-menu-container" );
        const yearsMenu: HTMLElement = DomElement.create( yearsMenuContainer, "div", "years-menu" );
        const thisYear: number = new Date().getFullYear();
        let activeYearMenuItem: HTMLElement = null;

        yearsMenuContainer.style.display = "block";
        yearsMenuContainer.style.visibility = "hidden";

        for ( let currentYear: number = thisYear - bindingOptions.title.extraSelectionYears; currentYear < thisYear + bindingOptions.title.extraSelectionYears; currentYear++ ) {
            if ( isYearVisible( bindingOptions, currentYear ) ) {
                let yearMenuItem: HTMLElement = renderYearDropDownMenuItem( bindingOptions, yearsMenu, currentYear, thisYear );

                if ( !Is.defined( activeYearMenuItem ) ) {
                    activeYearMenuItem = yearMenuItem;
                }
            }
        }

        if ( Is.defined( activeYearMenuItem ) ) {
            yearsMenu.scrollTop = activeYearMenuItem.offsetTop - ( yearsMenu.offsetHeight / 2 );
        }

        yearsMenuContainer.style.display = "none";
        yearsMenuContainer.style.visibility = "visible";
    }

    function renderYearDropDownMenuItem( bindingOptions: BindingOptions, years: HTMLElement, currentYear: number, actualYear: number ) : HTMLElement {
        let result: HTMLElement = null;
        const year: HTMLElement = DomElement.createWithHTML( years, "div", "year-menu-item", currentYear.toString() );

        if ( bindingOptions._currentView.year !== currentYear ) {
            year.onclick = function () {
                bindingOptions._currentView.year = currentYear;
    
                renderControlContainer( bindingOptions );
                fireCustomTriggerEvent( bindingOptions.events.onSetYear, bindingOptions._currentView.year );
            };

            if ( currentYear === actualYear ) {
                DomElement.addClass( year, "year-menu-item-current" );
            }

        } else {
            DomElement.addClass( year, "year-menu-item-active" );
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
        bindingOptions._currentView.mapContents = DomElement.create( bindingOptions._currentView.element, "div", "map-contents" );

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
            const noDataMessage: HTMLElement = DomElement.createWithHTML( bindingOptions._currentView.mapContents, "div", "no-data-message", _configuration.noMapDataMessage );

            if ( isForViewSwitch ) {
                DomElement.addClass( noDataMessage, "view-switch" );
            }

        } else {
            bindingOptions._currentView.mapContents.style.minHeight = "unset";

            makeAreaDroppable( bindingOptions._currentView.mapContents, bindingOptions );

            const map: HTMLElement = DomElement.create( bindingOptions._currentView.mapContents, "div", "map" );
            const currentYear: number = bindingOptions._currentView.year;
            let monthAdded: boolean = false;
    
            if ( isForViewSwitch ) {
                DomElement.addClass( map, "view-switch" );
            }
    
            if ( bindingOptions.views.map.showDayNames ) {
                const days: HTMLElement = DomElement.create( map, "div", "days" );
                const showMinimalDays: boolean = bindingOptions.views.map.showMinimalDayNames && bindingOptions.views.map.daysToShow.length === 7;
    
                if ( !bindingOptions.views.map.showMonthNames || bindingOptions.views.map.placeMonthNamesOnTheBottom ) {
                    days.className = "days-months-bottom";
                }
        
                for ( let dayNameIndex: number = 0; dayNameIndex < 7; dayNameIndex++ ) {
                    if ( isDayVisible( bindingOptions.views.map.daysToShow, dayNameIndex + 1 ) ) {
                        const dayText: string = !showMinimalDays || dayNameIndex % 3 === 0 ? _configuration.dayNames[ dayNameIndex ] : Char.space;

                        DomElement.createWithHTML( days, "div", "day-name", dayText );
                    }
                }
    
                if ( bindingOptions.views.map.showDaysInReverseOrder ) {
                    DomElement.reverseChildrenOrder( days );
                }
            }
    
            const months: HTMLElement = DomElement.create( map, "div", "months" );
            const colorRanges: ColorRange[] = getSortedColorRanges( bindingOptions );
    
            for ( let monthIndex: number = 0; monthIndex < 12; monthIndex++ ) {
                if ( isMonthVisible( bindingOptions.views.map.monthsToShow, monthIndex ) ) {
                    const month: HTMLElement = DomElement.create( months, "div", "month" );
                    const dayColumns: HTMLElement = DomElement.create( month, "div", "day-columns" );
                    let totalDaysInMonth: number = DateTime.getTotalDaysInMonth( currentYear, monthIndex );
                    let currentDayColumn: HTMLElement = DomElement.create( dayColumns, "div", "day-column" );
                    let startFillingDays: boolean = false;
                    const firstDayInMonth: Date = new Date( currentYear, monthIndex, 1 );
                    const firstDayNumberInMonth: number = DateTime.getWeekdayNumber( firstDayInMonth );
                    let actualDay: number = 1;
        
                    totalDaysInMonth += firstDayNumberInMonth;
        
                    for ( let dayIndex: number = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
                        if ( dayIndex >= firstDayNumberInMonth ) {
                            startFillingDays = true;
        
                        } else {
                            if ( isDayVisible( bindingOptions.views.map.daysToShow, actualDay ) ) {
                                DomElement.create( currentDayColumn, "div", "day-disabled" );
                            }
                        }
        
                        if ( startFillingDays ) {
                            let day: HTMLElement = null;
    
                            if ( isDayVisible( bindingOptions.views.map.daysToShow, actualDay ) ) {
                                day = renderControlMapMonthDay( bindingOptions, currentDayColumn, dayIndex - firstDayNumberInMonth, monthIndex, currentYear, colorRanges );
                            }
            
                            if ( ( dayIndex + 1 ) % 7 === 0 ) {
                                if ( bindingOptions.views.map.showDaysInReverseOrder ) {
                                    DomElement.reverseChildrenOrder( currentDayColumn );
                                }
    
                                currentDayColumn = DomElement.create( dayColumns, "div", "day-column" );
                                actualDay = 0;
    
                                if ( !Is.defined( _elements_Day_Width ) && Is.defined( day ) ) {
                                    let marginLeft: number = DomElement.getStyleValueByName( day, "margin-left", true );
                                    let marginRight: number = DomElement.getStyleValueByName( day, "margin-right", true );
                                    
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
                            monthName = DomElement.createWithHTML( month, "div", "month-name", _configuration.monthNames[ monthIndex ], dayColumns );
                        } else {
                            monthName = DomElement.createWithHTML( month, "div", "month-name-bottom", _configuration.monthNames[ monthIndex ] );
                        }
    
                        if ( Is.defined( monthName ) ) {
                            if ( bindingOptions.views.map.showMonthDayGaps ) {
                                monthName.style.width = monthWidth + "px";
                            } else {
                                monthName.style.width = ( monthWidth - _elements_Day_Width ) + "px";
                            }
                        }
                    }
    
                    if ( monthAdded && Is.defined( _elements_Day_Width ) ) {
                        if ( firstDayNumberInMonth > 0 && !bindingOptions.views.map.showMonthDayGaps ) {
                            month.style.marginLeft = -_elements_Day_Width + "px";
                        } else if ( firstDayNumberInMonth === 0 && bindingOptions.views.map.showMonthDayGaps ) {
                            month.style.marginLeft = _elements_Day_Width + "px";
                        }
                    }

                    if ( bindingOptions.views.map.showMonthsInReverseOrder ) {
                        DomElement.reverseChildrenOrder( dayColumns );
                    }
    
                    monthAdded = true;
                }
            }

            if ( bindingOptions.views.map.showMonthsInReverseOrder ) {
                DomElement.reverseChildrenOrder( months );
            }
            
            if ( bindingOptions.views.map.keepScrollPositions ) {
                bindingOptions._currentView.mapContents.scrollLeft = bindingOptions._currentView.mapContentsScrollLeft;
            }
        }
    }

    function renderControlMapMonthDay( bindingOptions: BindingOptions, currentDayColumn: HTMLElement, dayNumber: number, month: number, year: number, colorRanges: ColorRange[] ) : HTMLElement {
        const actualDay: number = dayNumber + 1;
        const day: HTMLElement = DomElement.create( currentDayColumn, "div", "day" );
        const date: Date = new Date( year, month, actualDay );
        let dateCount: number = _elements_DateCounts[ bindingOptions._currentView.element.id ].typeData[ bindingOptions._currentView.type ][ toStorageDate( date ) ];

        dateCount = Data.getDefaultNumber( dateCount, 0 );

        renderDayToolTip( bindingOptions, day, date, dateCount );

        if ( bindingOptions.views.map.showDayNumbers && dateCount > 0 ) {
            day.innerHTML = dateCount.toString();
        }

        if ( Is.definedFunction( bindingOptions.events.onDayClick ) ) {
            day.onclick = function () {
                fireCustomTriggerEvent( bindingOptions.events.onDayClick, date, dateCount );
            };

        } else {
            DomElement.addClass( day, "no-hover" );
        }

        const useColorRange: ColorRange = getColorRange( bindingOptions, colorRanges, dateCount, date );

        if ( Is.defined( useColorRange ) && isColorRangeVisible( bindingOptions, useColorRange.id ) ) {
            if ( Is.definedString( useColorRange.mapCssClassName ) ) {
                DomElement.addClass( day, useColorRange.mapCssClassName );
            } else {
                DomElement.addClass( day, useColorRange.cssClassName );
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
        bindingOptions._currentView.chartContents = DomElement.create( bindingOptions._currentView.element, "div", "chart-contents" );

        makeAreaDroppable( bindingOptions._currentView.chartContents, bindingOptions );
    }

    function renderControlChart( bindingOptions: BindingOptions, isForViewSwitch: boolean) : void {
        const chart: HTMLElement = DomElement.create( bindingOptions._currentView.chartContents, "div", "chart" );
        let labels: HTMLElement = DomElement.create( chart, "div", "y-labels" );
        const dayLines: HTMLElement = DomElement.create( chart, "div", "day-lines" );
        const colorRanges: ColorRange[] = getSortedColorRanges( bindingOptions );
        const largestValueForCurrentYear: number = getLargestValueForChartYear( bindingOptions );
        const currentYear: number = bindingOptions._currentView.year;
        let labelsWidth: number = 0;

        if ( isForViewSwitch ) {
            DomElement.addClass( chart, "view-switch" );
        }

        if ( largestValueForCurrentYear > 0 && bindingOptions.views.chart.showChartYLabels ) {
            const topLabel: HTMLElement = DomElement.createWithHTML( labels, "div", "label-0", largestValueForCurrentYear.toString() );

            DomElement.createWithHTML( labels, "div", "label-25", ( Math.floor( largestValueForCurrentYear / 4 ) * 3 ).toString() );
            DomElement.createWithHTML( labels, "div", "label-50", Math.floor( largestValueForCurrentYear / 2 ).toString() );
            DomElement.createWithHTML( labels, "div", "label-75", Math.floor( largestValueForCurrentYear / 4 ).toString() );
            DomElement.createWithHTML( labels, "div", "label-100", Char.zero );

            labels.style.width = topLabel.offsetWidth + "px";
            labelsWidth = labels.offsetWidth + DomElement.getStyleValueByName( labels, "margin-right", true );

        } else {
            labels.parentNode.removeChild( labels );
            labels = null;
        }

        if ( largestValueForCurrentYear === 0 ) {
            bindingOptions._currentView.chartContents.style.minHeight = bindingOptions._currentView.mapContents.offsetHeight + "px";
            chart.parentNode.removeChild( chart );

            const noDataMessage: HTMLElement = DomElement.createWithHTML( bindingOptions._currentView.chartContents, "div", "no-data-message", _configuration.noChartDataMessage );

            if ( isForViewSwitch ) {
                DomElement.addClass( noDataMessage, "view-switch" );
            }

        } else {
            const pixelsPerNumbers: number = bindingOptions._currentView.mapContents.offsetHeight / largestValueForCurrentYear;
            let totalMonths: number = 0;
            let totalDays: number = 0;

            for ( let monthIndex1: number = 0; monthIndex1 < 12; monthIndex1++ ) {
                if ( isMonthVisible( bindingOptions.views.chart.monthsToShow, monthIndex1 ) ) {
                    const totalDaysInMonth: number = DateTime.getTotalDaysInMonth( currentYear, monthIndex1 );
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
                DomElement.reverseChildrenOrder( dayLines );
            }

            if ( bindingOptions.views.chart.showMonthNames ) {
                const chartMonths: HTMLElement = DomElement.create( bindingOptions._currentView.chartContents, "div", "chart-months" );
                const linesWidth: number = dayLines.offsetWidth / totalMonths;
                let monthTimesValue: number = 0;

                const addMonthName: Function = function ( addMonthNameIndex: number ) {
                    if ( isMonthVisible( bindingOptions.views.chart.monthsToShow, addMonthNameIndex ) ) {
                        let monthName: HTMLElement = DomElement.createWithHTML( chartMonths, "div", "month-name", _configuration.monthNames[ addMonthNameIndex ] );
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

                const monthNameSpace: HTMLElement = DomElement.create( chartMonths, "div", "month-name-space" );
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
        const dayLine: HTMLElement = DomElement.create( dayLines, "div", "day-line" );
        let dateCount: number = getCurrentViewData( bindingOptions )[ toStorageDate( date ) ];

        dateCount = Data.getDefaultNumber( dateCount, 0 );

        renderDayToolTip( bindingOptions, dayLine, date, dateCount );

        if ( bindingOptions.views.chart.showLineNumbers && dateCount > 0 ) {
            DomElement.addClass( dayLine, "day-line-number" );

            dayLine.innerHTML = dateCount.toString();
        }

        const dayLineHeight: number = dateCount * pixelsPerNumbers;
        dayLine.style.height = dayLineHeight + "px";

        if ( dayLineHeight <= 0 ) {
            dayLine.style.visibility = "hidden";
        }

        if ( Is.definedFunction( bindingOptions.events.onDayClick ) ) {
            dayLine.onclick = function () {
                fireCustomTriggerEvent( bindingOptions.events.onDayClick, date, dateCount );
            };

        } else {
            DomElement.addClass( dayLine, "no-hover" );
        }

        const useColorRange: ColorRange = getColorRange( bindingOptions, colorRanges, dateCount, date );

        if ( Is.defined( useColorRange ) && isColorRangeVisible( bindingOptions, useColorRange.id ) ) {
            if ( Is.definedString( useColorRange.chartCssClassName ) ) {
                DomElement.addClass( dayLine, useColorRange.chartCssClassName );
            } else {
                DomElement.addClass( dayLine, useColorRange.cssClassName );
            }
        }
    }

    function getLargestValueForChartYear( bindingOptions: BindingOptions ) : number {
        let result: number = 0;
        const data: any = getCurrentViewData( bindingOptions );

        for ( let monthIndex: number = 0; monthIndex < 12; monthIndex++ ) {
            const totalDaysInMonth: number = DateTime.getTotalDaysInMonth( bindingOptions._currentView.year, monthIndex );
    
            for ( let dayIndex: number = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
                const storageDate: string = toStorageDate( new Date( bindingOptions._currentView.year, monthIndex, dayIndex + 1 ) );

                if ( data.hasOwnProperty( storageDate ) ) {
                    if ( isMonthVisible( bindingOptions.views.chart.monthsToShow, monthIndex ) && isDayVisible( bindingOptions.views.chart.daysToShow, dayIndex + 1 ) ) {
                        result = Math.max( result, parseInt( data[ storageDate ] ) );
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
        bindingOptions._currentView.daysContents = DomElement.create( bindingOptions._currentView.element, "div", "days-contents" );

        makeAreaDroppable( bindingOptions._currentView.daysContents, bindingOptions );
    }

    function renderControlDays( bindingOptions: BindingOptions, isForViewSwitch: boolean ) : void {
        const days: HTMLElement = DomElement.create( bindingOptions._currentView.daysContents, "div", "days" );
        const dayNames: HTMLElement = DomElement.create( bindingOptions._currentView.daysContents, "div", "day-names" );
        let labels: HTMLElement = DomElement.create( days, "div", "y-labels" );
        const dayLines: HTMLElement = DomElement.create( days, "div", "day-lines" );
        const dayValuesForCurrentYear: any = getLargestValuesForEachDay( bindingOptions );

        if ( isForViewSwitch ) {
            DomElement.addClass( days, "view-switch" );
        }

        if ( dayValuesForCurrentYear.largestValue > 0 && bindingOptions.views.days.showChartYLabels ) {
            const topLabel: HTMLElement = DomElement.createWithHTML( labels, "div", "label-0", dayValuesForCurrentYear.largestValue.toString() );

            DomElement.createWithHTML( labels, "div", "label-25", ( Math.floor( dayValuesForCurrentYear.largestValue / 4 ) * 3 ).toString() );
            DomElement.createWithHTML( labels, "div", "label-50", Math.floor( dayValuesForCurrentYear.largestValue / 2 ).toString() );
            DomElement.createWithHTML( labels, "div", "label-75", Math.floor( dayValuesForCurrentYear.largestValue / 4 ).toString() );
            DomElement.createWithHTML( labels, "div", "label-100", Char.zero );

            labels.style.width = topLabel.offsetWidth + "px";
            dayNames.style.paddingLeft = labels.offsetWidth + DomElement.getStyleValueByName( labels, "margin-right", true ) + "px";

        } else {
            labels.parentNode.removeChild( labels );
            labels = null;
        }

        if ( dayValuesForCurrentYear.largestValue === 0 ) {
            bindingOptions._currentView.daysContents.style.minHeight = bindingOptions._currentView.mapContents.offsetHeight + "px";
            days.parentNode.removeChild( days );
            dayNames.parentNode.removeChild( dayNames );

            const noDataMessage: HTMLElement = DomElement.createWithHTML( bindingOptions._currentView.daysContents, "div", "no-days-message", _configuration.noDaysDataMessage );

            if ( isForViewSwitch ) {
                DomElement.addClass( noDataMessage, "view-switch" );
            }

        } else {
            const pixelsPerNumbers: number = bindingOptions._currentView.mapContents.offsetHeight / dayValuesForCurrentYear.largestValue;

            for ( let day in dayValuesForCurrentYear.days ) {
                if ( dayValuesForCurrentYear.days.hasOwnProperty( day ) && isDayVisible( bindingOptions.views.days.daysToShow, parseInt( day ) ) ) {
                    renderControlDaysDayLine( dayLines, parseInt( day ), dayValuesForCurrentYear.days[ day ], bindingOptions, pixelsPerNumbers );

                    if ( bindingOptions.views.days.showDayNames ) {
                        DomElement.createWithHTML( dayNames, "div", "day-name", _configuration.dayNames[ parseInt( day ) - 1 ] );
                    }
                }
            }

            if ( bindingOptions.views.days.showInReverseOrder ) {
                DomElement.reverseChildrenOrder( dayLines );
                DomElement.reverseChildrenOrder( dayNames );
            }

            if ( bindingOptions.views.days.keepScrollPositions ) {
                bindingOptions._currentView.daysContents.scrollLeft = bindingOptions._currentView.daysContentsScrollLeft;
            }
        }
    }

    function renderControlDaysDayLine( dayLines: HTMLElement, dayNumber: number, dayCount: number, bindingOptions: BindingOptions, pixelsPerNumbers: number ) : void {
        const dayLine: HTMLElement = DomElement.create( dayLines, "div", "day-line" );
        const dayLineHeight: number = dayCount * pixelsPerNumbers;

        dayLine.style.height = dayLineHeight + "px";

        if ( dayLineHeight <= 0 ) {
            dayLine.style.visibility = "hidden";
        }
        
        addToolTip( dayLine, bindingOptions, dayCount.toString() );

        if ( Is.definedFunction( bindingOptions.events.onWeekDayClick ) ) {
            dayLine.onclick = function () {
                fireCustomTriggerEvent( bindingOptions.events.onWeekDayClick, dayNumber, dayCount );
            };

        } else {
            DomElement.addClass( dayLine, "no-hover" );
        }

        if ( bindingOptions.views.days.showDayNumbers && dayCount > 0 ) {
            DomElement.addClass( dayLine, "day-line-number" );

            DomElement.createWithHTML( dayLine, "div", "count", dayCount.toString() );
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
            const totalDaysInMonth: number = DateTime.getTotalDaysInMonth( bindingOptions._currentView.year, monthIndex );
    
            for ( let dayIndex: number = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
                const storageDate: string = toStorageDate( new Date( bindingOptions._currentView.year, monthIndex, dayIndex + 1 ) );

                if ( data.hasOwnProperty( storageDate ) ) {
                    const storageDateParts: string[] = getStorageDate( storageDate );
                    const storageDateObject: Date = new Date( parseInt( storageDateParts[ 2 ] ), parseInt( storageDateParts[ 1 ] ), parseInt( storageDateParts[ 0 ] ) );
                    const weekDayNumber: number = DateTime.getWeekdayNumber( storageDateObject ) + 1;

                    if ( !isHoliday( bindingOptions, storageDateObject ).matched && isMonthVisible( bindingOptions.views.days.monthsToShow, storageDateObject.getMonth() ) && isDayVisible( bindingOptions.views.days.daysToShow, weekDayNumber ) ) {
                        days[ weekDayNumber ] += data[ storageDate ];

                        largestValue = Math.max( largestValue, days[ weekDayNumber ] );
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
        bindingOptions._currentView.statisticsContents = DomElement.create( bindingOptions._currentView.element, "div", "statistics-contents" );

        makeAreaDroppable( bindingOptions._currentView.statisticsContents, bindingOptions );
    }

    function renderControlStatistics( bindingOptions: BindingOptions, isForViewSwitch: boolean ) : void {
        const statistics: HTMLElement = DomElement.create( bindingOptions._currentView.statisticsContents, "div", "statistics" );
        const statisticsRanges: HTMLElement = DomElement.create( bindingOptions._currentView.statisticsContents, "div", "statistics-ranges" );
        let labels: HTMLElement = DomElement.create( statistics, "div", "y-labels" );
        const rangeLines: HTMLElement = DomElement.create( statistics, "div", "range-lines" );
        const colorRanges: ColorRange[] = getSortedColorRanges( bindingOptions );
        const colorRangeValuesForCurrentYear = getLargestValuesForEachRangeType( bindingOptions, colorRanges );

        if ( isForViewSwitch ) {
            DomElement.addClass( statistics, "view-switch" );
        }

        if ( colorRangeValuesForCurrentYear.largestValue > 0 && bindingOptions.views.statistics.showChartYLabels ) {
            const topLabel: HTMLElement = DomElement.createWithHTML( labels, "div", "label-0", colorRangeValuesForCurrentYear.largestValue.toString() );

            DomElement.createWithHTML( labels, "div", "label-25", ( Math.floor( colorRangeValuesForCurrentYear.largestValue / 4 ) * 3 ).toString() );
            DomElement.createWithHTML( labels, "div", "label-50", Math.floor( colorRangeValuesForCurrentYear.largestValue / 2 ).toString() );
            DomElement.createWithHTML( labels, "div", "label-75", Math.floor( colorRangeValuesForCurrentYear.largestValue / 4 ).toString() );
            DomElement.createWithHTML( labels, "div", "label-100", Char.zero );

            labels.style.width = topLabel.offsetWidth + "px";
            statisticsRanges.style.paddingLeft = labels.offsetWidth + DomElement.getStyleValueByName( labels, "margin-right", true ) + "px";

        } else {
            labels.parentNode.removeChild( labels );
            labels = null;
        }

        if ( colorRangeValuesForCurrentYear.largestValue === 0 ) {
            bindingOptions._currentView.statisticsContents.style.minHeight = bindingOptions._currentView.mapContents.offsetHeight + "px";
            statistics.parentNode.removeChild( statistics );
            statisticsRanges.parentNode.removeChild( statisticsRanges );

            const noDataMessage: HTMLElement = DomElement.createWithHTML( bindingOptions._currentView.statisticsContents, "div", "no-statistics-message", _configuration.noStatisticsDataMessage );

            if ( isForViewSwitch ) {
                DomElement.addClass( noDataMessage, "view-switch" );
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
                        if ( !bindingOptions.views.statistics.useColorRangeNamesForLabels || !Is.defined( useColorRange ) || !Is.definedString( useColorRange.name ) ) {
                            DomElement.createWithHTML( statisticsRanges, "div", "range-name", type + Char.plus );
                        } else {
                            DomElement.createWithHTML( statisticsRanges, "div", "range-name", useColorRange.name );
                        }
                    }
                }
            }

            if ( bindingOptions.views.statistics.showInReverseOrder ) {
                DomElement.reverseChildrenOrder( rangeLines );
                DomElement.reverseChildrenOrder( statisticsRanges );
            }
    
            if ( bindingOptions.views.statistics.keepScrollPositions ) {
                bindingOptions._currentView.statisticsContents.scrollLeft = bindingOptions._currentView.statisticsContentsScrollLeft;
            }
        }
    }

    function renderControlStatisticsRangeLine( colorRangeMinimum: number, dayLines: HTMLElement, rangeCount: number, bindingOptions: BindingOptions, colorRanges: ColorRange[], pixelsPerNumbers: number ) : void {
        const rangeLine: HTMLElement = DomElement.create( dayLines, "div", "range-line" );
        const useColorRange: ColorRange = getColorRangeByMinimum( colorRanges, colorRangeMinimum );
        const rangeLineHeight: number = rangeCount * pixelsPerNumbers;

        rangeLine.style.height = rangeLineHeight + "px";

        if ( rangeLineHeight <= 0 ) {
            rangeLine.style.visibility = "hidden";
        }
        
        addToolTip( rangeLine, bindingOptions, rangeCount.toString() );

        if ( bindingOptions.views.statistics.showRangeNumbers && rangeCount > 0 ) {
            DomElement.addClass( rangeLine, "range-line-number" );

            DomElement.createWithHTML( rangeLine, "div", "count", rangeCount.toString() );
        }

        if ( Is.definedFunction( bindingOptions.events.onStatisticClick ) ) {
            rangeLine.onclick = function () {
                fireCustomTriggerEvent( bindingOptions.events.onStatisticClick, useColorRange );
            };

        } else {
            DomElement.addClass( rangeLine, "no-hover" );
        }

        if ( Is.defined( useColorRange ) && isColorRangeVisible( bindingOptions, useColorRange.id ) ) {
            if ( Is.definedString( useColorRange.statisticsCssClassName ) ) {
                DomElement.addClass( rangeLine, useColorRange.statisticsCssClassName );
            } else {
                DomElement.addClass( rangeLine, useColorRange.cssClassName );
            }
        }
    }

    function getLargestValuesForEachRangeType( bindingOptions: BindingOptions, colorRanges: ColorRange[] ) : any {
        const types: object = {};
        const data: any = getCurrentViewData( bindingOptions );
        let largestValue: number = 0;

        types[ Char.zero ] = 0;

        for ( let monthIndex: number = 0; monthIndex < 12; monthIndex++ ) {
            const totalDaysInMonth: number = DateTime.getTotalDaysInMonth( bindingOptions._currentView.year, monthIndex );
    
            for ( let dayIndex: number = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
                const storageDate: string = toStorageDate( new Date( bindingOptions._currentView.year, monthIndex, dayIndex + 1 ) );

                if ( data.hasOwnProperty( storageDate ) ) {
                    const storageDateParts: string[] = getStorageDate( storageDate );
                    const storageDateObject: Date = new Date( parseInt( storageDateParts[ 2 ] ), parseInt( storageDateParts[ 1 ] ), parseInt( storageDateParts[ 0 ] ) );
                    const weekDayNumber: number = DateTime.getWeekdayNumber( storageDateObject ) + 1;

                    if ( !isHoliday( bindingOptions, storageDateObject ).matched && isMonthVisible( bindingOptions.views.statistics.monthsToShow, storageDateObject.getMonth() ) && isDayVisible( bindingOptions.views.statistics.daysToShow, weekDayNumber ) ) {
                        const useColorRange: ColorRange = getColorRange( bindingOptions, colorRanges, data[ storageDate ] );

                        if ( !Is.defined( useColorRange ) ) {
                            types[ Char.zero ]++;
    
                        } else {
                            if ( !types.hasOwnProperty( useColorRange.minimum.toString() ) ) {
                                types[ useColorRange.minimum.toString() ] = 0;
                            }
    
                            types[ useColorRange.minimum ]++;
                            
                            largestValue = Math.max( largestValue, types[ useColorRange.minimum ] );
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
        const guide: HTMLElement = DomElement.create( bindingOptions._currentView.element, "div", "guide" )
        const mapTypes: HTMLElement = DomElement.create( guide, "div", "map-types" );
        let noneTypeCount: number = 0;

        for ( let storageDate in _elements_DateCounts[ bindingOptions._currentView.element.id ].typeData[ _configuration.unknownTrendText ] ) {
            if ( _elements_DateCounts[ bindingOptions._currentView.element.id ].typeData[ _configuration.unknownTrendText ].hasOwnProperty( storageDate ) ) {
                noneTypeCount++;
                break;
            }
        }

        if ( _elements_DateCounts[ bindingOptions._currentView.element.id ].types > 1 ) {
            if ( Is.definedString( bindingOptions.description.text ) ) {
                const description: HTMLElement = DomElement.create( bindingOptions._currentView.element, "div", "description", guide );
    
                renderDescription( bindingOptions, description );
            }

            for ( let type in _elements_DateCounts[ bindingOptions._currentView.element.id ].typeData ) {
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
            const mapToggles: HTMLElement = DomElement.create( guide, "div", "map-toggles" );

            if ( bindingOptions.guide.showLessAndMoreLabels ) {
                let lessText: HTMLElement = DomElement.createWithHTML( mapToggles, "div", "less-text", _configuration.lessText );
    
                if ( bindingOptions.guide.colorRangeTogglesEnabled ) {
                    lessText.onclick = function () {
                        updateColorRangeToggles( bindingOptions, false );
                    };
        
                } else {
                    DomElement.addClass( lessText, "no-click" );
                }
            }
    
            const days: HTMLElement = DomElement.create( mapToggles, "div", "days" );
            const colorRanges: ColorRange[] = getSortedColorRanges( bindingOptions );
            const colorRangesLength: number = colorRanges.length;
    
            for ( let colorRangesIndex: number = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++ ) {
                renderControlViewGuideDay( bindingOptions, days, colorRanges[ colorRangesIndex ] );
            }

            if ( bindingOptions.guide.showLessAndMoreLabels ) {
                const moreText: HTMLElement = DomElement.createWithHTML( mapToggles, "div", "more-text", _configuration.moreText );
    
                if ( bindingOptions.guide.colorRangeTogglesEnabled ) {
                    moreText.onclick = function () {
                        updateColorRangeToggles( bindingOptions, true );
                    };
        
                } else {
                    DomElement.addClass( moreText, "no-click" );
                }
            }
        }
    }

    function renderControlViewGuideTypeButton( bindingOptions: BindingOptions, mapTypes: HTMLElement, type: string ) : void {
        const typeButton: HTMLElement = DomElement.createWithHTML( mapTypes, "button", "type", type );

        if ( bindingOptions._currentView.type === type ) {
            DomElement.addClass( typeButton, "active" );
        }

        typeButton.onclick = function () {
            if ( bindingOptions._currentView.type !== type ) {
                bindingOptions._currentView.type = type;

                fireCustomTriggerEvent( bindingOptions.events.onTypeSwitch, type );
                renderControlContainer( bindingOptions );
            }
        };
    }

    function renderControlViewGuideDay( bindingOptions: BindingOptions, days: HTMLElement, colorRange: ColorRange ) : void {
        const day: HTMLElement = DomElement.create( days, "div" );
        day.className = "day";

        addToolTip( day, bindingOptions, colorRange.tooltipText );

        if ( isColorRangeVisible( bindingOptions, colorRange.id ) ) {
            if ( bindingOptions._currentView.view === ViewId.map && Is.definedString( colorRange.mapCssClassName ) ) {
                DomElement.addClass( day, colorRange.mapCssClassName );
            } else if ( bindingOptions.views.chart.enabled && bindingOptions._currentView.view === ViewId.chart && Is.definedString( colorRange.chartCssClassName ) ) {
                DomElement.addClass( day, colorRange.chartCssClassName );
            } else if ( bindingOptions.views.statistics.enabled && bindingOptions._currentView.view === ViewId.statistics && Is.definedString( colorRange.statisticsCssClassName ) ) {
                DomElement.addClass( day, colorRange.statisticsCssClassName );
            } else {
                DomElement.addClass( day, colorRange.cssClassName );
            }   
        }

        if ( bindingOptions.guide.showNumbersInGuide ) {
            DomElement.addClass( day, "day-number" );

            day.innerHTML = colorRange.minimum + Char.plus;
        }

        if ( bindingOptions.guide.colorRangeTogglesEnabled ) {
            day.onclick = function () {
                toggleColorRangeVisibleState( bindingOptions, colorRange.id );
            };

        } else {
            DomElement.addClass( day, "no-hover" );
        }
    }

    function renderDescription( bindingOptions: BindingOptions, container: HTMLElement ) : void {
        if ( Is.definedString( bindingOptions.description.text ) ) {
            if ( Is.definedString( bindingOptions.description.url ) ) {
                const link: any = DomElement.createWithHTML( container, "a", "label", bindingOptions.description.text );
                link.href = bindingOptions.description.url;
                link.target = bindingOptions.description.urlTarget;                

            } else {
                DomElement.createWithHTML( container, "span", "label", bindingOptions.description.text );
            }
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Shared
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderDayToolTip( bindingOptions: BindingOptions, day: HTMLElement, date: Date, dateCount: number ) : void {
        if ( Is.definedFunction( bindingOptions.events.onDayToolTipRender ) ) {
            addToolTip( day, bindingOptions, fireCustomTriggerEvent( bindingOptions.events.onDayToolTipRender, date, dateCount ) );
        } else {

            let tooltip: string = DateTime.getCustomFormattedDateText( _configuration, bindingOptions.tooltip.dayText, date );

            if ( bindingOptions.showHolidaysInDayToolTips ) {
                let holiday: any = isHoliday( bindingOptions, date );

                if ( holiday.matched && Is.definedString( holiday.name ) ) {
                    tooltip += Char.colon + Char.space + holiday.name;
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

    function createDateStorageForElement( elementId: string, bindingOptions: BindingOptions, storeLocalData: boolean = true ) : void {
        _elements_DateCounts[ elementId ] = {
            options: bindingOptions,
            typeData: {},
            types: 1
        };

        _elements_DateCounts[ elementId ].typeData[ _configuration.unknownTrendText ] = {} as Record<string, number>;

        if ( storeLocalData && !bindingOptions._currentView.isInFetchMode ) {
            loadDataFromLocalStorage( bindingOptions );
        }
    }

    function getCurrentViewData( bindingOptions: BindingOptions ) : any {
        return _elements_DateCounts[ bindingOptions._currentView.element.id ].typeData[ bindingOptions._currentView.type ];
    }

    function isMonthVisible( monthsToShow: number[], month: number ) : boolean {
        return monthsToShow.indexOf( month + 1 ) > Value.notFound;
    }

    function isDayVisible( daysToShow: number[], day: number ) : boolean {
        return daysToShow.indexOf( day ) > Value.notFound;
    }

    function getYearsAvailableInData( bindingOptions: BindingOptions ) : number[] {
        let years: number[] = [];

        if ( bindingOptions.showOnlyDataForYearsAvailable ) {
            let data: any = getCurrentViewData( bindingOptions );

            for ( let storageDate in data ) {
                if ( data.hasOwnProperty( storageDate ) ) {
                    let year: number = parseInt( getStorageDateYear( storageDate ) );
                    
                    if ( years.indexOf( year ) === Value.notFound ) {
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
        return bindingOptions.yearsToHide.indexOf( year ) === Value.notFound && ( bindingOptions._currentView.yearsAvailable.length === 0 || bindingOptions._currentView.yearsAvailable.indexOf( year ) > Value.notFound );
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
        if ( bindingOptions.useLocalStorageForData && window.localStorage ) {
            const keysLength: number = window.localStorage.length;
            const elementId: string = bindingOptions._currentView.element.id;

            for ( let keyIndex: number = 0; keyIndex < keysLength; keyIndex++ ) {
                const key : string = window.localStorage.key( keyIndex );

                if ( Data.String.startsWithAnyCase( key, _local_Storage_Start_ID ) ) {
                    const typesJson: string = window.localStorage.getItem( key );
                    const typesObject: any = getObjectFromString( typesJson );

                    if ( typesObject.parsed ) {
                        _elements_DateCounts[ elementId ].typeData = typesObject.result;
                        _elements_DateCounts[ elementId ].types = 0;

                        for ( let type in _elements_DateCounts[ elementId ].typeData ) {
                            if ( _elements_DateCounts[ elementId ].typeData.hasOwnProperty( type ) ) {
                                _elements_DateCounts[ elementId ].types++;
                            }
                        }
                    }
                }
            }
        }
    }

    function storeDataInLocalStorage( bindingOptions: BindingOptions ) : void {
        if ( bindingOptions.useLocalStorageForData && window.localStorage ) {
            const elementId: string = bindingOptions._currentView.element.id;

            clearLocalStorageObjects( bindingOptions );

            const jsonData: string = JSON.stringify( _elements_DateCounts[ elementId ].typeData );

            window.localStorage.setItem( _local_Storage_Start_ID + elementId, jsonData );
        }
    }

    function clearLocalStorageObjects( bindingOptions: BindingOptions ) : void {
        if ( bindingOptions.useLocalStorageForData && window.localStorage ) {
            const keysLength: number = window.localStorage.length;
            const keysToRemove: string[] = [];
            const elementId: string = bindingOptions._currentView.element.id;

            for ( let keyIndex: number = 0; keyIndex < keysLength; keyIndex++ ) {
                if ( Data.String.startsWithAnyCase( window.localStorage.key( keyIndex ), _local_Storage_Start_ID + elementId ) ) {
                    keysToRemove.push( window.localStorage.key( keyIndex ) );
                }
            }

            const keysToRemoveLength: number = keysToRemove.length;

            for ( let keyToRemoveIndex: number = 0; keyToRemoveIndex < keysToRemoveLength; keyToRemoveIndex++ ) {
                window.localStorage.removeItem( keysToRemove[ keyToRemoveIndex ] );
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
            if ( !Is.defined( bindingOptions._currentView.isInFetchModeTimer ) ) {
                pullDataFromCustomTrigger( bindingOptions );
            }

            if ( !Is.defined( bindingOptions._currentView.isInFetchModeTimer ) ) {
                bindingOptions._currentView.isInFetchModeTimer = setInterval( function() {
                    pullDataFromCustomTrigger( bindingOptions );
                    renderControlContainer( bindingOptions );
                }, bindingOptions.dataFetchDelay );
            }
        }
    }

    function pullDataFromCustomTrigger( bindingOptions: BindingOptions ) : void {
        const elementId: string = bindingOptions._currentView.element.id;
        const data: any = fireCustomTriggerEvent( bindingOptions.events.onDataFetch, elementId );

        if ( Is.definedObject( data ) ) {
            createDateStorageForElement( elementId, bindingOptions, false );

            for ( let storageDate in data ) {
                if ( data.hasOwnProperty( storageDate ) ) {
                    if ( !_elements_DateCounts[ elementId ].typeData[ _configuration.unknownTrendText ].hasOwnProperty( storageDate ) ) {
                        _elements_DateCounts[ elementId ].typeData[ _configuration.unknownTrendText ][ storageDate ] = 0;
                    }
            
                    _elements_DateCounts[ elementId ].typeData[ _configuration.unknownTrendText ][ storageDate ] += data[ storageDate ];
                }
            }
        }
    }

    function cancelAllPullDataTimers() : void {
        for ( let elementId in _elements_DateCounts ) {
            if ( _elements_DateCounts.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_DateCounts[ elementId ].options;

                if ( Is.defined( bindingOptions._currentView.isInFetchModeTimer ) ) {
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
    
                if ( colorRange.id === id && Data.getDefaultBoolean( colorRange.visible, true ) ) {
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

            fireCustomTriggerEvent( bindingOptions.events.onColorRangeTypeToggle, bindingOptions.colorRanges[ colorRangesIndex ].id, flag );
        }

        renderControlContainer( bindingOptions );
    }

    function toggleColorRangeVisibleState( bindingOptions: BindingOptions, id: string ) : void {
        const colorRangesLength: number = bindingOptions.colorRanges.length;

        for ( let colorRangesIndex: number = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++ ) {
            const colorRange: ColorRange = bindingOptions.colorRanges[ colorRangesIndex ];

            if ( colorRange.id === id ) {
                colorRange.visible = !Data.getDefaultBoolean( colorRange.visible, true );

                fireCustomTriggerEvent( bindingOptions.events.onColorRangeTypeToggle, colorRange.id, colorRange.visible );
                renderControlContainer( bindingOptions );
                break;
            }
        }
    }

    function getColorRange( bindingOptions: BindingOptions, colorRanges: ColorRange[], dateCount: number, date: Date = null ) : ColorRange {
        let useColorRange: ColorRange = null;

        if ( Is.defined( date ) && isHoliday( bindingOptions, date ).matched ) {
            useColorRange = {
                cssClassName: "holiday",
                id: _internal_Name_Holiday,
                visible: true,
                minimum: 0,
            } as ColorRange;
        }

        if ( !Is.defined( useColorRange ) ) {
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

            if ( Is.definedString( holiday.date ) && holiday.showInViews ) {
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
            element.ondragover = DomElement.cancelBubble;
            element.ondragenter = DomElement.cancelBubble;
            element.ondragleave = DomElement.cancelBubble;
    
            element.ondrop = function ( e ) {
                DomElement.cancelBubble( e );
    
                if ( Is.defined( window.FileReader ) && e.dataTransfer.files.length > 0 ) {
                    importFromFiles( e.dataTransfer.files, bindingOptions );
                }
            };
        }
    }

    function importFromFilesSelected( bindingOptions: BindingOptions ) : void {
        const input: any = DomElement.createWithNoContainer( "input" );
        input.type = "file";
        input.accept = ".json, .txt, .csv";
        input.multiple = "multiple";

        input.onchange = function () {
            importFromFiles( input.files, bindingOptions );
        };

        input.click();
    }

    function importFromFiles( files: FileList, bindingOptions: BindingOptions ) : void {
        const filesLength: number = files.length;
        const filesCompleted: string[] = [];
        const data: any = getCurrentViewData( bindingOptions );

        const onLoadEnd = function ( filename: string, readingObject: object ) {
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
                fireCustomTriggerEvent( bindingOptions.events.onImport, bindingOptions._currentView.element );
                renderControlContainer( bindingOptions );
            }
        };

        for ( let fileIndex: number = 0; fileIndex < filesLength; fileIndex++ ) {
            const file: File = files[ fileIndex ];
            const fileExtension: string = file.name.split( "." ).pop().toLowerCase();

            if ( fileExtension === ExportType.json ) {
                importFromJson( file, onLoadEnd );
            } else if ( fileExtension === ExportType.txt ) {
                importFromTxt( file, onLoadEnd );
            } else if ( fileExtension === ExportType.csv ) {
                importFromCsv( file, onLoadEnd );
            }
        }
    }

    function importFromJson( file: File, onLoadEnd: Function ) : void {
        const reader: FileReader = new FileReader();
        let readingObject: object = {};

        reader.readAsText( file );

        reader.onloadend = function () {
            onLoadEnd( file.name, readingObject );
        };
    
        reader.onload = function ( e ) {
            const JSON: any = getObjectFromString( e.target.result );

            if ( JSON.parsed && Is.definedObject( JSON.result ) ) {
                readingObject = JSON.result;
            }
        };
    }

    function importFromTxt( file: File, onLoadEnd: Function ) : void {
        const reader: FileReader = new FileReader();
        const readingObject: object = {};

        reader.readAsText( file );

        reader.onloadend = function () {
            onLoadEnd( file.name, readingObject );
        };
    
        reader.onload = function ( e ) {
            const lines: string[] = e.target.result.toString().split( Char.newLine );
            const linesLength: number = lines.length;

            for ( let lineIndex: number = 0; lineIndex < linesLength; lineIndex++ ) {
                const line: string[] = lines[ lineIndex ].split( Char.colon );

                readingObject[ line[ 0 ].trim() ] = parseInt( line[ 1 ].trim() );
            }
        };
    }

    function importFromCsv( file: File, onLoadEnd: Function ) : void {
        const reader: FileReader = new FileReader();
        const readingObject: object = {};

        reader.readAsText( file );

        reader.onloadend = function () {
            onLoadEnd( file.name, readingObject );
        };
    
        reader.onload = function ( e ) {
            const data: string = e.target.result.toString().replace( new RegExp( "\"", "g" ), Char.empty );
            const lines: string[] = data.split( Char.newLine );
            
            lines.shift();

            let linesLength: number = lines.length;

            for ( let lineIndex: number = 0; lineIndex < linesLength; lineIndex++ ) {
                let line: string[] = lines[ lineIndex ].split( Char.comma );

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
        const contentExportType: string = Data.getDefaultString( exportType, bindingOptions.exportType ).toLowerCase();

        if ( contentExportType === ExportType.csv ) {
            contents = getCsvContent( bindingOptions );
        } else if ( contentExportType === ExportType.json ) {
            contents = getJsonContent( bindingOptions );
        } else if ( contentExportType === ExportType.xml ) {
            contents = getXmlContents( bindingOptions );
        } else if ( contentExportType === ExportType.txt ) {
            contents = getTxtContents( bindingOptions );
        }

        if ( Is.definedString( contents ) ) {
            const tempLink: HTMLElement = DomElement.create( document.body, "a" );
            tempLink.style.display = "none";
            tempLink.setAttribute( "target", "_blank" );
            tempLink.setAttribute( "href", "data:" + contentsMimeType + ";charset=utf-8," + encodeURIComponent( contents ) );
            tempLink.setAttribute( "download", getExportFilename( bindingOptions ) );
            tempLink.click();
            
            document.body.removeChild( tempLink );

            fireCustomTriggerEvent( bindingOptions.events.onExport, bindingOptions._currentView.element );
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
        
        return csvContents.join( Char.newLine );
    }

    function getJsonContent( bindingOptions: BindingOptions ) : string {
        return JSON.stringify( getExportData( bindingOptions ) );
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

        return contents.join( Char.newLine );
    }

    function getTxtContents( bindingOptions: BindingOptions ) : string {
        const data: object = getExportData( bindingOptions );
        const contents: string[] = [];

        for ( let storageDate in data ) {
            if ( data.hasOwnProperty( storageDate ) ) {
                contents.push( storageDate + Char.colon + Char.space + data[ storageDate ].toString() );
            }
        }

        return contents.join( Char.newLine );
    }

    function getExportData( bindingOptions: BindingOptions ) : object {
        const contents: object = {};
        const data = getCurrentViewData( bindingOptions );

        if ( bindingOptions.exportOnlyYearBeingViewed ) {
            for ( let monthIndex: number = 0; monthIndex < 12; monthIndex++ ) {
                const totalDaysInMonth: number = DateTime.getTotalDaysInMonth( bindingOptions._currentView.year, monthIndex );
        
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

        if ( bindingOptions.exportType.toLowerCase() === ExportType.csv ) {
            result = "text/csv";
        } else if ( bindingOptions.exportType.toLowerCase() === ExportType.json ) {
            result = "application/json";
        } else if ( bindingOptions.exportType.toLowerCase() === ExportType.xml ) {
            result = "application/xml";
        } else if ( bindingOptions.exportType.toLowerCase() === ExportType.txt ) {
            result = "text/plain";
        }

        return result;
    }

    function getExportFilename( bindingOptions: BindingOptions ) : string {
        const date: Date = new Date();
        const datePart: string = Data.String.padNumber( date.getDate() ) + Char.dash + Data.String.padNumber( date.getMonth() + 1 ) + Char.dash + date.getFullYear();
        const timePart: string = Data.String.padNumber( date.getHours() ) + Char.dash + Data.String.padNumber( date.getMinutes() );
        let filenameStart: string = Char.empty;

        if ( bindingOptions._currentView.type !== _configuration.unknownTrendText ) {
            filenameStart = bindingOptions._currentView.type.toLowerCase().replace( Char.space, Char.underscore ) + Char.underscore;
        }

        return filenameStart + datePart + Char.underscore + timePart + "." + bindingOptions.exportType.toLowerCase();
    }

    function getCsvValue( text: string ) : string {
        let result: string = text.toString().replace( /(\r\n|\n|\r)/gm, Char.empty ).replace( /(\s\s)/gm, Char.space );
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
        let options: BindingOptions = Data.getDefaultObject( newOptions, {} as BindingOptions );
        options.views = Data.getDefaultObject( options.views, {} );
        options.exportOnlyYearBeingViewed = Data.getDefaultBoolean( options.exportOnlyYearBeingViewed, true );
        options.year = Data.getDefaultNumber( options.year, new Date().getFullYear() );
        options.view = Data.getDefaultString( options.view, ViewName.map );
        options.exportType = Data.getDefaultString( options.exportType, ExportType.csv );
        options.useLocalStorageForData = Data.getDefaultBoolean( options.useLocalStorageForData, false );
        options.allowFileImports = Data.getDefaultBoolean( options.allowFileImports, true );
        options.yearsToHide = Data.getDefaultArray( options.yearsToHide, [] );
        options.dataFetchDelay = Data.getDefaultNumber( options.dataFetchDelay, 60000 );
        options.showOnlyDataForYearsAvailable = Data.getDefaultBoolean( options.showOnlyDataForYearsAvailable, false );
        options.showHolidaysInDayToolTips = Data.getDefaultBoolean( options.showHolidaysInDayToolTips, false );
        
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
        if ( Is.definedArray( options.colorRanges ) ) {
            const colorRangesLength: number = options.colorRanges.length;

            for ( let colorRangeIndex: number = 0; colorRangeIndex < colorRangesLength; colorRangeIndex++ ) {
                const colorRange: ColorRange = options.colorRanges[ colorRangeIndex ];

                colorRange.id = Data.getDefaultString( colorRange.id, Data.String.newGuid() );
                colorRange.name = Data.getDefaultString( colorRange.name, null );
                colorRange.minimum = Data.getDefaultNumber( colorRange.minimum, 0 );
                colorRange.cssClassName = Data.getDefaultString( colorRange.cssClassName, null );
                colorRange.mapCssClassName = Data.getDefaultString( colorRange.mapCssClassName, null );
                colorRange.chartCssClassName = Data.getDefaultString( colorRange.chartCssClassName, null );
                colorRange.statisticsCssClassName = Data.getDefaultString( colorRange.statisticsCssClassName, null );
                colorRange.tooltipText = Data.getDefaultString( colorRange.tooltipText, null );
                colorRange.visible = Data.getDefaultBoolean( colorRange.visible, true );
            }

        } else {
            options.colorRanges = [
                {
                    id: Data.String.newGuid(),
                    name: "Day Color 1",
                    minimum: 10,
                    cssClassName: "day-color-1",
                    tooltipText: "Day Color 1",
                    visible: true
                },
                {
                    id: Data.String.newGuid(),
                    name: "Day Color 2",
                    minimum: 15,
                    cssClassName: "day-color-2",
                    tooltipText: "Day Color 2",
                    visible: true
                },
                {
                    id: Data.String.newGuid(),
                    name: "Day Color 3",
                    minimum: 20,
                    cssClassName: "day-color-3",
                    tooltipText: "Day Color 3",
                    visible: true
                },
                {
                    id: Data.String.newGuid(),
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

    function buildAttributeOptionHolidays( options: BindingOptions ) : BindingOptions {
        if ( Is.definedArray( options.holidays ) ) {
            const holidaysLength: number = options.holidays.length;

            for ( let holidayIndex: number = 0; holidayIndex < holidaysLength; holidayIndex++ ) {
                const holiday: Holiday = options.holidays[ holidayIndex ];
                
                holiday.date = Data.getDefaultString( holiday.date, null );
                holiday.name = Data.getDefaultString( holiday.name, null );
                holiday.showInViews = Data.getDefaultBoolean( holiday.showInViews, true );
            }

        } else {
            options.holidays = [];
        }

        return options;
    }

    function buildAttributeOptionTitle( options: BindingOptions ) : BindingOptions {
        options.title = Data.getDefaultObject( options.title, {} as Title );
        options.title.text = Data.getDefaultString( options.title.text, "Heat.js" );
        options.title.showText = Data.getDefaultBoolean( options.title.showText, true );
        options.title.showYearSelector = Data.getDefaultBoolean( options.title.showYearSelector, true );
        options.title.showRefreshButton = Data.getDefaultBoolean( options.title.showRefreshButton, false );
        options.title.showExportButton = Data.getDefaultBoolean( options.title.showExportButton, false );
        options.title.extraSelectionYears = Data.getDefaultNumber( options.title.extraSelectionYears, 50 );
        options.title.showYearSelectionDropDown = Data.getDefaultBoolean( options.title.showYearSelectionDropDown, true );
        options.title.showImportButton = Data.getDefaultBoolean( options.title.showImportButton, false );
        options.title.showConfigurationButton = Data.getDefaultBoolean( options.title.showConfigurationButton, true );
        options.title.showTitleDropDownButton = Data.getDefaultBoolean( options.title.showTitleDropDownButton, true );
        options.title.showTitleDropDownHeaders = Data.getDefaultBoolean( options.title.showTitleDropDownHeaders, true );

        return options;
    }

    function buildAttributeOptionDescription( options: BindingOptions ) {
        options.description = Data.getDefaultObject( options.description, {} as Description );
        options.description.text = Data.getDefaultString( options.description.text, null );
        options.description.url = Data.getDefaultString( options.description.url, null );
        options.description.urlTarget = Data.getDefaultString( options.description.urlTarget, "_blank" );

        return options;
    }

    function buildAttributeOptionGuide( options: BindingOptions ) : BindingOptions {
        options.guide = Data.getDefaultObject( options.guide, {} as Guide );
        options.guide.enabled = Data.getDefaultBoolean( options.guide.enabled, true );
        options.guide.colorRangeTogglesEnabled = Data.getDefaultBoolean( options.guide.colorRangeTogglesEnabled, true );
        options.guide.showLessAndMoreLabels = Data.getDefaultBoolean( options.guide.showLessAndMoreLabels, true );
        options.guide.showNumbersInGuide = Data.getDefaultBoolean( options.guide.showNumbersInGuide, false );

        return options;
    }

    function buildAttributeOptionToolTip( options: BindingOptions ) : BindingOptions {
        options.tooltip = Data.getDefaultObject( options.tooltip, {} as Tooltip );
        options.tooltip.delay = Data.getDefaultNumber( options.tooltip.delay, 750 );
        options.tooltip.dayText = Data.getDefaultString( options.tooltip.dayText, "{d}{o} {mmmm} {yyyy}" );

        return options;
    }

    function buildAttributeOptionMapView( options: BindingOptions ) : BindingOptions {
        options.views.map = Data.getDefaultObject( options.views.map, {} as Map );
        options.views.map.showMonthDayGaps = Data.getDefaultBoolean( options.views.map.showMonthDayGaps, true );
        options.views.map.showDayNames = Data.getDefaultBoolean( options.views.map.showDayNames, true );
        options.views.map.placeMonthNamesOnTheBottom = Data.getDefaultBoolean( options.views.map.placeMonthNamesOnTheBottom, false );
        options.views.map.showDayNumbers = Data.getDefaultBoolean( options.views.map.showDayNumbers, false );
        options.views.map.showMonthNames = Data.getDefaultBoolean( options.views.map.showMonthNames, true );
        options.views.map.showDaysInReverseOrder = Data.getDefaultBoolean( options.views.map.showDaysInReverseOrder, false );
        options.views.map.showNoDataMessageWhenDataIsNotAvailable = Data.getDefaultBoolean( options.views.map.showNoDataMessageWhenDataIsNotAvailable, false );
        options.views.map.showMinimalDayNames = Data.getDefaultBoolean( options.views.map.showMinimalDayNames, false );
        options.views.map.showMonthsInReverseOrder = Data.getDefaultBoolean( options.views.map.showMonthsInReverseOrder, false );
        options.views.map.keepScrollPositions = Data.getDefaultBoolean( options.views.map.keepScrollPositions, false );

        if ( Is.invalidOptionArray( options.views.map.monthsToShow ) ) {
            options.views.map.monthsToShow = _default_MonthsToShow;
        }

        if ( Is.invalidOptionArray( options.views.map.daysToShow ) ) {
            options.views.map.daysToShow = _default_DaysToShow;
        }

        return options;
    }

    function buildAttributeOptionChartView( options: BindingOptions ) : BindingOptions {
        options.views.chart = Data.getDefaultObject( options.views.chart, {} as Chart );
        options.views.chart.enabled = Data.getDefaultBoolean( options.views.chart.enabled, true );
        options.views.chart.showChartYLabels = Data.getDefaultBoolean( options.views.chart.showChartYLabels, true );
        options.views.chart.showMonthNames = Data.getDefaultBoolean( options.views.chart.showMonthNames, true );
        options.views.chart.showLineNumbers = Data.getDefaultBoolean( options.views.chart.showLineNumbers, false );
        options.views.chart.showInReverseOrder = Data.getDefaultBoolean( options.views.chart.showInReverseOrder, false );
        options.views.chart.keepScrollPositions = Data.getDefaultBoolean( options.views.chart.keepScrollPositions, false );

        if ( Is.invalidOptionArray( options.views.chart.monthsToShow ) ) {
            options.views.chart.monthsToShow = _default_MonthsToShow;
        }

        if ( Is.invalidOptionArray( options.views.chart.daysToShow ) ) {
            options.views.chart.daysToShow = _default_DaysToShow;
        }

        return options;
    }

    function buildAttributeOptionDaysView( options: BindingOptions ) : BindingOptions {
        options.views.days = Data.getDefaultObject( options.views.days, {} as Days );
        options.views.days.enabled = Data.getDefaultBoolean( options.views.days.enabled, true );
        options.views.days.showChartYLabels = Data.getDefaultBoolean( options.views.days.showChartYLabels, true );
        options.views.days.showDayNames = Data.getDefaultBoolean( options.views.days.showDayNames, true );
        options.views.days.showInReverseOrder = Data.getDefaultBoolean( options.views.days.showInReverseOrder, false );
        options.views.days.showDayNumbers = Data.getDefaultBoolean( options.views.days.showDayNumbers, false );
        options.views.days.keepScrollPositions = Data.getDefaultBoolean( options.views.days.keepScrollPositions, false );

        if ( Is.invalidOptionArray( options.views.days.monthsToShow ) ) {
            options.views.days.monthsToShow = _default_MonthsToShow;
        }

        if ( Is.invalidOptionArray( options.views.days.daysToShow ) ) {
            options.views.days.daysToShow = _default_DaysToShow;
        }

        return options;
    }

    function buildAttributeOptionStatisticsView( options: BindingOptions ) : BindingOptions {
        options.views.statistics = Data.getDefaultObject( options.views.statistics, {} as Statistics );
        options.views.statistics.enabled = Data.getDefaultBoolean( options.views.statistics.enabled, true );
        options.views.statistics.showChartYLabels = Data.getDefaultBoolean( options.views.statistics.showChartYLabels, true );
        options.views.statistics.showColorRangeLabels = Data.getDefaultBoolean( options.views.statistics.showColorRangeLabels, true );
        options.views.statistics.useColorRangeNamesForLabels = Data.getDefaultBoolean( options.views.statistics.useColorRangeNamesForLabels, false );
        options.views.statistics.showRangeNumbers = Data.getDefaultBoolean( options.views.statistics.showRangeNumbers, false );
        options.views.statistics.showInReverseOrder = Data.getDefaultBoolean( options.views.statistics.showInReverseOrder, false );
        options.views.statistics.keepScrollPositions = Data.getDefaultBoolean( options.views.statistics.keepScrollPositions, false );

        if ( Is.invalidOptionArray( options.views.statistics.monthsToShow ) ) {
            options.views.statistics.monthsToShow = _default_MonthsToShow;
        }

        if ( Is.invalidOptionArray( options.views.statistics.daysToShow ) ) {
            options.views.statistics.daysToShow = _default_DaysToShow;
        }

        return options;
    }

    function buildAttributeOptionCustomTriggers( options : BindingOptions ) : BindingOptions {
        options.events = Data.getDefaultObject( options.events, {} as Events );
        options.events.onDayClick = Data.getDefaultFunction( options.events.onDayClick, null );
        options.events.onBackYear = Data.getDefaultFunction( options.events.onBackYear, null );
        options.events.onNextYear = Data.getDefaultFunction( options.events.onNextYear, null );
        options.events.onRefresh = Data.getDefaultFunction( options.events.onRefresh, null );
        options.events.onBeforeRender = Data.getDefaultFunction( options.events.onBeforeRender, null );
        options.events.onRenderComplete = Data.getDefaultFunction( options.events.onRenderComplete, null );
        options.events.onDestroy = Data.getDefaultFunction( options.events.onDestroy, null );
        options.events.onExport = Data.getDefaultFunction( options.events.onExport, null );
        options.events.onSetYear = Data.getDefaultFunction( options.events.onSetYear, null );
        options.events.onTypeSwitch = Data.getDefaultFunction( options.events.onTypeSwitch, null );
        options.events.onDayToolTipRender = Data.getDefaultFunction( options.events.onDayToolTipRender, null );
        options.events.onAdd = Data.getDefaultFunction( options.events.onAdd, null );
        options.events.onRemove = Data.getDefaultFunction( options.events.onRemove, null );
        options.events.onReset = Data.getDefaultFunction( options.events.onReset, null );
        options.events.onViewSwitch = Data.getDefaultFunction( options.events.onViewSwitch, null );
        options.events.onColorRangeTypeToggle = Data.getDefaultFunction( options.events.onColorRangeTypeToggle, null );
        options.events.onImport = Data.getDefaultFunction( options.events.onImport, null );
        options.events.onStatisticClick = Data.getDefaultFunction( options.events.onStatisticClick, null );
        options.events.onDataFetch = Data.getDefaultFunction( options.events.onDataFetch, null );
        options.events.onClear = Data.getDefaultFunction( options.events.onClear, null );
        options.events.onUpdate = Data.getDefaultFunction( options.events.onUpdate, null );
        options.events.onOptionsUpdate = Data.getDefaultFunction( options.events.onOptionsUpdate, null );
        options.events.onWeekDayClick = Data.getDefaultFunction( options.events.onWeekDayClick, null );

        return options;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Triggering Custom Events
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function fireCustomTriggerEvent( triggerFunction: Function, ...args : any[] ) : any {
        let result: any = null;

        if ( Is.definedFunction( triggerFunction ) ) {
            result = triggerFunction.apply( null, [].slice.call( args, 0 ) );
        }

        return result;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Default Parameter/Option Handling
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function getObjectFromString( objectString: any ) : any {
        let parsed: boolean = true,
            result: any = null;

        try {
            if ( Is.definedString( objectString ) ) {
                result = JSON.parse( objectString );
            }

        } catch ( e1 ) {
            try {
                let evalResult: Function = result = eval( "(" + objectString + ")" );

                if ( Is.definedFunction( result ) ) {
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
     * Storage Dates
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function toStorageDate( date: Date ) : string {
        return date.getFullYear() + Char.dash + Data.String.padNumber( date.getMonth() + 1 ) + Char.dash + Data.String.padNumber( date.getDate() );
    }

    function getStorageDate( data: string ) : string[] {
        return data.split( Char.dash );
    }

    function getStorageDateYear( data: string ) : string {
        return data.split( Char.dash )[ 0 ];
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
                fireCustomTriggerEvent( bindingOptions.events.onBackYear, bindingOptions._currentView.year );
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
                fireCustomTriggerEvent( bindingOptions.events.onBackYear, bindingOptions._currentView.year );
            }
        }
    }


	/*
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 * Public API Functions:  Helpers:  Destroy
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 */

    function destroyElement( bindingOptions: BindingOptions ) : void {
        bindingOptions._currentView.element.innerHTML = Char.empty;

        DomElement.removeClass( bindingOptions._currentView.element, "heat-js" );
        assignToolTipEvents( bindingOptions, false );

        document.body.removeChild( bindingOptions._currentView.tooltip );

        if ( bindingOptions._currentView.isInFetchMode && Is.defined( bindingOptions._currentView.isInFetchModeTimer ) ) {
            clearInterval( bindingOptions._currentView.isInFetchModeTimer );
        }

        fireCustomTriggerEvent( bindingOptions.events.onDestroy, bindingOptions._currentView.element );
    }


	/*
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 * Public API Functions:  Helpers:  Configuration
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 */

    function buildDefaultConfiguration( newConfiguration: Configuration = null ) : void {
        _configuration = !Is.definedObject( newConfiguration ) ? {} as Configuration : newConfiguration;
        _configuration.safeMode = Data.getDefaultBoolean( _configuration.safeMode, true );
        _configuration.domElementTypes = Data.getDefaultStringOrArray( _configuration.domElementTypes, [ "*" ] );

        buildDefaultConfigurationStrings();
        buildDefaultConfigurationArrays();
    }

    function buildDefaultConfigurationStrings() : void {
        _configuration.stText = Data.getDefaultAnyString( _configuration.stText, "st" );
        _configuration.ndText = Data.getDefaultAnyString( _configuration.ndText, "nd" );
        _configuration.rdText = Data.getDefaultAnyString( _configuration.rdText, "rd" );
        _configuration.thText = Data.getDefaultAnyString( _configuration.thText, "th" );
        _configuration.backButtonText = Data.getDefaultAnyString( _configuration.backButtonText, "Back" );
        _configuration.nextButtonText = Data.getDefaultAnyString( _configuration.nextButtonText, "Next" );
        _configuration.refreshButtonText = Data.getDefaultAnyString( _configuration.refreshButtonText, "Refresh" );
        _configuration.exportButtonText = Data.getDefaultAnyString( _configuration.exportButtonText, "Export" );
        _configuration.lessText = Data.getDefaultAnyString( _configuration.lessText, "Less" );
        _configuration.moreText = Data.getDefaultAnyString( _configuration.moreText, "More" );
        _configuration.dateText = Data.getDefaultAnyString( _configuration.dateText, "Date" );
        _configuration.countText = Data.getDefaultAnyString( _configuration.countText, "Count" );
        _configuration.mapText = Data.getDefaultAnyString( _configuration.mapText, "Map" );
        _configuration.chartText = Data.getDefaultAnyString( _configuration.chartText, "Chart" );
        _configuration.noChartDataMessage = Data.getDefaultAnyString( _configuration.noChartDataMessage, "There is currently no data to view." );
        _configuration.statisticsText = Data.getDefaultAnyString( _configuration.statisticsText, "Statistics" );
        _configuration.noStatisticsDataMessage = Data.getDefaultAnyString( _configuration.noStatisticsDataMessage, "There are currently no statistics to view." );
        _configuration.unknownTrendText = Data.getDefaultAnyString( _configuration.unknownTrendText, "Unknown" );
        _configuration.importButtonText = Data.getDefaultAnyString( _configuration.importButtonText, "Import" );
        _configuration.noMapDataMessage = Data.getDefaultAnyString( _configuration.noMapDataMessage, "There is currently no data to view." );
        _configuration.objectErrorText = Data.getDefaultAnyString( _configuration.objectErrorText, "Errors in object: {{error_1}}, {{error_2}}" );
        _configuration.attributeNotValidErrorText = Data.getDefaultAnyString( _configuration.attributeNotValidErrorText, "The attribute '{{attribute_name}}' is not a valid object." );
        _configuration.attributeNotSetErrorText = Data.getDefaultAnyString( _configuration.attributeNotSetErrorText, "The attribute '{{attribute_name}}' has not been set correctly." );
        _configuration.closeToolTipText = Data.getDefaultAnyString( _configuration.closeToolTipText, "Close" );
        _configuration.configurationToolTipText = Data.getDefaultAnyString( _configuration.configurationToolTipText, "Configuration" );
        _configuration.configurationTitleText = Data.getDefaultAnyString( _configuration.configurationTitleText, "Configuration" );
        _configuration.visibleMonthsText = Data.getDefaultAnyString( _configuration.visibleMonthsText, "Visible Months" );
        _configuration.visibleDaysText = Data.getDefaultAnyString( _configuration.visibleDaysText, "Visible Days" );
        _configuration.dataText = Data.getDefaultAnyString( _configuration.dataText, "Data" );
        _configuration.colorRangesText = Data.getDefaultAnyString( _configuration.colorRangesText, "Color Ranges" );
        _configuration.yearText = Data.getDefaultAnyString( _configuration.yearText, "Year" );
        _configuration.daysText = Data.getDefaultAnyString( _configuration.daysText, "Days" );
        _configuration.noDaysDataMessage = Data.getDefaultAnyString( _configuration.noDaysDataMessage, "There are currently no days to view." );
    }

    function buildDefaultConfigurationArrays() : void {
        if ( Is.invalidOptionArray( _configuration.monthNames, 12 ) ) {
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

        if ( Is.invalidOptionArray( _configuration.dayNames, 7 ) ) {
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

        addDates: function ( elementId: string, dates: Date[], type: string = null, triggerRefresh: boolean = true ) : PublicApi {
            if ( Is.definedString( elementId ) && Is.definedArray( dates ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_DateCounts[ elementId ].options;
                
                if ( !bindingOptions._currentView.isInFetchMode ) {
                    type = Data.getDefaultString( type, _configuration.unknownTrendText );

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

        addDate: function ( elementId: string, date: Date, type: string = null, triggerRefresh: boolean = true ) : PublicApi {
            if ( Is.definedString( elementId ) && Is.definedDate( date ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_DateCounts[ elementId ].options;
                
                if ( !bindingOptions._currentView.isInFetchMode ) {
                    type = Data.getDefaultString( type, _configuration.unknownTrendText );

                    const storageDate: string = toStorageDate( date );
        
                    if ( !_elements_DateCounts[ elementId ].typeData.hasOwnProperty( type ) ) {
                        _elements_DateCounts[ elementId ].typeData[ type ] = {};
                        _elements_DateCounts[ elementId ].types++;
                    }
        
                    if ( !_elements_DateCounts[ elementId ].typeData[ type ].hasOwnProperty( storageDate ) ) {
                        _elements_DateCounts[ elementId ].typeData[ type ][ storageDate ] = 0;
                    }
            
                    _elements_DateCounts[ elementId ].typeData[ type ][ storageDate ]++;
        
                    fireCustomTriggerEvent( bindingOptions.events.onAdd, bindingOptions._currentView.element );
        
                    if ( triggerRefresh ) {
                        renderControlContainer( bindingOptions, true );
                    }
                }
            }
    
            return _public;
        },

        updateDate: function ( elementId: string, date: Date, count: number, type: string = null, triggerRefresh: boolean = true ) : PublicApi {
            if ( Is.definedString( elementId ) && Is.definedDate( date ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_DateCounts[ elementId ].options;
                
                if ( !bindingOptions._currentView.isInFetchMode && count > 0 ) {
                    const storageDate: string = toStorageDate( date );
        
                    if ( _elements_DateCounts[ elementId ].typeData.hasOwnProperty( type ) ) {    
                        type = Data.getDefaultString( type, _configuration.unknownTrendText );

                        _elements_DateCounts[ elementId ].typeData[ type ][ storageDate ] = count;
        
                        fireCustomTriggerEvent( bindingOptions.events.onUpdate, bindingOptions._currentView.element );
        
                        if ( triggerRefresh ) {
                            renderControlContainer( bindingOptions, true );
                        }
                    }
                }
            }
    
            return _public;
        },

        removeDates: function ( elementId: string, dates: Date[], type: string = null, triggerRefresh: boolean = true ) : PublicApi {
            if ( Is.definedString( elementId ) && Is.definedArray( dates ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_DateCounts[ elementId ].options;
                
                if ( !bindingOptions._currentView.isInFetchMode ) {
                    type = Data.getDefaultString( type, _configuration.unknownTrendText );

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

        removeDate: function ( elementId: string, date: Date, type: string = null, triggerRefresh: boolean = true ) : PublicApi {
            if ( Is.definedString( elementId ) && Is.definedDate( date ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_DateCounts[ elementId ].options;
                
                if ( !bindingOptions._currentView.isInFetchMode ) {
                    const storageDate: string = toStorageDate( date );
        
                    if ( _elements_DateCounts[ elementId ].typeData.hasOwnProperty( type ) && _elements_DateCounts[ elementId ].typeData[ type ].hasOwnProperty( storageDate ) ) {
                        type = Data.getDefaultString( type, _configuration.unknownTrendText );

                        if ( _elements_DateCounts[ elementId ].typeData[ type ][ storageDate ] > 0 ) {
                            _elements_DateCounts[ elementId ].typeData[ type ][ storageDate ]--;
                        }
        
                        fireCustomTriggerEvent( bindingOptions.events.onRemove, bindingOptions._currentView.element );
        
                        if ( triggerRefresh ) {
                            renderControlContainer( bindingOptions, true );
                        }
                    }
                }
            }
    
            return _public;
        },

        clearDate: function ( elementId: string, date: Date, type: string = null, triggerRefresh: boolean = true ) : PublicApi {
            if ( Is.definedString( elementId ) && Is.definedDate( date ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_DateCounts[ elementId ].options;
                
                if ( !bindingOptions._currentView.isInFetchMode ) {
                    const storageDate: string = toStorageDate( date );
        
                    if ( _elements_DateCounts[ elementId ].typeData.hasOwnProperty( type ) && _elements_DateCounts[ elementId ].typeData[ type ].hasOwnProperty( storageDate ) ) {
                        type = Data.getDefaultString( type, _configuration.unknownTrendText );

                        delete _elements_DateCounts[ elementId ].typeData[ type ][ storageDate ];
        
                        fireCustomTriggerEvent( bindingOptions.events.onClear, bindingOptions._currentView.element );
        
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
            if ( Is.definedString( elementId ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_DateCounts[ elementId ].options;
                
                if ( !bindingOptions._currentView.isInFetchMode ) {
                    bindingOptions._currentView.type = _configuration.unknownTrendText;
        
                    createDateStorageForElement( elementId, bindingOptions, false );
                    fireCustomTriggerEvent( bindingOptions.events.onReset, bindingOptions._currentView.element );
        
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
            if ( Is.definedString( elementId ) && _elements_DateCounts.hasOwnProperty( elementId ) && Is.definedArray( files ) ) {
                importFromFiles( files, _elements_DateCounts[ elementId ].options );
            }
    
            return _public;
        },

        export: function ( elementId: string, exportType: string = null ) : PublicApi {
            if ( Is.definedString( elementId ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
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
            if ( Is.definedString( elementId ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_DateCounts[ elementId ].options;
    
                renderControlContainer( bindingOptions, true );
                fireCustomTriggerEvent( bindingOptions.events.onRefresh, bindingOptions._currentView.element );
            }
    
            return _public;
        },

        refreshAll: function () : PublicApi {
            for ( let elementId in _elements_DateCounts ) {
                if ( _elements_DateCounts.hasOwnProperty( elementId ) ) {
                    const bindingOptions: BindingOptions = _elements_DateCounts[ elementId ].options;
    
                    renderControlContainer( bindingOptions, true );
                    fireCustomTriggerEvent( bindingOptions.events.onRefresh, bindingOptions._currentView.element );
                }
            }
    
            return _public;
        },

        setYear: function ( elementId: string, year: number ) : PublicApi {
            if ( Is.definedString( elementId ) && Is.definedNumber( year ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_DateCounts[ elementId ].options;
                bindingOptions._currentView.year = year;
    
                if ( !isYearVisible( bindingOptions, bindingOptions._currentView.year ) ) {
                    moveToNextYear( bindingOptions, false );
                } else {
                    renderControlContainer( bindingOptions );
                }
    
                fireCustomTriggerEvent( bindingOptions.events.onSetYear, bindingOptions._currentView.year );
            }
    
            return _public;
        },

        setYearToHighest: function ( elementId: string ) : PublicApi {
            if ( Is.definedString( elementId ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_DateCounts[ elementId ].options;
                const data: any = getCurrentViewData( bindingOptions );
                let maximumYear: number = 0;
    
                for ( let storageDate in data ) {
                    if ( data.hasOwnProperty( storageDate ) ) {
                        maximumYear = Math.max( maximumYear, parseInt( getStorageDateYear( storageDate ) ) );
                    }
                }
    
                if ( maximumYear > 0 ) {
                    bindingOptions._currentView.year = maximumYear;
    
                    if ( !isYearVisible( bindingOptions, bindingOptions._currentView.year ) ) {
                        moveToNextYear( bindingOptions, false );
                    } else {
                        renderControlContainer( bindingOptions );
                    }
    
                    fireCustomTriggerEvent( bindingOptions.events.onSetYear, bindingOptions._currentView.year );
                }
            }
    
            return _public;
        },

        setYearToLowest: function ( elementId: string ) : PublicApi {
            if ( Is.definedString( elementId ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_DateCounts[ elementId ].options;
                const data: any = getCurrentViewData( bindingOptions );
                let minimumYear: number = 9999;
    
                for ( let storageDate in data ) {
                    if ( data.hasOwnProperty( storageDate ) ) {
                        minimumYear = Math.min( minimumYear, parseInt( getStorageDateYear( storageDate ) ) );
                    }
                }
    
                if ( minimumYear < 9999 ) {
                    bindingOptions._currentView.year = minimumYear;
    
                    if ( !isYearVisible( bindingOptions, bindingOptions._currentView.year ) ) {
                        moveToPreviousYear( bindingOptions, false );
                    } else {
                        renderControlContainer( bindingOptions );
                    }
    
                    fireCustomTriggerEvent( bindingOptions.events.onSetYear, bindingOptions._currentView.year );
                }
            }
    
            return _public;
        },

        moveToPreviousYear: function ( elementId: string ) : PublicApi {
            if ( Is.definedString( elementId ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
                moveToPreviousYear( _elements_DateCounts[ elementId ].options );
            }
    
            return _public;
        },

        moveToNextYear: function ( elementId: string ) : PublicApi {
            if ( Is.definedString( elementId ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
                moveToNextYear( _elements_DateCounts[ elementId ].options );
            }
    
            return _public;
        },

        moveToCurrentYear: function ( elementId: string ) : PublicApi {
            if ( Is.definedString( elementId ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_DateCounts[ elementId ].options;
                bindingOptions._currentView.year = new Date().getFullYear();
    
                if ( !isYearVisible( bindingOptions, bindingOptions._currentView.year ) ) {
                    moveToNextYear( bindingOptions, false );
                } else {
                    renderControlContainer( bindingOptions );
                }
    
                fireCustomTriggerEvent( bindingOptions.events.onSetYear, bindingOptions._currentView.year );
            }
    
            return _public;
        },

        getYear: function ( elementId: string ) : number {
            let result: number = null;

            if ( Is.definedString( elementId ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_DateCounts[ elementId ].options;
    
                result = bindingOptions._currentView.year;
            }
    
            return result;
        },

        render: function ( element: HTMLElement, options: BindingOptions ) : PublicApi {
            if ( Is.definedObject( element ) && Is.definedObject( options ) ) {
                renderControl( renderBindingOptions( options, element ) );
            }
    
            return _public;
        },

        renderAll: function () : PublicApi {
            render();

            return _public;
        },

        switchView: function ( elementId: string, viewName: string ) : PublicApi {
            if ( Is.definedString( elementId ) && Is.definedString( viewName ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_DateCounts[ elementId ].options;
                let view: number = null;
    
                if ( viewName.toLowerCase() === ViewName.map ) {
                    view = ViewId.map;
                } else if ( viewName.toLowerCase() === ViewName.chart ) {
                    view = ViewId.chart;
                } else if ( viewName.toLowerCase() === ViewName.days ) {
                    view = ViewId.days;
                } else if ( viewName.toLowerCase() === ViewName.statistics ) {
                    view = ViewId.statistics;
                }
    
                if ( Is.definedNumber( view ) ) {
                    bindingOptions._currentView.view = view;
    
                    fireCustomTriggerEvent( bindingOptions.events.onViewSwitch, viewName );
                    renderControlContainer( bindingOptions, false, true );
                }
            }
    
            return _public;
        },

        switchType: function ( elementId: string, type: string ) : PublicApi {
            if ( Is.definedString( elementId ) && Is.definedString( type ) && _elements_DateCounts.hasOwnProperty( elementId ) && _elements_DateCounts[ elementId ].typeData.hasOwnProperty( type ) ) {
                const bindingOptions: BindingOptions = _elements_DateCounts[ elementId ].options;
    
                if ( bindingOptions._currentView.type !== type ) {
                    bindingOptions._currentView.type = type;
                
                    fireCustomTriggerEvent( bindingOptions.events.onTypeSwitch, type );
                    renderControlContainer( bindingOptions );
                }
            }
    
            return _public;
        },

        updateOptions: function ( elementId: string, newOptions: BindingOptions ) : PublicApi {
            if ( Is.definedString( elementId ) && Is.definedObject( newOptions ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
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
                    fireCustomTriggerEvent( bindingOptions.events.onRefresh, bindingOptions._currentView.element );
                    fireCustomTriggerEvent( bindingOptions.events.onOptionsUpdate, bindingOptions._currentView.element, bindingOptions );
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
            if ( Is.definedString( elementId ) && _elements_DateCounts.hasOwnProperty( elementId ) ) {
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
            if ( Is.definedObject( newConfiguration ) ) {
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

        document.addEventListener( "DOMContentLoaded", function () {
            render();
        } );

        window.addEventListener( "pagehide", function () {
            cancelAllPullDataTimers();
        } );

        if ( !Is.defined( window.$heat ) ) {
            window.$heat = _public;
        }
    } )();
} )();